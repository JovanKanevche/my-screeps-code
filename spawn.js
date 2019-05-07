const clearMemory = () => {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
        }
    }
}

const MIN_NUMBER_OF_HARVERSTERS = 10
const MIN_NUMBER_OF_UPGRADERS = 2
const MIN_NUMBER_OF_BUILDERS = 1
const MIN_NUMBER_OF_REPAIRERS = 2

const HARVESTER_PARTS = [WORK, WORK, CARRY, MOVE]
const UPGRADER_PARTS = [WORK, CARRY, MOVE, MOVE]

const countRoleF = creeps => role => _.sum(creeps, c => c.memory.role == role)

module.exports = {
    run: spawn => {
        clearMemory()

        const countRole = countRoleF(Game.creeps)

        const numberOfHarversters = countRole('harvester')
        const numberOfUpgraders = countRole('upgrader')
        const numberOfBuilders = countRole('builder')
        const numberOfRepairers = countRole('repairer')

        if (numberOfHarversters < MIN_NUMBER_OF_HARVERSTERS) {
            spawn.createCreep(HARVESTER_PARTS, undefined, {
                role: 'harvester',
                working: false
            })
        } else if (numberOfUpgraders < MIN_NUMBER_OF_UPGRADERS) {
            spawn.createCreep(UPGRADER_PARTS, undefined, {
                role: 'upgrader',
                working: false
            })
        } else if (numberOfRepairers < MIN_NUMBER_OF_REPAIRERS) {
            spawn.createCreep(HARVESTER_PARTS, undefined, {
                role: 'repairer',
                working: false
            })
        } else if (numberOfBuilders < MIN_NUMBER_OF_BUILDERS) {
            spawn.createCreep(HARVESTER_PARTS, undefined, {
                role: 'builder',
                working: false
            })
        } else {
            spawn.createCreep(HARVESTER_PARTS, undefined, {
                role: 'builder',
                working: false
            })
        }
    }
}
