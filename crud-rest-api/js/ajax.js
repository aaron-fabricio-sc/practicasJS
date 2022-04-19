(() => {
  const $title = document.querySelector(".crud-title"),
    $form = document.querySelector(".crud-form"),
    $table = document.querySelector(".crud-table"),
    $template = document.getElementById("crud-template").content,
    $fragment = document.createDocumentFragment();

  const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        let json = JSON.parse(xhr.responseText);
        success(json);
      } else {
        const message = xhr.statusText || "Ocurrio un error";
        error(`Error: ${xhr.status} , ${message}`);
      }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.send(JSON.stringify(data));
  };
  const getAll = () => {
    ajax({
      url: "http://localhost:5200/santos",

      success: (res) => {
        res.forEach((el) => {
          $template.querySelector(".name").textContent = el.nombre;
          $template.querySelector(".constellation").textContent =
            el.constelacion;
          $template.querySelector(".edit").dataset.id = el.id;
          $template.querySelector(".edit").dataset.name = el.nombre;
          $template.querySelector(".edit").dataset.constellation =
            el.constelacion;

          $template.querySelector(".delete").dataset.id = el.id;

          let $clone = document.importNode($template, true);
          $fragment.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragment);
      },

      error: (err) => {
        console.log(err);
        $table.insertAdjacentHTML("afterend", `<p> <b> ${err} </b> </p>`);
      },
    });
  };
  document.addEventListener("DOMContentLoaded", getAll);
  document.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();
      if (!e.target.id.value) {
        //Post
        ajax({
          url: "http://localhost:5200/santos",
          method: "POST",
          success: () => {
            location.reload();
          },
          error: () =>
            $form.insertAdjacentHTML("afterend", `<p> <b> ${err} </b> </p>`),
          data: {
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          },
        });
      } else {
        //put
        ajax({
          url: `http://localhost:5200/santos/${e.target.id.value}`,
          method: "PUT",
          success: () => {
            location.reload();
          },
          error: () =>
            $form.insertAdjacentHTML("afterend", `<p> <b> ${err} </b> </p>`),
          data: {
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          },
        });
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".edit")) {
      $title.innerHTML = "Editar Santo";
      $form.nombre.value = e.target.dataset.name;
      $form.constelacion.value = e.target.dataset.constellation;
      $form.id.value = e.target.dataset.id;
    }
    if (e.target.matches(".delete")) {
      let isDelete = confirm(`Estas seguro de eliminar ${e.target.dataset.id}`);
      if (isDelete) {
        ajax({
          url: `http://localhost:5200/santos/${e.target.dataset.id}`,
          method: "DELETE",
          success: () => {
            location.reload();
          },
          error: () => alert(err),
        });
      }
    }
  });
})();
