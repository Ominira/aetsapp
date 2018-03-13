'use strict';

var app = angular.module('aetsApp',[
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ui.bootstrap',
    'toaster',
    'ngMaterial'
]);

app.run(function($log, $rootScope, alertService){
    if (!_.isEmpty(alertService.alerts)){
        alertService.clear();
    }
    $rootScope.navOpen = false;
});
