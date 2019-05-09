const countRole = creeps => role => _.sum(creeps, c => c.memory.role == role)

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

const clearMemory = () => {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
        }
    }
}

const logRoles = ({
    numberOfHarversters,
    numberOfUpgraders,
    numberOfBuilders,
    numberOfRepairers
}) =>
    console.log(
        JSON.stringify(
            {
                numberOfHarversters,
                numberOfUpgraders,
                numberOfBuilders,
                numberOfRepairers
            },
            null,
            2
        )
    )

module.exports = { countRole, createBalancedCreep, clearMemory, logRoles }
