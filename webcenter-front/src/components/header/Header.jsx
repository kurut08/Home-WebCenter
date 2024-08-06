import React from "react";
import {useTranslation} from "react-i18next";

import {DarkModeToggle} from "./DarkModeToggle";
import {LanguageSwitch} from "./LanguageSwitch";

import "./Header.css";

export const Header = () => {
    const {t} = useTranslation();

    return(
        <div id="header">
            <div id="home-container">
                <h4><a href="/">{t("home")}</a></h4>
            </div>

            <div id="filler">

            </div>

            <div id="toggle-container">
                <DarkModeToggle/>
            </div>

            <div id="lang-container">
                <LanguageSwitch/>
            </div>
        </div>
    );
}