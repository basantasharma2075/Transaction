using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Transaction.Application.Model.Organization;
using Transaction.Application.Service.Customer;
using Transaction.Application.WebApi.Areas.Base;

namespace Transaction.Application.WebApi.Areas.Customer
{
    public class CustomerController : BaseController
    {
        private ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        public IActionResult AddCustomer([FromBody] MvCustomer customer)
        {
            try
            {
                var added = _customerService.AddPerson(customer);
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


        [HttpPost]
        public IActionResult UpdateCustomer([FromBody] MvCustomerUpdate customerUpdate)
        {
            try
            {
                var updated = _customerService.UpdatePerson(customerUpdate);
                if (!updated)
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







        //      [HttpGet]
        /*   public IActionResult AllCustomerDetail()
           {
               try
               {
                   dynamic jsonString = _customerService.GetAllCustomerDetail();
                   return Ok(jsonString);
               }
               catch (Exception e)
               {
                   throw e;
               }
           }
   */


    }
}
