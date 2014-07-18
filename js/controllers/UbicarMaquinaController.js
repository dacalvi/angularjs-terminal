angular.module('myApp.controllers').controller('UbicarMaquinaController', ['$rootScope', '$scope', '$location', '$routeParams', function($rootScope, $scope, $location, $routeParams) {

	$("#fullcontainer").addClass("Classic");
    
    $.cookie("mapa", $routeParams.id);
    $.cookie("idTerminal", $routeParams.id);
    $.cookie("casino", $routeParams.casino);
    $.cookie("sala", $routeParams.sala);


    $scope.maquinaid = $routeParams.id;
    $scope.casinoid = $routeParams.casino;
    $scope.salaid = $routeParams.sala;


    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }

}]);

  