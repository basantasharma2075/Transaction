using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Transaction.Application.DataAccess;
using Transaction.Application.Model.Invoice;

namespace Transaction.Application.Service.Invoice
{
    public class InvoiceService : IInvoiceService
    {
        private DataAccessHelper _dah;
        private readonly int _comdTimeout;
        private readonly string _connString;
        private IConfiguration _iconfiguration;

        public InvoiceService(IConfiguration configuration)
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

        public bool AddInvoice(MvInvoice invoice)
        {
            using (var connection = _dah.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(invoice);
                var command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "SpInvoiceIns";
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

        public dynamic GetAllInvoiceDetail()
        {
            using (var con = _dah.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpInvoiceSel";
                cmd.CommandTimeout = _comdTimeout;

                using (SqlDataReader sqldr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (sqldr.HasRows)
                        {
                            return _dah.GetJson(sqldr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }


            }
        }
    }
}
