using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Transaction.Application.Model.Person;
using Transaction.Application.Service.Person;
using Transaction.Application.WebApi.Areas.Base;

namespace Transaction.Application.WebApi.Areas.Person
{
    public class PersonController : BaseController
    {
        private IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] MvPerson person)
        {
            try
            {
                var added = _personService.AddPerson(person);
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
        public IActionResult UpdateEmployee([FromBody] MvPersonUpdate personUpdate)
        {
            try
            {
                var updated = _personService.UpdatePerson(personUpdate);
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







        [HttpGet]
        public IActionResult AllEmpoyeeDetail()
        {
            try
            {
                dynamic jsonString = _personService.GetAllPersonDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }



    }
}
