using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Data.Common;

namespace Com.KSJ.DBUtility
{
    public class SqlStringBuilder
    {

        public DBHelper Db { get; set; }

        /// <summary>
        /// 数据库名
        /// </summary>
        public string DbName = string.Empty;

        /// <summary>
        /// 泛型方法，反射生成SQLInsert语句
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        public string CreateInsertSQL<T>(T entity, out DbParameter[] pars)
        {
            //1.先获取实体的类型描述
            Type type = entity.GetType();
            //2.获得实体的属性集合
            PropertyInfo[] props = type.GetProperties();

            pars = new DbParameter[props.Length];
            //实例化一个StringBuilder做字符串的拼接
            StringBuilder sb = new StringBuilder();
            string tbname = GetTableName(entity);
            if (!tbname.StartsWith("["))
            {
                tbname = "[" + tbname + "]";
            }
            sb.Append("insert into " + DbName + tbname + " (");
            int cnt = 0;
            string endsql = "";
            //3.遍历实体的属性集合
            foreach (PropertyInfo prop in props)
            {
                //取得该property的UsageAttribute的值
                object[] uAttr = prop.GetCustomAttributes(typeof(UsageAttribute), false);
                object o = prop.GetValue(entity, null);
                if (uAttr.Length == 0 && o != null)
                {
                    //4.将属性的名字加入到字符串中
                    sb.Append("[" + prop.Name + "],");
                    DbParameter par = Db.ParIn("@" + prop.Name, o);
                    pars[cnt] = par;
                    endsql += "@" + prop.Name + ",";
                    cnt++;
                }
                //else if (o != null && (uAttr[0] as UsageAttribute).UsageType == UsageType.ID)
                //{
                //    sb.Append("[" + prop.Name + "],");
                //    DbParameter par = Db.ParIn("@" + prop.Name, o);
                //    pars[cnt] = par;
                //    endsql += "@" + prop.Name + ",";
                //    cnt++;
                //}
            }
            //**去掉最后一个逗号
            if (endsql.Length > 0)
            {
                endsql = endsql.Remove(endsql.Length - 1, 1);
            }
            //**去掉最后一个逗号
            sb.Remove(sb.Length - 1, 1);
            sb.Append(" ) values(");
            sb.Append(endsql);
            sb.Append(")");
            return sb.ToString();

        }

        /// <summary>
        /// 生成对象查找Sql
        /// </summary>
        /// <typeparam name="T">数据类型</typeparam>
        /// <returns>Sql语句</returns>
        public string GenerateSelectSql<T>(string typeName)
        {
            return "select * from " + DbName + typeName;
        }

        /// <summary>
        /// 生成对象查找Sql
        /// </summary>
        /// <typeparam name="T">数据类型</typeparam>
        /// <returns>Sql语句</returns>
        public string GenerateCountSelectSql<T>(string typeName)
        {
            return "select count(*) from " + DbName + typeName;
        }

        /// <summary>
        /// 生成UPDATE语句
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <param name="tObj">实体对象</param>
        /// <param name="tableName">对应的数据库的表的名字</param>
        /// <returns>生成的update语句</returns>
        public string GenerateUpdateSQL<T>(T tObj)  //???其实可以更灵活 ，加上参数(string primaryKeyName, ojb objID) 这样可以支持各种类型的表结构
        {
            Type type = tObj.GetType();
            Dictionary<string, string> keyvalues;
            Dictionary<string, string> fieldsAndValues = getFieldsAndValues<T>(tObj, out keyvalues);
            //采用stringbuilder可以提高效率
            StringBuilder updateSQL = new StringBuilder();

            updateSQL.Append("UPDATE ").Append(DbName + GetTableName(tObj)).Append("  SET  ");

            foreach (KeyValuePair<string, string> fv in fieldsAndValues)
            {
                if (fv.Value == "[null]")
                {
                    updateSQL.Append("[" + fv.Key + "]").Append(" =NULL ").Append(",");
                }
                else
                {
                    updateSQL.Append("[" + fv.Key + "]").Append(" = ").Append(fv.Value).Append(",");
                }
            }
            updateSQL.Remove(updateSQL.Length - 1, 1);  //移除最后一个 ”，“
            updateSQL.Append("  WHERE ");
            //通过反射取得该实体的ID的值
            //string tObjID = typeof(T).GetProperty("ID").GetValue(tObj, null).ToString();

            foreach (KeyValuePair<string, string> fv in keyvalues)
            {
                updateSQL.Append("[" + fv.Key + "]").Append(" = ").Append(fv.Value).Append(" and ");
            }
            if (keyvalues.Count > 0)
            {
                updateSQL.Remove(updateSQL.Length - 4, 4);
            }
            else
            {
                throw new Exception("实体类必须定义主键字段");
            }
            return updateSQL.ToString();
        }


