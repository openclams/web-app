# Clams

Clams is the web app of the openclams project.

## Development server

Run `ng serve` for a dev server and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Aside of running Clams, you also need to run a web server that provides the cloud componentes for the web app.
The [Component Registry Server](https://github.com/openclams/component-registry-server) repo contains contains its own instructions to run ther sever. Please follow them. 

When you managed to start the regisitry, you can connect the web-app by 
adding the URL of the registry endopoint in the environments/environments.ts file as follows:

```
serviceServer: 'http://localhost/api/providers',
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
