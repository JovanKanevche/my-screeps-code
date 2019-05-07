const creepCore = require('./creepCore')

module.exports = creepCore({
    work: creep => {
        const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: s =>
                s.structureType == STRUCTURE_SPAWN &&
                s.energy < s.energyCapacity
        })

        if (structure != undefined) {
            if (
                creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(structure)
            }
        }
    }
})
