const sourcesCalculation = {
    calculate: function () {
        const room = Game.spawns['spawn'].room;
        const terrain = new Room.Terrain(room.name);
        const sources = room.find(FIND_SOURCES);

        for (const source of sources) {
            const sourcePosition = source.pos;
            terrain.get(sourcePosition.x, sourcePosition.y);

            let emptyTilesCount = 0;
            for (const xShift of [-1, 0, 1]) {
                for (const yShift of [-1, 0, 1]) {
                    const tileType = terrain.get(sourcePosition.x + xShift, sourcePosition.y + yShift);
                    if (tileType !== TERRAIN_MASK_WALL) {
                        emptyTilesCount += 1;
                    }
                }
            }

            Memory.sources[source.id] = {
                maxHarvesters: emptyTilesCount,
                assignedCreepIds: [],
            }
        }
    },
    init: function () {
        const room = Game.spawns['spawn'].room;
        const terrain = new Room.Terrain(room.name);
        const sources = room.find(FIND_SOURCES);

        for (const source of sources) {
            Memory.sources[source.id] = {
                assignedCreepId: null,
            }
        }
    }
};

module.exports = sourcesCalculation;