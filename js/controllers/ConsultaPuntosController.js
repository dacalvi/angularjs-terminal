angular.module('myApp.controllers').controller('ConsultaPuntosController', ['$rootScope', '$scope', '$location', '$http', 'endpoint',  function($rootScope, $scope, $location, $http, endpoint) {
  $http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/Consulta_puntos/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });


  $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
  $scope.puntos = $rootScope.puntos;
  
  $scope.cargarPuntosVisita = function(){
    $http({method: 'GET', url: endpoint+'/Menu/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      $scope.botones = data;
    }).
    error(function(data, status, headers, config) {
      $scope.changeView("salir");
    });      
  }

  $rootScope.start()
  $scope.changeView = function(view){
    $rootScope.stop();
    $location.path(view); // path not hash
  }

}]);