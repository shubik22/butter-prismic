const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const PrismicConfig = require('./prismic-configuration');
const app = require('./config');
const Onboarding = require('./onboarding');

const PORT = app.get('port');

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

const HTML_PAGES = [
  'services',
];

/*
 * Route with documentation to build your project with prismic
 */
app.route('/').get(function(req, res) {
  req.prismic.api.getSingle('work-page').then(function(document) {
    res.render('index', { document });
  });
});

for (let page of HTML_PAGES) {
  app.route(`/${page}.html`).get(function(req, res) {
     res.render(page);
  });
}

app.route('/work-subpage/:projectId').get(function(req, res) {
  req.prismic.api.getByUID('work-subpage', req.params.projectId).then((document) => {
    res.render('work-subpage', { document });
  });
});

app.route('/news.html').get(function(req, res) {
  req.prismic.api.query(
    Prismic.Predicates.at('document.type', 'news-post'),
    { orderings : '[my.news-post.date desc]' }
  ).then(function(response) {
    const results = response.results;
    results.sort((a, b) => {
      const firstOrder = a.data['order-number'];
      const secondOrder = b.data['order-number'];
      if (secondOrder === null) {
        return -1;
      }
      if (firstOrder === null) {
        return 1;
      }
      return firstOrder < secondOrder ? -1 : 1;
    });
    res.render('news', { newsItems: results });
  });
});

app.route('/contact.html').get(function(req, res) {
  req.prismic.api.getSingle('contact-page').then(function(document) {
    const contactParagraph = document.data['contact-paragraph'];
    res.render('contact', { contactParagraph });
  });
});

app.route('/work.html').get(function(req, res) {
  req.prismic.api.getSingle('work-page').then(function(document) {
    res.render('work', { document });
  });
});

app.route('/about.html').get(function(req, res) {
  req.prismic.api.query(
      Prismic.Predicates.at("document.tags", ['about'])
  ).then(function(response) {
    const document = response.results[0];
    res.render('about', { document });
  });
});

/*
 * Preconfigured prismic preview
 */
app.get('/preview', (req, res) => {
  const { token } = req.query;
  if (token) {
    req.prismic.api.previewSession(token, PrismicConfig.linkResolver, '/').then((url) => {
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});
