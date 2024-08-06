import React from "react";
import {useTranslation} from "react-i18next";

import "./Footer.css";

export const Footer = () => {
    const {t} = useTranslation();

    return(
        <div id="footer">
            <h4 id="author">{t("footer.credits")}</h4>
        </div>
    );
}