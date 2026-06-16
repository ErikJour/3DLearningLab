import * as THREE from 'three'
import {mathMaterials} from "./materials";
import {addHitBox} from "../helpers/addHitBox";

const ballRadius = 0.25;
const buttonRadius = 0.15;

let testHeight = 5;
let positionBegin = 0;

export const physicsObjects = {
    objectGroup: null,
    sphere: null,
    button: null,
    buttonHitBox: null
};

export function initializeObjects(scene) {
    //Physic ball
    const sphereObject = new THREE.SphereGeometry(ballRadius, 32, 32);
    const sphereMesh = new THREE.Mesh(sphereObject, mathMaterials.floorMaterial)
    sphereMesh.position.set(positionBegin, testHeight, 1);
    sphereMesh.castShadow = true;
    physicsObjects.sphere = sphereMesh;
    // scene.add(physicsObjects.sphere);

    //Click Button
    const redButton = new THREE.SphereGeometry(buttonRadius, 32, 32);
    const buttonMesh = new THREE.Mesh(redButton, mathMaterials.buttonMaterial);
    buttonMesh.position.set(0.5, -1.2, 4.425)
    physicsObjects.button = buttonMesh;
    physicsObjects.buttonHitBox = addHitBox(physicsObjects.button, {x: 0.3, y: 0.5, z: 0.5});
    scene.add(physicsObjects.button);

}

