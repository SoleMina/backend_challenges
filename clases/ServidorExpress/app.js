const Manager = require("./class/Manager");

// const managerProject = async () => {
//     const manager = new Manager();
//     await manager.createEvent({title: 'Concierto', location: 'El campo', price: 1250, capacity: 5})
//     .then(result => console.log(result.message));
//     await manager.createEvent({title: 'Show Infantil', location: 'Colegio', price: 150, capacity: 20})
//     .then(result => console.log(result.message));
// }
// managerProject();



// (async () => {
//     const manager = new Manager();
//     await manager.createEvent({title: 'Concierto', location: 'El campo', price: 1250, capacity: 5})
//     .then(result => console.log(result.message));
//     await manager.createEvent({title: 'Show Infantil', location: 'Colegio', price: 150, capacity: 20})
//     .then(result => console.log(result.message));
// })();

const manager = new Manager();
// manager.createEvent({title: 'Concierto', location: 'El campo', price: 1250, capacity: 5})
//   .then(result => {
//     console.log(result.message);
//   })
manager.getById("H1477IT").then(result => console.log(result.event));
