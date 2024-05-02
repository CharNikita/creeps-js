const tower = {
    run: function () {
        const tower = Game.getObjectById('6630377fd7c86e3ba8aeabcf');
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
            return;
        }
        const targets = tower.room.find(FIND_STRUCTURES, {
            filter: object => (object.structureType !== STRUCTURE_WALL) && (object.hits < object.hitsMax)
        });

        if (targets.length > 0) {
            tower.repair(targets[0]);
        }
    },
};

module.exports = tower;