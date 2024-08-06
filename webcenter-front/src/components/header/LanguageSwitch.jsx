import React from "react";
import {useTranslation} from "react-i18next";

import "./LanguageSwitch.css";

export const LanguageSwitch = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    }

    return(
        <div id="language-switch-container">
            <select name="language-select" id="language-select" onChange={changeLanguage} defaultValue={i18n.language}>
                <option value="en">{t("lang.english")}</option>
                <option value="pl">{t("lang.polish")}</option>
            </select>
        </div>
    );
}