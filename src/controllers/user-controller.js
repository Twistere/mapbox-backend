const { fetchDate, fetchAll } = require('../services/user-service');

const  displayUser = (req, res) => {
    let user = fetchDate();
    user.then(function (result) {
      res.render("index", {user: result});
    });
}


const  displayUserJson = (req, res) => {
  let user = fetchAll(req.params.id);
  user.then(function (result) {
    res.json(result);
  });
}

const  displayDateJson = (req, res) => {
  let user = fetchDate();
  user.then(function (result) {
    res.json(result);
  });
}


module.exports = {
  displayUser,
  displayUserJson,
  displayDateJson
}