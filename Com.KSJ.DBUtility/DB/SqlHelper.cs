using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using DBUtility.DB.Entity;

namespace Com.KSJ.DBUtility.DB
{
    /// <summary>
    /// 数据操作辅助类
    /// </summary>
    public class SqlHelper : IDisposable
    {
        #region 属性 ConnectionString 数据库链接字符串
        private string connectionString ="";
        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        public string ConnectionString { get { return connectionString; } }
        #endregion

        #region 属性 Connection 获取数据库连接
        private SqlConnection connection;
        /// <summary>
        /// 获取数据库连接
        /// </summary>
        public SqlConnection Connection
        {
            get
            {
                string connectionStrings = connectionString;
                connection = connection == null ? new SqlConnection(connectionStrings) : connection;
                OpenConnection();
                return connection;
            }
        }
        #endregion

        #region 属性 Transaction 数据库事务对象
        public SqlTransaction Transaction { get; set; }
        #endregion

        #region 构造函数
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="connectionString">数据库连接字符串</param>
        public SqlHelper(string connectionString)
        {
            this.connectionString = connectionString;
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        public SqlHelper()
        {
        }
        #endregion

        #region ConnectTest 数据库连接测试
        /// <summary>
        /// 数据库连接测试
        /// </summary>
        public bool ConnectTest()
        {
            try
            {
                Connection.Close();
                return true;
            }
            catch { return false; }
        }
        #endregion

        #region GetCommand 获取MySqlCommand
        /// <summary>
        /// 获取MySqlCommand
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public SqlCommand GetCommand(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            SqlCommand cmd = Connection.CreateCommand();
            cmd.CommandText = strSQL;
            cmd.CommandType = cmdType;
            if (Transaction != null)
                cmd.Transaction = Transaction;
            foreach (SqlParameter p in pList)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
                cmd.Parameters.Add(p);
            }
            return cmd;
        }
        #endregion

        #region BeginTransaction 开始事务
        /// <summary>
        /// 开始事务
        /// </summary>
        public void BeginTransaction()
        {
            Transaction = Connection.BeginTransaction();
        }
        #endregion

        #region CommitTransaction 提交事务
        /// <summary>
        /// 提交事务
        /// </summary>
        public void CommitTransaction()
        {
            Transaction.Commit();
            Transaction = null;
            CloseConnection();
        }
        #endregion

        #region RollBackTransaction 回滚事务
        /// <summary>
        /// 回滚事务
        /// </summary>
        public void RollBackTransaction()
        {
            Transaction.Rollback();
            Transaction = null;
            CloseConnection();
        }
        #endregion

        #region OpenConnection 打开连接
        /// <summary>
        /// 打开连接
        /// </summary>
        public void OpenConnection()
        {
            if (connection.State != ConnectionState.Open)
                connection.Open();
        }
        #endregion

        #region CloseConnection 关闭连接
        /// <summary>
        /// 关闭连接
        /// </summary>
        public void CloseConnection()
        {
            if (connection.State != ConnectionState.Closed && Transaction == null)
                connection.Close();
        }
        #endregion

        #region RunReader 执行查询，返回MySqlDataReader,必须手动关闭连接（调用CloseConnection()）
        /// <summary>
        /// 执行查询，返回MySqlDataReader。连接必须手动关闭
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        /// <returns></returns>
        public SqlDataReader RunReader(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            using (SqlCommand cmd = GetCommand(cmdType, strSQL, pList))
            {
                return cmd.ExecuteReader();
            }
        }
        #endregion

