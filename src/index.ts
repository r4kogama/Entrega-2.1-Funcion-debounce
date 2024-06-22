
type Args <T extends any[]> = (...args : T) => void;

export const debounce = <T extends any[]>(callbackClick : Args<T> , delay: number): Args<T> =>{
  let timeOutId: NodeJS.Timeout | null = null ;
  return  (...args : T) => {
    if(timeOutId !== null){
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
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