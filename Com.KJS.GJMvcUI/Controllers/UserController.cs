﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Com.KJS.GJMvcUI.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult Signup()
        {
            return View();
        }

        public ActionResult Private()
        {
            return View();
        }
    }
}