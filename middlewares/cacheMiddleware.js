const cache = new Map();

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedData = cache.get(key);

  // No cache entry
  if (!cachedData) {
    res.set("X-Cache", "MISS");
    return next();
  }

  const age = Date.now() - cachedData.createdAt;

  // Cache expired
  if (age > TTL) {
    cache.delete(key);

    res.set("X-Cache", "MISS");

    return next();
  }

  // Cache HIT
  res.set("X-Cache", "HIT");

  return res.json(cachedData.data);
}

function setCache(key, data) {
  cache.set(key, {
    data: data,
    createdAt: Date.now(),
  });
}

function clearCache() {
  cache.clear();
}

module.exports = {
  cacheMiddleware,
  setCache,
  clearCache,
};