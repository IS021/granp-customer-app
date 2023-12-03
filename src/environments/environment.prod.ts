export const environment = {
    production: false,
    auth0: {
      domain: 'antopio.eu.auth0.com',
      clientId: 'LKZ3ojDxA8PS0z5ECxO5viCVYhHWzE2b',
      authorizationParams: {
          redirect_uri: 'granp.app.customer://antopio.eu.auth0.com/capacitor/granp.app.customer/callback',
          audience: 'https://granp.api.com',
          scope: 'openid profile email',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: 'http://localhost:5255/*',
              },
          ],
      },
    },
    granp: {
      apiServerUrl: 'http://localhost:5255',
      logoutRedirectUri: 'granp.app.customer://antopio.eu.auth0.com/capacitor/granp.app.customer/callback',
      role: 'customer',
    },
  };
  