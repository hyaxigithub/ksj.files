using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Reflection;
using System.Data.Common;
using System.Text;
using System.Collections.Specialized;

namespace Com.KSJ.DBUtility
{
    /// <summary>
    /// 基类，封装通用增删改查
    /// </summary>
    public class BaseBusness
    {
        public DBHelper MySqlDb;
        public static readonly BaseBusness BaseObj = new BaseBusness();
        private SqlStringBuilder sqlStringBuilder = new SqlStringBuilder();
        /// <summary>
        /// 构造方法
        /// </summary>
        public BaseBusness()
        {
            MySqlDb = DBHelper.Db;
            if (sqlStringBuilder.Db == null)
            {
                sqlStringBuilder.Db = MySqlDb;
            }
        }
        public BaseBusness(string dbname)
        {
            MySqlDb = DBHelper.Db;
            if (sqlStringBuilder.Db == null)
            {
                sqlStringBuilder.DbName = dbname;
                sqlStringBuilder.Db = MySqlDb;
            }
        }

        /// <summary>
        /// 添加数据.如果键值为自增长,将键值设为0
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public int AddObj<T>(T t)
        {
            System.Data.Common.DbParameter[] pars;
            string sql = sqlStringBuilder.CreateInsertSQL<T>(t, out pars);
            //string realSql = sqlStringBuilder.BuildSqlWithSqlParameter(sql, pars);

            return MySqlDb.ExecuteNonQuery(sql, pars);
        }

        private string makeAddSql<T>(T t)
        {
            System.Data.Common.DbParameter[] pars;
            string sql = sqlStringBuilder.CreateInsertSQL<T>(t, out pars);
            //System.Data.Common.DbParameter[] parsc = new System.Data.Common.DbParameter[pars.Length - 1];

            /*for(int  i = 0;i<pars.Length-1;i++)
            {
                parsc[i] = pars[i];
            }*/

            List<System.Data.Common.DbParameter> parsc = new List<System.Data.Common.DbParameter>();

            for (int i = 0; i < pars.Length; i++)
            {
                object o = pars[i];
                if (o != null)
                    if (pars[i].Value != null)
                        parsc.Add(pars[i]);

            }
            string realSql = sqlStringBuilder.BuildSqlWithSqlParameter(sql, parsc.ToArray());
            return realSql;
        }

        /// <summary>
        /// 添加返回自增长ID的记录
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns>新增记录的自增长ID值,插入不成功返回0</returns>
        public int AddObjRetNewId<T>(T t)
        {
            int idVal = 0;
            System.Data.Common.DbParameter[] pars;
            string sql = sqlStringBuilder.CreateInsertSQL<T>(t, out pars);
            sql += ";select @@IDENTITY";
            var p1 = new List<System.Data.Common.DbParameter>();
            object dobj = MySqlDb.ExecuteScalar(sql, pars);
            if (dobj != null && dobj != DBNull.Value)
            {
                idVal = Convert.ToInt32(dobj);
            }
            return idVal;
        }

        /// <summary>
        /// 添加或更新对象。存在更新，不存在添加
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="t">对象</param>
        /// <returns>成功〉0。</returns>
        public int AddOrUpdateData<T>(T t)
        {
            int cnt = 0;
            if (DataIsExists<T>(t))
            {
                cnt = UpdateObj<T>(t);
            }
            else
            {
                //cnt = AddObj<T>(t);
                cnt = AddObjRetNewId<T>(t);
            }
            return cnt;
        }

        public string makeAddOrUpdateSql<T>(T t)
        {
            string sql;
            if (DataIsExists<T>(t))
            {
                sql = makeUpdateSql<T>(t);
            }
            else
            {
                sql = makeAddSql<T>(t);
            }
            return sql;
        }

