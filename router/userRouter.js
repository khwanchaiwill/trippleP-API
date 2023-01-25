const express = require('express');
const { blogToBody } = require('../data/helper/mappers');

const Users = require('../data/helper/user');
// const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
  .then(Users => {
    res.json(Users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Users' }, err);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Users' },err);
  });
});

router.get('/:id/blog',(req, res) => {
  const { id } = req.params;
  Users.findBlog(id)
  .then(blog => {
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Could not find blog for given user' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get blogs' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;
  Users.add(userData)
  .then(user => {
    res.status(201).json(user);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});
router.post('/:id/blogs', (req, res) => {
  const blogData = req.body;
  console.log(blogData)
  const { id } = req.params; 
  blogData.user_id = Number(id);
  
  Users.findById(id)
  .then(user => {
    console.log(user)
    if (user) {
      Users.addBlog(blogData, id)
      .then(blog => {
        res.status(201).json(blog);
      })
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});
router.delete('/:id/blogs', (req, res) => {
  const id = req.params.id;
  const blogData = req.body;
  // console.log(blogData)
  // const { id } = req.params; 
  // blogData.user_id = Number(id);
  
  
  Users.findById(id)
  .then(user => {
    console.log(user)
    if (user) {
      Users.removeBlog(id)
      .then(blog => {
        res.status(201).json(blog);
      })
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
  .then(user => {
    if (user) {
      Users.update(changes, id)
      .then(updateduser => {
        res.json(updateduser);
      });
    } else {
      res.status(404).json({ message: user });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
const id = req.params.id;
const body = req.body
  Users.remove(id)
  .then(deleted => {
    if (deleted) {
      res.status(200).json({ removed: id, body});
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});


module.exports = router;