        /// <summary>
        /// 生成DELETE语句
        /// </summary>
        /// <param name="entityID">要删除的实体的ID</param>
        /// <param name="tableName">对应的表的名字</param>
        /// <returns></returns>
        public string GenerateDeleteSQL<T>(T tObj, string keyName, out DbParameter par)
        {
            Type type = tObj.GetType();
            var tObjID = tObj.GetType().GetProperty(keyName).GetValue(tObj, null);
            string deleteSQL = "DELETE  FROM " + DbName + GetTableName(tObj) + " WHERE " + "[" + keyName + "]" + "= @" + keyName;
            par = Db.ParIn("@" + keyName, tObjID);
            return deleteSQL;
        }

        /// <summary>
        /// 生成DELETE语句
        /// </summary>
        /// <param name="entityID">要删除的实体的ID</param>
        /// <param name="tableName">对应的表的名字</param>
        /// <returns></returns>
        public string GenerateDeSQL<T>(T tObj, ref  List<DbParameter> pars)
        {
            Type type = tObj.GetType();
            Dictionary<string, string> keyvalues;
            //Dictionary<string, string> fieldsAndValues = getFieldsAndValues<T>(tObj, out keyvalues);
            keyvalues = GetKeyFieldsAndValues<T>(tObj);
            string deleteSQL = "DELETE  FROM " + DbName + GetTableName(tObj) + " WHERE 1=1 ";
            if (pars == null)
            {
                pars = new List<DbParameter>();
            }
            foreach (var key in keyvalues.Keys)
            {
                deleteSQL += " and [" + key + "]" + "= @" + key + " ";
                var par = Db.ParIn("@" + key, Delstrvalinfo(keyvalues[key]));
                pars.Add(par);
            }
            if (keyvalues.Keys.Count == 0)
            {
                deleteSQL += "and 1=2";
            }
            return deleteSQL;
        }

        private string Delstrvalinfo(string vinfo)
        {
            string val = vinfo;
            if (val.StartsWith("'"))
            {
                val = val.Remove(0, 1);
            }
            if (val.EndsWith("'"))
            {
                val = val.Remove(val.Length - 1);
            }
            return val;
        }

        /// <summary>
        /// 生成是否存在Sql语句
        /// </summary>
        /// <param name="tObj">实体对象</param>
        /// <param name="tableName">对应的表的名字</param>
        /// <returns></returns>
        public string GenerateExistsSQL<T>(T tObj, ref  List<DbParameter> pars)
        {
            Type type = tObj.GetType();
            Dictionary<string, string> keyvalues = GetKeyFieldsAndValues<T>(tObj);
            string existsSql = "select count(*)  FROM " + DbName + GetTableName(tObj) + " WHERE  1=1 ";
            if (pars == null)
            {
                pars = new List<DbParameter>();
            }
            foreach (var key in keyvalues.Keys)
            {
                existsSql += " and [" + key + "]" + "= @" + key + "";
                var par = Db.ParIn("@" + key, Delstrvalinfo(keyvalues[key]));
                pars.Add(par);
            }
            if (keyvalues.Keys.Count == 0)
            {
                existsSql += " and 1=2 ";
            }
            return existsSql;
        }

