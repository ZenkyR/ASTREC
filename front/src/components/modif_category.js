import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "./Sidebar";

export const ModifCategory = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [img, setImg] = useState([]);
  const [category, setCategory] = useState([]);
  const [msg, setMsg] = useState("");
  console.log(msg);
  // console.log(category);
  const { register, handleSubmit } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin") !== "true") {
      navigate("/error404");
    }
    axios
      .get("https://127.0.0.1:8000/category/" + id)
      .then((res) => {
        setCategory(res.data);
        setImg(res.data.img);
      })
      .catch((err) => console.log(err));
  }, [id, navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data);
    console.log(category.img);
    if (img !== category.img) {
      const file = await fetch(img).then((res) => res.blob());
      formData.append(`img`, file);
    }
    formData.append("name", data.name);
    //console.log(formData);

    axios
      .post("https://127.0.0.1:8000/category/modif/" + id, formData)
      .then((res) => {
        setMsg(res.data)
        navigate("/admin_category")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Sidebar />
      <div className="left">
        <div className="container_add_category">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <div className="car">
                  {img ? (
                    <label className="label_file" htmlFor="file">
                      <img src={img} alt={`img`} />
                    </label>
                  ) : (
                    <label className="label_file" htmlFor="file">
                      <img src={category.img} alt={`img`} />
                    </label>
                  )}
                </div>
                <input
                  id="file"
                  className="input_file"
                  type="file"
                  accept="image/*"
                  onInput={(e) => handleFileChange(e)}
                  {...register(`img`)}
                />
              </div>
              <div>
                <input
                  id="name"
                  className="base_input"
                  placeholder="Name"
                  type="text"
                  defaultValue={category.name}
                  {...register("name", { required: true })}
                />
              </div>
              <div>
                <button type="submit">Valider </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
