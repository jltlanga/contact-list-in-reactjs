import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEdit = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [minhaAgenda, setminhaAgenda] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    fetch(`http://localhost:4003/minhaAgenda/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setminhaAgenda(data);
      });
  }, [id]);

  const handleUpdate = async (minhaAgenda) => {
    const response = await fetch(`http://localhost:4003/minhaAgenda/${id}`, {
      method: "PATCH",
      body: { "Content-Type": "application/json; charset=UTF-8" },
    });
    if (response.ok) {
      navigate("/");
    }
  };

  const { name, email, phone, website } = minhaAgenda;

  const onInputChange = (e) => {
    setminhaAgenda({
      ...minhaAgenda,
      [e.target.name]: e.target.value,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                      Adiciona um contato na agenda         */
  /* -------------------------------------------------------------------------- */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !website) {
      toast.error("Por favor preencha todos os campos");
    } else {
      if (!id) {
        await axios.post("http://localhost:4003/minhaAgenda", minhaAgenda);
        toast.success("Contato adiconado com sucesso");
        setTimeout(() => navigate("/"), 500);
      }
      // await axios.post("http://localhost:4003/minhaAgenda", minhaAgenda);
      // toast.success("Contato adiconado com sucesso");
      // setTimeout(() => navigate("/"), 500);
      else{
        await axios.patch(`http://localhost:4003/minhaAgenda/${id}`);
        toast.success("Contato adiconado com sucesso");
        setTimeout(() => navigate("/"), 500);

      }
    }
  };

  // const listarAgenda = async () => {
  //   const result = await axios.get(`http://localhost:4003/minhaAgenda/${id}`);
  //   setminhaAgenda(result.data);
  // };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Adicionar um contato</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Website Name"
              name="website"
              value={website || ""}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          {/* <button className="btn btn-outline-danger btn-block">
            Adicionar
          </button> */}
          <input type="submit" value={id ? "update" : "Save"} />
        </form>
      </div>
    </div>
  );
};
export default AddEdit;
