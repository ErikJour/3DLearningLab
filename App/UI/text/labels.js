import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import {mathMaterials} from "../buildingBlocks/materials";
import {neutraColors} from "../buildingBlocks/colors";

const PI = 3.14;
/**
 * Fonts
 */
const fontLoader = new FontLoader();

export const textObjects = {
    linkedList: null,
    hashTable: null,
    escLabel: null
};


export function initializeText(scene, camera) {
    return new Promise((resolve) => {
            fontLoader.load(
                "/Fonts/Work Sans Light_Regular.json",
                (font) =>
                {
                    //=================
                    //Linked List
                    //=================
                    const linkedListLabel = createTextLabel(font,
                                                                                                'linkedlist',
                                        0,
                                        -1.1,
                                        4.4
                        )
                    linkedListLabel.rotation.x = -PI / 2;
                    textObjects.linkedList = linkedListLabel;
                    scene.add(textObjects.linkedList);
                    resolve(linkedListLabel);
                    //=================
                    //Hash Table
                    //=================
                    const hashTableLabel = createTextLabel(font,
                        'Hash Table',
                        4,
                        0.,
                        3
                    )
                    hashTableLabel.rotation.y = -PI / 2;
                    hashTableLabel.rotation.x = 0.3;
                    textObjects.hashTable = hashTableLabel;
                    scene.add(textObjects.hashTable);
                    resolve(hashTableLabel);

                    //=================
                    //Esc Table
                    //=================
                    const escLabel = createTextLabel(font,
                        'Esc',
                        2,
                        -1,
                        -2.5
                    )
                    textObjects.escLabel = escLabel;
                    camera.add(textObjects.escLabel);
                    resolve(escLabel);
                })
        }
    )}

function createTextLabel(font, text, positionX, positionY, positionZ) {

    const textGeometry = new TextGeometry(
        text,
        {
            font: font,
            size: 0.2,
            height: 0.001,
            depth: 0.02,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.003,
            bevelSize: 0.002,
            bevelOffset: 0,
            bevelSegments: 5
        })
        const label = new THREE.Mesh(textGeometry,
                                                                                mathMaterials.floorMaterial)
        textGeometry.computeBoundingBox()
        textGeometry.center();
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
        )
        console.log("Text object inside initialize text", text);
        label.position.set(positionX, positionY, positionZ);
    return label;

}







