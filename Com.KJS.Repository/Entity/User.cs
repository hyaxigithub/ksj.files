using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.KSJ.Repository
{
    public class t_Users
    {
        [Key]
        public Int64 Id { get; set; }
        public string S_UserName { get; set; }
        public string S_Password { get; set; }
        public string S_Sex { get; set; }
        public string S_Mobile { get; set; }
        public string S_Email { get; set; }

    }
}
