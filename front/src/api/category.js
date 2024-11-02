import axios from "axios";

const URL_API = 'https://127.0.0.1:8000/'
export const getCategory = async (id) => await axios
    .get(`${URL_API}category/${id}`)

export const getSubCategory = async (id) => await axios
    .get(`${URL_API}sub/category/${id}`)

export const getCategories = async () => await axios
    .get(`${URL_API}category`)
