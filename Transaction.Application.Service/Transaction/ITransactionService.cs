using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Transaction;

namespace Transaction.Application.Service.Transaction
{
    public interface ITransactionService
    {
        bool AddTransaction(MvTransaction transaction);
        dynamic GetAllTransactionDetail();

    }
}
