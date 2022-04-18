const $title = document.querySelector(".crud-title"),
  $form = document.querySelector(".crud-form"),
  $table = document.querySelector(".crud-table"),
  $template = document.getElementById("crud-template").content,
  $fragment = document.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await axios.get("http://localhost:5200/santos");

    let json = await res.data;

    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.nombre;
      $template.querySelector(".constellation").textContent = el.constelacion;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.nombre;
      $template.querySelector(".edit").dataset.constellation = el.constelacion;

      $template.querySelector(".delete").dataset.id = el.id;
      $template.querySelector(".delete").dataset.name = el.nombre;

      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    console.log(err);
    let message = !err.statusText
      ? "ocurrio un error al traer los datos"
      : err.statusText;
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b> Error: ${err.response.status} -- ${message}</b> </p>`
    );
  }
};

document.addEventListener("DOMContentLoaded", getAll);
document.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //POST
      try {
        let options = {
          method: "POST",
          headers: { "Content-type": "application/json; charset=utf-8" },
          data: JSON.stringify({
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          }),
        };
        let res = await axios("http://localhost:5200/santos", options);
      } catch (error) {
        let message = error.statusText || "Ocurrio un error malo :v";
        $table.insertAdjacentHTML(
          "afterend",
          `Error ${error.response.status} -- ${message}`
        );
      }
    } else {
      //PUT

      try {
        let options = {
          method: "PUT",
          headers: { "Content-type": "application/json; charset=utf-8" },
          data: JSON.stringify({
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          }),
        };
        let res = await axios(
          `http://localhost:5200/santos/${e.target.id.value}`,
          options
        );
      } catch (error) {
        let message =
          error.statusText || "Ocurrio un error malo AL ACTUALIZAR:v";
        $table.insertAdjacentHTML(
          "afterend",
          `Error ${error.response.status} -- ${message}`
        );
      }
    }
  }
});
document.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Santo";
    ($form.nombre.value = e.target.dataset.name),
      ($form.constelacion.value = e.target.dataset.constellation);
    $form.id.value = e.target.dataset.id;
  }
  if (e.target.matches(".delete")) {
    let borrar = confirm(`Quiere borrar ${e.target.dataset.name}`);
    if (borrar) {
      try {
        let options = {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=utf-8" },
        };
        let res = await axios(
          `http://localhost:5200/santos/${e.target.dataset.id}`,
          options
        );
      } catch (error) {
        let message = error.statusText || "Ocurrio un error malo AL ELIMINAR:v";

        alert(`Error: ${error.response.status} -- ${message}`);
      }
    }
  }
});
