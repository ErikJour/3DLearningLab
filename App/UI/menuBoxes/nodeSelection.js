// ========== CONTEXT MENU ==========
import {physicsObjects} from "../buildingBlocks/objects";

let contextMenu = null;

let mNativeFunction = null;

export function getNativeFunction(nativeFunction)
{
    mNativeFunction = nativeFunction;
    console.log("Got native function");
}

export function createContextMenu(x, y) {
    removeContextMenu();

    //=================================================
    //Primary menu
    //=================================================
    contextMenu = document.createElement('div');
    contextMenu.style.cssText = `
            position: absolute;
            left: 500px;
            top: ${y}px;
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
            justify-content: center;
            gap: 8px;
        `;

    //=================================================
    //Append Node
    //=================================================
    const appendButton = document.createElement('button');
    appendButton.textContent = 'Append Node';
    appendButton.style.cssText = `
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            background: #c75a5a;
            color: white;
        `;
    appendButton.addEventListener('mouseenter', () => {
        appendButton.style.background = '#b04545';
    });
    appendButton.addEventListener('mouseleave', () => {
        appendButton.style.background = '#c75a5a';
    });
    appendButton.onclick = () => {
        mNativeFunction(["appendOrb"]);
    };

    //=================================================
    //Find Middle
    //=================================================
    const middleButton = document.createElement('button');
    middleButton.textContent = 'Find Middle';
    middleButton.style.cssText = `
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            background: #c75a5a;
            color: white;
        `;
    middleButton.addEventListener('mouseenter', () => {
        middleButton.style.background = '#b04545';
    });
    middleButton.addEventListener('mouseleave', () => {
        middleButton.style.background = '#c75a5a';
    });
    middleButton.onclick = () => {
        mNativeFunction(["findMiddle"]);
    };

    //=================================================
    //Delete Node
    //=================================================
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Node';
    deleteButton.style.cssText = `
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            background: #e25a1f;
            color: white;
        `;
    deleteButton.addEventListener('mouseenter', () => {
        deleteButton.style.background = '#b04545';
    });
    deleteButton.addEventListener('mouseleave', () => {
        deleteButton.style.background = '#c75a5a';
    });
    deleteButton.onclick = () => {
        mNativeFunction(["deleteOrb"]);

    };
    //=================================================
    //Reverse
    //=================================================
    const reverseButton = document.createElement('button');
    reverseButton.textContent = 'Reverse';
    reverseButton.style.cssText = `
             padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            background: #e25a1f;
            color: white;
        `;
    reverseButton.addEventListener('mouseenter', () => {
        reverseButton.style.background = '#f0d4d0';
    });
    reverseButton.addEventListener('mouseleave', () => {
        reverseButton.style.background = 'transparent';
    });
    reverseButton.onclick = () => {
        mNativeFunction(["reverseOrbs"]);
    };
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
        removeContextMenu();
    };

    buttonContainer.appendChild(appendButton);
    buttonContainer.appendChild(middleButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(reverseButton);
    buttonContainer.appendChild(cancelButton);
    contextMenu.appendChild(buttonContainer);

    document.body.appendChild(contextMenu);
}

function removeContextMenu() {
    if (contextMenu && contextMenu.parentNode) {
        contextMenu.parentNode.removeChild(contextMenu);
        contextMenu = null;
    }
}

export const onContextMenu = (event, raycaster, mouse, camera) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([physicsObjects.button], true);
    if (intersects.length > 0) {
        event.preventDefault();
        createContextMenu(event.clientX, event.clientY);
    }
};

