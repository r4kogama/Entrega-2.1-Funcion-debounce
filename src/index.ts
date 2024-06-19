
type restParam = {

}

export const debounce = <T>(callbackClick : (...args : unknown[]) => T , delay: number) =>{
  let timeOutId: NodeJS.Timeout| null  = null ;
  return  (...args : unknown[] ) => {
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