        #region RunNonQuery 执行查询，返回受影响的行数
        /// <summary>
        /// 执行查询，返回受影响的行数
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunNonQuery(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                using (SqlCommand cmd = GetCommand(cmdType, strSQL, pList))
                {
                    foreach (SqlParameter p in pList)
                    {
                        if (p.Direction == ParameterDirection.Input && p.Value == null)
                        {
                            p.Value = DBNull.Value;
                        }
                    }
                    return cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，返回受影响的行数
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunNonQuery(string strSQL, params SqlParameter[] pList)
        {
            return RunNonQuery(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回受影响的行数
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunNonQueryProc(string procName, params SqlParameter[] pList)
        {
            return RunNonQuery(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunScalar 执行查询，返回单一结果
        /// <summary>
        /// 执行查询，返回单一结果
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public object RunScalar(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                using (SqlCommand cmd = GetCommand(cmdType, strSQL, pList))
                {
                    foreach (SqlParameter p in pList)
                    {
                        if (p.Direction == ParameterDirection.Input && p.Value == null)
                        {
                            p.Value = DBNull.Value;
                        }
                    }
                    return cmd.ExecuteScalar();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，返回单一结果
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public object RunScalar(string strSQL, params SqlParameter[] pList)
        {
            return RunScalar(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回单一结果
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public object RunScalarProc(string procName, params SqlParameter[] pList)
        {
            return RunScalar(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunDateTime 执行查询，返回DateTime型单一结果
        /// <summary>
        /// 执行查询，返回DateTime型单一结果
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DateTime RunDateTime(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            return Convert.ToDateTime(RunScalar(cmdType, strSQL, pList));
        }
        /// <summary>
        /// 执行查询，返回DateTime型单一结果
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public DateTime RunDateTime(string strSQL, params SqlParameter[] pList)
        {
            return RunDateTime(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回DateTime型单一结果
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DateTime RunDateTimeProc(string procName, params SqlParameter[] pList)
        {
            return RunDateTime(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunInt 执行查询，返回int型单一结果
        /// <summary>
        /// 执行查询，返回int型单一结果
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunInt(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            return Convert.ToInt32(RunScalar(cmdType, strSQL, pList));
        }
        /// <summary>
        /// 执行查询，返回int型单一结果
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunInt(string strSQL, params SqlParameter[] pList)
        {
            return RunInt(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回int型单一结果
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public int RunIntProc(string procName, params SqlParameter[] pList)
        {
            return RunInt(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunBool 执行查询，返回bool型单一结果
        /// <summary>
        /// 执行查询，返回bool型单一结果
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public bool RunBool(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            return Convert.ToBoolean(RunScalar(cmdType, strSQL, pList));
        }
        /// <summary>
        /// 执行查询，返回bool型单一结果
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public bool RunBool(string strSQL, params SqlParameter[] pList)
        {
            return RunBool(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回bool型单一结果
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public bool RunBoolProc(string procName, params SqlParameter[] pList)
        {
            return RunBool(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunDouble 执行查询，返回double型单一结果
        /// <summary>
        /// 执行查询，返回double型单一结果
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public double RunDouble(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            return Convert.ToDouble(RunScalar(cmdType, strSQL, pList));
        }
        /// <summary>
        /// 执行查询，返回double型单一结果
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public double RunDouble(string strSQL, params SqlParameter[] pList)
        {
            return RunDouble(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，返回double型单一结果
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public double RunDoubleProc(string procName, params SqlParameter[] pList)
        {
            return RunDouble(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunDataSet 执行查询，并填充至DataSet
        /// <summary>
        /// 执行查询，并填充至DataSet
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public DataSet RunDataSet(string strSQL, params SqlParameter[] pList)
        {
            return RunDataSet(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，并填充至DataSet
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DataSet RunDataSet(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                DataSet ds = new DataSet();
                using (SqlCommand cmd = GetCommand(cmdType, strSQL, pList))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(ds);
                    }
                }
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，并填充至DataSet
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DataSet RunDataSetProc(string procName, params SqlParameter[] pList)
        {
            return RunDataSet(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunDataTable 执行查询，并填充至DataTable
        /// <summary>
        /// 执行查询，并填充至DataTable
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public DataTable RunDataTable(string strSQL, params SqlParameter[] pList)
        {
            return RunDataTable(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，并填充至DataTable
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DataTable RunDataTable(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                DataTable table = new DataTable("Table");
                using (SqlDataReader reader = RunReader(cmdType, strSQL, pList))
                {
                    table.Load(reader);
                }
                return table;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，并填充至DataTable
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public DataTable RunDataTableProc(string procName, params SqlParameter[] pList)
        {
            return RunDataTable(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region RunEntity 执行查询，将单一记录映射成实体
        /// <summary>
        /// 执行查询，将单一记录映射成实体
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public T RunEntity<T>(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                T entity = default(T);
                using (SqlDataReader reader = RunReader(cmdType, strSQL, pList))
                {
                    while (reader.Read())
                    {
                        //获取字段总数
                        int colCount = reader.FieldCount;
                        //获取实体类型
                        Type objType = typeof(T);
                        //实例化实体
                        ConstructorInfo constructor = objType.GetConstructor(Type.EmptyTypes);
                        entity = (T)constructor.Invoke(null);
                        //给实体赋值
                        for (int i = 0; i < colCount; i++)
                        {
                            PropertyInfo property = objType.GetProperty(reader.GetName(i));
                            if (property != null)
                            {
                                property.SetValue(entity, reader[i] == DBNull.Value ? null : reader[i], null);
                            }
                        }
                    }
                }
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，将单一记录映射成实体
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public T RunEntity<T>(string strSQL, params SqlParameter[] pList)
        {
            return RunEntity<T>(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，将单一记录映射成实体
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public T RunEntityProc<T>(string procName, params SqlParameter[] pList)
        {
            return RunEntity<T>(CommandType.StoredProcedure, procName, pList);
        }
        #endregion

        #region Delete 执行删除操作
        /// <summary>
        /// 执行删除操作
        /// </summary>
        /// <param name="entity">要删除的实体</param>
        public bool Delete<T>(T entity)
        {
            try
            {
                //获取实体类型
                Type objType = entity.GetType();
                PropertyInfo[] arrProperty = objType.GetProperties();

                StringBuilder strWhere = new StringBuilder(" 1=1 ");
                List<SqlParameter> arrSqlParameter = new List<SqlParameter>();
                foreach (PropertyInfo p in arrProperty)
                {
                    //if (p.GetCustomAttributes(typeof(PrimaryKey), false).Length > 0) {
                    object value = p.GetValue(entity, null);
                    if (value != null)
                    {
                        strWhere.AppendFormat(" AND {0}=@{0} ", p.Name);
                        arrSqlParameter.Add(new SqlParameter("@" + p.Name, value));
                    }
                }
                string strSql = string.Format("DELETE FROM {0} WHERE {1}"
                    , objType.Name
                    , strWhere.ToString());
                return RunNonQuery(strSql, arrSqlParameter.ToArray()) > 0;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        #endregion

        #region Dispose 对象销毁
        /// <summary>
        /// 对象销毁
        /// </summary>
        public void Dispose()
        {
            try
            {
                CloseConnection();
                connection.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Insert 执行插入操作
        /// <summary>
        /// 执行插入操作
        /// </summary>
        /// <param name="entity">要插入数据库的实体</param>
        public int Insert<T>(T entity)
        {
            try
            {
                //获取实体类型
                Type objType = entity.GetType();
                PropertyInfo[] arrProperty = objType.GetProperties();

                StringBuilder strInsert = new StringBuilder(arrProperty.Length);
                StringBuilder strValues = new StringBuilder(arrProperty.Length);
                List<SqlParameter> arrSqlParameter = new List<SqlParameter>(arrProperty.Length);
                foreach (PropertyInfo p in arrProperty)
                {
                    object value = p.GetValue(entity, null);
                    if (value != null && p.GetCustomAttributes(typeof(Identity), false).Length == 0)
                    {
                        strInsert.AppendFormat("{0},", p.Name);
                        strValues.AppendFormat("@{0},", p.Name);
                        arrSqlParameter.Add(new SqlParameter("@" + p.Name, value));
                    }
                }
                string strSql = string.Format("INSERT INTO {0}({1}) VALUES({2});SELECT @@IDENTITY;"
                    , objType.Name
                    , strInsert.ToString().TrimEnd(',')
                    , strValues.ToString().TrimEnd(','));
                return RunInt(strSql, arrSqlParameter.ToArray());

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        #endregion

        #region Update 执行更新操作
        /// <summary>
        /// 执行更新操作
        /// </summary>
        /// <param name="entity">要更新的实体</param>
        public bool Update<T>(T entity)
        {
            try
            {
                //获取实体类型
                Type objType = entity.GetType();
                PropertyInfo[] arrProperty = objType.GetProperties();

                StringBuilder strSetFields = new StringBuilder();
                StringBuilder strWhere = new StringBuilder(" 1=1 ");
                List<SqlParameter> arrSqlParameter = new List<SqlParameter>();
                foreach (PropertyInfo p in arrProperty)
                {
                    object value = p.GetValue(entity, null);
                    if (p.GetCustomAttributes(typeof(PrimaryKey), false).Length == 0)
                    {
                        if ( p.GetCustomAttributes(typeof(Identity), false).Length == 0)
                        {
                            strSetFields.AppendFormat("{0}=@{0},", p.Name);
                            arrSqlParameter.Add(new SqlParameter("@" + p.Name, value));
                        }
                    }
                    else
                    {
                        strWhere.AppendFormat(" AND {0}=@{0}", p.Name);
                        arrSqlParameter.Add(new SqlParameter("@" + p.Name, value));
                    }
                }
                string strSql = string.Format("UPDATE {0} SET {1} WHERE {2}"
                    , objType.Name
                    , strSetFields.ToString().TrimEnd(',')
                    , strWhere.ToString());
                return RunNonQuery(strSql, arrSqlParameter.ToArray()) > 0;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        #endregion

        #region RunList 执行查询，并填充至List集合
        /// <summary>
        /// 执行查询，并填充至List集合
        /// </summary>
        /// <param name="cmdType">命令类别</param>
        /// <param name="strSQL">SQL语句或存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public List<T> RunList<T>(CommandType cmdType, string strSQL, params SqlParameter[] pList)
        {
            try
            {
                List<T> list = new List<T>();
                using (SqlDataReader reader = RunReader(cmdType, strSQL, pList))
                {
                    while (reader.Read())
                    {
                        //获取字段总数
                        int colCount = reader.FieldCount;
                        //获取实体类型
                        Type objType = typeof(T);
                        //实例化实体
                        ConstructorInfo constructor = objType.GetConstructor(Type.EmptyTypes);
                        T entity = (T)constructor.Invoke(null);
                        //给实体赋值
                        for (int i = 0; i < colCount; i++)
                        {
                            PropertyInfo property = objType.GetProperty(reader.GetName(i));
                            if (property != null)
                            {
                                property.SetValue(entity, reader[i] == DBNull.Value ? null : reader[i], null);
                            }
                        }
                        //将实体添加至集合中
                        list.Add(entity);
                    }
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection();
            }
        }
        /// <summary>
        /// 执行查询，并填充至List集合
        /// </summary>
        /// <param name="strSQL">SQL语句</param>
        /// <param name="pList">SQL参数列表</param>
        public List<T> RunList<T>(string strSQL, params SqlParameter[] pList)
        {
            return RunList<T>(CommandType.Text, strSQL, pList);
        }
        /// <summary>
        /// 执行查询，并填充至List集合
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="pList">SQL参数列表</param>
        public List<T> RunListProc<T>(string procName, params SqlParameter[] pList)
        {
            return RunList<T>(CommandType.StoredProcedure, procName, pList);
        }
        /// <summary>
        /// 执行分页查询，并填充至List集合
        /// </summary>
        /// <param name="condition">要分页排序的字段</param>
        /// <param name="Fields">要查询的字段</param>
        /// <param name="TableName">要查询的表或视图名</param>
        /// <param name="Where">查询条件</param>
        /// <param name="Order">排序规则</param>
        /// <param name="PageIndex">页码</param>
        /// <param name="PageSize">页尺寸</param>
        /// <param name="Total">总记录数</param>
        /// <param name="pList">参数列表</param>
        /// <returns></returns>
        public List<T> RunList<T>(string condition, string Fields, string TableName, string Where, string Order, int PageIndex, int PageSize, out int Total, params SqlParameter[] pList)
        {
            string Wheres = "1=1";
            if (Where.Length > 0)
                Where = Wheres + " and " + Where;
            else
                Where = Wheres;
            string strSql_Count = string.Format("SELECT COUNT(*) FROM {0} ", TableName);
            string strSql = "";
            //if (Order.Trim() != "")
            //{
            //    strSql = string.Format("SELECT {0} FROM (select top 1000000  {0},ROW_NUMBER() OVER (ORDER BY {2}) as rank from {1}" + " where {5}  ORDER BY {6})  as t where rank between (select count(*)-{3} from {1} where {5}) and (select count(*)-{4} from {1} where {5})", Fields, TableName, condition, PageSize * PageIndex - 1, PageSize * (PageIndex - 1), Where, Order);
            //}
            //else
            //{
            strSql = string.Format("SELECT {0} FROM (select {0},ROW_NUMBER() OVER (ORDER BY {2}) as rank from {1}" + " where {5})  as t where rank between (select count(*)-{3} from {1} where {5}) and (select count(*)-{4} from {1} where {5})", Fields, TableName, condition, PageSize * PageIndex - 1, PageSize * (PageIndex - 1), Where);
            //}
            if (!string.IsNullOrEmpty(Where))
            {
                strSql_Count += " WHERE " + Where;

                strSql += " and " + Where;
            }
            if (!string.IsNullOrEmpty(Order))
            {
                strSql += " ORDER BY " + Order;
            }
            Total = Convert.ToInt32(RunScalar(strSql_Count, pList));
            return RunList<T>(strSql, pList);
        }

        #endregion
    }
}
