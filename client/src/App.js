import "./App.css";
import { Fragment, useState } from "react";
// Components
import Navbar from "./components/Navbar";
import DisplayVideo from "./components/DisplayVideo";
import CreateVideo from "./components/CreateVideo";

function App() {
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
