const { google } = require('googleapis');
const CLIENT_ID = '826335259601-4bmomvi77v3kp3ouknuc7h09af96vvck.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04fNgIbzWLE_fCgYIARAAGAQSNwF-L9IraoAuk5gQrOppC9mFYi9VIUyjp9g2gsk5bstEr7-_f0_I37X1rRNad4QccCf9Ne75jcs';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



exports.oauth2Client = oauth2Client;