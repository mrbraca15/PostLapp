"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.dateTimeFormated = function (date) {
        if (date)
            return moment(date).format("DD/MM/YYYY HH:mm:ss");
    };
    Util.dateFormated = function (date) {
        if (date)
            return moment(date).format("DD/MM/YYYY");
    };
    Util.timeFormated = function (date) {
        if (date)
            return moment(date).format("HH:mm:ss");
    };
    Util.formatDurarion = function (minutes) {
        var string = "";
        if (minutes) {
            string = moment.duration(minutes, "minutes")["format"]("d [days], h [hrs], m [mins], s [secs]");
        }
        return string;
    };
    Util.getDuration = function (init, end) {
        var diff = 0;
        if (init && end) {
            diff = moment(end).diff(moment(init), 'minutes', true);
        }
        return diff;
    };
    Util.timeEgo = function (init, end) {
        var string = "";
        if (init && end) {
            var duration = this.getDuration(init, end);
            string = moment.duration(duration, "minutes")["format"]("d [days], h [hrs], m [mins], s [secs]");
        }
        return string;
    };
    Util.capitalizeFirstLetter = function (string) {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return Util;
}());
exports.Util = Util;
