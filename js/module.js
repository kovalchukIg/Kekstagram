window.addEventListener("DOMContentLoaded", function () {
    const gallery = require("./parts/gallery"),
          form = require("./parts/form"),
          backand = require("./parts/backand");

    gallery();
    form();
    backand();

});