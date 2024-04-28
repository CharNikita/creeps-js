const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        creep.memory.state = 'idle'
        if (creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'harvesting';
            creep.say('harvesting');
        }
        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'transferring';
            creep.say('transferring');
        }

        if (creep.memory.state === 'harvesting') {
            const sources = creep.room.find(FIND_SOURCES);
            const harvestResult = creep.harvest(sources[0]);
            if (harvestResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    }
                );
            }
            return;
        }
        if (creep.memory.state === 'transferring') {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                            || structure.structureType === STRUCTURE_SPAWN)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            const transferResult = creep.transfer(targets[0], RESOURCE_ENERGY);
            if (transferResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    }
                );
            }
            return;
        }
    }
};

module.exports = roleHarvester;