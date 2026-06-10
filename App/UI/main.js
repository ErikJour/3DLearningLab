import * as THREE from 'three'
import {initLighting} from "./buildingblocks/lighting";
import {initLevel} from "./buildingBlocks/level";
import {initializeObjects, physicsObjects} from "./buildingBlocks/objects";
import {initializeSimpleOscillation} from "./sinusoidalMotion/tuningForkViz";
import {clearOrbs, getOrb, initializeOrbList} from "./OrbList/orbList";
import * as Juce from "/public/js/juce/javascript/index.js"
import {getNativeFunction, onContextMenu} from "./menuBoxes/nodeSelection";
import {initializeText, textObjects} from "./text/labels";

//============================================
//Variables
//============================================
//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene Setup
const scene = new THREE.Scene();

//Sizes
const sizes = {
    width: 1000,
    height: 600
};

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const cameraStart = new THREE.Vector3(0.0, 1.5, 10.0);
camera.position.copy(cameraStart);
scene.add(camera)


//=======================================
//Initialize Objects
//=======================================
initLighting(scene);
initLevel(scene);
initializeObjects(scene);
initializeSimpleOscillation(scene);
await initializeText(scene, camera)
// initializeString(scene, 1000);

//=======================================
//Raycaster, mouse, click targets
//=======================================
const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const raycastList = [
    physicsObjects.sphere,
    physicsObjects.button,
    textObjects.linkedList,
    textObjects.hashTable,
    textObjects.escLabel
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

function raycast()
{
    const screen = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - screen.left) / screen.width) * 2 - 1;
    mouse.y = -((event.clientY - screen.top) / screen.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(raycastList, false)[0];
    if (!hit) return;

    return hit.object;
}

canvas.addEventListener("pointerdown", (event) => {
    raycast();
});


canvas.addEventListener("pointerup", (event) => {
    let clickedObj = raycast();

    if (clickedObj === physicsObjects.button) {
        onContextMenu(event, raycaster, mouse, camera);
    }
    if (clickedObj === textObjects.linkedList) {
        const cameraLinkedList  = new THREE.Vector3(0.0, 4, 6.0);
        camera.position.copy(cameraLinkedList);
        camera.rotation.x = -0.75
    }

    if (clickedObj === textObjects.hashTable) {
        const cameraHashTable  = new THREE.Vector3(0.0, 2, 0);
        camera.position.copy(cameraHashTable);
        camera.rotation.y = -Math.PI / 2
        camera.rotation.x = 0.3
    }

    if (clickedObj === textObjects.escLabel) {
        camera.position.copy(cameraStart);
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    }

    clicked = false;

});

//=======================================================
// JUCE Event Listener
//=======================================================
let oldEvent = 2.0;
window.__JUCE__.backend.addEventListener("HiErik", (event) => {
    if (event !== oldEvent) {
        clearOrbs();                      // ← wipe stale orb data first
        //
        event.forEach((orb) => {
            getOrb(orb);
        });
        initializeOrbList(scene)
        oldEvent = event;
    }
});

//=======================================================
// Dispatch to JUCE
//=======================================================
const nativeFunction = Juce.getNativeFunction("nativeFunction");
getNativeFunction(nativeFunction);
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

    // stringPoints.forEach(point => {
    //     animateString(point, elapsedTime);
    //
    // })

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()


