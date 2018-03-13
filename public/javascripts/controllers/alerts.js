'use strict';

angular.module('aetsApp')
  .controller('AlertCtrl', function($scope, alertService) {
    $scope.alerts = alertService.alerts;
    $scope.closeAlert = alertService.remove;
});