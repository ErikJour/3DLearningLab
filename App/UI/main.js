import * as THREE from 'three'
import {initLighting} from "./buildingblocks/lighting";
import {initLevel} from "./buildingBlocks/level";
import {initializeObjects, physicsObjects} from "./buildingBlocks/objects";
import {initializeSimpleOscillation, animateSine} from "./sinusoidalMotion/tuningForkViz";
import {initializeString, stringPoints, animateString} from "./string/waveEquation.js"

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene Setup
const scene = new THREE.Scene();

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.y = 5
camera.position.z = 10
scene.add(camera)

//=======================================
//Initialize Objects
//=======================================
initLighting(scene);
initLevel(scene);
initializeObjects(scene);
initializeSimpleOscillation(scene);
initializeString(scene, 1000);

//=======================================
//Raycaster, mouse, click targets
//=======================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const raycastList = [
    physicsObjects.sphere,
    physicsObjects.button
];

let clicked;

//=======================================
//Event Listeners
//=======================================
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

canvas.addEventListener("pointerdown", (event) => {
    const screen = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - screen.left) / screen.width) * 2 - 1;
    mouse.y = -((event.clientY - screen.top) / screen.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(raycastList, false)[0];
    if (!hit) return;

    const obj = hit.object;

    if (obj === physicsObjects.button) {
        console.log("Clicked Button");
        clicked = true;
    }
});

canvas.addEventListener("pointerup", (event) => {
    const screen = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - screen.left) / screen.width) * 2 - 1;
    mouse.y = -((event.clientY - screen.top) / screen.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(raycastList, false)[0];
    if (!hit) return;

    const obj = hit.object;

    if (obj === physicsObjects.button) {
        console.log("Clicked up Button");
    }
    clicked = false;
});

//=======================================
//Renderer
//=======================================
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


//Clock
const clock = new THREE.Clock()

//=======================================
//Render loop
//=======================================
const animate = () =>
{
    const elapsedTime = clock.getElapsedTime();

    stringPoints.forEach(point => {
        animateString(point, elapsedTime);

    })

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()


