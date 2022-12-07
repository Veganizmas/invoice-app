import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import customerService from "../services/customer.service";

const AddCustomer = () => {
  const [vardas, setFirstName] = useState('');
    const [pavarde, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipas, setType] = useState('');
    const [adresas, setAddress] = useState('');
    const [telNumeris, setPhone] = useState('');
    const [klientoStatusas, setCustomerStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const customer = {vardas, pavarde, email, tipas, adresas, telNumeris, klientoStatusas, id};
    const saveCustomer = (e) => {
        e.preventDefault();
        console.log(customer);
        
        if (id) {
            // update record
            customerService.update(customer)
                .then(response => {
                    console.log('Employee data updated successfully', response.data);
                    navigate('/customers'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            customerService.create(customer)
            .then(response => {
                console.log('Employee added successfully',  response.data);
                navigate('/customers');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(customer)
        if (id) {
          customerService.get(id)
                .then(customer => {
                    setFirstName(customer.data.vardas);
                    setLastName(customer.data.pavarde);
                    setEmail(customer.data.email);
                    setType(customer.data.tipas);
                    setAddress(customer.data.adresas);
                    setPhone(customer.data.telNumeris);
                    setCustomerStatus(customer.data.klientoStatusas);
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Pridėti klientą</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={vardas}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Įveskite vardą"
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="pavarde"
                       value={pavarde}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder="Įveskite pavardę"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="įveskite el. paštą"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="tipas"
                       value={tipas}
                       onChange={(e) => setType(e.target.value)}
                       placeholder="įveskite tipą"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="adresas"
                       value={adresas}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder="įveskite adresą"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="telNumeris"
                       value={telNumeris}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="įveskite telefono numerį"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="klientoStatusas"
                       value={klientoStatusas}
                       onChange={(e) => setCustomerStatus(e.target.value)}
                       placeholder="įveskite kliento statusą"
                    /> 

                </div>
                <br />
                <div>
                    <button onClick={(e) => saveCustomer(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/customers">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddCustomer;
