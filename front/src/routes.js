import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddArticle } from "./components/add_article";
import { Navbar } from "./components/navbar";
import { Detail } from "./components/detail";
import { Home } from "./components/Home";
import { Account } from "./components/account";
import { Profil } from "./components/profil";
import { AddCategory } from "./components/add_categories";
import { AddForm } from "./components/add_form";
import { Panier } from "./components/panier";
import { Article } from "./components/article";
import { ModifArticle } from "./components/modif_article";
import { UserCategory } from "./components/user_category";
import { Error404 } from "./components/error404";
import {SubCategory} from "./components/sub_category";
export default [
    { path: "/", name: "Home", Component: Home },
    { path: "/category/:name", name: "SubCategory", Component: SubCategory },
    {
        path: "/category/:name",
        name: "SubCategory",
        Component: SubCategory
    },
];