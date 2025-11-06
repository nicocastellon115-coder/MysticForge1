// ===== Dependencias =====
require('dotenv').config();                       // Carga .env (API_KEY=...)
const express = require('express');
const Database = require('better-sqlite3');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// ===== Base de datos (SQLite) =====
const db = new Database('database.db');
db.prepare(`
  CREATE TABLE IF NOT EXISTS amuletos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    rareza INTEGER,
    fecha TEXT
  )
`).run();

// ===== Middlewares globales =====

// Parseo JSON (limita tamaño)
app.use(express.json({ limit: '180kb' }));

// Seguridad básica
app.use(helmet());

// CORS (ajusta orígenes si tienes front separado)
const ORIGENES_PERMITIDOS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ORIGENES_PERMITIDOS.includes(origin)) return cb(null, true);
      return cb(new Error('Origen no permitido por CORS'));
    }
  })
);

// Rate Limit (anti-abuso): 100 peticiones / 15 min por IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Logs: consola + archivo access.log
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});
app.use(morgan('tiny')); // consola
app.use(morgan('combined', { stream: accessLogStream })); // archivo

// ===== Helpers =====

// Middleware de API Key (usa header: x-api-key)
function requireApiKey(req, res, next) {
  const key = req.header('x-api-key');
  if (key && process.env.API_KEY && key === process.env.API_KEY) return next();
  return res.status(401).json({ ok: false, error: 'API key inválida o ausente' });
}

// ===== Endpoints =====

// Salud del servicio (monitorización)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
    message: 'Servidor MysticForge activo'
  });
});

// Página simple (comprobación rápida)
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🎉 con base de datos SQLite + seguridad y logs');
});

// Crear un amuleto (PROTEGIDO + validado)
app.post(
  '/api/amuletos',
  requireApiKey,
  [
    body('nombre').isString().trim().isLength({ min: 2, max: 60 })
      .withMessage('nombre debe tener entre 2 y 60 caracteres'),
    body('rareza').isInt({ min: 1, max: 5 })
      .withMessage('rareza debe ser un entero entre 1 y 5')
  ],
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ ok: false, errores: errores.array() });
    }

    const { nombre, rareza } = req.body;
    const fecha = new Date().toISOString();

    try {
      const info = db
        .prepare('INSERT INTO amuletos(nombre, rareza, fecha) VALUES (?, ?, ?)')
        .run(nombre, rareza, fecha);

      const id = info.lastInsertRowid ?? info.lastID; // compat
      return res.status(201).json({ ok: true, id, nombre, rareza, fecha });
    } catch (e) {
      return res.status(500).json({ ok: false, error: 'Error al insertar' });
    }
  }
);

// Listar amuletos (público)
app.get('/api/amuletos', (req, res) => {
  const data = db.prepare('SELECT * FROM amuletos ORDER BY id DESC').all();
  res.json(data);
});

// ===== Manejadores de error / 404 =====
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('CORS')) {
    return res.status(403).json({ ok: false, error: 'CORS bloqueado' });
  }
  return res.status(500).json({ ok: false, error: 'Error de servidor' });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' });
});

// ===== Arranque =====
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
