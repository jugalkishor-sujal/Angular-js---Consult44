angular.module('ngOgsnApps.signin', [
    'ui.router'])

.config(function config($stateProvider) {
    $stateProvider

    .state('signin', {
        url: '/main/signin',
        views: {
            "main": {
                controller: 'signinCtrl',
                templateUrl: 'main/signin/signin.tpl.html'
            }
        },
        data: { pageTitle: 'signin page' }
    });
})

.controller('signinCtrl', function ($scope, $location, $http) {
    $scope.current.signin = $scope.current.signin || {};

    $scope.signin = function () {
        $scope.showMessage = false;
        $scope.signinBean = $scope.signinBean || {};
        var reqObj = {
            "huntKey":'21064420479178717f375958f7cb3aba6',
            "email": $scope.current.signin.userid,
            "password": $scope.current.signin.password
        };
        var jdata = "email=" + $scope.current.signin.userid + "&password=" + $scope.current.signin.password;
        
        $.ajax({
            url: 'https://josephsapi.herokuapp.com/api/v1/auth',
            type: 'POST',
            data: reqObj,
            contentType: 'application/x-www-form-urlencoded',
            success: function (response) {
                alert(response.status);
            },
            error: function (res) {
                alert("error");
                alert(res);
            }
        });

    };
    $scope.back = function () {
        $location.path("/main/menu");
    };
});