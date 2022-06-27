import React, { Fragment, useState, useEffect } from "react";
import YouTube from "react-youtube";

const ViewVideo = ({ viewVideo, setViewVideo }) => {
    const opts = {
        height: "315",
        width: "560",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <Fragment>
            <div className="video-view">
                {Object.keys(viewVideo).length === 0 ? (
                    <h1>No Selected Video</h1>
                ) : (
                    <div>
                        <div>Current Video : {viewVideo.video_title}</div>
                        <Youtube />
                        <iframe
                            width="560"
                            height="315"
                            src={viewVideo.embed_link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default ViewVideo;
