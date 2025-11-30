# Challenge Project

Este proyecto consta de una aplicación backend y una base de datos MySQL, orquestados mediante Docker Compose.

## Requisitos previos

- Docker
- Docker Compose
- Archivo `.env`

## Archivo env

Crear un archivo .env con el contenido de env.template

## Ejecución

Para iniciar los servicios, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up -d --build
```

Esto levantará los siguientes servicios:

- **db**: Servicio de base de datos MySQL.
- **backend**: Aplicación backend (NestJS).

Para detener los servicios:

```bash
docker-compose down
```

Si se quiere también eliminar los volúmenes
```bash
docker-compose down -v
```
## API URL

http://localhost:3001/

## Swagger URL

http://localhost:3001/docs

## HTTP file

En raiz de proyecto : api-requests.http


## Detalles de la Infraestructura

### Base de Datos (MySQL)

- **Servicio**: `db`
- **Persistencia**: Se utiliza un volumen llamado `dbdata` montado en `/var/lib/mysql` para persistir los datos.
- **Inicialización**:
  - Se monta el directorio local `./db-scripts` en `/docker-entrypoint-initdb.d/` dentro del contenedor.
  - Esto ejecuta automáticamente el script `init.sql` al iniciar el contenedor por primera vez.

### Esquema de Base de Datos

El script de inicialización (`db-scripts/init.sql`) realiza las siguientes acciones:

1.  Crea la base de datos **`challenge`** (si no existe).
2.  Crea la tabla **`productos`** con la siguiente estructura:
    - `id`: INT, Primary Key, Auto Increment.
    - `nombre`: VARCHAR(255), No Nulo.
    - `descripcion`: TEXT.
    - `precio`: DECIMAL(10,2), No Nulo (Precio en Pesos Argentinos).
    - `created_at`: TIMESTAMP.
    - `updated_at`: TIMESTAMP.

### Backend

- **Servicio**: `backend`
- **Puerto**: La API se expone en el puerto definido por la variable `API_EXPOSED_PORT` (mapeado al puerto 3300 del contenedor).
- **Dependencias**: Espera a que el servicio `db` esté disponible.
