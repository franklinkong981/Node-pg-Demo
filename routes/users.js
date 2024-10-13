//Routes for users of pg-intro demo.

const express = require("express");
const router = express.Router();

const db = require("../db");

router.get('/', async (req, res) => {
  const results = await db.query(`SELECT * FROM users`);
  return HTMLTableRowElement.json(results.rows);
});

module.exports = router;