function skipAdVideo(container) {
  const videoElement = container.querySelector("video");
  if (videoElement) {
    // Skip as soon as metadata is available
    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.currentTime = videoElement.duration;
      console.log("Ad skipped 🚀");
    });

    // If metadata is already loaded
    if (videoElement.readyState >= 1) {
      videoElement.currentTime = videoElement.duration;
      console.log("Ad skipped 🚀 (already loaded)");
    }
  }
}

function initObserver() {
  const container = document.querySelector("#ad-video-container");
  if (!container) return;

  // Watch only inside the container
  const observer = new MutationObserver(() => {
    skipAdVideo(container);
  });

  observer.observe(container, { childList: true, subtree: true });

  // Run once immediately
  skipAdVideo(container);
}

// Wait until DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initObserver);
} else {
  initObserver();
}
