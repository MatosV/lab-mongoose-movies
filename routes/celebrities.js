const express = require('express');
const Celebrity = require('../models/celebrity');

const celebritiesRouter = new express.Router();

/* Iteration #2: Listing Our Celebrities */

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {      
      res.render('celebrities/index', { celebrities: celebrities });
      console.log(celebrities);
    })
    .catch(err => {
      console.log('There was an error')
      next(err);
    });
});

/* Iteration #3: The Celebrity Details Page */

celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const celebritiesId = req.params.id;

  Celebrity.findById(celebritiesId);
  console.log(celebritiesId)
    .then((celebrities) => {
      res.render('celebrities/show', { celebrities: celebrities });
    })
    .catch(err => {
      console.log('There was an error')
      next(err);
    });
});

/* Iteration #4: Adding New Celebrities */

celebritiesRouter.get('/celebrities/create', (req, res) => {
  res.render('/celebrities/create');
})

celebritiesRouter.post('/celebrities', (req, res) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })

  .then((newCelebrity) => {
    newCelebrity.save();
    res.redirect('/celebrities');
    console.log('Created new Celebrity => ', newCelebrity);
  })
  .catch(err => {
    console.log('There was an error')
    res.render('celebrities/create', err);
  })
});

/* Iteration #5: Deleting Celebrities */

celebritiesRouter.post('celebrities/:id/delete', (req, res, next) =>{
  const celebritiesId = req.params.id;

  Celebrity.findByIdAndRemove(celebritiesId)
  .then(() => {
    res.redirect('/celebrities');
    console.log(`You delted this Celebrity => ${celebritiesId}, |x_x|`)
  })
  .catch(err =>{
    console.log('There was an erros')
    next(err)
  })
})

/* Iteration #6 (Bonus): Editing Celebrities */

celebritiesRouter.get('/celebrities/:id/edit', (req, res) => {
  res.render('/routes/celebrities');
})

celebritiesRouter.post('/celebrities', (req, res, next) => {
  const celebritiesId = req.params.id;

  Celebrity.findById(celebritiesId)

  .then((celebritiesId) => {
    res.render('/celebrities/edit', {celebritiesId});
    console.log(`Celebrity ${celebritiesId}, was edited |-_-|`)
  })
  .catch(err => {
    console.log('There was an error')
    next(err)
  })
});

module.exports = celebritiesRouter;
