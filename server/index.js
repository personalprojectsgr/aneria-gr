const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const CLIENT_DIR = path.join(__dirname, '..', 'client');

app.disable('x-powered-by');

app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

app.use(
  express.static(CLIENT_DIR, {
    extensions: ['html'],
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

app.get('/healthz', (_req, res) => {
  res.json({ ok: true, service: 'aneria-gr', time: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(CLIENT_DIR, 'index.html'));
});

app.use((err, _req, res, _next) => {
  const ts = new Date().toISOString();
  console.error(`[${ts}] [error] ${err.message}`, {
    stack: err.stack,
  });
  res.status(500).json({ error: 'internal_error' });
});

app.listen(PORT, HOST, () => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [info] aneria.gr server listening`, { host: HOST, port: PORT });
});
