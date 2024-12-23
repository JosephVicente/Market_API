import { User } from "modules/Users/entities/User";
import { ObjectId } from "mongodb";
import { IParamsGithubToken } from "../interfaces/IParamsGitHubToken";
import { IUserGihtub } from "../interfaces/IUserGithub";

export interface IAuthRepositories {
  findUserByEmail(email: string): Promise<User | null>;
  generateToken(userId: ObjectId): string;
  getTokenByGithub(params: IParamsGithubToken): Promise<string>;
  findUserGitHub(token: string): Promise<IUserGihtub>;
  createUserByGitHub(userGithub: IUserGihtub, userEmail: string): Promise<User | null>
}
