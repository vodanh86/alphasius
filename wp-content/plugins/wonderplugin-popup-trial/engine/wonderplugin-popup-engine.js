/** Wonderplugin Popup Plugin Trial Version
 * Copyright 2019 Magic Hills Pty Ltd All Rights Reserved
 * Website: https://www.wonderplugin.com
 * Version 6.9 
 */
(function ($) {
    $.fn.wonderpluginpopup = function (options) {
        options = options || {}; var default_options = { triggerresizeonshow: 1, hidebarstyle: "donotshow", hidebartitle: "", hidebarbgcolor: "#000", hidebarcolor: "#fff", hidebarwidth: "auto", hidebarpos: "bottom-right", hidebarnotshowafteraction: 1, savetolocal: 0, emailnotify: 0, enableretarget: 0, markallrequired: 1, uniquevideoiframeid: 0, removeinlinecss: 1, alreadysubscribedandupdatedmessage: "The subscription has been updated.", autoclose: 0, autoclosedelay: 60, emailautoresponder: 0 };
        options = $.extend({}, default_options, options); for (var key in options) if (key.toLowerCase() !== key) { options[key.toLowerCase()] = options[key]; delete options[key] } this.each(function () { this.options = $.extend({}, options); var instance = this; $.each($(this).data(), function (key, value) { instance.options[key.toLowerCase()] = value }); var object = new WonderPluginPopup($(this), this.options); $(this).data("object", object) })
    }; $(document).ready(function () { jQuery(".wonderplugin-popup-engine").hide(); if (jQuery.fn.wonderpluginpopup) jQuery(".wonderplugin-box").wonderpluginpopup() });
    var WonderPluginPopup = function (container, options) {
        this.container = container; this.options = options; this.id = this.options["popupid"]; this.showed = false; this.options.mark = this.bts("87,111,114,100,80,114,101,115,115,32,80,111,112,117,112,32,84,114,105,97,108,32,86,101,114,115,105,111,110"); this.options.marklink = this.bts("104,116,116,112,115,58,47,47,119,119,119,46,119,111,110,100,101,114,112,108,117,103,105,110,46,99,111,109,47,119,111,114,100,112,114,101,115,115,45,112,111,112,117,112,47"); this.options.isIPhone =
            navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null; this.options.isTouch = "ontouchstart" in window; this.options.isIE = navigator.userAgent.match(/MSIE/i) != null; var params = this.getParams(); this.options.isPreview = "page" in params && params["page"] == "wonderplugin_popup_show_item"; this.options.stamp = "WPFE"; this.youtubePlayer = null; this.vimeoPlayer = null; this.youtubePlayOnLoad = false; this.vimeoPlayOnLoad = false; this.savedIframeSrc = null; this.barspace = null; this.init()
    }; WonderPluginPopup.prototype =
    {
        getParams: function () { var result = {}; var params = window.location.search.substring(1).split("&"); for (var i = 0; i < params.length; i++) { var value = params[i].split("="); if (value && value.length == 2) result[value[0].toLowerCase()] = unescape(value[1]) } return result }, init: function () { this.initGA(); this.initFirstCookie(); this.resetDisplay(); if (this.checkDisplayRules()) { this.initHideBar(); this.initDisplay() } this.initAction(); this.initManualAction(); this.initVersion(); this.initIframeVideo() }, initIframeVideo: function () {
            var instance =
                this; var videoiframeid = instance.options.uniquevideoiframeid ? "wonderplugin-box-videoiframe-" + instance.id : "wonderplugin-box-videoiframe"; if ($("#" + videoiframeid, this.container).length > 0) {
                    var src = $("#" + videoiframeid, this.container).attr("src"); if (src.indexOf("youtube.com") >= 0) {
                        window.onYouTubeIframeAPIReady = function () {
                            instance.youtubePlayer = new YT.Player(videoiframeid, {
                                events: {
                                    "onReady": function (event) { if (instance.options.videoautoplay && instance.youtubePlayOnLoad) event.target.playVideo() }, "onStateChange": function (event) {
                                        if (event.data ==
                                            0 && instance.options.videoautoclose) instance.hidePopup()
                                    }
                                }
                            })
                        }; var tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe_api"; var firstScriptTag = document.getElementsByTagName("script")[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                    } else if (src.indexOf("vimeo.com") >= 0) {
                        var tag = document.createElement("script"); tag.src = instance.options.pluginfolder + "engine/froogaloop2.min.js"; var firstScriptTag = document.getElementsByTagName("script")[0]; firstScriptTag.parentNode.insertBefore(tag,
                            firstScriptTag); instance.vimeoTimeout = 0; instance.playVimeo()
                    }
                } if (this.options.videoautoclose && $("video", this.container).length > 0) $("video", this.container).on("ended", function () { instance.hidePopup() }); if (this.options["showgrecaptcha"]) { var tag = document.createElement("script"); tag.src = "https://www.google.com/recaptcha/api.js"; var firstScriptTag = document.getElementsByTagName("script")[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag) }
        }, playVimeo: function () {
            var instance = this; instance.vimeoTimeout +=
                100; if (typeof window["$f"] !== "function") { if (instance.vimeoTimeout < 3E3) setTimeout(function () { instance.playVimeo() }, 100); return } var videoiframeid = instance.options.uniquevideoiframeid ? "wonderplugin-box-videoiframe-" + instance.id : "wonderplugin-box-videoiframe"; var iframe = $("#" + videoiframeid, instance.container)[0]; instance.vimeoPlayer = $f(iframe); instance.vimeoPlayer.addEvent("ready", function () {
                    if (instance.options.videoautoplay && instance.vimeoPlayOnLoad) instance.vimeoPlayer.api("play"); if (instance.options.videoautoclose) instance.vimeoPlayer.addEvent("finish",
                        function () { instance.hidePopup() })
                })
        }, initVersion: function () {
            if (this.options.stamp != "AM" + "Com" && this.options.stamp != "AM" + "Lite") {
                var style = ""; switch (this.options["type"]) { case "slidein": case "bar": style = "display:block;position:absolute;bottom:4px;right:4px;"; break; default: style = "display:none;position:relative;width:100%;top:100%;text-align:right;"; break }$(".wonderplugin-box-dialog", this.container).append('<div style="' + style + '"><a href="' + this.options.marklink + '" target="_blank"><div style="display:inline-block!important;visibility:visible!important;z-index:999999;padding:2px 4px;color:#fff;font-size:10px;font-family:Lucida Sans Unicode,Lucida Grande,Arial,sans-serif;cursor:pointer;background-color:#666;border-radius:2px;margin-top:4px;">' +
                    this.options.mark + "</div></a></div>")
            }
        }, checkMK: function () {
            if (this.options.stamp != "AM" + "Com" && this.options.stamp != "AM" + "Lite") {
                var item = $(".wonderplugin-box-dialog", this.container); var mklink = $('a[href="' + this.options.marklink + '"]', item); if (item.text().indexOf(this.options.mark) < 0 || mklink.length < 0) item.append('<a href="' + this.options.marklink + '" target="_blank"><div style="display:block!important;position:absolute!important;bottom:4px!important;right:4px!important;color:#fff!important;font-size:10px!important;background-color:#666!important;">WordPress Popup Free Version</div></a>');
                else {
                    var mkdiv = mklink.parent(); var mkinsidediv = $("div", mklink); if (mklink.css("display") == "none" || mklink.css("visibility") == "hidden" || parseInt(mklink.css("font-size")) < 8 || mkdiv.css("display") == "none" || mkdiv.css("visibility") == "hidden" || parseInt(mkdiv.css("font-size")) < 8 || mkinsidediv.css("display") == "none" || mkinsidediv.css("visibility") == "hidden" || parseInt(mkinsidediv.css("font-size")) < 8) {
                        mklink.attr({ style: (mklink.attr("style") || "") + "display:block!important;visibility:visible!important;font-size:12px!important;" });
                        mkdiv.attr({ style: mkdiv.attr("style") + "display:none!important;visibility:visible!important;font-size:12px!important;" }); mkinsidediv.attr({ style: mkinsidediv.attr("style") + "display:none!important;visibility:visible!important;font-size:12px!important;" })
                    }
                }
            }
        }, initGA: function () {
            if (this.options["gaid"]) if (typeof ga !== "function") {
                (function (i, s, o, g, r, a, m) {
                    i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date; a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                    a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"); ga("create", this.options["gaid"], "auto", { "name": "wpp_ga_" + this.id })
            }
        }, logAnalytics: function (logevent) { if (!this.options["enablelocalanalytics"]) return; var instance = this; jQuery.ajax({ url: wonderpluginpopup_ajaxobject.ajaxurl, type: "POST", data: { action: "wonderplugin_popup_log_analytics", nonce: wonderpluginpopup_ajaxobject.nonce, id: instance.id, event: logevent } }) }, initFirstCookie: function () {
            if (this.options.isPreview ||
                !this.options.enableretarget) return; if (!$.wppCookie("wpp_fs_" + this.id)) { var t = new Date; $.wppCookie("wpp_fs_" + this.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 }) }
        }, checkDisplayRules: function () {
            if (this.options["type"] == "embed" || this.options.isPreview) return true; var result = false; if (this.options["devicerules"]) {
                var screen_width = $(window).width(); var rules = this.options["devicerules"]; for (var i in rules) {
                    var match = false; switch (rules[i].rule) {
                        case "alldevices": match = true; break; case "iphone": match = navigator.userAgent.match(/iPod/i) !=
                            null || navigator.userAgent.match(/iPhone/i) != null; break; case "ipad": match = navigator.userAgent.match(/iPad/i) != null; break; case "android": match = navigator.userAgent.match(/Android/i) != null; break; case "screensize": match = rules[i]["param0"] == 0 && screen_width < parseInt(rules[i]["param1"]) || rules[i]["param0"] == 1 && screen_width > parseInt(rules[i]["param1"]); break
                    }if (match) { result = rules[i].action == 1; if (rules[i].action != 1) break }
                }
            } return result
        }, hidePopup: function () {
            var videoiframeid = this.options.uniquevideoiframeid ?
                "wonderplugin-box-videoiframe-" + this.id : "wonderplugin-box-videoiframe"; if ($("#" + videoiframeid, this.container).length > 0) if (this.youtubePlayer) this.youtubePlayer.pauseVideo(); else if (this.vimeoPlayer) this.vimeoPlayer.api("pause"); else { this.savedIframeSrc = $("#" + videoiframeid, this.container).attr("src"); $("#" + videoiframeid, this.container).attr("src", "") } if ($("video", this.container).length > 0) $("video", this.container).get(0).pause(); var instance = this; if (instance.options["type"] == "embed" || instance.options["outanimation"] ==
                    "noAnimation" || instance.options.isIE) { instance.container.hide(); if (instance.hidebar) instance.hidebar.show() } else {
                        $(".wonderplugin-box-dialog", instance.container).addClass("animated " + instance.options["outanimation"]); $(".wonderplugin-box-dialog", instance.container).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(this).removeClass("animated " + instance.options["outanimation"]); instance.container.hide(); if (instance.hidebar) {
                                instance.hidebar.show(); instance.hidebar.css({ "animation-duration": "0.5s" });
                                instance.hidebar.addClass("animated slideInUp"); instance.hidebar.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { instance.hidebar.removeClass("animated slideInUp") })
                            }
                        })
            } if (instance.barspace) { instance.barspace.remove(); instance.barspace = null }
        }, resetDisplay: function () {
            $(".wonderplugin-box-formloading", this.container).hide(); $(".wonderplugin-box-formmessage", this.container).html("").hide(); $(".wonderplugin-box-formbefore", this.container).show(); $(".wonderplugin-box-formafter",
                this.container).hide()
        }, actionHandler: function () {
            var instance = this; $(".wonderplugin-box-formloading", this.container).hide(); $(".wonderplugin-box-formmessage", this.container).empty().hide(); var requiredError = false; var formmessage = ""; $(".wonderplugin-box-formrequired", instance.container).each(function () {
                if ($(this).is(":checkbox")) if (!$(this).is(":checked")) {
                    $(this).parent().addClass("wonderplugin-box-form-highlight"); if ($(this).hasClass("wonderplugin-box-terms")) { if (!formmessage) formmessage = instance.options["termsnotcheckedmessage"] } else if ($(this).hasClass("wonderplugin-box-privacyconsent")) {
                        if (!formmessage) formmessage =
                            instance.options["privacyconsentnotcheckedmessage"]
                    } else if (!formmessage) formmessage = instance.options["fieldmissingmessage"]; requiredError = true; if (!instance.options.markallrequired) return false
                } else $(this).parent().removeClass("wonderplugin-box-form-highlight"); else if (!$.trim($(this).val())) { $(this).addClass("wonderplugin-box-form-highlight"); if (!formmessage) formmessage = instance.options["fieldmissingmessage"]; requiredError = true; if (!instance.options.markallrequired) return false } else $(this).removeClass("wonderplugin-box-form-highlight")
            });
            if (requiredError) { $(".wonderplugin-box-formmessage", instance.container).html(formmessage).show(); return false } if ($(".wonderplugin-box-email", instance.container).length) { var email = $.trim($(".wonderplugin-box-email", instance.container).val()); var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; if (!regex.test(email)) { $(".wonderplugin-box-formmessage", instance.container).html(instance.options["invalidemailmessage"]).show(); return false } } if (!this.options.isPreview && this.options.enableretarget) {
                var t =
                    new Date; $.wppCookie("wpp_a_" + this.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 })
            } if (this.hidebar) { this.hidebar.remove(); this.hidebar = null } if (instance.options["subscription"] != "noservice" || instance.options["savetolocal"] || instance.options["emailnotify"] || instance.options["emailautoresponder"] || instance.options["showgrecaptcha"]) {
                $(".wonderplugin-box-formloading", this.container).show(); var formdata = {}; $(".wonderplugin-box-formdata", instance.container).each(function () {
                    if ($(this).is(":checkbox")) formdata[$(this).attr("name")] =
                        $(this).is(":checked") ? "on" : "off"; else formdata[$(this).attr("name")] = $.trim($(this).val())
                }); if (instance.options["showgrecaptcha"] && $(".g-recaptcha-response", instance.container).length > 0) formdata["g-recaptcha-response"] = $(".g-recaptcha-response", instance.container).val(); jQuery.ajax({
                    url: wonderpluginpopup_ajaxobject.ajaxurl, type: "POST", data: { action: "wonderplugin_popup_subscribe", nonce: wonderpluginpopup_ajaxobject.nonce, id: instance.id, service: instance.options["subscription"], data: formdata }, success: function (data) {
                        if (data) if (data.success) {
                            if (data.updated) $(".wonderplugin-box-afteractionmessage",
                                instance.container).html(instance.options["alreadysubscribedandupdatedmessage"]); instance.actionAfterPost(); if (instance.options["afteraction"] == "redirect") $(".wonderplugin-box-form", instance.container).submit()
                        } else if (data.errorcode == -1 || data.errorcode == -2) $(".wonderplugin-box-formmessage", instance.container).html(instance.options["alreadysubscribedmessage"]).show(); else if (data.errorcode == -3) {
                            var message = data.message ? data.message : instance.options["generalerrormessage"]; $(".wonderplugin-box-formmessage",
                                instance.container).html(message).show()
                        } else { var message = instance.options["displaydetailedmessage"] && data.message ? data.message : instance.options["generalerrormessage"]; $(".wonderplugin-box-formmessage", instance.container).html(message).show() } else { var message = instance.options["displaydetailedmessage"] && data.message ? data.message : instance.options["generalerrormessage"]; $(".wonderplugin-box-formmessage", instance.container).html(message).show() }
                    }, error: function () {
                        var message = instance.options["displaydetailedmessage"] &&
                            data.message ? data.message : instance.options["generalerrormessage"]; $(".wonderplugin-box-formmessage", instance.container).html(message).show()
                    }, complete: function () { $(".wonderplugin-box-formloading", instance.container).hide() }
                }); return false
            } else return instance.actionAfterPost()
        }, actionAfterPost: function () {
            var instance = this; if (instance.options["gaid"] && typeof ga === "function") ga("wpp_ga_" + instance.id + ".send", "event", instance.options["gaeventcategory"], "action", instance.options["gaeventlabel"]); $(window).trigger("action.wonderpluginpopup",
                [instance.id]); instance.logAnalytics("action"); if (instance.options["afteraction"] == "close") { instance.hidePopup(); return false } else if (instance.options["afteraction"] == "display") { $(".wonderplugin-box-formbefore", instance.container).hide(); $(".wonderplugin-box-formafter", instance.container).show(); return false } else if (instance.options["afteraction"] == "redirect") return true
        }, initAction: function () {
            var instance = this; $("input,select", instance.container).keypress(function (event) {
                if (event.keyCode != 13) return true;
                return instance.actionHandler()
            }); if (instance.options["overlayclose"]) $(".wonderplugin-box-bg", instance.container).click(function () { $(window).trigger("close.wonderpluginpopup", [instance.id]); if (!instance.options.isPreview && instance.options.enableretarget) { var t = new Date; $.wppCookie("wpp_cl_" + instance.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 }) } instance.hidePopup() }); $(".wonderplugin-box-closebutton, .wonderplugin-box-fullscreenclosebutton", instance.container).click(function () {
                $(window).trigger("close.wonderpluginpopup",
                    [instance.id]); if (!instance.options.isPreview && instance.options.enableretarget) { var t = new Date; $.wppCookie("wpp_cl_" + instance.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 }) } instance.hidePopup()
            }); $(".wonderplugin-box-cancel", instance.container).click(function () { $(window).trigger("cancel.wonderpluginpopup", [instance.id]); if (!instance.options.isPreview && instance.options.enableretarget) { var t = new Date; $.wppCookie("wpp_ca_" + instance.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 }) } instance.hidePopup() });
            $(".wonderplugin-box-action", instance.container).click(function () { $(window).trigger("actionbutton.wonderpluginpopup", [instance.id]); return instance.actionHandler() }); if (instance.options["closeafterbutton"]) $(".wonderplugin-box-afteractionbutton", instance.container).click(function () { instance.hidePopup() }); if (instance.options["showclosetip"]) $(".wonderplugin-box-closebutton", instance.container).hover(function () { $(".wonderplugin-box-closetip", instance.container).fadeIn("fast") }, function () {
                $(".wonderplugin-box-closetip",
                    instance.container).fadeOut("fast")
            })
        }, initManualAction: function () {
            $(".wppopup").each(function () {
                var popupid = $(this).data("popupid"); if (!popupid) if ($(this).attr("class")) { var classList = $(this).attr("class").split(/\s+/); $.each(classList, function (index, className) { if (className && className.toLowerCase().indexOf("wppopup-id-") == 0) { var names = className.split("-"); if (names.length == 3) popupid = parseInt(names[2]) } }) } if (!popupid) return; if ($("#wonderplugin-box-" + popupid).length) {
                    var self = this.nodeName.toLowerCase() ==
                        "a" || this.nodeName.toLowerCase() == "area" ? $(this) : $(this).find("a,area"); if (self && self.length > 0) self.click(function (event) { if ($("#wonderplugin-box-" + popupid).data("object")) $("#wonderplugin-box-" + popupid).data("object").showPopup(true); return false })
                }
            })
        }, isElementInViewport: function (el) { var rect = el[0].getBoundingClientRect(); return rect.bottom > 0 && rect.right > 0 && rect.left < $(window).width() && rect.top < $(window).height() }, checkRetargetingRules: function () {
            if (this.options.isPreview || !this.options.enableretarget) return true;
            if ($.wppCookie("wpp_a_" + this.id)) { var t0 = (new Date).getTime(); var t1 = Date.parse($.wppCookie("wpp_a_" + this.id)); var diff = this.options["retargetnoshowaction"]; switch (this.options["retargetnoshowactionunit"]) { case "years": diff *= 365 * 24 * 60 * 60 * 1E3; break; case "days": diff *= 24 * 60 * 60 * 1E3; break; case "hours": diff *= 60 * 60 * 1E3; break; case "minutes": diff *= 60 * 1E3; break }if (t0 - t1 < diff) return false } if ($.wppCookie("wpp_cl_" + this.id)) {
                var t0 = (new Date).getTime(); var t1 = Date.parse($.wppCookie("wpp_cl_" + this.id)); var diff =
                    this.options["retargetnoshowclose"]; switch (this.options["retargetnoshowcloseunit"]) { case "years": diff *= 365 * 24 * 60 * 60 * 1E3; break; case "days": diff *= 24 * 60 * 60 * 1E3; break; case "hours": diff *= 60 * 60 * 1E3; break; case "minutes": diff *= 60 * 1E3; break }if (t0 - t1 < diff) return false
            } if ($.wppCookie("wpp_ca_" + this.id)) {
                var t0 = (new Date).getTime(); var t1 = Date.parse($.wppCookie("wpp_ca_" + this.id)); var diff = this.options["retargetnoshowcancel"]; switch (this.options["retargetnoshowcancelunit"]) {
                    case "years": diff *= 365 * 24 * 60 * 60 * 1E3;
                        break; case "days": diff *= 24 * 60 * 60 * 1E3; break; case "hours": diff *= 60 * 60 * 1E3; break; case "minutes": diff *= 60 * 1E3; break
                }if (t0 - t1 < diff) return false
            } return true
        }, checkHideBarRetarget: function () {
            if (this.options.isPreview || !this.options.enableretarget) return true; if (this.options["hidebarnotshowafteraction"]) if ($.wppCookie("wpp_a_" + this.id)) {
                var t0 = (new Date).getTime(); var t1 = Date.parse($.wppCookie("wpp_a_" + this.id)); var diff = this.options["retargetnoshowaction"]; switch (this.options["retargetnoshowactionunit"]) {
                    case "years": diff *=
                        365 * 24 * 60 * 60 * 1E3; break; case "days": diff *= 24 * 60 * 60 * 1E3; break; case "hours": diff *= 60 * 60 * 1E3; break; case "minutes": diff *= 60 * 1E3; break
                }if (t0 - t1 < diff) return false
            } return true
        }, initHideBar: function () {
            if (!this.checkHideBarRetarget() || this.options["hidebarstyle"] != "textbar") return; var barcss = "display:block;position:fixed;max-width:100%;z-index:9999998;cursor:pointer;margin:0 auto;"; var barpos = this.options["hidebarpos"] == "same" ? this.options["slideinposition"] : this.options["hidebarpos"]; switch (barpos) {
                case "bottom-left": barcss +=
                    "left:0;bottom:0;"; break; case "bottom": barcss += "left:0;right:0;bottom:0;"; break; case "bottom-right": default: barcss += "right:0;bottom:0;"; break
            }var barwidth = this.options["hidebarwidth"] == "same" ? this.options["width"] + "px" : "auto"; barcss += "width:" + barwidth + ";max-width:" + this.options["maxwidth"] + "%;background-color:" + this.options["hidebarbgcolor"] + ";color:" + this.options["hidebarcolor"] + ";"; this.hidebar = $('<div class="wonderplugin-box-hidebar" id="wonderplugin-box-hidebar-' + this.id + '" popupid="' + this.id +
                '" style="' + barcss + '">' + '<div class="wonderplugin-box-hidebar-title">' + this.options["hidebartitle"] + "</div>" + "</div>"); this.container.before(this.hidebar); var instance = this; this.hidebar.click(function () {
                    if (instance.options.isIE) { $(this).hide(); instance.showPopup(true) } else {
                        $(this).css({ "animation-duration": "0.5s" }); $(this).addClass("animated slideOutDown"); $(this).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(this).removeClass("animated slideOutDown");
                            $(this).css({ "animation-duration": 0 }); $(this).hide(); instance.showPopup(true)
                        })
                    }
                })
        }, initDisplay: function () {
            var instance = this; if (!this.checkRetargetingRules()) return; if (this.options["type"] == "embed") { instance.showPopup(false); return } if (this.options["displayonpageload"]) setTimeout(function () { instance.showPopup(false) }, this.options["displaydelay"] * 1E3); if (this.options["displayonpagescrollpercent"]) {
                if (($(document).height() - $(window).scrollTop()) * this.options["displaypercent"] / 100 <= $(window).height()) this.showPopup(false);
                $(window).on("scroll.wonderpluginpopup.percent", function () { if (($(document).height() - $(window).scrollTop()) * instance.options["displaypercent"] / 100 <= $(window).height()) { $(window).off("scroll.wonderpluginpopup.percent"); instance.showPopup(false) } })
            } if (this.options["displayonpagescrollpixels"]) {
                if ($(window).scrollTop() + $(window).height() > this.options["displaypixels"]) this.showPopup(false); $(window).on("scroll.wonderpluginpopup.pixels", function () {
                    if ($(window).scrollTop() + $(window).height() > instance.options["displaypixels"]) {
                        $(window).off("scroll.wonderpluginpopup.pixels");
                        instance.showPopup(false)
                    }
                })
            } if (this.options["displayonpagescrollcssselector"]) {
                if ($(this.options["displaycssselector"]).length > 0 && $(this.options["displaycssselector"]).is(":visible") && this.isElementInViewport($(this.options["displaycssselector"]))) this.showPopup(false); $(window).on("scroll.wonderpluginpopup.selector", function () {
                    if ($(instance.options["displaycssselector"]).length > 0 && $(instance.options["displaycssselector"]).is(":visible") && instance.isElementInViewport($(instance.options["displaycssselector"]))) {
                        $(window).off("scroll.wonderpluginpopup.selector");
                        instance.showPopup(false)
                    }
                })
            } if (this.options["displayonuserinactivity"]) { var idleTimer = setTimeout(function () { instance.showPopup(false) }, this.options["displayinactivity"] * 1E3); $(document).on("mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick", function () { clearTimeout(idleTimer); idleTimer = setTimeout(function () { instance.showPopup(false) }, instance.options["displayinactivity"] * 1E3) }) } if (this.options["displayonclosepage"]) $(window).on("mouseleave", function (e) {
                if (e.clientY <
                    instance.options["displaysensitivity"]) instance.showPopup(false)
            })
        }, reinitIframeSrc: function () { var videoiframeid = this.options.uniquevideoiframeid ? "wonderplugin-box-videoiframe-" + this.id : "wonderplugin-box-videoiframe"; if ($("#" + videoiframeid, this.container).length > 0) { var src = $("#" + videoiframeid, this.container).attr("src"); if (!src && this.savedIframeSrc) $("#" + videoiframeid, this.container).attr("src", this.savedIframeSrc) } }, showPopup: function (forceshow) {
            if (this.showed && !forceshow) return; this.reinitIframeSrc();
            if (this.options.videoautoplay) { if (this.youtubePlayer) this.youtubePlayer.playVideo(); else this.youtubePlayOnLoad = true; if (this.vimeoPlayer) this.vimeoPlayer.api("play"); else this.vimeoPlayOnLoad = true } if (this.options.videoautoplay && $("video", this.container).length > 0) $("video", this.container).get(0).play(); if (this.options["gaid"] && typeof ga === "function") ga("wpp_ga_" + this.id + ".send", "event", this.options["gaeventcategory"], "show", this.options["gaeventlabel"]); this.logAnalytics("show"); $(window).trigger("show.wonderpluginpopup",
                [this.id]); if (!this.options.isPreview && this.options.enableretarget) { var t = new Date; $.wppCookie("wpp_s_" + this.id, t.toUTCString(), { expires: 10 * 365 * 24 * 60 * 60 }) } this.showed = true; this.container.show(); var instance = this; instance.initBarSpace(); if (this.options["type"] != "embed" && this.options["inanimation"] != "noAnimation") {
                    $(".wonderplugin-box-dialog", this.container).addClass("animated " + this.options["inanimation"]); $(".wonderplugin-box-dialog", this.container).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                        function () { $(this).removeClass("animated " + instance.options["inanimation"]) })
                } this.resizePopup(); $(window).resize(function () { instance.resizePopup() }); this.checkMK(); if (this.options.triggerresizeonshow) $(window).trigger("resize"); if (this.options.autoclose) setTimeout(function () { instance.hidePopup() }, this.options.autoclosedelay * 1E3)
        }, initBarSpace: function () {
            if (this.options["type"] != "bar" || this.options["barfloat"] || this.barspace) return; this.barspace = $('<div id="wonderplugin-box-barspace-' + this.id + '" class="wonderplugin-box-barspace" style="display:block;position:relative;width:100%;height:' +
                this.container.height() + 'px;"></div>'); if (this.options["barposition"] == "top") $("body").prepend(this.barspace); else $("body").append(this.barspace)
        }, resizePopup: function () {
            if ($(".wonderplugin-box-container", this.container).length && $(".wonderplugin-box-content", this.container).length) {
                var h0 = $(".wonderplugin-box-container", this.container).height(); var h1 = $(".wonderplugin-box-content", this.container)[0].scrollHeight; if (h0 <= h1) $(".wonderplugin-box-dialog", this.container).css({ height: "100%", top: 0 }); else $(".wonderplugin-box-dialog",
                    this.container).css({ height: "auto", top: (h0 - h1) / 2 + "px" })
            } if (this.barspace) this.barspace.css({ height: this.container.height() + "px" })
        }, bts: function (string) { var ret = ""; var bytes = string.split(","); for (var i = 0; i < bytes.length; i++)ret += String.fromCharCode(bytes[i]); return ret }
    }; $.wppCookie = function (key, value, options) {
        if (typeof value !== "undefined") {
            options = $.extend({}, { path: "/" }, options); if (options.expires) {
                var seconds = options.expires; options.expires = new Date; options.expires.setTime(options.expires.getTime() +
                    seconds * 1E3)
            } return document.cookie = key + "=" + encodeURIComponent(value) + (options.expires ? ";expires=" + options.expires.toUTCString() : "") + (options.path ? ";path=" + options.path : "")
        } var result = null; var cookies = document.cookie ? document.cookie.split(";") : []; for (var i in cookies) { var parts = $.trim(cookies[i]).split("="); if (parts.length && parts[0] == key) { result = decodeURIComponent(parts[1]); break } } return result
    }; $.wppRemoveCookie = function (key) { return $.wppCookie(key, "", $.extend({}, { expires: -1 })) }
})(jQuery);
