
type Args = (...args : any[]) => any;

//TEST BEBOUNCE PRUEBAS DE FUNCIONAMIENTO
// Esta logica de programacion ayuda de manera visual  a ver el funcionamiento del debounce en un evento click

const debounceVisualTest = (callbackClick : Args, delay: number, contentAction: HTMLDivElement | null):  ((...args: Parameters<Args>) => void) =>{
    let timeOutId:  NodeJS.Timeout | null = null ;
    let noEmit: boolean = false;
    let cont: number = 0;
    return  (...args : Parameters<Args> ) => {
      console.log('variableID: '+ timeOutId)
      if(timeOutId !== null){//cancela si no es null
        clearTimeout(timeOutId);
      }
      ++cont;
      timeOutId = setTimeout(() => {
        try{
          if(noEmit){ 
            noEmit = false;
            if(cont > 1){
              contentAction!.innerHTML = "tu peticion ha sido debounceda...";
              throw new Error ('En la peticion debounceada el usuario ha clickado: '+cont+' veces' );
            }
          }else{
            callbackClick(...args);
            noEmit = true;
            if(cont <= 1){
              contentAction!.innerHTML = "Ha hecho click correctamente.. action emitida";
              throw new Error ('El usuario a clickado!... y se le ha contado: '+cont );
            }
          }
        }catch(error: unknown){
          console.log(error);
           cont = 0;
        } 
      }, delay);
    };
  }
  

  const  clickDebounceTestVisual =  (): void =>{
    let contentAction : HTMLDivElement | null = document.querySelector('.action');
    let btn : HTMLButtonElement | null = document.querySelector('.btn');
      btn!.addEventListener('click', debounceVisualTest( ()=>{}, 1000, contentAction) )
  } 

  const init = (): void => {
    clickDebounceTestVisual();
  };


  window.addEventListener("load", init);