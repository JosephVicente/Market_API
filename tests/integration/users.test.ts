import supertest from "supertest";
import app, { init, close } from "../../src/app";
import {
  addFavProductUserDb,
  createPathAndImage,
  createProductDb,
  createUserAddressDb,
  createUserDb,
  deleteUserDb,
  findByIdUser,
  newAddress,
  newInvalidAddressSchema,
  newInvalidToken,
  newInvalidUserSchema,
  newRandomObjectId,
  newUser,
  newUserWithoutPassword,
} from "../factories/users.factories";
import { cleanDatabase, generateToken } from "../helpers/utils";

const supertestServer = supertest(app);

beforeAll(async () => {
  await init();
}, 100_000);

afterAll(async () => {
  await close();
});

beforeEach(async () => {
  await cleanDatabase();
}, 100_000);

describe("POST /users", () => {
  it("Should create one user and return status 201", async () => {
    const user = newUser();
    const result = await supertestServer.post("/users").send(user);
    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 409 if user email exists", async () => {
    const user = createUserDb();
    const result = await supertestServer.post("/users").send(user);
    expect(result.statusCode).toBe(409);
  });

  it("Should return status code 409 if user schema incorrect", async () => {
    const user = newInvalidUserSchema();
    const result = await supertestServer.post("/users").send(user);

    expect(result.statusCode).toBe(409);
  });
});

describe("GET /users", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.get("/users");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should find all users and return status code 200 and Array", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const result = await supertestServer
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("GET /users/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.get("/users/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users/1")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should find one users and return status code 200", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const result = await supertestServer
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      _id: expect.any(String),
      name: user.name,
      email: user.email,
      image: user.image,
      admin: user.admin,
      addresses: expect.any(Array),
      favorite_products: expect.any(Array),
      created_at: expect.any(String),
    });
  });

  it("Should return status code 404 if not found user", async () => {
    const fakeObjectId = newRandomObjectId();
    const user = await createUserDb();
    const token = generateToken(user);

    const result = await supertestServer
      .get(`/users/${fakeObjectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
  });
});

describe("PATCH /users", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.patch("/users");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .patch("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .patch("/users")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should update one user without password and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const body = newUserWithoutPassword();
    const result = await supertestServer
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(result.statusCode).toBe(204);
  });

  it("Should update one user with password and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const body = newUser();
    const result = await supertestServer
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await deleteUserDb(user);
    const result = await supertestServer
      .patch("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
  });
});

describe("DELETE /users", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.delete("/users");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should delete one user and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);

    const result = await supertestServer
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await deleteUserDb(user);
    const result = await supertestServer
      .delete("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
  });
});

describe("POST /users/add-address", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.post("/users/add-address");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .post("/users/add-address")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .post("/users/add-address")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should add address and return status code 201", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const address = newAddress();

    const result = await supertestServer
      .post("/users/add-address")
      .set("Authorization", `Bearer ${token}`)
      .send(address);

    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await deleteUserDb(user);
    const result = await supertestServer
      .post("/users/add-address")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
  });

  it("Should return status code 409 if address schema is invalid", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const address = newInvalidAddressSchema();

    const result = await supertestServer
      .post("/users/add-address")
      .set("Authorization", `Bearer ${token}`)
      .send(address);

    expect(result.statusCode).toBe(409);
  });
});

describe("DELETE /users/remove-address/:idAddress", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.delete("/users/remove-address/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users/remove-address/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users/remove-address/1")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should remove address and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await createUserAddressDb(user);
    const userWithAddress = await findByIdUser(user);
    const idAddress = userWithAddress?.addresses[0]._id;

    const result = await supertestServer
      .delete(`/users/remove-address/${idAddress}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await createUserAddressDb(user);
    const userWithAddress = await findByIdUser(user);
    const idAddress = userWithAddress?.addresses[0]._id;
    await deleteUserDb(user);

    const result = await supertestServer
      .delete(`/users/remove-address/${idAddress}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found");
  });

  it("Should return status code 404 if not found address", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const fakeId = newRandomObjectId();

    const result = await supertestServer
      .delete(`/users/remove-address/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Address not found");
  });
});

describe("POST /users/add-favorite-product/:productId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.post("/users/add-favorite-product/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .post("/users/add-favorite-product/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .post("/users/add-favorite-product/1")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should add favorite product and return status code 201", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const { _id } = await createProductDb();

    const result = await supertestServer
      .post(`/users/add-favorite-product/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(201);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const { _id } = await createProductDb();
    await deleteUserDb(user);

    const result = await supertestServer
      .post(`/users/add-favorite-product/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
  });
});

describe("DELETE /users/remove-favorite-product/:productId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.delete(
      "/users/remove-favorite-product/1"
    );
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users/remove-favorite-product/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .delete("/users/remove-favorite-product/1")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should remove address and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const product = await createProductDb();
    await addFavProductUserDb(user, product);

    const result = await supertestServer
      .delete(`/users/remove-favorite-product/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const product = await createProductDb();
    await deleteUserDb(user);

    const result = await supertestServer
      .delete(`/users/remove-favorite-product/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found");
  });

  it("Should return status code 404 if not found product", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const fakeId = newRandomObjectId();

    const result = await supertestServer
      .delete(`/users/remove-favorite-product/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Product not found");
  });
});

describe("GET /users/avatar/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.get("/users/avatar/1");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users/avatar/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .get("/users/avatar/1")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should find avatar by user id and return status code 200", async () => {
    const user = await createUserDb();
    const token = generateToken(user);

    const result = await supertestServer
      .get(`/users/avatar/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await deleteUserDb(user);

    const result = await supertestServer
      .get(`/users/avatar/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found");
  });
});

describe("PATCH /users/avatar/", () => {
  it("should respond with status 401 if no token is given", async () => {
    const result = await supertestServer.patch("/users/avatar");
    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid with Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .patch("/users/avatar")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("should respond with status 401 if given token is invalid without Bearer", async () => {
    const token = newInvalidToken();
    const result = await supertestServer
      .patch("/users/avatar")
      .set("Authorization", `${token}`);

    expect(result.statusCode).toBe(401);
  });

  it("Should update user avatar and return status code 204", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    const filePath = createPathAndImage();

    const result = await supertestServer
      .patch("/users/avatar")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", filePath);

    expect(result.statusCode).toBe(204);
  });

  it("Should return status code 404 if not found user", async () => {
    const user = await createUserDb();
    const token = generateToken(user);
    await deleteUserDb(user);

    const result = await supertestServer
      .patch("/users/avatar")
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("User not found");
  });
});
