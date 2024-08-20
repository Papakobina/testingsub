// Get the client ID to determine the brand
const clientId = new URLSearchParams(window.location.search).get('client_id');
console.log('Client ID:', clientId);

// Determine the brand based on the client ID
const brandMap = {
    '0oafh5hg3uSvAvdNe1d7': 'brand1',
    '0oafhudaagbBfs8cd1d7': 'brand2'
};
const brandIdentifier = brandMap[clientId] || 'default';

console.log('Client ID:', clientId);
console.log('Brand:', brandIdentifier);
const config = {
    baseUrl: 'https://dev-duuo.oktapreview.com',  // Corrected Okta domain
    clientId: clientId,
    redirectUri: 'https://papakobina.github.io/testingsub/success.html',  // Local testing redirect URI
    authParams: {
        issuer: 'https://dev-duuo.oktapreview.com/oauth2/default',  // Corrected issuer
        responseType: ['id_token', 'token'],
        display: 'page'
    },
    features: {
        registration: true  // Allows testing of sign-up functionality if needed
    },
    i18n: {
        en: {
            'primaryauth.title': `Sign in to ${brandIdentifier.toUpperCase()}`
        }
    },
    logo: 'https://via.placeholder.com/150',  // Placeholder logo for testing
    colors: {
        brand: '#000000'  // Simple black color for testing
    },
    transformUsername: (username, operation) => {
        // Append the brand identifier to the username
        const modifiedUsername = `${brandIdentifier}_${username}`;
        console.log('Transforming username:', modifiedUsername);
        return modifiedUsername;
    }
};

const signIn = new OktaSignIn(config);

signIn.renderEl(
    { el: '#okta-login-container' },
    function (res) {
        if (res.status === 'SUCCESS') {
            console.log('Login successful:', res);
        } else {
            console.warn('Unexpected status:', res.status);
        }
    },
    function (err) {
        console.error('Login error:', err);
        if (err.xhr) {
            console.error('XHR status:', err.xhr.status);
            console.error('XHR response:', err.xhr.responseText);
        }
    }
);
