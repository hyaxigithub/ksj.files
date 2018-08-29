using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
using System.Data;
using System.Text;
using System.Collections;

namespace Com.KSJ.Common
{
    /// <summary> 
    /// JSON帮助类 
    /// </summary> 
    public class JSONHelper
    {
        /// <summary> 
        /// 对象转JSON 
        /// </summary> 
        /// <param name="obj">对象</param> 
        /// <returns>JSON格式的字符串</returns> 
        public static string ObjectToJSON(object obj)
        {
        //  JavaScriptSerializer jss = new JavaScriptSerializer();
        
            try
            {
                return new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue }.Serialize(obj);
            }
            catch (Exception ex)
            {
                return "[]";
            }
        }
        ///// <summary> 
        ///// 对象转JSON 
        ///// </summary> 
        ///// <param name="obj">对象</param> 
        ///// <returns>JSON格式的字符串</returns> 
        //public static string ObjectToJSON2(object obj)
        //{
        //    JavaScriptSerializer jss = new JavaScriptSerializer();
        //    try
        //    {
        //        return jss.Serialize(obj);
        //    }
        //    catch (Exception ex)
        //    {
        //        return "[]";
        //    }
        //}
        /// <summary> 
        /// 数据表转键值对集合 
        /// 把DataTable转成 List集合, 存每一行 
        /// 集合中放的是键值对字典,存每一列 
        /// </summary> 
        /// <param name="dt">数据表</param> 
        /// <returns>哈希表数组</returns> 
        public static List<Dictionary<string, object>> DataTableToList(DataTable dt)
        {
            List<Dictionary<string, object>> list
            = new List<Dictionary<string, object>>();
            foreach (DataRow dr in dt.Rows)
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    dic.Add(dc.ColumnName, dr[dc.ColumnName]);
                }
                list.Add(dic);
            }
            return list;
        }
        /// <summary> 
        /// 数据集转键值对数组字典 
        /// </summary> 
        /// <param name="dataSet">数据集</param> 
        /// <returns>键值对数组字典</returns> 
        public static Dictionary<string, List<Dictionary<string, object>>> DataSetToDic(DataSet ds)
        {
            Dictionary<string, List<Dictionary<string, object>>> result = new Dictionary<string, List<Dictionary<string, object>>>();
            foreach (DataTable dt in ds.Tables)
                result.Add(dt.TableName, DataTableToList(dt));
            return result;
        }
        /// <summary> 
        /// 数据表转JSON 
        /// </summary> 
        /// <param name="dataTable">数据表</param> 
        /// <returns>JSON字符串</returns> 
        //         public static string DataTableToJSON(DataTable dt)
        //         {
        //             return ObjectToJSON(DataTableToList(dt));
        // 
        //         }

        #region dataTable转换成Json格式
        /// <summary>  
        /// dataTable转换成Json格式  
        /// </summary>  
        /// <param name="dt"></param>  
        /// <returns></returns>  
        public static string DataTableToJSON(DataTable dt)
        {
            if (dt == null)
            {
                return "[]";
            }
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    jsonBuilder.Append("\"");
                    jsonBuilder.Append(dt.Columns[j].ColumnName);
                    jsonBuilder.Append("\":\"");
                    jsonBuilder.Append(dt.Rows[i][j].ToString().Replace("\\", "\\\\").Replace("\n", "\\n").Replace("\r\\n", "\\n")).Replace("\t", string.Empty);
                    jsonBuilder.Append("\",");
                }
                jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
                jsonBuilder.Append("},");
            }
            if (jsonBuilder.Length > 1)
            {
                jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            }
            jsonBuilder.Append("]");
            return jsonBuilder.ToString();
        }

        /// <summary>
        /// dataTable转换成Json格式,附带上列信息
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string DataTableToJSON(DataTable dt, out string jsonColType)
        {
            jsonColType = "[]";
            if (dt != null)
            {
                StringBuilder jsonBuilder = new StringBuilder();
                jsonBuilder.Append("[{");
                foreach (DataColumn dc in dt.Columns)
                {
                    jsonBuilder.Append("\"");
                    jsonBuilder.Append(dc.ColumnName);
                    jsonBuilder.Append("\":\"");
                    jsonBuilder.Append(dc.DataType.ToString());
                    jsonBuilder.Append("\",");
                }
                if (jsonBuilder.Length > 2)
                {
                    jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
                }
                jsonBuilder.Append("}]");

                jsonColType = jsonBuilder.ToString();
            }

            return DataTableToJSON(dt);
        }

        /// <summary>
        /// 转化成DataGrid的json数据
        /// </summary>
        /// <param name="totalCount"></param>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string DtToDataGridJson(int totalCount, DataTable dt)
        {
            return "{\"total\":" + totalCount + ",\"rows\":" + DataTableToJSON(dt) + "}";
        }
        #endregion dataTable转换成Json格式

        #region  DataSet转换为Json
        /// <summary>    
        /// DataSet转换为Json   
        /// </summary>    
        /// <param name="dataSet">DataSet对象</param>   
        /// <returns>Json字符串</returns>    
     

        /// <summary> 
        /// JSON文本转对象,泛型方法 
        /// </summary> 
        /// <typeparam name="T">类型</typeparam> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>指定类型的对象</returns> 
        public static T JSONToObject<T>(string jsonText)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            try
            {
                return jss.Deserialize<T>(jsonText);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONHelper.JSONToObject(): " + ex.Message);
            }
        }
        /// <summary> 
        /// 将JSON文本转换为数据表数据 
        /// </summary> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>数据表字典</returns> 
        public static Dictionary<string, List<Dictionary<string, object>>> TablesDataFromJSON(string jsonText)
        {
            return JSONToObject<Dictionary<string, List<Dictionary<string, object>>>>(jsonText);
        }
        /// <summary> 
        /// 将JSON文本转换成数据行 
        /// </summary> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>数据行的字典</returns> 
        public static Dictionary<string, object> DataRowFromJSON(string jsonText)
        {
            return JSONToObject<Dictionary<string, object>>(jsonText);
        }

        /// <summary>
        /// Json 字符串 转换为 DataTable数据集合
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static DataTable ToDataTable(string json)
        {
            DataTable dataTable = new DataTable();  //实例化
            DataTable result;
            try
            {
                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                javaScriptSerializer.MaxJsonLength = Int32.MaxValue; //取得最大数值
                ArrayList arrayList = javaScriptSerializer.Deserialize<ArrayList>(json);
                if (arrayList.Count > 0)
                {
                    foreach (Dictionary<string, object> dictionary in arrayList)
                    {
                        //                         if (dictionary.Keys.Count<string>() == 0)
                        //                         {
                        //                             result = dataTable;
                        //                             return result;
                        //                         }
                        if (dataTable.Columns.Count == 0)
                        {
                            foreach (string current in dictionary.Keys)
                            {
                                dataTable.Columns.Add(current, dictionary[current].GetType());
                            }
                        }
                        DataRow dataRow = dataTable.NewRow();
                        foreach (string current in dictionary.Keys)
                        {
                            dataRow[current] = dictionary[current];
                        }

                        dataTable.Rows.Add(dataRow); //循环添加行到DataTable中
                    }
                }
            }
            catch
            {
            }
            result = dataTable;
            return result;
        }

        #endregion


        #region 通用方法
        /// <summary>
        /// 格式化字符型、日期型、布尔型
        /// </summary>
        public static string StringFormat(string str, Type type)
        {
            if (type == typeof(string))
            {
                str = StringFilter(str);
                str = "\"" + str + "\"";
            }
            else if (type == typeof(DateTime) || type == typeof(DateTime?))
            {
                str = "\"" + str + "\"";
            }
            else if (type == typeof(bool))
            {
                str = str.ToLower();
            }
            else if (type == typeof(Guid))
            {
                str = "\"" + str + "\"";
            }
            else if (type != typeof(string) && string.IsNullOrEmpty(str))
            {
                str = "\"" + str + "\"";
            }
            return str;
        }
        /// <summary>
        /// 过滤字符串
        /// </summary>
        public static string StringFilter(string str)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < str.Length; i++)
            {
                char c = str.ToCharArray()[i];
                switch (c)
                {
                    case '\"':
                        sb.Append("\\\""); break;
                    case '\\':
                        sb.Append("\\\\"); break;
                    case '/':
                        sb.Append("\\/"); break;
                    case '\b':
                        sb.Append("\\b"); break;
                    case '\f':
                        sb.Append("\\f"); break;
                    case '\n':
                        sb.Append("\\n"); break;
                    case '\r':
                        sb.Append("\\r"); break;
                    case '\t':
                        sb.Append("\\t"); break;
                    default:
                        sb.Append(c); break;
                }
            }
            return sb.ToString();
        }

        public static string ToJson(DataSet dataSet)
        {
            string jsonString = "{";
            foreach (DataTable table in dataSet.Tables)
            {
                jsonString += "\"" + table.TableName + "\":" + ToJson(table) + ",";
            }
            jsonString = jsonString.TrimEnd(',');
            return jsonString + "}";
        }
 
        /// <summary>     
        /// Datatable转换为Json     
        /// </summary>    
        public static string ToJson(DataTable dt)
        {
            if (dt != null && dt.Rows.Count > 0)
            {
                StringBuilder jsonString = new StringBuilder();
                jsonString.Append("[");
                DataRowCollection drc = dt.Rows;
                for (int i = 0; i < drc.Count; i++)
                {
                    jsonString.Append("{");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        string strKey = dt.Columns[j].ColumnName;
                        string strValue = drc[i][j].ToString();

                        Type type = dt.Columns[j].DataType;
                        jsonString.Append("\"" + strKey + "\":");
                        strValue = StringFormat(strValue, type);
                        if (j < dt.Columns.Count - 1)
                            jsonString.Append(strValue + ",");
                        else
                            jsonString.Append(strValue);
                    }
                    jsonString.Append("},");
                }
                jsonString.Remove(jsonString.Length - 1, 1);
                jsonString.Append("]");
                return jsonString.ToString();
            }
            else
                return "[]";
        }

        #endregion

      

    }

}
