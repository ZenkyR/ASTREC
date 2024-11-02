import { useForm } from "react-hook-form";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddSousCategory } from "./addSousCategory";

export const AddCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imgCateg, setImgCateg] = useState([]);
  const [msgCateg, setMsgCateg] = useState("");

  const add_categ = async () => {
    const formData = new FormData();
    const file = await fetch(imgCateg[0]).then((res) => res.blob());
    console.log(file);
    formData.append("file", file);
    formData.append("title", msgCateg);
    axios
      .post("https://127.0.0.1:8000/add/category", formData)
      .then((res) => {
        console.log(res.data)
        navigate("/admin_category")
      })
      .catch((err) => console.log(err));
  };

  const textChangeCateg = (e) => {
    setMsgCateg(e.target.value);
  };

  const handleFileChangeCateg = (e) => {
    const file = e.target.files[0];
    if (file !== "") {
      const newImgArray = [];
      newImgArray.push(URL.createObjectURL(file));
      setImgCateg(newImgArray);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin") === "false") {
      navigate("/error404");
    }
  });

  return (
    <>
      <Sidebar />
      <div className="container_add_category">
        <div className="box_category">
          <form onSubmit={handleSubmit(add_categ)}>
            <div className="box-up">
              <div className="box-up-left">
                <h1>Créer une catégorie</h1>
                <div className="label_file_left">
                  <label className="label_file" htmlFor={`fileCateg`}>
                    {imgCateg.length === 0 ? (
                      <img src="http://img.icons8.com/ios/452/upload.png" alt="imgCateg" />
                    ) : (
                      
                    <img src={imgCateg[0]} alt={`imgCateg`} />
                    )}
                  </label>
                  <input
                    id={`fileCateg`}
                    className="input_file"
                    type="file"
                    accept="image/*"
                    onInput={(e) => handleFileChangeCateg(e)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="cateName"
                    id="sousCateNameRight"
                    onChange={textChangeCateg}
                  />
                </div>
              <input type="submit" value="Confirmer" />
              </div>
              <div className="box-up-right">
                <div>
                  <h2>Ajouter des sous-catégories</h2>
                  <AddSousCategory />
                </div>
              </div>
            </div>
            <div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
