const MIN_NUMBER_OF_HARVERSTERS = 10
const MIN_NUMBER_OF_UPGRADERS = 1

module.exports = {
  run: spawn => {
    const numberOfHarversters = _.sum(
      Game.creeps,
      c => c.memory.role == 'harvester'
    )

    console.log(numberOfHarversters)

    if (numberOfHarversters < MIN_NUMBER_OF_HARVERSTERS) {
      spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
        role: 'harvester',
        working: false
      })
    }
  }
}
