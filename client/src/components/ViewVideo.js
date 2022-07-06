import React, { Fragment, useState, useEffect } from "react";
import YouTube from "react-youtube";

const ViewVideo = ({ viewVideo, setViewVideo }) => {
    // currTime is the time stamp
    // timeDesc is the description of the time stamp
    const [timeDesc, setDesc] = useState("Write a description!");
    const [currTime, setTime] = useState(0);
    // The player is the youtube player object
    // Used to get information abt video being played
    const [player, setPlayer] = useState(0);
    const [timeStamps, setTimestamps] = useState([]);
    // Options for the YouTube component
    const opts = {
        height: "315",
        width: "560",
        playerVars: {
            autoplay: 0,
        },
    };

    const checkPlayerStatus = (e) => {
        setTime(e.target.getCurrentTime());
        // store e.target as its a player into a useState
    };

    const handleReady = (e) => {
        setPlayer(e.target);
    };

    const handleTimestamp = async () => {
        try {
            // Prepare the body of our post request
            const body = {
                id: viewVideo.id,
                timestamp: currTime,
                description: timeDesc,
            };
            // Create a request to the rest API
            const res = await fetch(
                `http://localhost:5000/videos/${viewVideo.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );
            setDesc("");
            getTimeStamps();
        } catch (error) {
            console.error(error);
        }
    };

    const getTimeStamps = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/timestamp/videos/${viewVideo.id}`
            );
            const timeStampArr = await res.json();
            setTimestamps(timeStampArr);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTimeStamps();
    }, [viewVideo]);

    return (
        <Fragment>
            <div className="video-view">
                {Object.keys(viewVideo).length === 0 ? (
                    <h1>No Selected Video</h1>
                ) : (
                    <div>
                        <h2>Current Video : {viewVideo.video_title}</h2>
                        <YouTube
                            videoId={viewVideo.embed_id}
                            opts={opts}
                            onStateChange={(e) => checkPlayerStatus(e)}
                            onReady={(e) => handleReady(e)}
                        />
                        <h3>Current Time : {currTime}</h3>
                        <input
                            type="text"
                            id="video-title"
                            value={timeDesc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <button id="create-btn" onClick={handleTimestamp}>
                            Create Time Stamp
                        </button>
                        {timeStamps.map((timeStamp) => (
                            <div>
                                Time : {timeStamp.timestamp}
                                <br></br>
                                Description : {timeStamp.description}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default ViewVideo;
