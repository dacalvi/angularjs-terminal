angular.module('myApp.controllers').controller('MostrarMaquinaController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {

	$scope.changeView = function(view){
	    $location.path(view); // path not hash
	}

	$.cookie("mapa", "1");

}]);