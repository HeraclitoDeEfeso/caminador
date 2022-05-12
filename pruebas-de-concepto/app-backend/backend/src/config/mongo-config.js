
const config = require('./config')
module.exports = config
module.exports.getConnectionStringToMongo = () => {
    const mongoConfig = config.db.mongo
    const mongoUsrPass = mongoConfig.usr ? `${mongoConfig.usr}:${mongoConfig.pass}@` : ""
    return `mongodb://${mongoUsrPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbname}`
}
