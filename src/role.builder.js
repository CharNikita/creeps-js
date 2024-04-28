const roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.state === 'building' && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.state = 'withdrawing';
            creep.say('withdrawing');
        }
        if (creep.memory.state !== 'building' && creep.store.getFreeCapacity() === 0) {
            creep.memory.state = 'building';
            creep.say('building');
        }

        if (creep.memory.state === 'building') {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            return;
        }
        if (creep.memory.state === 'withdrawing') {
            const sources = creep.room.find(FIND_MY_SPAWNS);
            const withdrawResult = creep.withdraw(sources[0], RESOURCE_ENERGY);
            if (withdrawResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return;
        }
    }
};

module.exports = roleBuilder;