using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace FI.AtividadeEntrevista.DAL.Beneficiarios
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal void Incluir(Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Cpf", beneficiario.Cpf));
            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("Id_Cliente", beneficiario.IdCliente));

            Executar("FI_SP_IncBeneficiario", parametros);

        }

        internal void Excluir(long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", id));

            Executar("FI_SP_DelBeneficiario", parametros);

        }
        internal List<Beneficiario> ListarBeneficiarios(long ClienteId)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Id", ClienteId));

            DataSet ds = base.Consultar("FI_SP_ListBeneficiarios", parametros);
            List<Beneficiario> cli = Converter(ds);

            return cli;
        }

        private List<Beneficiario> Converter(DataSet ds)
        {
            List<Beneficiario> lista = new List<Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Beneficiario cli = new Beneficiario();
                    cli.Id = row.Field<long>("Id");
                    cli.Nome = row.Field<string>("Nome");
                    cli.Cpf = row.Field<string>("Cpf");
                    cli.IdCliente = row.Field<long>("IdCliente");
                    
                    lista.Add(cli);
                }
            }

            return lista;
        }
    }
}
