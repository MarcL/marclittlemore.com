/**
 * Regex for parsing PocketCasts URLs
 *
 * Matches:
 * - https://pca.st/{id}
 * - https://pca.st/podcast/{slug}
 * - https://pca.st/episode/{id}
 *
 * The URL must be on its own line wrapped in a <p> tag (as Markdown produces).
 * Handles optional anchor tag wrapping and whitespace/newlines.
 *
 * Capture groups:
 * - [0]: The entire match
 * - [1]: The ID/slug
 */

module.exports = /<p>\s*(?:<a [^>]*?>)?\s*(?:https?:)?(?:\/\/)?pca\.st\/(?:(?:podcast|episode)\/)?([\w-]+)[^\s<>]*\s*(?:<\/a>)?\s*<\/p>/g;
