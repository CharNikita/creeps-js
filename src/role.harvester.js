const cleanUp = (creep) => {
    const sourceId = creep.memory.sourceId;
    if (sourceId) {
        Memory.sources[sourceId].assignedCreepId = null;
        creep.memory.sourceId = null;
    }
}

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.ticksToLive <= 3) {
            creep.memory.state = 'die';
            creep.say('die');
        } else if (creep.store.getFreeCapacity() > 0) {
            creep.memory.state = 'harvesting';
            creep.say('harvesting');
        } else if (creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'transferring';
            creep.say('transferring');
        }

        if (creep.memory.state === 'harvesting') {
            let target = Game.getObjectById(creep.memory.sourceId);
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: function (source) {
                        return Memory.sources[source.id].assignedCreepId == null;
                    }
                });
                if (target === null) {
                    return;
                }
                Memory.sources[target.id].assignedCreepId = creep.id;
                creep.memory.sourceId = target.id;
            }

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
            cleanUp(creep);

            const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER);
                }
            });
            const transferResult = creep.transfer(targets, RESOURCE_ENERGY);
            if (transferResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    }
                );
            }
            return;
        }
        if (creep.memory.state === 'die') {
            cleanUp(creep);
            return;
        }
    }
};

module.exports = roleHarvester;