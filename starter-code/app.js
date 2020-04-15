const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Partials
hbs.registerPartials(path.join(__dirname, 'views/partials'))

// Enrouting
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromAPI => {
            console.log("Beers from the database: ", beersFromAPI)
            return res.render('beers', { beers: beersFromAPI })
        })
        .catch(error => console.log(error))
})

app.get('/random-beers', (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => {
            let randomBeer = responseFromAPI[0]
            // randomBeer.layout = false
            return res.render('randomBeers', randomBeer)
        })
    .catch(error => console.log(error))
    
})

app.get('/beers/:id', (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(randomBeer => res.render('randomBeers', {randomBeer}))
    .catch(error => console.log(error))
})

// Launching Server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
