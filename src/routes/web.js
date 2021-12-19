const homeController = require("../controllers/homeController");
const authController = require("../controllers/auth/authController");
const cartController = require("../controllers/customer/cartController");
const guest = require("../middlewares/guest");
function initRoutes(app) {
  app.get("/", homeController.index);

  //Cart
  app.get("/cart", cartController.index);
  app.post("/update-cart", cartController.update);

  //Auth
  app.get("/login", guest, authController.login);
  app.post("/login", authController.postLogin);
  app.get("/register", guest, authController.register);
  app.post("/register", authController.postRegister);
  app.post("/logout", authController.logout);
}

module.exports = initRoutes;
