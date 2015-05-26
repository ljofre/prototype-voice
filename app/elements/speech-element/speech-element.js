Polymer({
      ready: function () {
            var voice = this.$.voice;
            var speechInput = this.$.speechInput;
            var speechMic = this.$.speechMic;
            var speechPhrase = this.$.speechPhrase;
            var check_icon = this.$.check_icon;
            
            voice.speak();
            speechInput.style.display = 'none';
            //Separamos las palabras que son suseptibles de reconocer
            var words = speechPhrase.innerText.split('/');
            console.log("Palabras:");
            console.log(words);

            //obtener la lista de homonimos
            //words = sound_like(speechPhrase.innerText);
            check_icon.style.color = "black";
            speechMic.addEventListener('speech-mic-result', function (e) {
                  speechInput.value = e.detail.transcript;
                  //Mostramos la palabra reconocida
                  console.log(speechInput.value.toLowerCase());
                  //Iteramos sobre el listado de palabras buscando la palabra reconocida
                  for (var i in words) {
                        if (speechInput.value.toLowerCase() == words[i]) {
                              speechMic.stop();
                              console.log("La palabra coincidio con: " + words[i]);
                              check_icon.style.color = "green";
                              i = words.length;
                        }
                        else {
                              check_icon.style.color = "red";
                        }
                  }
            });
      }
});