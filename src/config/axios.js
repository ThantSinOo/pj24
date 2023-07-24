import axios from "axios";

let usertoken = localStorage.getItem("token");
axios.defaults.baseURL = "https://api.kookpyit.com/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${usertoken}`;
console.warn("user token", usertoken);

export default axios;




