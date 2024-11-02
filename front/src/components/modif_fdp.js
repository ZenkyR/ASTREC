import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export const UpdateFDP = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fdp, setFdp] = React.useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/error404");
    }
    axios.get("https://127.0.0.1:8000/fdp/" + id).then((res) => {
      setFdp(res.data);
    });
}, [navigate, id]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("size", data.size);
    formData.append("weight", data.weight);
    formData.append("pays", data.pays);
    formData.append("price", data.price);
    axios
      .post("https://127.0.0.1:8000/fdp/update/" + id, formData)
      .then(() => {
        navigate("/admin_fdp");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Sidebar />
      <div className="container_article">
        <h1>Modifier une livraison</h1>
        <div className="container_article_div">
          <Link to={"/admin_fdp"}>
            <button className="article_btn">Retour</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nom"
              defaultValue={fdp.name}
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <span>Veuillez entrer un nom</span>}
          <div>
            <input
              type="number"
              name="size"
              id="size"
              placeholder="Taille"
              defaultValue={fdp.size}
              {...register("size", { required: true })}
            />
          </div>
          {errors.size && <span>Veuillez entrer une taille</span>}
          <div>
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder="Poids"
                defaultValue={fdp.weight}
              {...register("weight", { required: true })}
            />
          </div>
          {errors.weight && <span>Veuillez entrer un poids</span>}
          <div>
            <input
              type="text"
              name="pays"
              id="pays"
              placeholder="Pays"
                defaultValue={fdp.pays}
              {...register("pays", { required: true })}
            />
          </div>
          {errors.pays && <span>Veuillez entrer un pays</span>}
          <div>
            <input
              name="price"
              id="price"
              placeholder="Prix"
                defaultValue={fdp.price}
              {...register("price", { required: true })}
            />
          </div>

          {errors.price && <span>Veuillez entrer un prix</span>}
          <div>
            <input type="submit" value="Valider" />
          </div>
        </form>
      </div>
    </>
  );
};
