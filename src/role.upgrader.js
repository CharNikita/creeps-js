const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (reep.memory.state === 'upgrading' && creep.store[RESOURCE_ENERGY] === 0) {
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
            const sources = creep.room.find(FIND_MY_SPAWNS);
            const withdrawResult = creep.withdraw(sources[0], RESOURCE_ENERGY);
            console.log(withdrawResult)
            if (withdrawResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
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