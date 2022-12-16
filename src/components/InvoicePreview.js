import { Link, useParams } from "react-router-dom";
import invoiceService from "../services/invoice.service";
import React, { useEffect, useState } from "react";
import "../styles/invoice.css";

const InvoicePreview = () => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const { id } = useParams();
  const [customerId, setCustomerId] = useState([]);
  const [suma, setSuma] = useState([]);
  const [bendraSuma, setBendraSuma] = useState("");
  const [bendraSumaSuPvm, setBendraSumaSuPvm] = useState("");
  const [PVM, SetPvm] = useState([]);
  
useEffect(() => {
    if (id) {
      invoiceService
        .get(id)
        .then((response) => {
          console.log("Printing Invoices data", response.data);///////////////////////////
          setInvoiceItems(response.data.invoiceItems);
          setCustomerId(response.data.customerId);
          setInvoice(response.data);
          countSuma(response.data.invoiceItems);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }      
}, []);

let countSuma = (invoiceItems) => {
    setBendraSuma(0);
    var sumaCount = 0;
    const list = [...suma];
    invoiceItems.map((item, index) => (
       list[index] = (invoiceItems[index].item.bazineKaina * Number(invoiceItems[index].quantity)),
       setSuma(list),
       console.log("numeris: " + list[index]),/////////
       sumaCount += list[index],
       setBendraSuma(sumaCount),
       setBendraSumaSuPvm((sumaCount*1.21).toFixed(2)),
       SetPvm((sumaCount*0.21).toFixed(2))
    ))
}


  return (
    <div className="bendras">
      <div className="logo-container">
        <img src="https://codeacademy.lt/wp-content/uploads/2021/05/CodeAcademy-visi_Logotipas-juodas.png" />
      </div>

      <table className="sask-info">
        <tbody>
          <tr>
            <td>
              Sąskaitos Nr: <span>{invoice.invoiceNumber}</span>
            </td>
          <td></td>
          </tr>
        
          <tr>
            <td>
              Pirkėjas: <span>{customerId.vardas} {customerId.pavarde}</span>
            </td>
            <td></td>
          </tr>
          
          <tr>
            <td>
              Data: <span>{invoice.myDate}</span>
            </td>
            <td></td>
          </tr>
          
          <tr>
            <td>
              Adresas: <span>{customerId.adresas}</span>
            </td>
            <td></td>
          </tr>
        
        </tbody>
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
   
        {invoiceItems.map((item, index) => (
          <tr key={index}>
            <td> {invoiceItems[index].item.kodas} </td>
            <td> {invoiceItems[index].item.pavadinimas} </td>
            <td> {invoiceItems[index].quantity} </td>
            <td > {invoiceItems[index].item.bazineKaina} </td>
            <td> {suma[index].toFixed(2)} </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      <div>
        <p className="pvm">Suma: {bendraSuma} </p>
        <p className="pvm">PVM: {PVM} (21%)</p>
        <p className="pvm">Suma su PVM: {bendraSumaSuPvm}</p>
      </div>
      
      <table className="line-items-container has-bottom-border">
        <thead>
          <tr>
            <th> Mokėjimo informacija </th>
            <th> Mokėjimo terminas </th>
            <th> Viso: </th>
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
            <td className="large total">{bendraSumaSuPvm} EUR</td>
          </tr>
        </tbody>
      </table>
      <Link to="/invoices">Atgal į sąrašą</Link>
    </div>
  );
};

export default InvoicePreview;