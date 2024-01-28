"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = require("../controllers/admin/auth.controller");
const general_controller_1 = require("../controllers/admin/general.controller");
const auth_1 = require("../middlewares/auth");
const body_1 = require("../middlewares/body");
const validate_1 = require("../middlewares/validate");
const admin_validation_1 = require("../validations/admin.validation");
const auth_2 = require("../validations/auth");
const order_validation_1 = require("../validations/order.validation");
const order_controller_1 = require("../controllers/admin/order.controller");
const router = express_1.default.Router({ mergeParams: true });
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router
    .route('/auth/login')
    .post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.adminLoginSchema), auth_controller_1.adminLoginApi);
router.route('/auth/me').get(auth_1.checkApiKey, auth_1.checkAdminToken, auth_controller_1.adminMeApi);
// Worker Routes
router
    .route('/worker/create')
    .post(auth_1.checkApiKey, auth_1.checkAdminToken, upload.fields([{ name: 'profile' }, { name: 'aadhaar' }]), body_1.convertStringPropertiesToIntegerMiddleware, (0, validate_1.validate)(admin_validation_1.createWorkerSchema), general_controller_1.createWorkerAdmin);
router
    .route('/worker/update/:workerId')
    .put(auth_1.checkApiKey, auth_1.checkAdminToken, upload.fields([{ name: 'profile' }, { name: 'aadhaar' }]), body_1.convertStringPropertiesToIntegerMiddleware, (0, validate_1.validate)(admin_validation_1.updateWorkerSchema), general_controller_1.updateWorkerAdmin);
router
    .route('/worker/all')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findWorkersForAdmin);
router
    .route('/worker/:phoneNumber')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findWorkerForAdmin);
// Customer Routes
router
    .route('/customer/create')
    .post(auth_1.checkApiKey, auth_1.checkAdminToken, upload.fields([{ name: 'profile' }]), body_1.convertStringPropertiesToIntegerMiddleware, (0, validate_1.validate)(admin_validation_1.createCustomerSchema), general_controller_1.createCustomerAdmin);
router
    .route('/customer/update/:customerId')
    .put(auth_1.checkApiKey, auth_1.checkAdminToken, upload.fields([{ name: 'profile' }]), body_1.convertStringPropertiesToIntegerMiddleware, (0, validate_1.validate)(admin_validation_1.updateCustomerSchema), general_controller_1.updateCustomerAdmin);
router
    .route('/customer/all')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findCustomersForAdmin);
router
    .route('/customer/:customerId')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findCustomerForAdmin);
// Order Routes
router
    .route('/order/create')
    .post(auth_1.checkApiKey, auth_1.checkAdminToken, (0, validate_1.validate)(order_validation_1.createOrderSchema), order_controller_1.createOrderAdmin);
router
    .route('/order/update/:customerId')
    .put(auth_1.checkApiKey, auth_1.checkAdminToken, body_1.convertStringPropertiesToIntegerMiddleware, (0, validate_1.validate)(admin_validation_1.updateCustomerSchema), general_controller_1.updateCustomerAdmin);
router
    .route('/order/all')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findCustomersForAdmin);
router
    .route('/order/:customerId')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findCustomerForAdmin);
exports.default = router;
