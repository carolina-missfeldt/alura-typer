
$(document).ready(function () {
    fraseDefault();
    inicializaContadores();
    inicializaCronometro();
    avisoDeErroNoTexto();
    $('#botao-reiniciar').click(reset);
});

    var tempoInicial = $(".tempo-de-digitacao").text();
    function fraseDefault(){

        var frase = $('.frase').text();
        var qtdDePalavrasDaFrase = frase.split(' ').length;
        var tamanhoDaFrase = $('.tamanho-frase');
    
        if (qtdDePalavrasDaFrase <= 1) {
            tamanhoDaFrase.text(qtdDePalavrasDaFrase + " palavra");
    
        } else {
    
            tamanhoDaFrase.text(qtdDePalavrasDaFrase + " palavras");
        }
    }


    function inicializaContadores(){

        $('#campo-digitacao').on('input', function () {
            var textoDigitado = $('#campo-digitacao').val();
    
            var qtdDePalavrasDigitadas = textoDigitado.split(/\S+/).length - 1;
            var qtdDeCaracteresDigitados = textoDigitado.length;
    
            $('.contador-de-palavras').text(qtdDePalavrasDigitadas + " palavras");
            $('.contador-de-caracteres').text(qtdDeCaracteresDigitados + " caracteres")
        });
    }

    function inicializaCronometro() {
        var tempoRestante = $('.tempo-de-digitacao').text();
        $('#campo-digitacao').one('focus', function () {
            var cronometroID = setInterval(function () {
                tempoRestante--;
                $(".tempo-de-digitacao").text(tempoRestante);
                if (tempoRestante < 1) {
                    $('#campo-digitacao').attr("disabled", true);
                    clearInterval(cronometroID);
                    $('#botao-reiniciar').removeClass('disabled');
                    // $('#modal1').modal('open');
                    swal({
                        title: 'Tempo esgotado',
                        html: $('<div>')
                            .addClass('some-class')
                            .text('Que pena, você não conseguiu. Tente novamente =)'),
                        animation: false,
                        customClass: 'animated tada',
                        confirmButtonColor: '#d84315',
                        confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Ok'
                    });
                    
                    
                }
            }, 1000);
            console.log(tempoRestante);
        });
    }
 
    function avisoDeErroNoTexto(){
        $('#campo-digitacao').on('input',function(){
            if(textoDigitado != frase){
                $('#campo-digitacao').addClass('aviso-de-erro');
            }
        })
    }

    function reset(){
        $('#campo-digitacao').attr('disabled', false);
        $('#campo-digitacao').val("");
        $(".contador-de-palavras").text("0" + " palavras");
        $(".contador-de-caracteres").text("0" + " caracteres");
        $(".tempo-de-digitacao").text(tempoInicial);
        $('#botao-reiniciar').addClass('disabled');
        inicializaCronometro();
    }

    
