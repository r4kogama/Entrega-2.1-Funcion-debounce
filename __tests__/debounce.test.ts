/** @jest-environment jsdom */
import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { debounce } from '../src/index';
import { Mock } from 'jest-mock';
import { afterEach } from 'node:test';



 describe('Testing debounce', () => {
   let fnCallback: (...args: unknown[]) => void;
   let time: any;
   let resultDebounce: (...args: unknown[]) => void;
   let clearTimeId:NodeJS.Timeout | null;
    //limpiar temporizadores o variables 
    //crear funcion de prueba con cualquier variable
   beforeEach( () =>{ 
    //crear funcion con metodo .fn
    fnCallback = jest.fn(() => { console.log('done!')})
    //la funcion  pasa metodo debounce que actuara como callback 
    resultDebounce = debounce(fnCallback, 1000);
    //el retorno de debounce es guardado en una variable
    time = jest.useFakeTimers();
    clearTimeId = null;
  });

  //reinicia los temporizadores
  afterEach(() => {
    jest.clearAllTimers();
  })
  
    it('Llamar a la funcion debounce varias veces, dando como resultado almenos una ejecucion independiente de las veces', () =>{
      resultDebounce();
      resultDebounce();
      resultDebounce();
      time.runOnlyPendingTimers()//en tareas asincronas ejecutando los pedientes
      expect(fnCallback).toHaveBeenCalled();
    })
  
    it('Llama a la fn debounce, se incrementa el retardo o inactividad y recibe una respuesta',()=>{
      resultDebounce();
      time.advanceTimersByTime(1500);
      expect(fnCallback).toHaveBeenCalledTimes(1);
    });
    
    it('Llama a la fn debounce, se incrementa el periodo de inactividad o retardo, pero se ejecutara  una vez', () =>{
      resultDebounce();
      time.advanceTimersByTime(2000);
      resultDebounce();
      time.advanceTimersByTime(500);
      expect(fnCallback).toHaveBeenCalledTimes(1)
    })


    it('Se cancela la llamada al debounce si se llama varias veces, dando como resultado una vez de ejecucion real', () =>{
      resultDebounce();
      resultDebounce();
      resultDebounce();
      if(clearTimeId !== null){
        time.clearAllTimers();
      }
      resultDebounce();
      expect(fnCallback).toHaveBeenCalledTimes(0)
    })

    it('Se cancela la llamada al debounce si se llama varias veces, pero si hay un tiempo de espera despues de la cancelacion da como resultado una vez de ejecucion real', () =>{
      resultDebounce();
      resultDebounce();
      resultDebounce();
      if(clearTimeId !== null){
        time.clearAllTimers();
      }
      time.advanceTimersByTime(2000);
      resultDebounce();
      expect(fnCallback).toHaveBeenCalledTimes(1)
    })

  }) 
