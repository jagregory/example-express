function Excursions(db, siteCode) {
  if (!db) {
    throw new Error('Model must have a database');
  }
  if (!siteCode) {
    throw new Error('Excursion must be scoped to a site');
  }

  return {
    all(cb) {
      db.excursion_spaces.findDoc({ siteCode }, cb);
    },

    get(id, cb) {
      if (typeof id !== 'number') {
        return cb(new Error('id not number'));
      }

      db.excursion_spaces.findDoc(id, (err, space) => {
        if (err) {
          return cb(err);
        }

        // TODO: how do we want to handle this? pretend there's nothing there,
        // or acknowledge but deny?
        if (space && space.siteCode !== siteCode) {
          return cb(null, null);
        }

        return cb(null, space);
      });
    },

    save(data, cb) {
      db.excursion_spaces.saveDoc(Object.assign(data, { siteCode }), cb);
    },

    delete(id, cb) {
      db.excursion_spaces.destroy({ siteCode, id }, cb);
    }
  }
}

Excursions.schema = {
  type: 'object',
  properties: {
    location: {
      type: 'string',
      required: true
    },
    subject: {
      type: 'string',
      required: true
    },
  }
};

module.exports = Excursions;
