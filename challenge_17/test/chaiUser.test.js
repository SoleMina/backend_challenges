import mongoose, { connect } from "mongoose";
import Assert from "assert";
import chai from "chai";
import config from "../src/config/configuration.js";
import User from "../src/dao/Mongo/users.mongo.js";

const expect = chai.expect;
const assert = Assert.strict;

connect(config.mongo_url);

describe("Testing Users Dao", () => {
  before(function () {
    this.userDao = new User();
  });
  beforeEach(function () {
    //mongoose.connection.collections.users.drop();
    this.timeout(5000);
  });
  it("El DAO debe traer todos los usuarios en forma arreglo", async function () {
    const result = await this.userDao.getUsers();
    console.log(result);
    expect(Array.isArray(result)).to.be.true.to.be.ok;
    //assert.strictEqual(Array.isArray(result), true);
  });
});
