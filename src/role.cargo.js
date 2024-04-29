const roleCargo = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.state === 'transfer' && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'withdrawing';
            creep.say('withdrawing');
        }
        if (creep.memory.state !== 'transfer' && creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'transfer';
            creep.say('transfer');
        }

        if (creep.memory.state === 'transfer') {
            const transferTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (transferTargets.length === 0) {
                return;
            }
            const transferResult = creep.transfer(transferTargets[0], RESOURCE_ENERGY);
            if (transferResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(transferResult[0]);
            }
            return;
        }
        if (creep.memory.state === 'withdrawing') {
            const withdrawTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (withdrawTargets.length === 0) {
                return;
            }

            const withdrawResult = creep.withdraw(withdrawTargets[0], RESOURCE_ENERGY);
            if (withdrawResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawTargets[0], {
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

module.exports = roleCargo;