using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.KSJ.Repository
{
    [Table("t_Files")]
    public class t_Files
    {
        [Key]
        public Int64 Id { get; set; }
        public string S_FileType { get; set; }
        public string  S_FilePath { get; set; }
        public Int64 I_FileSize { get; set; }
        public DateTime T_CreateTime { get; set; }
        public string S_Creator { get; set; }
        public string S_Flag { get; set; }
        public string S_FileName { get; set; }
    }
}
