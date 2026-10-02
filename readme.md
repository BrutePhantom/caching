# Express Application with Caching

As part of our workshop, we designed a simple Express application with caching for:

* `GET /products`
* `GET /products/:id`

## Requirements

Extend the application as follows:

### 1. Folder Structure

Organize the application into:

```text
routes/
controllers/
services/
database/
middleware/
```

### 2. Caching

* Implement caching for the GET endpoints.
* Add caching as middleware.
* Add `X-Cache: HIT` and `X-Cache: MISS` headers.

### 3. Cache Invalidation

Whenever a `POST`, `PUT`, `PATCH`, or `DELETE` request successfully modifies the data, invalidate all cache entries that may contain stale data.

### 4. TTL

Implement a **1-minute TTL** for cached data.

Each cache entry should store:

* Cached data
* Time when the cache was created

When cached data is requested:

1. Check if the cache exists.
2. Check whether it is older than 1 minute.
3. If valid, use the cached value.
4. If expired, fetch the latest data from the database.
5. Store the fresh data in the cache again.

### 5. Request Flow

The application should follow:

```text
Route → Middleware → Controller → Service → Database
```
