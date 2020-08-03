if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((ServiceWorkerRegistration) => {
      console.log(
        "Service worker registered" + " " + ServiceWorkerRegistration
      );
    })
    .catch((error) => {
      console.log("Service worker not registered" + " " + error);
    });
} else {
  alert("Service worker not supported in the browser");
}
