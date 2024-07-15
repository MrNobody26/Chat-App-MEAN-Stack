import { Router } from "express";
const router = Router();

router.get("home", (req, res, next) => {
  console.log("home");
});

router.put("home", (req, res, next) => {
  console.log("home");
});

export default router;
