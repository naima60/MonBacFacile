document.addEventListener("DOMContentLoaded", () => {
  // إخفاء أو إظهار المصطلحات التقنية بالفرنسية (مع حفظ الاختيار بين الصفحات)
  const FR_KEY = "compta-hide-fr";
  const readPref = () => {
    try {
      return localStorage.getItem(FR_KEY) === "1";
    } catch (e) {
      return false;
    }
  };
  const savePref = (hidden) => {
    try {
      localStorage.setItem(FR_KEY, hidden ? "1" : "0");
    } catch (e) {
      /* stockage indisponible : on ignore */
    }
  };

  if (readPref()) {
    document.body.classList.add("hide-fr-terms");
  }

  const btnToggleFr = document.getElementById("btnToggleFr");
  if (btnToggleFr) {
    btnToggleFr.setAttribute(
      "aria-pressed",
      String(document.body.classList.contains("hide-fr-terms"))
    );
    btnToggleFr.addEventListener("click", () => {
      const hidden = document.body.classList.toggle("hide-fr-terms");
      btnToggleFr.setAttribute("aria-pressed", String(hidden));
      savePref(hidden);
    });
  }

  // إظهار أو إخفاء حل تمرين التفكير عبر الزر
  document.querySelectorAll("[data-toggle-solution]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle-solution");
      const solutionEl = document.getElementById(targetId);
      if (!solutionEl) return;

      const isHidden = solutionEl.classList.toggle("d-none");
      btn.textContent = isHidden ? "إظهار الحل" : "إخفاء الحل";
    });
  });

  // تفعيل زر المجال النشط في صفحة البرنامج عند النقر أو التمرير
  // (لا يخص إلا الروابط الداخلية التي تبدأ بـ #)
  const pillButtons = document.querySelectorAll(".compta-pill-btn");
  const sections = document.querySelectorAll("section[id^='domaine-']");

  const setActivePill = (targetId) => {
    pillButtons.forEach((btn) => {
      const href = btn.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      btn.classList.toggle("active-pill", href.slice(1) === targetId);
    });
  };

  pillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const href = btn.getAttribute("href") || "";
      if (href.startsWith("#")) {
        setActivePill(href.slice(1));
      }
    });
  });

  if (sections.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePill(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
});