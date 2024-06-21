
type Args = (...args : any[]) => void;

export const debounce = <T>(callbackClick : Args , delay: number): ((...args: Parameters<Args>) => void) =>{
  let timeOutId: NodeJS.Timeout | null = null ;
  return  (...args : Parameters<Args>) => {
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