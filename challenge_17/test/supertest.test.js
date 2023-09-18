import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing API", () => {
  describe("Testing products", () => {
    it("El endpoint POST /api/products debe crear un producto", async () => {
      const productMock = {
        title: "Laptop Lenovo Black",
        description: "Product with high quality",
        price: 2800,
        thumbnail: "",
        code: "B001",
        stock: 20,
      };
      //const resp = await requester.post("/api/products").send(productMock);
      console.log(resp);
      const { ok, statusCode, _body } = await requester
        .post("/api/products")
        .send(productMock);
      expect(_body.payload).to.have.property("_id");
      expect(_body).to.have.property("status", "success");
      expect(_body.payload.adopted).to.equal(false);
      expect(ok).to.equal("true");
    });
    it("El método GET /api/products debe obtener un array de mascotas correctamente", async () => {
      const { ok, statusCode, _body } = await requester.get("/api/products");
      console.log(_body);
      expect(ok).to.be.equal(true);
    });
  });
  describe("Test avanzado de Session", () => {
    let cookie;
    it("El servicio debe registrar correctamente al usuario", async () => {
      const userMock = {
        name: "Sandra Perez",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU",
        email: "sandra2023@gmail.com",
        age: 21,
        password: "admin1234",
        role: "admin",
      };
      const { _body } = await requester
        .post("/api/sessions/register")
        .send(userMock);
      expect(_body.payload).to.be.ok;
    });
    it("Debe loguear correctamente al usuario y devolver una cookie", async () => {
      const userMock = {
        email: "sandra2023@gmail.com",
        password: "admin1234",
      };
      const result = (await requester.post("/api/sessions/login")).send(
        userMock
      );
      const cookieResult = result.headers["set-cookie"][0];
      console.log(result);
      console.log("cookieResult", cookieResult);
      expect(cookieResult).to.be.ok;
      let cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      };
      expect(cookie.name).to.be.ok.and.eql("coderCookie");
      expect(cookie.value).to.be.ok;
    });
    it("Debe enviar la cookie que contiene el usuario y destructurar a este correctamente", async () => {
      const { _body } = (await requester.get("/api/sessions/current")).send(
        "Cookie",
        [`${cookie.name}=${cookie.value}`]
      );
      expect(_body.payload.email).to.be.eql("sandra2023@gmail.com");
    });
  });
  describe("Test de upload", () => {
    it("El servicio debe crear una mascota con la ruta de la imagen", async () => {
      const productMock = {
        title: "Laptop Lenovo Black",
        description: "Product with high quality",
        price: 2800,
        thumbnail: "",
        code: "B001",
        stock: 20,
      };
      const result = await requester
        .post("/api/products")
        .field("name", productMock.name)
        .field("description", productMock.description)
        .field("price", productMock.price)
        .field("thumbnail", productMock.thumbnail)
        .field("code", productMock.code)
        .field("stock", productMock.stock);
      //.attach("image", "./test/macbook.jpg")
      console.log(result);
      expect(result.statusCode).to.be.eql(200);
      expect(result._body.payload).to.be.have.property("_id");
      expect(result._body.payload.image).to.be.be.ok;
    });
  });
});
