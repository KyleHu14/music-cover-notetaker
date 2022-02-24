import { useState } from "react";

const CreateVideo = () => {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setvideoLink] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setFormErrors(validate(videoLink));

        if (Object.keys(formErrors).length === 0) {
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
        }
    };

    const validate = (videoLink) => {
        const errors = {};
        const youtubeRegex =
            /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

        if (!videoLink) {
            errors.videoLink = "YouTube link is required";
        } else if (!youtubeRegex.test(videoLink)) {
            errors.videoLink = "Invalid YouTube URL";
        }
        return errors;
    };

    return (
        <form className="form-control" onSubmit={onSubmitForm}>
            <label htmlFor="video-link">YouTube Link</label>
            <input
                type="text"
                id="video-link"
                placeholder="https://www.youtube.com/watch?v=OyMdmzfp2Jo"
                value={videoLink}
                onChange={(e) => setvideoLink(e.target.value)}
            />
            <div className="warning-text">{formErrors.videoLink}</div>
            <label htmlFor="video-title">Title</label>
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
