const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.state === 'upgrading' && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'withdrawing';
            creep.say('withdrawing');
        }
        if (creep.memory.state !== 'upgrading' && creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'upgrading';
            creep.say('upgrading');
        }

        if (creep.memory.state === 'upgrading') {
            const upgradeResult = creep.upgradeController(creep.room.controller);
            if (upgradeResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    }
                );
            }
            return;
        }
        if (creep.memory.state === 'withdrawing') {
            const withdrawTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER && !Memory.containers[structure.id])
                        && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            const withdrawResult = creep.withdraw(withdrawTarget, RESOURCE_ENERGY);
            if (withdrawResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawTarget, {
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

module.exports = roleUpgrader;