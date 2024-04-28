const sourceCalculation = {
    calculate: function () {
        const room = Game.spawns['spawn'].room;
        const terrain = new Room.Terrain(room.name);
        const sources = room.find(FIND_SOURCES);

        for (const source of sources) {
            const sourcePosition = source.pos;
            terrain.get(sourcePosition.x, sourcePosition.y);

            let emptyTilesCount = 0;
            for (const xShift in [-1, 0, 1]) {
                for (const yShift in [-1, 0, 1]) {
                    const tileType = terrain.get(sourcePosition.x + xShift, sourcePosition.y + yShift);
                    if (tileType === 0) {
                        emptyTilesCount += 1;
                    }
                }
            }
            console.log(`empty tiles around source ${source.id} = ${emptyTilesCount}`);
        }
    }
};

module.exports = sourceCalculation;