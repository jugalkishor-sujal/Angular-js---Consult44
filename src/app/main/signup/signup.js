angular.module('ngOgsnApps.signup', [
  'ui.router',
  'pascalprecht.translate'

])

.config(function config($stateProvider) {
    $stateProvider
.state('signup', {
    url: '/main/signup',
    views: {
        "main": {
            controller: 'signupCtrl',
            templateUrl: 'main/signup/signup.tpl.html'
        }
    }, data: { pageTitle: 'signup' }
});
})

.controller('signupCtrl', function signupCtrl($scope, $location, $http, supplementalApiUri) {
   
    $scope.current.signup = $scope.current.signup||{};
   
    $scope.signup = function () {
        $scope.showMessage = false;
        $scope.signupBean = $scope.signupBean || {};
        var reqObj = { "email": $scope.current.signup.userid, "password": $scope.current.signup.password };
        var jdata = "email=" + $scope.current.signup.userid + "&password=" + $scope.current.signup.password;
        $.ajax({
            url: 'https://josephsapi.herokuapp.com/api/v1/signUp',
            type: 'POST',
            data: jdata,
            contentType: 'application/x-www-form-urlencoded',
            success: function (response) {
                alert(response.status);
            },
            error: function (res) {
                alert("error");
                alert(res);
            }
        });
        //console.log(reqObj.email);
        //console.log(reqObj.password);
        //console.log(jdata);
        //$http({
        //    "method":"POST",
        //    "url": 'https://josephsapi.herokuapp.com/api/v1/signUp',
        //    "data": jdata
        //}).then(function (result) {
        //    console.log('success');
        //    console.log(result);
            
        //}, function (result) {
        //    console.log('error');
        //    console.log(result);
        //});
    };
    $scope.back = function () {
        $location.path("/main/menu");
    };
});