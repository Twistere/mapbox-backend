const { fetchDate } = require('../services/user-service');

exports.displayUser = (req, res) => {
    let user = fetchDate();
    user.then(function (result) {
      console.log(result);
      res.json(result);
    });
    
}