import { Sidebar } from "./Sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddFdp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("size", data.size);
    formData.append("price", data.price);
    formData.append("weight", data.weight);
    formData.append("pays", data.pays);
   
    axios
      .post("https://127.0.0.1:8000/addFdp", formData)
      .then((res) => {
        console.log(res.data)
        navigate("/admin_fdp")
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Sidebar />
      <form className="container_article" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">nom</label>
        <input id="name" {...register("name")} />
        <label htmlFor="size">taille</label>

        <input id="size" {...register("size")} />
        <label htmlFor="weight">poids</label>

        <input id="weight" {...register("weight")} />
        <label htmlFor="pays">pays</label>

        <input id="pays" {...register("pays")} />
        <label htmlFor="price">prix</label>

        <input id="price" {...register("price")} />

        <input type="submit" />
      </form>
    </>
  );
};
