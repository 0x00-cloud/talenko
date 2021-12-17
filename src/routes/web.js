const homeController = require("../controllers/homeController");
const authController = require("../controllers/auth/authController");
const cartController = require("../controllers/customer/cartController");

function initRoutes(app) {
  app.get("/", homeController.index);

  //Cart
  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);

  //Auth
  app.get("/login", authController.login);
  app.get("/register", authController.register);
}

module.exports = initRoutes;
