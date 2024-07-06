# Decisiones

## Estructura de proyecto

> [Store project files outside of app](https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app)

Utilizar una estructura donde los directorios están fuera de /app por dos motivos:

-   Usar /app como directorio exclusivo para las rutas
-   Hacer uso de la [estructura recomendada de Redux + APP Router Next.js](https://redux-toolkit.js.org/usage/nextjs#folder-structure)

## Librería de componentes

> [MUI](https://mui.com/)

Es una librería que ya he utilizado, es bastante popular y fácil de usar.

## Endpoints
- En la descripción de la prueba estaba mal el de la lista de películas populares. Busqué en la documentación oficial y puse el correcta.
- En la descripción de la prueba estaba mal el de crear una "guest session". Busqué en la documentación oficial y puse el correcta.

## Componentes carga dinámica
- El componente MovieRatingDialog se carga de esta manera para evitar múltiples llamadas de creación de usuario guest.