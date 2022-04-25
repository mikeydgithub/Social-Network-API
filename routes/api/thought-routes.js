// setup express.js
const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById, 
    addThought, 
    updateThought, 
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')


// path for reactions
router
.route('/reactions/:thoughtid')
.post(addReaction)

// path for reactions
router
.route('/:thoughtid/reactions/:reactionId')
.delete(deleteReaction)


// path for thoughts
router
.route('/')
.get(getAllThought)
.post(addThought);

// Set up GET, PUT, and DELETE at /api/thoughts/<id>
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

module.exports = router;