import chai from "chai";
import { createHash, isValid } from "../src/utils/utils.js";

const expect = chai.expect;

describe("Testing de bcrypt", () => {
  it("El servicio debe devolver un haseo efectivo del password", async () => {
    const password = "123456";
    const hasedPassword = createHash(password);
    console.log(hasedPassword, password);

    expect(hasedPassword).to.not.equal(password);
  });
  it("El servicio debe devolver un haseo efectivo del password comparado", async () => {
    const password = "123456";
    const hasedPassword = createHash(password);
    const userMock = { password: hasedPassword };

    const isValidPassword = isValid(password, userMock.password);
    console.log(isValidPassword);
    expect(isValidPassword).to.be.true;
  });
});
describe("Testing de DAO", () => {
  it("El servicio debe devolver un haseo efectivo del password");
});
