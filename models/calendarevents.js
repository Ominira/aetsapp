(function() {

    'use strict';

    module.exports = (sequelize, DataTypes) => {
        const CalendarEvents = sequelize.define('CalendarEvents', {
            eventId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'events_id'
            },
            eventDescription: {
                type: DataTypes.STRING(500),
                field: 'event_desc'
            },
            eventStartDate: {
                type: DataTypes.DATEONLY,
                field: 'event_start_date',
                defaultValue: sequelize.NOW
            },
            eventEndDate: {
                type: DataTypes.DATEONLY,
                field: 'event_end_date',
                defaultValue: sequelize.NOW
            },
            eventSemester: {
                type: DataTypes.CHAR(11),
                field: 'event_semester',
                references: {
                    model: 'semester',
                    field: 'semester_id'
                }
            }
        }, {
            tableName: 'calendar_events',
            paranoid: false
        });

        CalendarEvents.associate = function(models) {
            models.CalendarEvents.belongsTo(models.Semester, {
                foreignKey: 'eventSemester',
                targetKey: 'semesterId'
            });
        };

        CalendarEvents.sync();

        return CalendarEvents;
    };
})();