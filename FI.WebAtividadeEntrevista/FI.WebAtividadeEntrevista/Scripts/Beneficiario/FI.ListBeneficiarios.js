
$(document).ready(function () {

    if (document.getElementById("gridBeneficiarios")) {
        $('#gridBeneficiarios').jtable({
            actions: {
                listAction: function (postData, jtParams) {
                    return $.Deferred(function ($dfd) {
                        // Fazer uma solicitação AJAX para obter os dados do servidor
                        $.ajax({
                            url: urlBeneficiarioList,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                // Aqui você pode passar os parâmetros necessários
                                ClienteId: clienteId
                            },
                            success: function (data) {
                                // Resolver a promessa com os dados recebidos
                                $dfd.resolve({
                                    "Result": "OK",
                                    "Records": data.Records // Passar os dados para a jTable
                                });
                            },
                            error: function () {
                                // Rejeitar a promessa em caso de erro
                                $dfd.reject();
                            }
                        });
                    });
                }
            },
            fields: {
                CpfBeneficiario: {
                    title: 'CPF',
                    width: '40%'
                },
                NomeBeneficiario: {
                    title: 'Nome',
                    width: '60%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + 'urlAlteracao' + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="excluirRegistro(' + data.record.Id + ')" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

    }

    //////load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
   

})