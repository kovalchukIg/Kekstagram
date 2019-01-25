function backand() {
    const URL = "server.js";

window.upload = function (data, onLoad) {
   const xhr = new XMLHttpRequest();

   xhr.responseType = "json";

   xhr.addEventListener("load", function () {
        if (xhr.readyState === 4){
           if (xhr.status === 200){
              onLoad();
           }else {
              alert("unknown status: " + xhr.status + " " + xhr.statusText);
           }
        }
   });

   xhr.addEventListener("timeout", function () {

   });

       xhr.open("POST", URL);
       xhr.send(data);

}
}




module.exports = backand;