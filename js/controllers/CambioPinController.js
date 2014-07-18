angular.module('myApp.controllers').controller('CambioPinController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
    $http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/cambio_pin/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });


    $rootScope.start();
    
    $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
    $scope.puntos = $rootScope.puntos;
    $scope.playerId = $rootScope.playerId;
    $scope.falsefocuselement = false;

    $scope.falsefocus = function(element){
      $scope.falsefocuselement = element;
    }

    //Carga de pines
    $("#cambiopincontainier #keypad button").on("touchstart, click", function(){
      if($("#pin").val().length <4){
        var campo = "#pin";
      }else if($("#nuevopin").val().length <4){
        var campo = "#nFuevopin";
      }else if($("#repin").val().length <4){
        var campo = "#repin";
      }else{
        var campo = "#nowhere";
      }

        if($scope.falsefocuselement){
          campo = "#"+$scope.falsefocuselement;
          //$("#"+$scope.falsefocuselement).val(actualVal.substr(0, actualVal.length - 1));
        }


      var actualVal = $(campo).val();

      if($(this).attr("value") == "c"){
        $("#pin").val("");
        $("#nuevopin").val("");
        $("#repin").val("");
      }else if($(this).attr("value") == "b"){

        
        $(campo).val(actualVal.substr(0, actualVal.length - 1));
      }else{
        if(actualVal.length < 4){
          $(campo).val(actualVal + $(this).attr("value"));
        }
      }
      $scope.ocultarCampos();
    });
    

    $scope.cambiarPin = function(){

        //chequear si los dos pins nuevos son iguales
        if( $("#repin").val() != $("#nuevopin").val() ){
          $("#nuevopin").addClass("redborder");
          $("#repin").addClass("redborder");
          return;
        }

        //chequear si el pin viejo es igual al nuevo
        if( $("#pin").val() == $("#nuevopin").val() ){
          $("#pin").addClass("redborder");
          $("#nuevopin").addClass("redborder");
          $scope.mensaje = "El nuevo pin debe ser diferente al anterior";
          return;
        }

        $http({method: 'GET', url: endpoint+'/CambioPin/'+$scope.playerId+'/'+$("#pin").val()+'/'+$("#repin").val()}).
        success(function(data, status, headers, config) {
          if(data.Status != "ok"){
            alert(data.Mensaje);
            $("#pin").val("");
            $("#nuevopin").val("");
            $("#repin").val("");
            
            $scope.ocultarCampos();
            $("#pin").addClass("redborder");
            $("#nuevopin").addClass("redborder");
            $("#repin").addClass("redborder");

          }else{
            
            $scope.changeView("pincambiado");
          }
        }).
        error(function(data, status, headers, config) {
          $("#pin").val("");
          $("#pin").addClass("redborder");
        });
    }

    $scope.ocultarCampos = function(view) {
      //effect
      if($("#pin").val().length < 4){
        $( "#cambiopincontainier .pin" ).fadeTo( "slow" , 1);
      }else{
        
        //$( "#cambiopincontainier .pin" ).fadeTo( "slow" , 0);

        if($("#nuevopin").val().length <4){
          $( "#cambiopincontainier .nuevopin" ).fadeTo( "slow" , 1);
          $("#btn_cambiarpin").fadeTo('fast',0);
        }else{
          //$( "#cambiopincontainier .nuevopin" ).fadeTo( "slow" , 0);
          if($("#repin").val().length <4){
            $( "#cambiopincontainier .repin" ).fadeTo( "slow" , 1);
            $("#btn_cambiarpin").fadeTo('fast',0);
          }else{
            $("#btn_cambiarpin").fadeTo('fast',1);
          }
        }

      }
      
      
    }

    $scope.changeView = function(view){
        $rootScope.stop();
        $location.path(view); // path not hash
    }
  }]);