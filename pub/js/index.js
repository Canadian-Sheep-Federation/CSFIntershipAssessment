const log = console.log

/* 
   Functions for Dog Forms API below
*/

// A function to send a GET request to get all dogs in the forms
function getDogForms() {

    const url = '/api/dogform';

    // Get the data
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not get dogs')
       }                
    })
    .then((json) => {
        dogsList = document.querySelector('#dogsList')
        dogsList.innerHTML = ''
        json.map((d) => {
            li = document.createElement('li')
            li.innerHTML = `Owner: <strong>${d.owner}</strong>, Name: <strong>${d.name}</strong>, Breed: <strong>${d.breed}</strong>`
            dogsList.appendChild(li)
        })
    }).catch((error) => {
        log(error)
    })
}

// A function to send a POST request with a new dog
function addDogForm() {

    const url = '/api/dogform';

    // The data
    let data = {
        owner: document.querySelector('#newDogOwner').value,
        name: document.querySelector('#newDogName').value,
        breed: document.querySelector('#newDogBreed').value,
    }
    // Create our request
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        // Handle response we get from the API.
        const message = document.querySelector('#message')
        if (res.status === 200) {
            // If dog was added successfully
            message.innerText = 'Added your dog'
            document.querySelector('#newDogOwner').value = ''
            document.querySelector('#newDogName').value = ''
            document.querySelector('#newDogBreed').value = ''
        } else {
            // If dog wasn't added
            message.innerText = 'Could not add your dog'     
        }
    }).catch((error) => {
        log(error)
    })
}

/* 
   Functions for Public API: Dog API below
*/

// Create a request
var request = new XMLHttpRequest()

// A function to send a GET request to get a random image of a dog of a specified breed from the Dog API
function getRandomDogImageByBreed() {

    const breed = document.querySelector('#dogImgBreed')

    const url = 'https://dog.ceo/api/breed/' + breed.value.toLowerCase() + '/images/random';

    // Get the data
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           const message2 = document.querySelector('#message2')
           message2.innerText = ''
           return res.json()
       } else {
           // If incorrect breed was given
            const message2 = document.querySelector('#message2')
            message2.innerText = 'Breed does not exist. Please try again.'
            alert('Could not get image')
       }                
    })
    .then((json) => {
        dogImage = document.querySelector('#dogImage')
        dogImage.innerHTML = ''
        image = document.createElement('img')
        image.src = json.message
        dogImage.appendChild(image)
    }).catch((error) => {
        log(error)
    })
}