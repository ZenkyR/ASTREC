import React from "react";
import "./App.css";
import "./details.css";
import "./home.css";
import "./category.css";
import "./Filter.css";
import "./Breadscrumbs.css";
import "./Search.css";
import "./paiement.css";
import "./users.css";
import "./article_sub_categ.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddArticle } from "./components/add_article";
import { Navbar } from "./components/navbar";
import { Detail } from "./components/detail";
import { Home } from "./components/Home";
import { Account } from "./components/account";
import { Profil } from "./components/profil";
import { AddCategory } from "./components/add_categories";
import { Panier } from "./components/panier";
import { Article } from "./components/article";
import { ModifArticle } from "./components/modif_article";
import { UserCategory } from "./components/user_category";
import { Error404 } from "./components/error404";
import { ViewSearch } from "./components/view_search";
import { ArticleByCategory } from "./components/Article_by_category";
import { SubCategory } from "./components/sub_category";
import { useState } from "react";
import { AdminCategory } from "./components/admin_category";
import { Users } from "./components/admin_users";
import { ModifCategory } from "./components/modif_category";
import { AdminSubCategory } from "./components/admin_subCategory";
import { ModifSousCategory } from "./components/modif_sousCategory";
import { AdminFDP } from "./components/admin_fdp";
import { AddFdp } from "./components/add_fdp";
import { UpdateFDP } from "./components/modif_fdp";  
import { Paiement } from "./components/paiement";

const App = () => {
  const [cart, setCart] = useState([]);

  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_article" element={<AddArticle />} />
        <Route path="/article" element={<Article />} />
        <Route path="/modif_article/:id" element={<ModifArticle />} />
        <Route
          path="/detail/:id"
          element={
            <Detail
              handleAddArticle={(article) => {
                setCart((currentCart) => [...currentCart, article]);
                console.log(article);
              }}
            />
          }
        />
        <Route path="/account" element={<Account />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/add_categories" element={<AddCategory />} />
        <Route path="/users" element={<Users />} />
        <Route path="/panier" element={<Panier cart={cart} />} />
        <Route path="/category" element={<UserCategory />} />
        <Route path="/search" element={<ViewSearch />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/add_fdp" element={<AddFdp />} />
        <Route path="/admin_fdp" element={<AdminFDP />} />
        <Route path="/category/:id" element={<SubCategory />} />
        <Route path="/sub_category/:id" element={<ArticleByCategory />} />
        <Route path="/admin_category" element={<AdminCategory />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/admin_subCategory/:id" element={<AdminSubCategory />} />
        <Route path="/modif_category/:id" element={<ModifCategory />} />
        <Route path="/modif_subCategory/:id" element={<ModifSousCategory />} />
        <Route path="/modif_fdp/:id" element={<UpdateFDP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
