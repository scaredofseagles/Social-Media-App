import axios from "axios";

const API = {
  getEmojis: async () => {
    return await axios.get(
      `https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_APIKEY}`
    );
  },
  authorize: async email => {
    return await axios.get("/api/authorize/" + email);
  },
  getUsers: async () => {
    return await axios.get("/api/users");
  },
  addPost: async data => {
    return await axios.post("/api/posts", data);
  },
  getPosts: async () => {
    return await axios.get("/api/posts");
  },
  getUserPosts: async id => {
    return await axios.get("/api/posts/" + id);
  },
  getScreenName: async () => {
    return await axios.get(
      "https://random-word-api.herokuapp.com/word?number=2"
    );
  },
  getProfile: async name => {
    return await axios.get("https://robohash.org/" + name + ".png");
  },
  addUser: async data => {
    return await axios.post("/api/users", data);
  },
  getTags: async tag => {
    return await axios.get("/api/posts/byTag/" + tag);
  }
};

export default API;
