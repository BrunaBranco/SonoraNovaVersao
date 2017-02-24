var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope) {

  $scope.scan = function(scan){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled)
        {
          if(result.format == "QR_CODE")
          {
            window.alert(result.text);
            responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
            //responsiveVoice.speak("teste", "Brazilian Portuguese Female");
            $scope.scan();

          }
        }

      },
      function (error) {
        alert("Scanning failed: " + error);
      }
    );

  };


  $scope.scan2 = function(){
    responsiveVoice.speak("teste", "Brazilian Portuguese Female");
    responsiveVoice.speak("teste", "Brazilian Portuguese Female");
  };

})


app.controller('ChatDetailCtrl', function($scope, $stateParams, $http, $ionicPopup, $ionicListDelegate) {

  //$scope.texto;
    $scope.scan = function(){

    cordova.plugins.barcodeScanner.scan(
      function (result) {

        if(!result.cancelled)
        {
          if(result.format == "QR_CODE")
          {
            window.alert(result.text);
            responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
            //responsiveVoice.speak("teste", "Brazilian Portuguese Female");
            // $scope.getTag(result.text);
            $scope.scan();
          }
        }
      },
      function (error) {
        alert("Scanning failed: " + error);
      }
    );
  };

  $scope.tag = {};

  $scope.postTag = function(){
    $http.post('https://api.mlab.com/api/1/databases/iflab/collections/sonora?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $scope.tag)
    .success(function(response){
      console.log(response);
      angular.forEach(response, function(carregar){
        $scope.tag = carregar;
        console.log(carregar);
      });
    });

    $scope.tag = {};
  }

  $scope.getTag = function(tag){
    var url = 'https://api.mlab.com/api/1/databases/iflab/collections/sonora?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff&q={\"rfid\":\"'+tag+'\"}';

    console.log('URL: ' +url);
    $http.get(url)
    .success(function(response){
      if(response[0] != null){
           console.log(response[0]);
           responsiveVoice.speak(response[0].descricao, "Brazilian Portuguese Female");
      }else{
           responsiveVoice.speak("Indefinido", "Brazilian Portuguese Female");

      }

    });

    $scope.tag = {};
  }

});
