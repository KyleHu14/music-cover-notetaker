import { Fragment, useState, useEffect } from "react";

const DisplayVideo = ({ editVideo, setEditVideo }) => {
    // videos saves all the current videos of the PostgreSQL database in an array
    const [videos, setVideos] = useState([]);

    // sends a request to the REST Api to get the videos and update videos variable
    async function getVideos() {
        const res = await fetch("http://localhost:5000/videos");
        const videoArr = await res.json();
        setVideos(videoArr);
    }

    // sends a request to the REST Api to delete the video with the id
    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:5000/videos/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    // changes the editVideo variable
    const handleEdit = ({ id, videoTitle, videoLink }) => {
        setEditVideo({
            id,
            originalTitle: videoTitle,
            originalLink: videoLink,
        });
    };

    // constantly update this component to check for changes of videos
    useEffect(() => {
        getVideos();
    });

    return (
        <Fragment>
            <div className="video-list">
                {/* for every video in the variable videos, we will create a "video" div to contain it with the correct edit / del buttons*/}
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
