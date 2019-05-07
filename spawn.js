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

const countRoleF = creeps => role => _.sum(creeps, c => c.memory.role == role)

const createBalancedCreep = ({ energy, spawn }) => role => {
    const numberOfParts = Math.floor(energy / 200)

    const body = [
        ...Array(numberOfParts).fill(WORK),
        ...Array(numberOfParts).fill(CARRY),
        ...Array(numberOfParts).fill(MOVE)
    ]

    return spawn.createCreep(body, undefined, {
        role,
        working: false
    })
}

module.exports = {
    run: spawn => {
        clearMemory()

        const countRole = countRoleF(Game.creeps)

        const numberOfHarversters = countRole('harvester')
        const numberOfUpgraders = countRole('upgrader')
        const numberOfBuilders = countRole('builder')
        const numberOfRepairers = countRole('repairer')

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
        } else createCreep('builder')
    }
}
