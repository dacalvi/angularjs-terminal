angular.module('myApp.controllers').controller('MenuController', ['$rootScope', '$scope', '$location', '$http', '$timeout', 'endpoint', function($rootScope, $scope, $location, $http, $timeout, endpoint) {

  $http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/menu/' + $rootScope.sesionId }).
  success(function(data, status, headers, config) {

  });


  if($rootScope.nosocio == true){
    $scope.name = "";
    $scope.puntos = "";
  }else{
    $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
    $scope.puntos = $rootScope.puntos;
  }
  
  if(typeof $rootScope.playerId == "undefined" || $rootScope.playerId == "") {
    $rootScope.playerId = "0";
  }

  $http({method: 'GET', url: endpoint+'/Menu/' + $rootScope.playerId }).
  success(function(data, status, headers, config) {
    $scope.botones = data.Menu;
  }).
  error(function(data, status, headers, config) {
    $scope.changeView("salir");
  });

  $rootScope.start();

  $scope.changeView = function(view){
        $rootScope.stop();
        $location.path(view); // path not hash
      }

    }]);