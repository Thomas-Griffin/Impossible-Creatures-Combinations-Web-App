const testDatabaseName = 'combinationsAppTestDatabase'
const testMod = {
    name: 'testMod', version: '1.0.0', columns: [{
        "label": "Animal 1", "type": "string"
    }, {
        "label": "Animal 2", "type": "string"
    }, {
        "label": "Research Level", "type": "integer"
    }, {
        "label": "Coal", "type": "float"
    }, {
        "label": "Electricity", "type": "float"
    }, {
        "label": "Health", "type": "float"
    }, {
        "label": "EHP", "type": "generated"
    }, {
        "label": "Size", "type": "float"
    }, {
        "label": "Population Size", "type": "float"
    }, {
        "label": "Melee Damage", "type": "float"
    }, {
        "label": "Defence", "type": "percentage"
    }, {
        "label": "Air Speed", "type": "float"
    }, {
        "label": "Land Speed", "type": "float"
    }, {
        "label": "Water Speed", "type": "float"
    }, {
        "label": "Sight Radius", "type": "float"
    }, {
        "label": "Front Legs", "type": "string"
    }, {
        "label": "Rear Legs", "type": "string"
    }, {
        "label": "Head", "type": "string"
    }, {
        "label": "Tail", "type": "string"
    }, {
        "label": "Torso", "type": "string"
    }, {
        "label": "Pincers", "type": "string"
    }, {
        "label": "Wings", "type": "string"
    }, {
        "label": "Abilities", "type": "array"
    }]
}
const testModSchema = {
    "name": "testMod", "version": "1.0.0", "columns": [{
        "label": "Animal 1",
        "type": "string",
        "format": true,
        "path": ["stock_1"],
        "description": "The first animal in the creature's composition."
    }, {
        "label": "Animal 2",
        "type": "string",
        "format": true,
        "path": ["stock_2"],
        "description": "The second animal in the creature's composition."
    }, {
        "label": "Research Level",
        "type": "integer",
        "path": ["attributes", "creature_rank", 1],
        "description": "The research level required to build the creature."
    }, {
        "label": "Coal",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "cost", 1],
        "description": "The amount of coal required to build the creature."
    }, {
        "label": "Electricity",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "costrenew", 1],
        "description": "The amount of electricity required to build the creature."
    }, {
        "label": "Health",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "health_val", 1],
        "description": "The creature's health."
    }, {
        "label": "EHP", "type": "generated", "description": "The creature's effective hit points."
    }, {
        "label": "Size", "type": "float", "decimal_places": 1, "path": ["attributes", "size", 1]
    }, {
        "label": "Population Size",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "popsize", 1],
        "description": "The creature's population size."
    }, {
        "label": "Melee Damage",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "damage_val", 1],
        "description": "The creature's total melee damage."
    }, {
        "label": "Defence",
        "type": "percentage",
        "decimal_places": 1,
        "path": ["attributes", "armour", 1],
        "description": "The creature's total defence value"
    }, {
        "label": "Air Speed",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "airspeed_val", 1],
        "description": "The creature's air speed."
    }, {
        "label": "Land Speed",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "landspeed_val", 1],
        "description": "The creature's land speed."
    }, {
        "label": "Water Speed",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "waterspeed_val", 1],
        "description": "The creature's water speed."
    }, {
        "label": "Sight Radius",
        "type": "float",
        "decimal_places": 1,
        "path": ["attributes", "sight_radius1", 1],
        "description": "The creature's sight radius."
    }, {
        "label": "Front Legs",
        "type": "string",
        "format": true,
        "path": ["composition", 0],
        "description": "The animal from which the creature's front legs are composed."
    }, {
        "label": "Rear Legs",
        "type": "string",
        "format": true,
        "path": ["composition", 1],
        "description": "The animal from which the creature's rear legs are composed."
    }, {
        "label": "Head",
        "type": "string",
        "format": true,
        "path": ["composition", 2],
        "description": "The animal from which the creature's head is composed."
    }, {
        "label": "Tail",
        "type": "string",
        "format": true,
        "path": ["composition", 3],
        "description": "The animal from which the creature's tail is composed."
    }, {
        "label": "Torso",
        "type": "string",
        "format": true,
        "path": ["composition", 4],
        "description": "The animal from which the creature's torso is composed."
    }, {
        "label": "Pincers",
        "type": "string",
        "format": true,
        "path": ["composition", 5],
        "description": "The animal from which the creature's pincers are composed."
    }, {
        "label": "Wings",
        "type": "string",
        "format": true,
        "path": ["composition", 6],
        "description": "The animal from which the creature's wings are composed."
    }, {
        "label": "Abilities", "type": "array"
    }]
}

