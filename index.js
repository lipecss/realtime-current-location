const axios = require('axios')
const geoip = require('geo-from-ip')
const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()
const map = contrib.map({ label: 'World Map' })

screen.title = 'My Location'

function CreateMap(local) {
  const location = geoip.allData(`${local.query}`)
  const long = location.location.longitude
  const lat = location.location.latitude

  let grid = new contrib.grid({
    rows: 80,
    cols: 60,
    screen: screen
  })

  screen.append(map)

  map.addMarker({
    'lon': long,
    'lat': lat,
    'color': 'red',
    'char': 'X'
  })

  let box = grid.set(55, 25, 26, 25, blessed.box, { content: 'My Location' })

  box.setContent(`MY IP ${local.query}\n\nState: ${location.state}\nCity: ${location.city}\nCountry: ${location.country}\nContinent:${location.continent}\nLongitude: ${long}\nLatitude:${lat}`);

  screen.render()
}


axios.get('http://ip-api.com/json/')
  .then((response) => {
    CreateMap(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
