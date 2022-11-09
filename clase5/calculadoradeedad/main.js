const moment = require("moment");

const hoy = moment();

const nacimiento = moment("21 / 03 / 1999", "DD/MM/YYYY")

const diferenciaAnios = hoy.diff(nacimiento, "years")
const diferenciasDias = hoy.diff(nacimiento, "days")

console.log(`Hoy es ${hoy.format("DD / MM / YYYY")}`);
console.log(`Naci el ${nacimiento.format("DD / MM / YYYY")}`);
console.log(`Desde mi nacimiento han pasado ${diferenciaAnios} anios`);
console.log(`Desde mi nacimiento han pasado ${diferenciasDias} dias`);