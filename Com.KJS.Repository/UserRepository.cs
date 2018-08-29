using Com.KSJ.DB.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Com.KSJ.Repository
{
    public class UserRepository
    {
        public static string connectionString = ConfigurationManager.ConnectionStrings["connStr"].ToString();
        private static BaseDAL dal = new BaseDAL(connectionString);

        public static bool Add(t_Users entity)
        {
            return dal.Add<t_Users>(entity);
        }
        public static List<t_Users> GetList(int page,int rows,out int totalcount,t_Users parms=null)
        {
            Expression<Func<t_Users, Int64>> exp = (t)=>t.Id;
            return dal.GetListPaged<t_Users,Int64>(page, rows, exp, true, out totalcount);
        }
        public static bool Delete(Int64 id)
        {
            string sql = "delete from t_Users where Id=" + id;
            return dal.ExecuteSql(sql) > 0 ? true : false;
        }
        public static bool Delete(t_Users entity)
        {
            return dal.Delete(entity);
        }
        public static t_Users GetEntity(Int64 id)
        {
            return dal.GetSingle<t_Users>(t => t.Id == id);
        }
        /// <summary>
        /// 插入文件与用户的关系
        /// </summary>
        /// <param name="userIds"></param>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public static bool InsertMap(string[] userIds, Int64 fileId)
        {
            string sql = "delete from t_UserFilesMap where FileId=" + fileId + ";" ;
            foreach(string userId in userIds)
            {
                sql += "insert into t_UserFilesMap(UserId,FileId) values (" + userId + "," + fileId + ");";
            }
            return dal.ExecuteSql(sql) > 0 ? true : false;
        }

        public static List<t_UserFilesMap> GetUsers(Int64 fileId)
        {
            string sql = "select * from t_UserFilesMap where FileId=" + fileId;
            return dal.QueryList<t_UserFilesMap>(sql);
        }
    }
}
