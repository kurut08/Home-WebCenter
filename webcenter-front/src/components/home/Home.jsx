import React from "react";

import {Footer} from "../footer/Footer";
import {Header} from "../header/Header";

import "./Home.css";

function Home()
{
    return(
        <div id="home-page">
            <Header/>
            <Footer/>
        </div>
    );
}

export default Home;