using System;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using System.IO;
using System.Web;
using System.Net.Mail;
namespace Com.KSJ.Common
{
    public class KSJMail
    {
        /// <summary>
        /// 邮箱配置应修改为可在界面上设置相关信息及保存到数据库或xml文件中
        /// </summary>
        public string webname = "北京跨世纪软件技术有限公司";
        public string weburl = "http://www.ksj.com.cn/";
        public string webtel = "010-8254606";
        /// <summary>
        /// STMP服务器
        /// </summary>
        public static string emailstmp = "smtp.ym.163.com";
        /// <summary>
        /// SMTP端口
        /// </summary>
        public static int emailport = 25;
        /// <summary>
        /// 发件人地址
        /// </summary>
        public static string emailfrom = "cloud.system@ksj.com.cn";
        /// <summary>
        /// 邮箱账号
        /// </summary>
        public static string emailusername = "cloud.system@ksj.com.cn";
        /// <summary>
        /// 邮箱密码
        /// </summary>
        public static string emailpassword = "4fWXBllj89";
        /// <summary>
        /// 发件人昵称
        /// </summary>
        public static string emailnickname = "北京跨世纪软件技术有限公司系统邮件";

        #region 发送电子邮件
        /// <summary>
        /// 发送电子邮件
        /// </summary>
        /// <param name="smtpserver">SMTP服务器</param>
        /// <param name="userName">登录帐号</param>
        /// <param name="pwd">登录密码</param>
        /// <param name="nickName">发件人昵称</param>
        /// <param name="strfrom">发件人</param>
        /// <param name="strto">收件人</param>
        /// <param name="subj">主题</param>
        /// <param name="bodys">内容</param>
        public static void sendMail(string smtpserver, string userName, string pwd, string nickName, string strfrom, string strto, string subj, string bodys)
        {
            SmtpClient _smtpClient = new SmtpClient();
            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            _smtpClient.Host = smtpserver;//指定SMTP服务器
            _smtpClient.Credentials = new System.Net.NetworkCredential(userName, pwd);//用户名和密码

            //MailMessage _mailMessage = new MailMessage(strfrom, strto);
            MailAddress _from = new MailAddress(strfrom, nickName);
            MailAddress _to = new MailAddress(strto);
            MailMessage _mailMessage = new MailMessage(_from, _to);
            _mailMessage.Subject = subj;//主题
            _mailMessage.Body = bodys;//内容
            _mailMessage.BodyEncoding = System.Text.Encoding.UTF8;//.Default;//正文编码
            _mailMessage.IsBodyHtml = true;//设置为HTML格式
            _mailMessage.Priority = MailPriority.Normal;//优先级
            _smtpClient.Send(_mailMessage);
        }

        /// <param name="strto">收件人</param>
        /// <param name="subj">主题</param>
        /// <param name="bodys">内容</param>
        public static void sendMail(string strto, string subj, string bodys)
        {
            SmtpClient _smtpClient = new SmtpClient();
            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            _smtpClient.Host = emailstmp;//指定SMTP服务器
            _smtpClient.Credentials = new System.Net.NetworkCredential(emailusername, emailpassword);//用户名和密码

            MailAddress _from = new MailAddress(emailfrom,emailnickname);
            MailAddress _to = new MailAddress(strto);
            MailMessage _mailMessage = new MailMessage(_from, _to);
            _mailMessage.Subject = subj;//主题
            _mailMessage.Body = bodys;//内容
            _mailMessage.BodyEncoding = System.Text.Encoding.UTF8;//.Default;//正文编码
            _mailMessage.IsBodyHtml = true;//设置为HTML格式
            _mailMessage.Priority = MailPriority.Normal;//优先级
            _smtpClient.Send(_mailMessage);
        }

        #endregion
    }
}
