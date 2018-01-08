var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(document).ready(function () {
    fraseAleatoria();
    removePontuacao();
    fraseDefault();
    inicializaContadores();
    avisoDeErroNoTexto();
    inicializaCronometro();
    $('#botao-reiniciar').click(reset);
    $("#btn-placar").click(mostraPlacar);
    $('#btn-frase').click(fraseAleatoria);
});

    function fraseDefault(){
        var frase = $('#texto').text();
        var qtdDePalavrasDaFrase = frase.split(' ').length;
        var tamanhoDaFrase = $('.tamanho-frase');
        tamanhoDaFrase.text(qtdDePalavrasDaFrase + " palavras");

    }

    function fraseAleatoria() {
        $.get("http://localhost:3000/frases", mudaFrase);
    }
    
    function mudaFrase(data) {
        var frase = $("#texto");
        var numeroAleatorio = Math.floor(Math.random() * data.length);
        
        frase.text(data[numeroAleatorio].texto);
        fraseDefault();
        atualizaTempoInicial(data[numeroAleatorio].tempo);
    }

    function atualizaTempoInicial(tempo) {
        tempoInicial = tempo;
        $(".tempo-de-digitacao").text(tempo);
    }

    function inicializaContadores(){
        $('.contador-de-palavras').text(0 + " palavras");
        $('.contador-de-caracteres').text(0 + " caracteres")
        $('#campo-digitacao').on('input', function () {
            var frase = $(".frase").text();
            var textoDigitado = $('#campo-digitacao').val();
            var qtdDePalavrasDigitadas = textoDigitado.split(/\S+/).length - 1;
            var qtdDeCaracteresDigitados = textoDigitado.length;
    
            $('.contador-de-palavras').text(qtdDePalavrasDigitadas + " palavras");
            $('.contador-de-caracteres').text(qtdDeCaracteresDigitados + " caracteres");
        });
    }

    function inicializaCronometro() {

        $('#campo-digitacao').one('focus', function () {
            var tempoRestante = $('.tempo-de-digitacao').text();
            var cronometroID = setInterval(function () {
                var texto = $('#campo-digitacao').val();
                tempoRestante--;
                $(".tempo-de-digitacao").text(tempoRestante);
                if(tempoRestante < 1) {
                    clearInterval(cronometroID);
                    finalizaJogo();  
                    atualizaPlacar();
                    removePontuacao();

                }
            }, 1000);
        });
    }

    function atualizaPlacar(){
        var tabela = $('#placar').find('tbody');
        var palavrasDigitadas = $('.contador-de-palavras').text();
        var usuario = $('#usuario').val();
        var d = new Date();
        var dia = d.getDay();
        var mes = d.getMonth('mmmm') + 1;
        var ano = d.getFullYear();
        var data = `${dia}/${mes}/${ano}`;
        var tr = `<tr class="pontuacao">
                        <td>${usuario}</td>
                        <td>${palavrasDigitadas.replace("palavras","")}</td>
                        <td>${data}</td>
                        <td>
                            <a href="#" class="btn-excluir"> 
                                <i class="small material-icons">delete</i>
                            </a>
                        </td>
                    </tr>`;
        if(palavrasDigitadas >= "1" ){
            tabela.prepend(tr);
        }
        $(".placar").slideDown(500);
        scrollPlacar();
        
        }

    function scrollPlacar() {
            var posicaoPlacar = $('#placar').offset().top;
        
            $("html,body").animate(
            {
                scrollTop: posicaoPlacar + "px"
            }, 1000);
        }

    function finalizaJogo(){
        $('#campo-digitacao').attr("disabled", true);
        $('#botao-reiniciar').removeClass('disabled');
        $('#botao-reiniciar').addClass('pulse');
        swal({
            title: 'Tempo esgotado',
            html: $('<div>')
                .addClass('some-class')
                .text('Melhore sua pontuação jogando novamente!'),
            animation: false,
            customClass: 'animated tada',
            confirmButtonColor: '#d84315',
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Ok'
        });
    }

    function avisoDeErroNoTexto(){
        $('#campo-digitacao').on('input',function(){
            var textoComparado = $(this).val();
            var frase = $(".frase").text();
            var fraseComparada = frase.substr(0 , textoComparado.length);
            if(textoComparado != fraseComparada){
                $('#campo-digitacao').addClass('borda-vermelha');
            } else {
                $('#campo-digitacao').removeClass('borda-vermelha');
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
        $('#botao-reiniciar').removeClass('pulse');
        $('#campo-digitacao').removeClass('borda-vermelha');
        $('#usuario').val("");
        inicializaCronometro();
    }

    function removePontuacao(){
        $('.btn-excluir').click(function(){
            event.preventDefault();
            var trExcluir = $(this).closest('tr');
            trExcluir.fadeOut(function(){
                trExcluir.remove();
            });
        });

    }


    function mostraPlacar(){
        $('.placar').stop().slideToggle(1000);
        scrollPlacar();
    }
