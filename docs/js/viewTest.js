"use strict";
const debounceVisualTest = (callbackClick, delay, contentAction) => {
    let timeOutId = null;
    let noEmit = false;
    let cont = 0;
    return (...args) => {
        console.log('variableID: ' + timeOutId);
        if (timeOutId !== null) {
            clearTimeout(timeOutId);
        }
        ++cont;
        timeOutId = setTimeout(() => {
            try {
                if (noEmit) {
                    noEmit = false;
                    if (cont > 1) {
                        contentAction.innerHTML = "tu peticion ha sido debounceda...";
                        throw new Error('En la peticion debounceada el usuario ha clickado: ' + cont + ' veces');
                    }
                }
                else {
                    callbackClick(...args);
                    noEmit = true;
                    if (cont <= 1) {
                        contentAction.innerHTML = "Ha hecho click correctamente.. action emitida";
                        throw new Error('El usuario a clickado!... y se le ha contado: ' + cont);
                    }
                }
            }
            catch (error) {
                console.log(error);
                cont = 0;
            }
        }, delay);
    };
};
const clickDebounceTestVisual = () => {
    let contentAction = document.querySelector('.action');
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', debounceVisualTest(() => { }, 1000, contentAction));
};
const init = () => {
    clickDebounceTestVisual();
};
window.addEventListener("load", init);
//# sourceMappingURL=viewTest.js.map