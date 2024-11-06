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

