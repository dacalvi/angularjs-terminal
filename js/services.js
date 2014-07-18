'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  //Usar este en las terminales
  //value('endpoint', "http://paldev2.slots.com/Terminal.svc");
  
  //Usar este en localhost (desarrollo)
  value('endpoint', "json");
