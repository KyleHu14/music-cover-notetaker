const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// [GET Requests]
// Returns all videos
app.get("/video", async (req, res) => {
    try {
        const allQuestions = await pool.query("SELECT * FROM videos");
        res.json(allQuestions.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// [POST Requests]
// Create a video
app.post("/video", async (req, res) => {
    try {
        const { vidLink } = req.body;
        const newVideo = await pool.query(
            "INSERT INTO videos(video_link) VALUES($1) RETURNING *",
            [vidLink]
        );

        res.json(newVideo.rows);
    } catch (err) {
        console.error(err);
    }
});

// Create a timestamp
app.post("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { timestamp, description } = req.body;
        const newTimeStamp = await pool.query(
            "INSERT INTO video_data(timestamp, description, video_id) VALUES($1, $2, $3) RETURNING *",
            [timestamp, description, id]
        );
        res.json(newTimeStamp.rows);
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
