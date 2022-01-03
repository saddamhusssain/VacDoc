// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //  BASE_URL: "https://test.be.fernflowers.com/api/",
  //  RESOURCE_URL: "https://test.be.fernflowers.com/",


  // for using web server
  //BASE_URL: "https://fernflowers.com/api/",
  //RESOURCE_URL: "https://fernflowers.com/",
  
  //for local server
  BASE_URL: "http://localhost:5000/api/",
  RESOURCE_URL: "http://localhost:5000/",


  USER: 'User',
  DOCTOR_Id: "DoctorId",
  CLINIC_Id: "ClinicId",
  USER_Id: "UserId",
  SMS: "SMS",
  CLINICS: 'Clinics',
  Childs: 'Childs',
  CITY: 'City',
  DOCTOR: 'Doctor',
  ON_CLINIC: 'OnlineClinic',
  MESSAGES: 'Messages'

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
