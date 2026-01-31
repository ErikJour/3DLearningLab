import * as THREE from 'three'
import {neutraColors} from "./colors";

export function initLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight);

// Spotlight
    const spotLight = new THREE.DirectionalLight(neutraColors.paleSkyBlue, 0.5);
    spotLight.position.set(2, 15, -2);
    spotLight.castShadow = true;
    scene.add(spotLight)

// Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(2, 10, - 1)
    scene.add(directionalLight)

    // directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 2
    directionalLight.shadow.camera.far = 10
    directionalLight.shadow.camera.left = 3.5
    directionalLight.shadow.camera.top = 2
    directionalLight.shadow.camera.right = -3.5
    directionalLight.shadow.camera.bottom = -2

    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    directionalLightCameraHelper.visible = false;
    scene.add(directionalLightCameraHelper)
}