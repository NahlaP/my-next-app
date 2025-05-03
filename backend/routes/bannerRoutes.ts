// backend/routes/bannerRoutes.ts

import express from 'express';
import Banner from '../models/Banner';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const banners = await Banner.find({});
    res.json(banners);
  })
);

export default router;
