import chai from "chai";
import mongoose, { connect } from "mongoose";
import config from "../src/config/configuration.js";
import User from "../src/dao/Mongo/users.mongo.js";

const expect = chai.expect;

connect(config.mongo_url);

describe("Testing Users Dao", () => {
  before(function () {
    this.usersDao = new User();
  });
  beforeEach(function () {
    mongoose.connection.collections.users.drop();
    this.timeout(3000);
  });
  it("El DAO debe traer todos los usuarios en forma arreglo", async function () {
    const result = await this.userDao.getUsers();
    console.log(result);
    // expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result).to.be.equals(true));
    // assert.strictEqual(Array.isArray(result)).to.be.ok;
  });
});
