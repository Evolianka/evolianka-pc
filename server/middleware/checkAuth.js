const api = require('../../client/api/desktop')

exports.checkAuth = async (req, res, next) => {
    const currentSessionId = req.cookies['x-session-id']
    const currentToken = req.cookies['x-token']
    const sessionId = currentSessionId || res.sessionId
    res.cookie('x-session-id', sessionId, {
        domain: req.hostname
    })
    if (currentToken) {
        res.cookie('x-token', currentToken, {
            domain: req.hostname
        })
    }

    next()
}