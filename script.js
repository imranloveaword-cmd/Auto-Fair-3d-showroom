
// ======================================
// AUTO FAIR - 3D SHOWROOM
// ======================================

const container = document.getElementById("car-container");

if (container && window.THREE) {

  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080808);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.set(6, 3.5, 8);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;

  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // LIGHTS
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);

  const goldLight = new THREE.PointLight(0xd4af37, 2, 20);
  goldLight.position.set(-4, 3, -3);
  scene.add(goldLight);

  const showroomLight = new THREE.PointLight(0xffffff, 1.5, 25);
  showroomLight.position.set(0, 5, 5);
  scene.add(showroomLight);

  // FLOOR
  const floorGeometry = new THREE.PlaneGeometry(200, 200);

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.35,
    metalness: 0.6
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  scene.add(floor);

  // CAR GROUP
  const car = new THREE.Group();
  scene.add(car);

  // MATERIALS
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.25
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x182a38,
    metalness: 0.5,
    roughness: 0.15
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.85
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xc6c6c6,
    metalness: 0.9,
    roughness: 0.2
  });

  const lightMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.5
  });

  // CAR BODY
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.8, 1.8),
    bodyMaterial
  );

  body.position.y = 1;
  body.castShadow = true;
  car.add(body);

  // FRONT BONNET
  const bonnet = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.35, 1.75),
    bodyMaterial
  );

  bonnet.position.set(1.55, 1.25, 0);
  bonnet.castShadow = true;
  car.add(bonnet);

  // CABIN
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.85, 1.45),
    glassMaterial
  );

  cabin.position.set(-0.35, 1.75, 0);
  cabin.castShadow = true;
  car.add(cabin);

  // ROOF
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 0.12, 1.5),
    bodyMaterial
  );

  roof.position.set(-0.35, 2.18, 0);
  car.add(roof);

  // FRONT & REAR LIGHTS
  function createLight(x, z, color) {
    const light = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.2, 0.48),
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.2
      })
    );

    light.position.set(x, 1.1, z);
    car.add(light);
  }

  createLight(2.1, -0.55, 0xffffff);
  createLight(2.1, 0.55, 0xffffff);
  createLight(-2.1, -0.55, 0xff0000);
  createLight(-2.1, 0.55, 0xff0000);

  // WHEELS
  const wheels = [];

  function createWheel(x, z) {
    const wheelGroup = new THREE.Group();

    const tire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.25, 32),
      tireMaterial
    );

    tire.rotation.x = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.27, 24),
      rimMaterial
    );

    rim.rotation.x = Math.PI / 2;
    wheelGroup.add(rim);

    wheelGroup.position.set(x, 0.5, z);
    car.add(wheelGroup);

    wheels.push(wheelGroup);
  }

  createWheel(1.35, -0.95);
  createWheel(1.35, 0.95);
  createWheel(-1.35, -0.95);
  createWheel(-1.35, 0.95);

  // CAR POSITION
  car.position.y = 0;
  car.rotation.y = -0.35;

  // ORBIT CONTROLS
  const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
  );

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  controls.target.set(0, 1.1, 0);
  controls.minDistance = 4;
  controls.maxDistance = 15;
  controls.maxPolarAngle = Math.PI / 2.05;

  // COLOR CHANGE
  const colorButtons = document.querySelectorAll(".color-btn");

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.dataset.color;

      if (color) {
        bodyMaterial.color.set(color);
      }
    });
  });

  // ===== WHATSAPP FORM =====
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const car = document.getElementById("customer-car").value || "Not specified";
    const message = document.getElementById("customer-message").value || "No message";

    const whatsappNumber = "8801XXXXXXXXX";   // ← এখানে তোমার নম্বর

    const text = `New Inquiry from Auto Fair Website%0A%0AName: ${name}%0APhone: ${phone}%0ACar: ${car}%0AMessage: ${message}`;

    const whatsappURL = `https://wa.me/\( {whatsappNumber}?text= \){text}`;

    window.open(whatsappURL, "_blank");
    bookingForm.reset();
  });
}

  // ANIMATION
  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // RESPONSIVE
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width && height) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }
  });

}
// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// ===== WHATSAPP FORM =====
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const car = document.getElementById("customer-car").value || "Not specified";
    const message = document.getElementById("customer-message").value || "No message";

    // এখানে তোমার WhatsApp নম্বর দাও (দেশের কোড সহ)
    const whatsappNumber = "+8801711447402";   // ← এখানে নিজের নম্বর বসাও

    const text = `New Inquiry from Auto Fair Website%0A%0AName: ${name}%0APhone: ${phone}%0ACar: ${car}%0AMessage: ${message}`;

    const whatsappURL = `https://wa.me/\( {whatsappNumber}?text= \){text}`;

    window.open(whatsappURL, "_blank");
    bookingForm.reset();
  });
}