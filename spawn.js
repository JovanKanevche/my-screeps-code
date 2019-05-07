const clearMemory = () => {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name]
        }
    }
}

const MIN_NUMBER_OF_HARVERSTERS = 10
const MIN_NUMBER_OF_UPGRADERS = 2

const HARVESTER_PARTS = [WORK, WORK, CARRY, MOVE]
const UPGRADER_PARTS = [WORK, CARRY, MOVE, MOVE]

module.exports = {
    run: spawn => {
        clearMemory()

        const numberOfHarversters = _.sum(
            Game.creeps,
            c => c.memory.role == 'harvester'
        )
        const numberOfUpgraders = _.sum(
            Game.creeps,
            c => c.memory.role == 'upgraders'
        )

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
        } else {
            spawn.createCreep(UPGRADER_PARTS, undefined, {
                role: 'builder',
                working: false
            })
        }
    }
}
