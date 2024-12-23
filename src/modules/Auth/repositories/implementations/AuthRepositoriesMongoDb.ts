import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import { ObjectId } from "mongodb";
import { IAuthRepositories } from "../IAuthRepositories";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IParamsGithubToken } from "../../interfaces/IParamsGitHubToken";
import axios from "axios";
import { IUserGihtub } from "../../interfaces/IUserGithub";
import { UserRepositoriesMongoDb } from "@/modules/Users/repositories/implementations/UserRepositoriesMongoDb";
import { CreateService } from "@/modules/Users/useCases/create/createService";

export class AuthRepositoriesMongoDb implements IAuthRepositories {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({ email });
    return user;
  }
  generateToken(userId: ObjectId): string {
    const secret = process.env.SECRET_JWT as string;
    return jwt.sign({ id: userId }, secret, { expiresIn: 86400 });
  }

  async getTokenByGithub(params: IParamsGithubToken): Promise<string> {
    const urlGithubAccessToken = process.env.GITHUB_ACCESS_TOKEN_URL as string;
    const { data } = await axios.post(urlGithubAccessToken, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parseData = Object.fromEntries(new URLSearchParams(data));
    const token = parseData.access_token as string;
    return token;
  }

  async findUserGitHub(token: string): Promise<IUserGihtub> {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createUserByGitHub(
    userGithub: IUserGihtub,
    userEmail: string
  ): Promise<User | null> {
    const usersRepository = new UserRepositoriesMongoDb();
    const createUsersService = new CreateService(usersRepository);

    const newUser: User = {
      name: userGithub.name,
      email: userEmail,
      password: String(userGithub.id),
      image: userGithub.avatar_url,
      addresses: [],
      favorite_products: [],
      admin: false,
      created_at: new Date(),
    };

    await createUsersService.execute(newUser);
    const user = await this.findUserByEmail(newUser.email);

    return user;
  }
}
