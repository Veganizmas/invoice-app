import React, { useEffect, useState } from "react";
import customerService from "../services/customer.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterCustomers from "./FilterCustomers";

const CustomersList = () => {
  const [customers, setItems] = useState([]);
  const [filterCustomerValue, setFilterCustomerValue] = useState('All');

  const filteredCustomerList = customers.filter((product) => {
    if(filterCustomerValue === 'Aktyvus'){
      return product.klientoStatusas === 'Aktyvus';
    } else if(filterCustomerValue === 'Neaktyvus'){
      return product.klientoStatusas === 'Neaktyvus';
    } else {
      return product;
    }
  });


  useEffect(() => {
    init();
  }, []);

  const init = () => {
    customerService
      .getAll()
      .then((response) => {
        console.log("Printing Customer data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    customerService
      .remove(id)
      .then((response) => {
        console.log("Customer deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };
  const onFilterValueSelected = (filterValue) => {
    setFilterCustomerValue(filterValue)
  }

  return (
    <div className="container">
      <h3>Klientų sąrašas</h3>
      <hr />
      <div>
        <Link
          to="/customers/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          Pridėti klientą
        </Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Pavardė</th>
              <th>Email</th>
              <th>Tipas</th>
              <th>Adresas</th>
              <th>Telefono numeris</th>
              <th>Kliento statusas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            <FilterCustomers filterValueSelected={onFilterValueSelected}></FilterCustomers>
            {filteredCustomerList.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.vardas}</td>
                <td>{customer.pavarde}</td>
                <td>{customer.email}</td>
                <td>{customer.tipas}</td>
                <td>{customer.adresas}</td>
                <td>{customer.telNumeris}</td>
                <td>{customer.klientoStatusas}</td>
                <td style={{ textAlign: "center" }}>
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(customer.id);
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

export default CustomersList;
