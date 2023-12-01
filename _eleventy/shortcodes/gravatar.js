const crypto = require('crypto');

const gravatar = (email, size = 80, defaultImage = 'mp') => {
  // Create an MD5 hash from the email address
  const emailHash = crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');

  // Return a URL image with the hash
  return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}&s=${size}`;
};

module.exports = gravatar;
