const db = require('../config')

function Router(app){

    app.get("/api/users", async (req, res) => {
        let result = await db.query('SELECT * FROM users')
        res.json(result)
    })

    app.get("/api/tweets/:userid", async (req, res) => {
        const user_id = req.params.userid
        let result = await db.query(`SELECT * FROM tweets WHERE user_id = ${user_id}`)
        res.json(result)
    })

    app.get("/api/tweets", async (req, res) => {
        let result = await db.query('SELECT * FROM tweets')
        res.json(result)
    })

    app.post("/api/users", async (req, res) => {
        const { screen_name, email, profile_image } = req.body

        let result = await db.query(`INSERT INTO users (screen_name, email, profile_image, active) VALUES (${screen_name}, ${email}, ${profile_image}, ${true})`)

        res.json(result)
    })

    app.post("/api/tweets", async (req, res) => {
        const { user_id, tweet } = req.body

        let result = await db.query(`INSERT INTO tweets (user_id, tweet) VALUES (${user_id}, ${tweet})`)

        res.json(result)
    })
}

module.exports = Router