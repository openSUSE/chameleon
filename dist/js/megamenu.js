(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener("DOMContentLoaded", function() {
  const megamenu = document.getElementById("megamenu");
  if (!megamenu) {
    return;
  }
  fetch('http://127.0.0.1:4000/api/v0/sites.json').then(languages_response => {
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

},{}]},{},[1])

//# sourceMappingURL=megamenu.js.map
