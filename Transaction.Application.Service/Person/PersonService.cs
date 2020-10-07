using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Transaction.Application.DataAccess;
using Transaction.Application.Model.Person;

namespace Transaction.Application.Service.Person
{
    public class PersonService : IPersonService
    {

        private DataAccessHelper _dah;
        private readonly int _comdTimeout;
        private readonly string _connString;
        private IConfiguration _iconfiguration;

        public PersonService(IConfiguration configuration)
        {
            _iconfiguration = configuration;

            dynamic connectionString = _iconfiguration.GetSection("ConnectionString");
            _connString = connectionString["DefaultConnection"];

            if (_connString != null)
            {
                _dah = new DataAccessHelper(_connString);
            }

            _comdTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }



        public bool AddPerson(MvPerson person)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(person);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpEmployeeInsertTsk";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _comdTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }


        }

        public dynamic GetAllPersonDetail()
        {
            throw new NotImplementedException();
        }

        public bool UpdatePerson(MvPersonUpdate personUpdate)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(personUpdate);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpUpdatePersonTsk";
                command.Parameters.Add("@json", SqlDbType.NChar).Value = jsonNew;
                command.CommandTimeout = _comdTimeout;

                int rows = command.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }
    }
}
