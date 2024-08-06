import React from "react";

import "./DarkModeToggle.css";

export const DarkModeToggle = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark");
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light");
    }
    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === "dark") setDarkMode();

    const toggleTheme = (e) => {
        if(e.target.checked) setDarkMode();
        else setLightMode();
    }

    return(
        <div id="dark-mode-toggle-container">
            <input
                type="checkbox"
                id="dark_mode_toggle"
                className="dark_mode_toggle"
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label id="dark_mode_toggle_label" htmlFor="dark_mode_toggle"></label>
        </div>
    );
}