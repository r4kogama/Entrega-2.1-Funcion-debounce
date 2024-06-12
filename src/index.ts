
 const debounceClick = (callbackClick : Function, delay: number, contentAction: HTMLDivElement | null) =>{
  let timeOut: number;
  
  return  (...args : unknown[] ) => {
    clearTimeout(timeOut);
    ++cont;
    timeOut = setTimeout(() => {
      try{
        if(noEmit){ 
          if(cont > 1){
            contentAction!.innerHTML = "tu peticion ha sido debounceda, ni te molestes...";
          }
          noEmit = false;
          throw new Error ('el usuario ha clickado varias veces: '+cont );
        }else{
          callbackClick(...args)
          noEmit = true;
          if(cont <= 1){
            contentAction!.innerHTML = "Ha hecho click correctamente.. action emitida";
          }
          throw new Error ('El usuario a clickado!... y se le ha contado: '+cont );
        }
      }catch(error: unknown){
        console.log(error);
        cont = 0;
      } 
    }, delay);
  };
}


let noEmit: boolean = false;
let cont: number = 0;

const  preventClickButton =  <T>(): void =>{
  let contentAction : HTMLDivElement | null = document.querySelector('.action');
  let btn : HTMLButtonElement | null = document.querySelector('.btn');
    btn!.addEventListener('click', debounceClick( ()=>{}, 1000, contentAction) )
} 



const init = (): void => {
    preventClickButton();
  };
  
window.addEventListener("load", init);