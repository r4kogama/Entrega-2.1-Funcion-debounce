/** @jest-environment jsdom */
import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { debounce } from '../src/index';
import { afterEach } from 'node:test';
import { Jest } from '@jest/environment';



 describe('Testing debounce: limitar la cantidad de veces que se ejecuta una accion', () => {
   type Arguments = (...args : any[]) => void;
   let fnCallback: Arguments;
   let time: Jest;
   let resultDebounce: Arguments;
   let clearTimeId:NodeJS.Timeout | null;
    //limpiar temporizadores o variables 
    //crear funcion de prueba con cualquier variable
   beforeEach( () =>{ 
    //crear funcion con metodo .fn
    fnCallback = jest.fn();
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
  
    it('Varias llamadas simultaneas, como resultado ninguna ejecucion', () =>{
      resultDebounce();
      resultDebounce();
      resultDebounce();
      expect(fnCallback).toHaveBeenCalledTimes(0);
    })
  
    it('varias llamadas simultaneas, se incrementa el retardo o inactividad y como resultado se ejecuta 1 vez',()=>{
      resultDebounce();
      resultDebounce();
      time.advanceTimersByTime(1500);
      resultDebounce();
      expect(fnCallback).toHaveBeenCalled();
      expect(fnCallback).toHaveBeenCalledTimes(1);
    });

    it('Se disminuye el tiempo de retardo o inactividad desde la ultima llamada, como resultado nunca se ejecuta',()=>{
      resultDebounce();
      time.advanceTimersByTime(100);
      resultDebounce();
      expect(fnCallback).toHaveBeenCalledTimes(0);
    });
    
    it('Varias llamadas con un tiempo de retraso incrementado entre ellas, como resultado se ejecuta 2 vez', () =>{
      resultDebounce();
      time.advanceTimersByTime(2000);
      expect(fnCallback).toHaveBeenCalled();
      resultDebounce();
      time.advanceTimersByTime(2000);
      expect(fnCallback).toHaveBeenCalledTimes(2);
    })


    it('Se cancela la llamada al debounce si se llama varias veces, dando como resultado ninguna ejecucion real', () =>{
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
      time.runOnlyPendingTimers()
      expect(fnCallback).toHaveBeenCalled();
      resultDebounce();
      expect(fnCallback).toHaveBeenCalledTimes(1)
    })

  }) 
