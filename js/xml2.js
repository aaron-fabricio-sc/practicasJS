(() => {
  const xhr = new XMLHttpRequest(),
    $xhr2 = document.getElementById("xhr2"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let datos = JSON.parse(xhr.responseText);
      console.log(datos);

      const $article = document.createElement("article");
      $article.innerHTML = `<img src="${datos.avatar_url}" alt="${datos.bio}">
                                 <p>${datos.bio}</p>
                                <a href="${datos.blog}">${datos.blog}</a>`;
      $fragment.appendChild($article);

      $xhr2.appendChild($fragment);
    }

    console.log(xhr);
  });

  xhr.open("GET", "https://api.github.com/users/jonmircha");
  xhr.send();
})();
