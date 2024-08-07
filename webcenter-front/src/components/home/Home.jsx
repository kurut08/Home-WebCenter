import React from "react";

import {Content} from "./Content";
import {Footer} from "../footer/Footer";
import {Header} from "../header/Header";

import "./Home.css";

function Home()
{
    return(
        <div id="home-page">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default Home;