function skipAdVideo(container) {
  const videoElement = container.nextElementSibling;
  if (videoElement && videoElement.tagName === "VIDEO") {
    console.log("[SunNxt Skipper] Video found, attempting skip...");

    videoElement.addEventListener("loadedmetadata", () => {
      videoElement.currentTime = videoElement.duration;
      console.log("[SunNxt Skipper] Ad skipped via metadata 🚀");
    });

    if (videoElement.readyState >= 1) {
      videoElement.currentTime = videoElement.duration;
      console.log("[SunNxt Skipper] Ad skipped immediately 🚀");
    }
  } else {
    console.log("[SunNxt Skipper] No video found yet.");
  }
}

function addSkipButton(container) {
  if (document.querySelector("#SunNxt-skipper-btn")) return; // avoid duplicates

  const btn = document.createElement("button");
  btn.id = "SunNxt-skipper-btn";
  btn.innerText = "⏩ Skip Ad";
  Object.assign(btn.style, {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    background: "rgba(0,0,0,0.7)",
    border: "1px solid #fff",
    borderRadius: "6px",
    cursor: "pointer",
    zIndex: "9999"
  });

  btn.addEventListener("click", () => {
    skipAdVideo(container);
  });

  container.style.position = "relative";
  container.appendChild(btn);

  console.log("[SunNxt Skipper] Skip button added.");
}

function observeForObject() {
  const target = document.querySelector("object");

  if (target) {
    console.log("[SunNxt Skipper] <object> found, attaching ad skipper...");

    // Add button + try skipping immediately
    addSkipButton(target);
    skipAdVideo(target);

    // Watch inside the object container for changes
    const innerObserver = new MutationObserver(() => {
      addSkipButton(target);
      skipAdVideo(target);
    });

    innerObserver.observe(target.parentNode, { childList: true, subtree: true });
    return true;
  }

  return false;
}

function initObserver() {
  if (observeForObject()) return; // already found

  console.log("[SunNxt Skipper] Waiting for <object> to appear...");

  // Watch whole body until <object> appears
  const bodyObserver = new MutationObserver(() => {
    if (observeForObject()) {
      bodyObserver.disconnect(); // stop once object is found
    }
  });

  bodyObserver.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initObserver);
} else {
  initObserver();
}
