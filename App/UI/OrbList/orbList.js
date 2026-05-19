import * as THREE from 'three'
import {mathMaterials} from "../buildingBlocks/materials";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'

const fontLoader = new FontLoader();
const font = await fontLoader.loadAsync("/Fonts/Work Sans Light_Regular.json");
console.log(font);
//=========================================
//Variables
//=========================================
const ballRadius = 0.25;
let testHeight = 2.5;
let positionBegin = -1;
export let orbs = [];
//=========================================
//Initialization
//=========================================

export function getOrb(orb) {
    orbs.push(orb);
}

const min = 0;

export function clearOrbs() {
    orbs = [];
}

let activeOrbGroup = [];

export function initializeOrbList(scene) {

    //remove old orbs
    activeOrbGroup.forEach(group => {
        scene.remove(group);
        group.traverse(child => {
            if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
    });
    activeOrbGroup = [];

    orbs = orbs.filter(value => value > min);

    orbs = orbs.filter(value => value >= min);

    orbs.forEach((value, index) => {
        if (value > 0) {
            const orbGroup = new THREE.Group();

            //=========================================
            //Create Sphere
            //=========================================
            const orbGeometry = new THREE.SphereGeometry(ballRadius,
                32,
                32);
            const orbMaterial = mathMaterials.floorMaterial.clone();
            orbMaterial.color.setHSL(index / orbs.length, 0.8, 0.5);

            const orbMesh = new THREE.Mesh(orbGeometry,
                orbMaterial)
            orbMesh.position.set(positionBegin + index * 0.75, testHeight, 6);
            orbMesh.castShadow = true;
            orbGroup.add(orbMesh);
            //=========================================
            //Create Value Icon
            //=========================================
            const orbValueString = value.toString();
            console.log("String value", orbValueString);

            const orbTextGeometry = new TextGeometry( orbValueString, {
                font: font,
                size: 0.2,
                height: 0.1,
                depth: 0.1,
                curveSegments: 12
            } );

            const orbTextMesh = new THREE.Mesh(orbTextGeometry,
                orbMaterial)
            orbTextMesh.position.set((positionBegin - 0.15) + index * 0.75, testHeight - 0.6, 6);
            orbGroup.add(orbTextMesh);
            scene.add(orbGroup);
            activeOrbGroup.push(orbGroup);
        }
    })
}
