import { useState } from "react";

const CreateVideo = () => {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setvideoLink] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { videoTitle, videoLink };
            const res = await fetch("http://localhost:5000/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            setVideoTitle("");
            setvideoLink("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="form-control" onSubmit={onSubmitForm}>
            <label for="video-link">YouTube Link</label>
            <input
                type="text"
                id="video-link"
                placeholder="https://www.youtube.com/watch?v=OyMdmzfp2Jo"
                value={videoLink}
                onChange={(e) => setvideoLink(e.target.value)}
            />
            <label for="video-title">Title</label>
            <input
                type="text"
                id="video-title"
                placeholder="YouTube Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
            />
            <button id="create-btn" type="submit">
                Create
            </button>
        </form>
    );
};

export default CreateVideo;
