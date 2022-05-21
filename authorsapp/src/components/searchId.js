import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchId = () => {
    const [status, setStatus] = useState("Search ID");
    const [status2, setStatus2] = useState("Search All");
    const [found, setFound] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Searching...");
        const search_item = e.target.elements;
        let get_api = 'http://localhost:3000/author/' + encodeURI(search_item[0].value);
        try {
            const result = await axios.get(get_api);
            console.log(result.data);
            setStatus("Search ID");
            let temp = [];
            temp.push(result.data);
            setFound(temp);
        } catch (error) {
            console.error(error);
            setStatus("Search ID");
        }
    };
    const findAll = async (e) => {
        e.preventDefault();
        setStatus2("Searching...");
        let get_api = 'http://localhost:3000/author/';
        try {
            const result = await axios.get(get_api);
            console.log(result.data);
            setStatus2("Search All");
            setFound(result.data);
        } catch (error) {
            console.error(error);
            setStatus("Search All");
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search">Search ID:</label>
                    <input type="text" id="search_item" required />
                </div>
                <button type="submit">{status}</button>
            </form>
            <button type="submit" onClick={findAll}>{status2}</button>
            <div className="author_query">
                {found && found.length > 0 ? (
                    found.map((author) => (
                        <li key={author._id} className="user">
                            <Link to="/info-custom" state={author}>
                                <span className="name">{author.first_name} {author.last_name}</span>
                            </Link>
                        </li>
                    ))
                ) : (
                    <h1> </h1>
                )}
            </div>
        </div>
    );
};

export default SearchId;
