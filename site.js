(function () {
  var PAGES = [
    { href: "about.html", n: "01", label: "About" },
    { href: "approach.html", n: "02", label: "Approach" },
    { href: "work.html", n: "03", label: "Work" },
    { href: "services.html", n: "04", label: "Services" },
    { href: "writing.html", n: "05", label: "Writing" },
    { href: "contact.html", n: "06", label: "Contact" }
  ];

  var path = location.pathname.split("/").pop() || "index.html";

  var logoSvg =
    '<svg viewBox="0 0 22 28" fill="none" aria-hidden="true">' +
    '<path d="M11 27 V7" stroke="#2f5d49" stroke-width="1.4" stroke-linecap="round"/>' +
    '<path d="M11 15 C6.5 14.5 4 11.5 4 7.5 C8.5 8 11 11 11 15 Z" stroke="#5f8068" stroke-width="1.1" fill="none"/>' +
    '<path d="M11 11 C15.5 10.5 18 7.5 18 3.5 C13.5 4 11 7 11 11 Z" stroke="#c1744d" stroke-width="1.1" fill="none"/>' +
    "</svg>";

  var navLinks = PAGES.map(function (p) {
    var active = p.href === path ? " active" : "";
    return (
      '<a class="' + active.trim() + '" href="' + p.href + '">' +
      '<span class="rn-n">' + p.n + "</span>" +
      '<span class="rn-l">' + p.label + "</span></a>"
    );
  }).join("");

  var rail = document.createElement("aside");
  rail.id = "rail";
  rail.innerHTML =
    '<a class="rail-logo" href="index.html" aria-label="Ryan Mecca, home">' + logoSvg + '<span class="rm">RM</span></a>' +
    '<button class="rail-toggle" aria-label="Toggle menu" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
    "</button>" +
    '<nav class="rail-nav">' + navLinks + "</nav>" +
    '<a class="rail-cta" href="contact.html" aria-label="Contact">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>' +
    "</a>";
  document.body.insertBefore(rail, document.body.firstChild);

  var foot = document.createElement("footer");
  foot.id = "site-foot";
  foot.innerHTML =
    '<div class="inner">' +
      '<div class="foot-row">' +
        '<div class="foot-brand"><div class="name serif">Ryan Mecca</div><div class="tag label">Accomplish anything</div></div>' +
        '<nav class="foot-nav">' +
          PAGES.map(function (p) { return '<a href="' + p.href + '">' + p.label + "</a>"; }).join("") +
        "</nav>" +
      "</div>" +
      '<div class="foot-meta"><span>© 2026 Ryan Mecca</span>' +
      '<span><a href="mailto:ramecca0711@gmail.com">ramecca0711@gmail.com</a> · Austin, TX</span></div>' +
    "</div>";
  document.body.appendChild(foot);

  var toggle = rail.querySelector(".rail-toggle");
  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  rail.querySelectorAll(".rail-nav a").forEach(function (a) {
    a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".sr").forEach(function (el) { io.observe(el); });

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var f = ev.target;
      var subject = encodeURIComponent("Website inquiry from " + f.name.value.trim() + ", " + f.topic.value);
      var body = encodeURIComponent(
        "Name: " + f.name.value.trim() + "\nEmail: " + f.email.value.trim() +
        "\nTopic: " + f.topic.value + "\n\n" + f.message.value.trim()
      );
      window.location.href = "mailto:ramecca0711@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
