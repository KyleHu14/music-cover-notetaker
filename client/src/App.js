import "./styles/App.css";
import "./styles/CreateVideo.css";
import "./styles/General.css";
import { Fragment, useState } from "react";
// Components
import DisplayVideo from "./components/DisplayVideo";
import CreateVideo from "./components/CreateVideo";
import ViewVideo from "./components/ViewVideo";

function App() {
    // editVideo serves to store information about a video that will be edited
    // editVideo has 3 properties : { id, originalTitle, originalLink }
    // Display video updates editVideo with info that CreateVideo will use
    const [editVideo, setEditVideo] = useState({});
    // viewVideoId
    const [viewVideo, setViewVideo] = useState({});

    return (
        <Fragment>
            <CreateVideo editVideo={editVideo} setEditVideo={setEditVideo} />
            <DisplayVideo
                editVideo={editVideo}
                setEditVideo={setEditVideo}
                setViewVideo={setViewVideo}
            />
            <ViewVideo viewVideo={viewVideo} setViewVideo={setViewVideo} />
        </Fragment>
    );
}

export default App;
