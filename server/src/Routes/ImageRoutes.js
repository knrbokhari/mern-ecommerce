const cloudinary = require("cloudinary");
const verifyAdmin = require("../Middleware/verifyAdmin");
const verifyJWT = require("../Middleware/verifyJWT");
const router = require("express").Router();
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.delete("/:public_id", verifyJWT, verifyAdmin, async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

const configureImageRoutes = (app) => {
  app.use("/images", router);
};

// module.exports = router;
module.exports = configureImageRoutes;
