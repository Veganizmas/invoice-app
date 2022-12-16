import React from "react";
import Select from "react-select"
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import invoiceService from "../services/invoice.service";
import customerService from "../services/customer.service";
import "bootstrap/dist/css/bootstrap.min.css";
import itemService from "../services/item.service";


const AddInvoice = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [myDate, setDate] = useState('');
    const [customer, setCustomer] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([{ item: "", quantity: ""}]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [customerId, setCustomers] = useState([]);
    const [items, setItems] = useState([]);

    const init = () => {
        customerService
            .getAll()
            .then((response) => {
                console.log("Printing Customer data", response.data);////
                setCustomer(response.data);
            })
            .catch((error) => {
                console.log("Ups", error);
            });

        itemService
            .getAll()
            .then((response) => {
                console.log("Printing Items data", response.data);/////
                setItems(response.data);
            })
            .catch((error) => {
                console.log("Ups", error);
            });  
    };

    const saveInvoice = (e) => {
        e.preventDefault();
        const invoice = {invoiceNumber, myDate, invoiceItems, customerId ,id } ;

        if (id) {
            invoiceService.update(invoice)
                .then(response => {
                    console.log('Invoice data updated successfully', response.data);////
                    navigate('/invoices'); 
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}
        else {
            invoiceService.create(invoice)
                .then(response => {
                    console.log('Invoice added successfully',  response.data);
                    navigate('/invoices');
                })
                .catch(error => {
                    console.log('Something went wrong555', error);
                })
            }
        }

  
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
    },[])


    let addFormFields = () => {  /////////////////////
        setInvoiceItems([...invoiceItems, { item: "", quantity: "" }])
      }
    
    let removeFormFields = (i) => {
        let newInvoiceItems = [...invoiceItems];
        newInvoiceItems.splice(i, 1);
        setInvoiceItems(newInvoiceItems)
    }

    let handleChange = (option, index, name) => {
        const value = option;
        const list = [...invoiceItems];
        list[index][name] = value;
        setInvoiceItems(list);
     }

   
    return(
        <div className="container">
            <h3>Pridėti saskaita</h3>
            <hr/>
            <form>
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
                        value={customerId}             
                        options={customer}
                        getOptionLabel = {a => a.vardas + " " + a.pavarde}
                        getOptionValue={a => a}  
                        className=" col-4"
                        id="customer"
                        onChange={(e) => setCustomers(e)} 
                        > 
                    </Select>
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
                    {invoiceItems.map((element, index) => { 
                        return(
                            <div className="form-inline" key={index}>
                                <Select 
                                    className="col-4"
                                    name="item"
                                    options={items}
                                    getOptionLabel = {a => a.pavadinimas}
                                    getOptionValue = {a => a}
                                    value={element.item}
                                    onChange={e => handleChange(e, index, "item")}
                                />
                            
                                <input 
                                    type="text"
                                    name="quantity"
                                    className="form-control col-4" 
                                    placeholder="Iveskite kieki" 
                                    value={element.quantity}     
                                    onChange = {e => handleChange(e.target.value, index, "quantity")}                              
                                />
                                 
                                {invoiceItems.length > 1 &&(
                                    <button type="button"  className="btn btn-success" onClick={() => removeFormFields(index)}>Remove</button> 
                                )}
                            </div>
                        )})
                    }
                
                    <button 
                        className="btn btn-danger" 
                        type="button" 
                        onClick={() => addFormFields()}>Add
                    </button>
                </div>

                <br />
                <div>
                    <button onClick={(e) => saveInvoice(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/invoices">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddInvoice;
