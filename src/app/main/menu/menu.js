angular.module('ngOgsnApps.menu', [
    'ui.router'])

.config(function config($stateProvider) {
    $stateProvider

    .state('menu', {
        url: '/main/menu',
        views: {
            "main": {
                controller: 'menuCtrl',
                templateUrl: 'main/menu/menu.tpl.html'
            }
        },
        data: { pageTitle: 'menu page' }
    });
})

.controller('menuCtrl', function ($scope, $location, $http) {
    $scope.signin = function () {
        $location.path("/main/signin");
    };
    $scope.signup = function () {
        $location.path("/main/signup");
    };
    
});