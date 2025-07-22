document.addEventListener("DOMContentLoaded", () => {
  // Anda bisa menambahkan logika JS di sini jika ada elemen interaktif di index.html
  // Misalnya, efek parallax, slider gambar, dll.
  // Karena galeri sekarang statis dengan narasi di HTML, tidak banyak JS yang dibutuhkan.

  // Contoh sederhana untuk mengamati animasi (opsional)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const animateElements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right"
  );
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animateElements.forEach((el) => {
    observer.observe(el);
  });
});
