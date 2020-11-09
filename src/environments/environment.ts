// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import LocalStorageDriverPrinter from 'src/app/data-management/drivers/local-storage-driver-printer';

export const environment = {
  production: false,
  storageDriver:  LocalStorageDriverPrinter,
  serviceServer: 'http://localhost:80/bosch/service-catalogs.json',
  evalServers: [{
    menuTitle: 'Predict Availability',
    url: 'http://localhost:8088/',
    parameters:{
      head: 'Minimal Cost Recommendation',
      body: 'Select cost-minimal services for a given availability requirement',
      args:[
        {
          label:'Availability Limit',
          name: 'availability',
          unit: '%'
        }
      ]
    }
  }]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
