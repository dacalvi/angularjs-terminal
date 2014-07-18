angular.module('myApp.controllers').controller('NoSociosController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	
	$http.get(endpoint+'/CrearSesion/' + $.cookie("idTerminal") ).then(function(response) {
          if(response.data.Error.Codigo == 0){
            $rootScope.sesionId = response.data.ID;
            $rootScope.nosocio = true;
            $scope.changeView("menu");
          }
      });
	
	$rootScope.start();

	$scope.changeView = function(view){
		$rootScope.stop();
		$location.path(view); // path not hash
	}
	
}]);