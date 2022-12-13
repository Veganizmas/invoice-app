import { Link, useNavigate, useParams } from "react-router-dom";
import invoiceService from "../services/invoice.service";
import React, { useEffect, useState } from "react";
import itemService from "../services/item.service";
import customerService from "../services/customer.service";

import "../styles/invoice.css";

const InvoicePreview = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [myDate, setDate] = useState("");
  const [customer, setCustomer] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerId, setCustomerId] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    init();
    if (id) {
      invoiceService
        .get(id)
        .then((invoice) => {
          setInvoiceNumber(invoice.data.invoiceNumber);
          setDate(invoice.data.myDate);
          setCustomerId(invoice.data.customerId);
          setInvoiceItems(invoice.data.invoiceItems);
          setCustomer(invoice.data.customerId.vardas);
          // setCustomer(invoice.data.customerId.vardas);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
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
    itemService
      .getAll()
      .then((response) => {
        console.log("Printing Items data", response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });

    // customerService
    //   .getAll()
    //   .then((response) => {
    //     console.log("Printing Items data", response.data);
    //     setCustomer(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("Ups", error);
    //   });
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

  console.log(customer);

  return (
    // <div className="container">
    //     <h3>Sąskaitos peržiūra</h3>
    //     <hr/>
    //         <h4> Klientas: {customerId.vardas} {customerId.pavarde}</h4>
    //         <h4> Sąskaitos numeris: {invoiceNumber}</h4>
    //         <h5> Sąskaitos data: {myDate}</h5>
    //     <hr/>
    //     <h3> Prekių sąrašas </h3>

    //     <table
    //   border="1"
    //   cellPadding="10"
    //   className="table table-border table-striped"
    // >
    //   <thead className="thead-dark">
    //     <tr>
    //       <th>Pavadinimas</th>
    //       <th>Prekės kodas</th>
    //       <th>Aprašymas</th>
    //       <th>Grupė</th>
    //       <th>Statusas</th>
    //       <th>Veiksmai</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {items.map((item) => (
    //       <tr key={item.id}>
    //         <td>{item.pavadinimas}</td>
    //         <td>{item.kodas}</td>
    //         <td>{item.aprasymas}</td>
    //         <td>{item.grupe}</td>
    //         <td>{item.statusas}</td>
    //         <td>
    //           <Link to={`/items/edit/${item.id}`} className="btn btn-info">
    //             Atnaujinti
    //           </Link>
    //           <button
    //             className="btn btn-danger ml-2"
    //             onClick={(e) => {
    //               handleDelete(item.id);
    //             }}
    //           >
    //             Ištrinti
    //           </button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

    //     <Link to="/invoices">Atgal į sąrašą</Link>
    // </div>

    <div className="bendras">
      <div className="logo-container">
        <img src="https://codeacademy.lt/wp-content/uploads/2021/05/CodeAcademy-visi_Logotipas-juodas.png" />
      </div>

      <table className="sask-info">
        <tr>
          <td>
            Sąskaitos Nr: <span>{invoiceNumber}</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            Pirkėjas:{" "}
            <span>
              {customerId.vardas} {customerId.pavarde}
            </span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            Data: <span>{myDate}</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            Adresas: <span>{customerId.adresas}</span>
          </td>
          <td></td>
        </tr>
      </table>

      <table className="line-items-container">
        <thead>
          <tr>
            <th className="heading-description">Prekės kodas</th>
            <th className="heading-description">Prekės pavadinimas</th>
            <th className="heading-quantity">Kiekis</th>
            <th className="heading-price">Kaina</th>
            <th className="heading-subtotal">Suma</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>{invoiceItems}</td>
            <td className="right">15 EUR</td>
            <td className="right">30 EUR</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p className="pvm">Suma:</p>
        <p className="pvm">PVM:</p>
        <p className="pvm">Suma su PVM:</p>
      </div>
      <table className="line-items-container has-bottom-border">
        <thead>
          <tr>
            <th>Mokėjimo informacija</th>
            <th>Mokėjimo terminas</th>
            <th>Viso:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                Mokėjimo sąskaitos Nr.: <strong>123567744</strong>
              </div>
            </td>
            <td>
              <strong>2022-12-31</strong>
            </td>
            <td classNameName="large total">30 EUR</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoicePreview;
