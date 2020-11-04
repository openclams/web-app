# Clams

Clams is the web app of the openclams project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

When you use Clams for the first time, it will ask you to input a URL of a server where to load the service descriptions.

Aside of running Clams, you also need to run a web server that provides the service descriptions for the web app.
The [service-catalogs](https://github.com/openclams/service-catalogs) repo contains example files of service descriptions. 

Clone the repo into a web root folder of your web server and add the URL of the service-catalogs.json into Clams before startup.

Add the URL in the environments/environments.ts file as follows:
```
import LocalStorageDriverPrinter from 'src/app/data-management/drivers/local-storage-driver-printer';

export const environment = {
  production: false,
  storageDriver:  LocalStorageDriverPrinter,
  serviceServer: 'http://localhost:80/path/service-catalogs.json'
};
```

### Serving Service Descriptions with the Apache HTTP Server
If you wish to use XAMPP or any other web server that uses the Apache HTTP server, then you need to enable CORS if Clams and the web server are located on different domains.
Add the following code to your `.htaccess` file to serve the service descriptions with the CORS headers.
```
<FilesMatch "\.(htm|html|php|json)$">
# Always set these headers.
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
Header always set Access-Control-Max-Age "1000"
Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
</FilesMatch>
# Added a rewrite to respond with a 200 SUCCESS on every OPTIONS request.
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).