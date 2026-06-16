import * as THREE from 'three'


export function addHitBox(target, size = {x: 1, y: 0.5, Z: 0.01}) {
    const hitBoxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const hitBoxMaterial = new THREE.MeshBasicMaterial({
        visible:   false,
        color:     0xff000,
        wireframe: true,
    });
    const hitBoxMesh = new THREE.Mesh(hitBoxGeometry, hitBoxMaterial);
    hitBoxMesh.userData.isCollider = true;
    const hitBoxScale = target.getWorldScale(new THREE.Vector3());
    hitBoxMesh.scale.set(1 / hitBoxScale.x, 1 / hitBoxScale.y, 0.5 / hitBoxScale.z);
    hitBoxMesh.position.set(0, 0, 0);
    target.add(hitBoxMesh);
    return hitBoxMesh;
}