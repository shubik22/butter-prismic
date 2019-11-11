const app = require('./app');
const Onboarding = require('./onboarding');
const PORT = app.get('port');

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});
