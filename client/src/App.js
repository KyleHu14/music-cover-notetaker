import "./App.css";
import { Fragment, useState } from "react";
// Components
import Navbar from "./components/Navbar";
import DisplayVideo from "./components/DisplayVideo";
import CreateVideo from "./components/CreateVideo";

function App() {
    // editVideo serves to store information about a video that will be edited
    // editVideo has 3 properties : { id, originalTitle, originalLink }
    // Display video updates editVideo with info that CreateVideo will use
    const [editVideo, setEditVideo] = useState({});

    return (
        <Fragment>
            <Navbar />
            <CreateVideo editVideo={editVideo} setEditVideo={setEditVideo} />
            <DisplayVideo editVideo={editVideo} setEditVideo={setEditVideo} />
        </Fragment>
    );
}

export default App;
