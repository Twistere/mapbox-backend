const express = require("express");
const app = express();
const image_route = require("./routes/image-route")
const user_route = require("./routes/user-route")

app.listen(3000, () =>
  console.log("REST API server ready at: http://127.0.0.1:3000")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/images', image_route);
app.use('/api/users', user_route);


