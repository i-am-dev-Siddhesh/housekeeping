import express from 'express';
import multer from 'multer';
import {
  adminLoginApi,
  adminMeApi,
} from '../controllers/admin/auth.controller';
import {
  createCustomerAdmin,
  createWorkerAdmin,
  findCustomerForAdmin,
  findCustomersForAdmin,
  findWorkerForAdmin,
  findWorkersForAdmin,
  updateCustomerAdmin,
  updateWorkerAdmin,
} from '../controllers/admin/general.controller';
import { checkAdminToken, checkApiKey } from '../middlewares/auth';
import { convertStringPropertiesToIntegerMiddleware } from '../middlewares/body';
import { validate } from '../middlewares/validate';
import {
  createCustomerSchema,
  createWorkerSchema,
  updateCustomerSchema,
  updateWorkerSchema,
} from '../validations/admin.validation';
import { adminLoginSchema } from '../validations/auth';

const router = express.Router({ mergeParams: true });
const upload = multer({ dest: 'uploads/' });

router
  .route('/auth/login')
  .post(checkApiKey, validate(adminLoginSchema), adminLoginApi);

router.route('/auth/me').get(checkApiKey, checkAdminToken, adminMeApi);

// Worker Routes
router
  .route('/worker/create')
  .post(
    checkApiKey,
    checkAdminToken,
    upload.fields([{ name: 'profile' }, { name: 'aadhaar' }]),
    convertStringPropertiesToIntegerMiddleware,
    validate(createWorkerSchema),
    createWorkerAdmin
  );

router
  .route('/worker/update/:workerId')
  .put(
    checkApiKey,
    checkAdminToken,
    upload.fields([{ name: 'profile' }, { name: 'aadhaar' }]),
    convertStringPropertiesToIntegerMiddleware,
    validate(updateWorkerSchema),
    updateWorkerAdmin
  );
router
  .route('/worker/all')
  .get(checkApiKey, checkAdminToken, findWorkersForAdmin);

router
  .route('/worker/:phoneNumber')
  .get(checkApiKey, checkAdminToken, findWorkerForAdmin);

// Customer Routes
router
  .route('/customer/create')
  .post(
    checkApiKey,
    checkAdminToken,
    upload.fields([{ name: 'profile' }]),
    convertStringPropertiesToIntegerMiddleware,
    validate(createCustomerSchema),
    createCustomerAdmin
  );

router
  .route('/customer/update/:customerId')
  .put(
    checkApiKey,
    checkAdminToken,
    upload.fields([{ name: 'profile' }]),
    convertStringPropertiesToIntegerMiddleware,
    validate(updateCustomerSchema),
    updateCustomerAdmin
  );
router
  .route('/customer/all')
  .get(checkApiKey, checkAdminToken, findCustomersForAdmin);

router
  .route('/customer/:customerId')
  .get(checkApiKey, checkAdminToken, findCustomerForAdmin);

export default router;
