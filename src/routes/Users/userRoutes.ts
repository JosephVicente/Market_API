import { Router } from "express";
import authMiddleware from "@/middlewares/authMiddleware";
import paginationMiddleware from "@/middlewares/paginationMiddleware";
import addAddressController from "@/modules/Users/useCases/addAddress/addAddressController";
import addFavoriteProductController from "@/modules/Users/useCases/addFavoriteProduct/addFavoriteProductController";
import createController from "@/modules/Users/useCases/create/createController";
import deleteController from "@/modules/Users/useCases/delete/deleteController";
import findByIdController from "@/modules/Users/useCases/finById/findByIdController";
import findAllController from "@/modules/Users/useCases/findAll/findAllController";
import removeAddressController from "@/modules/Users/useCases/removeAddress/removeAddressController";
import removeFavoriteProductController from "@/modules/Users/useCases/removeFavoriteProduct/removeFavoriteProductController";
import updateController from "@/modules/Users/useCases/update/updateController";

import validateSchemma from "@/middlewares/schemaValidationMiddleware";
import { UserSchemaJoi } from "@/modules/Users/schemas/joi/UserSchemaJoi";
import { AddressSchemaJoi } from "@/modules/Users/schemas/joi/AddressSchemaJoi";
import updateAvatarController from "@/modules/Users/useCases/updateAvatar/updateAvatarController";

//import multer from "multer";
//import uploadConfig from "@/helpers/upload";
import findAvatarUserController from "@/modules/Users/useCases/findAvatarUser/findAvatarUserController";

const userRoutes = Router();
//const uploadAvatar = multer(uploadConfig.upload("./uploads/avatar"));

userRoutes.post(
  "/",
  validateSchemma.execute(UserSchemaJoi),
  createController.handle
);
userRoutes.use(authMiddleware.execute);
userRoutes.get("/", paginationMiddleware.execute, findAllController.handle);
userRoutes.get("/:id", findByIdController.handle);
userRoutes.patch("/", updateController.handle);
userRoutes.delete("/", deleteController.handle);

userRoutes.post(
  "/add-address",
  validateSchemma.execute(AddressSchemaJoi),
  addAddressController.handle
);
userRoutes.delete("/remove-address/:idAddress", removeAddressController.handle);
userRoutes.post(
  "/add-favorite-product/:productId",
  addFavoriteProductController.handle
);
userRoutes.delete(
  "/remove-favorite-product/:productId",
  removeFavoriteProductController.handle
);
userRoutes.patch(
  "/avatar",
  //uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

userRoutes.get("/avatar/:id", findAvatarUserController.handle);

export default userRoutes;
