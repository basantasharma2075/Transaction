using System;
using System.Collections.Generic;
using System.Text;
using Transaction.Application.Model.Job;

namespace Transaction.Application.Service.Job
{
    public interface IJobService
    {
        bool AddJob(MvJob job);
        bool UpdateJob(MvJobUpdate jobUpdate);
        dynamic GetAllJobDetail();
    }
}
