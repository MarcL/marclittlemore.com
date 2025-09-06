// Static newsletter data (no API dependency)
// This replaced the Email Octopus API call for subscriber count

const MINIMUM_SUBSCRIBERS = 237;

module.exports = async () => {
    // Return a static subscriber count to avoid API dependency
    // This can be updated manually or made configurable
    return {
        subscribers: MINIMUM_SUBSCRIBERS
    };
};