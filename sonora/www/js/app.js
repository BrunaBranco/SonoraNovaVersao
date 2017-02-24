
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // responsiveVoice.speak("iniciando app", "Brazilian Portuguese Female");

    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


  });

})

app.controller('qrcodeController', function($scope) {

  ionic.Platform.ready(function(){
   $scope.scan();
 });

  $scope.scan = function(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled) {
          if(result.format == "QR_CODE") {

            TTS
                .speak({
                    text: result.text,
                    locale: 'pt-BR',
                    rate: 1.0
              });
            // responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
            // if(responsiveVoice.isPlaying()) {
            //     window.alert(result.text);
            //   }
            //
            //   responsiveVoice.resume();
            // window.alert(result.text);
            $scope.scan();
          }
        }
      },
      function (error) {
        alert("Scanning failed: " + error);
      },
      {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : false, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE, PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      }
    );

    //   $cordovaBarcodeScanner.scan()
    //   .then(function(result) {
    //     // Success! Barcode data is here
    //     // responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
    //     // window.alert(result.text);
    //     // $scope.scan();
    //     if(!result.cancelled) {
    //       if(result.format == "QR_CODE") {
    //         responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
    //         // window.alert(result.text);
    //         $scope.scan();
    //       }
    //     }
    //   }, function(error) {
    //     // An error occurred
    //     alert("Scanning failed: " + error);
    //   }
    // );


  }

  // $scope.scan = function(scan){
  //   cordova.plugins.barcodeScanner.scan(
  //     function (result) {
  //       if(!result.cancelled)
  //       {
  //         if(result.format == "QR_CODE")
  //         {
  //           window.alert(result.text);
  //           responsiveVoice.speak(result.text, "Brazilian Portuguese Female");
  //           //responsiveVoice.speak("teste", "Brazilian Portuguese Female");
  //           $scope.scan();
  //         }
  //       }
  //     },
  //     function (error) {
  //       alert("Scanning failed: " + error);
  //     }
  //   );
  // };

})
