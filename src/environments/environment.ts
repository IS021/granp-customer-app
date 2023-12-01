export const environment = {
    production: false,
    auth0: {
      domain: 'antopio.eu.auth0.com',
      clientId: 'LKZ3ojDxA8PS0z5ECxO5viCVYhHWzE2b',
      authorizationParams: {
          redirect_uri: 'http://localhost:4200',
          audience: 'https://granp.api.com',
          scope: 'openid profile email',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: 'http://localhost:5255/*',
                  // tokenOptions: {
                      // authorizationParams: {
                          // audience: 'https://granp.api.com/api/v2/',
                          // scope: 'openid profile email',
                      // },
                  // },
              },
          ],
      },
    },
    granp: {
      apiServerUrl: 'http://localhost:5255',
      logoutRedirectUri: 'http://localhost:4200',
    },
  };
  