import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import './FilterItems.css'

let FilterCustomers = (props) => {

    function onFilterValueChanged(event){
        props.filterValueSelected(event.target.value);
    }

    return (
        <div className="Filter-area" onChange={onFilterValueChanged}>
            <select name="klientoStatusas">
                <option value="All">All</option>
                <option value="Aktyvus">Aktyvus</option>
                <option value="Neaktyvus">Neatyvus</option>
            </select>
        </div>
    );
}

export default FilterCustomers;