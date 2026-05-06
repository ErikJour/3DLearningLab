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
let positionBegin = 0;
//=========================================
//Initialization
//=========================================
export function initializeOrbList(value, scene) {

    if (value > 0) {
        const orbGroup = new THREE.Group();
    //=========================================
    //Check Orb Value
    //=========================================


    console.log("Orb Value", value);
        //=========================================
        //Create Sphere
        //=========================================
        const orbGeometry = new THREE.SphereGeometry(ballRadius,
            32,
            32);
        const orbMesh = new THREE.Mesh(orbGeometry,
            mathMaterials.floorMaterial)
        orbMesh.position.set(positionBegin, testHeight, 6);
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
            mathMaterials.floorMaterial)
        orbTextMesh.position.set(positionBegin - 0.25, testHeight - 0.6, 6);
        orbGroup.add(orbTextMesh);
        scene.add(orbGroup);
    }
}