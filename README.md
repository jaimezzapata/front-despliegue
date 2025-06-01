# Control de Suscripciones

Este proyecto es una aplicación web para gestionar y visualizar las suscripciones de un usuario, permitiendo llevar un control de próximas facturaciones, agregar, editar y eliminar suscripciones, y visualizar un calendario de cobros.

## Características principales

- **Autenticación de usuarios**: Registro e inicio de sesión.
- **Gestión de suscripciones**: Agregar, editar y eliminar suscripciones con nombre, precio, categoría y fecha de próxima facturación.
- **Calendario de facturaciones**: Visualización de las próximas facturaciones en un calendario interactivo.
- **Panel de control**: Resumen de suscripciones activas y próximas facturaciones.

## Tecnologías utilizadas

- **React**: Librería principal para la interfaz de usuario.
- **Vite**: Herramienta de desarrollo y build.
- **Tailwind CSS**: Estilizado rápido y moderno.
- **date-fns**: Manejo de fechas y localización.
- **Firebase**: Autenticación y almacenamiento de datos (puede ser simulado/local).

## Estructura del proyecto

```
control-suscripciones/
├── public/                # Archivos estáticos
├── src/
│   ├── api/              # Lógica para interactuar con la API o base de datos
│   ├── assets/           # Recursos gráficos
│   ├── context/          # Contextos de React (ej. AuthContext)
│   ├── data/             # Datos estáticos (ej. categorías)
│   ├── layouts/          # Componentes de layout
│   ├── pages/            # Páginas principales (Dashboard, Calendario, etc.)
│   ├── router/           # Rutas protegidas y públicas
│   ├── services/         # Servicios externos (ej. Firebase)
│   └── utils/            # Utilidades y helpers
├── package.json          # Dependencias y scripts
├── vite.config.js        # Configuración de Vite
└── README.md             # Documentación del proyecto
```

## Funcionalidad de cada archivo principal

### src/api/
- **config.js**: Configuración de la conexión a la API o base de datos.
- **suscripciones.js**: Funciones para obtener, agregar, editar y eliminar suscripciones del usuario.

### src/context/
- **AuthContext.jsx**: Contexto de autenticación, provee el usuario actual y métodos para login/logout/register.

### src/data/
- **categorias.js**: Listado de categorías disponibles para las suscripciones.

### src/layouts/
- **MainLayout.jsx**: Componente de layout principal, estructura general de la aplicación.

### src/pages/
- **AgregarSuscripcion.jsx**: Página/formulario para agregar una nueva suscripción.
- **CalendarioFacturaciones.jsx**: Muestra el calendario con las próximas facturaciones y detalles diarios.
- **Dashboard.jsx**: Panel principal con resumen de suscripciones y próximas facturaciones.
- **EditarSuscripcion.jsx**: Página/formulario para editar una suscripción existente.
- **Home.jsx**: Página de inicio o bienvenida.
- **Login.jsx**: Página de inicio de sesión de usuario.
- **Register.jsx**: Página de registro de nuevo usuario.

### src/router/
- **index.jsx**: Definición de rutas de la aplicación.
- **ProtectedRoute.jsx**: Componente para proteger rutas que requieren autenticación.

### src/services/
- **firebase.js**: Configuración y funciones para interactuar con Firebase (auth y base de datos).

### src/utils/
- **alertas.js**: Utilidades para mostrar alertas/notificaciones al usuario.
- **validarSuscripcion.js**: Funciones para validar los datos de una suscripción antes de enviarla.

### Archivos raíz
- **package.json**: Dependencias, scripts y metadatos del proyecto.
- **vite.config.js**: Configuración de Vite para desarrollo y build.
- **README.md**: Documentación del proyecto.

## Instalación y ejecución

1. **Clonar el repositorio:**
   ```sh
   git clone <url-del-repo>
   cd control-suscripciones
   ```
2. **Instalar dependencias:**
   ```sh
   npm install
   ```
3. **Configurar variables de entorno:**
   - Si usas Firebase, crea un archivo `.env` con tus credenciales.
4. **Iniciar la aplicación:**
   ```sh
   npm run dev
   ```
5. **Abrir en el navegador:**
   - Accede a `http://localhost:5173` (o el puerto indicado por Vite).

## Uso

- **Registro/Login:** Crea una cuenta o inicia sesión.
- **Agregar suscripción:** Completa el formulario con los datos de tu suscripción.
- **Calendario:** Consulta las próximas facturaciones y detalles de cada suscripción.
- **Editar/Eliminar:** Modifica o elimina tus suscripciones desde el panel correspondiente.

## Personalización

- Puedes modificar las categorías en `src/data/categorias.js`.
- El diseño puede personalizarse editando los estilos de Tailwind en el proyecto.

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la versión de producción.
- `npm run preview` — Previsualiza la build de producción.

## Créditos

Desarrollado por Jaime Zapata.

---

¡Contribuciones y sugerencias son bienvenidas!
