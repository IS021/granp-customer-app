const { writeFile, openSync, closeSync } = require('fs');
const { promisify } = require('util');
const dotenv = require('dotenv');

dotenv.config();

const writeFilePromisified = promisify(writeFile);

const targetPath = './src/environments/environment.ts';
const prodTargetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: false,
    auth0: {
      domain: '${process.env['AUTH0_DOMAIN']}',
      clientId: '${process.env['AUTH0_CLIENT_ID']}',
      authorizationParams: {
          redirect_uri: '${process.env['AUTH0_CALLBACK_URL']}',
          audience: '${process.env['AUTH0_AUDIENCE']}',
          scope: '${process.env['AUTH0_SCOPE']}',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: '${process.env['API_SERVER_URL']}/*',
                  // tokenOptions: {
                      // authorizationParams: {
                          // audience: '${process.env['AUTH0_AUDIENCE']}/api/v2/',
                          // scope: '${process.env['AUTH0_SCOPE']}',
                      // },
                  // },
              },
          ],
      },
    },
    granp: {
      apiServerUrl: '${process.env['API_SERVER_URL']}',
      logoutRedirectUri: '${process.env['AUTH0_CALLBACK_URL']}',
    },
  };
  `;

(async () => {
    try {
        openSync(targetPath, 'w');
        await writeFilePromisified(targetPath, envConfigFile);

        openSync(prodTargetPath, 'w');
        await writeFilePromisified(prodTargetPath, envConfigFile);
    } catch (err) {
        console.error(err);
        throw err;
    }
})();
