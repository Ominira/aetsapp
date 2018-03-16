'use strict';

angular.module('aetsApp')
    .controller('TimetableCtrl',['$scope','$log', 'alertService', 'toaster',
        function ($scope, $log, alertService, toaster) {
            $scope.dt = {
                startDate: new Date(),
                endDate: new Date(),
            }
            
            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };
            
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            
            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }
            
            $scope.openStartDate = function() {
                $scope.startDatePop.opened = true;
            };
            
            $scope.openEndDate = function() {
                $scope.endDatePop.opened = true;
            };
            
            
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            
            $scope.startDatePop = {
                opened: false
            };

            $scope.endDatePop = {
                opened: false
            };
            
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];
            
            function getDayClass(data) {
                var date = data.date,
                mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);
            
                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
            
                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }
            
                return '';
            }

            //TODO: allocate to proper variables
            $scope.mytime = new Date();

            $scope.hstep = 1;
            $scope.mstep = 15;
            $scope.ismeridian = true;

            $scope.calendarTimeSlots = [];
            $scope.generateTimeSlots = function () {
                var startDate = moment($scope.dt.startDate);
                var endDate = moment($scope.dt.endDate);

                if(startDate.isAfter(endDate)){
                    toaster.pop({
                        type: 'error',
                        title: 'Calendar Slot Error!',
                        body: 'Examination Calendar Start Date cannot be after Examination End Date!'
                    });
                    return;
                }

                var now = startDate.clone(), dates = [];

                while (now.isSameOrBefore(endDate)) {
                    dates.push({
                        calendar: now,
                        calendarDay: now.format('dddd'),
                        calendarDate: now.format('DD/MM/YYYY'),
                        calendarDatePretty: now.format('dddd Do of MMMM, YYYY'),
                        calendarMonth: now.format('MMMM'),
                        calendarMonthWeek: Math.ceil(now.date() / 7),
                        calendarWeekend: (_.includes(['Saturday','Sunday'],now.format('dddd'))),
                        timeSlots: []
                    });
                    now.add(1, 'days');
                }

                $log.log("Dates: ",dates);
                $scope.calendarTimeSlots = dates;
            }
        }
    ]);