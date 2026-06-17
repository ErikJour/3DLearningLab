// ========== CONTEXT MENU ==========
import {physicsObjects} from "../buildingBlocks/objects";
import {createButtonItem} from "./menuHelpers";

let contextMenu = null;

export function createLinkedListMenu(x, y) {
    removeLinkedListMenu();

    //=================================================
    //Primary menu
    //=================================================
    contextMenu = document.createElement('div');
    contextMenu.style.cssText = `
            position: absolute;
            left: 100px;
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
    contextMenu.appendChild(question);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
        `;

    //Buttons
    const appendButton = createButtonItem('append', "appendOrb");
    const middleButton = createButtonItem('Find Mid', "findMiddle");
    const binaryButton = createButtonItem('Binary', 'binaryToDecimal');
    const deleteButton = createButtonItem('Delete', 'deleteOrb');
    const reverseButton = createButtonItem('Reverse', 'reverseOrbs');
    const removeDuplicateButton = createButtonItem('Remove Dups', 'removeDuplicates');
    const partitionList = createButtonItem('Partition', 'partitionList');

    //=================================================
    //Cancel
    //=================================================
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
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
    cancelButton.addEventListener('mouseenter', () => {
        cancelButton.style.background = '#f0d4d0';
    });
    cancelButton.addEventListener('mouseleave', () => {
        cancelButton.style.background = 'transparent';
    });
    cancelButton.onclick = () => {
        removeLinkedListMenu();
    };

    buttonContainer.appendChild(appendButton);
    buttonContainer.appendChild(partitionList);
    buttonContainer.appendChild(binaryButton);
    buttonContainer.appendChild(removeDuplicateButton);
    buttonContainer.appendChild(middleButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(reverseButton);
    buttonContainer.appendChild(cancelButton);
    contextMenu.appendChild(buttonContainer);

    document.body.appendChild(contextMenu);
}

function removeLinkedListMenu() {
    if (contextMenu && contextMenu.parentNode) {
        contextMenu.parentNode.removeChild(contextMenu);
        contextMenu = null;
    }
}

export const onLinkedListMenu = (event, raycaster, mouse, camera) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([physicsObjects.button], true);
    if (intersects.length > 0) {
        event.preventDefault();
        createLinkedListMenu(event.clientX, event.clientY);
    }
};

