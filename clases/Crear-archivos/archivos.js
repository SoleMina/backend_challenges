const fs = require("fs");

class UserManager {

    constructor(path) {
        this.users = [];
        this.path = path;
    }

    async addUser(data) {
        let file = fs.existsSync(this.path);
        //El archivo no existe, entonces hay que crearlo
        if (!file) {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))
                .then(res => console.log(`File created ${res}`))
                .catch(err => console.log(`Can't create the file: ${err}`));
        } else {
            try {
                const info = await fs.promises.readFile(this.path, 'utf-8');
                console.log(info, 'info');
                data.id = 1;
                this.users = JSON.parse(info);
                this.users.push(data);
                console.log(this.users, 'this.user');

                try {
                    console.log("ingresó");
                    await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2))
                        .then(res => console.log(`User created ${res}`))
                        .catch(err => console.log(`Can't create user: ${err}`));

                    console.log(`File read: ${this.path}`);
                } catch (err) {
                    console.log(`Error writing file: ${err}`);
                }
            } catch (err) {
                console.log(`Error reading file: ${err}`);
            }
        }
    }
}

(async () => {
    try {
        let manager = new UserManager('./data/users.json');
        await manager.addUser({ name: 'Karina', lastname: 'Prado', age: 20, course: 'Nodejs' });
        console.log(manager);
        await manager.addUser({ name: 'Soledad', lastname: 'Gutierrez', age: 50, course: 'Nodejs' });
        console.log(manager);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();





// const fs = require("fs");

// class UserManager {

//     constructor(path) {
//         this.users = [];
//         this.path = path;
//     }

//     async addUser(data) {
//         try {
//             // Check if file exists
//             const fileExists = fs.existsSync(this.path);
            
//             // If file does not exist, create an empty file
//             if (!fileExists) {
//                 await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
//                 console.log(`File created: ${this.path}`);
//             }

//             // Read file contents
//             const info = await fs.promises.readFile(this.path, 'utf-8');
//             console.log(`File read: ${this.path}`);

//             // Parse existing users data
//             this.users = JSON.parse(info);

//             // Assign unique ID to new user
//             data.id = this.users.length + 1;

//             // Add new user to users array
//             this.users.push(data);

//             // Write updated users data to file
//             await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2));
//             console.log(`User created: ${JSON.stringify(data)}`);
//         } catch (err) {
//             console.log(`Error: ${err}`);
//         }
//     }
// }


// async function addUserWrapper(userData) {
//     let manager = new UserManager('./data/users.json');
//     await manager.add_user(userData);
//     console.log(manager);
// }


// addUserWrapper({ name: 'Karina', lastname: 'Prado', age: 20, course: 'Nodejs' });
// addUserWrapper({ name: 'Soledad', lastname: 'Gutierrez', age: 50, course: 'Nodejs' });

