import "reflect-metadata";
import { mockCreateUserDb, userToCreateDb } from "../factories/users.factories";
import { generateToken } from "../helpers/utils";
import { Auth } from "@/modules/Auth/entities/Auth";
import {
  signinService,
  authRepository,
} from "../factories/signinService.factories";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import loadEnvs from "@/helpers/env";
import { ConflictError } from "@/helpers/errors/apiErrors";

loadEnvs();

describe("Execute function", () => {
  it("Should generate and return token", async () => {
    const userDb = mockCreateUserDb();
    const data = new Auth(userToCreateDb.email, userToCreateDb.password);
    const token = generateToken(userDb);

    const spyFindUser = jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValue(userDb);
    const spyBcrypt = jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
    const spyGenToken = jest
      .spyOn(authRepository, "generateToken")
      .mockReturnValue(token);

    const result = await signinService.execute(data);

    expect(spyFindUser).toHaveBeenCalled();
    expect(spyBcrypt).toHaveBeenCalled();
    expect(spyGenToken).toHaveBeenCalled();
    expect(result).toBe(token);
  });

  it("Should return conflict erro if user not found", async () => {
    const data = new Auth(userToCreateDb.email, userToCreateDb.password);

    const spyFindUser = jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValue(null);

    expect(spyFindUser).toHaveBeenCalled();
    await expect(signinService.execute(data)).rejects.toEqual(
      new ConflictError("Email or password invalid")
    );
  });

  it("Should return conflict erro if compare password hash is false", async () => {
    const userDb = mockCreateUserDb();
    const data = new Auth(userToCreateDb.email, userToCreateDb.password);

    const spyFindUser = jest
      .spyOn(authRepository, "findUserByEmail")
      .mockResolvedValue(userDb);
    const spyBcrypt = jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

    expect(spyFindUser).toHaveBeenCalled();
    expect(spyBcrypt).toHaveBeenCalled();
    await expect(signinService.execute(data)).rejects.toEqual(
      new ConflictError("Email or password invalid")
    );
  });
});
