const video = document.getElementById("howItWorks");

const options = {
  root: null,
  threshold: 0.5,
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);

observer.observe(video);

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 60,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      640: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 60 },
    },
  });

  let currentDetailsSlideIndex = null; // Track the index of the current details slide

  // Function to create the detailed slide
  function createDetailsSlide(title, description, details) {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", "details-slide", "p-8", "bg-white");

    slide.innerHTML = `
          <button class="absolute top-4 right-4 text-gray-500 text-xl close-slide">&times;</button>
          <h1 class="text-3xl font-bold mb-4">${title}</h1>
          <p class="text-gray-700 mb-6">${description}</p>
          <ul class="text-blue-700 space-y-2">
              ${details
                .split(", ")
                .map((item) => `<li>${item}</li>`)
                .join("")}
          </ul>
          <button class="mt-6 w-full bg-green-500 text-white py-2 rounded-md text-lg">${title} Proofreading and Editing</button>
      `;

    return slide;
  }

  // Event listener for each Swiper slide
  document.querySelectorAll(".swiper-slide").forEach((slide, index) => {
    slide.addEventListener("click", () => {
      const title = slide.getAttribute("data-title");
      const description = slide.getAttribute("data-description");
      const details = slide.getAttribute("data-details");

      // If there's already a details slide, remove it first
      if (currentDetailsSlideIndex !== null) {
        swiper.removeSlide(currentDetailsSlideIndex);
        if (currentDetailsSlideIndex < index) {
          index -= 1; // Adjust index if a previous slide was removed before the clicked slide
        }
      }

      // Create the new details slide
      const detailsSlide = createDetailsSlide(title, description, details);

      // Insert the details slide right after the clicked slide
      swiper.addSlide(index + 1, detailsSlide);
      swiper.slideTo(index + 1, 500); // Move to the details slide

      // Update the current details slide index
      currentDetailsSlideIndex = index + 1;

      // Add close functionality to the details slide
      detailsSlide
        .querySelector(".close-slide")
        .addEventListener("click", () => {
          swiper.removeSlide(currentDetailsSlideIndex); // Remove the details slide
          currentDetailsSlideIndex = null; // Reset the current details slide index
          swiper.slideTo(index, 500); // Go back to the original slide
        });
    });
  });
});
