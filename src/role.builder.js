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
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => (object.structureType !== STRUCTURE_WALL) && (object.hits < object.hitsMax)
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            return;
        }
        if (creep.memory.state === 'withdrawing') {
            const withdrawTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN
                            || structure.structureType === STRUCTURE_CONTAINER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            const withdrawResult = creep.withdraw(withdrawTargets[0], RESOURCE_ENERGY);
            if (withdrawResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawTargets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return;
        }
    }
};

module.exports = roleBuilder;