using System;
using System.Security.Cryptography;
using System.Text;

namespace Com.KSJ.Common
{
    /// <summary>
    /// DES加密/解密类。
    /// </summary>
    public class DESEncrypt
    {

        #region ========加密========

        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string Encrypt(string Text)
        {
            string res = string.Empty;
            try
            {
                res = Encrypt(Text, "YaSys");
            }
            catch (System.Exception)
            {
                res = string.Empty;
            }
            return res;
        }
        /// <summary>
        /// 服务器配置加密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string ServerConifgEncrypt(string Text)
        {
            return Encrypt(Text, "SKJServerDES");
        }
        /// <summary> 
        /// 加密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string Encrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray;
            inputByteArray = Encoding.Default.GetBytes(Text);
            des.Key = ASCIIEncoding.ASCII.GetBytes(MD5.Encrypt(sKey, true).Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(MD5.Encrypt(sKey, true).Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            return ret.ToString();
        }

        #endregion

        #region ========解密========

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string Decrypt(string Text)
        {
            string res = string.Empty;
            try
            {
                res = Decrypt(Text, "YaSys");
            }
            catch (System.Exception)
            {
                res = string.Empty;
            }
            return res;
        }
        /// <summary>
        /// 服务器配置解密
        /// </summary>
        /// <param name="Text"></param>
        /// <returns></returns>
        public static string ServerConifgDecrypt(string Text)
        {
            return Decrypt(Text, "SKJServerDES");
        }
        /// <summary> 
        /// 解密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string Decrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            int len;
            len = Text.Length / 2;
            byte[] inputByteArray = new byte[len];
            int x, i;
            for (x = 0; x < len; x++)
            {
                i = Convert.ToInt32(Text.Substring(x * 2, 2), 16);
                inputByteArray[x] = (byte)i;
            }
            des.Key = ASCIIEncoding.ASCII.GetBytes(MD5.Encrypt(sKey, true).Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(MD5.Encrypt(sKey, true).Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            return Encoding.Default.GetString(ms.ToArray());
        }

        #endregion

        /// <summary>
        /// 获取MD5
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string GetMD5(string str)
        {
            //return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(str, "MD5");
            return MD5.Encrypt(str, true);
        }


    }
}
