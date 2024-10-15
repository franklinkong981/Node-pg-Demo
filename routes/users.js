//Routes for users of pg-intro demo.

const express = require("express");
const ExpressError = require("../errors/expressError");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res) => {
  try {
    const results = await db.query(`SELECT * FROM users`);
    return res.status(200).json({users: results.rows});
  } catch(e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find user with id of ${id}`, 404);
    }
    return res.status(200).json({user: results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const {type} = req.query;
    const results = await db.query(`SELECT * FROM uers WHERE type=$1`, [type]);
    return res.status(200).json(results.rows);
  } catch(e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {name, type} = req.body;
    const results = await db.query(`INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *`, [name, type]);
    return res.status(201).json({user: results.rows[0]});
  } catch(e){
    return next(e);
  }
});

router.patch('/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    const {name, type} = req.body;
    const results = await db.query('UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING *', [name, type, id]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't update user with id of ${id}`, 404);
    }
    return res.status(200).json({user: results.rows[0]});
  } catch(e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const results = await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    return res.status(200).json({ msg: "DELETED!" });
  } catch(e) {
    return next(e);
  }
});

module.exports = router;