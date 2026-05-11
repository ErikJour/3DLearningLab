import * as THREE from 'three'
import {mathMaterials} from "./materials";

const ballRadius = 0.25;
const buttonRadius = 0.15;

let testHeight = 5;
let positionBegin = 0;

export const physicsObjects = {
    objectGroup: null,
    sphere: null,
    button: null
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
    const buttonMesh = new THREE.Mesh(redButton, mathMaterials.floorMaterial);
    buttonMesh.position.set(4.75, -1.45, 4.75)
    physicsObjects.button = buttonMesh;
    scene.add(physicsObjects.button);


}

