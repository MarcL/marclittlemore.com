/**
 * Regex for parsing PocketCasts URLs
 *
 * Matches:
 * - https://pca.st/{id}
 * - https://pca.st/podcast/{slug}
 * - https://pca.st/episode/{id}
 *
 * The URL must be on its own line wrapped in a <p> tag (as Markdown produces).
 * Optionally handles anchor tag wrapping.
 *
 * Capture groups:
 * - [0]: The entire match
 * - [1]: Whitespace before URL
 * - [2]: Whitespace after opening anchor (if present)
 * - [3]: Optional path type (podcast, episode, or empty for direct IDs)
 * - [4]: The ID/slug
 * - [5]: Whitespace before closing anchor (if present)
 * - [6]: Whitespace at end
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2(?:https?:)??(?:\/\/)??pca\.st\/??(podcast|episode)??\/??([\w-]+)(?:[^\s<>]*)(?=(\s*))\5(?:<\/a>)??(?=(\s*))\6<\/p>/g;
