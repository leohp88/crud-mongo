const { Router } = require("express");
const upload = require("../controller/upload");

const router = Router();

router.post("/", upload);

module.exports = router;
