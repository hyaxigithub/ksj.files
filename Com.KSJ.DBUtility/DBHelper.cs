/******************************************************
文件名:DBHelper.cs
版本(c)  2.0.0
创建日期:2013/04/08
修改日期:2013/04/11
*****************************************************/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Reflection;

namespace Com.KSJ.DBUtility
{
    public class DBHelper
    {
        #region  Db调用

        /// <summary>
        /// 默认的数据库连接
        /// </summary>
        private static string _connectionString = ConfigurationManager.AppSettings["ConnectionString"];

        /// <summary>
        /// 数据库类型 默认支持sqlserver数据库
        /// </summary>
        private static string _dbProviderName = string.IsNullOrEmpty(ConfigurationManager.AppSettings["dbProviderName"])
                                                    ? "System.Data.SqlClient"
                                                    : ConfigurationManager.AppSettings["dbProviderName"];

        [ThreadStatic]
        private static DBHelper _helper;

        public static string ConnectString
        {
            get { return _connectionString; }
            set { _connectionString = value; }
        }

        public static string BbProviderName
        {
            get { return _dbProviderName; }
            set { _dbProviderName = value; }
        }

        /// <summary>
        /// 创建默认的数据库访问类
        /// </summary>
        /// <returns></returns>
        public static DBHelper Db
        {
            get
            {
                if (_helper == null)
                {
                    _helper = new DBHelper(_connectionString, _dbProviderName);
                    return _helper;
                }
                return _helper;
            }
        }

        #endregion

        private string connectionString = string.Empty;
        private readonly DbProviderFactory factory;

        public DBHelper(string connectionString, string dbProviderName)
        {
            this.connectionString = connectionString;
            factory = DbProviderFactories.GetFactory(dbProviderName);
        }

        public string Constring
        {
            get { return this.connectionString; }
            set { this.connectionString = value; }
        }
        /// <summary>
        /// 开启事务
        /// </summary>
        public DbTransaction BeginTransaction(DbConnection connection)
        {
            return connection.BeginTransaction();
        }

        /// <summary>
        /// 提交事务 并且 释放并关闭资源
        /// </summary>
        public void CommitTransaction(DbTransaction transaction)
        {
            transaction.Commit();
        }

        /// <summary>
        /// 回滚事务 并且 释放并关闭资源
        /// </summary>
        public void RollbackTransaction(DbTransaction transaction)
        {
            transaction.Rollback();
        }

        private DbCommand CreateCommand(DbTransaction transaction, DbConnection conn, CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            DbCommand mand = conn.CreateCommand();
            mand.CommandText = cmdText;
            mand.CommandType = cmdType;
            if (cmdParas != null)
            {
                for (int i = 0; i < cmdParas.Length; i++)
                {
                    if (cmdParas[i] != null)
                    {
                        mand.Parameters.Add(cmdParas[i]);
                    }
                }
            }
            if (transaction != null) mand.Transaction = transaction;
            return mand;
        }

