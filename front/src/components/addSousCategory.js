import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddSousCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imgSousCateg, setImgSousCateg] = useState([]);
  const [msgSousCateg, setMsgSousCateg] = useState("");
  const [IdSousCateg, setIdSousCateg] = useState(0);

  const [category, setCategory] = useState([]);

  const add_sous_categ = async () => {
    if (msgSousCateg === "") {
      alert("Veuillez entrer un nom de sous catégorie");
      return;
    }
    let sous_categ = IdSousCateg;
    console.log(sous_categ);
    if (IdSousCateg === 0) {
      sous_categ = category[0].id;
      console.log(sous_categ);
    }


    const formData_cat = new FormData();
    const sous_file = await fetch(imgSousCateg[0]).then((res) => res.blob());
    formData_cat.append("sous_file", sous_file);
    formData_cat.append("sous_title", msgSousCateg);
    formData_cat.append("idCat", sous_categ);

    axios
      .post("https://127.0.0.1:8000/add/sous_category", formData_cat)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const textChangeSousCateg = (e) => {
    setMsgSousCateg(e.target.value);
  };

  const idChangeSousCateg = (e) => {
    setIdSousCateg(e.target.value);
  };

  const handleFileChangeSousCateg = (e) => {
    const sous_file = e.target.files[0];
    if (sous_file !== "") {
      const newImgArray = [];
      newImgArray.push(URL.createObjectURL(sous_file));
      setImgSousCateg(newImgArray);
    }
  };

  return (
    <div className="sous-categ-bloc">
      <form onSubmit={handleSubmit(AddSousCategory)}>
        <div className="label_file_right">
          <label className="label_file" htmlFor={`fileSousCateg`}>
            {imgSousCateg.length === 0 ? (
              <img
                src="http://img.icons8.com/ios/452/upload.png"
                alt="upload"
              />
            ) : (
              <img src={imgSousCateg[0]} alt={`imgSousCateg`} />
            )}
          </label>
          <input
            id={`fileSousCateg`}
            className="input_file"
            type="file"
            accept="image/*"
            onInput={(e) => handleFileChangeSousCateg(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="cateName"
            id="sousCateNameRight"
            onChange={textChangeSousCateg}
          />
        </div>
        <select onChange={idChangeSousCateg}>
          {category.map((category_name) => (
            <option key={category_name.id} value={category_name.id}>
              {category_name.name}
            </option>
          ))}
        </select>

        <div>
          <input
            type="button"
            value="Valider"
            id="submitSousCateName"
            onClick={add_sous_categ}
          />
        </div>
      </form>
    </div>
  );
};
