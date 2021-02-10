const db = require('../config')
const pool = require("../db");

function Router(app){

    app.get("/api/users", async (req, res) => {                
        try { 
            const response = await pool.query("SELECT * FROM users");
            res.json({success: true, msg: "Retrieved Users Successfully", data: response.rows});
        } catch (error) {
            res.json({success: false, msg: "Failed to Retrieve users", data: error})
            throw error;
        }
    })

    app.get("/api/posts/:userid", async (req, res) => {
        const user_id = req.params.userid
        let result = await db.query(`SELECT * FROM tweets WHERE user_id = ${user_id}`)
        res.json(result)
    })

    app.get("/api/posts", async (req, res) => {
        let result = await db.query('SELECT * FROM tweets')
        res.json(result)
    })

    app.post("/api/users", async (req, res) => {
        const { screen_name, email, profile_image } = req.body;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query("BEGIN")
                
                const newUser = `
                INSERT INTO users (email, screen_name, profile_image, active) 
                VALUES ('${email}', '${screen_name}', '${profile_image}', true )
                `

                await client.query(newUser)

                res.send({success: true, msg: "Used Added Successfully"})
                await client.query("COMMIT")

            } catch (err) {
                await client.query("ROLLBACK")
                throw err
            } finally {
                client.release()
            }
        })().catch(error =>console.error(error.stack))
    })

    app.post("/api/posts", async (req, res) => {
        const { user_id, tweet } = req.body;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query("BEGIN")

                const newPost = `
                    INSERT INTO tweets (user_id, tweet) VALUES (${user_id}, ${tweet})
                `
                await client.query(newPost)

                res.json({ success: true, msg: "Post Added Successfully" })
                await client.query("COMMIT")
            } catch (error) {
                await client.query("ROLLBACK")
                res.json({success: false, msg: "Failed to Add Post", data: error})
                throw error;
            } finally {
                client.release();
            }
        })().catch(error =>console.error(error.stack))
    })
}

module.exports = Router