        /// <summary>
        /// 获取实体对应的数据表名称
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tObj"></param>
        /// <returns></returns>
        public string GetTableName<T>(T tObj)
        {
            if (tObj == null)
            {
                tObj = System.Activator.CreateInstance<T>();
            }
            //数据库表名默认为实体类名称
            string tableName = tObj.GetType().Name;

            //该系统数据表都是以“t_”作为前缀
            if (!tableName.StartsWith("t_"))
            {
                tableName = "t_" + tableName;
            }

            //如果设置了字段"TableName"，则取该字段的值
            FieldInfo fInfo = tObj.GetType().GetField("TableName");
            if (fInfo != null)
            {
                tableName = fInfo.GetValue(tObj).ToString();
            }

            return tableName;
        }

        /// <summary>
        ///  生成字段 和 values的列表，用Dictionary形式存储
        /// </summary>
        private Dictionary<string, string> getFieldsAndValues<T>(T tObj, out Dictionary<string, string> keyvals)
        {
            Dictionary<string, string> fieldsAndValues = new Dictionary<string, string>();
            keyvals = new Dictionary<string, string>();
            PropertyInfo[] properties = tObj.GetType().GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                //取得该property的UsageAttribute的值
                object[] uAttr = propertyInfo.GetCustomAttributes(typeof(UsageAttribute), false);

                //如果该property无UsageAttribute类型的Attribute，说明是用于所有场合的,相当于 Usage.UPDATA_QUERY
                if (uAttr.Length == 0) // ||   ((UsageAttribute)uAttr[0]).UsageType == UsageType.UPDATE ||  ((UsageAttribute)uAttr[0]).UsageType == UsageType.UPDATE_QUERY)
                {
                    string propertyValue = string.Empty;
                    Type propertyType = propertyInfo.PropertyType;
                    //对于字符和datetime，要加上引号
                    //如果该实体对象某个property是空值的话，直接跳过该property的处理  
                    if (propertyInfo.GetValue(tObj, null) == null)
                    {
                        propertyValue = "[null]";
                    }
                    else if (propertyType == typeof(System.DateTime) || propertyType == typeof(System.DateTime?))
                    {
                        propertyValue = "'" + propertyInfo.GetValue(tObj, null).ToString() + "'";
                    }
                    else if (propertyType == typeof(System.String))
                    {
                        propertyValue = "N'" + propertyInfo.GetValue(tObj, null).ToString().Replace("'", "''") + "'";
                    }
                    else if (propertyType == typeof(Boolean?) || propertyType == typeof(System.Boolean))
                    {
                        propertyValue = propertyInfo.GetValue(tObj, null).ToString() == "False" ? "0" : "1";
                    }
                    else
                    {
                        propertyValue = propertyInfo.GetValue(tObj, null).ToString();
                    }
                    fieldsAndValues.Add(propertyInfo.Name, propertyValue);
                }
                else if (uAttr.Length > 0)
                {
                    switch ((uAttr[0] as UsageAttribute).UsageType)
                    {
                        case UsageType.ID:
                            //如果该实体对象某个property是空值的话，直接跳过该property的处理  
                            if (propertyInfo.GetValue(tObj, null) == null)
                                continue;
                            string propertyValue = string.Empty;
                            Type propertyType = propertyInfo.PropertyType;
                            //对于字符和datetime，要加上引号
                            if (propertyType == typeof(System.DateTime) || propertyType == typeof(System.DateTime?))
                            {
                                propertyValue = "'" + propertyInfo.GetValue(tObj, null).ToString() + "'";
                            }
                            else if (propertyType == typeof(System.String))
                            {
                                propertyValue = "N'" + propertyInfo.GetValue(tObj, null).ToString().Replace("'", "''") + "'";
                            }
                            else
                            {
                                propertyValue = propertyInfo.GetValue(tObj, null).ToString();
                            }

                            keyvals.Add(propertyInfo.Name, propertyValue);
                            break;
                    }
                }
            }
            return fieldsAndValues;
        }

