

let mNativeFunction = null;

export function getNativeFunction(nativeFunction)
{
    mNativeFunction = nativeFunction;
    console.log("Got native function");
}

export function createButtonItem(stringName, nativeFunctionName)
{
    const button = document.createElement('button');
    button.textContent = stringName;
    button.style.cssText = `
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
    button.addEventListener('mouseenter', () => {
        button.style.background = '#b04545';
    });
    button.addEventListener('mouseleave', () => {
        button.style.background = '#c75a5a';
    });
    button.onclick = () => {
        mNativeFunction([nativeFunctionName]);
    };
    return button;
}