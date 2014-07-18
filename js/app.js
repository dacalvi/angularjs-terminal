'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ngSanitize'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/puntosvisita', {templateUrl: 'partials/puntosporvisita.html', controller: 'PuntosVisitaController'});
  $routeProvider.when('/consultapuntos', {templateUrl: 'partials/consultapuntos.html', controller: 'ConsultaPuntosController'});
  $routeProvider.when('/desbloqueo', {templateUrl: 'partials/desbloqueo.html', controller: 'DesbloqueoController'});
  $routeProvider.when('/cambiopin', {templateUrl: 'partials/cambiopin.html', controller: 'CambioPinController'});
  $routeProvider.when('/pincambiado', {templateUrl: 'partials/pincambiado.html', controller: 'PinCambiadoController'});
  $routeProvider.when('/graciasfeedback', {templateUrl: 'partials/graciasfeedback.html', controller: 'GraciasFeedBackController'});
  $routeProvider.when('/reserva', {templateUrl: 'partials/reserva.html', controller: 'ReservaController'});
  $routeProvider.when('/dondeestoy', {templateUrl: 'partials/dondeestoy.html', controller: 'DondeEstoyController'});
  $routeProvider.when('/buscarmaquina', {templateUrl: 'partials/buscarmaquina.html', controller: 'BuscarMaquinaController'});
  $routeProvider.when('/estoyperdido', {templateUrl: 'partials/estoyperdido.html', controller: 'EstoyPerdidoController'});
  $routeProvider.when('/nosocios', {templateUrl: 'partials/nosocios.html', controller: 'NoSociosController'});
  $routeProvider.when('/salir', {templateUrl: 'partials/salir.html', controller: 'SalirController'});
  $routeProvider.when('/nromaquina/:id/:casino/:sala', {templateUrl: 'partials/nromaquina.html', controller: 'UbicarMaquinaController'});



  $routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: 'MenuController'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/acceso', {templateUrl: 'partials/acceso.html', controller: 'AccesoController'});
  $routeProvider.when('/lector', {templateUrl: 'partials/lector.html', controller: 'LectorController'});
  $routeProvider.otherwise({redirectTo: '/home'});

}]);

angular.module('myApp.controllers', []);
