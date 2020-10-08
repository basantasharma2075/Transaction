using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Transaction.Application.Model.Assignment
{
    public class MvAssignment
    {
        [Required]
        public string AssignmentName { get; set; }

        [Required]
        public string StartDate { get; set; }

        [Required]
        public string EndDate { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [Required]
        public string JobId { get; set; }
    }

    public class MvAssignmentUpdate
    {
        [Required]
        public string AssignmentId { get; set; }

        [Required]
        public string AssignmentName { get; set; }

        [Required]
        public string StartDate { get; set; }

        [Required]
        public string EndDate { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [Required]
        public string JobId { get; set; }

        [Required]
        public string WorkHours { get; set; }

        [Required]
        public string PayPerHour { get; set; }
    }
}
