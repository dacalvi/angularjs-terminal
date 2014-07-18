angular.module('myApp.controllers').controller('AccesoController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
    $http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/acceso/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });

    $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
    $scope.ranking = $rootScope.ranking;
    

    $rootScope.start();

    showKeypad();
    
    $scope.checkPin = function(){
        if($.trim($("#pin").val()) == ""){

          okCancelModal({
              "text": "Ingrese su pin",
              "buttons" : [
                {
                  "label": "Aceptar",
                  "action" : function(){modal.close(); }
                }
              ]
            });
            return;

        }


        $http({method: 'GET', url: endpoint + '/ValidarExistenciaPlayerPin/'+$rootScope.playerId+'/'+$("#pin").val()}).
        success(function(data, status, headers, config) {
          if(data.Error.Codigo != 0){
            $("#pin").val("");

            $("#pin").addClass("redborder");

            okCancelModal({
              "text": "Datos de acceso incorrectos",
              "buttons" : [
                {
                  "label": "Aceptar",
                  "action" : function(){modal.close(); }
                }
              ]
            });


          }else{
            $scope.cambiarPuntaje(data.SlotPoints);
            $rootScope.stop();
            $scope.changeView("menu");
          }
        }).
        error(function(data, status, headers, config) {
          $("#pin").val("");
          
          $("#pin").addClass("redborder");
          okCancelModal({
              "text": "Datos de acceso incorrectos",
              "buttons" : [
                {
                  "label": "Aceptar",
                  "action" : function(){modal.close(); }
                }
              ]
            });
        });
    }

    $scope.cambiarPuntaje = function(puntos){
      $rootScope.puntos = puntos;
    }

    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }

    $("#pin").focus(function(){
      showKeypad();
    });

    $("#keypad button").on("touchstart, click", function(){
      var actualVal = $("#pin").val();
      if($(this).attr("value") == "c"){
        $("#pin").val("");
      }else if($(this).attr("value") == "b"){
        $("#pin").val(actualVal.substr(0, actualVal.length - 1));
      }else{
        if(actualVal.length < 4){
          $("#pin").val(actualVal + $(this).attr("value"));
        }
      }
    });

    function showKeypad(){
      $("#nameholder").fadeOut();
      $("#pinholder").fadeOut().css("padding-top", "150px").fadeIn().animate({width: "350px"}, 500);
      $("#keypad").css("position","absolute");
      $("#keypad").css("top", Math.max(0, (($(window).height() - $("#keypad").outerHeight()) / 2) + $(window).scrollTop()) + "px");
      $("#keypad").css("left", Math.max(0, (($(window).width() - $("#keypad").outerWidth()) / 2) + $(window).scrollLeft()) + "px");
      $("#keypad").fadeIn();
      $("#acceso_buttoncontainer").fadeIn();
      $("#acceso_buttoncontainer button").css("position","absolute");
      $("#acceso_buttoncontainer button").css("left", 
        Math.max(0, (($(window).width() - $("#acceso_buttoncontainer button").outerWidth()) / 2) + $(window).scrollLeft())-10  + "px");
    }

    
  }]);