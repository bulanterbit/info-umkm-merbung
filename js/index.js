document.addEventListener("DOMContentLoaded", () => {
  // Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translate(0,0)"; // Reset transform for different animations
        observer.unobserve(entry.target);
      }
    });
  };

  const animateElements = document.querySelectorAll(
    ".animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in"
  );
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // You can add more complex JS here if you want a dynamic gallery in the future
  // For now, the main content is mostly static HTML for the gallery feel.
});
