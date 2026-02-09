# EHS ACM Suite – Realtime Server (Node.js)

Servidor de comunicación en tiempo real para EHS ACM Suite.

---

## 📑 Índice

1. Tecnologías utilizadas
2. Ramas de Git
3. Instalación y configuración
4. Arquitectura del servidor
5. Comandos útiles
6. Despliegue

---

## 🚀 Tecnologías utilizadas

- Node.js 20+
- TypeScript
- Express
- Socket.IO
- Redis
- Zod

---

## 🌿 Ramas de Git

- main: Producción
- staging: QA
- development: Desarrollo activo

---

## ⚙️ Instalación y configuración

### Requisitos previos

- Node.js 20+
- Redis (opcional)
- Backend Laravel activo

### Instalación

npm install

### Configuración (.env)

PORT=3001
JWT_SECRET=secret
REDIS_HOST=127.0.0.1

---

## 🧱 Arquitectura

src/

- app
- controllers
- routes
- infrastructure
- services
- middlewares
- config
- index.ts

---

## 🛠️ Comandos útiles

npm run dev
npm run build
npm start

---

## 🚀 Despliegue

Compatible con Railway.
