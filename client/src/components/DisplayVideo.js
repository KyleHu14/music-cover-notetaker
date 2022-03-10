import { Fragment, useState, useEffect } from "react";

const DisplayVideo = ({ editVideo, setEditVideo }) => {
    const [videos, setVideos] = useState([]);

    async function getVideos() {
        const res = await fetch("http://localhost:5000/videos");
        const videoArr = await res.json();
        setVideos(videoArr);
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:5000/videos/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEdit = ({ id, videoTitle, videoLink }) => {
        setEditVideo({
            id,
            originalTitle: videoTitle,
            originalLink: videoLink,
        });
    };

    useEffect(() => {
        getVideos();
    });

    return (
        <Fragment>
            <div className="video-list">
                {videos.map((video) => (
                    <div key={video.id} className="video">
                        <div className="text">
                            <div className="title">{video.video_title}</div>
                            Link : {video.video_link}
                        </div>
                        <div className="buttons">
                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(video.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn-edit"
                                onClick={() =>
                                    handleEdit({
                                        id: video.id,
                                        videoTitle: video.video_title,
                                        videoLink: video.video_link,
                                    })
                                }
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default DisplayVideo;
