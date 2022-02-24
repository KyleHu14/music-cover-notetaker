import { Fragment, useState, useEffect } from "react";

const DisplayVideo = () => {
    const [videos, setVideos] = useState([]);

    async function getVideos() {
        const res = await fetch("http://localhost:5000/videos");
        const videoArr = await res.json();
        setVideos(videoArr);
    }

    useEffect(() => {
        getVideos();
    });

    return (
        <Fragment>
            <div className="task-list">
                {videos.map((video) => (
                    <div key={video.id} className="task">
                        <div className="title">{video.video_title}</div>
                        Link : {video.video_link}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default DisplayVideo;
