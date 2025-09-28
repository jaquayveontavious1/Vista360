// Create viewer
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({ 
    container,
    controlBar: true,        // Show bottom bar
    autoHideControlBar: false,
    cameraFov: 90  

});

viewer.OrbitControls.noZoom = false;
viewer.OrbitControls.minDistance = 500;   // How far out you can zoom
viewer.OrbitControls.maxDistance = 3000;

// Load panoramas
const mainRoom = new PANOLENS.ImagePanorama('images/main-room.jpeg');
const washRoom = new PANOLENS.ImagePanorama('images/wash-room.jpeg');

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
  viewer.setPanorama(washRoom);
});
mainRoom.add(mainToWash);

// Hotspot from Washroom -> Main Room
const washToMain = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
washToMain.position.set(-5000, 0, 0);
washToMain.addHoverText("Back to Main Room");
washToMain.addEventListener('click', () => {
  viewer.setPanorama(mainRoom);
});
washRoom.add(washToMain);

// Add panoramas
viewer.add(mainRoom, washRoom);

// Start in main room
viewer.setPanorama(mainRoom);
