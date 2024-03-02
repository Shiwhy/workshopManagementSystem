import React from 'react';
import '../css/search.css';

// import { IoSearch } from "react-icons/io5";
// import { IoSearch } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


const Searchbar = (props) => {

  return (
    <>
    <div className="search">
      <input type="text" 
        placeholder={ props.placeholder } 
        value={ props.value }
        name={ props.name } 
        onChange={ props.onChange }
        // onBlur={ props.onBlur }
      /> 
      <button onClick={ props.onClick }> <IoSearch /></button> &nbsp;
      <button onClick={ props.onClickClear } className='search-clrbtn'>Clear</button>
    </div>      

    </>
  )
}

export default Searchbar
