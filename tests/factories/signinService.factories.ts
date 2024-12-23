import { AuthRepositoriesMongoDb } from "@/modules/Auth/repositories/implementations/AuthRepositoriesMongoDb";
import { SigninService } from "@/modules/Auth/useCases/signin/signinService";

export const authRepository = new AuthRepositoriesMongoDb();
export const signinService = new SigninService(authRepository);
