// Usage: node scripts/postNew.js "Post Title"
const fs = require('node:fs');
const path = require('node:path');

// ---
// title:  "Starting Writing Again"
// subtitle: "Time to get blogging again!"
// permalink: /starting-writing-again/
// headerImage: /images/banners/automate-site-rebuilds-with-netlify-functions.jpg
// description: Effortlessly automate regular website updates for your static site using Netlify scheduled functions. Set it and forget it - never worry about manual updates again!
// tags:
//     - writing
// image:
//     source: https://unsplash.com/photos/unpaired-shoe-lot-Lh-CTP558tc
//     creator: Edgar Chaparro
//     url: https://unsplash.com/@echaparro
// ---

const createFrontmatterString = (frontmatter) => {
    const frontmatterPairs = Object.entries(frontmatter)
        .map(([key, value]) => `${key}: "${value}"`)
        .join('\n');

    // convert to yaml string
    const image = {source: '', creator: '', url: ''};
    const imagePairs = Object.entries(image)
        .map(([key, value]) => `    ${key}: "${value}"`)
        .join('\n');

    
    return `---\n${frontmatterPairs}\ntags:\n    -\nimage:\n${imagePairs}\n---\n\n`;
};

const createPost = (title) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const date = `${year}-${formattedMonth}-${formattedDay}`;
    const slug = title.toLowerCase().replace(/\s/g, '-');

    const frontmatter = createFrontmatterString({
        title,
        subtitle: '',
        permalink: `/${slug}/`,
        date,
        headerImage: `/images/banners/${slug}.jpg`,
        description: '',
    });

    const postDir = path.join(__dirname, '..', 'src', 'posts', year.toString());
    const postFile = path.join(postDir, `${date}-${slug}.md`);

    // Create post directory if it doesn't exist
    if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir);
    }

    // Don't overwrite existing post
    if (fs.existsSync(postFile)) {
        console.error(`Post already exists: ${postFile}`);
        process.exit(1);
    }

    fs.writeFileSync(postFile, frontmatter);

    console.log(`Post created: ${postFile}`);
};

const postTitle = process.argv[2] || 'default-title';
createPost(postTitle);
