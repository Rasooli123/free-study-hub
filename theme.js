/* =========================================================
   FREE STUDY HUB
   GLOBAL THEME SYSTEM
   Created by AHR
   ========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY = "freeStudyHubTheme";

    /* =====================================================
       GET CURRENT THEME
       ===================================================== */

    function getTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);

        return saved === "dark"
            ? "dark"
            : "light";
    }


    /* =====================================================
       APPLY THEME
       ===================================================== */

    function applyTheme(theme) {

        const body = document.body;
        const html = document.documentElement;

        if (!body) {
            return;
        }

        const isDark = theme === "dark";

        /* Remove old classes */

        body.classList.remove(
            "light-mode",
            "dark-mode"
        );

        html.classList.remove(
            "theme-light",
            "theme-dark"
        );

        /* Apply correct classes */

        if (isDark) {

            body.classList.add("dark-mode");
            html.classList.add("theme-dark");

        } else {

            body.classList.add("light-mode");
            html.classList.add("theme-light");

        }

        updateThemeButton(isDark);
    }


    /* =====================================================
       UPDATE BUTTON
       ===================================================== */

    function updateThemeButton(isDark) {

        const buttons = document.querySelectorAll(
            "#themeToggle, .theme-toggle, [data-theme-toggle]"
        );

        buttons.forEach(function (button) {

            const icon =
                button.querySelector("#themeIcon");

            if (icon) {

                icon.textContent =
                    isDark
                        ? "☀️"
                        : "🌙";

            }

            button.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            button.setAttribute(
                "aria-pressed",
                String(isDark)
            );

            button.classList.toggle(
                "dark-active",
                isDark
            );
        });
    }


    /* =====================================================
       SAVE + APPLY
       ===================================================== */

    function setTheme(theme) {

        const newTheme =
            theme === "dark"
                ? "dark"
                : "light";

        localStorage.setItem(
            STORAGE_KEY,
            newTheme
        );

        applyTheme(newTheme);
    }


    /* =====================================================
       TOGGLE
       ===================================================== */

    function toggleTheme() {

        const current =
            getTheme();

        const next =
            current === "dark"
                ? "light"
                : "dark";

        setTheme(next);
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        const theme =
            getTheme();

        applyTheme(theme);


        const buttons =
            document.querySelectorAll(
                "#themeToggle, .theme-toggle, [data-theme-toggle]"
            );


        buttons.forEach(function (button) {

            if (
                button.dataset.themeReady === "true"
            ) {
                return;
            }

            button.dataset.themeReady = "true";


            button.addEventListener(
                "click",
                function () {

                    toggleTheme();

                }
            );

        });


        updateThemeButton(
            theme === "dark"
        );
    }


    /* =====================================================
       DOM READY
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }


    /* =====================================================
       GLOBAL API
       ===================================================== */

    window.FreeStudyHubTheme = {

        getTheme: getTheme,

        setTheme: setTheme,

        toggleTheme: toggleTheme,

        applyTheme: applyTheme

    };

})();