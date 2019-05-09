const {
    countRole: countRoleF,
    createBalancedCreep,
    clearMemory,
    logRoles
} = require('./spawnUtils')

const MIN_NUMBER_OF_HARVERSTERS = 6
const MIN_NUMBER_OF_UPGRADERS = 2
const MIN_NUMBER_OF_BUILDERS = 10
const MIN_NUMBER_OF_REPAIRERS = 2

module.exports = {
    run: spawn => {
        clearMemory()

        const countRole = countRoleF(Game.creeps)

        const numberOfHarversters = countRole('harvester')
        const numberOfUpgraders = countRole('upgrader')
        const numberOfBuilders = countRole('builder')
        const numberOfRepairers = countRole('repairer')

        logRoles({
            numberOfHarversters,
            numberOfUpgraders,
            numberOfBuilders,
            numberOfRepairers
        })

        const createCreep = createBalancedCreep({
            energy: Game.spawns.Spawn1.room.energyCapacityAvailable,
            spawn
        })

        if (numberOfHarversters < MIN_NUMBER_OF_HARVERSTERS) {
            createCreep('harvester')
        } else if (numberOfUpgraders < MIN_NUMBER_OF_UPGRADERS) {
            createCreep('upgrader')
        } else if (numberOfRepairers < MIN_NUMBER_OF_REPAIRERS) {
            createCreep('repairer')
        } else if (numberOfBuilders < MIN_NUMBER_OF_BUILDERS) {
            createCreep('builder')
        }
    }
}
