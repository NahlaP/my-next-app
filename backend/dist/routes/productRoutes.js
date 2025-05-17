"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const upload_1 = require("../utils/upload");
const router = express_1.default.Router();
router.post('/', upload_1.upload.array('images', 5), productController_1.createProduct);
router.get('/', productController_1.getProducts);
router.get('/slug/:slug', productController_1.getProductBySlug);
router.get('/:id', productController_1.getProductById);
router.put('/:id', upload_1.upload.array('images', 5), productController_1.updateProduct);
router.delete('/:id', productController_1.deleteProduct);
exports.default = router;
