import * as moment from "moment";
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

export class Util {

    static dateTimeFormated(date: Date): string {
        if (date)
            return moment(date).format("DD/MM/YYYY HH:mm:ss");
    }

    static dateFormated(date: Date): string {
        if (date)
            return moment(date).format("DD/MM/YYYY");
    }

    static timeFormated(date: Date): string {
        if (date)
            return moment(date).format("HH:mm:ss");
    }

    static formatDurarion(minutes: number) {
        let string: string = "";

        if (minutes) {
            string = moment.duration(minutes, "minutes")["format"]("d [days], h [hrs], m [mins], s [secs]");
        }
        return string;
    }

    static getDuration(init: Date, end: Date): number {
        let diff: number = 0;

        if (init && end) {
            diff = moment(end).diff(moment(init), 'minutes', true);
        }

        return diff;
    }

    static timeEgo(init: Date, end: Date): string {

        let string: string = "";

        if (init && end) {
            let duration: number = this.getDuration(init, end);
            string = moment.duration(duration, "minutes")["format"]("d [days], h [hrs], m [mins], s [secs]");
        }
        return string;
    }


    static capitalizeFirstLetter(string: string) {
        if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    }
}