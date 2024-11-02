import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import { Carousel } from "react-responsive-carousel";

export const ModifArticle = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [imgArray, setImgArray] = useState([]);
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
  const [msg, setMsg] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [display, setDisplay] = useState(false);
  const [idCateg, setIdCateg] = useState("1");

  
  const [inputs, setInput] = useState([]);
  const [tags, setTags] = useState([]);
  
  const handleClick = () => {
    setInput([...inputs, inputs.length]);
  };
  
  const tag = (e) => {
    setTags([...tags, e.value]);
    e.value = "";
  };
  console.log(msg);
  const { register, handleSubmit } = useForm();
  
  const handleFileChange = (e, i) => {
    const file = e.target.files[0];
    const newImgArray = [...imgArray];
    if (newImgArray.length > i) {
      newImgArray[i] = URL.createObjectURL(file);
      setImgArray(newImgArray);
    } else {
      newImgArray.push(URL.createObjectURL(file));
      setImgArray(newImgArray);
    }
  };
  
  useEffect(() => {
    axios
    .get("https://127.0.0.1:8000/detail/" + id)
    .then((res) => {
      setArticle(res.data);
      setImgArray(res.data.img);
    })
    .catch((err) => console.log(err));
  }, [id]);
  
  
  useEffect(() => {
    if(sessionStorage.getItem("admin") !== "true") {
      navigate("/error404")
    }
    axios
    .get("https://127.0.0.1:8000/category")
    .then((res) => setCategory(res.data))
    .catch((err) => console.log(err));
  }, [navigate]);
  
  useEffect(() => {
    axios
    .get("https://127.0.0.1:8000/subCategory/" + 84)
    .then((res) => setSubCategoryId(res.data))
    .catch((err) => console.log(err));
  }, [idCateg]);
  
  
      useEffect(() => {
      if(article.category) {
        axios
        .get("https://127.0.0.1:8000/sub/category/" + article.category.id)
        .then((res) => setSubCategory(res.data))
        .catch((err) => console.log(err));
      };
  }, [article.category]);

  console.log(subCategory)

  const onSubmit = async (data) => {
    if (data.category === "") {
      data.category = article.category.id;
    }

    const formData = new FormData();
    for (let i = 0; i < imgArray.length; i++) {
      if (imgArray[i] !== article.img[i]) {
        const file = await fetch(imgArray[i]).then((res) => res.blob());
        formData.append(`img[${i}]`, file);
      }
    }
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("sub_category", data.sub_category);
    formData.append("description", data.description);
    

    console.log(formData);

    axios
      .post("https://127.0.0.1:8000/article/modif/" + id, formData)
      .then((res) => {
        setMsg(res.data)
        navigate("/article")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Sidebar />
    <div className="left">
      <div className="container_add_article">
        <form onSubmit={handleSubmit(onSubmit)}>
          {display ? (
            <div>
              <div className="fiche">
                <div className="label">
                  <label htmlFor="fiche">Fiche technique</label>
                </div>
                <input
                  id="marque"
                  className="base_input"
                  placeholder="marque"
                  type="text"
                  {...register("marque")}
                />
                <input
                  id="couleur"
                  className="base_input"
                  placeholder="couleur"
                  type="text"
                  {...register("couleur")}
                />
                <input
                  id="size"
                  className="base_input"
                  placeholder="Taille"
                  type="text"
                  {...register("size")}
                />
                <input
                  id="weight"
                  className="base_input"
                  placeholder="Poids"
                  type="text"
                  {...register("weight")}
                />
                <button
                  className="base_input"
                  type="button"
                  onClick={() => handleClick()}
                >
                  ajouter des characteristique
                </button>
                {inputs.map((_, i) => (
                  <div key={i}>
                    <input
                      id={`nameBis${i}`}
                      className="base_input"
                      placeholder="Nom"
                      type="text"
                      {...register(`nameBis${i}`)}
                    />

                    <input
                      id={`valueBis${i}`}
                      className="base_input"
                      placeholder="Valeur"
                      type="text"
                      {...register(`valueBis${i}`)}
                    />
                  </div>
                ))}
                <p>Liste des tag</p>
                <div style={{ display: "flex", flexWrap: 'wrap', margin: '2%' }}>
                  
                  {tags.map((map) => (
                    <div  style={{ marginLeft: '1%' }}>
                      <p>{map},</p>
                    </div>
                  ))}
                </div>

                <input
                  id="tag"
                  className="base_input"
                  placeholder="Tag compatibilité"
                  type="text"
                  {...register(`tag`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      tag(e.target);
                    }
                  }}
                />

                <button
                  className="base_input"
                  type="button"
                  onClick={() => setDisplay(!display)}
                >
                  Revenir
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className="car">
                  {imgArray.length > 0 && (
                    <Carousel infiniteLoop useKeyboardArrows>
                      {[...Array(10)].map((_, i) => (
                        <label
                          key={i}
                          className="label_file"
                          htmlFor={`file${i}`}
                        >
                          <img src={imgArray[i]} alt={`img${i}`} />
                        </label>
                      ))}
                    </Carousel>
                  )}
                  {imgArray.length === 0 && (
                    <Carousel infiniteLoop useKeyboardArrows>
                      {[...Array(10)].map((_, i) => (
                        <label
                          key={i}
                          className="label_file"
                          htmlFor={`file${i}`}
                        >
                          <img src="/image.png" alt={`img${i}`} />
                        </label>
                      ))}
                    </Carousel>
                  )}
                </div>
                {[...Array(10)].map((_, i) => (
                  <input
                    key={i}
                    id={`file${i}`}
                    className="input_file"
                    type="file"
                    accept="image/*"
                    onInput={(e) => handleFileChange(e, i)}
                    {...register(`img${i}`)}
                  />
                ))}
              </div>
              <div className="label">
                <label htmlFor="name">Titre</label>
                <label htmlFor="price">Prix</label>
              </div>
              <div>
                <input
                  id="name"
                  className="base_input"
                  placeholder="Title"
                  defaultValue={article.name}
                  {...register("title", { required: true })}
                />
                <input
                  id="price"
                  className="base_input"
                  type="number"
                  step="0.01"
                  defaultValue={article.price}
                  placeholder="Prix"
                  {...register("price", { required: true })}
                />
              </div>

              <div>
                <div className="label">
                  <div>
                    <div>
                      <label htmlFor="fiche">Fiche technique</label>
                    </div>
                    <div>
                      <label htmlFor="stock ">Stock</label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category">Catégorie</label>
                  </div>
                </div>

                <button
                  className="base_input"
                  type="button"
                  onClick={() => setDisplay(!display)}
                >
                  fiche technique
                </button>

                <input
                  id="stock"
                  type="number"
                  className="base_input mini_input"
                  placeholder="stock"
                  defaultValue={article.stock}
                  {...register("stock", { required: true })}
                />

                <select
                  id="category"
                  className="base_input"
                  onClick={(e) => setIdCateg(e.target.value)}
                  {...register("category")}
                >
                  {article.category &&
                  category.map((category_name) => (
                    <option
                    key={category_name.id}
                    value={category_name.id}
                    selected={category_name.id === article.category.id}>
                    {category_name.name}
                  </option>
                  ))}
                </select>

                <select
                  id="sub_category"
                  className="base_input"
                  {...register("sub_category")}
                >
                  {subCategory.map((sub_category_name) => (
                    <option
                      key={sub_category_name.id}
                      value={sub_category_name.id}
                      selected={sub_category_name.id === article.sub_category.id}
                    >
                      {sub_category_name.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
              </div>

              <div className="label">
                <label htmlFor="description">Description</label>
              </div>

              <div>
                <textarea
                  id="description"
                  className="base_input large_input"
                  type="text"
                  placeholder="Description"
                  defaultValue={article.desc}
                  {...register("description", { required: true })}
                />
              </div>

              <div>
                <button type="submit">Valider </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
};
