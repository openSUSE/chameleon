const Modal = require("bootstrap").Modal;
const sections = [
  {
    id: "main",
    title: "Main",
    links: [
      {
        id: "main-site",
        title: "Main site",
        url: "https://www.opensuse.org/"
      },
      {
        id: "software",
        title: "Software",
        url: "https://software.opensuse.org/"
      },
      {
        id: "wiki",
        title: "Wiki",
        url: "https://en.opensuse.org/"
      },
      {
        id: "documentation",
        title: "Documentation",
        url: "https://doc.opensuse.org/"
      },
      {
        id: "forum",
        title: "Forum",
        url: "https://forums.opensuse.org/"
      }
    ]
  },
  {
    id: "development",
    title: "Development",
    links: [
      {
        id: "build-service",
        title: "Build service",
        url: "https://build.opensuse.org/"
      },
      {
        id: "bugzilla",
        title: "Bugzilla",
        url: "https://bugzilla.opensuse.org/"
      },
      {
        id: "github",
        title: "GitHub",
        url: "https://github.com/opensuse"
      },
      {
        id: "openaq",
        title: "openQA",
        url: "https://openqa.opensuse.org/"
      },
      {
        id: "weblate",
        title: "Weblate",
        url: "https://l10n.opensuse.org/"
      }
    ]
  },
  {
    id: "information",
    title: "Information",
    links: [
      {
        id: "news",
        title: "News",
        url: "https://news.opensuse.org/"
      },
      {
        id: "events",
        title: "Events",
        url: "https://events.opensuse.org/"
      },
      {
        id: "planet",
        title: "Planet",
        url: "https://planet.opensuse.org/"
      },
      {
        id: "shop",
        title: "Shop",
        url: "https://shop.opensuse.org/"
      },
      {
        id: "status",
        title: "Status",
        url: "https://status.opensuse.org/"
      }
    ]
  },
  {
    id: "community",
    title: "Community",
    links: [
      {
        id: "irc-channels",
        title: "IRC channels",
        url: "https://en.opensuse.org/openSUSE:IRC_list"
      },
      {
        id: "mail-lists",
        title: "Mail lists",
        url: "https://en.opensuse.org/openSUSE:Mailing_lists_subscription"
      },
      {
        id: "facebook-group",
        title: "Facebook group",
        url: "https://www.facebook.com/groups/opensuseproject"
      },
      {
        id: "telegram-group",
        title: "Telegram group",
        url: "https://t.me/opensuseusers"
      },
      {
        id: "reddit",
        title: "Reddit",
        url: "https://reddit.com/r/openSUSE"
      }
    ]
  },
  {
    id: "social-media",
    title: "Social Media",
    links: [
      {
        id: "mastodon",
        title: "Mastodon",
        url: "https://fosstodon.org/@opensuse"
      },
      {
        id: "telegram",
        title: "Telegram",
        url: "https://t.me/opensusenews"
      },
      {
        id: "facebook",
        title: "Facebook",
        url: "https://www.facebook.com/en.openSUSE"
      },
      {
        id: "twitter",
        title: "Twitter",
        url: "https://twitter.com/opensuse"
      },
      {
        id: "youtube",
        title: "YouTube",
        url: "https://www.youtube.com/user/opensusetv"
      }
    ]
  },
  {
    title: "Other",
    links: [
      {
        id: "packman",
        title: "Packman",
        url: "http://packman.links2linux.org/"
      },
      {
        id: "kubic",
        title: "Kubic",
        url: "https://kubic.opensuse.org/"
      },
      {
        id: "guide-unofficial",
        title: "Guide (unofficial)",
        url: "https://opensuse-guide.org/"
      },
      {
        id: "mirrors",
        title: "Mirrors",
        url: "https://mirrors.opensuse.org/"
      },
      {
        id: "lizards",
        title: "Lizards",
        url: "https://lizards.opensuse.org/"
      }
    ]
  }
];

const modal = document.createElement("div");
modal.className = "megamenu modal fade";
modal.setAttribute("tabindex", "-1");
modal.setAttribute("role", "dialog");
document.body.prepend(modal);

const content = sections
  .map(function(section) {
    const links = section.links
      .map(function(link) {
        return `<p><a class="l10n" href="${link.url}" data-msg-id="${link.id}" data-url-id="${link.id}-url">${link.title}</a></p>`;
      })
      .join("");

    return `
  <div class="col-6 col-md-4 mb-5">
    <h6 class="megamenu-heading l10n" data-msg-id="${section.id}">${section.title}</h6>
    ${links}
  </div>
  `;
  })
  .join("");

modal.innerHTML = `
<div class="modal-dialog modal-dialog-centered modal-lg" role=document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title l10n" data-msg-id="opensuse-universe">openSUSE Universe</h5>
      <button type="button" class="close" data-dismiss="modal">×</button>
    </div>
    <div class="modal-body">
      <div class="row">
        ${content}
      </div>
    </div>
  </div>
</div>
`;

const modalController = new Modal(modal);

const toggler = document.createElement("button");
toggler.className = "navbar-toggler megamenu-toggler";
toggler.type = "button";
toggler.innerHTML =
  '<svg class="icon"><use xlink:href="/dist/svg/sprite.svg#apps-line"></use></svg>';

document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.append(toggler);
  }

  toggler.addEventListener("click", function() {
    modalController.show();
  });
});
