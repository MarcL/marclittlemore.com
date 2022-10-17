import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const signupText = url.searchParams.has('signup') ?
      url.searchParams.get('signup') : 'none';

  // Get the page content
  const response = await context.next();
  const page = await response.text();

  // Search for the placeholder
  const regex = /@@SIGNUP_INFO@@/i;

  // Replace the content
  const updatedPage = page.replace(regex, signupText);
  return new Response(updatedPage, response);
};