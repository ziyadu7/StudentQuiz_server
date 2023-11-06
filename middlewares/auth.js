const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    generateToken: (id,role) => {
        const token = jwt.sign({ id, role }, process.env.JWTSECRET)
        return token
    },
}