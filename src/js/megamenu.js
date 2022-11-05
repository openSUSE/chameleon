document.addEventListener("DOMContentLoaded", function() {
  const megamenu = document.getElementById("megamenu");
  if (!megamenu) {
    return;
  }
  fetch('//universe.opensuse.org/api/v0/sites.json').then(languages_response => {
    return languages_response.json();
  }).then(languages => {
    var lang = document.documentElement.lang;
    if (!lang || !(lang in languages)) {
      lang = 'en';
    }

    fetch(languages[lang]).then(sections_response => {
      return sections_response.json();
    }).then(sections => {
      const content = sections
        .map(function(section) {
          const links = section.links
            .map(function(link) {
              return `<li>${link.icon} <a href="${link.url}">${link.title}</a></li>`;
            })
            .join("");

          return `
            <div class="col-6 col-md-4 col-lg-2">
              <h5 class="megamenu-heading">${section.title}</h5>
              <ul class="megamenu-list">
                ${links}
              </ul>
            </div>
          `;
        })
        .join("");

      megamenu.innerHTML = `
        <div class="container-fluid">
          <div class="row">
            ${content}
          </div>
        </div>
      `;
    });
  });
});
