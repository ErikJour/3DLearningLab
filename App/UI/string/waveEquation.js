import * as THREE from 'three'
import {mathMaterials} from "../buildingBlocks/materials";
import {sineParams} from "../sinusoidalMotion/tuningForkViz"
export const stringPoints = [];

export function waveEquation(position, time) {
    return Math.cos(2 * sineParams.PI * sineParams.mFrequency * time)
        * Math.sin(sineParams.PI * position / sineParams.mLength);
}

export function animateString(object, time) {
    let string = waveEquation(object.position.x, time);
    let heightAdjustment = 5;
    object.position.y = string + heightAdjustment;
}

export function initializeString(scene, numPoints = 1000) {
    const stringLength = sineParams.mLength;
    for (let i = 0; i <= numPoints; i++) {
        const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const pointMaterial = mathMaterials.redMaterial;
        const point = new THREE.Mesh(pointGeometry, pointMaterial);

        point.position.x = ((i / numPoints) * stringLength) - 5;
        point.position.y = 5;
        point.position.z = 0;
        point.castShadow = true;

        scene.add(point);
        stringPoints.push(point);
    }
}