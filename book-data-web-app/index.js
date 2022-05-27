const url = "http://localhost:3000/" // connection to the API

// Sends a POST request to add data to the database, receives the new id of the submitted response and displays it in an alert
const survey_form = document.getElementById('survey_form');
function onSubmitForm() {
    const name = survey_form.elements["name"].value;
    const favorite_book = survey_form.elements["favorite_book"].value;
    const book_author = survey_form.elements["book_author"].value;
    // console.log(`${name} ${favorite_book} ${book_author}`);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: name,
                favorite_book: favorite_book,
                book_author: book_author
            }
        })
    }).then(response => {
        response.json().then(data => {
            alert('Submit success: ' + JSON.stringify(data));
        }).catch(err => {
            alert('Error');
            console.log(err);
        });
    }).catch(err => {
        alert('Error');
        console.log(err);
    });
}
survey_form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmitForm();
});

const container = document.getElementById('response_container'); // container for displaying query results
// Data retrieved in the two methods belowing is being displayed as JSON objects, should probably format them into HTML table entries at the very least

// Retrieves all responses from API and displays them
function onGetAll() {
    fetch(url).then(response => {
        response.json().then(data => {
            let content = "";
            for (let i = 0; i < data.length; ++i) {
                // console.log(data[i]);
                content += `${JSON.stringify(data[i])}` + "<br>";
            }
            container.innerHTML = content;
        }).catch(err => {
            alert('Error');
            console.log(err);
        });
    }).catch(err => {
        alert('Error');
        console.log(err);
    });
}
document.getElementById('get_all_responses').addEventListener("click", (event) => {
    onGetAll();
});

// Retrieves the response with given ID from API and displays it
const search_form = document.getElementById('search_form');
function onSubmitSearch() {
    const id = search_form.elements['response_id'].value;
    fetch(url + id).then(response => {
        response.json().then(data => {
            let content = "";
            for (let i = 0; i < data.length; ++i) {
                // console.log(data[i]);
                content += `${JSON.stringify(data[i])}` + "<br>";
            }
            container.innerHTML = content;
        }).catch(err => {
            alert('Error');
            console.log(err);
        });
    }).catch(err => {
        alert('Error');
        console.log(err);
    });
}
search_form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmitSearch();
})