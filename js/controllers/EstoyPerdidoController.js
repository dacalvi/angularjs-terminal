angular.module('myApp.controllers').controller('EstoyPerdidoController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
    $http({method: 'GET', url: endpoint + '/Seguimiento/'+$.cookie("idTerminal")+'/feedback/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });

    $scope.lettercase = "lowercase";

    $scope.switchCase = function(){
      if($scope.lettercase == "uppercase"){
        $scope.lettercase = "lowercase";
      }else{
        $scope.lettercase = "uppercase";
      }
    }

    if($rootScope.nosocio == true){
      $scope.mensajefun = "Aún no es <strong>socio</strong>? Inscríbase gratis en los stands de atención al cliente.";
    }else{
      $scope.mensajefun = "Juegue con <strong>ventaja</strong>";
    }

      if($rootScope.nosocio == true){
        $scope.name = "";
        $scope.puntos = "";
      }else{
        $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
        $scope.puntos = $rootScope.puntos;
      }

    //Funcion que emula el teclado
    $scope.tecla = function(tecla){
      if(tecla == "<"){
        $("#mensaje").focus().val( $("#mensaje").val().slice(0,-1) );
      }else if(tecla == "!"){
        $scope.switchCase();
      }else{
        //Shift
        if($scope.lettercase == "uppercase"){
          tecla = tecla.toUpperCase();
        }
        $("#mensaje").focus().val( $("#mensaje").val() + tecla );
      }
    }


    $scope.enviarmensaje = function (){
      
      if($.trim($("#mensaje").val()) == ""){
        okCancelModal({
            "text": "Su comentario se encuentra vacio",
            "buttons" : [
              {
                "label": "Aceptar",
                "action" : function(){ $rootScope.counter = 30; modal.close(); }
              }
            ]
          });
          return;
      }

      $http({method: 'GET', url: endpoint+'/FeedBack/'+$rootScope.sesionId+'/'+$("#mensaje").val()}).
        success(function(data, status, headers, config) {

          if(data.Codigo != 0){

            okCancelModal({
              "text": data.Mensaje,
              "buttons" : [
                {
                  "label": "Aceptar",
                  "action" : function(){ $rootScope.counter = 30; modal.close(); }
                }
              ]
            });

          }else{ 
            $scope.changeView("graciasfeedback");
          }
        }).
        error(function(data, status, headers, config) {
          $("#pin").val("");
          $("#pin").addClass("redborder");
        });
    }

    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }
  }]);