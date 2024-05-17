import MongoService from './mongoService';
import {readFileSync} from 'fs';
import Mod from '../types/Mod';
import SortingType from '../types/SortingType';
import Joi from 'joi';
import {
    COMBINATIONS_COLLECTION_NAME,
    JOI_MOD_SCHEMA,
    MOD_COLLECTION_NAME,
    TEST_SCHEMA_FILE_PATH,
} from '../../globalConstants';
import ProcessedCombination from '../types/ProcessedCombination';
import Ability from '../types/Ability';
import GetCombinationsRequestBody from '../types/GetCombinationsRequestBody';
import CombinationTableColumn from '../types/CombinationTableColumn';
import {FilterQuery} from '../types/FilterQuery';
import {MinMaxRequestBody} from '../types/MinMaxRequestBody';
import schemas from '../database/modSchemas';
import {MongoClient, SortDirection, WithId} from 'mongodb';
import {logger} from '../utility/logger';
import {container} from 'tsyringe';
import CombinationAttributeName from '../types/CombinationAttributeName';

let mods = schemas;
const testMods = JSON.parse(readFileSync(TEST_SCHEMA_FILE_PATH, 'utf8'));
mods = mods.concat(testMods);

class CombinationsService {
    combinationRequestSchema: Joi.ObjectSchema;
    minMaxSchema: Joi.ObjectSchema;
    abilitiesRequestSchema: Joi.ObjectSchema;
    client: MongoClient;

    constructor() {
        this.client = container.resolve(MongoService).client;
        this.combinationRequestSchema = Joi.object({
            mod: JOI_MOD_SCHEMA.required(),
            filters: Joi.array().optional(),
            sorting: Joi.object({
                column: Joi.string().optional(),
                order: Joi.string().valid('ascending', 'descending').optional(),
            }).optional(),
            page: Joi.number().strict().integer().min(1).required(),
            perPage: Joi.number().strict().integer().min(1).required(),
        });

        this.minMaxSchema = Joi.object({
            mod: JOI_MOD_SCHEMA.required(),
            attribute: Joi.string().required(),
        });

        this.abilitiesRequestSchema = Joi.object({
            mod: JOI_MOD_SCHEMA.required(),
        });
    }

    async getTotalCombinations(body: GetCombinationsRequestBody): Promise<number> {
        const {error} = this.combinationRequestSchema.validate(body, {abortEarly: false});
        if (error) {
            logger.error(error);
            return 0;
        }
        try {
            await this.client.connect();
            const query = this.buildFiltersQuery(body);

            return await this.client
                .db(process.env['MONGO_DB_NAME'])
                .collection(COMBINATIONS_COLLECTION_NAME)
                .countDocuments(query);
        } catch (err) {
            logger.error(err);
            return 0;
        } finally {
            await this.client.close();
        }
    }

    async getCombinations(body: GetCombinationsRequestBody): Promise<ProcessedCombination[]> {
        const {error} = this.combinationRequestSchema.validate(body);
        if (error) {
            logger.error(error);
            return [];
        }
        try {
            await this.client.connect();
            const query = this.buildFiltersQuery(body);
            const sort = {
                [body?.sorting?.column ?? 'Animal 1']:
                    body?.sorting?.order === SortingType.Descending ? (-1 as SortDirection) : (1 as SortDirection),
            };
            const skip = (body.page - 1) * body.perPage;
            const limit = body.perPage;
            return (await this.client
                .db(process.env['MONGO_DB_NAME'])
                .collection(COMBINATIONS_COLLECTION_NAME)
                .find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .toArray()) as WithId<[]> as ProcessedCombination[];
        } catch (err: any) {
            logger.error(err);
            return [];
        } finally {
            await this.client.close();
        }
    }

    async getAttributeMinMax(body: MinMaxRequestBody) {
        const {error} = this.minMaxSchema.validate(body);
        if (error) {
            return {min: 0, max: Number.MAX_SAFE_INTEGER, error: error};
        }
        try {
            await this.client.connect();
            let minMax = await this.client
                .db(process.env['MONGO_DB_NAME'])
                .collection(MOD_COLLECTION_NAME)
                .aggregate([
                    {$match: {name: body.mod.name, version: body.mod.version}},
                    {$unwind: '$columns'},
                    {$match: {'columns.label': body.attribute}},
                    {$project: {min: '$columns.min', max: '$columns.max', _id: 0}},
                ])
                .toArray();

            return minMax?.[0] || {min: 0, max: Number.MAX_SAFE_INTEGER};
        } catch (err) {
            logger.error(err);
            return {min: 0, max: Number.MAX_SAFE_INTEGER, error: err};
        } finally {
            await this.client.close();
        }
    }

    async getAbilities(body: {mod: Mod}): Promise<Ability[]> {
        const {error} = this.abilitiesRequestSchema.validate(body);
        if (error) {
            logger.error(error);
            return [];
        }
        try {
            await this.client.connect();
            let abilities = await this.client
                .db(process.env['MONGO_DB_NAME'])
                .collection(this.toCollectionName(body.mod))
                .aggregate([
                    {$unwind: '$Abilities'},
                    {$group: {_id: '$Abilities.ability'}},
                    {$project: {_id: 0, ability: '$_id'}},
                ])
                .toArray();
            return abilities.flatMap(ability => ability['ability']);
        } catch (err) {
            logger.error(err);
            return [];
        } finally {
            await this.client.close();
        }
    }

    toCollectionName(mod: Mod | undefined) {
        if (mod === null || mod === undefined) {
            return '';
        }
        return `${mod.name} ${mod.version}`;
    }

    buildFiltersQuery(body: GetCombinationsRequestBody) {
        const defaultSorting = {column: 'Animal 1' as CombinationAttributeName, order: SortingType.Descending};
        if (body === null) {
            body = {
                mod: mods[0] || {name: '', version: ''},
                sorting: defaultSorting,
                page: 1,
                perPage: 1,
            };
        }
        let query: FilterQuery = {
            'Mod.name': body.mod.name,
            'Mod.version': body.mod.version,
        } as FilterQuery;
        if (body?.filters !== null && body?.filters !== undefined) {
            body.filters.forEach((column: CombinationTableColumn) => {
                if (
                    column?.filter?.min !== null &&
                    column?.filter?.max !== null &&
                    column?.filter?.min !== undefined &&
                    column?.filter?.max !== undefined
                ) {
                    query[column?.label] = {
                        $gte: column?.filter?.min,
                        $lte: column?.filter?.max,
                    };
                } else {
                    if (column.label === 'Abilities') {
                        query['Abilities.ability'] = {$all: column?.filter?.labels || []};
                    } else if (
                        column?.filter?.text !== null &&
                        column?.filter?.text !== undefined &&
                        column?.filter?.text !== ''
                    ) {
                        query[column.label] = {$regex: new RegExp(column.filter.text, 'i')};
                    }
                }
            });
        }
        return query;
    }
}

export default CombinationsService;
