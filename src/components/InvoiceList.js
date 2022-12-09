import React, { useEffect, useState } from "react";
import invoiceService from "../services/invoice.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    invoiceService
      .getAll()
      .then((response) => {
        console.log("Printing Invoices data", response.data);
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    invoiceService
      .remove(id)
      .then((response) => {
        console.log("Invoice deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Sąskaitų sąrašas</h3>
      <hr />
      <div>
        <Link to = "/invoices/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Pridėti sąskaitą</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Sąskaitos numeris</th>
              <th>Sąskaitos data</th>
              <th>Klientas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.myDate}</td>
                <td>{invoice.customerId.vardas + " " + invoice.customerId.pavarde}</td>
                <td>
                <Link to={`/invoices/invoicepreview/${invoice.id}`} className="btn btn-outline-info mr-2">
                    Peržiūra
                  </Link>

                  <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-outline-success">
                    Atnaujinti
                  </Link>
                  <button 
                    className="btn btn-outline-danger ml-2"
                    onClick={(e) => {
                      handleDelete(invoice.id);
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

export default InvoiceList;
