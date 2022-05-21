import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = "https://openlibrary.org/search/authors.json";

const SearchName = () => {
    const [status, setStatus] = useState("Search");
    const [found, setFound] = useState('');
    const [first, setFirst] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Searching...");
        const search_item = e.target.elements;
        let get_api = api + '?q=' + encodeURI(search_item[0].value);
        try {
            const result = await axios.get(get_api);
            console.log(result.data);
            setStatus("Search");
            setFound(result.data.docs);
            setFirst(false);
        } catch (error) {
            console.error(error);
            setStatus("Search");
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search_item" required />
                </div>
                <button type="submit">{status}</button>
            </form>
            <div className="list">
                {found && found.length > 0 ? (
                    found.map((author) => (
                        <li key={author.key} className="user">
                            <Link to="/info" state={author}>
                                <span className="name">{author.name}</span>
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

export default SearchName;
