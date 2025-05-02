// import express from 'express';
// import { signUp, login } from '../controllers/authController';

// const router = express.Router();
// // const adminUser = {
// //   email: 'admin@example.com',
// //   password: 'adminpassword',
// //   name: 'Admin',
// //   isAdmin: true,
// // };



// router.post('/signUp', signUp);
// router.post('/login', login);

// export default router;
import express from 'express';
import { signUp, login } from '../controllers/authController';

const router = express.Router();

// POST route for signup
router.post('/signup', signUp);

// POST route for login
router.post('/login', login);

export default router;
