import { Fragment, useState, useEffect } from "react";

const DisplayVideo = () => {
    const [videos, setVideos] = useState([]);

    async function getVideos() {
        const res = await fetch("http://localhost:5000/videos");
        const videoArr = await res.json();
        setVideos(videoArr);
    }

    async function delVideo(id) {
        try {
            const res = await fetch(`http://localhost:5000/videos/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getVideos();
    });

    return (
        <Fragment>
            <div className="task-list">
                {videos.map((video) => (
                    <div key={video.id} className="task">
                        <div className="text">
                            <div className="title">{video.video_title}</div>
                            Link : {video.video_link}
                        </div>
                        <div className="buttons">
                            <button
                                className="btn-delete"
                                onClick={() => delVideo(video.id)}
                            >
                                Delete
                            </button>
                            <button className="btn-edit">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default DisplayVideo;
