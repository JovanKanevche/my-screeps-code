const harvester = require('./role.harvester')
const upgrader = require('./role.upgrade')

module.exports.loop = () => {
    for (let name in Game.creeps) {
        const creep = Game.creeps[name]

        switch (creep.role) {
            case 'harvester':
                harvester.run(creep)
                break
            case 'upgrader':
                upgrader.run(creep)
                break
        }
    }
}
