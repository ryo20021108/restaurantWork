const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000

const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword
  const matchedRestaurant = keyword ? restaurants.filter((restaurant) => 
    Object.values(restaurant).some((p) => {
      if(typeof p === 'string'){
       return p.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
) : restaurants
  res.render('index',{ matchedRestaurant, keyword })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
  

