import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import {mathMaterials} from "../buildingBlocks/materials";
import {neutraColors} from "../buildingBlocks/colors";
import {addHitBox} from "../helpers/addHitBox";


const PI = 3.14;
/**
 * Fonts
 */
const fontLoader = new FontLoader();

export const textObjects = {
    linkedList: null,
    hashTable: null,
    escLabel: null,
    linkedListHitBox: null,
    hashTableHitBox: null,
    escLabelHitBox: null
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
                                        4.4,
                                        mathMaterials.linkedListMaterial
                        )
                    linkedListLabel.rotation.x = -PI / 2;
                    textObjects.linkedList = linkedListLabel;
                    scene.add(textObjects.linkedList);
                    textObjects.linkedListHitBox = addHitBox(textObjects.linkedList, {x: 1.25, y: 0.5, z: 0.5});
                    textObjects.linkedListHitBox.position.set(-0.25, 0, 0);
                    resolve(linkedListLabel);
                    //=================
                    //Hash Table
                    //=================
                    const hashTableLabel = createTextLabel(font,
                        'Hash Table',
                        4,
                        0.,
                        3,
                        mathMaterials.hashTableMaterial
                    )
                    hashTableLabel.rotation.y = -PI / 2;
                    hashTableLabel.rotation.x = 0.3;
                    textObjects.hashTable = hashTableLabel;
                    scene.add(textObjects.hashTable);
                    textObjects.hashTableHitBox = addHitBox(textObjects.hashTable);
                    resolve(hashTableLabel);

                    //=================
                    //Esc Table
                    //=================
                    const escLabel = createTextLabel(font,
                        'Esc',
                        2.425,
                        -1.4,
                        -2,
                        mathMaterials.escLabelMaterial
                    )
                    textObjects.escLabel = escLabel;
                    textObjects.escLabel.scale.set(0.5, 0.5, 0.5)
                    camera.add(textObjects.escLabel);
                    textObjects.escLabelHitBox = addHitBox(textObjects.escLabel, {x: 0.5, y: 0.25, z: 0.5});
                    resolve(escLabel);
                })
        }
    )}

function createTextLabel(font, text, positionX, positionY, positionZ, material) {

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
            material)

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







