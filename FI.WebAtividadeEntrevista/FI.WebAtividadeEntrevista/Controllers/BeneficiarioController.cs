using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Web.Http.Results;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public ActionResult BeneficiarioList(long ClienteId)
        {
            BoBeneficiario bo = new BoBeneficiario();
            List<Beneficiario> Beneficiarios = bo.ListarBeneficiarios(ClienteId);
            List<BeneficiarioModel> model = new List<BeneficiarioModel>();

            if (Beneficiarios != null || Beneficiarios.Any())
            {
                foreach (var beneficiario in Beneficiarios)
                {
                    model.Add(new List<BeneficiarioModel>
                    {
                        new BeneficiarioModel
                        {
                            Id = beneficiario.Id,
                            IdCliente = beneficiario.IdCliente,
                            NomeBeneficiario = beneficiario.Nome,
                            CpfBeneficiario = beneficiario.Cpf
                    } }.First());
                }
            }

            return Json(new { Result = "OK", Records = model, TotalRecordCount = model.Count });
        }

        [HttpPost]
        public JsonResult Excluir(int id)
        {
            try
            {
                BoBeneficiario bo = new BoBeneficiario();

                bo.Excluir(id);

                //Return result to jTable
                return Json("Excluido com sucesso");
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}