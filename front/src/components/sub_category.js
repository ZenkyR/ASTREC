import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadscrumbs from "./Breadscrumbs";
import { getCategory, getSubCategory } from "../api/category";

export const SubCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);

  const fetchCategory = () => {
    getCategory(id).then(({ data }) => setCategory(data));
  };
  const getSubCategories = () => {
    getSubCategory(id).then(({ data }) => setSubCategories(data));
  };
  useEffect(() => {
    fetchCategory();
    getSubCategories();
  }, []);

  return (
    <div>
      <div className="subCategory_title">
        <h2>SubCatégories de {category.name}</h2>
      </div>
      <Breadscrumbs
        items={[
          { path: "/", breadcrumb: "Home" },
          { path: "/category", breadcrumb: "Category" },
          { path: "/category/:id", breadcrumb: category.name },
        ]}
      />
      <div className="display-categorie-home">
        <div className="category_mv">
          {subCategories.map((category_name) => (
            <Link to={"/sub_category/" + category_name.id}>
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
