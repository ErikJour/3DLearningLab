import * as THREE from 'three'
import {mathMaterials} from "./materials";

const floorWidth = 10;
const floorThickness = 0.5;
const geoSegments = 16;
const wallHeight = floorWidth / 2;
let levelGroup = null;


export function initLevel(scene) {

    levelGroup = new THREE.Group();
    let floor;
    function createWall(width, thickness, height) {
        let floor = new THREE.BoxGeometry(width,
            thickness,
            height);
        floor = new THREE.Mesh(floor, mathMaterials.threeMaterial);
        floor.receiveShadow = true;
        return floor;
    }

    const bottomFloor = createWall(floorWidth, floorThickness, floorWidth);
    bottomFloor.position.y = 0
    bottomFloor.position.z = 0;
    bottomFloor.receiveShadow = true
    levelGroup.add(bottomFloor);

    const backWall = createWall(floorWidth + floorThickness, floorThickness, wallHeight);
    backWall.rotation.x = Math.PI / 2;
    backWall.position.y = wallHeight / 2 - floorThickness / 2;
    backWall.position.z = (floorWidth / 2) + floorThickness / 2
    backWall.position.x = -floorThickness / 2;
    levelGroup.add(backWall);

    const leftWall = createWall(floorWidth, floorThickness, wallHeight);
    leftWall.rotation.x = Math.PI / 2;
    leftWall.rotation.z = Math.PI / 2;
    leftWall.position.y = wallHeight / 2 - floorThickness / 2;
    leftWall.position.z = 0;
    leftWall.position.x = floorWidth / 2 - floorThickness / 2;
    levelGroup.add(leftWall);

    const rightWall = createWall(floorWidth, floorThickness, wallHeight);
    rightWall.rotation.x = Math.PI / 2;
    rightWall.rotation.z = Math.PI / 2;
    rightWall.position.y = wallHeight / 2 - floorThickness / 2;
    rightWall.position.z = 0;
    rightWall.position.x = -floorWidth / 2 - floorThickness / 2;
    levelGroup.add(rightWall);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        mathMaterials.floorMaterial
    )
    sphere.castShadow = true
    scene.add(levelGroup);
    levelGroup.rotation.x = -0.5;



}