;(function(){
  'use strict'
  var palabras = [
    'ALURA',
    'NIÑO',
    'AFINIDAD',
    'PROGRAMAR',
    'YOUTUBE',
    'ORACLE'
  ]
  //!Variable para almacenar la configuración
  var juego = null
  //!Para ver si ya se ha enviado alguna alerta
  var finalizado = false

  var $html = {
    hombre: document.querySelector('#hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
  }
  
  function dibujar(juego) {
    // Actualizar la imagen del hombre
    var $elem
    $elem = $html.hombre
    $elem.src = '/img/0' + juego.estado + '.png'
  
    // Creamos las letras adivinadas
    var estado = juego.estado
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    //Borrador de los elementos
    $elem = $html.adivinado
    $elem.innerHTML = ''
    for (let letra of palabra) {
      let $span = document.createElement('span')
      let $txt = document.createTextNode('')
      if (adivinado.indexOf(letra) >= 0) {
        $txt.nodeValue = letra
      }
      $span.setAttribute('class', 'letra-adi')
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
    //Creamos las letras erradas
    var errado = juego.errado
    $elem = $html.errado
    //Borrador de los elementos
    $elem.innerHTML = ''
    for (let letra of errado){
      let $span = document.createElement('span')
      let $txt = document.createTextNode(letra)
      $span.setAttribute('class', 'letra-errada')
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
    }

    //Aquí ya se comienza a programar toda la logica de el juego Ahorcado
    function adivinar(juego, letra){
      var estado = juego.estado
      //si ya se a perdido o ganado, no hay nda que hacer
      if(estado === 1 || estado === 8){
        return
      }
      var adivinado = juego.adivinado
      var errado = juego.errado
      //Si ya adivinado o errado la palabra no hay que hacer nada
      if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
            return
          }
      
      var palabra = juego.palabra
      var letras = juego.letra
      if (palabra.indexOf(letra) >= 0){
        let ganado = true;
        //?De vemos ver si ganamos
        for(let le of palabra){
          if(adivinado.indexOf(le) < 0 && le === letra){
            ganado = false;
            break
          }
        }
        if(ganado){
          juego.estado = 8
        }
        //agreas letras a listas adivinadas
        adivinado.push(letra)
      }else{
        //hacercamos al hombre un paso mas
        juego.estado--
        //agregamos la letra a las erradas
        errado.push(letra)
      }
    }

    window.onkeypress = function  adivinarLetra(e){
      var letra = e.key
      letra = letra.toUpperCase()
      if (/[^A-ZÑ]/.test(letra)){
        return
      }
      adivinar(juego, letra)
      var estado = juego.estado
      if(estado === 8 && !finalizado){
        setTimeout(ganoAlert, 0)
        finalizado = true
      }else if(estado === 1 && !finalizado){
        let palabra = juego.palabra
        let fn1 = alertaPerdio.bind(undefined, palabra)
        setTimeout(fn1, 0)
        finalizado = true
      }
      dibujar(juego);
    }

    window.nuevoJuego = function nuevoJuego(){
      var palabra = palabraAleatoria()
      juego = {}
      juego.palabra = palabra
      juego.estado = 7
      juego.adivinado = []
      juego.errado = [] 
      finalizado = false
      dibujar(juego)
    }

    //**Funciones cuando la alerta funcione */
  function palabraAleatoria(){
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
  }
  function ganoAlert(){
    alert('Felicidades, Ganaste');
  }
  function alertaPerdio(palabra){
    alert('Losiento Perdiste. La palabra era: '  +  palabra)
  }
 nuevoJuego()
  
}())
