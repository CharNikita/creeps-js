const spawnHarvester = () => {
    Game.spawns['spawn'].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], `harvester-${Game.time}`, {memory: {role: 'harvester'}});
}
const spawnBuilder = () => {
    Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE], `builder-${Game.time}`, {memory: {role: 'builder'}});
}
const spawnUpgrader = () => {
    Game.spawns['spawn'].spawnCreep([WORK, CARRY, MOVE], `upgrader-${Game.time}`, {memory: {role: 'upgrader'}});
}

const spawner = {
    spawn: function () {
        const spawn = Game.spawns['spawn']

        if (spawn.spawning != null) {
            return
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length < 5) {
            spawnHarvester()
            return;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length < 1) {
            spawnUpgrader()
            return;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length < 1) {
            spawnBuilder()
            return;
        }
    }
}
module.exports = spawner;