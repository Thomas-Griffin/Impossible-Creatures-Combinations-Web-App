import ServerEnvironments from '../types/ServerEnvironments';

import {
    ENV_DIRECTORY,
    ENVIRONMENT_SPECIFIER_FLAG_NAME,
    MONGO_DOCKER_SERVICE_NAME,
    MONGO_DOCKER_SERVICE_PORT,
    SERVER_ENVIRONMENT_TOKEN,
    SRC_DIRECTORY,
} from '../../globalConstants';
import fs from 'fs';
import dotenv from 'dotenv';
import {container, singleton} from 'tsyringe';
import {logger} from './logger';

const createServerEnvironment = (): ServerEnvironment => {
    logger.info('Creating server environment...');
    return new ServerEnvironment();
};

@singleton()
class ServerEnvironment {
    constructor() {
        this.load();
    }

    load() {
        if (this.isValidEnvironment()) {
            logger.info(`ENVIRONMENT variable is valid. Current value: ${process.env['ENVIRONMENT']}`);
        } else {
            throw new Error(
                `Environment variable ${ENVIRONMENT_SPECIFIER_FLAG_NAME} is not set. Please set it to any of ${Object.values(ServerEnvironments)}. Current value: ${
                    process.env[ENVIRONMENT_SPECIFIER_FLAG_NAME]
                }`
            );
        }
        if (process.env[ENVIRONMENT_SPECIFIER_FLAG_NAME] !== ServerEnvironments.PRODUCTION)
            dotenv.config({
                path: `${ENV_DIRECTORY}/${process.env[`${ENVIRONMENT_SPECIFIER_FLAG_NAME}`]}.env`,
                override: true,
                debug: true,
            });
        if (
            (process.env[ENVIRONMENT_SPECIFIER_FLAG_NAME] === ServerEnvironments.PRODUCTION &&
                !process.env['MONGO_URL']) ||
            !process.env['MONGO_DB_NAME'] ||
            process.env['MONGO_URL'] === 'undefined' ||
            process.env['MONGO_DB_NAME'] === 'undefined'
        ) {
            dotenv.config({path: `${SRC_DIRECTORY}/env/production.local.env`, override: true, debug: true});
            if (this.isInDockerContainer()) {
                logger.info(
                    `Running in docker container, setting MONGO_URL to mongodb://${MONGO_DOCKER_SERVICE_NAME}:${MONGO_DOCKER_SERVICE_PORT}`
                );
                process.env['MONGO_URL'] = `mongodb://${MONGO_DOCKER_SERVICE_NAME}:${MONGO_DOCKER_SERVICE_PORT}`;
            }
        }
    }

    isValidEnvironment(): boolean {
        logger.info(`Checking if environment variable 'ENVIRONMENT' is set...`);
        this.verify(ENVIRONMENT_SPECIFIER_FLAG_NAME, false, Object.values(ServerEnvironments));
        return true;
    }

    verify(variable: string, allowEmpty?: boolean, allowedValues?: string[]): void {
        if (!process.env[variable]) {
            throw this.generateVariableErrorMessage(variable, 'is not set');
        }
        if (!allowEmpty && process.env[variable] === '') {
            throw this.generateVariableErrorMessage(variable, 'is empty');
        }
        if (allowedValues && !allowedValues.includes(process.env[variable] || '')) {
            throw this.generateVariableErrorMessage(variable, `is not one of the allowed values: ${allowedValues}`);
        }
    }

    isInDockerContainer(): boolean {
        logger.info('Probing for /.dockerenv to determine if in docker container...');
        try {
            fs.statSync('/.dockerenv');
            logger.info('/.dockerenv was found, assuming docker container.');
            return true;
        } catch (_) {
            logger.info('/.dockerenv was not found, assuming local environment.');
            return false;
        }
    }

    private generateVariableErrorMessage(variable: string, errorMessage: string): Error {
        return new Error(`Environment variable '${variable}' ${errorMessage}. Current value: ${process.env[variable]}`);
    }
}

container.register(SERVER_ENVIRONMENT_TOKEN, {useFactory: createServerEnvironment});

export const serverEnvironment: ServerEnvironment = container.resolve(SERVER_ENVIRONMENT_TOKEN);

export default ServerEnvironment;
