const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser,
} = require("../controllers/user");

//! Routes
//? show all users data in html format on the webpage
// router.get("/", async (req, res) => {
//   const allDBUsers = await User.find({});

//   const html = `
//   <ul>
//   ${allDBUsers
//     .map(
//       (user) =>
//         `<li>
//       ${user.firstName} ${user.lastName} ${user.email}
//     </li>`
//     )
//     .join("")}
//   </ul>
//      `;
//   return res.send(html);
// });

//! REST API
//? 1. show all users json format
router.get("/", getAllUsers);

//? 2. get the single user data dynamically by its id
router.get("/:id", getUserById);

//? 3. post request (new user creating)
router.post("/", createNewUser);

//? 4. patch request (update user by id)
router.patch("/:id", updateUserById);

//? 5. delete request (delete user by id)
router.delete("/:id", deleteUserById);

module.exports = router;

/*

router
.route('/').get(getAllUsers).post(createNewUser)

router
.route('./:id')
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)

*/
