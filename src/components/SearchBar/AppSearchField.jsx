import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import './app_search_field.css';
import PropTypes from 'prop-types';

const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

function AppSearchField({placeholder,value,onChange, onBtnClick, onKeyDown}) {

  const handleChange = (e) => {
    const {value} = e.target;
    onChange(value);
  }


  return (
    <div className='search-field-container'>
        <div className="input-field-container" placeholder='search by name'
        value = {value}>
            <input type="text" name="" id="search" className='search-field-input'
            placeholder={placeholder}
            value={value}
            onChange={handleChange} 
            onKeyDown={onKeyDown}/>
            <button className="search-button"
            onClick={onBtnClick}
            
            >
              {searchIcon}
            </button>
        </div>
    </div>
  )
}

AppSearchField.propTypes ={
  placeholder : PropTypes.string,
  value : PropTypes.string,
  onChange : PropTypes.func.isRequired,
  onBtnClick: PropTypes.func.isRequired
}

AppSearchField.defaultProps = {
  placeholder: '',
  value : '',
}

export default AppSearchField