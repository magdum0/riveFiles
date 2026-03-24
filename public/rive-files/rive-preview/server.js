const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3737;

// Root of the rive files (one level up from this server.js)
const RIVE_ROOT = path.resolve(__dirname, '..');

// Serve static files from the rive root (so .riv files are accessible)
app.use('/files', express.static(RIVE_ROOT, {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
}));

// Serve the frontend
app.use(express.static(__dirname));

// API: scan all .riv files recursively
app.get('/api/files', (req, res) => {
  const results = [];

  function walk(dir, rel) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'rive-preview') walk(fullPath, relPath);
      } else if (entry.name.endsWith('.riv')) {
        results.push({
          name: entry.name,
          folder: rel,
          path: relPath.replace(/\\/g, '/'),
          url: '/files/' + relPath.replace(/\\/g, '/')
        });
      }
    }
  }

  walk(RIVE_ROOT, '');
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`\n🎨 Rive Preview Server running at http://localhost:${PORT}\n`);
  console.log(`   Serving files from: ${RIVE_ROOT}`);
});
