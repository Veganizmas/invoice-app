import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import invoiceService from "../services/invoice.service";
import customerService from "../services/customer.service";
import Select from 'react-select';

const AddInvoice = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const {invoiceNumber} = useParams();
    const [date, setDate] = useState('');
    const [customer, setCustomer] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [customers, setCustomers] = useState([]); 

    const saveInvoice = (e) => {
        e.preventDefault();

        const invoice = {invoiceNumber, date, customer, invoiceItems, id};
        if (id) {
            // update record
            invoiceService.update(invoice)
                .then(response => {
                    console.log('Invoice data updated successfully', response.data);
                    navigate('/invoices'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            invoiceService.create(invoice)
            .then(response => {
                console.log('Invoice added successfully',  response.data);
                navigate('/invoices');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
          invoiceService.get(id)
                .then(invoice => {
                    setDate(invoice.data.date);
                    setCustomer(invoice.data.customer);
                    setInvoiceItems(invoice.data.invoiceItems);
                   
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
        customerService.getAll().then( data => {
            setCustomers(data);
            console.log(data);
        } ).catch(error => {
            console.log('Got error when downloading customers', error);
        })
    },[])

    return(
        <div className="container">
            <h3>Pridėti sąskaitą</h3>
            <hr/>
            <form>
                <div className="form-group">
                <p>{invoiceNumber}</p>
                </div>

                <div className="form-group">
                    <input
                       type="date"
                       className="form-control col-4"
                       id="date"
                       value={date}
                       onChange={(e) => setDate(e.target.value)}
                       placeholder="Įveskite datą"
                    /> 

                </div>

                
                <div className="form-group">
                    <Select
                       //type="text"
                       className=" col-4"
                    //    id="customer"
                    //    value={customer}
                    //   onChange={(e) => setCustomer(e.target.value)}
                       options={options}
                    >
                    </Select>
                </div>
                

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="grupe"
                       value={invoiceItems}
                       onChange={(e) => setInvoiceItems(e.target.value)}
                       placeholder="įveskite prekę"
                    /> 

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
