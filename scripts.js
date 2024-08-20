const clientId = new URLSearchParams(window.location.search).get('client_id');
console.log('Client ID:', clientId);

const brandMap = {
    '0oafh5hg3uSvAvdNe1d7': 'ford',
    '0oafhudaagbBfs8cd1d7': 'lincoln',
};

const brandIdentifier = brandMap[clientId] || 'default';

console.log('Brand:', brandIdentifier);

const config = {
    baseUrl: 'https://dev-duuo.oktapreview.com',
    clientId: clientId,
    redirectUri: 'https://papakobina.github.io/testingsub/success.html',
    authParams: {
        issuer: 'https://dev-duuo.oktapreview.com/oauth2/default',
        responseType: ['id_token', 'token'],
        display: 'page'
    },
    features: {
        registration: true
    },
    i18n: {
        en: {
            'primaryauth.title': `Sign in to ${brandIdentifier.toUpperCase()}`
        }
    },
    logo: 'https://via.placeholder.com/150',
    colors: {
        brand: '#000000'
    },
    transformUsername: (username, operation) => {
        // Extract the email parts before adding the brand identifier
        const [localPart, domain] = username.split('@');
        const modifiedUsername = `${localPart}+${brandIdentifier}@${domain}`;
        console.log('Transforming username:', modifiedUsername);
        return modifiedUsername;
    }
};

const signIn = new OktaSignIn(config);

signIn.renderEl(
    { el: '#okta-login-container' },
    function (res) {
        console.log('Login successful:', res);
        window.location.href = 'https://www.ford.com/';
    },
    function (err) {
        console.error('Login error:', err);
        if (err.xhr) {
            console.error('XHR status:', err.xhr.status);
            console.error('XHR response:', err.xhr.responseText);
        }
    }
);
