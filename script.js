
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('primary-navigation');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
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
viewer.preload([mainRoom, washRoom]);


