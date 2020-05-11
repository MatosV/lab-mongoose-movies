const express = require('express');
const Celebrity = require('../models/celebrity');

const celebritiesRouter = new express.Router();

/* Iteration #2: Listing Our Celebrities */

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
      console.log(celebrities);
    })
    .catch((err) => {
      console.log('There was an error');
      next(err);
    });
});

/* Iteration #4: Adding New Celebrities */

celebritiesRouter.get('/celebrities/create', (req, res) => {
  res.render('celebrities/create');
});

celebritiesRouter.post('/celebrities/create', (req, res) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })

    .then((newCelebrity) => {
      newCelebrity.save();
      res.redirect('/celebrities');
      console.log(`Created new Celebrity => ${newCelebrity}`);
    })
    .catch((err) => {
      console.log('There was an error');
      res.render('celebrities/create', err);
    });
});

/* Iteration #3: The Celebrity Details Page */

celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const celebritiesId = req.params.id;

  Celebrity.findById(celebritiesId)
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/show', { celebrities });
    })
    .catch((err) => {
      console.log('There was an error');
      next(err);
    });
});

/* Iteration #5: Deleting Celebrities */

celebritiesRouter.post('/celebrities/:id/delete', (req, res, next) => {
  const celebritiesId = req.params.id;

  Celebrity.findByIdAndRemove(celebritiesId)
    .then(() => {
      res.redirect('/celebrities');
      console.log(`You delted this Celebrity => ${celebritiesId}, |x_x|`);
    })
    .catch((err) => {
      console.log('There was an erros');
      next(err);
    });
});

/* Iteration #6 (Bonus): Editing Celebrities */

celebritiesRouter.get('/celebrities/:id/edit', (req, res, next) => {
  const celebrityID = req.params.id;

  Celebrity.findById(celebrityID)
    .then((celebrities) => {
      res.render('celebrities/edit', { celebrities });
      console.log(`Celebrity was Edited => ${celebrities}`);
    })
    .catch((err) => {
      console.log('There was an erros');
      next(err);
    });
});

celebritiesRouter.post('/celebrities/:id', (req, res, next) => {
  const celebritiesId = req.params.id;

  Celebrity.update(celebritiesId, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
    .then((celebrities) => {
      res.render('/celebrities', { celebrities });
      console.log(celebrities);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = celebritiesRouter;
