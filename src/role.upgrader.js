const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        creep.memory.state = 'idle'
        if (creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'withdrawing';
            creep.say('withdrawing');
        }
        if (creep.store[RESOURCE_ENERGY] !== 0) {
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
            const sources = creep.room.find(FIND_MY_SPAWNS, RESOURCE_ENERGY);
            const withdrawResult = creep.withdraw(sources[0]);
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