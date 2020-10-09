using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Transaction.Application.Model.Transaction
{
    public class MvTransaction
    {
        [Required]
        public int AssignmentId { get; set; }

        [Required]
        public int WorkHours { get; set; }

        [Required]
        public int PayPerHour { get; set; }
    }
}
