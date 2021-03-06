import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";
function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart",
        progressBar: true,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: true,
      }).show();
    });
}
document.addEventListener("DOMContentLoaded", (e) => {
  const addToCart = document.querySelectorAll(".add-to-cart");
  let cartCounter = document.querySelector("#cartCounter");
  const alertMsg = document.querySelector("#success-alert");
  if (alertMsg) {
    setTimeout(() => {
      alertMsg.remove();
    }, 2000);
  }
  addToCart.forEach((addtoBtn) => {
    addtoBtn.addEventListener("click", function (e) {
      let pizza = JSON.parse(this.dataset.pizza);
      updateCart(pizza);
    });
  });
});

initAdmin();
