using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Transaction.Application.Model.Transaction;
using Transaction.Application.Service.Transaction;
using Transaction.Application.WebApi.Areas.Base;

namespace Transaction.Application.WebApi.Areas.Transaction
{
    public class TransactionController : BaseController
    {
        private ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public IActionResult AddTransaction([FromBody] MvTransaction transaction)
        {
            try
            {
                var added = _transactionService.AddTransaction(transaction);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult AllTransactionDetail()
        {
            try
            {
                dynamic jsonString = _transactionService.GetAllTransactionDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
