const roleUpgrader = require('./role.upgrader')
const creepCore = require('./creepCore')

module.exports = creepCore({
    work: creep => {
        const constructionSite = creep.pos.findClosestByPath(
            FIND_CONSTRUCTION_SITES
        )

        if (constructionSite != undefined) {
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite)
            }
        } else roleUpgrader.run(creep)
    }
})
