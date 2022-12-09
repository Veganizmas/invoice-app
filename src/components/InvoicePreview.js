import { Link, useNavigate, useParams } from "react-router-dom";
import invoiceService from "../services/invoice.service";
import React, { useEffect, useState } from "react";
import itemService from "../services/item.service";

const InvoicePreview = () => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [myDate, setDate] = useState('');
    const [customer, setCustomer] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const[customerId, setCustomers] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        init();
        if (id) {
            invoiceService.get(id)
              .then(invoice => {
                  setInvoiceNumber(invoice.data.invoiceNumber);
                  setDate(invoice.data.myDate);
                  setCustomers(invoice.data.customerId);
                  setInvoiceItems(invoice.data.invoiceItems);     
              })
              .catch(error => {
                  console.log('Something went wrong', error);
              })
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
        setItems(response.data);
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
            <h3>Sąskaitos peržiūra</h3>
            <hr/>
                <h4> Klientas: {customerId.vardas} {customerId.pavarde}</h4>
                <h4> Sąskaitos numeris: {invoiceNumber}</h4>
                <h5> Sąskaitos data: {myDate}</h5>
            <hr/>
            <h3> Prekių sąrašas </h3>
            
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
                  <Link to={`/items/edit/${item.id}`} className="btn btn-info">
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-danger ml-2"
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

            <Link to="/invoices">Atgal į sąrašą</Link>
        </div>
        
        
    
    
    
    
    
    
    
        );}

export default InvoicePreview;