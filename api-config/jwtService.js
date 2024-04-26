import axios from "axios";
import React from "react";
import Cookies from "cookies-js";

class JwtService extends React.Component {
    init() {
        this.setDefaultConfig();
    }

    setDefaultConfig = () => {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    };

    setSession = (accessToken, userInfo) => {
        if (accessToken && userInfo) {
            // const isUserInfoPresent = Object.keys(userInfo)?.length ? JSON.stringify(userInfo) : null;

            localStorage.setItem("jwt_access_token", accessToken);

            // if (isUserInfoPresent)
            localStorage.setItem("101_user", JSON.stringify(userInfo));
            // else localStorage.removeItem("101_user");
        } else {
            localStorage.removeItem("jwt_access_token");
            localStorage.removeItem("101_user");
        }
    };

    setGuestId = (guest_id) => {
        if (guest_id) {
            localStorage.setItem("guest_id", guest_id);
        }
    };

    logout = () => {
        this.setSession(null);
        if (typeof window !== "undefined") localStorage.clear();
    };

    getAccessToken = () => {
        if (typeof window !== "undefined") return window.localStorage.getItem("jwt_access_token");
    };

    getUser = () => {
        if (typeof window !== "undefined") return window.localStorage.getItem("101_user");
    };

    getRedirectURL = () => {
        if (typeof window !== "undefined") return Cookies.get("redirect_url") || null;
    };

    getGuestId = () => {
        if (typeof window !== "undefined") return window.localStorage.getItem("guest_id");
    };

    removedRedirectURL = () => {
        if (typeof window !== "undefined") return Cookies.expire("redirect_url");
    };
    removedGuestId = () => {
        if (typeof window !== "undefined") return window.localStorage.removeItem("guest_id");
    };
}

const instance = new JwtService();

export default instance;
