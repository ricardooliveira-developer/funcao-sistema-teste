﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        [Required]
        public string CpfBeneficiario { get; set; }

        [Required]
        public string NomeBeneficiario { get; set; }
        public long IdCliente { get; set; }

    }
}