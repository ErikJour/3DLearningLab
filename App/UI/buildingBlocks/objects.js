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
    buttonHitBox: null,
    hashTableButton: null,
    hashTableButtonHitBox: null
};

export function initializeObjects(scene) {

    //LinkedList Button
    const redButton = new THREE.SphereGeometry(buttonRadius, 32, 32);
    const buttonMesh = new THREE.Mesh(redButton, mathMaterials.buttonMaterial);
    buttonMesh.position.set(0.5, -1.2, 4.425)
    physicsObjects.button = buttonMesh;
    physicsObjects.buttonHitBox = addHitBox(physicsObjects.button, {x: 0.3, y: 0.5, z: 0.5});
    scene.add(physicsObjects.button);

    //HashTable Button
    const hashTableButtonGeo = new THREE.SphereGeometry(buttonRadius, 32, 32);
    const hashTableButtonMesh = new THREE.Mesh(hashTableButtonGeo,
                                                                                        mathMaterials.buttonMaterial);
    hashTableButtonMesh.position.set(4.6, -0.55, 4)
    physicsObjects.hashTableButton = hashTableButtonMesh;
    physicsObjects.hashTableButtonHitBox = addHitBox(physicsObjects.hashTableButton, {x: 0.3, y: 0.5, z: 0.5});
    scene.add(physicsObjects.hashTableButton);

}

