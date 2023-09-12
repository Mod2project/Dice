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