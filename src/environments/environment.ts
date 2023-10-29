export const environment = {
    production: false,
    auth0: {
      domain: 'antopio.eu.auth0.com',
      clientId: 'n9JNqSVKKWeaHp0bmBerwmfNWfKhSSaZ',
      authorizationParams: {
          redirect_uri: 'io.ionic.auth0.test://antopio.eu.auth0.com/capacitor/io.ionic.auth0.test/callback',
          audience: 'https://hello-world.example.com',
          // scope: '',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: 'http://192.168.1.110:6060 # http://localhost:6060 # Or http://10.0.2.2:6060 if you are running the Ionic Angular app on Android/api/messages/*',
                  // tokenOptions: {
                      // authorizationParams: {
                          // audience: 'https://hello-world.example.com/api/v2/',
                          // scope: '',
                      // },
                  // },
              },
          ],
      },
    },
    granp: {
      apiServerUrl: 'http://192.168.1.110:6060 # http://localhost:6060 # Or http://10.0.2.2:6060 if you are running the Ionic Angular app on Android',
    },
  };
  