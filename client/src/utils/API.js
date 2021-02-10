import axios from 'axios'

const API = {
    getEmojis: async () =>{
        return axios.get(`https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_APIKEY}`)
    },
    getUsers: async () => {
        return axios.get("/api/users")
    },
    addPost: async (data) => {
        return axios.post("/api/posts", data)
    },
    getPosts: async () => {
        return axios.get("/api/posts")
    }
}

export default API