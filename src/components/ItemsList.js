import React, { useEffect, useState } from "react";
import itemService from "../services/item.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    itemService
      .getAll()
      .then((response) => {
        console.log("Printing Items data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    itemService
      .remove(id)
      .then((response) => {
        console.log("Item deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Prekių sąrašas</h3>
      <hr />
      <div>
        <Link
          to="/items/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          Pridėti prekę
        </Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Pavadinimas</th>
              <th>Prekės kodas</th>
              <th>Aprašymas</th>
              <th>Grupė</th>
              <th>Statusas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.pavadinimas}</td>
                <td>{item.kodas}</td>
                <td>{item.aprasymas}</td>
                <td>{item.grupe}</td>
                <td>{item.statusas}</td>
                <td>
                  <Link
                    to={`/items/edit/${item.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsList;
