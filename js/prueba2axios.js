(() => {
  const $anime = document.getElementById("anime"),
    $fragment = document.createDocumentFragment();

  const getData = async (url) => {
    try {
      let res = await axios.get(url);
      //console.log("anime", res);
      let json = await res.data.data;
      console.log("json", json);
      json.forEach((el) => {
        let $figure = document.createElement("figure");

        $figure.innerHTML = ` <img src="${el.anime_img}" alt="" width="250px">
      <figcaption>${el.anime_name}</figcaption>`;

        $fragment.appendChild($figure);
      });
      $anime.appendChild($fragment);
    } catch (error) {
      let message = !error.statusText
        ? "ocurrio un error al traer los datos"
        : error.statusText;
      $anime.innerHTML = `Estado: ${error.response.status} --- ${message}`;
    }
  };

  getData("https://anime-facts-rest-api.herokuapp.com/api/v1");
})();
