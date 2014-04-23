angular.module('ngOgsnApps.login', [
  'ui.router',
  'pascalprecht.translate'

])

.config(function config($stateProvider) {
    $stateProvider
.state('login', {
    url: '/main/login',
    views: {
        "main": {
            controller: 'loginCtrl',
            templateUrl: 'main/login/login.tpl.html'
        }
    }, data: { pageTitle: 'Login' }
});
})

.controller('loginCtrl', function loginCtrl($scope, $location, $http, supplementalApiUri) {
    $scope.current.login = $scope.current.login || {};

    $scope.login = function () {
        if ($scope.current.login.userid === 'admin' && $scope.current.login.password === 'admin123') {
            $location.path("/main/menu");
        }
        else {
            alert('wrong username/password');
        }
    };
});