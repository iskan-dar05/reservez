const express = require('express')
const { body, check } = require('express-validator')

const router = express.Router()
const {
    loginUser,
    getAllUsers,
    deleteUser,
    activateUser,
    getAllBooks,
    blockUser,
    searchUsers
} = require('../controllers/Admin')
const { authMiddleware } = require('../middlewares/Auth.middleware')



router.post('/login', loginUser)
router.get('/users', authMiddleware('admin'), getAllUsers)
router.get("/books", authMiddleware('admin'), getAllBooks);
//router.get("/users/search", authMiddleware('admin'), searchUsers)

router.delete('/user/:id', authMiddleware('admin'), deleteUser)

router.put("/:id/block", [
    check('id').isMongoId().withMessage('ID must be id'),
  ], authMiddleware("admin"),  blockUser);

router.put("/:id/activate", [
    check('id').isMongoId().withMessage('ID must be id'),
  ], authMiddleware("admin"),  activateUser);

router.delete('/users/:id', authMiddleware('admin'), deleteUser)


module.exports = router


