const Order = require("../../models/order");
const moment = require("moment");
function orderController() {
  return {
    async store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;
          return res.redirect("/customers/orders");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Something went wrong!");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      if (!req.user) {
        return res.redirect("/");
      }
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
      );
      return res.render("customers/orders", { orders, moment: moment });
    },
  };
}

module.exports = orderController();
