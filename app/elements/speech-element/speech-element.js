Polymer({
      
      
      ready: function () {
            var speechInput = this.$.speechInput;
            var speechMic = this.$.speechMic;
            var speechPhrase = this.$.speechPhrase;
            var check_icon = this.$.check_icon;

            speechMic.addEventListener('speech-mic-result', function (e) {
                  speechInput.value = e.detail.transcript;
                  
                  if(speechInput.value.toLowerCase() == speechPhrase.innerText.toLowerCase()){
                        console.log("es igual");
                        check_icon.style.color = "green";

                  }
                  else{
                        console.log("no es igual"); 
                        check_icon.style.color = "red";
                  }
                  
            });
      }
});