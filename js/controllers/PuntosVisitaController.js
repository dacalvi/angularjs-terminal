angular.module('myApp.controllers').controller('PuntosVisitaController', ['$rootScope','$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	$scope.name = $rootScope.nombre + " " + $rootScope.apellido;
	$scope.puntos = $rootScope.puntos;
	

	$http({method: 'GET', url: endpoint+'/PuntosParaAcreditar/' + $rootScope.playerId }).
    success(function(data, status, headers, config) {
      $scope.SlotPoints = data.SlotPoints;
      $scope.CantidadDias = data.CantidadDias;
    }).
    error(function(data, status, headers, config) {
      $scope.mensaje = "Ha ocurrido un error";
    });

    $scope.acreditarPuntos = function(){

		$http({method: 'GET', url: endpoint+'/AcreditarPuntos/' + $rootScope.playerId + "/" + $scope.CantidadDias }).
    		success(function(data, status, headers, config) {
      			if(data.Error.Codigo == 0){

      				okCancelModal({
      					"text": "Se han acreditado los puntos",
      					"buttons" : [
      						{
      							"label": "Aceptar",
								    "action" : function(){ 
                      modal.close();
                    }
      						}
      					]
      				});


      			}else{


              okCancelModal({
                "text": data.Error.Mensaje,
                "buttons" : [{
                  "label": "Aceptar",
                  "action" : function(){ $rootScope.counter = 30; modal.close(); }
                }]
              });


      				$scope.mensaje = data.Error.Mensaje;
      			}
	    	}).
		    error(function(data, status, headers, config) {
		      $("#nameholder").fadeOut('slow', 0);
		      $scope.mensaje = "Ha ocurrido un error";
		    });
		   
    }
    $rootScope.start();
	$scope.changeView = function(view){
    $rootScope.stop();
		$location.path(view); // path not hash
	}

}]);