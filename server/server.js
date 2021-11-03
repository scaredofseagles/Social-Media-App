const express = require('express')
const path = require('path')
const cors = require("cors");
const app = express()
const routes = require('./routes')

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

routes(app)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
 
 
app.listen(PORT, () => {
    console.log(`🌎 ==> Serving up some spicy stuff on port ${PORT}!`);
});