(() => {
  const $title = document.querySelector(".crud-title"),
    $form = document.querySelector(".crud-form"),
    $table = document.querySelector(".crud-table"),
    $template = document.getElementById("crud-template").content,
    $fragment = document.createDocumentFragment();

  const getAll = async () => {
    try {
      let res = await fetch("http://localhost:5200/santos"),
        json = await res.json();

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      json.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".constellation").textContent = el.constelacion;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.nombre;
        $template.querySelector(".edit").dataset.constellation =
          el.constelacion;

        $template.querySelector(".delete").dataset.id = el.id;
        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    } catch (err) {
      let message = !err.statusText
        ? "ocurrio un error al traer los datos"
        : err.statusText;
      $table.insertAdjacentHTML(
        "afterend",
        `<p><b> Error: ${err.status} -- ${message}</b> </p>`
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
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          };
          let res = await fetch("http://localhost:5200/santos", options),
            json = await res.json();
          if (!res.ok) {
            throw { status: res.status, statusText: res.statusText };
          }
          location.reload();
        } catch (err) {
          console.log(err);
          let message = !err.statusText
            ? "ocurrio un error al llenar los datos"
            : err.statusText;
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b> Error: ${err.status} -- ${message}</b> </p>`
          );
        }
      } else {
        //put

        try {
          let options = {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          };
          let res = await fetch(
              `http://localhost:5200/santos/${e.target.id.value}`,
              options
            ),
            json = await res.json();

          if (!res.ok) {
            throw { status: res.status, statusText: res.statusText };
          }
          location.reload();
        } catch (err) {
          console.log(err);
          let message = !err.statusText
            ? "ocurrio un error al llenar los datos"
            : err.statusText;
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b> Error: ${err.status} -- ${message}</b> </p>`
          );
        }
      }
    }
  });

  document.addEventListener("click", async (e) => {
    if (e.target.matches(".edit")) {
      $title.innerHTML = "Editar Santo";

      $form.nombre.value = e.target.dataset.name;
      $form.constelacion.value = e.target.dataset.constellation;
      $form.id.value = e.target.dataset.id;
    }
    if (e.target.matches(".delete")) {
      let borrar = confirm(`Seguro que desea eliminar ${e.target.dataset.id}`);
      if (borrar) {
        try {
          let options = {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=utf-8" },
          };
          let res = await fetch(
            `http://localhost:5200/santos/${e.target.dataset.id}`,
            options
          );
          if (!res.ok) throw { status: res.status, statusText: res.statusText };

          location.reload();
        } catch (err) {
          let message = !err.statusText
            ? "ocurrio un error al eliminar los datos"
            : err.statusText;
          alert(`Error : ${err.status} -- ${message}`);
        }
      }
    }
  });
})();
