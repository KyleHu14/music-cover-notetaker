import "./App.css";
import { Fragment } from "react";
// Components
import Navbar from "./components/Navbar";
import DisplayVideo from "./components/DisplayVideo";
import CreateVideo from "./components/CreateVideo";

function App() {
    return (
        <Fragment>
            <Navbar />
            <CreateVideo />
            <DisplayVideo />
        </Fragment>
    );
}

export default App;
