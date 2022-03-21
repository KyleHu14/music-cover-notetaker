const express = require("express");
const pool = require("./db");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// [GET Requests]
// 1. Returns all videos
app.get("/videos", async (req, res) => {
    try {
        const allVideos = await pool.query("SELECT * FROM videos");
        res.json(allVideos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// 2. Gets a specific video
app.get("/videos/:id", async (req, res) => {
    try {
        // 1. Getting video id from URL segments
        const { id } = req.params;
        // 2. psql query
        const video = await pool.query("SELECT * FROM videos WHERE id = $1", [
            id,
        ]);
        // 3. Return json
        res.json(video.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// 3. Get a single timestamp with a timestamp id
app.get("/timestamp/:id", async (req, res) => {
    try {
        // 1. Getting video id from URL segments
        const { id } = req.params;
        // 2. psql query
        const videoData = await pool.query(
            "SELECT * FROM videos_data WHERE id = $1",
            [id]
        );
        // 3. Return json
        res.json(videoData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// 3. Get all timestamps from video id
app.get("/timestamp/videos/:id", async (req, res) => {
    try {
        // 1. Getting video id from URL segments
        const { id } = req.params;
        // 2. psql query
        const videoData = await pool.query(
            "SELECT * FROM videos_data WHERE video_id = $1",
            [id]
        );
        // 3. Return json
        res.json(videoData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// [POST Requests]
// 1. Create a video
app.post("/videos", async (req, res) => {
    try {
        // 1. Getting a video's link and video's title from a request's body (json)
        const { videoLink, videoTitle } = req.body;
        // 2. Assuming there is a video title, assign it to a variable
        let finalVideoTitle = videoTitle;
        // 3. If there is no video title, use ytdl to find the official title of the youtube video
        if (videoTitle === "") {
            const vidMetaData = await ytdl.getBasicInfo(videoLink);
            finalVideoTitle = vidMetaData.videoDetails.title;
        }
        // 4. psql query
        const newVideo = await pool.query(
            "INSERT INTO videos(video_link, video_title) VALUES($1, $2) RETURNING *",
            [videoLink, finalVideoTitle]
        );
        // 5. Return json
        res.json(newVideo.rows[0]);
    } catch (err) {
        console.error(err);
    }
});

// 2. Create a timestamp
app.post("/videos/:id", async (req, res) => {
    try {
        // 1. Get the id of video from the url segments
        const { id } = req.params;
        // 2. Get the timestamp and description of the timestamp from the body of the request
        const { timestamp, description } = req.body;
        // 3. psql query
        const newTimeStamp = await pool.query(
            "INSERT INTO videos_data(timestamp, description, video_id) VALUES($1, $2, $3) RETURNING *",
            [timestamp, description, id]
        );
        // 4. Return json
        res.json(newTimeStamp.rows);
    } catch (err) {
        console.error(err);
    }
});

// [PUT Requests]
// Change a video
app.put("/videos/:id", async (req, res) => {
    try {
        // 1. Get the id of video from the url segments
        const { id } = req.params;
        // 2. Getting a video's link and video's title from a request's body (json)
        const { videoLink, videoTitle } = req.body;
        // 3. psql query
        const updatedVideo = await pool.query(
            "UPDATE videos SET video_link = $1, video_title = $2 WHERE id = $3",
            [videoLink, videoTitle, id]
        );
        // 4. Return json
        res.json("Video Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Change a timestamp
app.put("/timestamp/:id", async (req, res) => {
    try {
        // 1. Get the id of video from the url segments
        const { id } = req.params;
        // 2. Get the timestamp and description of the timestamp from the body of the request
        const { timestamp, description } = req.body;
        // 3. psql query
        const updatedTimestamp = await pool.query(
            "UPDATE videos_data SET timestamp = $1, description = $2 WHERE id = $3",
            [timestamp, description, id]
        );
        // 4. Return json
        res.json("Timestamp Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// [DELETE Requests]
// Delete a video
app.delete("/videos/:id", async (req, res) => {
    try {
        // 1. Get the id of video from the url segments
        const { id } = req.params;
        // 2. First delete all of the video's timestamps
        const deleteVideo = await pool.query(
            "DELETE FROM videos_data WHERE video_id = $1",
            [id]
        );
        // 3. After step 3, delete the video itself
        const deleteVideos = await pool.query(
            "DELETE FROM videos WHERE id = $1",
            [id]
        );
        // 4. Return json
        res.json("Video Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a timestamp
app.delete("/timestamp/:id", async (req, res) => {
    try {
        // 1. Get the id of video from the url segments
        const { id } = req.params;
        // 2. psql query
        const deleteTimestamp = await pool.query(
            "DELETE FROM videos_data WHERE id = $1",
            [id]
        );
        // 3. Return json
        res.json("Timestamp Deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
