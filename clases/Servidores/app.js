import moment from "moment";
import Fechas from "./fechas.js";

let birthday = moment("02/12/1995").format("DD/MM/YYYY");
let fecha = new Fechas(birthday);

console.log("Mi getToday", fecha.getToday());
console.log("Mi getBirthday", fecha.getMyBirth());
console.log("Mi diffYears", fecha.diffYears());
console.log("Mi diffDays", fecha.diffDays());
console.log("Mi getDifference months", fecha.getDifference("months"));