        /// <summary>
        /// 返回一个数据集
        /// </summary>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public DataSet ExecuteDataSet(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                DbCommand mand = CreateCommand(null, conn, cmdType, cmdText, cmdParas);
                DbDataAdapter data = factory.CreateDataAdapter();
                data.SelectCommand = mand;
                var ds = new DataSet();
                data.Fill(ds);
                return ds;
            }
        }

        private void PrepareCommand(SqlCommand cmd, SqlConnection conn, SqlTransaction trans, string cmdText, DbParameter[] cmdParms)
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            if (trans != null)
                cmd.Transaction = trans;
            cmd.CommandType = CommandType.Text;//cmdType;
            if (cmdParms != null)
            {


                foreach (SqlParameter parameter in cmdParms)
                {
                    if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
                        (parameter.Value == null))
                    {
                        parameter.Value = DBNull.Value;
                    }
                    cmd.Parameters.Add(parameter);
                }
            }
        }

        public DataTable ExecuteDataTb2(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(cmd, connection, null, cmdText, cmdParas);
                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                {
                    DataTable dt = new DataTable();
                    DataSet ds = new DataSet();
                    try
                    {
                        da.Fill(ds);
                        da.Fill(dt);
                        cmd.Parameters.Clear();
                    }
                    catch (System.Data.SqlClient.SqlException ex)
                    {
                        throw new Exception(ex.Message);
                    }
                    return dt;
                }
            }
        }
        /// <summary>
        /// 返回一个数据集
        /// </summary>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public DataTable ExecuteDataTb(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            try
            {
                using (var conn = factory.CreateConnection())
                {
                    conn.ConnectionString = connectionString;
                    conn.Open();
                    DbCommand mand = CreateCommand(null, conn, cmdType, cmdText, cmdParas);
                    DbDataAdapter data = factory.CreateDataAdapter();
                    data.SelectCommand = mand;
                    var tb = new DataTable();
                    data.Fill(tb);
                    mand.Parameters.Clear();
                    return tb;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// 返回受影响的行数
        /// </summary>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public int ExecuteNonQuery(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                DbCommand mand = CreateCommand(null, conn, cmdType, cmdText, cmdParas);
              
                mand.CommandTimeout = 360;
                int res = mand.ExecuteNonQuery();
                mand.Parameters.Clear();
                return res;
            }
        }

        /// <summary>
        /// 返回结果集中第一行第一列
        /// </summary>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public object ExecuteScalar(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                DbCommand mand = CreateCommand(null, conn, cmdType, cmdText, cmdParas);
                object res = mand.ExecuteScalar();
                mand.Parameters.Clear();
                return res;
            }
        }

        /// <summary>
        /// 返回泛型集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public IList<T> ExecuteReaderList<T>(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                DbCommand mand = CreateCommand(null, conn, cmdType, cmdText, cmdParas);
                using (DbDataReader reader = mand.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    mand.Parameters.Clear();
                    IList<T> list = ToList<T>(reader);
                    return list;
                }
            }
        }

        /// <summary>
        /// 返回一个对象 如数据库无结果返回将抛出异常
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public T ExecuteReaderObject<T>(CommandType cmdType, string cmdText, params DbParameter[] cmdParas)
        {
            IList<T> tList = ExecuteReaderList<T>(cmdType, cmdText, cmdParas);
            if (tList.Count > 0)
                return tList[0];
            return default(T);
        }

        /// <summary>
        /// 反射创建泛型集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="reader"></param>
        /// <returns></returns>
        private IList<T> ToList<T>(DbDataReader reader)
        {
            Type type = typeof(T);
            IList<T> list = null;
            if (type.IsValueType || type == typeof(string))
                list = CreateValue<T>(reader, type);
            else
                list = CreateObject<T>(reader, type);
            return list;
        }

        private IList<T> CreateObject<T>(DbDataReader reader, Type type)
        {
            IList<T> list = new List<T>();
            PropertyInfo[] properties = type.GetProperties();
            string name = string.Empty;
            while (reader.Read())
            {
                var local = Activator.CreateInstance<T>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    name = reader.GetName(i);
                    if (reader[name] != null && reader[name] != DBNull.Value)
                    {
                        foreach (PropertyInfo info in properties)
                        {
                            if (name.ToLower().Equals(info.Name.ToLower()))
                            {
                                           info.SetValue(local, ChangeType(info.PropertyType, reader[name]), null);
                                break;
                            }
                        }
                    }
                }
                list.Add(local);
            }
            return list;
        }

        public static object ChangeType(Type type, object value)
        {

            //var val = value as string;
            //if (val != null && !type.IsPrimitive)
            //{
            //    if (val.ToLower() == "null")
            //    {
            //        return null;
            //    }
            //}

            if ((value == null) && type.IsGenericType)
            {

                return Activator.CreateInstance(type);

            }

            if (value == null || value.ToString() == string.Empty)
            {

                return null;

            }

            if (type == value.GetType())
            {

                return value;

            }

            if (type.IsEnum)
            {

                if (value is string)
                {

                    return Enum.Parse(type, value as string);

                }

                return Enum.ToObject(type, value);

            }

            if (!type.IsInterface && type.IsGenericType)
            {

                Type type1 = type.GetGenericArguments()[0];

                object obj1 = ChangeType(type1, value);
                if (obj1 == null)
                    return null;
                return Activator.CreateInstance(type, new object[] { obj1 });
            }

            if ((value is string) && (type == typeof(Guid)))
            {

                return new Guid(value as string);

            }

            if ((value is string) && (type == typeof(Version)))
            {

                return new Version(value as string);

            }

            if (!(value is IConvertible))
            {

                return value;

            }
            if (type.IsPrimitive && value is string && value.ToString() == "")
            {
                return null;
            }
            return Convert.ChangeType(value, type);

        }
        private IList<T> CreateValue<T>(DbDataReader reader, Type type)
        {
            IList<T> list = new List<T>();
            while (reader.Read())
            {
                var local = (T)Convert.ChangeType(reader[0], type, null);
                list.Add(local);
            }
            return list;
        }

        #region 简化CommType

        public DataTable ExecuteDataTable(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteDataTb(CommandType.Text, cmdText, cmdParas);
        }

        public DataSet ExecuteDataSet(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteDataSet(CommandType.Text, cmdText, cmdParas);
        }

        public int ExecuteNonQuery(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteNonQuery(CommandType.Text, cmdText, cmdParas);
        }

        public object ExecuteScalar(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteScalar(CommandType.Text, cmdText, cmdParas);
        }

        public IList<T> ExecuteReaderList<T>(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteReaderList<T>(CommandType.Text, cmdText, cmdParas);
        }


        public T ExecuteReaderObject<T>(string cmdText, params DbParameter[] cmdParas)
        {
            return ExecuteReaderObject<T>(CommandType.Text, cmdText, cmdParas);
        }

        /// <summary>
        /// 将DataTable简化为对象集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <returns></returns>
        public IList<T> ConvertTbToObject<T>(DataTable table)
        {
            IList<T> list = new List<T>();
            PropertyInfo[] properties = typeof(T).GetProperties();
            foreach (DataRow row in table.Rows)
            {
                var local = Activator.CreateInstance<T>();
                for (int i = 0; i < table.Columns.Count; i++)
                {
                    string name = table.Columns[i].ColumnName;
                    if (row[name] == null || row[name] == DBNull.Value) continue;
                    foreach (PropertyInfo info in properties)
                    {
                        if (name.ToLower().Equals(info.Name.ToLower()))
                        {
                            info.SetValue(local, Convert.ChangeType(row[name], info.PropertyType), null);
                            break;
                        }
                    }
                }
                list.Add(local);
            }
            return list;
        }

        #endregion

        #region 辅助方法

        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[])</param>        
        public void ExecuteSqlTran(Hashtable SQLStringList)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                var trans = BeginTransaction(conn);
                try
                {

                    //循环
                    foreach (DictionaryEntry myDE in SQLStringList)
                    {
                        string cmdText = myDE.Key.ToString();
                        var cmdParms = (DbParameter[])myDE.Value;
                        ExecuteNonQuery(cmdText, cmdParms);
                    }
                    CommitTransaction(trans);
                }
                catch (Exception)
                {
                    RollbackTransaction(trans);
                    throw;
                }
            }
        }

        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="arrayList">包含字符串的ArrayList</param>        
        public void ExecuteSqlTran(ArrayList arrayList)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                var trans = BeginTransaction(conn);
                try
                {

                    //循环
                    foreach (string sql in arrayList)
                    {
                        string cmdText = sql;
                        ExecuteNonQuery(cmdText);
                    }
                    CommitTransaction(trans);
                }
                catch (Exception)
                {
                    RollbackTransaction(trans);
                    throw;
                }
            }
        }

        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="arrayList">包含字符串的ArrayList</param>        
        public void ExecuteSqlTran(List<string> arrayList)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                var trans = BeginTransaction(conn);
                try
                {

                    //循环
                    foreach (string sql in arrayList)
                    {
                        string cmdText = sql;
                        ExecuteNonQuery(cmdText);
                    }
                    CommitTransaction(trans);
                }
                catch (Exception)
                {
                    RollbackTransaction(trans);
                    throw;
                }
            }
        }
        /// <summary>
        /// 执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="sqlPars">语句实体对象</param>        
        public void ExecuteSqlParsTran(params SqlPars[] sqlPars)
        {
            using (var conn = factory.CreateConnection())
            {
                conn.ConnectionString = connectionString;
                conn.Open();
                var tran = BeginTransaction(conn);
                try
                {
                    if (sqlPars.Length == 0)
                        return;

                    //循环
                    foreach (SqlPars sqlPar in sqlPars)
                    {
                        ExecuteNonQuery(sqlPar.SqlString, sqlPar.DbParams);
                    }
                    CommitTransaction(tran);
                }
                catch (Exception)
                {
                    RollbackTransaction(tran);
                    throw;
                }
            }
        }

        public IEnumerable<string> GetDbInfo(bool apara)
        {
            var tablelist = new List<string>();
            try
            {
                string _tempstr;

                using (DbConnection conn = factory.CreateConnection())
                {
                    conn.ConnectionString = connectionString;
                    conn.Open();
                    DataTable dt = conn.GetSchema("Tables");
                    foreach (DataRow row in dt.Rows)
                    {
                        //取出数据库中系统表外的所有表名
                        if (row[3].ToString().ToUpper() == "BASE TABLE")
                        {
                            _tempstr = row[2].ToString();
                            tablelist.Add(_tempstr.ToUpper());
                        }
                    }
                    if (apara)
                    {
                        for (int i = 0; i < tablelist.Count; i++)
                        {
                            DataTable temptable = ExecuteDataTable("select * from " + tablelist[i] + " where 1=0");
                            tablelist[i] += "★" + temptable.Columns.Count + "★";
                            _tempstr = "";
                            for (int j = 0; j < temptable.Columns.Count; j++)
                            {
                                _tempstr = _tempstr + temptable.Columns[j] + "★";
                            }
                            tablelist[i] += _tempstr;
                        }
                    }
                    return tablelist;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return tablelist;
        }

        public DbParameter ParIn(string paramName, object value)
        {
            DbParameter par = factory.CreateParameter();
            if (par != null)
            {
                par.ParameterName = paramName;
                par.Value = value;
                return par;
            }
            throw new SqlTypeException("不能创建参数");
        }

        public DbParameter ParOut(string paramName, DbType type, int size = 0)
        {
            DbParameter par = factory.CreateParameter();
            if (par != null)
            {
                par.ParameterName = paramName;
                par.Direction = ParameterDirection.Output;
                par.DbType = type;
                if (size > 0)
                {
                    par.Size = size;
                }
                return par;
            }
            throw new SqlTypeException("不能创建参数");
        }

        #endregion
    }

    public class SqlPars
    {
        public string SqlString { get; set; }
        public DbParameter[] DbParams { get; set; }
    }
}