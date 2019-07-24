const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  // console.log("req.jwtToken", req.jwtToken);

  const department = req.jwtToken.department;
// users can only see other users in their departments.
  Users.find(department)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
