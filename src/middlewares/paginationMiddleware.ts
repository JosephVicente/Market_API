import { NextFunction, Request, Response } from "express";

class PaginationMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    let { limit, offset } = req.query;
    limit ? Number(limit) : 10;
    offset ? Number(offset) : 0;

    res.locals.pagination = { limit, offset };

    return next();
  }
}
export default new PaginationMiddleware();
