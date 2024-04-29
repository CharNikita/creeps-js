const spawnHarvester = () => {
    Game.spawns['spawn'].spawnCreep(
        [WORK, WORK, WORK, CARRY, MOVE],
        `harvester-${Game.time}`,
        {
            memory: {
                role: 'harvester',
            }
        }
    );
}
const spawnBuilder = () => {
    Game.spawns['spawn'].spawnCreep(
        [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        `builder-${Game.time}`,
        {
            memory: {
                role: 'builder',
                state: 'withdrawing',
            }
        }
    );
}
const spawnUpgrader = () => {
    Game.spawns['spawn'].spawnCreep(
        [WORK, WORK, WORK, WORK, CARRY, MOVE],
        `upgrader-${Game.time}`,
        {
            memory: {
                role: 'upgrader',
                state: 'withdrawing',
            }
        }
    );
}
const spawnCargo = () => {
    Game.spawns['spawn'].spawnCreep(
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        `cargo-${Game.time}`,
        {
            memory: {
                role: 'cargo',
                state: 'withdrawing',
            }
        }
    );
}

const spawner = {
    spawn: function () {
        const spawn = Game.spawns['spawn']

        if (spawn.spawning != null) {
            return
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length < 5) {
            spawnHarvester();
            return;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'cargo').length < 1) {
            spawnCargo();
            return;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length < 2) {
            spawnUpgrader();
            return;
        }
        if (_.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length < 2) {
            spawnBuilder();
            return;
        }
    }
}
module.exports = spawner;