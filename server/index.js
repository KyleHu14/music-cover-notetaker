const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// [GET Requests]
// 1. Returns all videos
app.get("/video", async (req, res) => {
    try {
        const allQuestions = await pool.query("SELECT * FROM videos");
        res.json(allQuestions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// 2. Gets a specific video
app.get("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const video = await pool.query("SELECT * FROM videos WHERE id = $1", [
            id,
        ]);

        res.json(video.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// 3. Get a single timestamp with a timestamp id
app.get("/timestamp/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const videoData = await pool.query(
            "SELECT * FROM video_data WHERE id = $1",
            [id]
        );
        res.json(videoData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// 3. Get all timestamps from video id
app.get("/timestamp/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const videoData = await pool.query(
            "SELECT * FROM video_data WHERE video_id = $1",
            [id]
        );
        console.log("here");
        res.json(videoData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// [POST Requests]
// 1. Create a video
app.post("/video", async (req, res) => {
    try {
        const { vidLink } = req.body;
        const newVideo = await pool.query(
            "INSERT INTO videos(video_link) VALUES($1) RETURNING *",
            [vidLink]
        );

        res.json(newVideo.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

// 2. Create a timestamp
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

// [PUT Requests]
// Change a video's video_link
app.put("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { video_link } = req.body;

        const updatedVideo = await pool.query(
            "UPDATE videos SET video_link = $1 WHERE id = $2",
            [video_link, id]
        );

        res.json("Video Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Change a timestamp
app.put("/timestamp/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { timestamp, description } = req.body;

        const updatedTimestamp = await pool.query(
            "UPDATE video_data SET timestamp = $1, description = $2 WHERE id = $3",
            [timestamp, description, id]
        );

        res.json("Timestamp Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// [DELETE Requests]
// Delete a video
app.delete("/video/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteVideoData = await pool.query(
            "DELETE FROM video_data WHERE video_id = $1",
            [id]
        );
        const deleteVideos = await pool.query(
            "DELETE FROM videos WHERE id = $1",
            [id]
        );
        res.json("Video Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a timestamp
app.delete("/timestamp/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTimestamp = await pool.query(
            "DELETE FROM video_data WHERE id = $1",
            [id]
        );
        res.json("Timestamp Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
