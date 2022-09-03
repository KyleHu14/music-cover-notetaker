import { useState, useEffect } from "react";

const CreateVideo = ({ editVideo, setEditVideo }) => {
    // variables that store a video object to be created
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    // a variable that stores any errors in a form
    const [formErrors, setFormErrors] = useState({});
    // this text is the text used in the form and switches between edit / create
    const [formButtonText, setFormButtonText] = useState("");

    // 1. Checks for any errors in the form
    // 2. If there are 0 form errors -> create a new video object thru the REST api
    // 3. Else -> edit an existing video thru the REST api
    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (Object.keys(formErrors).length === 0) {
            if (Object.keys(editVideo).length === 0) {
                try {
                    const body = { videoTitle, videoLink };
                    const res = await fetch("http://localhost:5000/videos", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    });

                    setVideoTitle("");
                    setVideoLink("");
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    const body = { videoTitle, videoLink };
                    const res = await fetch(
                        `http://localhost:5000/videos/${editVideo.id}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body),
                        }
                    );

                    setVideoTitle("");
                    setVideoLink("");
                    setFormButtonText("Create");
                    setEditVideo({});
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    // If editVideo is not empty, change the form to include the currently edited video's info
    // Change the button to edit
    // Otherwise, change it to create
    useEffect(() => {
        if (Object.keys(editVideo).length !== 0) {
            setVideoTitle(editVideo.originalTitle);
            setVideoLink(editVideo.originalLink);
            setFormButtonText("Edit");
        } else {
            setFormButtonText("Create");
        }
    }, [editVideo]);

    useEffect(() => {
        setFormErrors(validate(videoLink));
    }, [videoLink]);

    // validates if a youtube link is correct with Regex
    // if youtube link is not valid, return an error object
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
        <form className="create-video-form" onSubmit={onSubmitForm}>
            {/* Form's Title */}
            <div className="form-title">Add A New Video</div>
            {/* Input for Video Link */}
            <div className="link-input">
                <div className="form-label">YouTube Link</div>
                <input
                    className="form-input"
                    type="text"
                    id="video-link"
                    placeholder="https://www.youtube.com/watch?v=OyMdmzfp2Jo"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                />
                <div className="warning-text">{formErrors.videoLink}</div>
            </div>
            {/* Input for Video's Title */}
            <div className="title-input">
                <div className="form-label">YouTube Video Title</div>
                <input
                    className="form-input"
                    type="text"
                    id="video-title"
                    placeholder="YouTube Video Title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                />
            </div>
            {/* Submit Button */}
            <div className="btn-container">
                <button className="create-btn" type="submit">
                    {formButtonText}
                </button>
            </div>
        </form>
    );
};

export default CreateVideo;
