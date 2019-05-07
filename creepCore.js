const isWorking = creep => creep.memory.working == true
const carryCapacityFull = creep => creep.carry.energy == creep.carryCapacity

module.exports = ({ work }) => ({
    run: creep => {
        if (isWorking(creep) && creep.carry.energy == 0) {
            creep.memory.working = false
        } else if (!isWorking(creep) && carryCapacityFull(creep)) {
            creep.memory.working = true
        }
        if (isWorking(creep)) work(creep)
        else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
        }
    }
})
