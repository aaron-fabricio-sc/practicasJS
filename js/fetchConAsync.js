(() => {
  const $async = document.getElementById("async"),
    $fragment = document.createDocumentFragment();

  const getData = async (url) => {
    try {
      let res = await fetch(url);

      if (!res.ok) {
        throw {
          status: res.status,
          statusText: res.statusText,
        };
      }
      let json = await res.json();

      json.forEach((el) => {
        const $li = document.createElement("li");

        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.id}`;
        $fragment.appendChild($li);
      });
      $async.appendChild($fragment);
    } catch (error) {
      let message = !error.statusText
        ? "ocurrio un error al traer los datos"
        : error.statusText;
      $async.innerHTML = `Estado: ${error.status} --- ${message}`;
    }
  };
  getData("https://jsonplaceholder.typicode.com/users");
})();
