export const environment = {
    production: false,
    auth0: {
      domain: 'antopio.eu.auth0.com',
      clientId: 'LKZ3ojDxA8PS0z5ECxO5viCVYhHWzE2b',
      cacheLocation: 'localstorage',
      authorizationParams: {
          redirect_uri: 'http://localhost:4200',
          audience: 'https://granp.api.com',
          scope: 'openid profile email',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: 'http://bigweldnas.direct.quickconnect.to:35255/*',
              },
          ],
      },
    },
    granp: {
      apiServerUrl: 'http://bigweldnas.direct.quickconnect.to:35255',
      logoutRedirectUri: 'http://localhost:4200',
      role: 'customer',
      mapboxAccessToken: 'pk.eyJ1IjoiYW50b3BpbzI2IiwiYSI6ImNscHI2YXJrMDA3NGwyaW41NzZubXcwamQifQ.y93LdBmsaZAYGLeveWMNIg',
      profileRedirectPath: '/professional-details',
    },
  };
  