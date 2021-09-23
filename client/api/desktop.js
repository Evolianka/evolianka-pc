const axios = require('axios')
const constants = require('../constants/constants')
module.exports = {
    axios: axios.create(),
    async getShortcuts() {
        console.log('ok')
        return (await this.axios.get(`${constants.baseUrl}getShortcuts`)).data
    },
    async checkToken(data) {
        return (await this.axios.post(`${constants.baseUrl}checkout/prepareAuthCSRF`, data)).data
    },

}