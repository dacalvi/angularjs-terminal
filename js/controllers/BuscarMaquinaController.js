angular.module('myApp.controllers').controller('BuscarMaquinaController', ['$rootScope', '$scope', '$location','$http', 'endpoint', function($rootScope ,$scope, $location, $http, endpoint) {
    $http({method: 'GET', url: endpoint + '/Seguimiento/'+$.cookie("idTerminal")+'/buscar_maquina/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });
    
    $scope.nroslide = 0;
    $scope.lettercase = "lowercase";

    $scope.switchCase = function(){
      if($scope.lettercase == "uppercase"){
        $scope.lettercase = "lowercase";
      }else{
        $scope.lettercase = "uppercase";
      }
    }

    $rootScope.start();

    if($rootScope.nosocio == true){
      $scope.mensajefun = "Aún no es <strong>socio</strong>? Inscríbase gratis en los stands de atención al cliente.";
      $scope.name = "";
      $scope.puntos = "";
    }else{
      $scope.mensajefun = "Juegue con <strong>ventaja</strong>";
      $scope.name = $rootScope.nombre + " " + $rootScope.apellido;
      $scope.puntos = $rootScope.puntos;
    }

    $scope.buscarmaquinapornombre = function(name){

      $http({method: 'GET', url: endpoint + '/BusquedaMaquinas/'+name}).
      success(function(data, status, headers, config) {

        if(data.Error.Codigo == 0){
          $scope.sectores = data.Machines;
          $scope.salaid = $.cookie("sala");

          $("#listajuegos").fadeTo('slow', 0);
          $("#listasectores").fadeTo('slow', 1);
          $("#keypad").fadeTo('slow', 0);
          $('.bxslider').bxSlider();
          $('.bxslider').fadeTo('slow', 1);

          $(".back_button").animate({top: "22em", "z-index": "90"}, 500, function(){ 
            $("#slidesalas li").first().show(); 
            $scope.showhideUIElements();
          });

        }else{
          
        }
      }).
      error(function(data, status, headers, config) {
        //nada deberia entrar aca
      });


    }


    //Funcion que emula el teclado
    $scope.tecla = function(tecla){
      if(tecla == "<"){
        $("#textobusquedamaquina").focus().val( $("#textobusquedamaquina").val().slice(0,-1) );
      }else if(tecla == "!"){
        $scope.switchCase();
      }else{
        //Shift
        if($scope.lettercase == "uppercase"){
          tecla = tecla.toUpperCase();
        }      
        $("#textobusquedamaquina").focus().val( $("#textobusquedamaquina").val() + tecla );
      }

      $http({method: 'GET', url: endpoint+'/BusquedaJuegos/'+$("#textobusquedamaquina").val()}).
      success(function(data, status, headers, config) {
        if(data.Status != "ok"){
          //$(data).slice(0, 5);
          //$scope.resultados = $(data).slice(0, 5);
          var shown = [];
          for(ele in data.Machines){
            if(ele < 5){
              shown[ele] = data.Machines[ele];
            }
          }
          $scope.resultados = shown;

        }else{
          
        }
      }).
      error(function(data, status, headers, config) {
        //nada deberia entrar aca
      });


    }


    $scope.buscarmaquina = function(){

      //$("#buscadormaquina #keypad").fadeOut();

      /*
      $('#video_transition').fadeIn('fast', function(){
        var video = $('#video_transition').get(0);
        video.load();
        video.play();  
        video.onended = function(e) {
          $('#video_transition').fadeOut();
        }
      });
      */

      //$('.bxslider').bxSlider();

    }



    $scope.prev_slide = function(view){
      //alert($scope.nroslide);
      if($scope.nroslide > 0){
        $scope.nroslide--;
      }

      $scope.showhideUIElements();

    }

    $scope.next_slide = function(view){
      //alert($scope.nroslide);
      if($scope.nroslide < $("#slidesalas li").length){
        $scope.nroslide++;
      }

      $scope.showhideUIElements();
    }


    $scope.showhideUIElements = function() {
      
      if($scope.nroslide == 0){
        $("#atrasbtn").hide();
      }else{
        $("#atrasbtn").show();
      }


      if($scope.nroslide == $("#slidesalas li").length-1){
        $("#massectoresbtn").hide();
      }else{
        $("#massectoresbtn").show();
      }

      $("#slidesalas li").fadeTo("slow", 0).hide();
      $("#slidesalas li").eq($scope.nroslide).fadeTo("slow", 1); 

    }

    $scope.changeView = function(view){
      $rootScope.stop();
      $location.path(view); // path not hash
    }

  }]);