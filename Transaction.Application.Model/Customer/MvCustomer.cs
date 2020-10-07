using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Transaction.Application.Model.Organization
{
    public class MvCustomer
    {
        [Required]
        public string OrganizationName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Email { get; set; }
    }

    public class MvCustomerUpdate
    {
        [Required]
        public int OrganizationId { get; set; }

        [Required]
        public string OrganizationName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Email { get; set; }
    }



}
