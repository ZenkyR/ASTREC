import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/category";
import Breadscrumbs from "./Breadscrumbs";

export const UserCategory = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    getCategories().then(({ data }) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>Catégories</h1>
      </div>
      <Breadscrumbs
        items={[
          { path: "/", breadcrumb: "Home" },
          { path: "/category", breadcrumb: "Category" },
        ]}
      />
      <div className="display-categorie-home">
        <div className="category_mv">
          {categories.map((category_name) => (
            <Link to={"/category/" + category_name.id}>
              <div key={category_name.id} className="contains-categorie-home">
                <div className="img-categorie-home">
                  <img src={category_name.img} alt="" /> 
                </div>
                <h2>{category_name.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
