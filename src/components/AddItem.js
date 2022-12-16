import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import itemService from "../services/item.service";

const AddItem = () => {
    const [pavadinimas, setItemName] = useState('');
    const [kodas, setItemCode] = useState('');
    const [aprasymas, setItemDescription] = useState('');
    const [grupe, setItemGroup] = useState('');
    const [statusas, setItemStatus] = useState('');
    const [bazineKaina, setBazineKaina] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveItem = (e) => {
        e.preventDefault();
        const item = {pavadinimas, kodas, aprasymas, grupe, statusas, bazineKaina, id};
        
        if (id) {
            itemService.update(item)
                .then(response => {
                    console.log('Item data updated successfully', response.data);////////
                    navigate('/items'); 
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}
         else {
            itemService.create(item)
                .then(response => {
                    console.log('Item added successfully',  response.data);////////
                    navigate('/items');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}  
        }

    useEffect(() => {
        if (id) {
          itemService.get(id)
            .then(item => {
                setItemName(item.data.pavadinimas);
                setItemCode(item.data.kodas);
                setItemDescription(item.data.aprasymas);
                setItemGroup(item.data.grupe);
                setItemStatus(item.data.statusas);
                setBazineKaina(item.data.bazineKaina);     
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>Pridėti prekę</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="pavadinimas"
                        value={pavadinimas}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Įveskite prekės pavadinimą"
                     />
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="kodas"
                       value={kodas}
                       onChange={(e) => setItemCode(e.target.value)}
                       placeholder="Įveskite prekės kodą"
                    /> 
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="aprasymas"
                       value={aprasymas}
                       onChange={(e) => setItemDescription(e.target.value)}
                       placeholder="įveskite prekės aprašymą"
                    /> 
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="grupe"
                       value={grupe}
                       onChange={(e) => setItemGroup(e.target.value)}
                       placeholder="įveskite grupę"
                    /> 
                </div>

                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="statusas"
                       value={statusas}
                       onChange={(e) => setItemStatus(e.target.value)}
                       placeholder="įveskite statusą"
                    />
                </div>

                <div className="form-group">
                    <input
                       type="number" 
                       step="0.01"
                       className="form-control col-4"
                       id="bazineKaina"
                       value={bazineKaina}
                       onChange={(e) => setBazineKaina(e.target.value)}
                       placeholder="įveskite bazine kaina"
                    /> 
                </div>
                <br />
                <div>
                    <button onClick={(e) => saveItem(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/items">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddItem;
