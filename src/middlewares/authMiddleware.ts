import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { container } from "tsyringe";
import { FindByIdService } from "@/modules/Users/useCases/finById/findByIdService";
import { UnauthorizedError } from "@/helpers/errors/apiErrors";

interface ITokenPayload extends JwtPayload {
  id: string;
}

class AuthMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedError("Invalid token!");
    const secret = process.env.SECRET_JWT as string;

    const parts = authorization?.split(" ");
    if (!parts.length) throw new UnauthorizedError("Invalid token!");
    if (parts.length !== 2) throw new UnauthorizedError("Invalid token!");

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema))
      throw new UnauthorizedError("Invalid token!");

    jwt.verify(token, secret, async (err, decoded) => {
      try {
        if (err) throw new UnauthorizedError("Invalid token!");
        if (!decoded) throw new UnauthorizedError("Invalid token!");

        const { id } = decoded as ITokenPayload;
        const findByIdUserService = container.resolve(FindByIdService);
        const user = await findByIdUserService.execute(id);
        if (!user) throw new UnauthorizedError("Invalid token!");

        res.locals.user = user;

        return next();
      } catch (err: any) {
        return next(err);
      }
    });
  }
}

export default new AuthMiddleware();
