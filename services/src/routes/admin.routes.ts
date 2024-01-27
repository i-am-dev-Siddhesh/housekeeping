import express from 'express';
import multer from 'multer';
import {
  adminLoginApi,
  adminMeApi,
} from '../controllers/admin/auth.controller';
import {
  createWorkerAdmin,
  findWorkerForAdmin,
  findWorkersForAdmin,
} from '../controllers/admin/general.controller';
import { checkAdminToken, checkApiKey } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createWorkerSchema } from '../validations/admin.validation';
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
    validate(createWorkerSchema),
    createWorkerAdmin
  );
router
  .route('/worker/all')
  .get(checkApiKey, checkAdminToken, findWorkersForAdmin);
router
  .route('/worker/:phoneNumber')
  .get(checkApiKey, checkAdminToken, findWorkerForAdmin);

export default router;
