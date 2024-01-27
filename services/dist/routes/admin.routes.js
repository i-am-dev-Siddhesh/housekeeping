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
const validate_1 = require("../middlewares/validate");
const admin_validation_1 = require("../validations/admin.validation");
const auth_2 = require("../validations/auth");
const router = express_1.default.Router({ mergeParams: true });
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router
    .route('/auth/login')
    .post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.adminLoginSchema), auth_controller_1.adminLoginApi);
router.route('/auth/me').get(auth_1.checkApiKey, auth_1.checkAdminToken, auth_controller_1.adminMeApi);
// Worker Routes
router
    .route('/worker/create')
    .post(auth_1.checkApiKey, auth_1.checkAdminToken, upload.fields([{ name: 'profile' }, { name: 'aadhaar' }]), (0, validate_1.validate)(admin_validation_1.createWorkerSchema), general_controller_1.createWorkerAdmin);
router
    .route('/worker/all')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findWorkersForAdmin);
router
    .route('/worker/:phoneNumber')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, general_controller_1.findWorkerForAdmin);
exports.default = router;
