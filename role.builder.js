const isWorking = creep => creep.memory.working == true
const carryCapacityFull = creep => creep.carry.energy == creep.carryCapacity
const roleUpgrader = require('./role.upgrader')

module.exports = {
    run: creep => {
        if (isWorking(creep) && creep.carry.energy == 0) {
            creep.memory.working = false
        } else if (!isWorking(creep) && carryCapacityFull(creep)) {
            creep.memory.working = true
        }

        if (isWorking(creep)) {
            const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s =>
                    s.structureType == STRUCTURE_SPAWN &&
                    s.energy < s.energyCapacity
            })

            if (structure != undefined) {
                const constructionSite = creep.pos.findClosestByPath(
                    FIND_CONSTRUCTION_SITES
                )

                if (constructionSite != undefined) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite)
                    }
                } else roleUpgrader.run(creep)
            }
        } else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
        }
    }
}
