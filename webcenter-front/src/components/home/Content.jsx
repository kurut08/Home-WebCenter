import React from "react";

import {Containers} from "./Containers";
import {OsStatus} from "./os-status";

import "./Content.css";

export const Content = () => {
    return(
        <div id="homepage_content">
            <Containers/>
            <OsStatus/>
        </div>
    );
}