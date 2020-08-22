const got = require('got');
const cacheManager = require('cache-manager');
const fsStore = require('cache-manager-fs');
const crypto = require('crypto');

const cache = cacheManager.caching({
    store: fsStore,
    options: {
        maxsize: 1000*1000*1000, // Maximum size on disk in bytes
        ttl: 60,
        path: '_tmp',
    }
});

const createKey = (url, options) => {
    const keyString = `${url}+${JSON.stringify(options)}`;
    return crypto.createHash('md5').update(keyString).digest('hex');
};

const cachedHttpRequest = async (url, options) => {
    const cacheKey = createKey(url, options);
    try {
        return await cache.wrap(cacheKey, function() {
            console.log(`Http request: ${url}`);
            console.log(`Cache key: ${cacheKey}`);
            return got(url, options)
                .then(data => data.body);
        });
    }
    catch(error) {
        console.log(`Error with cached HTTP request: ${url}`);
        console.error(error.toString());
    }
};

module.exports = cachedHttpRequest;
