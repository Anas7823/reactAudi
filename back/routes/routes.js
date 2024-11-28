const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getAllUsers, registerUser, loginUser, updateUser, deleteUser, getUserById} = require("../controllers/userController");
const {getAllProducts, getProductById,  newProduct, updateProduct, deleteProduit, getSearchProduct} = require("../controllers/productController");

router.get("/users", getAllUsers);
router.get("/user/me", authMiddleware, getUserById);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/:id", authMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, deleteUser);

router.get("/products",  getAllProducts);
router.get("/product/:id",  getProductById);
router.get("/product/search/:search",  getSearchProduct);
router.post("/product/new",  newProduct);
router.put("/product/:id",  updateProduct);
router.delete("/product/:id",  deleteProduit);

module.exports = router;
