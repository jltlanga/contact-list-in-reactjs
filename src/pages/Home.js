import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./Home.css";
  import {toast} from 'react-toastify';

const Home = () => {
  const [minhaAgenda, setminhaAgenda] = useState([]);

  useEffect(() => {
    listarAgenda();
  }, []);

  const listarAgenda = async () => {
    const result = await axios.get("http://localhost:4003/minhaAgenda");
    setminhaAgenda(result.data.reverse());
  };

  //Apaga contato listado
  const apagarContatos = async (id) => {
    if (window.confirm("Tem certeza que pretende apagr este contato?")) {
      await axios.delete(`http://localhost:4003/minhaAgenda/${id}`);
      toast.success("Contato apadado com sucesso!");
      listarAgenda();
    }
  };


  return (
    <div className="container">
      <div className="py-4">
        <h1>Agenda de Contatos</h1>
        {/* -------------------------------------------------------------------------- */
        /*                       Cria o cabeçalho da minhaAgenda                      */
        /* -------------------------------------------------------------------------- */}
        <table className="table border shadow-lg p-3 mb-5 bg-white rounded">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col">Website</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {/*  criar hook map() p/ listar minhaAgenda */}
            {minhaAgenda.map((minhaAgenda, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td> {minhaAgenda.name}</td>
                <td> {minhaAgenda.email}</td>
                <td> {minhaAgenda.phone}</td>
                <td> {minhaAgenda.website}</td>
                {/* cria a coluna de opções da minhaAgenda */}
                <td>
                  <Link
                    to={`/view/${minhaAgenda.id}`}
                  >
                     <button className="btn btn-view"> Ver</button>
                    {/* Ver */}
                  </Link>
                  <Link
                    to={`/update/${minhaAgenda.id}`}
                  >
                    <button className="btn btn-edit"> Editar</button>
                   
                  </Link>
                  <a
                    onClick={() => apagarContatos(minhaAgenda.id)}
                  >
                    <button className="btn btn-delete">Apagar</button>
                    {/* Apagar */}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//   {/* */}
//   return (
//     <div style={{ marginTop: "100px" }}>
//       <table className="stle-table">
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>No.</th>
//             <th style={{ textAlign: "center" }}>Name</th>
//             <th style={{ textAlign: "center" }}>Email</th>
//             <th style={{ textAlign: "center" }}>Contac</th>
//             <th style={{ textAlign: "center" }}>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {minhaAgenda.map((minhaAgenda, index) => {
//             return (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{minhaAgenda.name}</td>
//                 <td>{minhaAgenda.email}</td>
//                 <td>{minhaAgenda.contact}</td>z

//                 <td>
//                   <Link
//                     class="btn btn-outline-dark mr-2"
//                     to={`/view/${minhaAgenda.id}`}
//                   >
//                     Ver
//                   </Link>

//                   <Link
//                     class="btn btn-outline-secondary mr-2"
//                     to={`/update/${minhaAgenda.id}`}
//                   >
//                     Editar
//                   </Link>

//                   <a
//                     className="btn btn-outline-danger"
//                     onClick={() => onDelete(minhaAgenda.id)}
//                   >
//                     Apagar
//                   </a>
//                 </td>
//                 {/* <td>

//                   <link to={`/update/${minhaAgenda.id}`}>
//                     <button className="btn btn-edit">Edit</button>
//                   </link>

//                   <button className="btn btn-delete" onClick={() => onDelete(minhaAgenda.id)}>Delete</button>

//                   <link to={`/view/${minhaAgenda.id}`}>
//                     <button className="btn btn-view">View</button>
//                   </link>
//                 </td> */}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
export default Home;
