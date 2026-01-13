
# Guía de Contribución – EHS ACM Suite

¡Gracias por contribuir a **EHS ACM Suite**!  
Para mantener un flujo de trabajo limpio y seguro, sigue las siguientes reglas al colaborar con el repositorio.

---

## 🪢 Ramas principales

| Rama         | Descripción                                      | Reglas de Push                |
|---------------|--------------------------------------------------|-------------------------------|
| `main`        | Producción – Código estable y listo para deploy. | ❌ **Prohibido push directo**  |
| `staging`     | Pre-producción / QA.                            | ❌ **Prohibido push directo**  |
| `development` | Integración de código en desarrollo.             | ✅ Se permiten merges con PRs  |

- **`main`** solo recibe merges desde `staging` cuando se libera una nueva versión estable.
- **`staging`** recibe merges desde `development` para pruebas y QA.
- **`development`** es la base para todas las ramas de trabajo.

---

## 🌿 Ramas de trabajo

Cada cambio debe realizarse en **ramas individuales** a partir de `development`, según el tipo de trabajo:

| Tipo            | Prefijo sugerido          | Ejemplo                         |
|------------------|---------------------------|----------------------------------|
| Nuevas Features   | `feature/`                | `feature/login-form`             |
| Corrección de Bugs| `bugfix/`                 | `bugfix/fix-login-redirect`      |
| Refactors         | `refactor/`               | `refactor/optimize-dashboard`    |
| Hotfix en Prod    | `hotfix/`                 | `hotfix/fix-prod-env`            |

---

## 🧑‍💻 Flujo de trabajo recomendado

1. **Crea tu rama** desde `development`  
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/nombre-de-la-feature
   ```

2. **Haz tus cambios** y realiza commits claros  
   ```bash
   git add .
   git commit -m "feat: descripción corta del cambio"
   ```

   **Convenciones de commits**:
   - `feat:` → Nuevas funcionalidades
   - `fix:` → Correcciones de errores
   - `refactor:` → Mejora de código sin cambiar funcionalidad
   - `docs:` → Cambios en documentación

3. **Sube tu rama** al repositorio  
   ```bash
   git push origin feature/nombre-de-la-feature
   ```

4. **Abre un Pull Request (PR)** hacia `development`  
   - El PR debe tener:
     - Descripción clara del cambio
     - Capturas si aplica
     - Referencias a tickets o issues

5. **Revisión y merge**  
   - Otro desarrollador debe aprobar el PR antes de hacer merge.
   - Los merges a `staging` y `main` **solo los hace el responsable del release**.

---

## 🚫 Prohibiciones

- No hacer **push directo** a `main` o `staging`.
- No subir cambios a `development` sin PR y revisión.
- No usar ramas temporales para trabajo largo; dividir en PRs pequeños y claros.

---

## 📦 Deploys

- **Development → Staging**: cuando el código está listo para QA.
- **Staging → Main**: cuando se aprueba para producción.

---

## 📄 Recursos

- [Guía de convenciones de commits](https://www.conventionalcommits.org/es/v1.0.0/)  
- [Flujo Git recomendado](https://nvie.com/posts/a-successful-git-branching-model/)
