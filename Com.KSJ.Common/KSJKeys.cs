using System;
using System.Collections.Generic;
using System.Text;

namespace Com.KSJ.Common
{
    public class KSJKeys
    {
        //系统版本
        /// <summary>
        /// 版本号全称
        /// </summary>
        public const string ASSEMBLY_VERSION = "2.0.0";
        /// <summary>
        /// 版本年号
        /// </summary>
        public const string ASSEMBLY_YEAR = "2014";
        //File======================================================
        /// <summary>
        /// 插件配制文件名
        /// </summary>
        public const string FILE_PLUGIN_XML_CONFING = "plugin.config";
        /// <summary>
        /// 站点配置文件名
        /// </summary>
        public const string FILE_SITE_XML_CONFING = "Configpath";
        /// <summary>
        /// URL配置文件名
        /// </summary>
        public const string FILE_URL_XML_CONFING = "Urlspath";
        /// <summary>
        /// 用户配置文件名
        /// </summary>
        public const string FILE_USER_XML_CONFING = "Userpath";
        /// <summary>
        /// 升级代码
        /// </summary>
        public const string FILE_URL_UPGRADE_CODE = "267C2643EE401DD2F0A06084F7931C4DEC76E7CAA1996481FE8F5081A8936409058D07A6F5E2941C";
        /// <summary>
        /// 消息代码
        /// </summary>
        public const string FILE_URL_NOTICE_CODE = "267C2643EE401DD2F0A06084F7931C4DEC76E7CAA1996481FE8F5081A8936409D037BEA6A623A0A1";

        //Directory==================================================
        /// <summary>
        /// ASPX目录
        /// </summary>
        public const string DIRECTORY_REWRITE_ASPX = "aspx";
        /// <summary>
        /// HTML目录
        /// </summary>
        public const string DIRECTORY_REWRITE_HTML = "html";

        //Cache======================================================
        /// <summary>
        /// 站点配置
        /// </summary>
        public const string CACHE_SITE_CONFIG = "ksj_cache_site_config";
        /// <summary>
        /// 用户配置
        /// </summary>
        public const string CACHE_USER_CONFIG = "ksj_cache_user_config";
        /// <summary>
        /// 客户端站点配置
        /// </summary>
        public const string CACHE_SITE_CONFIG_CLIENT = "ksj_cache_site_client_config";
        /// <summary>
        /// HttpModule映射类
        /// </summary>
        public const string CACHE_SITE_HTTP_MODULE = "ksj_cache_http_module";
        /// <summary>
        /// URL重写映射表
        /// </summary>
        public const string CACHE_SITE_URLS = "ksj_cache_site_urls";
        /// <summary>
        /// 升级通知
        /// </summary>
        public const string CACHE_OFFICIAL_UPGRADE = "ksj_official_upgrade";
        /// <summary>
        /// 官方消息
        /// </summary>
        public const string CACHE_OFFICIAL_NOTICE = "ksj_official_notice";

        //Session=====================================================
        /// <summary>
        /// 验证码
        /// </summary>
        public const string SESSION_CODE = "ksj_session_code";
        /// <summary>
        /// 后台管理员
        /// </summary>
        public const string SESSION_ADMIN_INFO = "KSJ_SESSION_ADMIN_INFO";
        /// <summary>
        /// 登录信息
        /// </summary>
        public const string SESSION_LOGIN_INFO = "KSJ_SESSION_LOGIN_INFO";


        /// <summary>
        /// 单位信息
        /// </summary>
        public const string SESSION_ORGANIZETYPE = "KSJ_SESSION_ORGANIZETYPE";
        
        /// <summary>
        /// 项目信息
        /// </summary>
        public const string SESSION_PROJECT_INFO = "KSJ_SESSION_PROJECT_INFO";


        /// <summary>
        /// 标段信息
        /// </summary>
        //public const string SESSION_SECTION_INFO = "KSJ_SESSION_SECTION_INFO";

        /// <summary>
        /// 用户
        /// </summary>
//        public const string SESSION_USER_INFO = "ksj_session_user_info";

        //Cookies=====================================================
        /// <summary>
        /// 防重复
        /// </summary>
        public const string COOKIE_DIGG_KEY = "ksj_cookie_digg_key";
        /// <summary>
        /// 记住用户名
        /// </summary>
        public const string COOKIE_USER_NAME_REMEMBER = "ksj_cookie_user_name_remember";
        /// <summary>
        /// 记住密码
        /// </summary>
        public const string COOKIE_password_REMEMBER = "ksj_cookie_password_remember";
        /// <summary>
        /// 用户电子邮箱
        /// </summary>
        public const string COOKIE_USER_EMAIL = "ksj_cookie_user_email";
    }
}
