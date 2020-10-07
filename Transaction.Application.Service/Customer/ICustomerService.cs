using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Organization;

namespace Transaction.Application.Service.Customer
{
    public interface ICustomerService
    {
        bool AddPerson(MvCustomer customer);
        bool UpdatePerson(MvCustomerUpdate customerUpdate);
        dynamic GetAllCustomerDetail();
    }
}
