

//TEST BEBOUNCE PRUEBAS DE FUNCIONAMIENTO
// Esta logica de programacion ayuda de manera visual  a ver el funcionamiento del debounce en un evento click

const debounceVisualTest = (callbackClick : Function, delay: number, contentAction: HTMLDivElement | null) =>{
    let timeOut:  NodeJS.Timeout | number ;
    let noEmit: boolean = false;
    let cont: number = 0;
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
            callbackClick(...args);
            if(cont <= 1){
              contentAction!.innerHTML = "Ha hecho click correctamente.. action emitida";
            }
            noEmit = true;
            throw new Error ('El usuario a clickado!... y se le ha contado: '+cont );
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