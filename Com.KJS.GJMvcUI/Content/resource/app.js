webpackJsonp([9], {
    "0F0d": function(t, e, n) {
        "use strict";
        e.a = {
            name: "no-ssr",
            props: ["placeholder"],
            data: function() {
                return {
                    canRender: !1
                }
            },
            mounted: function() {
                this.canRender = !0
            },
            render: function(t) {
                return this.canRender ? this.$slots.
			default &&this.$slots.
			default [0]:
				t("div", {
				    class: ["no-ssr-placeholder"]
				}, this.$slots.placeholder || this.placeholder)
            }
        }
    },
    "1TNd": function(t, e, n) {
        "use strict";
        var r = n("mtWM"),
			o = n.n(r),
			a = n("QBda");
        e.a = function(t) {
            var e = t.app,
				n = e.router,
				r = e.store;
            n.afterEach(function(t, e) {
                var n, i, u, s = r.state.request.referer ? (n = r.state.request.referer, i = n.split("//"), u = i[1].indexOf("/"), i[1].substring(u)) : null;
                o.a.post(a.a.uri.common.gpm(), {
                    fromUrl: s,
                    toUrl: t.fullPath
                })
            })
        }
    },
    "3o5/": function(t, e, n) {
        "use strict";
        var r = n("aYjo");
        e.a = {
            getPublicCategoryTree: function(t) {
                return r.a.get("/category/tree/public", "", t)
            },
            getPrivateCategoryTree: function(t, e) {
                return r.a.get("/category/tree/private/collect", {
                    version: t
                }, e)
            },
            getPrivateCategoryCount: function(t, e) {
                return r.a.get("/rfa/private/collect/count", {
                    version: t
                }, e)
            }
        }
    },
    "406b": function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.d(e, "state", function() {
            return r
        }), n.d(e, "mutations", function() {
            return o
        });
        n("BYei");
        var r = function() {
            return {
                info: null
            }
        },
			o = {
			    setUser: function(t, e) {
			        t.info = e
			    }
			}
    },
    "4Atj": function(t, e, n) {
        var r = {
            "auth.js" /*tpa=http://www.goujianwu.com/_nuxt/auth.js*/
			: "4K/y",
            "../404" /*tpa=http://www.goujianwu.com/_nuxt/setCookie.js*/
			: "wpLj",
            "../404" /*tpa=http://www.goujianwu.com/_nuxt/user.js*/
			: "XXJY"
        };

        function o(t) {
            return n(a(t))
        }
        function a(t) {
            var e = r[t];
            if (!(e + 1)) throw new Error("Cannot find module '" + t + "'.");
            return e
        }
        o.keys = function() {
            return Object.keys(r)
        }, o.resolve = a, t.exports = o, o.id = "4Atj"
    },
    "4K/y": function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r, o = n("Xxa5"),
			a = n.n(o),
			i = n("exGp"),
			u = n.n(i);
        n("BYei");
        e.
	default = (r = u()(a.a.mark(function t(e) {
	    var n, r = e.store,
            o = e.redirect,
            i = e.req,
            u = e.isDev;
	    return a.a.wrap(function(t) {
	        for (;;) switch (t.prev = t.next) {
	            case 0:
	                if (null != r.state.user.info) {
	                    t.next = 3;
	                    break
	                }
	                return n = "http://" + (u ? "dev" : "www") + ".goujianwu.com" + i.originalUrl, t.abrupt("return", o("/signin?destination=" + encodeURIComponent(n)));
	            case 3:
	            case "end":
	                return t.stop()
	        }
	    }, t, this)
	})), function(t) {
	    return r.apply(this, arguments)
	})
    },
    "8fs5": function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.d(e, "state", function() {
            return u
        }), n.d(e, "mutations", function() {
            return s
        }), n.d(e, "actions", function() {
            return c
        });
        var r = n("pFYg"),
			o = n.n(r),
			a = n("BO1k"),
			i = n.n(a),
			u = function() {
			    return {
			        data: {
			            categoryId: "",
			            keyword: "",
			            page: 1,
			            pageSize: 72,
			            version: ""
			        },
			        status: {
			            categoryId: "",
			            keyword: "",
			            version: ""
			        },
			        url: ""
			    }
			},
			s = {
			    categoryId: function(t, e) {
			        t.data.categoryId = e
			    },
			    categoryStatus: function(t, e) {
			        t.status.categoryId = e
			    },
			    page: function(t, e) {
			        t.data.page = e
			    },
			    pageSize: function(t, e) {
			        t.data.pageSize = e
			    },
			    keyword: function(t, e) {
			        t.data.keyword = e, t.status.keyword = e
			    },
			    url: function(t, e) {
			        t.url = e
			    },
			    version: function(t, e) {
			        t.data.version = e, t.status.version = e ? "Revit" + e : e
			    }
			},
			c = {
			    categoryId: function(t, e) {
			        var n = t.commit;
			        n("categoryId", e), n("page", 1)
			    },
			    categoryStatus: function(t) {
			        var e = t.state,
						n = t.commit,
						r = t.rootState,
						a = e.data.categoryId;
			        if (a) {
			            var u = [];
			            switch (2 == a.length ? 1 : 4 == a.length ? 2 : 6 == a.length ? 3 : -1) {
			                case 1:
			                    u.push(a);
			                    break;
			                case 2:
			                    u.push(a.substr(0, 2)), u.push(a);
			                    break;
			                case 3:
			                    u.push(a.substr(0, 2)), u.push(a.substr(0, 4)), u.push(a)
			            }
			            if (0 == u.length) n("categoryStatus", "未知分类");
			            else {
			                var s = [],
								c = r.category.categories,
								f = function(t) {
								    var e = c.find(function(e) {
								        return e.categoryId == Number(t)
								    });
								    if (!e) return n("categoryStatus", "未知分类"), {
								        v: void 0
								    };
								    s.push(e.nameZh), c = e.children
								},
								l = !0,
								d = !1,
								p = void 0;
			                try {
			                    for (var h, m = i()(u); !(l = (h = m.next()).done); l = !0) {
			                        var v = f(h.value);
			                        if ("object" === (void 0 === v ? "undefined" : o()(v))) return v.v
			                    }
			                } catch (t) {
			                    d = !0, p = t
			                } finally {
			                    try {
			                        !l && m.
			                        return &&m.
			                        return ()
			                        } finally {
			                            if (d) throw p
			                        }
			                }
			                n("categoryStatus", s.join(" -> "))
			            }
			        }
			    },
			    page: function(t, e) {
			        (0, t.commit)("page", e)
			    },
			    pageSize: function(t, e) {
			        (0, t.commit)("pageSize", e)
			    },
			    keyword: function(t, e) {
			        var n = t.commit;
			        n("keyword", e), n("page", 1), n("categoryId", "")
			    },
			    version: function(t, e) {
			        (0, t.commit)("version", e)
			    }
			}
    },
    ASvw: function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.d(e, "state", function() {
            return r
        }), n.d(e, "mutations", function() {
            return o
        });
        var r = function() {
            return {
                currentTab: "",
                searchUrl: "",
                showSearch: !1,
                currentUrl: ""
            }
        },
			o = {
			    showSearch: function(t, e) {
			        t.showSearch = e
			    },
			    setCurrentUrl: function(t, e) {
			        t.currentUrl = e
			    },
			    setCurrentTab: function(t, e) {
			        t.currentTab = e
			    },
			    setSearchUrl: function(t, e) {
			        t.searchUrl = e
			    }
			}
    },
    BGcx: function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.d(e, "state", function() {
            return c
        }), n.d(e, "mutations", function() {
            return f
        }), n.d(e, "actions", function() {
            return l
        });
        var r = n("Xxa5"),
			o = n.n(r),
			a = n("exGp"),
			i = n.n(a),
			u = n("cjsc"),
			s = function(t) {
			    return {
			        id: t.id,
			        rfaId: t.rfaId,
			        name: t.name,
			        favorites: t.favorites
			    }
			},
			c = function() {
			    return {
			        crumbs: [],
			        family: {
			            id: 0,
			            categoryId: "",
			            name: "",
			            favorites: !1,
			            thumbnails: [],
			            minVersion: 2014,
			            versions: [],
			            types: [],
			            currentType: "",
			            owner: ""
			        },
			        isPublic: !0,
			        recommendations: []
			    }
			},
			f = {
			    changeType: function(t, e) {
			        t.family.types.some(function(t) {
			            return t.name == e
			        }) && (t.family.currentType = e)
			    },
			    setCategoryId: function(t, e) {
			        t.categoryId = "" + e
			    },
			    setCrumbs: function(t, e) {
			        t.crumbs = e
			    },
			    setFavorites: function(t, e) {
			        t.family.favorites = e
			    },
			    setId: function(t, e) {
			        t.family.id = e
			    },
			    setIsPublic: function(t, e) {
			        t.isPublic = e
			    },
			    setMinVersion: function(t, e) {
			        t.family.minVersion = e
			    },
			    setName: function(t, e) {
			        t.family.name = e
			    },
			    setOwner: function(t, e) {
			        t.family.owner = e
			    },
			    setRecommendations: function(t, e) {
			        t.recommendations = e
			    },
			    setThumbnails: function(t, e) {
			        t.family.thumbnails = e
			    },
			    setTypes: function(t, e) {
			        t.family.types = e
			    },
			    setVersions: function(t, e) {
			        t.family.versions = e
			    }
			},
			l = {
			    loadFamily: function() {
			        var t = i()(o.a.mark(function t(e, n) {
			            var r, a, i, s, c = e.commit,
							f = e.rootState;
			            return o.a.wrap(function(t) {
			                for (;;) switch (t.prev = t.next) {
			                    case 0:
			                        return t.next = 2, u.a.getFamilyDetail(n, f.request.context);
			                    case 2:
			                        if (r = t.sent) {
			                            c("setId", r.familyBean.id), c("setCategoryId", r.familyBean.categoryId), c("setName", r.familyBean.name), c("setOwner", r.familyBean.buildOwner), c("setVersions", r.familyBean.versions), c("setMinVersion", Math.min.apply(Math, r.familyBean.versions)), c("setFavorites", r.favorites), c("setIsPublic", r.isPublic), r.familyBean.familyTypes && r.familyBean.familyTypes.length > 0 && (c("setTypes", r.familyBean.familyTypes), c("changeType", r.familyBean.familyTypes[0].name)), a = [{
			                                name: r.isPublic ? "公共构件" : "我的构件",
			                                url: r.isPublic ? "/public" : "/private"
			                            }], i = r.crumbs;
			                            do {
			                                a.push({
			                                    name: i.nameZh,
			                                    url: (r.isPublic ? "/public" : "/private") + "?categoryId=" + i.categoryId
			                                }), i = i.children && i.children.length > 0 ? i.children[0] : null
			                            } while (null != i);
			                            c("setCrumbs", a), s = [0, 45, 90, 135, 180, 225, 270, 315].map(function(t) {
			                                return "http://static.goujianwu.com/metadata/" + r.familyBean.rfaId + "/thumbnails/512_" + t + ".png"
			                            }), c("setThumbnails", s)
			                        }
			                    case 4:
			                    case "end":
			                        return t.stop()
			                }
			            }, t, this)
			        }));
			        return function(e, n) {
			            return t.apply(this, arguments)
			        }
			    }(),
			    loadRecommendations: function() {
			        var t = i()(o.a.mark(function t(e, n) {
			            var r, a = e.commit,
							i = e.rootState;
			            return o.a.wrap(function(t) {
			                for (;;) switch (t.prev = t.next) {
			                    case 0:
			                        return t.next = 2, u.a.getRecommendations(n, 6, i.request.context);
			                    case 2:
			                        r = t.sent, a("setRecommendations", r.map(s));
			                    case 4:
			                    case "end":
			                        return t.stop()
			                }
			            }, t, this)
			        }));
			        return function(e, n) {
			            return t.apply(this, arguments)
			        }
			    }()
			}
    },
    BN6k: function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), n.d(e, "state", function() {
            return r
        }), n.d(e, "mutations", function() {
            return o
        });
        var r = function() {
            return {
                context: {
                    cookie: "",
                    ip: "",
                    ua: ""
                },
                referer: ""
            }
        },
			o = {
			    setCookie: function(t, e) {
			        t.context.cookie = e
			    },
			    setReferer: function(t, e) {
			        t.referer = e
			    },
			    setIP: function(t, e) {
			        t.context.ip = e
			    },
			    setUA: function(t, e) {
			        t.context.ua = e
			    }
			}
    },
    BYei: function(t, e, n) {
        "use strict";
        var r = n("aYjo");
        e.a = {
            getUser: function(t) {
                try {
                    return r.a.get("/user", "", t)
                } catch (t) {
                    return console.log(t), null
                }
            }
        }
    },
    F88d: function(t, e, n) {
        "use strict";
        var r = n("WR/d"),
			o = n("P+aQ"),
			a = !1;
        var i = function(t) {
            a || n("OtQ/")
        },
			u = n("VU/8")(r.a, o.a, !1, i, null, null);
        u.options.__file = "../404" /*tpa=http://www.goujianwu.com/_nuxt/.nuxt/components/nuxt-loading.vue*/
		, e.a = u.exports
    },
    FmZR: function(t, e, n) {
        "use strict";
        e.a = {
            data: function() {
                return {}
            }
        }
    },
    G8hf: function(t, e) {
        e.apiHost = "http://api.goujianwu.com/", e.serverPort = 80
    },
    H5K5: function(t, e, n) {
        "use strict";
        e.a = function(t) {
            var e, n, r, o, a, i = t.app.router;
            t.store;
            e = window, n = document, r = "script", e.hm = e.hm ||
			function() {
			    (e.hm._hmt = e.hm._hmt || []).push(arguments)
			}, o = n.createElement(r), a = n.getElementsByTagName(r)[0], o.async = 1, o.src = "https://hm.baidu.com/hm.js?e02c5a587e9fa0128d855b33e027eb00", a.parentNode.insertBefore(o, a), i.afterEach(function(t, e) {
			    hm("_trackPageview", t.fullPath)
			})
        }
    },
    "HBB+": function(t, e, n) {
        "use strict";
        e.a = {
            name: "nuxt-child",
            functional: !0,
            props: ["keepAlive"],
            render: function(t, e) {
                var n = e.parent,
					a = e.data,
					i = e.props;
                a.nuxtChild = !0;
                for (var u = n, s = n.$nuxt.nuxt.transitions, c = n.$nuxt.nuxt.defaultTransition, f = 0; n;) n.$vnode && n.$vnode.data.nuxtChild && f++, n = n.$parent;
                a.nuxtChildDepth = f;
                var l = s[f] || c,
					d = {};
                r.forEach(function(t) {
                    void 0 !== l[t] && (d[t] = l[t])
                });
                var p = {};
                o.forEach(function(t) {
                    "function" == typeof l[t] && (p[t] = l[t].bind(u))
                });
                var h = p.beforeEnter;
                p.beforeEnter = function(t) {
                    if (window.$nuxt.$emit("triggerScroll"), h) return h.call(u, t)
                };
                var m = [t("router-view", a)];
                return void 0 !== i.keepAlive && (m = [t("keep-alive", m)]), t("transition", {
                    props: d,
                    on: p
                }, m)
            }
        };
        var r = ["name", "mode", "appear", "css", "type", "duration", "enterClass", "leaveClass", "appearClass", "enterActiveClass", "enterActiveClass", "leaveActiveClass", "appearActiveClass", "enterToClass", "leaveToClass", "appearToClass"],
			o = ["beforeEnter", "enter", "afterEnter", "enterCancelled", "beforeLeave", "leave", "afterLeave", "leaveCancelled", "beforeAppear", "appear", "afterAppear", "appearCancelled"]
    },
    "Hot+": function(t, e, n) {
        "use strict";
        var r = n("/5sW"),
			o = n("HBB+"),
			a = n("To1F"),
			i = n("YLfZ");
        e.a = {
            name: "nuxt",
            props: ["nuxtChildKey", "keepAlive"],
            render: function(t) {
                return this.nuxt.err ? t("nuxt-error", {
                    props: {
                        error: this.nuxt.err
                    }
                }) : t("nuxt-child", {
                    key: this.routerViewKey,
                    props: this.$props
                })
            },
            beforeCreate: function() {
                r.
			default.util.defineReactive(this, "nuxt", this.$root.$options.nuxt)
            },
            computed: {
                routerViewKey: function() {
                    if (void 0 !== this.nuxtChildKey || this.$route.matched.length > 1) return this.nuxtChildKey || Object(i.b)(this.$route.matched[0].path)(this.$route.params);
                    var t = this.$route.matched[0] && this.$route.matched[0].components.
				default;
                    return t && t.options && t.options.key ? "function".. / 404 "/*tpa=http://www.goujianwu.com/_nuxt/==typeof t.options.key?t.options.key(this.$route):t.options.key:this.$route.path}},components:{NuxtChild:o.a,NuxtError:a.a}}},J2Ti:function(t,e,n){*/use strict";
                    n.d(e, "a", function() {
                        return b
                    });
                    var r = n("woOf"),
						o = n.n(r),
						a = n("BO1k"),
						i = n.n(a),
						u = n("/5sW"),
						s = n("NYxO");
                    u.
				default.use(s.
				default);
                    var c = n("QA5y"),
						f = c.keys(),
						l = {},
						d = void 0;
                    if (f.forEach(function(t) {
						-1 !== t.indexOf("./index.") && (d = t)
                    }), d && (l = _(d)), "function" != typeof l) {
                        l.modules || (l.modules = {});
                        var p = !0,
							h = !1,
							m = void 0;
                        try {
                            for (var v, y = i()(f); !(p = (v = y.next()).done); p = !0) {
                                var g = v.value,
									x = g.replace(/^\.\//, "").replace(/\.(js)$/, "");
                                if ("index" !== x) {
                                    var w = x.split(/\//);
                                    (t = k(l, w))[x = w.pop()] = _(g), t[x].namespaced = !0
                                }
                            }
                        } catch (t) {
                            h = !0, m = t
                        } finally {
                            try {
                                !p && y.
                                return &&y.
                                return ()
                                } finally {
                                    if (h) throw m
                                }
                        }
                    }
                    var b = l instanceof Function ? l:


						function() {
						    return new s.
						default.Store(o()({
						    strict: !1
						}, l, {
						    state: l.state instanceof Function ? l.state() : {}
						}))
						};

                    function _(t) {
                        var e = c(t),
							n = e.
						default ||e;
                        if (n.commit) throw new Error("[nuxt] store/" + t.replace("./", "") + " should export a method which returns a Vuex instance.");
                        if (n.state && "function" != typeof n.state) throw new Error("[nuxt] state should be a function in store/" + t.replace("./", ""));
                        return n
                    }
                    function k(t, e) {
                        if (1 === e.length) return t.modules;
                        var n = e.shift();
                        return t.modules[n] = t.modules[n] || {}, t.modules[n].namespaced = !0, t.modules[n].modules = t.modules[n].modules || {}, k(t.modules[n], e)
                    }
                },
                OGhj: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return f
                    }), n.d(e, "mutations", function() {
                        return l
                    }), n.d(e, "actions", function() {
                        return d
                    });
                    var r = n("Xxa5"),
						o = n.n(r),
						a = n("exGp"),
						i = n.n(a),
						u = n("cjsc"),
						s = n("P4rm"),
						c = (n.n(s), function(t) {
						    return {
						        id: t.id,
						        rfaId: t.rfaId,
						        name: t.name,
						        favorites: t.favorites
						    }
						}),
						f = function() {
						    return {
						        families: {}
						    }
						},
						l = {
						    setCurrentPage: function(t, e) {
						        t.currentPage = e
						    },
						    setFamilies: function(t, e) {
						        t.families = e
						    },
						    select: function(t, e) {
						        var n = e.id,
									r = e.selected;
						        t.families.list.find(function(t) {
						            return t.id == n
						        }).selected = r
						    }
						},
						d = {
						    setPublicFamilies: function() {
						        var t = i()(o.a.mark(function t(e) {
						            var n;
						            return o.a.wrap(function(t) {
						                for (;;) switch (t.prev = t.next) {
						                    case 0:
						                        return n = {}, t.prev = 1, t.next = 4, u.a.getPublicFamilyList(e.rootState.filter.data, e.rootState.request.context);
						                    case 4:
						                        n = t.sent, t.next = 10;
						                        break;
						                    case 7:
						                        t.prev = 7, t.t0 = t.
                                                catch (1), n = {
                                                    page: {
                                                        totalCount: 1
                                                    },
                                                    list: []
                                                };
						                    case 10:
						                        n.list = n.list.map(c), e.commit("setFamilies", n);
						                    case 12:
						                    case "end":
						                        return t.stop()
						                }
						            }, t, this, [
										[1, 7]
						            ])
						        }));
						        return function(e) {
						            return t.apply(this, arguments)
						        }
						    }(),
						    setPrivateFamilies: function() {
						        var t = i()(o.a.mark(function t(e) {
						            var n;
						            return o.a.wrap(function(t) {
						                for (;;) switch (t.prev = t.next) {
						                    case 0:
						                        return n = {}, t.prev = 1, t.next = 4, u.a.getPrivateFamilyList(e.rootState.filter.data, e.rootState.request.context);
						                    case 4:
						                        n = t.sent, t.next = 10;
						                        break;
						                    case 7:
						                        t.prev = 7, t.t0 = t.
                                                catch (1), n = {
                                                    page: {
                                                        totalCount: 1
                                                    },
                                                    list: []
                                                };
						                    case 10:
						                        n.list = n.list.map(c), e.commit("setFamilies", n);
						                    case 12:
						                    case "end":
						                        return t.stop()
						                }
						            }, t, this, [
										[1, 7]
						            ])
						        }));
						        return function(e) {
						            return t.apply(this, arguments)
						        }
						    }()
						}
                },
                "OtQ/": function(t, e) {},
                "P+aQ": function(t, e, n) {
                    "use strict";
                    var r = function() {
                        var t = this.$createElement;
                        return (this._self._c || t)("div", {
                            staticClass: "nuxt-progress",
                            style: {
                                width: this.percent + "%",
                                height: this.height,
                                "background-color": this.canSuccess ? this.color : this.failedColor,
                                opacity: this.show ? 1 : 0
                            }
                        })
                    };
                    r._withStripped = !0;
                    var o = {
                        render: r,
                        staticRenderFns: []
                    };
                    e.a = o
                },
                P4rm: function(t, e) {
                    Array.prototype.insert = function(t, e) {
                        this.splice(t, 0, e)
                    }
                },
                QA5y: function(t, e, n) {
                    var r = {
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/alert.js*/
						: "f0q6",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/category.js*/
						: "g6ur",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/detail.js*/
						: "BGcx",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/families.js*/
						: "OGhj",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/filter.js*/
						: "8fs5",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/footer.js*/
						: "lNJ4",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/header.js*/
						: "ASvw",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/index.js*/
						: "vdRI",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/popup.js*/
						: "cMpB",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/request.js*/
						: "BN6k",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/uid.js*/
						: "jL3Y",
                        "../404" /*tpa=http://www.goujianwu.com/_nuxt/user.js*/
						: "406b"
                    };

                    function o(t) {
                        return n(a(t))
                    }
                    function a(t) {
                        var e = r[t];
                        if (!(e + 1)) throw new Error("Cannot find module '" + t + "'.");
                        return e
                    }
                    o.keys = function() {
                        return Object.keys(r)
                    }, o.resolve = a, t.exports = o, o.id = "QA5y"
                },
                SC3y: function(t, e, n) {
                    "use strict";
                    e.a = {
                        uuid: function(t, e) {
                            var n, r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
								a = [];
                            if (e = e || o.length, t) for (n = 0; n < t; n++) a[n] = o[0 | Math.random() * e];
                            else for (a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4", n = 0; n < 36; n++) a[n] || (r = 0 | 16 * Math.random(), a[n] = o[19 == n ? 3 & r | 8 : r]);
                            return a.join("")
                        }
                    }
                },
                T23V: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    var r, o, a, i = n("pFYg"),
						u = n.n(i),
						s = n("//Fk"),
						c = n.n(s),
						f = n("Xxa5"),
						l = n.n(f),
						d = n("mvHQ"),
						p = n.n(d),
						h = n("exGp"),
						m = n.n(h),
						v = n("fZjL"),
						y = n.n(v),
						g = n("woOf"),
						x = n.n(g),
						w = n("/5sW"),
						b = n("unZF"),
						_ = n("qcny"),
						k = n("YLfZ"),
						C = (r = m()(l.a.mark(function t(e, n, r) {
						    var o, a, i = this;
						    return l.a.wrap(function(t) {
						        for (;;) switch (t.prev = t.next) {
						            case 0:
						                return this._pathChanged = !! E.nuxt.err || n.path !== e.path, this._queryChanged = p()(e.query) !== p()(n.query), this._diffQuery = this._queryChanged ? Object(k.g)(e.query, n.query) : [], this._pathChanged && this.$loading.start && this.$loading.start(), t.prev = 4, t.next = 7, Object(k.k)(e);
						            case 7:
						                o = t.sent, !this._pathChanged && this._queryChanged && o.some(function(t) {
						                    var e = t.options.watchQuery;
						                    return !0 === e || !! Array.isArray(e) && e.some(function(t) {
						                        return i._diffQuery[t]
						                    })
						                }) && this.$loading.start && this.$loading.start(), r(), t.next = 19;
						                break;
						            case 12:
						                t.prev = 12, t.t0 = t.
                                        catch (4), t.t0 = t.t0 || {}, a = t.t0.statusCode || t.t0.status || t.t0.response && t.t0.response.status || 500, this.error({
                                            statusCode: a,
                                            message: t.t0.message
                                        }), this.$nuxt.$emit("routeChanged", e, n, t.t0), r(!1);
						            case 19:
						            case "end":
						                return t.stop()
						        }
						    }, t, this, [
								[4, 12]
						    ])
						})), function(t, e, n) {
						    return r.apply(this, arguments)
						}),
						j = (o = m()(l.a.mark(function t(e, n, r) {
						    var o, a, i, u, s, f, d, p, h = this;
						    return l.a.wrap(function(t) {
						        for (;;) switch (t.prev = t.next) {
						            case 0:
						                if (!1 !== this._pathChanged || !1 !== this._queryChanged) {
						                    t.next = 2;
						                    break
						                }
						                return t.abrupt("return", r());
						            case 2:
						                return o = !1, a = function(t) {
						                    if (n.path === t.path && h.$loading.finish && h.$loading.finish(), n.path !== t.path && h.$loading.pause && h.$loading.pause(), !o) {
						                        o = !0;
						                        var e = [];
						                        R = Object(k.e)(n, e).map(function(t, r) {
						                            return Object(k.b)(n.matched[e[r]].path)(n.params)
						                        }), r(t)
						                    }
						                }, t.next = 6, Object(k.m)(E, {
						                    route: e,
						                    from: n,
						                    next: a.bind(this)
						                });
						            case 6:
						                if (this._dateLastError = E.nuxt.dateErr, this._hadError = !! E.nuxt.err, i = [], (u = Object(k.e)(e, i)).length) {
						                    t.next = 24;
						                    break
						                }
						                return t.next = 13, A.call(this, u, E.context);
						            case 13:
						                if (!o) {
						                    t.next = 15;
						                    break
						                }
						                return t.abrupt("return");
						            case 15:
						                return t.next = 17, this.loadLayout("function" == typeof _.a.layout ? _.a.layout(E.context) : _.a.layout);
						            case 17:
						                return s = t.sent, t.next = 20, A.call(this, u, E.context, s);
						            case 20:
						                if (!o) {
						                    t.next = 22;
						                    break
						                }
						                return t.abrupt("return");
						            case 22:
						                return E.context.error({
						                    statusCode: 404,
						                    message: "This page could not be found"
						                }), t.abrupt("return", r());
						            case 24:
						                return u.forEach(function(t) {
						                    t._Ctor && t._Ctor.options && (t.options.asyncData = t._Ctor.options.asyncData, t.options.fetch = t._Ctor.options.fetch)
						                }), this.setTransitions(q(u, e, n)), t.prev = 26, t.next = 29, A.call(this, u, E.context);
						            case 29:
						                if (!o) {
						                    t.next = 31;
						                    break
						                }
						                return t.abrupt("return");
						            case 31:
						                if (!E.context._errored) {
						                    t.next = 33;
						                    break
						                }
						                return t.abrupt("return", r());
						            case 33:
						                return "function" == typeof(f = u[0].options.layout) && (f = f(E.context)), t.next = 37, this.loadLayout(f);
						            case 37:
						                return f = t.sent, t.next = 40, A.call(this, u, E.context, f);
						            case 40:
						                if (!o) {
						                    t.next = 42;
						                    break
						                }
						                return t.abrupt("return");
						            case 42:
						                if (!E.context._errored) {
						                    t.next = 44;
						                    break
						                }
						                return t.abrupt("return", r());
						            case 44:
						                if (d = !0, u.forEach(function(t) {
                                            d && "function" == typeof t.options.validate && (d = t.options.validate({
						                    params: e.params || {},
						                    query: e.query || {},
						                    store: T
						                }))
						                }), d) {
						                    t.next = 49;
						                    break
						                }
						                return this.error({
						                    statusCode: 404,
						                    message: "This page could not be found"
						                }), t.abrupt("return", r());
						            case 49:
						                return t.next = 51, c.a.all(u.map(function(t, n) {
						                    if (t._path = Object(k.b)(e.matched[i[n]].path)(e.params), t._dataRefresh = !1, h._pathChanged && t._path !== R[n]) t._dataRefresh = !0;
						                    else if (!h._pathChanged && h._queryChanged) {
						                        var r = t.options.watchQuery;
						                        !0 === r ? t._dataRefresh = !0 : Array.isArray(r) && (t._dataRefresh = r.some(function(t) {
						                            return h._diffQuery[t]
						                        }))
						                    }
						                    if (!h._hadError && h._isMounted && !t._dataRefresh) return c.a.resolve();
						                    var o = [],
                                                a = t.options.asyncData && "function" == typeof t.options.asyncData,
                                                u = !! t.options.fetch,
                                                s = a && u ? 30 : 45;
						                    if (a) {
						                        var f = Object(k.j)(t.options.asyncData, E.context).then(function(e) {
						                            Object(k.a)(t, e), h.$loading.increase && h.$loading.increase(s)
						                        });
						                        o.push(f)
						                    }
						                    if (u) {
						                        var l = t.options.fetch(E.context);
						                        l && (l instanceof c.a || "function" == typeof l.then) || (l = c.a.resolve(l)), l.then(function(t) {
						                            h.$loading.increase && h.$loading.increase(s)
						                        }), o.push(l)
						                    }
						                    return c.a.all(o)
						                }));
						            case 51:
						                o || (this.$loading.finish && this.$loading.finish(), R = u.map(function(t, n) {
						                    return Object(k.b)(e.matched[i[n]].path)(e.params)
						                }), r()), t.next = 66;
						                break;
						            case 54:
						                return t.prev = 54, t.t0 = t.
                                        catch (26), t.t0 || (t.t0 = {}), R = [], t.t0.statusCode = t.t0.statusCode || t.t0.status || t.t0.response && t.t0.response.status || 500, "function" == typeof(p = _.a.layout) && (p = p(E.context)), t.next = 63, this.loadLayout(p);
						            case 63:
						                this.error(t.t0), this.$nuxt.$emit("routeChanged", e, n, t.t0), r(!1);
						            case 66:
						            case "end":
						                return t.stop()
						        }
						    }, t, this, [
								[26, 54]
						    ])
						})), function(t, e, n) {
						    return o.apply(this, arguments)
						}),
						$ = (a = m()(l.a.mark(function t(e) {
						    var n, r, o, a;
						    return l.a.wrap(function(t) {
						        for (;;) switch (t.prev = t.next) {
						            case 0:
						                return E = e.app, O = e.router, T = e.store, t.next = 5, c.a.all(I(O));
						            case 5:
						                return n = t.sent, r = new w.
                                    default (E), o = S.layout || "default", t.next = 10, r.loadLayout(o);
						            case 10:
						                if (r.setLayout(o), a = function() {
                                            r.$mount("#__nuxt"), w.
                                        default.nextTick(function() {
                                                L(r)
						                })
						                }, r.setTransitions = r.$options.nuxt.setTransitions.bind(r), n.length && (r.setTransitions(q(n, O.currentRoute)), R = O.currentRoute.matched.map(function(t) {
                                            return Object(k.b)(t.path)(O.currentRoute.params)
						                })), r.$loading = {}, S.error && r.error(S.error), O.beforeEach(C.bind(r)), O.beforeEach(j.bind(r)), O.afterEach(M), O.afterEach(B.bind(r)), !S.serverRendered) {
						                    t.next = 23;
						                    break
						                }
						                return a(), t.abrupt("return");
						            case 23:
						                j.call(r, O.currentRoute, O.currentRoute, function(t) {
						                    if (!t) return M(O.currentRoute, O.currentRoute), F.call(r, O.currentRoute), void a();
						                    O.push(t, function() {
						                        return a()
						                    }, function(t) {
						                        if (!t) return a();
						                        console.error(t)
						                    })
						                });
						            case 24:
						            case "end":
						                return t.stop()
						        }
						    }, t, this)
						})), function(t) {
						    return a.apply(this, arguments)
						}),
						R = [],
						E = void 0,
						O = void 0,
						T = void 0,
						S = window.__NUXT__ || {};

                    function q(t, e, n) {
                        var r = function(t) {
                            var r = function(t, e) {
                                if (!t || !t.options || !t.options[e]) return {};
                                var n = t.options[e];
                                if ("function" == typeof n) {
                                    for (var r = arguments.length, o = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++) o[a - 2] = arguments[a];
                                    return n.apply(void 0, o)
                                }
                                return n
                            }(t, "transition", e, n) || {};
                            return "string" == typeof r ? {
                                name: r
                            } : r
                        };
                        return t.map(function(t) {
                            var e = x()({}, r(t));
                            if (n && n.matched.length && n.matched[0].components.
						default) {
                                var o = r(n.matched[0].components.
							default);
                                y()(o).filter(function(t) {
                                    return o[t] && -1 !== t.toLowerCase().indexOf("leave")
                                }).forEach(function(t) {
                                    e[t] = o[t]
                                })
                            }
                            return e
                        })
                    }
                    function P(t, e) {
                        return S.serverRendered && e && Object(k.a)(t, e), t._Ctor = t, t
                    }
                    function I(t) {
                        var e, n = this,
							r = Object(k.d)(t.options.base, t.options.mode);
                        return Object(k.c)(t.match(r), (e = m()(l.a.mark(function t(e, r, o, a, i) {
                            var u;
                            return l.a.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if ("function" != typeof e || e.options) {
                                            t.next = 4;
                                            break
                                        }
                                        return t.next = 3, e();
                                    case 3:
                                        e = t.sent;
                                    case 4:
                                        return u = P(Object(k.l)(e), S.data ? S.data[i] : null), o.components[a] = u, t.abrupt("return", u);
                                    case 7:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, n)
                        })), function(t, n, r, o, a) {
                            return e.apply(this, arguments)
                        }))
                    }
                    function A(t, e, n) {
                        var r = this,
							o = [],
							a = !1;
                        if (void 0 !== n && (o = [], n.middleware && (o = o.concat(n.middleware)), t.forEach(function(t) {
							t.options.middleware && (o = o.concat(t.options.middleware))
                        })), o = o.map(function(t) {
							return "function" == typeof t ? t : ("function" != typeof b.a[t] && (a = !0, r.error({
                            statusCode: 500,
                            message: "Unknown middleware " + t
                        })), b.a[t])
                        }), !a) return Object(k.i)(o, e)
                    }
                    function M(t, e) {
                        Object(k.c)(t, function(t, e, n, r) {
                            return "object" !== (void 0 === t ? "undefined" : u()(t)) || t.options || ((t = w.
						default.extend(t))._Ctor = t, n.components[r] = t), t
                        })
                    }
                    function F(t) {
                        this._hadError && this._dateLastError === this.$options.nuxt.dateErr && this.error();
                        var e = this.$options.nuxt.err ? _.a.layout : t.matched[0].components.
					default.options.layout;
                        "function" == typeof e && (e = e(E.context)), this.setLayout(e)
                    }
                    function B(t, e) {
                        var n = this;
                        !1 === this._pathChanged && !1 === this._queryChanged || w.
					default.nextTick(function() {
					    Object(k.f)(t, []).forEach(function(t, e) {
					        if (t && t.constructor._dataRefresh && R[e] === t.constructor._path && "function" == typeof t.constructor.options.data) {
					            var n = t.constructor.options.data.call(t);
					            for (var r in n) w.
                            default.set(t.$data, r, n[r])
					        }
					    }), F.call(n, t)
					})
                    }
                    function L(t) {
                        window._nuxtReadyCbs.forEach(function(e) {
                            "function" == typeof e && e(t)
                        }), "function" == typeof window._onNuxtLoaded && window._onNuxtLoaded(t), O.afterEach(function(e, n) {
                            w.
						default.nextTick(function() {
						    return t.$nuxt.$emit("routeChanged", e, n)
						})
                        })
                    }
                    Object(_.b)().then($).
					catch (function(t) {
					    "ERR_REDIRECT" !== t.message && console.error("[nuxt] Error while initializing app", t)
					})
                },
                To1F: function(t, e, n) {
                    "use strict";
                    var r = n("FmZR"),
						o = n("uXtq"),
						a = !1;
                    var i = function(t) {
                        a || n("lUy/")
                    },
						u = n("VU/8")(r.a, o.a, !1, i, null, null);
                    u.options.__file = "../404" /*tpa=http://www.goujianwu.com/_nuxt/layouts/error.vue*/
					, e.a = u.exports
                },
                TuIM: function(t, e, n) {
                    "use strict";
                    e.a = function(t) {
                        var e, n, r, o, a, i, u = t.app,
							s = t.store;
                        e = window, n = document, r = "script", o = "ga", e.GoogleAnalyticsObject = o, e.ga = e.ga ||
						function() {
						    (e.ga.q = e.ga.q || []).push(arguments)
						}, e.ga.l = 1 * new Date, a = n.createElement(r), i = n.getElementsByTagName(r)[0], a.async = 1, a.src = "https://www.google-analytics.com/analytics.js", i.parentNode.insertBefore(a, i), ga("create", "UA-112085319-1", "auto");
                        try {
                            s.state.user.info && ga("set", "userId", s.state.user.info.id)
                        } catch (t) {
                            console.log(t)
                        }
                        u.router.afterEach(function(t, e) {
                            ga("set", "page", t.fullPath), ga("send", "pageview")
                        })
                    }
                },
                "WR/d": function(t, e, n) {
                    "use strict";
                    var r = n("/5sW");
                    e.a = {
                        name: "nuxt-loading",
                        data: function() {
                            return {
                                percent: 0,
                                show: !1,
                                canSuccess: !0,
                                duration: 5e3,
                                height: "2px",
                                color: "#3B8070",
                                failedColor: "red"
                            }
                        },
                        methods: {
                            start: function() {
                                var t = this;
                                return this.show = !0, this.canSuccess = !0, this._timer && (clearInterval(this._timer), this.percent = 0), this._cut = 1e4 / Math.floor(this.duration), this._timer = setInterval(function() {
                                    t.increase(t._cut * Math.random()), t.percent > 95 && t.finish()
                                }, 100), this
                            },
                            set: function(t) {
                                return this.show = !0, this.canSuccess = !0, this.percent = Math.floor(t), this
                            },
                            get: function() {
                                return Math.floor(this.percent)
                            },
                            increase: function(t) {
                                return this.percent = this.percent + Math.floor(t), this
                            },
                            decrease: function(t) {
                                return this.percent = this.percent - Math.floor(t), this
                            },
                            finish: function() {
                                return this.percent = 100, this.hide(), this
                            },
                            pause: function() {
                                return clearInterval(this._timer), this
                            },
                            hide: function() {
                                var t = this;
                                return clearInterval(this._timer), this._timer = null, setTimeout(function() {
                                    t.show = !1, r.
								default.nextTick(function() {
								    setTimeout(function() {
								        t.percent = 0
								    }, 200)
								})
                                }, 500), this
                            },
                            fail: function() {
                                return this.canSuccess = !1, this
                            }
                        }
                    }
                },
                WRRc: function(t, e, n) {
                    "use strict";
                    e.a = {
                        name: "nuxt-link",
                        functional: !0,
                        render: function(t, e) {
                            return t("router-link", e.data, e.children)
                        }
                    }
                },
                XXJY: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    var r, o = n("Xxa5"),
						a = n.n(o),
						i = n("exGp"),
						u = n.n(i),
						s = n("BYei");
                    e.
				default = (r = u()(a.a.mark(function t(e) {
				    var n, r = e.store;
				    return a.a.wrap(function(t) {
				        for (;;) switch (t.prev = t.next) {
				            case 0:
				                return t.prev = 0, t.next = 3, s.a.getUser(r.state.request.context);
				            case 3:
				                n = t.sent, r.commit("user/setUser", n), t.next = 9;
				                break;
				            case 7:
				                t.prev = 7, t.t0 = t.
								catch (0);
				            case 9:
				            case "end":
				                return t.stop()
				        }
				    }, t, this, [
                        [0, 7]
				    ])
				})), function(t) {
				    return r.apply(this, arguments)
				})
                },
                YLfZ: function(t, e, n) {
                    "use strict";
                    e.a = function(t, e) {
                        var n = t.options.data || g;
                        if (!e && t.options.hasAsyncData) return;
                        t.options.hasAsyncData = !0, t.options.data = function() {
                            var r = n.call(this);
                            return this.$ssrContext && (e = this.$ssrContext.asyncData[t.cid]), v()({}, r, e)
                        }, t._Ctor && t._Ctor.options && (t._Ctor.options.data = t.options.data)
                    }, e.l = x, e.e = w, e.f = function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return [].concat.apply([], t.matched.map(function(t, n) {
                            return h()(t.instances).map(function(r) {
                                return e && e.push(n), t.instances[r]
                            })
                        }))
                    }, e.c = b, e.k = _, n.d(e, "h", function() {
                        return j
                    }), n.d(e, "m", function() {
                        return $
                    }), e.i = function t(e, n) {
                        if (!e.length || n._redirected || n._errored) return d.a.resolve();
                        return R(e[0], n).then(function() {
                            return t(e.slice(1), n)
                        })
                    }, e.j = R, e.d = function(t, e) {
                        var n = window.location.pathname;
                        if ("hash" === e) return window.location.hash.replace(/^#\//, "");
                        t && 0 === n.indexOf(t) && (n = n.slice(t.length));
                        return (n || "/") + window.location.search + window.location.hash
                    }, e.b = function(t, e) {
                        return function(t) {
                            for (var e = new Array(t.length), n = 0; n < t.length; n++)"object" === i()(t[n]) && (e[n] = new RegExp("^(?:" + t[n].pattern + ")$"));
                            return function(n, r) {
                                for (var a = "", i = n || {}, u = r || {}, s = u.pretty ? O : encodeURIComponent, c = 0; c < t.length; c++) {
                                    var f = t[c];
                                    if ("string" != typeof f) {
                                        var l, d = i[f.name];
                                        if (null == d) {
                                            if (f.optional) {
                                                f.partial && (a += f.prefix);
                                                continue
                                            }
                                            throw new TypeError('Expected "' + f.name + '" to be defined')
                                        }
                                        if (Array.isArray(d)) {
                                            if (!f.repeat) throw new TypeError('Expected "' + f.name + '" to not repeat, but received `' + o()(d) + "`");
                                            if (0 === d.length) {
                                                if (f.optional) continue;
                                                throw new TypeError('Expected "' + f.name + '" to not be empty')
                                            }
                                            for (var p = 0; p < d.length; p++) {
                                                if (l = s(d[p]), !e[c].test(l)) throw new TypeError('Expected all "' + f.name + '" to match "' + f.pattern + '", but received `' + o()(l) + "`");
                                                a += (0 === p ? f.prefix : f.delimiter) + l
                                            }
                                        } else {
                                            if (l = f.asterisk ? encodeURI(d).replace(/[?#]/g, function(t) {
												return "%" + t.charCodeAt(0).toString(16).toUpperCase()
                                            }) : s(d), !e[c].test(l)) throw new TypeError('Expected "' + f.name + '" to match "' + f.pattern + '", but received "' + l + '"');
                                            a += f.prefix + l
                                        }
                                    } else a += f
                                }
                                return a
                            }
                        }(function(t, e) {
                            var n, r = [],
								o = 0,
								a = 0,
								i = "",
								u = e && e.delimiter || "/";
                            for (; null != (n = E.exec(t));) {
                                var s = n[0],
									c = n[1],
									f = n.index;
                                if (i += t.slice(a, f), a = f + s.length, c) i += c[1];
                                else {
                                    var l = t[a],
										d = n[2],
										p = n[3],
										h = n[4],
										m = n[5],
										v = n[6],
										y = n[7];
                                    i && (r.push(i), i = "");
                                    var g = null != d && null != l && l !== d,
										x = "+" === v || "*" === v,
										w = "?" === v || "*" === v,
										b = n[2] || u,
										_ = h || m;
                                    r.push({
                                        name: p || o++,
                                        prefix: d || "",
                                        delimiter: b,
                                        optional: w,
                                        repeat: x,
                                        partial: g,
                                        asterisk: !! y,
                                        pattern: _ ? S(_) : y ? ".*" : "[^" + T(b) + "]+?"
                                    })
                                }
                            }
                            a < t.length && (i += t.substr(a));
                            i && r.push(i);
                            return r
                        }(t, e))
                    }, e.g = function(t, e) {
                        var n = {},
							r = v()({}, t, e);
                        for (var o in r) String(t[o]) !== String(e[o]) && (n[o] = !0);
                        return n
                    };
                    var r = n("mvHQ"),
						o = n.n(r),
						a = n("pFYg"),
						i = n.n(a),
						u = n("Xxa5"),
						s = n.n(u),
						c = n("exGp"),
						f = n.n(c),
						l = n("//Fk"),
						d = n.n(l),
						p = n("fZjL"),
						h = n.n(p),
						m = n("Dd8w"),
						v = n.n(m),
						y = n("/5sW"),
						g = function() {
						    return {}
						};

                    function x(t) {
                        return t.options && t._Ctor === t ? t : (t.options ? (t._Ctor = t, t.extendOptions = t.options) : (t = y.
					default.extend(t))._Ctor = t, !t.options.name && t.options.__file && (t.options.name = t.options.__file), t)
                    }
                    function w(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return [].concat.apply([], t.matched.map(function(t, n) {
                            return h()(t.components).map(function(r) {
                                return e && e.push(n), t.components[r]
                            })
                        }))
                    }
                    function b(t, e) {
                        return Array.prototype.concat.apply([], t.matched.map(function(t, n) {
                            return h()(t.components).map(function(r) {
                                return e(t.components[r], t.instances[r], t, r, n)
                            })
                        }))
                    }
                    function _(t) {
                        var e, n = this;
                        return d.a.all(b(t, (e = f()(s.a.mark(function t(e, r, o, a) {
                            return s.a.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if ("function" != typeof e || e.options) {
                                            t.next = 4;
                                            break
                                        }
                                        return t.next = 3, e();
                                    case 3:
                                        e = t.sent;
                                    case 4:
                                        return t.abrupt("return", o.components[a] = x(e));
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, n)
                        })), function(t, n, r, o) {
                            return e.apply(this, arguments)
                        })))
                    }
                    window._nuxtReadyCbs = [], window.onNuxtReady = function(t) {
                        window._nuxtReadyCbs.push(t)
                    };
                    var k, C, j = (k = f()(s.a.mark(function t(e) {
                        return s.a.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, _(e);
                                case 2:
                                    return t.abrupt("return", v()({}, e, {
                                        meta: w(e).map(function(t) {
                                            return t.options.meta || {}
                                        })
                                    }));
                                case 3:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function(t) {
                        return k.apply(this, arguments)
                    }),
						$ = (C = f()(s.a.mark(function t(e, n) {
						    return s.a.wrap(function(t) {
						        for (;;) switch (t.prev = t.next) {
						            case 0:
						                if (n.to ? n.to : n.route, e.context) {
						                    t.next = 14;
						                    break
						                }
						                t.t0 = !1, t.t1 = e, t.t2 = e.store, t.t3 = n.payload, t.t4 = n.error, t.t5 = {}, e.context = {
						                    get isServer() {
						                        return console.warn("context.isServer has been deprecated, please use process.server instead."), !1
						                    }, get isClient() {
						                        return console.warn("context.isClient has been deprecated, please use process.client instead."), !0
						                    }, isStatic: t.t0,
						                    isDev: !1,
						                    isHMR: !1,
						                    app: t.t1,
						                    store: t.t2,
						                    payload: t.t3,
						                    error: t.t4,
						                    base: "/",
						                    env: t.t5
						                }, n.req && (e.context.req = n.req), n.res && (e.context.res = n.res), e.context.redirect = function(t, n, r) {
						                    if (t) {
						                        e.context._redirected = !0;
						                        var o = void 0 === n ? "undefined" : i()(n);
						                        if ("number" == typeof t || "undefined" !== o && "object" !== o || (r = n || {}, o = void 0 === (n = t) ? "undefined" : i()(n), t = 302), "object" === o && (n = e.router.resolve(n).href), !/(^[.]{1,2}\/)|(^\/(?!\/))/.test(n)) throw n = q(n, r), window.location.replace(n), new Error("ERR_REDIRECT");
						                        e.context.next({
						                            path: n,
						                            query: r,
						                            status: t
						                        })
						                    }
						                }, e.context.nuxtState = window.__NUXT__;
						            case 14:
						                if (e.context.next = n.next, e.context._redirected = !1, e.context._errored = !1, e.context.isHMR = !! n.isHMR, !n.route) {
						                    t.next = 22;
						                    break
						                }
						                return t.next = 21, j(n.route);
						            case 21:
						                e.context.route = t.sent;
						            case 22:
						                if (e.context.params = e.context.route.params || {}, e.context.query = e.context.route.query || {}, !n.from) {
						                    t.next = 28;
						                    break
						                }
						                return t.next = 27, j(n.from);
						            case 27:
						                e.context.from = t.sent;
						            case 28:
						            case "end":
						                return t.stop()
						        }
						    }, t, this)
						})), function(t, e) {
						    return C.apply(this, arguments)
						});

                    function R(t, e) {
                        var n = void 0;
                        return (n = 2 === t.length ? new d.a(function(n) {
                            t(e, function(t, r) {
                                t && e.error(t), n(r = r || {})
                            })
                        }) : t(e)) && (n instanceof d.a || "function" == typeof n.then) || (n = d.a.resolve(n)), n
                    }
                    var E = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");

                    function O(t) {
                        return encodeURI(t).replace(/[\/?#]/g, function(t) {
                            return "%" + t.charCodeAt(0).toString(16).toUpperCase()
                        })
                    }
                    function T(t) {
                        return t.replace(/([.+*?=^!:()[\]|\/\\])/g, "\\$1")
                    }
                    function S(t) {
                        return t.replace(/([=!:$\/()])/g, "\\$1")
                    }
                    function q(t, e) {
                        var n = void 0,
							r = t.indexOf("://"); - 1 !== r ? (n = t.substring(0, r), t = t.substring(r + 3)) : 0 === t.indexOf("//") && (t = t.substring(2));
                        var a = t.split("/"),
							i = (n ? n + "://" : "//") + a.shift(),
							u = a.filter(Boolean).join("/"),
							s = void 0;
                        return 2 === (a = u.split("#")).length && (u = a[0], s = a[1]), i += u ? "/" + u : "", e && "{}" !== o()(e) && (i += (2 === t.split("?").length ? "&" : "?") +
						function(t) {
						    return h()(t).sort().map(function(e) {
						        var n = t[e];
						        return null == n ? "" : Array.isArray(n) ? n.slice().map(function(t) {
						            return [e, "=", t].join("")
						        }).join("&") : e + "=" + n
						    }).filter(Boolean).join("&")
						}(e)), i += s ? "#" + s : ""
                    }
                },
                aYjo: function(t, e, n) {
                    "use strict";
                    var r = n("fZjL"),
						o = n.n(r),
						a = n("mtWM"),
						i = n.n(a),
						u = n("G8hf"),
						s = n.n(u).a.apiHost;

                    function c(t) {
                        return t.startsWith("http:") || t.startsWith("https:") ? (console.log("Requesting:" + t), t) : (console.log("Requesting:" + s + t), s + t)
                    }
                    function f(t) {
                        var e = t.data;
                        if ("success" == e.code) return e.data;
                        throw console.log(t), new Error(e.code + "-" + e.message + " URL:" + t.request.path)
                    }
                    function l(t) {
                        return console.log(t), {
                            data: {
                                code: "error",
                                message: "internal error",
                                data: {}
                            }
                        }
                    }
                    e.a = {
                        get: function(t, e, n) {
                            return i.a.get(c(t) + "?" +
							function() {
							    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
									e = [];
							    return t && o()(t).forEach(function(n) {
							        var r = t[n];
							        null !== r && void 0 !== r && e.push(n + "=" + encodeURI(r))
							    }), e.join("&")
							}(e), {
							    headers: (r = n, a = r.cookie, u = r.ip, s = r.ua, d = {
							        "X-Requested-With": "XMLHttpRequest",
							        "x-forwarded-for": u
							    }, a && (d.cookie = a), s && (d["user-agent"] = s), d)
							}).then(f, l);
                            var r, a, u, s, d
                        },
                        post: function(t, e, n) {
                            var r = c(t);
                            return i.a.post(r, e, n).then(f, l)
                        },
                        put: function(t, e) {
                            var n = c(t);
                            return i.a.put(n, e).then(f, l)
                        }
                    }
                },
                cMpB: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return r
                    }), n.d(e, "mutations", function() {
                        return o
                    });
                    var r = function() {
                        return {
                            confirmation: {},
                            edit: {},
                            plugin: {},
                            versionSelector: {}
                        }
                    },
						o = {
						    showConfirmation: function(t, e) {
						        t.confirmation = e, t.confirmation.show = !0
						    },
						    showEdit: function(t, e) {
						        t.edit = e, t.edit.show = !0
						    },
						    showPlugin: function(t, e) {
						        t.plugin = e, t.plugin.show = !0
						    },
						    showVersionSelector: function(t, e) {
						        t.versionSelector = e, t.versionSelector.show = !0
						    },
						    editValue: function(t, e) {
						        t.edit.fields.find(function(t) {
						            return t.name = e.name
						        }).value = e.value
						    },
						    closeConfirmation: function(t) {
						        t.confirmation.show = !1
						    },
						    closeEdit: function(t) {
						        t.edit.show = !1
						    },
						    closePlugin: function(t) {
						        t.plugin.show = !1
						    },
						    closeVersionSelector: function(t) {
						        t.versionSelector.show = !1
						    }
						}
                },
                cjsc: function(t, e, n) {
                    "use strict";
                    var r = n("aYjo");
                    e.a = {
                        getPublicFamilyList: function(t, e) {
                            return r.a.get("/rfa/public/list", t, e)
                        },
                        getPrivateFamilyList: function(t, e) {
                            return r.a.get("/rfa/private/collect", t, e)
                        },
                        getFamilyDetail: function(t, e) {
                            return r.a.get("/detail/" + t, null, e)
                        },
                        getRecommendations: function(t, e, n) {
                            return r.a.get("/recommendation/" + t, {
                                size: e
                            }, n)
                        }
                    }
                },
                f0q6: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return r
                    }), n.d(e, "mutations", function() {
                        return o
                    });
                    var r = function() {
                        return {
                            params: [],
                            count: 0
                        }
                    },
						o = {
						    newAlert: function(t, e) {
						        t.params.push({
						            id: t.count + 1,
						            message: e.message,
						            type: e.type,
						            top: 0
						        }), t.count++
						    }
						}
                },
                g6ur: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return c
                    }), n.d(e, "mutations", function() {
                        return f
                    }), n.d(e, "actions", function() {
                        return l
                    });
                    var r = n("Xxa5"),
						o = n.n(r),
						a = n("exGp"),
						i = n.n(a),
						u = n("3o5/"),
						s = n("P4rm"),
						c = (n.n(s), function() {
						    return {
						        categories: [],
						        currentCategoryName: ""
						    }
						}),
						f = {
						    setCategoryTree: function(t, e) {
						        t.categories = e
						    },
						    setCurrentCategoryName: function(t, e) {
						        t.currentCategoryName = e
						    }
						},
						l = {
						    setCategoryTree: function() {
						        var t = i()(o.a.mark(function t(e) {
						            var n;
						            return o.a.wrap(function(t) {
						                for (;;) switch (t.prev = t.next) {
						                    case 0:
						                        return t.next = 2, u.a.getPublicCategoryTree(e.rootState.request.context);
						                    case 2:
						                        (n = t.sent).insert(0, {
						                            categoryId: "",
						                            nameEn: "all",
						                            nameZh: "所有构件",
						                            weight: 1
						                        }), n = n.map(function(t) {
						                            return {
						                                nameZh: t.nameZh,
						                                nameEn: t.nameEn,
						                                icon: !0,
						                                categoryId: t.categoryId,
						                                children: t.children
						                            }
						                        }), e.commit("setCategoryTree", n);
						                    case 6:
						                    case "end":
						                        return t.stop()
						                }
						            }, t, this)
						        }));
						        return function(e) {
						            return t.apply(this, arguments)
						        }
						    }()
						}
                },
                jL3Y: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return r
                    }), n.d(e, "mutations", function() {
                        return o
                    });
                    var r = function() {
                        return {
                            id: ""
                        }
                    },
						o = {
						    setId: function(t, e) {
						        t.id = e
						    }
						}
                },
                lNJ4: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "state", function() {
                        return s
                    }), n.d(e, "mutations", function() {
                        return c
                    }), n.d(e, "actions", function() {
                        return f
                    });
                    var r = n("Xxa5"),
						o = n.n(r),
						a = n("exGp"),
						i = n.n(a),
						u = n("ydpY"),
						s = function() {
						    return {
						        links: []
						    }
						},
						c = {
						    setLinks: function(t, e) {
						        t.links = e
						    }
						},
						f = {
						    setLinks: function() {
						        var t = i()(o.a.mark(function t(e) {
						            return o.a.wrap(function(t) {
						                for (;;) switch (t.prev = t.next) {
						                    case 0:
						                        return t.t0 = e, t.next = 3, u.a.getLinks(e.rootState.request.context);
						                    case 3:
						                        t.t1 = t.sent, t.t0.commit.call(t.t0, "setLinks", t.t1);
						                    case 5:
						                    case "end":
						                        return t.stop()
						                }
						            }, t, this)
						        }));
						        return function(e) {
						            return t.apply(this, arguments)
						        }
						    }()
						}
                },
                "lUy/": function(t, e) {},
                mtxM: function(t, e, n) {
                    "use strict";
                    e.a = function() {
                        return new i.
					default ({
					    mode: "history",
					    base: "/",
					    linkActiveClass: "nuxt-link-active",
					    linkExactActiveClass: "nuxt-link-exact-active",
					    scrollBehavior: h,
					    routes: [{
					        path: "/signup",
					        component: u,
					        name: "signup"
					    }, {
					        path: "/public",
					        component: s,
					        name: "public"
					    }, {
					        path: "/plugin",
					        component: c,
					        name: "plugin"
					    }, {
					        path: "/private",
					        component: f,
					        name: "private"
					    }, {
					        path: "/signin",
					        component: l,
					        name: "signin"
					    }, {
					        path: "/detail/:id?",
					        component: d,
					        name: "detail-id"
					    }, {
					        path: "/",
					        component: p,
					        name: "index"
					    }],
					    fallback: !1
					})
                    };
                    var r = n("//Fk"),
						o = n.n(r),
						a = n("/5sW"),
						i = n("/ocq");
                    a.
				default.use(i.
				default);
                    var u = function() {
                        return n.e(5).then(n.bind(null, "KRhH")).then(function(t) {
                            return t.
                        default ||t
                        })
                    },
						s = function() {
						    return n.e(0).then(n.bind(null, "7YNm")).then(function(t) {
						        return t.
							default ||t
						    })
						},
						c = function() {
						    return n.e(7).then(n.bind(null, "cbgp")).then(function(t) {
						        return t.
							default ||t
						    })
						},
						f = function() {
						    return n.e(1).then(n.bind(null, "S8EH")).then(function(t) {
						        return t.
							default ||t
						    })
						},
						l = function() {
						    return n.e(6).then(n.bind(null, "a5ps")).then(function(t) {
						        return t.
							default ||t
						    })
						},
						d = function() {
						    return n.e(2).then(n.bind(null, "7IJC")).then(function(t) {
						        return t.
							default ||t
						    })
						},
						p = function() {
						    return n.e(4).then(n.bind(null, "/TYz")).then(function(t) {
						        return t.
							default ||t
						    })
						};
                    window.history.scrollRestoration = "manual";
                    var h = function(t, e, n) {
                        var r = !1;
                        return t.matched.length < 2 ? r = {
                            x: 0,
                            y: 0
                        } : t.matched.some(function(t) {
                            return t.components.
                        default.options.scrollToTop
                        }) && (r = {
                            x: 0,
                            y: 0
                        }), n && (r = n), new o.a(function(e) {
                            window.$nuxt.$once("triggerScroll", function() {
                                if (t.hash) {
                                    var n = t.hash;
                                    void 0 !== window.CSS && void 0 !== window.CSS.escape && (n = "#" + window.CSS.escape(n.substr(1)));
                                    try {
                                        document.querySelector(n) && (r = {
                                            selector: n
                                        })
                                    } catch (t) {
                                        console.warn("Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).")
                                    }
                                }
                                e(r)
                            })
                        })
                    }
                },
                qcny: function(t, e, n) {
                    "use strict";
                    n.d(e, "b", function() {
                        return q
                    });
                    var r = n("Xxa5"),
						o = n.n(r),
						a = n("//Fk"),
						i = (n.n(a), n("C4MV")),
						u = n.n(i),
						s = n("woOf"),
						c = n.n(s),
						f = n("Dd8w"),
						l = n.n(f),
						d = n("exGp"),
						p = n.n(d),
						h = n("MU8w"),
						m = (n.n(h), n("/5sW")),
						v = n("p3jY"),
						y = n.n(v),
						g = n("mtxM"),
						x = n("0F0d"),
						w = n("HBB+"),
						b = n("WRRc"),
						_ = n("To1F"),
						k = n("Hot+"),
						C = n("yTq1"),
						j = n("YLfZ"),
						$ = n("J2Ti"),
						R = n("pPh5"),
						E = n("TuIM"),
						O = n("H5K5"),
						T = n("1TNd");
                    n.d(e, "a", function() {
                        return _.a
                    });
                    var S, q = (S = p()(o.a.mark(function t(e) {
                        var n, r, a, i, s, f, d;
                        return o.a.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = Object(g.a)(e), (r = Object($.a)(e)).$router = n, a = l()({
                                        router: n,
                                        store: r,
                                        nuxt: {
                                            defaultTransition: P,
                                            transitions: [P],
                                            setTransitions: function(t) {
                                                return Array.isArray(t) || (t = [t]), t = t.map(function(t) {
                                                    return t = t ? "string" == typeof t ? c()({}, P, {
                                                        name: t
                                                    }) : c()({}, P, t) : P
                                                }), this.$options.nuxt.transitions = t, t
                                            },
                                            err: null,
                                            dateErr: null,
                                            error: function(t) {
                                                t = t || null, a.context._errored = !! t, "string" == typeof t && (t = {
                                                    statusCode: 500,
                                                    message: t
                                                });
                                                var n = this.nuxt || this.$options.nuxt;
                                                return n.dateErr = Date.now(), n.err = t, e && (e.nuxt.error = t), t
                                            }
                                        }
                                    }, C.a), r.app = a, i = e ? e.next : function(t) {
                                        return a.router.push(t)
                                    }, s = void 0, e ? s = n.resolve(e.url).route : (f = Object(j.d)(n.options.base), s = n.resolve(f).route), t.next = 10, Object(j.m)(a, {
                                        route: s,
                                        next: i,
                                        error: a.nuxt.error.bind(a),
                                        store: r,
                                        payload: e ? e.payload : void 0,
                                        req: e ? e.req : void 0,
                                        res: e ? e.res : void 0,
                                        beforeRenderFns: e ? e.beforeRenderFns : void 0
                                    });
                                case 10:
                                    if (d = function(t, e) {
                                        if (!t) throw new Error("inject(key, value) has no key provided");
                                        if (!e) throw new Error("inject(key, value) has no value provided");
                                        a[t = "$" + t] = e, r[t] = a[t];
                                        var n = "__nuxt_" + t + "_installed__";
                                        m.
                                    default [n] || (m.
                                    default [n] = !0, m.
                                    default.use(function() {
                                            m.
                                        default.prototype.hasOwnProperty(t) || u()(m.
                                        default.prototype, t, {
                                        get: function() {
                                                    return this.$root.$options[t]
                                    }
                                    })
                                    }))
                                    }, window.__NUXT__ && window.__NUXT__.state && r.replaceState(window.__NUXT__.state), "function" != typeof R.
                                default) {
                                        t.next = 16;
                                        break
                                    }
                                    return t.next = 16, Object(R.
                                default)(a.context, d);
                                case 16:
                                    if ("function" != typeof E.a) {
                                        t.next = 19;
                                        break
                                    }
                                    return t.next = 19, Object(E.a)(a.context, d);
                                case 19:
                                    if ("function" != typeof O.a) {
                                        t.next = 22;
                                        break
                                    }
                                    return t.next = 22, Object(O.a)(a.context, d);
                                case 22:
                                    if ("function" != typeof T.a) {
                                        t.next = 25;
                                        break
                                    }
                                    return t.next = 25, Object(T.a)(a.context, d);
                                case 25:
                                    t.next = 28;
                                    break;
                                case 28:
                                    return t.abrupt("return", {
                                        app: a,
                                        router: n,
                                        store: r
                                    });
                                case 29:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this)
                    })), function(t) {
                        return S.apply(this, arguments)
                    });
                    m.
				default.component(x.a.name, x.a), m.
				default.component(w.a.name, w.a), m.
				default.component(b.a.name, b.a), m.
				default.component(k.a.name, k.a), m.
				default.use(y.a, {
				    keyName: "head",
				    attribute: "data-n-head",
				    ssrAttribute: "data-n-head-ssr",
				    tagIDKeyName: "hid"
				});
                    var P = {
                        name: "page",
                        mode: "out-in",
                        appear: !1,
                        appearClass: "appear",
                        appearActiveClass: "appear-active",
                        appearToClass: "appear-to"
                    }
                },
                uXtq: function(t, e, n) {
                    "use strict";
                    var r = function() {
                        var t = this.$createElement;
                        return (this._self._c || t)("div", {
                            staticClass: "wrapper"
                        })
                    };
                    r._withStripped = !0;
                    var o = {
                        render: r,
                        staticRenderFns: []
                    };
                    e.a = o
                },
                unZF: function(t, e, n) {
                    "use strict";
                    var r = n("BO1k"),
						o = n.n(r),
						a = n("4Atj"),
						i = a.keys();

                    function u(t) {
                        var e = a(t);
                        return e.
					default ?e.
                            default:
						e
                    }
                    var s = {},
						c = !0,
						f = !1,
						l = void 0;
                    try {
                        for (var d, p = o()(i); !(c = (d = p.next()).done); c = !0) {
                            var h = d.value;
                            s[h.replace(/^\.\//, "").replace(/\.(js)$/, "")] = u(h)
                        }
                    } catch (t) {
                        f = !0, l = t
                    } finally {
                        try {
                            !c && p.
                            return &&p.
                            return ()
                            } finally {
                                if (f) throw l
                            }
                    }
                    e.a = s
                },
                vdRI: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), n.d(e, "actions", function() {
                        return s
                    });
                    var r = n("Xxa5"),
						o = n.n(r),
						a = n("exGp"),
						i = n.n(a),
						u = n("SC3y"),
						s = {
						    nuxtServerInit: function() {
						        var t = i()(o.a.mark(function t(e, n) {
						            var r, a, i, s, c, f = e.commit,
										l = e.dispatch,
										d = n.req;
						            n.isDev;
						            return o.a.wrap(function(t) {
						                for (;;) switch (t.prev = t.next) {
						                    case 0:
						                        return console.log("Requesting Page:" + d.originalUrl), r = d.headers.cookie, f("request/setCookie", r), r && -1 != r.indexOf("wu_u_id") || (a = u.a.uuid(), f("uid/setId", a), f("request/setCookie", (r || "") + (r ? ";" : "") + "wu_u_id=" + a)), i = d.headers["user-agent"], f("request/setUA", i), s = d.headers["x-forwarded-for"] || d.connection.remoteAddress || d.socket.remoteAddress || d.connection.socket.remoteAddress, f("request/setIP", s), c = d.headers.referer, f("request/setReferer", c), t.next = 12, l("footer/setLinks");
						                    case 12:
						                    case "end":
						                        return t.stop()
						                }
						            }, t, this)
						        }));
						        return function(e, n) {
						            return t.apply(this, arguments)
						        }
						    }()
						}
                },
                wpLj: function(t, e, n) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), e.
				default = function(t) {
				    t.res;
				    var e = t.req;
				    t.store.state;
				    e.headers.cookie && e.headers.cookie.indexOf("wu_u_id")
				}
                },
                yTq1: function(t, e, n) {
                    "use strict";
                    var r = n("//Fk"),
						o = n.n(r),
						a = n("/5sW"),
						i = n("F88d"),
						u = {
						    _default: function() {
						        return n.e(3).then(n.bind(null, "Ma2J")).then(function(t) {
						            return t.
								default ||t
						        })
						    }
						},
						s = {};
                    e.a = {
                        head: {
                            meta: [{
                                charset: "utf-8"
                            }, {
                                name: "viewport",
                                content: "width=device-width, initial-scale=1"
                            }, {
                                hid: "description",
                                name: "description",
                                content: "../404" /*tpa=http://www.goujianwu.com/_nuxt/SSR front end for goujianwu.com*/
                            }],
                            link: [{
                                rel: "icon",
                                type: "image/x-icon",
                                href: "../favicon.ico" /*tpa=http://www.goujianwu.com/favicon.ico*/
                            }, {
                                rel: "stylesheet",
                                href: "../../at.alicdn.com/t/font_584780_7o6blk2havc2fbt9.css" /*tpa=http://at.alicdn.com/t/font_584780_7o6blk2havc2fbt9.css*/
                            }],
                            style: [],
                            script: []
                        },
                        render: function(t, e) {
                            var n = t("nuxt-loading", {
                                ref: "loading"
                            }),
								r = t(this.layout || "nuxt");
                            return t("div", {
                                domProps: {
                                    id: "__nuxt"
                                }
                            }, [n, t("transition", {
                                props: {
                                    name: "layout",
                                    mode: "out-in"
                                }
                            }, [t("div", {
                                domProps: {
                                    id: "__layout"
                                },
                                key: this.layoutName
                            }, [r])])])
                        },
                        data: function() {
                            return {
                                layout: null,
                                layoutName: ""
                            }
                        },
                        beforeCreate: function() {
                            a.
						default.util.defineReactive(this, "nuxt", this.$options.nuxt)
                        },
                        created: function() {
                            a.
						default.prototype.$nuxt = this, "undefined" != typeof window && (window.$nuxt = this), this.error = this.nuxt.error
                        },
                        mounted: function() {
                            this.$loading = this.$refs.loading
                        },
                        watch: {
                            "../404" /*tpa=http://www.goujianwu.com/_nuxt/nuxt.err*/
							: "errorChanged"
                        },
                        methods: {
                            errorChanged: function() {
                                this.nuxt.err && this.$loading && (this.$loading.fail && this.$loading.fail(), this.$loading.finish && this.$loading.finish())
                            },
                            setLayout: function(t) {
                                t && s["_" + t] || (t = "default"), this.layoutName = t;
                                var e = "_" + t;
                                return this.layout = s[e], this.layout
                            },
                            loadLayout: function(t) {
                                var e = this;
                                t && (u["_" + t] || s["_" + t]) || (t = "default");
                                var n = "_" + t;
                                return s[n] ? o.a.resolve(s[n]) : u[n]().then(function(t) {
                                    return s[n] = t, delete u[n], s[n]
                                }).
								catch (function(t) {
								    if (e.$nuxt) return e.$nuxt.error({
								        statusCode: 500,
								        message: t.message
								    })
								})
                            }
                        },
                        components: {
                            NuxtLoading: i.a
                        }
                    }
                },
                ydpY: function(t, e, n) {
                    "use strict";
                    var r = n("aYjo");
                    e.a = {
                        getLinks: function(t) {
                            try {
                                return r.a.get("/links", "", t)
                            } catch (t) {
                                return console.log(t), []
                            }
                        }
                    }
                }
            },
			["T23V"]);