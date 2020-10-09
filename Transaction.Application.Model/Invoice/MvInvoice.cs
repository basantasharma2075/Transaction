using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Transaction.Application.Model.Invoice
{
    public class MvInvoice
    {
        [Required]
        public int TransactionId { get; set; }
    }
}
