const { google } = require('googleapis');
const CLIENT_ID = '826335259601-4bmomvi77v3kp3ouknuc7h09af96vvck.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04WIkIOVzluawCgYIARAAGAQSNwF-L9Ir3zs1IEj3PEvjNpcJrpPJ1u1JYOex3WGJSVItctqezGdRKzdX3Un0m4FsIsMgcD4BxmA';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



exports.oauth2Client = oauth2Client;