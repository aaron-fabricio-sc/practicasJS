/* (() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      console.log(res);
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.id}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((error) => {
      let message = !error.statusText
        ? "ocurrio un error al traer los datos"
        : error.statusText;
      $axios.innerHTML = `Estado: ${error.response.status} --- ${message}`;
    });
})(); */

(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();
  const getData = async (url) => {
    try {
      let res = await axios.get(url),
        json = await res.data;
      console.log("async axios", res);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.id}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    } catch (error) {
      let message = !error.statusText
        ? "ocurrio un error al traer los datos"
        : error.statusText;
      $axios.innerHTML = `Estado: ${error.response.status} --- ${message}`;
    }
  };

  getData("https://jsonplaceholder.typicode.com/user");
})();
