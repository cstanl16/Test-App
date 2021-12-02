import React from 'react';

const SearchBox = ({placeholder,handleChange}) =>{
    
    return(
        <input
        className='search'
        placeholder={placeholder}
        onChange = {handleChange}
        />
    );

}

export default SearchBox;