const fs = require('fs').promises;
const path = require('path');
const { default: parseMd } = require('parse-md');

/**
 * Load newsletters from local markdown files instead of Email Octopus API
 * This replaces the previous API-dependent implementation
 */
module.exports = async () => {
    const newslettersDir = path.join(__dirname, 'newsletters');
    
    try {
        const files = await fs.readdir(newslettersDir);
        const newsletterFiles = files.filter(file => file.endsWith('.md') && file !== 'README.md');
        
        const newsletters = [];
        
        for (const file of newsletterFiles) {
            const filepath = path.join(newslettersDir, file);
            const content = await fs.readFile(filepath, 'utf8');
            const { metadata, content: html } = parseMd(content);
            
            // Ensure all required fields are present
            if (metadata.title && metadata.sent && metadata.sentSlug && metadata.status === 'sent') {
                newsletters.push({
                    created: metadata.created || metadata.sent,
                    sent: metadata.sent,
                    sentSlug: metadata.sentSlug,
                    title: metadata.title,
                    url: metadata.url,
                    status: metadata.status,
                    html: html
                });
            }
        }
        
        // Sort by sent date (newest first)
        newsletters.sort((a, b) => new Date(b.sent) - new Date(a.sent));
        
        console.log(`Loaded ${newsletters.length} newsletters from local files`);
        return newsletters;
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn('No newsletters directory found. Run "node scripts/export-newsletters.js" to create local newsletter files.');
            return [];
        }
        throw error;
    }
};