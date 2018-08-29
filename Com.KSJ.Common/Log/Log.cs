using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Com.KSJ.Common.Log
{
    public class Log
    {
        ILog logger;
        public Log(ILog log)
        {
            this.logger = log;
        }

        public void Debug(object msg)
        {
            logger.Debug(msg);
        }
        public void Info(object msg)
        {
            logger.Info(msg);
        }
        public void Error(object msg)
        {
            logger.Error(msg);
        }
        public void Warn(object msg)
        {
            logger.Warn(msg);
        }
    }
}