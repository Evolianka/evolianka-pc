import axios from 'axios'

export default {
    async getShortcuts() {
        return (await axios.get('/getShortcuts')).data
    }
}