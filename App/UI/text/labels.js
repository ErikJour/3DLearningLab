import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const PI = 3.14;
/**
 * Fonts
 */
const fontLoader = new FontLoader();

export function initializeText(scene) {

    //===============================================
    //Font Loader
    //===============================================
    fontLoader.load(
        "/Fonts/Work Sans Light_Regular.json",
        (font) =>
        {
            console.log('font loaded', font);  // ← does this fire?

            const textGeometry = new TextGeometry(
                'LinkedList',
                {
                    font: font,
                    size: 0.2,
                    height: 0.1,
                    depth: 0.02,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.002,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            )
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const text = new THREE.Mesh(textGeometry, textMaterial)
            console.log(textGeometry.boundingBox)
            textGeometry.computeBoundingBox();
            textGeometry.center();
            text.position.set(0, -1.2, 4.5);
            text.rotation.x = -PI / 2;
            scene.add(text)
        }
    )
}






