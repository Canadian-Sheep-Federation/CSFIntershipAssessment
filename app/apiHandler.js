const axios = require("axios");

// Query options for top 20 songs (20 is maximum)
const shazamOptions = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/charts/track',
  params: {locale: 'en-US', pageSize: '20', startFrom: '0'},
  headers: {
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
    'X-RapidAPI-Key': '8ad0c1f112mshf1ff6e8302aaf31p160fbdjsn30c9cb0dd97a'
  }
};

// Returns the top 20 songs using the public API
async function getTop20() {
    let top20 = undefined
    await axios.request(shazamOptions)
    .then((res) => {
        top20 = res.data.tracks
    }).catch((err) => {
        top20 = "error"
    });
    return top20
}

// GETs a review from the local API at the address '/:id'  based on the id parameter and returns it
async function getReview(id) {
  let reviews = undefined
  await axios.request({
    method: 'GET',
    url: `${process.env.API_URL}/${id}`
  }).then((res) => {
    reviews = [res.data,]
  }).catch((err) => {
    reviews = "error"
  })
  return reviews
}

// GETs all reviews from the local API at the address '/'  and returns them
async function getAllReviews() {
  let reviews = undefined
  await axios.request({
    method: 'GET',
    url: `${process.env.API_URL}`
  }).then((res) => {
    reviews = res.data
  }).catch((err) => {
    reviews = "error"
  })
  return reviews
}

// POSTs a review to the local API at the address '/' and inserts a file into the database containing the parameters as data
async function postReview(username, text, overOrUnder, title, artists) {
  let status = undefined
  await axios.request({
    method: 'POST',
    url: `${process.env.API_URL}`,
    data: {
      username: username,
      text: text,
      overOrUnder: overOrUnder,
      title: title,
      artists: artists
    }
  }).then((res) => {
    status = res.status
  }).catch((err) => {
    status = "error"
  })
  return status
}

module.exports = { getTop20, getReview, getAllReviews, postReview };