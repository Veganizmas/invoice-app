import React from "react";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import invoiceService from "../services/invoice.service";
import customerService from "../services/customer.service";
import CustomersList from "./CustomersList";
import "bootstrap/dist/css/bootstrap.min.css";
import itemService from "../services/item.service";

const AddInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [myDate, setDate] = useState("");
  const [customer, setCustomer] = useState([]);
  const [item, setItem] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerId, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedInvoiceItems, setSelectedInvoiceItems] = useState([]);
  const [formValues, setFormValues] = useState([{ name: "", email: "" }]);

  const init = () => {
    customerService
      .getAll()
      .then((response) => {
        console.log("Printing Customer data", response.data);
        setCustomer(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });

    itemService
      .getAll()
      .then((response) => {
        console.log("Printing Items data", response.data);
        setInvoiceItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const saveInvoice = (e) => {
    e.preventDefault();

    const invoice = {
      invoiceNumber,
      myDate,
      customerId,
      selectedInvoiceItems,
      id,
    }; ////
    if (id) {
      // update record
      invoiceService
        .update(invoice)
        .then((response) => {
          console.log("Invoice data updated successfully", response.data);
          navigate("/invoices");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // create new record
      invoiceService
        .create(invoice)
        .then((response) => {
          console.log("Invoice added successfully", response.data);
          navigate("/invoices");
        })
        .catch((error) => {
          console.log("Something went wrong555", error);
        });
    }
  };

  useEffect(() => {
    init();

    if (id) {
      invoiceService
        .get(id)
        .then((invoice) => {
          setInvoiceNumber(invoice.data.invoiceNumber);
          setDate(invoice.data.myDate);
          setCustomers(invoice.data.customerId);
          setInvoiceItems(invoice.data.invoiceItems);
          setSelectedInvoiceItems(invoice.data.selectedInvoiceItems);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  const setMyCustomer = (e) => {
    console.log(e);
    setCustomers(e);
  };

  let addFormFields = () => {
    /////////////////////
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  console.log(customerId);

  return (
    <div className="container">
      <h3>Pridėti saskaita</h3>
      <hr />
      <form>
        <div className="form-group">{/* <p>{invoiceNumber}</p> */}</div>

        <div className="form-group">
          <input
            type="date"
            className="form-control col-4"
            id="date"
            value={myDate}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Įveskite data"
          />
        </div>

        <div className="form-group">
          <Select
            options={customer}
            getOptionLabel={(a) => a.vardas + " " + a.pavarde}
            getOptionValue={(a) => a}
            className=" col-4"
            id="customer"
            //value={}
            onChange={setMyCustomer}
          ></Select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4"
            id="Invoice number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Įveskite sąskaitos numberį"
          />
        </div>

        <div className="form-block">
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <Select
                className="col-4"
                options={invoiceItems}
                getOptionLabel={(a) => a.pavadinimas}
                getOptionValue={(a) => a}
                onChange={(e) => setSelectedInvoiceItems(e)}
              />
              <input
                type="text"
                className="form-control col-4"
                placeholder="Iveskite kieki"
                //value={element.email || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
        </div>

        <br />
        <div>
          <button onClick={(e) => saveInvoice(e)} className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
      <hr />
      <Link to="/invoices">Atgal į sąrašą</Link>
    </div>
  );
};

export default AddInvoice;
