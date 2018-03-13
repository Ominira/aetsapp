'use strict';

angular.module('aetsApp')
    .factory('alertService', function() {
        var alerts = [];
        // Define all mutable functions
        return {
            alerts: alerts,
            add: function(type, msg) {
                alerts.push({
                    type: type,
                    msg: msg
                });
            },
            // Returns to item that was removed
            remove: function(index) {
                return alerts.splice(index, 1)[0];
            },
            clear: function() {
                alerts.splice(0);
            }
        }
    });