        /// <summary>
        ///  生成主键字段 和 value的列表，用Dictionary形式存储
        /// </summary>
        public Dictionary<string, string> GetKeyFieldsAndValues<T>(T tObj)
        {
            Dictionary<string, string> fieldsAndValues = new Dictionary<string, string>();
            PropertyInfo[] properties = tObj.GetType().GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                //如果该实体对象某个property是空值的话，直接跳过该property的处理  
                if (propertyInfo.GetValue(tObj, null) == null)
                    continue;
                //取得该property的UsageAttribute的值
                object[] uAttr = propertyInfo.GetCustomAttributes(typeof(UsageAttribute), false);
                if (uAttr.Length > 0 && (uAttr[0] as UsageAttribute).UsageType == UsageType.ID)
                {
                    string propertyValue = string.Empty;
                    Type propertyType = propertyInfo.PropertyType;
                    //对于字符和datetime，要加上引号
                    if (propertyType == typeof(System.String) || propertyType == typeof(System.DateTime) || propertyType == typeof(System.DateTime?))
                    {
                        propertyValue = "'" + propertyInfo.GetValue(tObj, null).ToString() + "'";
                    }
                    else
                    {
                        propertyValue = propertyInfo.GetValue(tObj, null).ToString();
                    }
                    fieldsAndValues.Add(propertyInfo.Name, propertyValue);
                }
            }
            return fieldsAndValues;
        }

        public bool SetModelValue(string FieldName, string Value, object obj)
        {
            try
            {
                Type Ts = obj.GetType();
                object v = Convert.ChangeType(Value, Ts.GetProperty(FieldName).PropertyType);
                Ts.GetProperty(FieldName).SetValue(obj, v, null);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public string BuildSqlWithSqlParameter(string sql, System.Data.Common.DbParameter[] paras)
        {
            System.Data.Common.DbParameter[] arrParas = new System.Data.Common.DbParameter[paras.Length];

            for (int i = 0; i < paras.Length; i++)
            {
                arrParas[i] = paras[i];
            }

            Array.Sort(arrParas, new DbParameterForSort());

            object[] objParas = new object[arrParas.Length];

            for (int i = 0; i < arrParas.Length; i++)
            {
                // if(arrParas[i].Value == null)
                //continue;
                sql = sql.Replace(arrParas[i].ParameterName, "{" + i.ToString() + "}");

                switch (arrParas[i].DbType)
                {
                    case System.Data.DbType.AnsiString:
                    case System.Data.DbType.AnsiStringFixedLength:
                    case System.Data.DbType.String:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = arrParas[i].Value;
                        }
                        break;
                    case System.Data.DbType.StringFixedLength:
                    case System.Data.DbType.Xml:
                        objParas[i] = arrParas[i].Value as string;
                        break;

                    case System.Data.DbType.Boolean:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = arrParas[i].Value.ToString();
                        }
                        break;

                    case System.Data.DbType.Date:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = ((DateTime)arrParas[i].Value).ToString("yyyy-MM-dd");
                        }
                        break;

                    case System.Data.DbType.DateTime:
                    case System.Data.DbType.DateTime2:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = Convert.ToDateTime(arrParas[i].Value);// ((DateTime)arrParas[i].Value).ToString("yyyy-MM-dd HH:mm:ss");
                        }
                        break;
                    case System.Data.DbType.Time:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = ((DateTime)arrParas[i].Value).ToString("HH:mm:ss");
                        }
                        break;
                    case System.Data.DbType.Byte:
                    case System.Data.DbType.UInt16:
                    case System.Data.DbType.UInt32:
                    case System.Data.DbType.UInt64:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = ulong.Parse(arrParas[i].Value.ToString());
                        }
                        break;

                    case System.Data.DbType.Decimal:
                    case System.Data.DbType.Double:
                    case System.Data.DbType.Single:
                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = double.Parse(arrParas[i].Value.ToString());
                        }
                        break;

                    case System.Data.DbType.Int16:
                    case System.Data.DbType.Int32:
                    case System.Data.DbType.Int64:
                    case System.Data.DbType.SByte:

                        if (arrParas[i].Value == null)
                        {
                            objParas[i] = null;
                        }
                        else
                        {
                            objParas[i] = long.Parse(arrParas[i].Value.ToString());
                        }
                        break;

                    default:
                        throw new System.Data.DataException(string.Format("Invalid parameter DataType: {0}", arrParas[i].DbType));
                }
            }

            return BuildSql(sql, objParas);
        }

        class DbParameterForSort : IComparer<System.Data.Common.DbParameter>
        {

            #region IComparer<DbParameter> Members

            public int Compare(System.Data.Common.DbParameter x, System.Data.Common.DbParameter y)
            {
                return y.ParameterName.CompareTo(x.ParameterName);
            }

            #endregion
        }

        public static string BuildSql(string sql, object[] paras)
        {
            if (paras == null)
            {
                return sql;
            }
            else
            {
                object[] parameters = new object[paras.Length];
                paras.CopyTo(parameters, 0);

                for (int i = 0; i < parameters.Length; i++)
                {
                    object obj = parameters[i];

                    if (obj == null)
                    {
                        parameters[i] = "NULL";
                    }
                    else if (obj is string)
                    {
                        parameters[i] = string.Format("'{0}'",
                            ((string)obj).Replace("'", "''"));
                    }
                    else if (obj is bool)
                    {
                        parameters[i] = string.Format("'{0}'", obj);
                    }
                    else if (obj is DateTime)
                    {
                        parameters[i] = string.Format("'{0}'",
                            ((DateTime)obj).ToString("yyyy-MM-dd HH:mm:ss"));
                    }
                    else if (obj is byte[])
                    {
                        StringBuilder sb = new StringBuilder();

                        sb.Append("0x");

                        foreach (byte b in (byte[])obj)
                        {
                            sb.AppendFormat("{0:x1}", b);
                        }

                        parameters[i] = sb.ToString();
                    }
                    else
                    {
                        parameters[i] = obj.ToString();
                    }

                }

                return string.Format(sql, parameters);
            }
        }


        /// <summary>
        /// 给sql查询语句之前加上“and”
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        public string FormatSqlWhere(string strWhere)
        {
            if (strWhere == null || strWhere.Trim() == string.Empty)
            {
                return string.Empty;
            }
            else
            {
                strWhere = strWhere.TrimStart();
                if (strWhere.StartsWith("and", StringComparison.CurrentCultureIgnoreCase))
                {
                    strWhere = strWhere.Substring(3);
                }
                return " WHERE " + strWhere;
            }
        }

    }

    /// <summary>
    /// 对应实体类的property的使用场合，UsageType.NONE: 不用于任何场合
    /// UsageType.UPDATE :用于insert, update, delete
    /// UsageType.QUERY: 用于select结果的显示和处理
    /// UsageType.UPDATE_QUERY:用于所有场合 (缺省值)
    /// </summary>
    [global::System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    public sealed class UsageAttribute : Attribute
    {
        private readonly UsageType usageType;// = UsageType.UPDATE_QUERY;   //缺省值

        public UsageAttribute(UsageType usageType)
        {
            this.usageType = usageType;
        }

        ///// <summary>
        ///// 缺省构造函数，虽然没有参数，但UsageType这个属性默认为UsageType.UPDATE_QUERY,
        ///// 表示同时支持 “修改” 和 “查询” 操作
        ///// </summary>
        //public UsageAttribute()
        //{
        //}

        // This is a named parameter
        public UsageType UsageType
        {
            get { return usageType; }
            //           set { usageType = value; }
        }
    }

    /// <summary>
    /// 用于UsageAttribute的枚举类型，UPDATE表示用于insert,update,delete操作， Query用于Select操作
    /// </summary>
    public enum UsageType
    {
        ID = 0,              //ID
        QUERYONLY = 1,        //仅用于查询和显示，不能用于insert,update,delete操作
        //  UPDATE = 2,
        //   UPDATE_QUERY = 3
        Extra = 5 //附加的属性、非数据库字段
    }


}
