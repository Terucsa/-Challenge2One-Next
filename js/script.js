;(function(){
    'use strict'
    
    var juego = {
      palabra: 'ALURA',
      estado: 1,
      adivinado: ['A', 'L'],
      errado: ['B', 'J', 'K', 'C']
    }
    
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
        adivinar(juego, letra);
        dibujar(juego);
      }
      
    
   
    
}());