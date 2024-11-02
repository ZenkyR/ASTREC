import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

export const AddArticle = () => {
  const navigate = useNavigate();

  const [imgArray, setImgArray] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [display, setDisplay] = useState(false);
  const [idCateg, setIdCateg] = useState("1");
  const [msg, setMsg] = useState("");

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e, i) => {
    const file = e.target.files[0];
    if (file !== "") {
      const newImgArray = [...imgArray];
      if (newImgArray.length > i) {
        newImgArray[i] = URL.createObjectURL(file);
        setImgArray(newImgArray);
      } else {
        newImgArray.push(URL.createObjectURL(file));
        setImgArray(newImgArray);
      }
    }
  };

  const onSubmit = async (data) => {
    if (data.category === "") {
      data.category = "1";
    }
    const formData = new FormData();
    for (let i = 0; i < imgArray.length; i++) {
      const file = await fetch(imgArray[i]).then((res) => res.blob());
      formData.append(`img[${i}]`, file);
    }

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("sub_category", data.sub_category);
    formData.append("description", data.description);
    formData.append("marque", data.marque);
    formData.append("color", data.couleur);
    formData.append("size", data.size);
    formData.append("weight", data.weight);
   tags.forEach((tag, index) => {
  formData.append("tag[]", tag);
});

    for (let i = 0; i < inputs.length; i++) {
      formData.append(`nameBis[${i}]`, data[`nameBis${i}`]);
      formData.append(`valueBis[${i}]`, data[`valueBis${i}`]);
    }

    axios
      .post("https://127.0.0.1:8000/add/article", formData)
      .then((res) => {
        setMsg(res.data)
        navigate("/article")
      })
      .catch((err) => console.log(err));

    // setImgArray([]);
    /* const form = document.querySelector("form");
    form.reset(); */
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin") === "false") {
      navigate("/error404");
    }

    axios
      .get("https://127.0.0.1:8000/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/sub/category/" + idCateg)
      .then((res) => setSubCategory(res.data))
      .catch((err) => console.log(err));
  }, [idCateg]);

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
                    {...register("title", { required: true })}
                  />
                  <input
                    id="price"
                    className="base_input"
                    type="number"
                    step="0.01"
                    placeholder="Prix"
                    {...register("price", { required: true })}
                  />
                </div>

                <div className="label">
                  {errors.title && <span>Veuillez entré de titre</span>}
                  {errors.price && <span>Veuiller entré un nombre</span>}
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
                    {...register("stock", { required: true })}
                  />

                  <select
                    id="category"
                    className="base_input"
                    onClick={(e) => setIdCateg(e.target.value)}
                    {...register("category")}
                  >
                    {category.map((category_name) => (
                      <option key={category_name.id} value={category_name.id}>
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
                      >
                        {sub_category_name.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="label">
                    {errors.stock && <span>Veuiller entré un nombre</span>}
                  </div>
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
