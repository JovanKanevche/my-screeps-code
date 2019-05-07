const roleUpgrader = require('./role.upgrader')
const creepCore = require('./creepCore')

module.exports = creepCore({
    work: creep => {
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
    }
})
