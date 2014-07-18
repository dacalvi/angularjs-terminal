angular.module('myApp.controllers').controller('UbicarMaquinaController', ['$rootScope', '$scope', '$location', '$routeParams', function($rootScope, $scope, $location, $routeParams) {
    
    $.cookie("mapa", $routeParams.id);
    $.cookie("idTerminal", $routeParams.id);

    $scope.maquinaid = $routeParams.id;

    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }

}]);