using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Transaction.Application.Model.Job
{
    public class MvJob
    {
        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string OrganizationId { get; set; }

        [Required]
        public string PayPerHour { get; set; }
    }

    public class MvJobUpdate
    {
        [Required]
        public string JobId { get; set; }

        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string OrganizationId { get; set; }

        [Required]
        public string PayPerHour { get; set; }
    }
}
