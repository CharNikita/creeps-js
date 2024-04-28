const spawner = {
    spawn: function () {
        for(const creep in Game.creeps) {
            creep.memory.role
        }
    }
};

module.exports = spawner;