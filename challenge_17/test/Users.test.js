import { connect } from "mongoose";
import Assert from "assert";
import config from "../src/config/configuration.js";
import User from "../src/dao/Mongo/users.mongo.js";

connect(config.mongo_url);

const assert = Assert.strict;

describe("Testing User Dao", () => {
  before(function () {
    this.userDao = new User();
  });
  beforeEach(function () {
    this.timeout(3000);
  });
  it("El DAO debe traer todos los usuarios en forma arreglo", async function () {
    const result = await this.userDao.getUsers();
    console.log(result);
    assert.strictEqual(Array.isArray(result), true);
  });
  //   it("El dao debe agregar un usuario", async function () {
  //     let mockeruser = {
  //       name: "Soledad Prado",
  //       photo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU",
  //       email: "soledad2023@gmail.com",
  //       age: 21,
  //       password: "admin1234",
  //       role: "admin",
  //     };
  //     const result = await this.userDao.registerUser(mockeruser);
  //     console.log(result);
  //     assert.ok(result._id);
  //   });
  //   it("El dao debe agregar al documento insertado un arreglo de productos vacío que lo hace por defecto", async function () {
  //     let mockeruser = {
  //       name: "Soledad Prado",
  //       photo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU",
  //       email: "soledad2023@gmail.com",
  //       age: 21,
  //       password: "admin1234",
  //       role: "admin",
  //     };
  //     const result = await this.userDao.registerUser(mockeruser);
  //     console.log(result);
  //     assert.strictEqual(result.products, []);
  //   });
  it("El dao puede obtener a un usuario por email", async function () {
    let mockeruser = {
      name: "Esther Balabarca",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU",
      email: "esther@gmail.com",
      age: 21,
      password: "admin1234",
      role: "admin",
    };
    const result = await this.userDao.registerUser(mockeruser);
    console.log(result);
    const user = await this.userDao.getUser(result._id);
    console.log(user);
    assert.strictEqual(typeof user, "object");
  });
});
