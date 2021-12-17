const Menu = require("../models/menu");

function homeController() {
  return {
    index: async (req, res) => {
      const pizzas = await Menu.find();
      return res.render("home", { pizzas });
    },
  };
}

module.exports = homeController();
