angular.module('ngOgsnApps', [
'templates-app',
'templates-common',

//login

'ngOgsnApps.login',
'ngOgsnApps.signin',
'ngOgsnApps.signup',

'ngOgsnApps.menu',
  // translation
  'pascalprecht.translate',
  //testing
  
  'ngCookies',
  'ui.bootstrap',
  
  'ui.router',
 
  'ui.tinymce'
])
.config(function ngOgsnAppsConfig($stateProvider, $urlRouterProvider, $translateProvider, $logProvider) {
    $logProvider.debugEnabled(true);
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/main/login');
   
})
.controller('HeaderCtrl', function ($scope, $location) {
    $scope.location = $location;
  
    $scope.goto = function (location) {
        $location.path("/main" + location);
    };
})
.constant('supplementalApiUri', 'https://josephsapi.herokuapp.com/api/v1')
.controller('AppCtrl', function AppCtrl($rootScope, $log, $cookies, $window, $scope, $location, $translate) {
   
    $rootScope.current = {};
    $scope.loginpage = $scope.loginpage || {};
    $scope.loginpage = false;
   
    if($window.localStorage.getItem('current'))
    {
        if ($window.localStorage.getItem('current') === 'undefined') {
            $rootScope.current = {};
        } else {         
            $rootScope.current = JSON.parse($window.localStorage.getItem('current'));
        }
    }
    $rootScope.$watch('current', function (new_value, old_value) {
        if (new_value !== old_value) {
            $window.localStorage.setItem('current', JSON.stringify($rootScope.current));
        }
    }, true);
    $scope.logCurrent = function () {
        $log.debug($rootScope.current);
    };

   
    $scope.localStorage = function () {
        $log.debug(JSON.parse($window.localStorage.current));
    };
   
   
   
    $scope.$on('$stateChangeSuccess', function (event, toState, ToParams, fromState, fromParams) {
        if ($window.location.href.indexOf("login") > -1) {
            $scope.loginpage = false;
            //alert("login");
            $("#mainContainer").removeClass("col-lg-10 col-md-10 col-sm-10 col-xs-12");
            $("body").removeClass("public1");
            $("body").addClass("public");

            $("#mainContainer").addClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
            $scope.current.login = {};
        }
        else {
            // alert("nonlogin");
            $scope.loginpage = true;
            $("#mainContainer").removeClass("col-lg-10 col-md-10 col-sm-10 col-xs-12");
            $("body").removeClass("public");
            $("body").addClass("public1");

            $("#mainContainer").addClass("col-lg-10 col-md-10 col-sm-10 col-xs-12");
        }
        if ($scope.current.login !== undefined) {
            if ($scope.current.login.userid !== undefined && $scope.current.login.userid !== '') {
            }
            else {
                if ($location.path() !== '/main/login/recover' && $location.path() !== '/main/login/forgot-password' && $location.path() !== '/main/login/create-account') {
                    event.preventDefault();
                    $location.path('main/login');
                }
            }
        }
        else {
         
            if ($location.path() !== '/main/login/recover' && $location.path() !== '/main/login/reset' && $location.path() !== '/main/login/forgot-password' && $location.path() !== '/main/login/create-account') {
                event.preventDefault();
                $location.path('main/login');
            }
        }
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | josephs Backmain';
        }

        $scope.style = function () {
            $scope.menuheight = $("#mainContainer").height();
            return {
                'min-height': 700 + 'px',
                'height': 100 + parseInt($scope.menuheight, 10) + 'px'
            };
        };
    });
 

    $scope.clearLocalStorage = function () {
        $window.localStorage.clear();
        $scope = $rootScope = $window.localStorage = {};
        document.location = 'index.html';
        return false;
    };

    $scope.setBodyClass = function () {
        if ($location.path() === 'main/login') {
            return $window.localStorage.getItem('NG_TRANSLATE_LANG_KEY') + " login";
        } else {
            return $window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        }
    };

    $scope.gotolocation = function (location) {
        $location.path("/main/" + location);
    };

    $scope.loginCheck = function () {
        if ($location.path() === '/main/login' || $location.path() === '/main/login/recover' || $location.path() === '/main/login/reset' || $location.path() === '/main/login/forgot-password' || $location.path() === '/main/login/create-account') {
            $('#header').addClass('hide');
            $('#menu').addClass('hide');
            $('#mobile-menu').addClass('hide');
            $('#Togglebtn').addClass('hide');
            $('#Togglebtn').removeClass('hidden-xs');
            return "true";
        }
        else {
            $('#header').removeClass('hide');
            $('#menu').removeClass('hide');
            $('#menu').removeClass('hide');
            $('#Togglebtn').removeClass('hide');
            $('#Togglebtn').addClass('hidden-xs');
            return "false";
        }
    };

    $scope.logout = function (location) {
        $scope.current.login.userid = '';
        $scope.current.login.password = '';
        $scope.clearLocalStorage();
        $rootScope.current = {};
        $scope.gotolocation('/main/login');
    };
    
    
    $scope.ErrorModel = "";
});
