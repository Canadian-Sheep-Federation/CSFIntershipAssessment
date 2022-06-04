import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
    // The randomly generated URL is a side effect and as such, we'll need
    // to generate it in a useEffect hook and update this state to have it
    // properly rendered in our component
    const [randomURL, setRandomURL] = useState(null);

    // Used to programatically navigate with React Router
    const navigate = useNavigate();

    useEffect(() => {
        /* If the user navigates to "/?u=[id]", they should be routed to
         * the Bookmarks page. We do this because this is a single-page
         * app and if the user tries to access /u/[id] directly, they'll
         * get a 404 reponse.
         */

        // Access the query parameters
        const params = new URLSearchParams(window.location.search);
        const id = params.get("u");

        if (id != null) {
            // Navigate to the respective page
            navigate("/u/" + id);
        }

        // Generate the random ID
        const randomID = Math.floor(Math.random() * 1000000);

        // Store the full random URL so it can be navigated to
        setRandomURL("/u/" + randomID);
    }, []);

    return (
        <div className = "main-container">
            <h1> Welcome to Cat Bookmarker </h1>
            <p>
                Cat Bookmarker is a tool that serves random cat images from
                the <a href="https://cataas.com">Cataas</a> (Cat As A Service)
                API and invites you to bookmark the ones you like so that you
                can come back to them later. You can categorize your cat photos
                with user-generated tags and you can leave a note to remind
                yourself why you liked the cat so much in the first place.
            </p>

            <p>
                Cat Bookmarker features a very rudimentary user authentication
                system using randomly generated user IDs and HTTP Authorization
                headers. Every number that won't cause an integer overflow is
                a valid user that has its own bookmarks and categories.
            </p>

            { /* Only render the new URL once it's generated */ }
            { randomURL != null
                ? <p>
                    Don't already have an account? Try:<br/>
                    <Link to={randomURL}>{randomURL}</Link>
                </p>
                : <></>
            }
        </div>
    );
};

export default Home;
