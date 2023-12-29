import React from "react";
import { useSearch } from "../../context/Search.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://mobile-backend-taxn.onrender.com/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data ,keyword:''});
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
<div>
  <form
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
    role="search"
    onSubmit={handleSubmit}
  >
    <input
      style={{
        flex: '1',
        marginRight: '10px',
        padding: '8px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
      }}
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={values.keyword}
      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    />
    <button
      style={{
        padding: '8px 16px',
        border: '1px solid #28a745',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
      }}
      type="submit"
    >
      Search
    </button>
  </form>
</div>

  );
};

export default SearchInput;