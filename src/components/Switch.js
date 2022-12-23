import React from 'react';
import '../styles/switch.css';
import cx from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import itemService from "../services/item.service";

const Switch = ({ rounded=true, isToggled, onToggle }) => {
    
    const [statusas, setItemStatus] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const sliderCX = cx('slider', {
        'rounded': rounded
    })
    const toggler = () => {
    {isToggled ? setItemStatus("Aktyvus") : setItemStatus("Neaktyvus")}
    console.log("ivyko pakitimas")
    console.log(statusas)
    }

    useEffect(() => {
        if (id) {
          itemService
            .get(id)
            .then((item) => {
              
              setItemStatus(item.data.statusas);
            })
            .catch((error) => {
              console.log("Something went wrong", error);
            });
        }
      }, []);
      const saveItem = (e) => {
        e.preventDefault();
        const item = {
          statusas,
          isToggled,
        };
    
        if (isToggled==false){
          setItemStatus("Neaktyvus")
        } else {
          setItemStatus("Aktyvus")
        }
    
        if (id) {
          itemService
            .update(item)
            .then((response) => {
              console.log("Item data updated successfully", response.data); ////////
              navigate("/items");
            })
            .catch((error) => {
              console.log("Something went wrong", error);
            });
        }
      };
    return (
        
        <label className='switch'
                
                onChange={toggler}>
            <input type='checkbox' checked={isToggled} onChange={onToggle}/>
            <span className={sliderCX}/>
        </label>
        
    )
}

export default Switch;