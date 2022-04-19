(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("exito");
      let data = JSON.parse(xhr.responseText);
      console.log(data);
      data.forEach((element) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${element.name} -- ${element.email} -- ${element.id}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
    } else {
      console.log("fracaso");
      const message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error: ${xhr.status} - ${message}`;
    }
  });
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();
