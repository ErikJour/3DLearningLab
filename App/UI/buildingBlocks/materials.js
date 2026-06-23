import * as THREE from 'three'
import {neutraColors} from "./colors";

export const mathMaterials = {

            floorMaterial: new THREE.MeshStandardMaterial({
            color: neutraColors.terracotta
             }),

            threeMaterial: new THREE.MeshStandardMaterial({
                roughness: 0.7,
                color: neutraColors.charcoalGray
            }),

            buttonMaterial: new THREE.MeshBasicMaterial({
                color: neutraColors.terracotta
            }),

            linkedListMaterial: new THREE.MeshBasicMaterial({
                color: neutraColors.sunlitSand
            }),

            escLabelMaterial: new THREE.MeshBasicMaterial({
                color: neutraColors.sunlitSand
            }),

            hashTableMaterial: new THREE.MeshBasicMaterial({
                color: neutraColors.sunlitSand
            }),

            hashTableButtonMaterial: new THREE.MeshBasicMaterial({
                color: neutraColors.terracotta
    })


}