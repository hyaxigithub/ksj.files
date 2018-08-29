using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Com.KSJ.Common
{
    public class Pager<T>
    {
        public int page { get; set; }
        public int total { get; set; }
        public IList<T> rows { get; set; }
        public IList<object> footer { get; set; }
    }

}
