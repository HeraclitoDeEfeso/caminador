/*import userRoutes from './user.router';
import authenticateRoutes from './authenticate.router';
*/
const express = require("express");

const router = express.Router();
const padTime = (time) => time.toString().padStart(2, "0");

/* GET home page. */
router.get("/", (req, res) => {
  const datetime = new Date();
  res.send(
    `${padTime(datetime.getHours())}:${padTime(
      datetime.getMinutes()
    )}:${padTime(datetime.getSeconds())}`
  );
});

module.exports = router;

/**export {
  authenticateRoutes,
  userRoutes,
}; */