        /// <summary>
        /// 判断数据是否存在
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        private bool DataIsExists<T>(T t)
        {
            List<System.Data.Common.DbParameter> pars = new List<System.Data.Common.DbParameter>();
            string sql = sqlStringBuilder.GenerateExistsSQL<T>(t, ref pars);
            int cnt = Convert.ToInt32(MySqlDb.ExecuteScalar(sql, pars.ToArray()));
            return cnt > 0;
        }

        /// <summary>
        /// 更新对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public int UpdateObj<T>(T t)
        {
            string sql = sqlStringBuilder.GenerateUpdateSQL<T>(t);
            return MySqlDb.ExecuteNonQuery(sql);
        }
        /// <summary>
        ///保存配置表达式
        /// </summary>

        /// <param name=SQL></param>
        /// <returns></returns>
        public int savePZ(string SQL)
        {
            return MySqlDb.ExecuteNonQuery(SQL);
        }

        public object selectPZ(string SQL)
        {
            return MySqlDb.ExecuteScalar(SQL);
        }

        public object savePZvalue(string SQL)
        {
            try { 
            return MySqlDb.ExecuteScalar(SQL);}
                catch {
                    return "false";
                }
        }

        protected string makeUpdateSql<T>(T t)
        {
            string sql = sqlStringBuilder.GenerateUpdateSQL<T>(t);
            //string realSql = sqlStringBuilder.BuildSqlWithSqlParameter(sql, pars);
            return sql;
        }

