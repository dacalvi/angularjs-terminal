angular.module('myApp.controllers').controller('LectorController', ['$rootScope', '$scope', '$location', '$http', '$timeout', 'endpoint', function($rootScope, $scope, $location, $http, $timeout, endpoint) {
    
    $scope.segundaBanda = false;
    $scope.ranking = "Classic";

    
    $(document).on("keydown", function (e) {    
        if(e.keyCode == 192){
          $scope.numerosocio = "";
        }

        if(e.keyCode == 192){
          $scope.segundaBanda = true;
        }

        if($scope.segundaBanda){
          if(e.keyCode > 47 && e.keyCode < 58){
            $scope.numerosocio = $scope.numerosocio + String.fromCharCode(e.keyCode);
            $("#numerosocio").val($scope.numerosocio);
          }
        }

        if(e.keyCode == 13){
          if($scope.segundaBanda){
            $scope.numerosocio = "";
            $scope.forzarIngreso();
          }
        }
    });

    $scope.ingresoNoSocio = function(){

      $http.get(endpoint+'/Config/TIME_OUT').then(function(response) {
          if(response.data.Error.Codigo == 0){
            $rootScope.timeout = response.data.Valor;
            console.log("ns timeout from config service = "+ response.data.Valor);
          }
      });
      
      $scope.changeView("nosocios");

      


    }

    $scope.forzarIngreso = function(){

      $http.get(endpoint+'/Config/TIME_OUT').then(function(response) {
          if(response.data.Error.Codigo == 0){
            $rootScope.timeout = response.data.Valor;
            console.log("timeout from config service = "+ response.data.Valor);
          }
      });

      $http.get(endpoint+'/ValidarPlayerCardId/' + $("#numerosocio").val() + "/" + $.cookie("idTerminal") ).then(function(response) {
        if(response.data.Error.Codigo == 0){ 
          $scope.loguearUsuario(
            response.data.IdSesion,
            response.data.Nombre, 
            response.data.Apellido, 
            response.data.Ranking, 
            response.data.PlayerID
          );
          $scope.changeView("acceso");
        }else{
          okCancelModal({
            "text": "Error de Autenticación",
            "buttons" : [
              {
                "label": "Aceptar",
                "action" : function(){ modal.close(); }
              }
            ]
          });

        }
        
      });
    }

    $scope.loguearUsuario = function(sesionId, nombre, apellido, ranking, playerId){
      $rootScope.sesionId = sesionId;
      $rootScope.nombre = nombre;
      $rootScope.apellido = apellido;
      $rootScope.ranking = ranking;
      $rootScope.playerId = playerId;
      $rootScope.nosocio = false;

      //Change background
      $("#fullcontainer").addClass(ranking);
      $("body").addClass(ranking);
    }


    $scope.changeView = function(view){
        $rootScope.stop();
        $location.path(view); // path not hash
    }



    $rootScope.defaultPageTimer = function(){ 
      if(typeof $rootScope.timeout == "undefined"){
        return 120;
      }else{
        return $rootScope.timeout; 
      }
    }

    $rootScope.countdown = function() {

      $rootScope.stopped = $timeout(function() {
        console.log($rootScope.counter);
        if($rootScope.counter == 5){
          okCancelModal({
            "text": "¿Desea mas tiempo?",
            "buttons" : [
              {
                "label": "Aceptar",
                "action" : function(){ $rootScope.counter = $rootScope.timeout; modal.close(); }
              },
              {
                "label": "Cancelar",
                "action" : function(){ $rootScope.counter = 0; modal.close(); }
              }
            ]
          });
        }

        if($rootScope.counter<1){
          $timeout.cancel($rootScope.stopped);
          modal.close();
          $location.path('salir');
        }else{
          $rootScope.counter--;   
          $scope.countdown();   
        }
      }, 1000);
    };


    $rootScope.stop = function(){
      $rootScope.counter = $rootScope.defaultPageTimer;
      $timeout.cancel($rootScope.stopped);
    }

    $rootScope.start = function(seconds){
      if(typeof seconds === "undefined"){
        $rootScope.counter = $rootScope.defaultPageTimer();
      }else{
        $rootScope.counter = seconds;
      }
      $rootScope.countdown();
    }

    
    



    $rootScope.start();



  }]);