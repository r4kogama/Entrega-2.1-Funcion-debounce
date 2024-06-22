export const debounce = (callbackClick, delay) => {
    let timeOutId = null;
    return (...args) => {
        if (timeOutId !== null) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            callbackClick(...args);
        }, delay);
    };
};
const initialClickEvent = () => {
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', debounce(() => { }, 1000));
};
const init = () => {
    initialClickEvent();
};
window.addEventListener("load", init);
//# sourceMappingURL=index.js.map