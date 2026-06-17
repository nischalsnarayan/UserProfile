/* =========================================================
   Nischal S Narayana — Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Duplicate marquee for seamless loop ---------- */
  const track = $("#marqueeTrack");
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- Preloader ---------- */
  const preloader = $("#preloader");
  const count = $("#preloaderCount");
  const bar = $("#preloaderBar");

  function startHero() {
    document.body.classList.add("is-loaded");
    $$(".hero__title .line span").forEach((el, i) => {
      el.animate(
        [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
        { duration: 1000, delay: 150 + i * 120, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" }
      );
    });
  }

  if (preloader && !prefersReduced) {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.floor(Math.random() * 11) + 4;
      if (p >= 100) { p = 100; clearInterval(tick); finish(); }
      count.textContent = p;
      bar.style.width = p + "%";
    }, 90);
    function finish() {
      setTimeout(() => {
        preloader.classList.add("is-done");
        startHero();
        setTimeout(() => preloader.remove(), 1100);
      }, 350);
    }
  } else if (preloader) {
    preloader.remove();
    $$(".hero__title .line span").forEach((el) => (el.style.transform = "none"));
  }

  /* ---------- Custom cursor ---------- */
  const cursor = $("#cursor");
  const ring = $("#cursorRing");
  const label = $("#cursorLabel");

  if (cursor && ring && !isTouch) {
    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-cursor]");
      ring.classList.remove("is-hover", "is-view");
      label.textContent = "";
      if (!t) return;
      const type = t.getAttribute("data-cursor");
      if (type === "view") { ring.classList.add("is-view"); label.textContent = "View"; }
      else { ring.classList.add("is-hover"); }
    });

    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) { cursor.style.opacity = "0"; ring.style.opacity = "0"; }
    });
    document.addEventListener("mouseover", () => { cursor.style.opacity = "1"; ring.style.opacity = "1"; });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- Subtle tilt on work media ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = "perspective(900px) rotateY(0) rotateX(0)"; });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = [
    ".section__head", ".work-card", ".discipline", ".about__lead",
    ".about__stats", ".about__col", ".faq__item", ".contact__title",
    ".contact__actions", ".hero__bottom", ".hero__meta"
  ];
  $$(revealTargets.join(",")).forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    el.setAttribute("data-reveal-delay", String((i % 3) + 1));
  });

  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    $$("[data-reveal]").forEach((el) => io.observe(el));
  } else {
    $$("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const dur = 1400;
    const start = performance.now();
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    })(start);
  }
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach((el) => cio.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq__item").forEach((item) => {
    const q = $(".faq__q", item);
    const a = $(".faq__a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      $$(".faq__item").forEach((other) => {
        other.classList.remove("is-open");
        $(".faq__a", other).style.height = "0px";
      });
      if (!open) {
        item.classList.add("is-open");
        a.style.height = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Nav: hide on scroll down, show on up ---------- */
  const nav = $("#nav");
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 200) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#navMenu");
  const mobileMenu = $("#mobileMenu");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = menuBtn.classList.toggle("is-open");
      mobileMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("#mobileMenu a").forEach((a) =>
      a.addEventListener("click", () => {
        menuBtn.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Copy email ---------- */
  const copyBtn = $("#copyMail");
  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const lbl = $("#copyMailLabel");
      navigator.clipboard?.writeText("nischalnarayan@outlook.com").then(() => {
        lbl.textContent = "Copied ✓";
        setTimeout(() => (lbl.textContent = "Copy email"), 1800);
      });
    });
  }
})();
