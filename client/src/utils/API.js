import axios from 'axios'

const API = {
    getEmojis: async () =>{
        return axios.get(`https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_APIKEY}`)
    }
}

export default API