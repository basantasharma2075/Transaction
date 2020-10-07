using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Person;

namespace Transaction.Application.Service.Person
{
    public interface IPersonService
    {
        bool AddPerson(MvPerson person);
        bool UpdatePerson(MvPersonUpdate personUpdate);
        dynamic GetAllPersonDetail();

    }
}
