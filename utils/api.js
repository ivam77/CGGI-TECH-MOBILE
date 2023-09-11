import axios from "axios";
export const apiUrl = "https://mobile-cggi.onrender.com/api/"
export const api = axios.create({baseURL: apiUrl})
export const endpoints = {
    products: "products/",
    product: "products/",
    login: "user/signin",
    register: "user/register",
    google: "user/google",
    verify: "user/verify/",
}