const homeController = require("../controllers/homeController");
const authController = require("../controllers/auth/authController");
const cartController = require("../controllers/customer/cartController");
const orderController = require("../controllers/customer/orderController");
const AdminOrderController = require("../controllers/admin/orderController");
const guest = require("../middlewares/guest");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
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

  // Customer
  app.post("/orders", auth, orderController.store);

  //Customer
  app.get("/customers/orders", auth, orderController.index);

  app.get("/admin/orders", admin, AdminOrderController.index);
}

module.exports = initRoutes;
