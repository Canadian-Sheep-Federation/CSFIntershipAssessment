import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [status, setStatus] = useState("Submit");
    const [lastSub, setLastSub] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { first_name, last_name, birth_date, country_of_birth, works } = e.target.elements;
        let details = {
            first_name: first_name.value,
            last_name: last_name.value,
            birth_date: birth_date.value,
            country_of_birth: country_of_birth.value,
            works: works.value,
        };
        try {
            const result = await axios.post("http://localhost:3000/author", details);
            console.log(result.data);
            setStatus("Submit");
            setLastSub(result.data._id);
        } catch (error) {
            console.error(error);
            setStatus("Submit");
        }
    };
    return (
        <form className="container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="first name">First Name:</label>
                <input type="text" id="first_name" required />
            </div>
            <div>
                <label htmlFor="last name">Last Name:</label>
                <input type="text" id="last_name" required />
            </div>
            <div>
                <label htmlFor="birth date">Birth Date:</label>
                <input type="date" id="birth_date" />
            </div>
            <div>
                <label htmlFor="country of birth">Country of Birth:</label>
                <input type="text" id="country_of_birth" />
            </div>
            <div>
                <label htmlFor="works">Works (separate by semicolon ';'):</label>
                <input type="text" id="works" />
            </div>
            <button type="submit">{status}</button>
            <div>
                {(lastSub !== '') ? (
                    <div>Successful submission! ID: {lastSub}</div>
                ) : (
                    <div></div>
                )}
            </div>
        </form>
    );
};

export default Form;
