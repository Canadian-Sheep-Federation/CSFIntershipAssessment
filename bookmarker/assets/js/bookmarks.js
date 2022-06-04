import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const cataas = (endpoint) => "https://cataas.com" + endpoint;
const bookmarker = (endpoint) => "http://localhost:4000/api/v1" + endpoint;

const Bookmarks = (props) => {
    // This gives us access to the :id in /u/:id
    const { id } = useParams();

    // For standard headers in all Bookmarker requests
    const headers = {
        "Authorization": "Basic " + id,
    };

    // The object describing the randomly fetched cat image
    const [randomCat, setRandomCat] = useState(null);

    // The state of the CreateNewBookmark form
    const [formState, setFormState] = useState({
        category: "",
        notes: "",
    });

    // The list of all categories that exist in the database
    const [categories, setCategories] = useState([]);

    // The collection of which posts are being shown
    const [activeCategory, setActiveCategory] = useState(null);
    const [categoryCollection, setCategoryCollection] = useState([]);

    // This gets run once and then never again, doing initial setup for our
    // component
    useEffect(() => {
        // Fetch and render a random cat picture
        showNewCat();

        // Fetch the list of categories with more than one bookmark
        getAllCategories();
    }, []);

    // When the active collection is changed, do this
    useEffect(() => {
        (async () => {
            // This should only be run if an activeCategory has been selected
            if (activeCategory != null) {
                const req = await fetch(
                    bookmarker("/bookmark/category/" + activeCategory),
                    { headers }
                );

                // Update the state with the resultant JSON object
                setCategoryCollection(await req.json());
            }
        })();
    }, [activeCategory]);

    const showNewCat = async () => {
        // First, reset the cat picture. This will briefly rerender the
        // paragraph saying that the image is loading
        setRandomCat(null);

        const req = await fetch(cataas("/cat?json=true"));
        setRandomCat(await req.json());
    };

    const getAllCategories = async () => {
        const req = await fetch(
            bookmarker("/bookmark/categories"), { headers });
        setCategories(await req.json());
    };

    const chooseCategory = (category) => {
        setActiveCategory(category);
    }

    const bookmarkCat = async () => {
        const req = await fetch(bookmarker("/bookmark"), {
            method: "POST",
            headers: {...headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...formState, remote_id: randomCat.id })
        });

        // Update the category list in case a new one was added
        await getAllCategories();

        // Reset the form fields
        setFormState({
            category: "",
            notes: "",
        });

        // Show a new cat
        await showNewCat();
    };

    const removeBookmark = async (id) => {
        const req = await fetch(bookmarker("/bookmark/" + id), {
            headers,
            method: "DELETE",
        });

        // Filter out the deleted bookmark and then reload the component
        setCategoryCollection(categoryCollection.filter(c => c.id != id));
    };

    return (
        <div className = "main-container">
            <h2 className = "center-text"> Random Cat </h2>
            <div>
                <img className = "random-image center-box-inner"
                    src = { randomCat != null
                        ? cataas(randomCat.url)
                        : null
                    }
                    alt = { randomCat != null
                        ? randomCat.tags.join(" ")
                        : "Loading cat..."
                    } />
                <div className = "center-text">
                    <button onClick = { showNewCat }>
                        Show New Cat
                    </button>
                </div>
            </div>
            <div className = "form-container">
                <h3 className = "center-text">
                    Like this cat? Bookmark them.
                </h3>
                <NewBookmarkForm
                    submitCallback = { bookmarkCat }
                    setter = { setFormState }
                    state = { formState }/>
            </div> 
            <h2> Browse your collections </h2>
            <SelectCategory
                categories = { categories }
                activeCategory = { activeCategory }
                callback = { chooseCategory }/>
            <div style = {{ height: 50 }}></div>
            { activeCategory != null && categoryCollection.length > 0
                ? <BookmarkCollection
                    removeCallback = { removeBookmark }
                    bookmarks = { categoryCollection } />
                : <></>
            }
        </div>
    );
};

// A reusable form component that takes a list of objects representing
// input properties and then renders them dynamically
const Form = (props) => {
    const updaterFactory = (key) => (e) => props.setter({
        ...props.state,
        [key]: e.target.value,
    });

    return (
        <form onSubmit={ e => e.preventDefault() }>
            {
                props.inputs.map((data, i) =>
                    <div key = { i }>
                        <p className = "form-label"> { data.label } </p>
                        <input
                            placeholder = { data.placeholder }
                            value = { props.state[data.name] }
                            onChange = { updaterFactory(data.name) }/>
                    </div>
                )
            }
            <div className = "center-text">
                <button className = "form-submit-button"
                        onClick = { props.submitCallback }>
                    Submit
                </button>
            </div>
        </form>
    );
};

// Renders the Form component for our specific needs in the case of bookmarking
// a cat photo
const NewBookmarkForm = (props) => (
    <Form
        { ...props }
        inputs = {[
            {
                name: "category",
                label: "Category name",
                placeholder: " Something really cool..."
            },
            { name: "notes", label: "Notes", placeholder: "Any other notes" }
        ]}/>
);

// Renders a list of buttons, each representing a category. When the button
// is pressed, the activeCategory will be updated to reflect the category it
// represents
const SelectCategory = ({ categories, activeCategory, callback }) => {
    return (
        <>
            { categories.length > 0
                ? categories.map((category, i) =>
                    <button className = {
                        category == activeCategory
                            ? "active"
                            : ""
                        }
                        key = { i }
                            onClick = { () => callback(category) }>
                        { category }
                    </button>
                )
                : <p>Nothing to show</p>
            }
        </>
    );
};

// Renders a list of photos followed by their notes
const BookmarkCollection = ({
    bookmarks,
    removeCallback
}) => bookmarks.map((b, i) =>
    <div key = { i }>
        <img className = "collection-image"
            src = { cataas("/cat/" + b.remote_id) } />
        <div className = "collection-item-caption">
            <button onClick = { () => removeCallback(b.id) }>
                🗑️
            </button>
            { b.notes != null && b.notes.length > 0
                ? <p className = "collection-note"> { b.notes } </p>
                : <></>
            }
        </div>
    </div>
);

export default Bookmarks;
