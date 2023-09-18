import mongoose from "mongoose";
import chai from "chai";
import createHash from "../src/middlewares/createHash";
import isValidPassword from "../src/middlewares/isValidPassword";
import User from "../src/dao/Mongo/users.mongo.js";

const expect = chai.expect;

describe("Testing de bcrypt", () => {
  it("El servicio debe devolver un haseo efectivo del password", async () => {
    const password = "123456";
    const hasedPassword = await createHash(password);
    console.log(hasedPassword, password);

    expect(hasedPassword).to.not.equal(password);
  });
  it("El servicio debe devolver un haseo efectivo del password", async () => {
    const password = "123456";
    const hasedPassword = await createHash(password);

    const userDbMock = { password: hasedPassword };
    const isValid = await isValidPassword(userDbMock, password);
    expect(isValid).to.be.true;
  });
});
describe("Testing de DAO", () => {
  it("El servicio debe devolver un haseo efectivo del password");
});
