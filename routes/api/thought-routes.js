// setup express.js
const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought
} = require('../../controllers/thought-controller')

// router
// .route('/thoughts/:id/reactions')
// .post(addThought)
// .delete(deleteThought)

router
.route('/')
.get(getAllThought)
.post(createThought);

// Set up GET, PUT, and DELETE at /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

module.exports = router;