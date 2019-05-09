module.exports = {
    run: () => {
        const towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })

        _.forEach(towers, tower => {
            const closestDamagedStructure = tower.pos.findClosestByRange(
                FIND_STRUCTURES,
                {
                    filter: structure =>
                        structure.hits < structure.hitsMax &&
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART
                }
            )
            if (closestDamagedStructure) tower.repair(closestDamagedStructure)

            const closestHostile = tower.pos.findClosestByRange(
                FIND_HOSTILE_CREEPS
            )
            if (closestHostile) tower.attack(closestHostile)
        })
    }
}
