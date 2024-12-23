import { ObjectId } from "mongodb";
import { inject, injectable } from "tsyringe";
import { IParamsGithubToken } from "../../interfaces/IParamsGitHubToken";
import { IAuthRepositories } from "../../repositories/IAuthRepositories";

@injectable()
export class SigninGithubService {
  constructor(
    @inject("AuthRepositories")
    private authRepositories: IAuthRepositories
  ) {}

  async execute(code: string): Promise<string> {
    const params: IParamsGithubToken = {
      client_id: process.env.CLIENT_ID as string,
      redirect_uri: process.env.REDIRECT_URI as string,
      client_secret: process.env.CLIENT_SECRET as string,
      code: code,
      grant_type: "authorization_code",
    };

    const githubToken = await this.authRepositories.getTokenByGithub(params);
    const userGithub = await this.authRepositories.findUserGitHub(githubToken);

    const userEmail = userGithub.email ?? `${userGithub.login}@github.com`;
    const userDb = await this.authRepositories.findUserByEmail(userEmail);

    let userId = userDb?._id ?? new ObjectId();

    if (!userDb) {
      const newUser = await this.authRepositories.createUserByGitHub(
        userGithub,
        userEmail
      );

      userId = newUser?._id as ObjectId;
    }

    const token = this.authRepositories.generateToken(userId);

    return token;
  }
}
