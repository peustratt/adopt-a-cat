const { Tag } = require("../models");

const router = require("express").Router();

router.route("/").get((req, res, next) =>
  Promise.resolve()
    .then(() => Tag.find())
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err))
);

module.exports = router;