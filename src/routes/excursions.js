const {Excursions} = require('../models');
const {NotFoundError} = require('../errors');
const db = require('../db');
const express = require('express');
const router = express.Router();
const SchemaValidate = require('express-jsonschema').validate;
const SiteCode = require('../middleware/site-code');

router.use(SiteCode.required());

router.get('/', (req, res, next) => {
  Excursions(db, req.siteCode).all((err, excursions) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(excursions);
  });
});

router.post('/', SchemaValidate({ body: Excursions.schema }), (req, res, next) => {
  Excursions(db, req.siteCode).save(req.body, (err, excursions) => {
    if (err) {
      return next(err);
    }

    res.status(201).json(excursions);
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  Excursions(db, req.siteCode).get(id, (err, excursion) => {
    if (err) {
      return next(err);
    }

    if (!excursion) {
      return next(new NotFoundError('Excursions', id));
    }
    
    res.status(200).json(excursion);
  });
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  Excursions(db, req.siteCode).delete(id, (err, excursion) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(excursion);
  });
});

module.exports = router;
