using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Assignment;

namespace Transaction.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        bool AddAssignment(MvAssignment job);
        bool UpdateAssignment(MvAssignmentUpdate assignmentUpdate);
        bool CompleteAssignment(MvAssignmentUpdate completeAssignment);
        dynamic GetAllAssignmentDetail();
    }
}
