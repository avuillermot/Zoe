// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const commonUrl:string = "https://pc-246.home:8091/";
export const environment = {
  production: false,
  /*services: {
    entity: "http://localhost:8080/",
    customer: "http://localhost:8080/",
    product: "http://localhost:8080/",
    calculEngine: "http://localhost:8080/",
    documentEngine: "http://localhost:8080/",
    user: "http://localhost:8081/",
    context: "http://localhost:8080/",
    pdf: "http://localhost:8080/"
  }*/
  commonUrl: "https://pc-246.home:8091/",
  services: {
    entity: commonUrl,
    customer: commonUrl,
    product: commonUrl,
    calculEngine: commonUrl,
    documentEngine: commonUrl,
    user: "https://pc-246.home:8090/",
    context: commonUrl,
    pdf: commonUrl
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
