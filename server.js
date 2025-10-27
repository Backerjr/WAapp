import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
const port = process.env.PORT || 4173;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const server = createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  try {
    const url = req.url ? req.url.split('?')[0] : '/';
    
    // Health check endpoint
    if (url === '/health' || url === '/status') {
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      });
      res.end(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production'
      }));
      return;
    }

    const safePath = path.normalize(url).replace(/^\.\.(\/|\\|$)/, '');
    let filePath = path.join(distPath, safePath);

    const stats = await fs.stat(filePath).catch(() => null);
    if (stats?.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    await fs.access(filePath);

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 
      'Content-Type': mimeType,
      ...corsHeaders
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    const fallback = path.join(distPath, 'index.html');
    try {
      await fs.access(fallback);
      res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      });
      createReadStream(fallback).pipe(res);
    } catch (fallbackError) {
      console.error('Server error:', error);
      res.writeHead(500, { 
        'Content-Type': 'application/json',
        ...corsHeaders
      });
      res.end(JSON.stringify({
        error: 'Production build not found',
        message: 'Run "npm run build" first',
        timestamp: new Date().toISOString()
      }));
    }
  }
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`📁 Serving files from: ${distPath}`);
  console.log(`🏥 Health check available at: http://localhost:${port}/health`);
});
