function skipAdVideo(container) {
  const videoElement = container.querySelector("video");
  if (videoElement) {
    console.log("[HotStar Skipper] Video found in container.");

    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.currentTime = videoElement.duration;
      console.log("[HotStar Skipper] Ad skipped (via loadedmetadata).");
    });

    if (videoElement.readyState >= 1) {
      videoElement.currentTime = videoElement.duration;
      console.log("[HotStar Skipper] Ad skipped (already loaded).");
    }
  } else {
    console.log("[HotStar Skipper] No video found yet in container.");
  }
}

function initObserver() {
  const container = document.querySelector("#ad-video-container");
  if (!container) {
    console.log("[HotStar Skipper] #ad-video-container not found.");
    return;
  }

  console.log("[HotStar Skipper] Observer attached to #ad-video-container.");
  const observer = new MutationObserver(() => {
    skipAdVideo(container);
  });

  observer.observe(container, { childList: true, subtree: true });

  // Run once immediately
  skipAdVideo(container);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initObserver);
} else {
  initObserver();
}

// Listen for manual trigger from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "skipNow") {
    console.log("[HotStar Skipper] Manual skip requested.");
    const container = document.querySelector("#ad-video-container");
    if (container) {
      skipAdVideo(container);
    } else {
      console.log("[HotStar Skipper] #ad-video-container not found for manual skip.");
    }
  }
});
