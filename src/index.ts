


export const debounce = (callbackClick : Function, delay: number) =>{
  let timeOut:  NodeJS.Timeout | number ;
  return  (...args : unknown[] ) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      callbackClick(...args);
    }, delay);
  };
}


const  initialClickEvent =  (): void =>{
  let btn : HTMLButtonElement | null = document.querySelector('.btn');
    btn!.addEventListener('click', debounce( ()=>{}, 1000) )
} 


const init = (): void => {
  initialClickEvent()
};
  
window.addEventListener("load", init);