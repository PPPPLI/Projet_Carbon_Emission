// file src/lib/microsoftGraph.js
import * as msal from "@azure/msal-browser"

if (typeof crypto === 'undefined') {
    import('crypto').then(cryptoModule => {
        global.crypto = cryptoModule.webcrypto;
    });
}


/**
 * List the requested scopes(aka. the requested permissions)
 */

const requestedScopes = {

    scopes: ["User.Read", "Mail.Read"]
}

const msalInstance = new msal.PublicClientApplication({

    auth:{
        clientId: process.env.VUE_APP_OAUTH_CLIENT_ID
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
})


let isMsalInitialized = false;

async function initializeMsal() {
    if (!isMsalInitialized) {
        try {
            await msalInstance.initialize();
            isMsalInitialized = true;      
        } catch (error) {
            console.error('MSAL initialization failed:', error);
            throw error;
        }
    }
}


export async function signInAndGetUser() {
    try {
        await initializeMsal();
        const authResult = await msalInstance.loginPopup(requestedScopes);
        msalInstance.setActiveAccount(authResult.account);

        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: requestedScopes.scopes
        });


        return {
            account: authResult.account,
            accessToken: tokenResponse.accessToken
        };

    } catch (error) {
        console.error('Sign-in failed:', error);
        throw error;
    }
}