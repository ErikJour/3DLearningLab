// ========== CONTEXT MENU ==========
import {physicsObjects} from "../buildingBlocks/objects";
import {createButtonItem} from "./menuHelpers";

let hashTableMenu = null;

export function createHashTableMenu(x, y) {
    removeHashTableMenu();

    //=================================================
    //Primary menu
    //=================================================
    hashTableMenu = document.createElement('div');
    hashTableMenu.style.cssText = `
            position: absolute;
            right: 100px;
            top: 1750;
            background: #E5DDD3;
            border: 2px solid #B04A3A;
            border-radius: 6px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            font-family: system-ui, -apple-system, sans-serif;
            text-align: center;
            z-index: 10000;
        `;

    const question = document.createElement('div');
    question.style.cssText = `
            font-size: 14px;
            font-weight: 600;
            color: #4A4A4A;
            margin-bottom: 12px;
        `;
    hashTableMenu.appendChild(question);

    const hashTableContainer = document.createElement('div');
    hashTableContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
        `;

    //Buttons for Hash Table Functions
    const printTable = createButtonItem('Print', "printTable");
    const itemsinCommon = createButtonItem('In Common', "itemsInCommon");
    const findDuplicates = createButtonItem('Duplicates', "findDuplicates");

    //=================================================
    //Cancel
    //=================================================
    const cancelHtButton = document.createElement('button');
    cancelHtButton.textContent = 'Cancel';
    cancelHtButton.style.cssText = `
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            border: 2px solid #B04A3A;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            background: transparent;
            color: #4A4A4A;
        `;
    cancelHtButton.addEventListener('mouseenter', () => {
        cancelHtButton.style.background = '#f0d4d0';
    });
    cancelHtButton.addEventListener('mouseleave', () => {
        cancelHtButton.style.background = 'transparent';
    });
    cancelHtButton.onclick = () => {
        removeHashTableMenu();
    };

    hashTableContainer.appendChild(printTable);
    hashTableContainer.appendChild(itemsinCommon);
    hashTableContainer.appendChild(findDuplicates);
    hashTableContainer.appendChild(cancelHtButton);
    hashTableMenu.appendChild(hashTableContainer);
    document.body.appendChild(hashTableMenu);
}

function removeHashTableMenu() {
    if (hashTableMenu && hashTableMenu.parentNode) {
        hashTableMenu.parentNode.removeChild(hashTableMenu);
        hashTableMenu = null;
    }
}

export const onHashTableMenu = (event, raycaster, mouse, camera) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([physicsObjects.hashTableButtonHitBox], true);
    if (intersects.length > 0) {
        event.preventDefault();
        createHashTableMenu(event.clientX, event.clientY);
    }
};

