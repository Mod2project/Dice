const hbs = require('hbs')


hbs.registerPartials(__dirname + "../views/partials")

hbs.registerHelper('navActive', (navigationPath, expectedPath, options) => {
  return (navigationPath === expectedPath) ? 'active' : '';
});

hbs.registerHelper("prettyDate", (date) => {
  return date.toLocaleDateString("es-ES", {});
});

hbs.registerHelper('isPublic', function (event, options) {
  if (event.public) {
      return options.fn(this);
  } else{
      return options.inverse(this);
  }
});

hbs.registerHelper('isJoin', function (event, user, options) {
  const events = user.tickets.map(ticket => ticket.event._id.toString());
  console.log(typeof event)
  if (events.includes(event)) {
    return options.inverse(this);
  } else{
    return options.fn(this);  
  }
});

function initMap(lat, lng) {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 8
  });
}