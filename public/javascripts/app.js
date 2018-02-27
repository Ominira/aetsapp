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

app.run(function($log){
    $log.log("I am live");
});
