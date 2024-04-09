
$(document).ready(function () {
    $("#CpfBeneficiario").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
})

function adicionarBeneficiarioAoGrid() {
  
    // Obter valores do CPF e do nome do formulário
    var cpf = document.getElementById("CpfBeneficiario").value;
    var nome = document.getElementById("NomeBeneficiario").value;

    // Adicionar os dados à tabela jtable
    $('#gridBeneficiarios').jtable('addRecord', {
        record: {
            CpfBeneficiario: cpf,
            NomeBeneficiario: nome
        },
        clientOnly: true // Dizer ao jtable que esses dados são apenas para exibição do lado do cliente
    });

    // Limpar os campos do formulário
    document.getElementById("CpfBeneficiario").value = "";
    document.getElementById("NomeBeneficiario").value = "";
}


function excluirRegistro(id) {
    $.ajax({
        url: urlExclusao + '/' + id,
        type: 'POST',
        data: { id: id },
        success: function (result) {

            console.log(result)
            ModalDialogBene("Sucesso!", result)


            if (document.getElementById("gridBeneficiarios"))
                $('#gridBeneficiarios').jtable('load');
        },
        error: function (xhr, status, error) {

            console.error('Erro ao excluir o registro:', error);
        }
    });

    function ModalDialogBene(titulo, texto) {
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
}

