#!/usr/bin/env node
// Servidor apenas para a prévia. O presente em si é inteiramente estático.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.png': 'image/png', '.ico': 'image/x-icon' };
if (!process.env.PORT || !process.env.HOST) throw new Error('HOST e PORT são necessários para a prévia.');
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://preview.invalid').pathname); } catch { res.writeHead(400).end(); return; }
  const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const allowed = filename === path.join(root, 'index.html') || ['css', 'js', 'assets'].some(dir => filename.startsWith(path.join(root, dir) + path.sep));
  if (!allowed) { res.writeHead(404).end(); return; }
  fs.stat(filename, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404).end(); return; }
    const headers = { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
    const range = req.headers.range;
    if (range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range);
      if (!match) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end(); return; }
      const start = Number(match[1]), end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (start >= stat.size || start > end) { res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end(); return; }
      res.writeHead(206, { ...headers, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${stat.size}` });
      fs.createReadStream(filename, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { ...headers, 'Content-Length': stat.size });
      fs.createReadStream(filename).pipe(res);
    }
  });
}).listen(Number(process.env.PORT), process.env.HOST);