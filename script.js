document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('primary-navigation');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');

      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
    });
  }
});







// Create viewer
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({
  container,
  controlBar: true,
  autoHideControlBar: false,
  cameraFov: 90
});

// Load panoramas
const mainRoom = new PANOLENS.ImagePanorama('images/main-room.jpeg');
const washRoom = new PANOLENS.ImagePanorama('images/wash-room.jpeg');

// Preload progress + logs
mainRoom.addEventListener('progress', (e) => console.log("Loading Main Room..."));
washRoom.addEventListener('progress', (e) => console.log("Loading Washroom..."));

mainRoom.addEventListener('load', () => console.log("✅ Main Room Loaded"));
washRoom.addEventListener('load', () => console.log("✅ Washroom Loaded"));

// Labels
mainRoom.addEventListener('enter-fade-start', () => {
  console.log("Entered Main Room");
});
washRoom.addEventListener('enter-fade-start', () => {
  console.log("Entered Washroom");
});

// Hotspot from Main Room -> Washroom
const mainToWash = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
mainToWash.position.set(5000, 0, 0);
mainToWash.addHoverText("Go to Washroom");
mainToWash.addEventListener('click', () => {
  viewer.setPanorama(washRoom, 500); // faster transition (0.5s)
});
mainRoom.add(mainToWash);

// Hotspot from Washroom -> Main Room
const washToMain = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
washToMain.position.set(-5000, 0, 0);
washToMain.addHoverText("Back to Main Room");
washToMain.addEventListener('click', () => {
  viewer.setPanorama(mainRoom, 500); // faster transition (0.5s)
});
washRoom.add(washToMain);

// Add panoramas
viewer.add(mainRoom, washRoom);

// Start in main room
viewer.setPanorama(mainRoom);

// Preload both
viewer.preload(mainRoom,washRoom)



const viewButtons = document.querySelectorAll('.btn');
const demoMessage = document.getElementById('demo-message');

viewButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    demoMessage.style.display = 'block';
    demoMessage.textContent = 'This property is still under demo construction.';

    setTimeout(() => {
      demoMessage.style.display = 'none';
    }, 3000);
  });
});

// Demo buttons alert
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.alert('🚧 This demo is currently under construction. Check back soon!');
    });
  });
});

  const menuButton = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('primary-navigation');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');

      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
    });
  }

