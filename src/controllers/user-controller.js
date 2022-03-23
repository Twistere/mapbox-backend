const { fetchDate } = require('../services/user-service');

exports.displayUser = (req, res) => {
    let user = fetchDate();
    res.json(user);
    
}