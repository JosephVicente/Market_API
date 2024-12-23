import { Router } from "express";
import authMiddleware from "@/middlewares/authMiddleware";
import validateSchemma from "@/middlewares/schemaValidationMiddleware";

import createCategoryController from "@/modules/Categories/useCases/createCategory/createCategoryController";
import findByIdCategoryController from "@/modules/Categories/useCases/findByIdCategory/findByIdCategoryController";
import paginationMiddleware from "@/middlewares/paginationMiddleware";
import findAllCategoriesController from "@/modules/Categories/useCases/findAllCategory/findAllCategoriesController";
import updateCategoryController from "@/modules/Categories/useCases/updateCategory/updateCategoryController";
import removeCategoryController from "@/modules/Categories/useCases/removeCategory/removeCategoryController";
import { categorySchemmaJoi } from "@/modules/Categories/schemas/CategorySchemaJoi";

const categoryRouter = Router();

categoryRouter.use(authMiddleware.execute);
categoryRouter.post(
  "/",
  validateSchemma.execute(categorySchemmaJoi),
  createCategoryController.handle
);
categoryRouter.get(
  "/",
  paginationMiddleware.execute,
  findAllCategoriesController.handle
);
categoryRouter.get("/:id", findByIdCategoryController.handle);
categoryRouter.put(
  "/:id",
  validateSchemma.execute(categorySchemmaJoi),
  updateCategoryController.handle
);
categoryRouter.delete("/:id", removeCategoryController.handle);

export default categoryRouter;
