import axios from "axios";
import { httphost } from "./httpvariable";

export default axios.create({
    baseURL: httphost,
    headers: {
        "Content-type": "application/json",
    }
});