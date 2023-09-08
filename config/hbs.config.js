const hbs = require('hbs')


hbs.registerPartials(__dirname + "../views/partials")

hbs.registerHelper('navActive', (navigationPath, expectedPath, options) => {
  return (navigationPath === expectedPath) ? 'active' : '';
});

hbs.registerHelper('elapsedTime', (createdAt, options) => {
  return moment(createdAt).fromNow();
})