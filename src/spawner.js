const spawnHarvester = () => {
    Game.spawns['spawn'].spawnCreep([WORK, WORK, CARRY, MOVE], `harvester-${Game.time}`, {memory: {role: 'harvester'}});
}

const spawner = {
    spawn: function () {
        const spawn = Game.spawns['spawn']

        if (spawn.spawning != null) {
            return
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length < 2) {
            spawnHarvester()
        }
    }
}
module.exports = spawner;