const express = require('express')
const app = express()

const crypto = require('crypto-js')
const uniqId = require('uniqid')
const secretKey = '3496c5c7b2718fcc20767bd5jnimkbtdxri9po8&^840-p2f32c21d'
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ASCIIintervals = [{
    min: 48,
    max: 57
},
    {
        min: 65,
        max: 90
    },
    {
        min: 97,
        max: 122
    }]
exports.sessionIdGenerator = (req, res, next) => {
    const salt = new Array(5).fill(0).map(el => {
        const interval = ASCIIintervals[getRandom(0, 2)]
        return String.fromCharCode(getRandom(interval.min, interval.max))
    }).join('')
    let generatedUniqId = uniqId()
    const randomPos = getRandom(0, generatedUniqId.length - 1)
    generatedUniqId = generatedUniqId.slice(0, randomPos) + salt + generatedUniqId.slice(randomPos, generatedUniqId.length)
    let AES = crypto.AES.encrypt(generatedUniqId, secretKey).toString()
    AES = AES.slice(0, 6) + salt + AES.slice(6, AES.length)
    res.sessionId = AES
    next()
}

