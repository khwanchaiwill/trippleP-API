const express = require('express');

const router = express.Router();

const UsersDB = require('../data/helper/user');
const CategoryDB = require('../data/helper/Categories');

const db = require('../data/dbConfig')

router.get('/', (req, res) => {
  // do your magic!

  CategoryDB.get()
    .then(cate => {
      res.status(200).json(cate)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      .json({
        message: "Error while you are in process can not get data"
      })
    })

});

router.get('/:id', validateCategoryId, (req, res) => {
  // do your magic!
  CategoryDB.get(req.cate.id)
  .then(cateId => {
    res.status(200).json(cateId)
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    .json({
      message: "Error while you are in process can not get data"
    })
  })
});

router.post('/', ( req, res) => {
   
    const id = req.params.id; 
      console.log(req.params.id)
      const actions = req.body;
  CategoryDB.insert(actions)
      .then(act => {
        res.status(201).json(act)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while you are in process can not save data"})
      })
   
  });

router.delete('/:id', validateCategoryId, (req, res) => {
    const id = req.params.id
  const body = req.body
  CategoryDB.remove(id)
  .then(move => {
    if(move > 0){
      res.status(200).json({
        message: "Successful deleted", id, body
      })
    }else{
      res.status(404)
      .json({
        message: "Can not found category"
      })
    }
   
  })
  .catch(err =>{
     res.status(500)
     .json({
    message: " Error while processing to remove the category"
  }, err)
  })
 

});

router.put('/:id', validateCategoryId, (req, res) => {
  
  const newUpdate = req.body;
  CategoryDB.update(req.cate.id, newUpdate)
      .then(actionUpdate => {
          res.status(200).json(actionUpdate)
      })
      .catch(err => {
          res.status(500).json({ error: "The post information could not be modified." }, err)
      })
});

// custom middleware

function validateCategoryId(req, res, next) {
  // do your magic!
  CategoryDB.get(req.params.id)
  .then(cate => {
    if(cate){
      req.cate = cate;
      next();
    }else if (!cate){
      res.status(400).json({ message: "invalid blog id" })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Err while get Id"
    })
  })
}

function validateUserId(req, res, next) {
  
    UsersDB.findById(req.params.id)
      .then(pro => {
        if(pro){
          req.pro = pro;
          next();
        }else if (!pro){
          res.status(400).json({ message: "invalid user id" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Err while get Id"
        })
      })
  }
  
module.exports = router;
// The table and router has been success with category table 