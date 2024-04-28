const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        creep.memory.state = 'idle'
        if (creep.store.getFreeCapacity() > 0) {
            creep.memory.state = 'harvesting';
            creep.say('harvesting');
        }
        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'transferring';
            creep.say('transferring');
        }

        if (creep.memory.state === 'harvesting') {
            const target = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: function (source) {
                    const currentSource = Memory.sources[source.id];
                    return currentSource.assignedCreepIds.length < currentSource.maxHarvesters;
                }
            });
            Memory.sources[target.id].assignedCreepIds.push(creep.id);
            creep.memory.sourceId = target.id;
            const harvestResult = creep.harvest(target);
            if (harvestResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    }
                );
            }
            return;
        }
        if (creep.memory.state === 'transferring') {
            const assignedCreepIds = Memory.sources[creep.memory.sourceId].assignedCreepIds;
            assignedCreepIds.splice(assignedCreepIds.indexOf(creep.id), 1);
            Memory.sources[creep.memory.sourceId].assignedCreepIds = assignedCreepIds;

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