const testUnprocessedCombinations = [{
    "attributes": {
        "armour": [1, 0.3999999761581421],
        "armour_rating": [-1, 4],
        "armour_val": [-1, 40],
        "buildtime": [-1, 10],
        "can_dig": [2, 1],
        "constructionticks": [-1, 32],
        "cost": [-1, 78.66000366210938],
        "costrenew": [-1, 25],
        "creature_rank": [-1, 1],
        "damage_rating": [-1, 3],
        "damage_val": [-1, 10],
        "health_rating": [-1, 1],
        "health_val": [-1, 30],
        "hitpoints": [1, 30],
        "is_immune": [0, 1],
        "is_land": [1, 1],
        "land_legs_counted": [1, 2],
        "landspeed_rating": [-1, 2],
        "landspeed_val": [-1, 26],
        "lefthalf_name": [1, 24002],
        "melee2_damage": [2, 5],
        "melee2_dmgtype": [2, 0],
        "melee2_longdesc": [2, 5017],
        "melee2_name": [2, 5015],
        "melee2_rate": [2, 1.25],
        "melee2_shortdesc": [2, 5016],
        "melee4_damage": [4, 5],
        "melee4_dmgtype": [4, 0],
        "melee4_longdesc": [4, 5012],
        "melee4_name": [4, 5010],
        "melee4_rate": [4, 1.25],
        "melee4_shortdesc": [4, 5011],
        "melee_damage": [0, 10],
        "popsize": [-1, 1],
        "righthalf_name": [1, 24007],
        "sight_radius1": [0, 20],
        "sightradius_rating": [-1, 1],
        "sightradius_val": [-1, 20],
        "size": [1, 1],
        "size_rating": [-1, 1],
        "size_val": [-1, 1],
        "speed_max": [0, 26]
    }, "composition": [1, 1, 1, 1, 1, 1, 1], "stock_1": "ant", "stock_2": "archerfish"
}, {
    "attributes": {
        "armour": [1, 0.06000000238418579],
        "armour_rating": [-1, 1],
        "armour_val": [-1, 6],
        "buildtime": [-1, 10],
        "constructionticks": [-1, 48],
        "cost": [-1, 66.76000213623047],
        "costrenew": [-1, 55],
        "creature_rank": [-1, 2],
        "damage_rating": [-1, 1],
        "damage_val": [-1, 2],
        "health_rating": [-1, 1],
        "health_val": [-1, 18],
        "hitpoints": [1, 18],
        "is_immune": [0, 1],
        "is_swimmer": [1, 1],
        "lefthalf_name": [1, 24002],
        "melee4_damage": [4, 2],
        "melee4_dmgtype": [4, 0],
        "melee4_longdesc": [4, 5002],
        "melee4_name": [4, 5000],
        "melee4_rate": [4, 1.25],
        "melee4_shortdesc": [4, 5001],
        "melee_damage": [0, 2],
        "popsize": [-1, 1],
        "range4_damage": [4, 3],
        "range4_damage_rating": [-1, 1],
        "range4_damage_val": [-1, 3],
        "range4_dmgtype": [4, 0],
        "range4_longdesc": [4, 5007],
        "range4_max": [4, 20],
        "range4_max_rating": [-1, 4],
        "range4_max_val": [-1, 20],
        "range4_min": [4, 7],
        "range4_name": [4, 5005],
        "range4_rate": [4, 1.25],
        "range4_shortdesc": [4, 5006],
        "range4_special": [4, 2],
        "righthalf_name": [1, 24007],
        "sight_radius1": [0, 30],
        "sightradius_rating": [-1, 2],
        "sightradius_val": [-1, 30],
        "size": [1, 1],
        "size_rating": [-1, 1],
        "size_val": [-1, 1],
        "waterspeed_max": [0, 30],
        "waterspeed_rating": [-1, 4],
        "waterspeed_val": [-1, 30]
    }, "composition": [2, 2, 2, 2, 2, 2, 2], "stock_1": "ant", "stock_2": "archerfish"
}, {
    "attributes": {
        "armour": [1, 0.2499999850988388],
        "armour_rating": [-1, 3],
        "armour_val": [-1, 25],
        "buildtime": [-1, 10],
        "can_dig": [2, 1],
        "constructionticks": [-1, 48],
        "cost": [-1, 64.62000274658203],
        "costrenew": [-1, 25],
        "creature_rank": [-1, 2],
        "damage_rating": [-1, 3],
        "damage_val": [-1, 10],
        "health_rating": [-1, 1],
        "health_val": [-1, 30],
        "hitpoints": [1, 30],
        "is_immune": [0, 1],
        "is_land": [1, 1],
        "is_swimmer": [1, 1],
        "land_legs_counted": [1, 2],
        "landspeed_rating": [-1, 1],
        "landspeed_val": [-1, 20.799999237060547],
        "lefthalf_name": [1, 24002],
        "melee2_damage": [2, 5],
        "melee2_dmgtype": [2, 0],
        "melee2_longdesc": [2, 5017],
        "melee2_name": [2, 5015],
        "melee2_rate": [2, 1.25],
        "melee2_shortdesc": [2, 5016],
        "melee4_damage": [4, 5],
        "melee4_dmgtype": [4, 0],
        "melee4_longdesc": [4, 5012],
        "melee4_name": [4, 5010],
        "melee4_rate": [4, 1.25],
        "melee4_shortdesc": [4, 5011],
        "melee_damage": [0, 10],
        "popsize": [-1, 1],
        "righthalf_name": [1, 24007],
        "sight_radius1": [0, 20],
        "sightradius_rating": [-1, 1],
        "sightradius_val": [-1, 20],
        "size": [1, 1],
        "size_rating": [-1, 1],
        "size_val": [-1, 1],
        "speed_max": [0, 20.799999237060547],
        "waterspeed_max": [0, 10],
        "waterspeed_rating": [-1, 4],
        "waterspeed_val": [-1, 10]
    }, "composition": [1, 1, 1, 1, 2, 2, 2], "stock_1": "ant", "stock_2": "archerfish"
}]
const testProcessedCombinations = [{
    "Animal 1": "Ant",
    "Animal 2": "Archerfish",
    "Research Level": 1,
    "Coal": 78.7,
    "Electricity": 25,
    "Health": 30,
    "Size": 1,
    "Population Size": 1,
    "Melee Damage": 10,
    "Defence": 40,
    "Air Speed": 0,
    "Land Speed": 26,
    "Water Speed": 0,
    "Sight Radius": 20,
    "Front Legs": "Ant",
    "Rear Legs": "Ant",
    "Head": "Ant",
    "Tail": "Ant",
    "Torso": "Ant",
    "Pincers": "Ant",
    "Wings": "Ant",
    "EHP": "50",
    "Abilities": [{
        "ability": "Digging", "source": "Head"
    }, {
        "ability": "Immunity", "source": "Innate"
    }]
}, {
    "Animal 1": "Ant",
    "Animal 2": "Archerfish",
    "Research Level": 2,
    "Coal": 66.8,
    "Electricity": 55,
    "Health": 18,
    "Size": 1,
    "Population Size": 1,
    "Melee Damage": 2,
    "Defence": 6,
    "Air Speed": 0,
    "Land Speed": 0,
    "Water Speed": 30,
    "Sight Radius": 30,
    "Front Legs": "Archerfish",
    "Rear Legs": "Archerfish",
    "Head": "Archerfish",
    "Tail": "Archerfish",
    "Torso": "Archerfish",
    "Pincers": "Archerfish",
    "Wings": "Archerfish",
    "EHP": "19.1",
    "Abilities": [{
        "ability": "Immunity", "source": "Innate"
    }]
}, {
    "Animal 1": "Ant",
    "Animal 2": "Archerfish",
    "Research Level": 2,
    "Coal": 64.6,
    "Electricity": 25,
    "Health": 30,
    "Size": 1,
    "Population Size": 1,
    "Melee Damage": 10,
    "Defence": 25,
    "Air Speed": 0,
    "Land Speed": 20.8,
    "Water Speed": 10,
    "Sight Radius": 20,
    "Front Legs": "Ant",
    "Rear Legs": "Ant",
    "Head": "Ant",
    "Tail": "Ant",
    "Torso": "Archerfish",
    "Pincers": "Archerfish",
    "Wings": "Archerfish",
    "EHP": "40",
    "Abilities": [{
        "ability": "Digging", "source": "Head"
    }, {
        "ability": "Immunity", "source": "Innate"
    }]
}]

const testModCollectionName = `${testMod.name} ${testMod.version}`
const totalNumberOfMods = 6
const modsCollectionName = 'mods'

const modCombinationTotals = [
    {name: "Impossible Creatures", version: "1.1", total: 52760},
    {name: "Insect Invasion", version: "1.4", total: 85980},
    {name: "Smod", version: "9.25", total: 120000},
    {name: "Tellurian", version: "2.0", total: 128328},
    {name: "Tellurian", version: "2.9.1.4", total: 159448},
    {name: "Tellurian", version: "2.10", total: 171952}
]

module.exports = {
    testMod,
    testModCollectionName,
    testDatabaseName,
    totalNumberOfMods,
    modsCollectionName,
    testUnprocessedCombinations,
    testProcessedCombinations,
    testModSchema,
    modCombinationTotals
}