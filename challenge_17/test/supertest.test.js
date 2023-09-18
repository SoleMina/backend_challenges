import chai from "chai";
import supertest from "supertest";
import Assert from "assert";
import { connect } from "mongoose";
import config from "../src/config/configuration.js";

connect(config.mongo_url);
const expect = chai.expect;
const requester = supertest("http://localhost:8080");
const assert = Assert.strict;

describe("Testing API", () => {
  describe("Testing users", () => {
    it("El dao puede obtener a un usuario por email", async function () {
      let mockeruser = {
        name: "Carla Balabarca",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU",
        email: "carla@gmail.com",
        age: 21,
        password: "admin1234",
        role: "admin",
      };
      const result = await requester.post("/api/users").send(mockeruser);
      console.log(result);
      const user = await requester.get(`/api/users/${result._id}`);
      console.log(user);
      assert.strictEqual(typeof user, "object");
    });
  });
});
