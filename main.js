const harvester = require('./role.harvester')
const upgrader = require('./role.upgrader')
const builder = require('./role.builder')
const repairer = require('./role.repairer')
const spawn = require('./spawn')

module.exports.loop = () => {
    for (let name in Game.creeps) {
        const creep = Game.creeps[name]
        switch (creep.memory.role) {
            case 'harvester':
                harvester.run(creep)
                break
            case 'upgrader':
                upgrader.run(creep)
                break
            case 'builder':
                builder.run(creep)
                break
            case 'repairer':
                repairer.run(creep)
                break
        }
    }

    spawn.run(Game.spawns.Spawn1)
}
