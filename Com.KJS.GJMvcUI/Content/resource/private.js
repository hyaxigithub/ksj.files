webpackJsonp([1], {
    "+MD6": function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("a", {
                staticClass: "button-container clearfix",
                style: {
                    width: t.width + "px",
                    height: t.height + "px",
                    "border-color": t.borderColor,
                    "background-color": t.background,
                    "border-radius": t.borderRadius + "px",
                    "box-shadow": "" + t.boxShadow
                },
                attrs: {
                    title: t.title
                },
                on: {
                    mouseup: t.onMouseUp,
                    mousedown: t.onMouseDown,
                    mouseenter: t.onHover,
                    mouseleave: t.onLeave,
                    click: t.onClick
                }
            }, [t.icon ? i("div", {
                staticClass: "button-icon iconfont",
                style: {
                    "background-image": "url('" + t.icon + "')",
                    width: t.height + "px",
                    height: t.height + "px",
                    float: t.iconAlignment
                }
            }) : t._e(), i("div", {
                staticClass: "button-label",
                style: {
                    color: t.color,
                    "line-height": t.height + "px",
                    "font-size": t.labelFontSize + "px"
                }
            }, [t._v(t._s(t.label))])])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    "+ov/": function(t, e) {},
    "+s4I": function(t, e) {},
    "/ZCQ": function(t, e, i) {
        "use strict";
        var o = i("ruZG"),
			r = i("w7ug"),
			a = !1;
        var n = function(t) {
            a || i("jlGE")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/cornerCheckbox.vue", e.a = s.exports
    },
    "16uv": function(t, e, i) {
        "use strict";
        var o = i("4WQr"),
			r = i("T3lC"),
			a = !1;
        var n = function(t) {
            a || i("ik8y")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/family.vue", e.a = s.exports
    },
    "3nCc": function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return t.plugin.show ? i("div", {
                staticClass: "popup",
                attrs: {
                    id: "plugin-popup"
                }
            }, [i("div", {
                staticClass: "popup-window"
            }, [i("div", {
                staticClass: "popup-header clearfix"
            }, [i("div", {
                staticClass: "close-button iconfont icon-close right",
                on: {
                    click: t.cancel
                }
            })]), t._m(0), i("div", {
                staticClass: "popup-footer"
            }, [i("div", {
                staticClass: "button-group clearfix"
            }, [t.showCancel ? i("div", {
                staticClass: "button cancel right",
                on: {
                    click: t.cancel
                }
            }, [t._v(t._s(t.cancelText))]) : t._e(), t.showConfirm ? i("div", {
                staticClass: "button confirm left",
                on: {
                    click: t.confirm
                }
            }, [t._v(t._s(t.confirmText))]) : t._e()])])])]) : t._e()
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: [function() {
                var t = this.$createElement,
					e = this._self._c || t;
                return e("div", {
                    staticClass: "popup-body"
                }, [e("p", {
                    staticClass: "main-text"
                }, [this._v("亲，要不要试一下构件坞的Revit插件，免费哦~")]), e("p", {
                    staticClass: "description"
                }, [this._v("包含网站中的所有构件，您只要拖拽就可以了，方便极了~")]), e("a", {
                    staticClass: "link",
                    attrs: {
                        href: "/plugin"
                    }
                }, [this._v("了解插件详情")])])
            }]
        };
        e.a = r
    },
    "422M": function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("div", {
                staticClass: "pagination clearfix",
                style: {
                    width: t.containerWidth + "px"
                }
            }, [i("a", {
                staticClass: "previous-page left",
                attrs: {
                    title: "上一页",
                    href: t.previous
                }
            }), i("ul", {
                staticClass: "pages left clearfix"
            }, t._l(t.displayPages, function(e) {
                return i("li", {
                    key: e.number,
                    staticClass: "page-item left"
                }, [i("a", {
                    staticClass: "round-mark",
                    class: {
                        current: t.currentPageNumber == e.number,
                        "fold-mark": e.number < 0
                    },
                    attrs: {
                        href: t.currentPageNumber == e.number ? "javascript:void(0)" : t.gotoPage(e.number),
                        title: "第" + e.number + "页",
                        target: "_self"
                    }
                }, [t._v(t._s(t.getDisplayNumber(e.number)))])])
            })), i("a", {
                staticClass: "next-page left",
                attrs: {
                    href: t.next,
                    title: "下一页"
                }
            }), i("div", {
                staticClass: "goto-area right clearfix"
            }, [i("span", {
                staticClass: "left"
            }, [t._v("跳转到  ")]), i("span", {
                staticClass: "input-container left"
            }, [i("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.inputPage,
                    expression: "inputPage"
                }],
                staticClass: "page-item",
                attrs: {
                    type: "text"
                },
                domProps: {
                    value: t.inputPage
                },
                on: {
                    keyup: function(e) {
                        return "button" in e || !t._k(e.keyCode, "enter", 13, e.key, "Enter") ? t.jump(e) : null
                    },
                    input: function(e) {
                        e.target.composing || (t.inputPage = e.target.value)
                    }
                }
            })]), i("span", {
                staticClass: "left"
            }, [t._v("  页  ")]), i("a", {
                staticClass: "page-item round-mark goto-button",
                attrs: {
                    title: "跳转到第" + t.inputPage + "页",
                    href: t.gotoPage(t.inputPage)
                }
            }, [t._v("GO")])])])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    "4EfX": function(t, e, i) {
        "use strict";
        e.a = {
            props: {
                checked: {
                    default:
                        !1
                },
                size: {
                    default:
                        12
                },
                backgroundActive: {
                    default:
                        "#FA5A5A"
                },
                backgroundInactive: {
                    default:
                        "white"
                },
                hover: {
                    default:
                        "#CCCCCC"
                },
                indicatorColor: {
                    default:
                        "white"
                },
                borderColor: {
                    default:
                        "#CCCCCC"
                },
                label: "",
                target: null,
                update: null
            },
            computed: {
                checkmarkBorderRadius: function() {
                    return this.size / 2
                },
                checkmarkBorderThickness: function() {
                    return this.checkValue || this.hovered ? this.indicatorTop : .1 * this.size
                },
                checkmarkBorderColor: function() {
                    return this.checkValue ? this.backgroundActive : this.hovered ? this.hover : this.borderColor
                },
                indicatorBorderRadius: function() {
                    return this.indicatorSize / 2
                },
                realSize: function() {
                    return Math.ceil(this.size - 2 * this.checkmarkBorderThickness)
                }
            },
            data: function() {
                return {
                    checkValue: !1,
                    hovered: !1,
                    checkmarkBackground: "",
                    indicatorSize: 0,
                    indicatorLeft: 0,
                    indicatorTop: 0,
                    indicatorOpacity: 0,
                    labelPaddingLeft: 0
                }
            },
            created: function() {
                this.checkValue = this.checked, this.labelPaddingLeft = 1.2 * this.size, this.indicatorSize = Math.ceil(.4 * this.size), this.indicatorTop = (this.size - this.indicatorSize) / 2, this.updateStatus(this.checkValue)
            },
            methods: {
                onHover: function() {
                    this.checkValue || (this.hovered = !0, this.checkmarkBackground = this.hover, this.indicatorOpacity = 1)
                },
                onLeave: function() {
                    this.checkValue || (this.hovered = !1, this.checkmarkBackground = this.backgroundInactive, this.indicatorOpacity = 0)
                },
                onChecked: function(t) {
                    t.preventDefault(), this.checkValue = !this.checkValue, this.updateStatus(this.checkValue), this.update(this.target, this.checkValue)
                },
                updateStatus: function(t) {
                    this.checkmarkBackground = t ? this.backgroundActive : this.backgroundInactive, this.indicatorOpacity = t ? 1 : 0
                }
            },
            watch: {
                checked: function(t, e) {
                    this.checkValue = t, this.updateStatus(t)
                }
            }
        }
    },
    "4WQr": function(t, e, i) {
        "use strict";
        var o = i("JwKv"),
			r = i("/ZCQ"),
			a = i("mtWM"),
			n = i.n(a),
			s = i("QBda");
        e.a = {
            props: ["family", "type"],
            components: {
                buttonWithIcon: o.a,
                cornerCheckbox: r.a
            },
            computed: {
                detail: function() {
                    var t = this.$store.state.filter.data.version;
                    return t ? "/detail/" + this.family.id + "?version=" + t : "/detail/" + this.family.id
                },
                isPublic: function() {
                    return "public" == this.type
                },
                isPrivate: function() {
                    return "private" == this.type
                },
                name: function() {
                    return this.family.name.length > 11 ? this.family.name.substr(0, 11) + "..." : this.family.name
                },
                selected: function() {
                    return this.family.selected
                },
                thumbnail: function() {
                    return this.thumbnailError ? "http://static.goujianwu.com/resource/images/256.png" : "http://static.goujianwu.com/metadata/" + this.family.rfaId + "/thumbnails/256_0.png"
                },
                favoriteIcon: function() {
                    return this.favorites ? "http://static.goujianwu.com/resource/images/icon_collected.png" : "http://static.goujianwu.com/resource/images/icon_collect.png"
                }
            },
            data: function() {
                return {
                    hovered: !1,
                    favorites: this.family.favorites,
                    thumbnailError: !1
                }
            },
            methods: {
                deleteFamily: function() {
                    var t = this;
                    this.$store.commit("popup/showConfirmation", {
                        show: !0,
                        title: "删除确认",
                        messages: ["是否确认删除?"],
                        description: "(此操作不可恢复)",
                        proceed: function() {
                            n.a.delete(s.a.uri.private.delete(), {
                                data: [t.family.id]
                            }).then(function(e) {
                                "success" == e.data.code ? window.location.reload() : t.$store.commit("alert/newAlert", {
                                    type: "error",
                                    message: "删除失败"
                                })
                            })
                        }
                    })
                },
                download: function() {
                    this.isPublic && this.googleAnalyticsSendEvent("构件下载", "点击", "公共构件页-构件下载"), this.$store.state.user.info ? this.downloadFile() : this.$store.commit("alert/newAlert", {
                        type: "success",
                        message: "请先登录"
                    })
                },
                downloadFile: function() {
                    var t = this,
						e = "";
                    e = this.family.version ? s.a.uri.common.download(this.family.id) + "?version=" + this.$store.state.filter.data.version : s.a.uri.common.download(this.family.id), n.a.get(e).then(function(e) {
                        "success" == e.data.code ? (t.downloadByUrl(e.data.data.downloadURL), e.data.data.popup && t.$store.commit("popup/showPlugin", {
                            show: !0,
                            buttons: {
                                confirm: {
                                    text: "插件下载"
                                },
                                cancel: {
                                    text: "再逛逛"
                                }
                            },
                            proceed: function() {
                                window.location.href = "/api/plugin/download"
                            }
                        })) : t.$store.commit("alert/newAlert", {
                            type: "error",
                            message: e.data.message
                        })
                    })
                },
                downloadByUrl: function(t) {
                    var e = document.createElement("a");
                    e.style.visibility = "hidden", e.setAttribute("href", t), e.setAttribute("download", "word.docx"), document.body.appendChild(e), e.click(), document.body.removeChild(e)
                },
                favorite: function() {
                    var t = this;
                    this.googleAnalyticsSendEvent("构件收藏", "点击", "公共构件页-构件收藏"), this.favorites ? this.$store.commit("alert/newAlert", {
                        type: "success",
                        message: "收藏成功"
                    }) : this.$store.state.user.info ? n.a.post(s.a.uri.public.collect(this.family.id, "1.103"), {
                        data: {
                            source: "list"
                        }
                    }).then(function(e) {
                        "success" == e.data.code ? (t.favorites = !0, t.$store.commit("alert/newAlert", {
                            type: "success",
                            message: "收藏成功"
                        })) : t.$store.commit("alert/newAlert", {
                            type: "error",
                            message: e.data.message
                        })
                    }) : this.$store.commit("alert/newAlert", {
                        type: "success",
                        message: "请先登录"
                    })
                },
                googleAnalyticsSendEvent: function(t, e, i) {
                    window && window.ga && window.ga("send", "event", t, e, i)
                },
                onSelectionChanged: function(t) {
                    this.$emit("selected", this.family, t)
                },
                rename: function() {
                    var t = this,
						e = [{
						    name: "族名称",
						    value: this.family.name
						}];
                    this.$store.commit("popup/showEdit", {
                        show: !0,
                        fields: e,
                        title: "修改族名称",
                        proceed: function() {
                            var e = {
                                rename: t.$store.state.popup.edit.fields.find(function(t) {
                                    return t.name = "族名称"
                                }).value
                            };
                            n.a.put(s.a.uri.private.rename(t.family.id), e).then(function(e) {
                                "success" == e.data.code ? window.location.reload() : t.$store.commit("alert/newAlert", {
                                    type: "error",
                                    message: "重命名失败"
                                })
                            })
                        }
                    })
                },
                showDefaultThumbnail: function() {
                    this.thumbnailError = !0
                }
            }
        }
    },
    "5lmK": function(t, e, i) {
        "use strict";
        e.a = {
            props: {
                borderRadius: {
                    default:
                        0
                },
                borderColorNormal: {
                    default:
                        "black"
                },
                borderColorHover: {
                    default:
                        "#fa5a5a"
                },
                backgroundNormal: {
                    default:
                        "white"
                },
                backgroundHover: {
                    default:
                        "#fa5a5a"
                },
                enabled: {
                    default:
                        !0
                },
                height: {
                    required: !0
                },
                iconAlignment: {
                    default:
                        "left"
                },
                iconHover: "",
                iconNormal: "",
                label: "",
                labelColorNormal: {
                    default:
                        "black"
                },
                labelColorHover: {
                    default:
                        "white"
                },
                labelFontSize: {
                    default:
                        14
                },
                shadowColor: "",
                target: null,
                title: "",
                width: {
                    required: !0
                }
            },
            data: function() {
                return {
                    background: "",
                    borderColor: "",
                    color: "",
                    icon: "",
                    labelMargin: "",
                    boxShadow: ""
                }
            },
            created: function() {
                this.background = this.backgroundNormal, this.borderColor = this.borderColorNormal, this.color = this.labelColorNormal, this.icon = this.iconNormal
            },
            methods: {
                onClick: function(t) {
                    t.preventDefault(), this.enabled && this.$emit("button-click", this.target)
                },
                onHover: function() {
                    this.enabled && (this.background = this.backgroundHover, this.borderColor = this.borderColorHover, this.color = this.labelColorHover, this.shadowColor ? this.boxShadow = "0px 2px 7px 0px " + this.shadowColor : this.boxShadow = "0px 2px 7px 0px transparent", this.icon = this.iconHover)
                },
                onLeave: function() {
                    this.background = this.backgroundNormal, this.borderColor = this.borderColorNormal, this.color = this.labelColorNormal, this.boxShadow = "0px 2px 7px 0px transparent", this.icon = this.iconNormal
                },
                onMouseDown: function() {
                    this.enabled && (this.opacity = .8)
                },
                onMouseUp: function() {
                    this.opacity = 1
                }
            }
        }
    },
    "7Jer": function(t, e, i) {
        "use strict";
        var o = i("fZjL"),
			r = i.n(o);

        function a() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				e = [];
            return r()(t).forEach(function(i) {
                var o = t[i];
                null !== o && void 0 !== o && e.push(i + "=" + encodeURI(o))
            }), e.join("&")
        }
        e.a = {
            navigate: function(t) {
                return "/" + t.uri + "?" + a(t.query)
            },
            serialize: a
        }
    },
    "A1N+": function(t, e) {},
    DYIs: function(t, e) {},
    EieN: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("transition", {
                attrs: {
                    name: "slide-filter"
                }
            }, [t.categories && t.categories.length > 0 ? i("div", {
                staticClass: "category-filter"
            }, [i("ul", {
                class: {
                    "first-class": 1 == t.level,
                    "second-class": 2 == t.level,
                    "third-class": 3 == t.level
                }
            }, [t.level >= 2 ? i("li", {
                class: {
                    selected: t.selectedCategoryId == t.parent
                },
                on: {
                    mouseenter: function(e) {
                        t.onMouseEnter("")
                    },
                    mouseleave: function(e) {
                        t.onMouseLeave("")
                    }
                }
            }, [i("a", {
                staticClass: "category-content clearfix",
                attrs: {
                    href: t.categoryLink(t.parent),
                    "data-category": t.parent.categoryId
                },
                on: {
                    click: function(e) {
                        t.categoryClick("全部分类")
                    }
                }
            }, [i("div", {
                staticClass: "category-label",
                style: {
                    "padding-left": "5px"
                }
            }, [t._v("全部分类")])])]) : t._e(), t._l(t.categories, function(e) {
                return i("li", {
                    key: e.categoryId,
                    class: {
                        selected: t.isCategorySelected(e.categoryId)
                    },
                    style: {
                        width: t.categoryWidth
                    },
                    on: {
                        mouseenter: function(i) {
                            t.onMouseEnter(e.categoryId)
                        },
                        mouseleave: function(i) {
                            t.onMouseLeave(e.categoryId)
                        }
                    }
                }, [i("a", {
                    staticClass: "category-content clearfix",
                    attrs: {
                        href: t.categoryLink(e.categoryId),
                        "data-category": e.categoryId
                    },
                    on: {
                        click: function(i) {
                            t.categoryClick(e.nameZh)
                        }
                    }
                }, [e.icon && "" != e.icon ? i("div", {
                    staticClass: "category-icon iconfont left",
                    class: "icon-category_id_" + e.categoryId
                }) : t._e(), null != e.count ? i("div", {
                    staticClass: "category-count right"
                }, [t._v(t._s(e.count))]) : t._e(), i("div", {
                    staticClass: "category-label",
                    style: {
                        "padding-left": e.icon && "" != e.icon ? "40px" : "5px"
                    }
                }, [t._v(t._s(e.nameZh))])])])
            })], 2), t._l(t.categories, function(e) {
                return e.categoryId && t.isCategorySelected(e.categoryId) ? i("category-tree", {
                    key: e.categoryId,
                    attrs: {
                        parent: e.categoryId,
                        categories: e.children,
                        level: t.level + 1,
                        categoryLink: t.categoryLink
                    }
                }) : t._e()
            })], 2) : t._e()])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    Etb3: function(t, e, i) {
        "use strict";
        var o = i("Xxa5"),
			r = i.n(o),
			a = i("exGp"),
			n = i.n(a),
			s = i("tCag"),
			c = i("cqzd"),
			l = i("16uv"),
			u = i("n9uP"),
			h = i("3o5/"),
			d = (i("cjsc"), i("7Jer")),
			f = i("shIA"),
			p = i("JwKv"),
			g = i("xpUh"),
			m = i("mtWM"),
			v = i.n(m),
			b = i("QBda"),
			k = i("Z+02"),
			C = i("P4rm");
        i.n(C);
        e.a = {
            head: function() {
                return {
                    title: "我的构件-广联达官方revit族库下载平台，BIM构件库"
                }
            },
            middleware: ["auth"],
            watchQuery: ["page", "categoryId", "keyword", "version"],
            components: {
                checkbox: f.a,
                buttonWithIcon: p.a,
                categoryTree: s.a,
                dropDownList: g.a,
                family: l.a,
                pagination: u.a,
                pluginPopup: k.a,
                versionFilter: c.a
            },
            asyncData: function() {
                var t = n()(r.a.mark(function t(e) {
                    var i, o, a, n, s = e.query,
						c = s.page,
						l = s.categoryId,
						u = s.keyword,
						d = s.version,
						f = e.redirect,
						p = e.store;
                    return r.a.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return p.commit("filter/url", "private"), p.commit("filter/categoryId", l), p.commit("filter/page", c), p.commit("filter/keyword", u), p.commit("filter/version", null == d || void 0 === d ? "" : d), p.commit("filter/pageSize", 20), i = 20, null == c && (c = 1), t.next = 10, h.a.getPrivateCategoryCount(p.state.filter.data.version, p.state.request.context);
                            case 10:
                                return o = t.sent, t.next = 13, h.a.getPrivateCategoryTree(p.state.filter.data.version, p.state.request.context);
                            case 13:
                                return (a = t.sent).forEach(function(t) {
                                    t.count = o.categoryCounts.find(function(e) {
                                        return e.categoryId == t.categoryId
                                    }).count
                                }), a.insert(0, {
                                    categoryId: "",
                                    nameEn: "all",
                                    nameZh: "所有",
                                    weight: 1,
                                    count: o.total
                                }), a.forEach(function(t) {
                                    t.icon = !0
                                }), t.next = 19, p.dispatch("families/setPrivateFamilies");
                            case 19:
                                return (n = p.state.families.families).page.totalCount && (c > n.page.totalPages ? (p.commit("filter/page", n.page.totalPages), f({
                                    name: "private",
                                    query: p.state.filter.data
                                })) : c < 1 && (p.commit("filter/page", 1), f({
                                    name: "private",
                                    query: p.state.filter.data
                                }))), t.abrupt("return", {
                                    categories: a,
                                    checkAllLabel: "不限版本",
                                    familyTotalCount: n.page.totalCount,
                                    favorites: !0,
                                    filter: {
                                        categoryId: l,
                                        keyword: u,
                                        page: c,
                                        version: d
                                    },
                                    leftPanelHeight: 0,
                                    leftPanelMinHeight: 0,
                                    pageSize: i,
                                    totalCollected: o.all
                                });
                            case 22:
                            case "end":
                                return t.stop()
                        }
                    }, t, this)
                }));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }(),
            mounted: function() {
                var t = this;
                this.$store.commit("header/setCurrentTab", "private"), this.$store.commit("header/showSearch", !0), this.leftPanelHeight = document.body.clientHeight - 160, this.leftPanelMinHeight = document.documentElement.clientHeight - 160, window.addEventListener("resize", function() {
                    t.leftPanelMinHeight = document.documentElement.clientHeight - 160
                })
            },
            computed: {
                allChecked: function() {
                    return this.families.every(function(t) {
                        return t.selected
                    })
                },
                families: function() {
                    return this.$store.state.families.families.list.map(function(t) {
                        return t.selected = !1, t
                    })
                },
                filterLink: function() {
                    return {
                        name: "private",
                        query: this.filter
                    }
                },
                selectedVersion: function() {
                    return this.$store.state.filter.data.version
                },
                selectedFamilies: function() {
                    return this.families.filter(function(t) {
                        return t.selected
                    }).map(function(t) {
                        return t.id
                    })
                },
                userInfo: function() {
                    return this.$store.state.user.info
                },
                versionList: function() {
                    var t = this.$store.state.filter.data,
						e = [2014, 2015, 2016, 2017, 2018].map(function(e) {
						    return {
						        label: "Revit" + e,
						        version: e,
						        to: {
						            name: "private",
						            query: {
						                categoryId: t.categoryId,
						                page: t.page,
						                keyword: t.keyword,
						                version: e,
						                pageSize: t.pageSize
						            }
						        }
						    }
						});
                    return e.insert(0, {
                        label: "全部版本",
                        version: "",
                        to: {
                            name: "private",
                            query: {
                                categoryId: t.categoryId,
                                page: t.page,
                                keyword: t.keyword,
                                version: "",
                                pageSize: t.pageSize
                            }
                        }
                    }), e
                }
            },
            methods: {
                checkAll: function(t) {
                    var e = this;
                    this.families.forEach(function(i) {
                        e.$store.commit("families/select", {
                            id: i.id,
                            selected: t
                        })
                    })
                },
                deleteBatch: function() {
                    var t = this;
                    this.$store.commit("popup/showConfirmation", {
                        show: !0,
                        title: "删除确认",
                        messages: ["是否确认删除?"],
                        description: "(此操作不可恢复)",
                        proceed: function() {
                            v.a.delete(b.a.uri.private.delete(), {
                                data: t.selectedFamilies
                            }).then(function(e) {
                                "success" == e.data.code ? window.location.reload() : t.$store.commit("alert/newAlert", {
                                    type: "error",
                                    message: "批量删除失败"
                                })
                            })
                        }
                    })
                },
                onCategoryChanged: function(t) {
                    if (this.filter.category != t) {
                        var e = {};
                        for (var i in this.filter) {
                            var o = this.filter[i];
                            null !== o && void 0 !== o && (e[i] = o)
                        }
                        return e.categoryId = t, e.page = 1, d.a.navigate({
                            uri: "private",
                            query: e
                        })
                    }
                },
                onFamilySelected: function(t, e) {
                    this.$store.commit("families/select", {
                        id: t.id,
                        selected: e
                    })
                },
                onKeywordChanged: function(t) {
                    if (this.filter.keyword != t) {
                        var e = {};
                        for (var i in this.filter) {
                            var o = this.filter[i];
                            null !== o && void 0 !== o && (e[i] = o)
                        }
                        return e.keyword = t, e.categoryId = null, e.page = 1, d.a.navigate({
                            uri: "private",
                            query: e
                        })
                    }
                },
                onPageChanged: function(t) {
                    if (this.filter.page == t) return "";
                    var e = {};
                    for (var i in this.filter) {
                        var o = this.filter[i];
                        null !== o && void 0 !== o && (e[i] = o)
                    }
                    return e.page = t, d.a.navigate({
                        uri: "private",
                        query: e
                    })
                },
                onVersionsChanged: function(t) {
                    if (this.filter.version == t) return "";
                    var e = {};
                    for (var i in this.filter) {
                        var o = this.filter[i];
                        null !== o && void 0 !== o && (e[i] = o)
                    }
                    return e.version = t, d.a.navigate({
                        uri: "private",
                        query: e
                    })
                }
            }
        }
    },
    JwKv: function(t, e, i) {
        "use strict";
        var o = i("5lmK"),
			r = i("+MD6"),
			a = !1;
        var n = function(t) {
            a || i("b53c")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/button.vue", e.a = s.exports
    },
    LuOB: function(t, e) {},
    OzQV: function(t, e) {
        String.prototype.startWith = function(t) {
            return new RegExp("^" + t).test(this)
        }, String.prototype.endWith = function(t) {
            return new RegExp(t + "$").test(this)
        }
    },
    RQzD: function(t, e, i) {
        "use strict";
        var o = i("fZjL"),
			r = i.n(o);
        e.a = {
            props: ["list", "defaultLabel", "selected"],
            data: function() {
                return {
                    dropped: !1
                }
            },
            methods: {
                dropDown: function(t) {
                    this.dropped ? this.hide() : this.show()
                },
                show: function() {
                    this.dropped = !0, document.addEventListener("click", this.hideList, !1)
                },
                hide: function() {
                    this.dropped = !1, document.removeEventListener("click", this.hideList, !1)
                },
                hideList: function(t) {
                    this.$refs.container.contains(t.target) || this.hide()
                },
                filter: function() {},
                url: function(t) {
                    var e = [];
                    return r()(t.query).forEach(function(i) {
                        var o = t.query[i];
                        null !== o && void 0 !== o && e.push(i + "=" + encodeURI(o))
                    }), "/" + t.name + "?" + e.join("&")
                }
            },
            computed: {
                displayLabel: function() {
                    var t = this;
                    return this.selected ? this.list.find(function(e) {
                        return e.version == t.selected
                    }).label : this.defaultLabel
                }
            }
        }
    },
    S8EH: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = i("Etb3"),
			r = i("sacX"),
			a = !1;
        var n = function(t) {
            a || i("Tw1H")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "pages/private.vue", e.
	default = s.exports
    },
    T3lC: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return t.family ? i("a", {
                staticClass: "family-container",
                attrs: {
                    href: t.detail,
                    target: "_blank",
                    title: "Revit族库-" + t.family.name
                },
                on: {
                    mouseenter: function(e) {
                        t.hovered = !0
                    },
                    mouseleave: function(e) {
                        t.hovered = !1
                    }
                }
            }, [t.isPublic ? i("div", {
                staticClass: "button-box"
            }, [i("button-with-icon", {
                staticClass: "public",
                attrs: {
                    width: "108",
                    height: "32",
                    title: "收藏构件-" + t.family.name,
                    label: "收藏构件",
                    labelFontSize: "13",
                    labelColorNormal: "#3b3b3b",
                    labelColorHover: "#3b3b3b",
                    title: "收藏构件到我的构件",
                    iconNormal: t.favoriteIcon,
                    iconHover: t.favoriteIcon,
                    iconAlignment: "left",
                    backgroundNormal: "white",
                    backgroundHover: "white",
                    borderColorNormal: "white",
                    borderColorHover: "white",
                    borderRadius: "4",
                    shadowColor: "#f11616"
                },
                on: {
                    "button-click": t.favorite
                }
            }), i("button-with-icon", {
                staticClass: "public",
                attrs: {
                    width: "108",
                    height: "32",
                    title: "下载构件-" + t.family.name,
                    label: "免费下载",
                    labelFontSize: "13",
                    labelColorNormal: "white",
                    labelColorHover: "white",
                    title: "免费下载构件",
                    iconNormal: "http://static.goujianwu.com/resource/images/icon_download_white.png",
                    iconHover: "http://static.goujianwu.com/resource/images/icon_download_white.png",
                    iconAlignment: "left",
                    backgroundNormal: "#fa5a5a",
                    backgroundHover: "#fa5a5a",
                    borderColorNormal: "#fa5a5a",
                    borderRadius: "4",
                    shadowColor: "#f11616"
                },
                on: {
                    "button-click": t.download
                }
            })], 1) : t._e(), t.isPrivate ? i("div", {
                staticClass: "button-box clearfix"
            }, [i("button-with-icon", {
                staticClass: "private left",
                attrs: {
                    width: "30",
                    height: "30",
                    title: "下载",
                    iconNormal: "http://static.goujianwu.com/resource/images/icon_download_dark.png",
                    iconHover: "http://static.goujianwu.com/resource/images/icon_download_white.png",
                    iconAlignment: "left",
                    backgroundNormal: "white",
                    backgroundHover: "#fa5a5a",
                    borderColorNormal: "white",
                    borderColorHover: "#fa5a5a",
                    borderRadius: "16"
                },
                on: {
                    "button-click": t.download
                }
            }), i("button-with-icon", {
                staticClass: "private left",
                attrs: {
                    width: "30",
                    height: "30",
                    title: "重命名",
                    iconNormal: "http://static.goujianwu.com/resource/images/icon_edit_dark.png",
                    iconHover: "http://static.goujianwu.com/resource/images/icon_edit_white.png",
                    iconAlignment: "left",
                    backgroundNormal: "white",
                    backgroundHover: "#fa5a5a",
                    borderColorNormal: "white",
                    borderColorHover: "#fa5a5a",
                    borderRadius: "16"
                },
                on: {
                    "button-click": t.rename
                }
            }), i("button-with-icon", {
                staticClass: "private left",
                attrs: {
                    width: "30",
                    height: "30",
                    title: "删除",
                    iconNormal: "http://static.goujianwu.com/resource/images/icon_delete_dark.png",
                    iconHover: "http://static.goujianwu.com/resource/images/icon_delete_white.png",
                    iconAlignment: "left",
                    backgroundNormal: "white",
                    backgroundHover: "#fa5a5a",
                    borderColorNormal: "white",
                    borderColorHover: "#fa5a5a",
                    borderRadius: "16"
                },
                on: {
                    "button-click": t.deleteFamily
                }
            })], 1) : t._e(), i("div", {
                staticClass: "img-container"
            }, [i("img", {
                attrs: {
                    src: t.thumbnail
                },
                on: {
                    error: t.showDefaultThumbnail
                }
            })]), i("div", {
                staticClass: "family-name"
            }, [t._v(t._s(t.name))]), t.isPrivate ? i("div", {
                staticClass: "corner-checkbox-container",
                style: {
                    opacity: t.selected || t.hovered ? 1 : 0
                }
            }, [i("corner-checkbox", {
                attrs: {
                    size: "32",
                    background: {
                        normal: "rgba(27,27,27,0.5)",
                        active: "#fa5a5a"
                    },
                    position: "top-left",
                    checked: t.selected
                },
                on: {
                    checked: t.onSelectionChanged
                }
            })], 1) : t._e()]) : t._e()
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    Tw1H: function(t, e) {},
    URex: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("div", {
                staticClass: "drop-down-container"
            }, [i("div", {
                staticClass: "display-box clearfix",
                on: {
                    click: function(e) {
                        return e.stopPropagation(), t.dropDown(e)
                    }
                }
            }, [i("div", {
                staticClass: "display-text"
            }, [t._v(t._s(t.displayLabel))]), i("div", {
                staticClass: "drop-down-arrow right"
            })]), t.dropped ? i("div", {
                ref: "container",
                staticClass: "drop-down-list-container"
            }, [i("div", {
                staticClass: "box-arrow"
            }), i("ul", {
                staticClass: "drop-down-list"
            }, t._l(t.list, function(e) {
                return i("li", {
                    staticClass: "drop-down-item"
                }, [i("a", {
                    staticClass: "drop-down-label",
                    attrs: {
                        href: t.url(e.to)
                    }
                }, [t._v(t._s(e.label))])])
            }))]) : t._e()])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    W5Q0: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("label", {
                staticClass: "radio-button-container",
                style: {
                    "padding-left": t.labelPaddingLeft + "px",
                    "font-size": t.size - 4 + "px",
                    "line-height": t.size + "px"
                },
                on: {
                    mouseenter: t.onHover,
                    mouseleave: t.onLeave
                }
            }, [t._v(t._s(t.label)), i("span", {
                staticClass: "checkmark",
                style: {
                    "background-color": t.indicatorColor,
                    width: t.realSize + "px",
                    height: t.realSize + "px",
                    "border-width": t.checkmarkBorderThickness + "px",
                    "border-color": t.checkmarkBorderColor,
                    "border-radius": t.checkmarkBorderRadius + "px"
                }
            })])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    WMhS: function(t, e, i) {
        "use strict";
        var o = i("fZjL"),
			r = i.n(o);
        e.a = {
            props: {
                itemsCount: {
                    required: !0
                },
                itemsPerPage: {
                    require: !0
                },
                maxDisplayPageCount: {
                    default:
                        7
                },
                fixedDisplayPageCountEachSide: {
                    default:
                        2
                },
                pageLink: null
            },
            data: function() {
                return {
                    pages: [],
                    currentPage: 1,
                    inputPage: 1,
                    folderMark: {
                        left: !0,
                        right: !0
                    }
                }
            },
            created: function() {
                for (var t = this.pageCount, e = 0; e < t; e++) this.pages.push({
                    number: e + 1,
                    display: this.shouldPageDisplay(e)
                });
                this.currentPage = this.$route.query.page, this.currentPage || (this.currentPage = 1)
            },
            mounted: function() {
                this.inputPage = "", this.updateStatus()
            },
            computed: {
                displayPages: function() {
                    for (var t = [], e = this.pageCount, i = 0; i < e; i++) this.pages[i].display && t.push(this.pages[i]), i + 1 == this.fixedDisplayPageCountEachSideNumber && this.pages[i + 1] && !this.pages[i + 1].display && t.push({
                        number: -1,
                        display: !0
                    }), i + 1 != e - this.fixedDisplayPageCountEachSideNumber || this.pages[i].display || t.push({
                        number: -2,
                        display: !0
                    });
                    return t
                },
                pageCount: function() {
                    return Math.ceil(this.itemsCountNumber / this.itemsPerPageNumber)
                },
                currentPageNumber: function() {
                    var t = this.$route.query.page;
                    return t ? Number(t) : 1
                },
                hasNext: function() {
                    return this.pageCount > this.currentPageNumber
                },
                hasPrevious: function() {
                    return this.currentPageNumber > 1
                },
                itemsCountNumber: function() {
                    return Number(this.itemsCount)
                },
                itemsPerPageNumber: function() {
                    return Number(this.itemsPerPage)
                },
                maxDisplayPageCountNumber: function() {
                    return Number(this.maxDisplayPageCount)
                },
                fixedDisplayPageCountEachSideNumber: function() {
                    return Number(this.fixedDisplayPageCountEachSide)
                },
                containerWidth: function() {
                    return 42 * this.displayPages.length + 36 + 64 + 185
                },
                previous: function() {
                    return this.hasPrevious ? this.gotoPage(this.currentPageNumber - 1) : "javascript:void(0)"
                },
                next: function() {
                    return this.hasNext ? this.gotoPage(this.currentPageNumber + 1) : "javascript:void(0)"
                }
            },
            methods: {
                getDisplayNumber: function(t) {
                    return t < 0 ? "···" : t < 10 ? "0" + t : t
                },
                gotoPage: function(t) {
                    return t < 1 && (t = 1), t > this.pageCount && (t = this.pageCount), this.pageLink ? this.pageLink(t) : ""
                },
                jump: function() {
                    window.location.href = this.gotoPage(this.inputPage)
                },
                serialize: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						e = [];
                    return r()(t).forEach(function(i) {
                        var o = t[i];
                        null !== o && void 0 !== o && e.push(i + "=" + encodeURI(o))
                    }), e.join("&")
                },
                shouldPageDisplay: function(t) {
                    var e = this.pageCount;
                    return e < this.maxDisplayPageCount || (t <= this.fixedDisplayPageCountEachSideNumber || t > e - this.fixedDisplayPageCountEachSideNumber || (this.currentPageNumber >= e + 1 - (this.maxDisplayPageCountNumber - 1) / 2 ? e - t < this.maxDisplayPageCountNumber - this.fixedDisplayPageCountEachSideNumber : this.currentPageNumber <= (this.maxDisplayPageCountNumber - 1) / 2 ? t <= this.maxDisplayPageCountNumber - this.fixedDisplayPageCountEachSideNumber : 2 * Math.abs(t - this.currentPageNumber) + 1 <= this.maxDisplayPageCountNumber - 2 * this.fixedDisplayPageCountEachSideNumber))
                },
                updateStatus: function() {
                    for (var t = this.pageCount, e = 0; e < t; e++) this.pages[e].display = this.shouldPageDisplay(this.pages[e].number)
                }
            }
        }
    },
    "Z+02": function(t, e, i) {
        "use strict";
        var o = i("jZd9"),
			r = i("3nCc"),
			a = !1;
        var n = function(t) {
            a || i("vAM3")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/pluginPopup.vue", e.a = s.exports
    },
    aqwY: function(t, e, i) {
        "use strict";
        var o = i("shIA"),
			r = i("cuRu");
        e.a = {
            props: ["checkNoneLabel", "versionLink"],
            components: {
                checkbox: o.a,
                radiobutton: r.a
            },
            computed: {
                versions: function() {
                    var t = this;
                    return ["2014", "2015", "2016", "2017", "2018", "2019"].map(function(e) {
                        return {
                            name: "Revit" + e,
                            version: e,
                            checked: e == t.$store.state.filter.data.version
                        }
                    })
                }
            },
            data: function() {
                return {
                    checkNone: !1,
                    checkBoxSize: 16
                }
            },
            methods: {
                checkVersion: function(t) {
                    t.checked = !t.checked, this.changeCheckNone()
                },
                changeCheckNone: function() {
                    for (var t = 0; t < this.versions.length; t++) if (this.versions[t].checked) return void(this.checkNone = !1);
                    this.checkNone = !0
                },
                checkNoneVersions: function() {
                    for (var t = 0; t < this.versions.length; t++) this.versions[t].checked = !this.checkNone
                },
                onCheckNone: function(t, e) {
                    this.checkNone = e, this.checkNoneVersions(), this.update(null)
                },
                onVersionChecked: function(t, e) {
                    t.checked = e;
                    for (var i = 0; i < this.versions.length; i++) this.versions[i].version != t.version && (this.versions[i].checked = !1);
                    this.changeCheckNone(), this.update(t)
                },
                update: function(t) {
                    this.$emit("versionChanged", t)
                }
            },
            created: function() {
                this.changeCheckNone()
            }
        }
    },
    b53c: function(t, e) {},
    cqzd: function(t, e, i) {
        "use strict";
        var o = i("aqwY"),
			r = i("xl+j"),
			a = !1;
        var n = function(t) {
            a || i("zEOY")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/versionfilter.vue", e.a = s.exports
    },
    cuRu: function(t, e, i) {
        "use strict";
        var o = i("4EfX"),
			r = i("W5Q0"),
			a = !1;
        var n = function(t) {
            a || i("+ov/")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/radiobutton.vue", e.a = s.exports
    },
    ik8y: function(t, e) {},
    jZd9: function(t, e, i) {
        "use strict";
        e.a = {
            computed: {
                plugin: function() {
                    return this.$store.state.popup.plugin
                },
                confirmText: function() {
                    var t = this.plugin.buttons;
                    return t && t.confirm && t.confirm.text ? t.confirm.text : "确认"
                },
                cancelText: function() {
                    var t = this.plugin.buttons;
                    return t && t.cancel && t.cancel.text ? t.cancel.text : "取消"
                },
                showConfirm: function() {
                    var t = this.plugin.buttons;
                    return !t || !t.confirm || null == t.confirm.show || t.confirm.show
                },
                showCancel: function() {
                    var t = this.plugin.buttons;
                    return !t || !t.cancel || null == t.cancel.show || t.cancel.show
                }
            },
            methods: {
                confirm: function() {
                    this.$store.commit("popup/closePlugin"), this.plugin.proceed && this.plugin.proceed()
                },
                cancel: function() {
                    this.$store.commit("popup/closePlugin"), this.plugin.cancel && this.plugin.cancel()
                }
            }
        }
    },
    jlGE: function(t, e) {},
    kz9K: function(t, e, i) {
        "use strict";
        e.a = {
            props: {
                checked: {
                    default:
                        !1
                },
                size: {
                    default:
                        12
                },
                backgroundActive: {
                    default:
                        "#FA5A5A"
                },
                backgroundInactive: {
                    default:
                        "white"
                },
                hover: {
                    default:
                        "#CCCCCC"
                },
                indicatorColor: {
                    default:
                        "white"
                },
                borderColor: {
                    default:
                        "#CCCCCC"
                },
                borderRadius: {
                    default:
                        0
                },
                label: "",
                target: null,
                update: null
            },
            computed: {
                realSize: function() {
                    return this.size - 2 * this.checkmarkBorderThickness
                }
            },
            data: function() {
                return {
                    checkValue: this.checked,
                    checkmarkBackground: "",
                    checkmarkBorderColor: "",
                    checkmarkBorderThickness: 0,
                    indicatorHeight: 0,
                    indicatorLeft: 0,
                    indicatorThickness: 0,
                    indicatorTop: 0,
                    indicatorWidth: 0,
                    indicatorOpacity: 0,
                    labelPaddingLeft: 0
                }
            },
            created: function() {
                this.checkmarkBorderThickness = .1 * this.size, this.labelPaddingLeft = 1.2 * this.size, this.indicatorWidth = .25 * this.size, this.indicatorHeight = .5 * this.size, this.indicatorThickness = .15 * this.size, this.indicatorTop = (this.size - this.indicatorHeight - 2 * this.indicatorThickness) / 2, this.indicatorLeft = (this.size - this.indicatorWidth - this.indicatorThickness) / 2, this.updateStatus(this.checkValue)
            },
            methods: {
                onHover: function() {
                    this.checkValue || (this.checkmarkBackground = this.hover, this.indicatorOpacity = 1)
                },
                onLeave: function() {
                    this.checkValue || (this.checkmarkBackground = this.backgroundInactive, this.indicatorOpacity = 0)
                },
                onChecked: function(t) {
                    t.preventDefault(), this.checkValue = !this.checkValue, this.updateStatus(this.checkValue), this.$emit("checked", this.checkValue)
                },
                updateStatus: function(t) {
                    this.checkmarkBackground = t ? this.backgroundActive : this.backgroundInactive, this.checkmarkBorderColor = t ? this.backgroundActive : this.borderColor, this.indicatorOpacity = t ? 1 : 0
                }
            },
            watch: {
                checked: function(t, e) {
                    this.checkValue = t, this.updateStatus(t)
                }
            }
        }
    },
    l2nU: function(t, e, i) {
        "use strict";
        var o = i("tCag"),
			r = i("OzQV");
        i.n(r);
        e.a = {
            props: ["categories", "parent", "level", "categoryLink", "type"],
            name: "category-tree",
            components: {
                categoryTree: o.a
            },
            computed: {
                categoryWidth: function() {
                    return 1 == this.level ? 100 / this.categories.length + "%" : "auto"
                },
                isPublic: function() {
                    return "public" == this.type
                },
                showFilter: function() {
                    if (1 == this.level) return !0;
                    var t = this.$route.query.categoryId;
                    return !!(t && t.startWith(this.parent) && this.categories && this.categories.length > 0)
                },
                selectedCategoryId: function() {
                    return this.$route.query.categoryId
                }
            },
            data: function() {
                return {
                    hoveredCategoryId: -1,
                    showSub: !1,
                    opacity: 0
                }
            },
            created: function() {},
            watch: {
                show: function(t, e) {
                    0 == e && this.filter("")
                }
            },
            methods: {
                filter: function(t) {
                    this.showSub ? this.showSub = this.selectedCategoryId != t : this.showSub = !0, this.selectedCategoryId = t
                },
                googleAnalyticsSendEvent: function(t, e, i) {
                    window && window.ga && window.ga("send", "event", t, e, i)
                },
                categoryClick: function(t) {
                    this.isPublic && this.googleAnalyticsSendEvent("公共构件页-八大分类", "点击", t)
                },
                showSubFilter: function(t) {
                    return this.showFilter && t == this.selectedCategoryId && this.showSub
                },
                onMouseEnter: function(t) {
                    this.hoveredCategoryId = t
                },
                onMouseLeave: function(t) {
                    this.hoveredCategoryId = -1
                },
                isCategorySelected: function(t) {
                    var e = this.$route.query.categoryId;
                    if (e) {
                        if ("" == t) return !1;
                        if (e.startWith(t) && this.categories && this.categories.length > 0) return !0
                    } else if ("" == t) return !0;
                    return !1
                },
                isCategoryHovered: function(t) {
                    return t == this.hoveredCategoryId
                },
                getCategoryIcon: function(t) {
                    return this.isCategorySelected(t.categoryId) ? t.icon.selected : this.isCategoryHovered(t.categoryId) ? t.icon.hover : t.icon.
				default
                }
            }
        }
    },
    n9uP: function(t, e, i) {
        "use strict";
        var o = i("WMhS"),
			r = i("422M"),
			a = !1;
        var n = function(t) {
            a || i("+s4I")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/pagination.vue", e.a = s.exports
    },
    q77v: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("label", {
                staticClass: "check-box-container",
                style: {
                    "padding-left": t.labelPaddingLeft + "px",
                    "font-size": t.size - 4 + "px",
                    "line-height": t.size + "px"
                },
                on: {
                    mouseenter: t.onHover,
                    mouseleave: t.onLeave,
                    click: t.onChecked
                }
            }, [t._v(t._s(t.label)), i("span", {
                staticClass: "checkmark",
                style: {
                    "background-color": t.checkmarkBackground,
                    width: t.realSize + "px",
                    height: t.realSize + "px",
                    "border-width": t.checkmarkBorderThickness + "px",
                    "border-color": t.checkmarkBorderColor,
                    "border-radius": t.borderRadius + "px"
                }
            }), i("span", {
                staticClass: "indicator",
                style: {
                    top: t.indicatorTop + "px",
                    left: t.indicatorLeft + "px",
                    width: t.indicatorWidth + "px",
                    height: t.indicatorHeight + "px",
                    "border-color": t.indicatorColor,
                    "border-right-width": t.indicatorThickness + "px",
                    "border-bottom-width": t.indicatorThickness + "px",
                    opacity: t.indicatorOpacity
                }
            })])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    ruZG: function(t, e, i) {
        "use strict";
        e.a = {
            props: {
                background: {},
                checked: {
                    default:
                        !1
                },
                position: {
                    default:
                        "bottom-right"
                },
                size: {
                    required: !0
                }
            },
            data: function() {
                return {
                    border: {
                        top: {
                            width: 0,
                            color: "transparent"
                        },
                        bottom: {
                            width: 0,
                            color: "transparent"
                        },
                        left: {
                            width: 0,
                            color: "transparent"
                        },
                        right: {
                            width: 0,
                            color: "transparent"
                        }
                    },
                    checkValue: !1,
                    indicator: {
                        width: 0,
                        height: 0,
                        thickness: 0,
                        color: "transparent"
                    }
                }
            },
            created: function() {
                this.checkValue = this.checked, this.border.top.width = this.size / 2, this.border.left.width = this.size / 2, this.border.bottom.width = this.size / 2, this.border.right.width = this.size / 2, this.indicator.width = .15 * this.size, this.indicator.height = .25 * this.size, this.indicator.thickness = .05 * this.size, this.indicator.color = "white";
                switch (this.position) {
                    case "top-left":
                    case "left-top":
                        this.border.top.color = this.background.normal, this.border.left.color = this.background.normal, this.indicator.top = .3 * -this.size, this.indicator.left = .3 * -this.size;
                        break;
                    case "top-right":
                    case "right-top":
                        this.border.top.color = this.background.normal, this.border.right.color = this.background.normal, this.indicator.top = .3 * -this.size, this.indicator.right = .3 * -this.size;
                        break;
                    case "bottom-left":
                    case "left-bottom":
                        this.border.bottom.color = this.background.normal, this.border.left.color = this.background.normal, this.indicator.bottom = .3 * -this.size, this.indicator.left = .3 * -this.size;
                        break;
                    case "bottom-right":
                    case "right-bottom":
                        this.border.bottom.color = this.background.normal, this.border.right.color = this.background.normal, this.indicator.bottom = .3 * -this.size, this.indicator.right = .3 * -this.size
                }
            },
            methods: {
                onClick: function(t) {
                    t.preventDefault(), this.checkValue = !this.checkValue, this.setBackground(this.checkValue ? this.background.active : this.background.normal), this.$emit("checked", this.checkValue)
                },
                onLeave: function() {
                    this.checkValue || this.setBackground(this.background.normal)
                },
                updateStatus: function() {},
                setBackground: function(t) {
                    switch (this.position) {
                        case "top-left":
                        case "left-top":
                            this.border.top.color = t, this.border.left.color = t;
                            break;
                        case "top-right":
                        case "right-top":
                            this.border.top.color = t, this.border.right.color = t;
                            break;
                        case "bottom-left":
                        case "left-bottom":
                            this.border.bottom.color = t, this.border.left.color = t;
                            break;
                        case "bottom-right":
                        case "right-bottom":
                            this.border.bottom.color = t, this.border.right.color = t
                    }
                }
            },
            watch: {
                checked: function(t, e) {
                    this.checkValue = t, this.setBackground(this.checkValue ? this.background.active : this.background.normal), this.updateStatus()
                }
            }
        }
    },
    sacX: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("div", {
                staticClass: "w1400 clearfix",
                attrs: {
                    id: "private"
                }
            }, [i("div", {
                staticClass: "left",
                style: {
                    height: t.leftPanelHeight + "px",
                    minHeight: t.leftPanelMinHeight + "px"
                },
                attrs: {
                    id: "private-info"
                }
            }, [i("div", {
                staticClass: "user-title"
            }, [i("h1", [t._v(t._s(t.userInfo.nickname))]), i("p", [t._v("的构件库")])]), i("ul", {
                staticClass: "user-tabs"
            }, [i("li", {
                attrs: {
                    id: "user-favorites-tab"
                }
            }, [i("a", {
                staticClass: "user-tab clearfix",
                class: {
                    selected: t.favorites
                }
            }, [i("div", {
                staticClass: "user-tab-icon"
            }), i("div", {
                staticClass: "user-tab-sum"
            }, [t._v(t._s(t.totalCollected))]), i("div", {
                staticClass: "user-tab-title"
            }, [t._v("我收藏的")])])])])]), i("div", {
                staticClass: "left",
                attrs: {
                    id: "main-content"
                }
            }, [i("div", {
                attrs: {
                    id: "category-area"
                }
            }, [i("category-tree", {
                attrs: {
                    categories: t.categories,
                    parent: "top",
                    level: 1,
                    show: !0,
                    categoryLink: t.onCategoryChanged
                }
            })], 1), i("div", {
                attrs: {
                    id: "toolbar-area"
                }
            }, [i("ul", {
                staticClass: "toolbar clearfix"
            }, [i("li", {
                staticClass: "toolbar-item left"
            }, [i("checkbox", {
                attrs: {
                    label: "全选",
                    size: "20",
                    fontSize: "14",
                    checked: t.allChecked
                },
                on: {
                    checked: t.checkAll
                }
            })], 1), i("li", {
                staticClass: "toolbar-item left"
            }, [i("a", {
                staticClass: "toolbar-label"
            }, [i("button-with-icon", {
                attrs: {
                    width: "60",
                    height: "18",
                    label: "删除",
                    enabled: t.selectedFamilies.length > 0,
                    labelFontSize: "14",
                    labelColorNormal: "#333333",
                    labelColorHover: "#fa5a5a",
                    iconNormal: "/images/icon_delete_dim_grey.png",
                    iconHover: "/images/icon_delete_red.png",
                    backgroundNormal: "transparent",
                    backgroundHover: "transparent",
                    borderColorNormal: "transparent",
                    borderColorHover: "transparent"
                },
                on: {
                    "button-click": t.deleteBatch
                }
            })], 1)]), i("li", {
                staticClass: "toolbar-item right"
            }, [i("drop-down-list", {
                attrs: {
                    list: t.versionList,
                    defaultLabel: "全部版本",
                    selected: t.selectedVersion
                }
            })], 1)])]), t.filter.keyword ? i("p", {
                staticClass: "search-result"
            }, [i("strong", [t._v('"' + t._s(t.filter.keyword) + '"')]), i("span", [t._v("相关搜索结果")]), i("span", {
                staticClass: "emphasize"
            }, [t._v(" " + t._s(t.familyTotalCount) + " ")]), i("span", [t._v("条")])]) : t._e(), t.families.length > 0 ? i("div", {
                staticClass: "family-content"
            }, [i("ul", {
                staticClass: "clearfix",
                attrs: {
                    id: "family-list"
                }
            }, t._l(t.families, function(e) {
                return i("li", {
                    staticClass: "left"
                }, [i("family", {
                    attrs: {
                        family: e,
                        type: "private"
                    },
                    on: {
                        selected: t.onFamilySelected
                    }
                })], 1)
            })), i("pagination", {
                attrs: {
                    itemsCount: t.familyTotalCount,
                    currentPage: t.filter.page,
                    itemsPerPage: t.pageSize,
                    pageLink: t.onPageChanged,
                    maxDisplayPageCount: "9"
                }
            })], 1) : i("div", {
                staticClass: "no-content"
            }, [i("div", {
                staticClass: "image"
            }), t._m(0)])]), i("plugin-popup")], 1)
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: [function() {
                var t = this.$createElement,
					e = this._self._c || t;
                return e("p", [this._v("您还没有收藏构件哦~去"), e("a", {
                    attrs: {
                        href: "/public"
                    }
                }, [this._v("公共构件")]), this._v("看看吧~~")])
            }]
        };
        e.a = r
    },
    shIA: function(t, e, i) {
        "use strict";
        var o = i("kz9K"),
			r = i("q77v"),
			a = !1;
        var n = function(t) {
            a || i("DYIs")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/checkbox.vue", e.a = s.exports
    },
    tCag: function(t, e, i) {
        "use strict";
        var o = i("l2nU"),
			r = i("EieN"),
			a = !1;
        var n = function(t) {
            a || i("A1N+")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/categoryTree.vue", e.a = s.exports
    },
    vAM3: function(t, e) {},
    w7ug: function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("div", {
                staticClass: "corner-checkbox",
                style: {
                    "border-top-color": t.border.top.color,
                    "border-bottom-color": t.border.bottom.color,
                    "border-left-color": t.border.left.color,
                    "border-right-color": t.border.right.color,
                    "border-width": t.size / 2 + "px"
                },
                on: {
                    click: t.onClick
                }
            }, [i("div", {
                staticClass: "check-indicator",
                style: {
                    width: t.indicator.width + "px",
                    height: t.indicator.height + "px",
                    top: t.indicator.top + "px",
                    bottom: t.indicator.bottom + "px",
                    left: t.indicator.left + "px",
                    right: t.indicator.right + "px",
                    "border-right-width": t.indicator.thickness + "px",
                    "border-bottom-width": t.indicator.thickness + "px",
                    "border-color": t.indicator.color
                }
            })])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    "xl+j": function(t, e, i) {
        "use strict";
        var o = function() {
            var t = this,
                e = t.$createElement,
                i = t._self._c || e;
            return i("div", {
                staticClass: "version-filter clearfix"
            }, [i("span", {
                staticClass: "head"
            }, [t._v("适用Revit平台")]), i("ul", {
                staticClass: "clearfix"
            }, [i("li", {
                staticClass: "left"
            }, [i("a", {
                attrs: {
                    href: t.versionLink("")
                }
            }, [i("radiobutton", {
                attrs: {
                    label: t.checkNoneLabel,
                    size: t.checkBoxSize,
                    checked: t.checkNone,
                    update: t.onCheckNone
                }
            })], 1)]), t._l(t.versions, function(e) {
                return i("li", {
                    staticClass: "left"
                }, [i("a", {
                    attrs: {
                        href: t.versionLink(e.version),
                        target: "_self"
                    }
                }, [i("radiobutton", {
                    attrs: {
                        label: e.name,
                        size: t.checkBoxSize,
                        checked: e.checked,
                        target: e,
                        update: t.onVersionChecked
                    }
                })], 1)])
            })], 2)])
        };
        o._withStripped = !0;
        var r = {
            render: o,
            staticRenderFns: []
        };
        e.a = r
    },
    xpUh: function(t, e, i) {
        "use strict";
        var o = i("RQzD"),
			r = i("URex"),
			a = !1;
        var n = function(t) {
            a || i("LuOB")
        },
			s = i("VU/8")(o.a, r.a, !1, n, null, null);
        s.options.__file = "components/dropDownList.vue", e.a = s.exports
    },
    zEOY: function(t, e) {}
});