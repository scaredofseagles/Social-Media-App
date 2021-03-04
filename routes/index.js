//const db = require('../config')
const pool = require("../db");

function Router(app){

    app.get("/api/users", async (req, res) => {                
        try { 
            const result = await pool.query("SELECT * FROM users");
            res.json({success: true, msg: "Retrieved Users Successfully", response: result.rows});
        } catch (error) {
            res.json({success: false, msg: "Failed to Retrieve users", response: error})
            throw error;
        }
    })

    app.get("/api/posts/:userid", async (req, res) => {
        const user_id = req.params.userid;

        let result = await pool.query(`SELECT * FROM tweets WHERE user_id = ${user_id} ORDER BY created_at DESC`);
        res.json(result);
    })

    app.get("/api/posts/byTag/:tag", async (req, res) => {
        const tag = req.params.tag;

        let result = await pool.query(`SELECT * FROM tweets WHERE tags = ${tag}`)
        res.json(result)
    })

    app.get("/api/posts", async (req, res) => {
        try { 
            const result = await pool.query(`
                SELECT user_id, screen_name, profile_image, tweets.created_at, tweet, tags 
                FROM tweets 
                    LEFT JOIN users ON user_id = users.id
                WHERE active = true
                ORDER BY tweets.created_at DESC
            `);
            res.json({success: true, msg: "Retrieved Posts Successfully", response: result.rows});
        } catch (error) {
            res.json({success: false, msg: "Failed to Retrieve Posts", response: error})
            throw error;
        }
    })

    async function check4Duplicates(req, res, next) {
        const { screen_name, email } = req.body;

        const newQuery = await pool.query(`SELECT * FROM users WHERE screen_name = '${screen_name}' OR email = '${email}'`);

        if (newQuery.rows.length === 0) next();
        else return res.send({ success: false, msg: "User already exists" });
    }

    app.post("/api/users", check4Duplicates, async (req, res) => {
        const { screen_name, email, profile_image } = req.body;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query("BEGIN")
                
                const newUser = `
                INSERT INTO users (email, screen_name, profile_image, active) 
                VALUES ('${email}', '${screen_name}', '${profile_image}', true )
                RETURNING *
                `

                let result = await client.query(newUser)

                res.send({success: true, msg: "Used Added Successfully", response: result.rows[0]})
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
        const { user_id, tweet, tags } = req.body;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query("BEGIN")

                const newPost = `
                    INSERT INTO tweets (user_id, tweet, tags) VALUES ('${user_id}', '${tweet}', 
                    ARRAY[${tags.map(item => `'${item.trim()}'`)}])
                `
                await client.query(newPost)

                res.json({ success: true, msg: "Post Added Successfully" })
                await client.query("COMMIT")
            } catch (error) {
                await client.query("ROLLBACK")
                res.json({success: false, msg: "Failed to Add Post", response: error})
                throw error;
            } finally {
                client.release();
            }
        })().catch(error =>console.error(error.stack))
    })

    app.put("/api/users", async (req, res) => {
        
    })

}

module.exports = Router