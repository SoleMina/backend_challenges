import moment from "moment";

class Fechas {
    constructor(birthday) {
        this.birthday = birthday;
        this.today = moment();
    }
    getToday() {
        return this.today.format("DD/MM/YYYY");
    }
    getMyBirth() {
        return this.birthday;
    }
    diffYears(){
        return this.today.diff(this.cumple, "years", true);
    }
    diffDays(){
        return this.today.diff(this.cumple, "days", true);
    }
    getDifference(time) {
        return this.today.diff(this.birthday, time, true);
    }
}
export default Fechas;