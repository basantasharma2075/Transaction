using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Invoice;

namespace Transaction.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        bool AddInvoice(MvInvoice invoice);
        dynamic GetAllInvoiceDetail();
    }
}
