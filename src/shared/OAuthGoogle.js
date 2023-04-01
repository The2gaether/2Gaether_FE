const GOOGLE_CLIENT_ID =
  "659071858036-78904fvla30i24586ua6uik980c0trh0.apps.googleusercontent.com";
//const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth/callback/google";
const GOOGLE_REDIRECT_URI = "https://twogaether.site/oauth/callback/google";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`;
