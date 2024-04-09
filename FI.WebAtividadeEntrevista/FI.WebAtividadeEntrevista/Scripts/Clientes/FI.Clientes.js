
$(document).ready(function () {
    $("#Cpf").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var beneficiarios = [];

        // Iterar sobre as linhas da tabela
        $('#gridBeneficiarios tbody tr').each(function () {
            var cpf = $(this).find('td:eq(0)').text().replace(/\.|-/gm, ''); // Índice da coluna do CPF
            var nome = $(this).find('td:eq(1)').text(); // Índice da coluna do Nome

            beneficiarios.push({
                "CpfBeneficiario": cpf,
                "NomeBeneficiario": nome
            });
        });

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Cpf": $(this).find("#Cpf").val().replace(/\.|-/gm, ''),
                "Beneficiarios": beneficiarios
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    console.log(r)
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });


    })
})

function validaCpf(cpf) {
    // Seleciona o elemento de entrada usando seu ID
    var valida = VerificaCPF(cpf.replace(/\.|-/gm, ''))
    if (valida == false) {
        alert('CPF Inválido');
    }
}

function VerificaCPF(strCpf) {

    var soma;
    var resto;
    soma = 0;
    if (strCpf == "00000000000" ||
        strCpf == "11111111111" ||
        strCpf == "22222222222" ||
        strCpf == "33333333333" ||
        strCpf == "44444444444" ||
        strCpf == "55555555555" ||
        strCpf == "66666666666" ||
        strCpf == "77777777777" ||
        strCpf == "88888888888" ||
        strCpf == "99999999999") {
        return false;
    }

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