        /// <summary>
        /// 执行删除
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public int ExecDeleteSql(string tableName, string strWhere, params DbParameter[] pars)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("DELETE  FROM [" + tableName + "] ");
            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));
            return MySqlDb.ExecuteNonQuery(strSql.ToString(), pars);
        }

        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataTable GetListByPage(string tableName, string strWhere, string orderby, int startIndex, int endIndex, params DbParameter[] cmdParas)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by " + orderby);
            }
            strSql.Append(")AS Row, T.*  from " + tableName + " T ");

            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySqlDb.ExecuteDataTable(strSql.ToString(), cmdParas);
        }

        /// <summary>
        /// 标准清单分页获取数据列表
        /// </summary>
        public DataTable GetListByPageBZQD(string tableName, string sId, string strWhere, string orderby, int startIndex, int endIndex, params DbParameter[] cmdParas)
        { 
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" with cte as (select * from t_InvestStandardsList where ID = " + sId + " union all  select air.* from t_InvestStandardsList as air inner join cte on air.SubheadingParentNo = cte.SubheadingNo)");
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by " + orderby);
            }
            strSql.Append(")AS Row, T.* ,C.Expression   as Bds from " + tableName + " T  left join  t_InvestStandardsListContract C on C.ID=t.ID ");

            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));
            strSql.Append(" and T.ID in  (select ID from cte) ");
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySqlDb.ExecuteDataTable(strSql.ToString(), cmdParas);
        }


        /// <summary>
        /// 标准清单分页获取数据列表
        /// </summary>
        public DataTable GetListByPageBZ(string tableName,string sId, string strWhere, string orderby, int startIndex, int endIndex, params DbParameter[] cmdParas)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" with cte as (select * from t_InvestStandardsList where ID = " + sId + " union all  select air.* from t_InvestStandardsList as air inner join cte on air.SubheadingParentNo = cte.SubheadingNo)");
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by " + orderby);
            }
            strSql.Append(")AS Row, T.*  from " + tableName + " T   ");

            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));
            strSql.Append(" and T.ID in  (select ID from cte) ");
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySqlDb.ExecuteDataTable(strSql.ToString(), cmdParas);
        }


        /// <summary>
        /// 标准清单分页获取数据列表
        /// </summary>
        public DataTable GetListByPageHT(string tableName, string sId, string strWhere, string orderby, int startIndex, int endIndex, params DbParameter[] cmdParas)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" with cte as (select * from t_InvestContractList where ID = " + sId + " union all  select air.* from t_InvestContractList as air inner join cte on air.SubheadingParentNo = cte.SubheadingNo)");
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by " + orderby);
            }
            strSql.Append(")AS Row, T.*  from " + tableName + " T ");

            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));
            strSql.Append(" and T.ID in  (select ID from cte) ");
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySqlDb.ExecuteDataTable(strSql.ToString(), cmdParas);
        }
        public int Deletes(string SQL)
        {
            return MySqlDb.ExecuteNonQuery(SQL);
        }

        /// <summary>
        /// 获取记录总数
        /// </summary>
        public int GetRecordCount(string tableName, string strWhere, params DbParameter[] cmdParas)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) FROM " + tableName + " T ");

            strSql.Append(this.sqlStringBuilder.FormatSqlWhere(strWhere));

            object obj = MySqlDb.ExecuteScalar(strSql.ToString(), cmdParas);
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }

        /// <summary>
        /// 删除对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="keyColName">键值</param>
        /// <returns>>0删除成功</returns>
        protected int DelObj<T>(T t, string keyColName)
        {
            System.Data.Common.DbParameter par;
            string sql = sqlStringBuilder.GenerateDeleteSQL<T>(t, keyColName, out par);

            return MySqlDb.ExecuteNonQuery(sql, par);
        }

        /// <summary>
        /// 删除对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns>>0删除成功</returns>
        public int DelObj<T>(T t)
        {
            List<System.Data.Common.DbParameter> pars = new List<System.Data.Common.DbParameter>();
            string sql = sqlStringBuilder.GenerateDeSQL<T>(t, ref pars);
            return MySqlDb.ExecuteNonQuery(sql, pars.ToArray());
        }

        public string makeDelSql<T>(T t)
        {
            List<System.Data.Common.DbParameter> pars = new List<System.Data.Common.DbParameter>();
            string sql = sqlStringBuilder.GenerateDeSQL<T>(t, ref pars);
            string realSql = sqlStringBuilder.BuildSqlWithSqlParameter(sql, pars.ToArray());
            return realSql;
        }


        public int DeleteRow(DataRow row, string tName)
        {
            object obj = null;
            int cmd = 0;

            try
            {
                obj = Assembly.Load("KSJ.Model").CreateInstance("KSJ.Model." + tName);
                // if (obj == null)
                //{
                //MessageBox.Show("Error");
                // }

                PropertyInfo[] props = obj.GetType().GetProperties();

                foreach (PropertyInfo prop in props)
                {
                    prop.SetValue(obj, DBHelper.ChangeType(prop.PropertyType, row["" + prop.Name + ""].ToString() == "" ? null : row["" + prop.Name + ""]), null);
                }

                string sql = makeDelSql(obj);

                cmd = MySqlDb.ExecuteNonQuery(sql);

            }
            catch
            {
                return cmd;
            }
            return cmd;
        }

        public bool RowToObj(Object obj, DataRow row)
        {

            try
            {
                PropertyInfo[] props = obj.GetType().GetProperties();

                foreach (PropertyInfo prop in props)
                {
                    prop.SetValue(obj, DBHelper.ChangeType(prop.PropertyType, row["" + prop.Name + ""].ToString() == "" ? null : row["" + prop.Name + ""]), null);
                }

            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 根据sql得到集合对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <returns></returns>
        protected IList<T> GetAllObj<T>(string sql)
        {
            return MySqlDb.ExecuteReaderList<T>(sql);
        }

        /// <summary>
        /// 根据sql语句得到对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <returns></returns>
        public T GetObj<T>(string sql)
        {
            return MySqlDb.ExecuteReaderObject<T>(sql);
        }

        private string GetObjWhereSql<T>(string strWhere = "", string typeName = "")
        {
            typeName = !string.IsNullOrEmpty(typeName) ? typeName : sqlStringBuilder.GetTableName<T>(default(T));
            string sql = sqlStringBuilder.GenerateSelectSql<T>(typeName) + " where 1=1";
            if (!string.IsNullOrEmpty(strWhere))
            {
                if (!strWhere.Trim().ToLower().StartsWith("and") && !strWhere.Trim().ToLower().StartsWith("limit"))
                {
                    sql += " and " + strWhere;
                }
                else
                {
                    sql += " " + strWhere;
                }
            }
            return sql;
        }

        private string GetCountWhereSql<T>(string strWhere = "", string typeName = "")
        {
            typeName = !string.IsNullOrEmpty(typeName) ? typeName : sqlStringBuilder.GetTableName<T>(default(T));
            string sql = sqlStringBuilder.GenerateCountSelectSql<T>(typeName) + " where 1=1";
            if (!string.IsNullOrEmpty(strWhere))
            {
                if (!strWhere.Trim().ToLower().StartsWith("and"))
                {
                    sql += " and " + strWhere;
                }
                else
                {
                    sql += " " + strWhere;
                }
            }
            return sql;
        }

        /// <summary>
        /// 根据Where条件查找数据集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="strWhere"></param>
        /// <param name="typeName">数据类型名称</param>
        /// <returns>数据集合</returns>
        public List<T> GetObjListAfterWhere<T>(string strWhere = "", string typeName = "")
        {
            return MySqlDb.ExecuteReaderList<T>(GetObjWhereSql<T>(strWhere, typeName)).ToList();
        }

        public DataTable GetDataTableAfterWhere<T>(string strWhere = "", string typeName = "")
        {
            return MySqlDb.ExecuteDataTable(GetObjWhereSql<T>(strWhere, typeName));
        }

        private DataTable GetDtAfterWhere(string sql, int currentPage, int pageSize, out int totalPage)
        {
            const string querysql = "exec proc_fenye @sql,@currentPage,@pageSize";
            var ds = MySqlDb.ExecuteDataSet(querysql, MySqlDb.ParIn("@sql", sql), MySqlDb.ParIn("@currentPage", currentPage), MySqlDb.ParIn("@pageSize", pageSize));
            totalPage = int.Parse(ds.Tables[1].Rows[0][0].ToString());
            return ds.Tables[2];
            //return MySqlDb.ExecuteDataTable(GetObjWhereSql<T>(strWhere, typeName));
        }

        public string GetQuerySQL(string whereSql, string table, string orderBy = "")
        {
            string strOrder = string.Empty;
            if (!string.IsNullOrEmpty(orderBy))
            {
                strOrder = " order by " + orderBy;
            }

            whereSql = this.sqlStringBuilder.FormatSqlWhere(whereSql);
            string sql = "select * from " + this.sqlStringBuilder.DbName + table + whereSql + strOrder;

            return sql;
        }
        public string GetQuerySQLPZ(string whereSql, string table, string orderBy = "")
        {
            string strOrder = string.Empty;
            if (!string.IsNullOrEmpty(orderBy))
            {
                strOrder = " order by " + orderBy;
            }

            whereSql = this.sqlStringBuilder.FormatSqlWhere(whereSql);
            string sql = "select * from " + this.sqlStringBuilder.DbName + table + whereSql + strOrder;

            return sql;
        }

        private int GetDataTableCountAfterWhere<T>(T obj, string strWhere = "", string typeName = "")
        {
            return Convert.ToInt32(MySqlDb.ExecuteScalar(GetCountWhereSql<T>(strWhere, typeName)));
        }

        /// <summary>
        /// 根据Where条件查找数据对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="strWhere"></param>
        /// <param name="typeName">数据类型名称</param>
        /// <returns>数据对象</returns>
        public T GetObjAfterWhere<T>(string strWhere = "", string typeName = "", params DbParameter[] cmdParas)
        {
            return MySqlDb.ExecuteReaderObject<T>(GetObjWhereSql<T>(strWhere, typeName), cmdParas);
        }

        /// <summary>
        /// 执行数据返回DataTable
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public DataTable GetDatatable(string sql)
        {
            return MySqlDb.ExecuteDataTable(sql);
        }

        public int ExecuteNonQuery(CommandType cmdType, string cmdText, params DbParameter[] cmdParasc)
        {
            return MySqlDb.ExecuteNonQuery(cmdType, cmdText, cmdParasc);
        }



        /// <summary>
        /// 执行数据返回DataTable
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        private int GetCountDatatable(string sql, params System.Data.Common.DbParameter[] pars)
        {
            return Convert.ToInt32(MySqlDb.ExecuteScalar(sql, pars));
        }
        /// <summary>
        /// 根据定义字典类型常量查找字典数据
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        /// 
        /*  public List<Dic> GetDicByKey(int key)
          {
              return MySqlDb.ExecuteReaderList<Dic>("select * from Dic where parentid=" + key).ToList();
          }*/


        /// <summary>
        /// 获取字典数据
        /// </summary>
        /// <param name="dicType">字典类型</param>
        /// <returns></returns>
        private DataTable GetDataByType(int dicType)
        {
            return MySqlDb.ExecuteDataTable("select * from dictionary where id=" + dicType);
        }

        /// <summary>
        /// 将从页面post回来的数据，赋值给obj
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="requestForm">form表单</param>
        /// <param name="userCollection">自定义的数据</param>
        public void AssignModelByForms<T>(T obj, NameValueCollection requestForm, NameValueCollection userCollection = null)
        {
            Type type = obj.GetType();
            PropertyInfo[] props = type.GetProperties();
            foreach (PropertyInfo prop in props)
            {
                //除去额外属性
                object[] uAttr = prop.GetCustomAttributes(typeof(UsageAttribute), false);
                if (uAttr.Length > 0 && (uAttr[0] as UsageAttribute).UsageType == UsageType.Extra)
                {
                    continue;
                }

                if (requestForm[prop.Name] != null)
                {
                    prop.SetValue(obj, DBHelper.ChangeType(prop.PropertyType, requestForm[prop.Name]), null);
                }

                if (userCollection != null && userCollection[prop.Name] != null)
                {
                    prop.SetValue(obj, DBHelper.ChangeType(prop.PropertyType, userCollection[prop.Name]), null);
                }
               
            }
        }

        public void AssignModelAfterWhere<T>(T obj, string strWhere, string typeName)
        {
            DataTable dt = this.GetDatatable(this.GetQuerySQL(strWhere, typeName));
            if (dt.Rows.Count > 0)
            {
                this.RowToObj(obj, dt.Rows[0]);
            }
        }

        /// <summary>
        /// 判断数据表是否存在指定的列
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="columnName">列名</param>
        /// <returns></returns>
        public bool IsColumnExisted(string tableName, string columnName)
        {
            if (string.IsNullOrEmpty(tableName) || string.IsNullOrEmpty(columnName))
            {
                return false;
            }
            object res = MySqlDb.ExecuteScalar(@"select count(*) from information_schema.columns 
                                                where table_name = @tableName and column_name = @columnName",
                                                  new DbParameter[] { MySqlDb.ParIn("tableName", tableName), 
                                                                      MySqlDb.ParIn("columnName", columnName)});
            return res.ToString() == "1";
        }

        /// <summary>
        /// 判断是否存在表
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public bool IsTableExisted(string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return false;
            }
            object res = MySqlDb.ExecuteScalar(@"select count(*) from information_schema.tables 
                                                where table_name = @tableName",
                                                  new DbParameter[] { MySqlDb.ParIn("tableName", tableName) });
            return res.ToString() == "1";
        }

        /// <summary>
        /// 获取表的所有列
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public DataTable GetTableColumns(string tableName)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                return null;
            }
            DataTable res = DBHelper.Db.ExecuteDataTable(@"select column_name from information_schema.columns 
                                                        where table_name = @tableName",
                                                  new DbParameter[] { MySqlDb.ParIn("tableName", tableName) });
            return res;
        }
    }

}
