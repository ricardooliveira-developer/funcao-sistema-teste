using FI.AtividadeEntrevista.DAL.Beneficiarios;
using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Incluir(List<Beneficiario> beneficiarios)
        {
            DaoBeneficiario cli = new DaoBeneficiario();

            foreach (var beneficiario in beneficiarios)
            {
                cli.Incluir(beneficiario);
            }
        }

        public List<Beneficiario> ListarBeneficiarios(long ClienteId)
        {
            DaoBeneficiario cli = new DaoBeneficiario();
            return cli.ListarBeneficiarios(ClienteId);
        }

        public void Excluir(long ClienteId)
        {
            DaoBeneficiario cli = new DaoBeneficiario();
            cli.Excluir(ClienteId);
        }
    }
}
