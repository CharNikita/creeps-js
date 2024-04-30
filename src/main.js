var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCargo = require('role.cargo');
var spawner = require('spawner');

module.exports.loop = function () {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawner.spawn()

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'cargo') {
            roleCargo.run(creep);
        }
    }

    const tower = Game.getObjectById('6630377fd7c86e3ba8aeabcf');
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => (object.structureType !== STRUCTURE_WALL) && (object.hits < object.hitsMax)
    });

    if (targets.length > 0) {
        tower.repair(targets[0]);
    }
}