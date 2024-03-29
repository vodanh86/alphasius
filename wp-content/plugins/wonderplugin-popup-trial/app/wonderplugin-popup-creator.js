/** Wonderplugin Popup Plugin Trial Version
 * Copyright 2019 Magic Hills Pty Ltd All Rights Reserved
 * Website: https://www.wonderplugin.com
 * Version 6.9 
 */
(function ($) {
    $(document).ready(function () { init() }); var wonderplugin_popup_options = new Array; var wonderplugin_langlist = null; function init() {
        if ($("#wonderplugin_popup_form").length <= 0) return; initLangs(); updateURLParam(); initOptions(); initExternalScripts(); initTabs(); initSelectImage(); initSelectButton(); initSelectTemplate(); initAutoUpdate(); initResize(); initAnimationPreview(); updateAllOptions(); updatePreview(); initInterface(); displayAllRules(); initDisplayRule(); initServiceDisplay(); initCollapsePreview();
        initFormSort(); initCheck(); initSaveCheck()
    } function initCheck() { var days = checkDays(); if (days < 15) return; displayCheck(days) } function displayCheck(days) {
        var code = days < 3000 ? "<p>The trial version will expire in " + String(30 - days) + ' days. To continue using the plugin after expiration, please <a href="https://www.wonderplugin.com/wordpress-popup/order/" target="_blank">Upgrade to the Pro Version</a>.</p>' : '<p>The 30-day trial period has expired. To continue using the plugin, please <a href="https://www.wonderplugin.com/wordpress-popup/order/" target="_blank">Upgrade to the Pro Version</a>.</p>';
        $("<div></div>").html(code).dialog({ title: "Wonder Popup Trial Version", resizable: false, modal: true, width: 480, open: function () { $(this).siblings(".ui-dialog-buttonpane").find("button:eq(1)").focus() }, buttons: { "Close": function () { $(this).dialog("close") }, "Upgrade to the Pro Version": function () { window.open("https://www.wonderplugin.com/wordpress-popup/order/", "_blank") } } })
    } function checkDays() {
        var checkOptions = { check: 1 }; if (!checkOptions.check || $("#wonder-popup-init").length < 0) return -1; var initTime = parseInt($("#wonder-popup-init").text());
        if (isNaN(initTime) || initTime <= 0) return -1; return Math.floor((Math.floor((new Date).getTime() / 1E3) - initTime) / 86400)
    } function initSaveCheck() { $("#wonderplugin-popup-save").click(function () { var days = checkDays(); if (days < 30) return true; displayCheck(days); return false }) } function initLangs() {
        wonderplugin_langlist = {}; try { wonderplugin_langlist = JSON.parse($("#wonderplugin-popup-langlist").text()) } catch (err) { } for (var i = 0; i < wonderplugin_langlist.length; i++)WONDERPLUGIN_POPUP_RULES.lang[wonderplugin_langlist[i].code] =
            { rule: "On " + wonderplugin_langlist[i].translated_name }
    } function updateURLParam() { var urlparams = {}; var searcharr = window.location.search.substring(1).split("&"); for (var i = 0; i < searcharr.length; i++) { var value = searcharr[i].split("="); if (value && value.length == 2) urlparams[value[0]] = value[1] } if (urlparams && urlparams.page == "wonderplugin_popup_edit_item" && !urlparams.itemid) { urlparams.itemid = $("#wonderplugin-popup-id").val(); window.history.pushState(null, null, window.location.href.split("?")[0] + "?" + $.param(urlparams)) } }
    function initOptions() { for (var popup_type in WONDERPLUGIN_POPUP_SKINS) for (var skin in WONDERPLUGIN_POPUP_SKINS[popup_type]) WONDERPLUGIN_POPUP_SKINS[popup_type][skin] = $.extend({}, WONDERPLUGIN_POPUP_SKINS_DEFAULT, WONDERPLUGIN_POPUP_SKINS[popup_type][skin]) } function initExternalScripts() { var tag = document.createElement("script"); tag.src = "https://www.google.com/recaptcha/api.js"; var firstScriptTag = document.getElementsByTagName("script")[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag) } function getFieldOrder() {
        var fieldOrder =
            ""; $(".wonderplugin-popup-form-row").each(function (index) { if (index > 0) fieldOrder += ","; fieldOrder += $(this).attr("id").split("-").pop() }); return fieldOrder
    } function updateFieldOrder() { var fieldOrder = getFieldOrder(); $("#wonderplugin-popup-fieldorder").val(fieldOrder); wonderplugin_popup_options["fieldorder"] = fieldOrder; updatePreview() } function showFieldOrder() {
        var fieldOrder = $("#wonderplugin-popup-fieldorder").val(); if (fieldOrder && fieldOrder.length > 0) {
            var fields = fieldOrder.split(","); for (var i = 0; i < fields.length; i++) {
                var rows =
                    $(".wonderplugin-popup-form-row"); var elem = $("#wonderplugin-popup-design-" + fields[i]); if (elem.length > 0) elem.insertBefore(rows.eq(i))
            }
        }
    } function showCustomFields() { var customFields = $("#wonderplugin-popup-customfields").val(); try { customFields = JSON.parse(customFields) } catch (err) { customFields = [] } for (var i = 0; i < customFields.length; i++)if (customFields[i].type == "input") drawCustomInput(customFields[i], i); else if (customFields[i].type == "select") drawCustomSelect(customFields[i], i) } function editSelectItem(itemCaption,
        itemValue, itemId) {
            var dialog = '<div class="field-options-select-additem-dialog">'; dialog += '<p class="select-additem-message"></p>'; dialog += '<label>Option Text</label><input type="text" class="large-text" name="select-additem-caption"></input>'; dialog += '<label>Option Value</label><input type="text" class="large-text" name="select-additem-value"></input>'; dialog += "</div>"; $(dialog).dialog({
                title: (typeof itemId !== "undefined" ? "Edit" : "Add") + " Select Option", resizable: true, modal: true, width: 500, open: function () {
                    if (itemCaption) $("input[name=select-additem-caption]").val(itemCaption);
                    if (itemValue) $("input[name=select-additem-value]").val(itemValue)
                }, buttons: {
                    "Ok": function () {
                        var caption = $("input[name=select-additem-caption]").val(); var value = $("input[name=select-additem-value]").val(); if (!caption) { $(".select-additem-message").text("Please enter text for the option"); return } if (!value) value = caption; value = value.replace(/['"\s]+/g, ""); if (typeof itemId !== "undefined") { var item = $(".field-options-select-list-item").eq(itemId); item.data("value", value); item.find(".field-options-select-list-item-caption").text(caption) } else {
                            var selectionItem =
                                drawSelectionItem(caption, value); $(".field-options-select-list").append(selectionItem)
                        } $(this).dialog("destroy").remove()
                    }, "Cancel": function () { $(this).dialog("destroy").remove() }
                }
            })
    } function initFormSort() {
        showCustomFields(); showFieldOrder(); $(document).on("click", ".wonderplugin-form-sortup", function () {
            var row = $(this).parents("tr"); var rowIndex = row.index(); var rows = $(this).parents("table").find(".wonderplugin-popup-form-row"); if (rowIndex >= 2) row.insertBefore(rows.eq(rowIndex - 2)); else row.insertAfter(rows.last());
            updateFieldOrder()
        }); $(document).on("click", ".wonderplugin-form-sortdown", function () { var row = $(this).parents("tr"); var rowIndex = row.index(); var rows = $(this).parents("table").find(".wonderplugin-popup-form-row"); var rowTotal = rows.length; if (rowIndex < rowTotal) row.insertAfter(rows.eq(rowIndex)); else row.insertBefore(rows.first()); updateFieldOrder() }); $(document).on("change", ".wonderplugin-popup-form-addcustom-dialog .field-type-select", function () {
            var type = $(this).val(); $(".field-options").each(function () {
                $(this).css({
                    display: $(this).hasClass("field-options-" +
                        type) ? "block" : "none"
                })
            })
        }); $(document).on("click", ".field-options-select-list-item-up", function () { var list = $(this).parents(".field-options-select-list"); var items = list.find(".field-options-select-list-item"); var totalItem = items.length; if (totalItem <= 1) return; var item = $(this).parents(".field-options-select-list-item"); var itemId = item.index(); if (itemId > 0) item.insertBefore(items.eq(itemId - 1)); else item.insertAfter(items.last()) }); $(document).on("click", ".field-options-select-list-item-down", function () {
            var list =
                $(this).parents(".field-options-select-list"); var items = list.find(".field-options-select-list-item"); var totalItem = items.length; if (totalItem <= 1) return; var item = $(this).parents(".field-options-select-list-item"); var itemId = item.index(); if (itemId >= totalItem - 1) item.insertBefore(items.first()); else item.insertAfter(items.eq(itemId + 1))
        }); $(document).on("click", ".field-options-select-list-item-delete", function () { var item = $(this).parents(".field-options-select-list-item"); item.remove() }); $(document).on("click",
            ".field-options-select-list-item-edit", function () { var item = $(this).parents(".field-options-select-list-item"); var caption = item.find(".field-options-select-list-item-caption").text(); var value = item.data("value"); var itemId = item.index(); editSelectItem(caption, value, itemId) }); $(document).on("click", ".field-options-select-additem", function () { editSelectItem() }); $("#wonderplugin-popup-form-addcustom").click(function () { editCustomField() }); $(document).on("click", ".wonderplugin-form-custom-edit", function () {
                var row =
                    $(this).parents(".wonderplugin-popup-form-row"); var itemId = row.data("itemid"); editCustomField(itemId)
            }); $(document).on("click", ".wonderplugin-form-custom-delete", function () {
                var row = $(this).parents(".wonderplugin-popup-form-row"); var itemId = row.data("itemid"); row.remove(); var customFields = $("#wonderplugin-popup-customfields").val(); try { customFields = JSON.parse(customFields) } catch (err) { customFields = [] } customFields.splice(itemId, 1); $("#wonderplugin-popup-customfields").val(JSON.stringify(customFields));
                var customrows = $(".wonderplugin-popup-form-row-custom"); customrows.each(function () { var id = $(this).data("itemid"); if (id > itemId) { var newId = id - 1; $(this).data("itemid", newId); $(this).attr("id", "wonderplugin-popup-design-custom" + newId) } }); updateFieldOrder()
            })
    } function drawCustomSelect(item, itemId) {
        var customRows = $(".wonderplugin-popup-form-row-custom"); var isNew = true; customRows.each(function (index) {
            if ($(this).data("itemid") == itemId) {
                $(this).find(".row-custom-caption").text(item.caption); $(this).find(".row-custom-size").text(item.size);
                var selections = ""; for (var i = 0; i < item.selections.length; i++)selections += '<div class="wonderplugin-form-custom-selection" data-value="' + item.selections[i].value + '">' + item.selections[i].caption + "</div>"; $(this).find(".row-custom-selections").html(selections); isNew = false
            }
        }); if (isNew) {
            var row = '<tr data-itemid="' + itemId + '" class="wonderplugin-popup-form-row wonderplugin-popup-form-row-custom" id="wonderplugin-popup-design-custom' + itemId + '">'; row += '<th><span class="wonderplugin-form-sortup dashicons dashicons-arrow-up-alt2"></span><span class="wonderplugin-form-sortdown dashicons dashicons-arrow-down-alt2"></span></th>';
            row += '<td class="row-custom-caption">' + item.caption + "</td>"; row += '<td style="text-align:center;"><span class="wonderplugin-form-custom-edit dashicons dashicons-edit"></span><span class="wonderplugin-form-custom-delete dashicons dashicons-dismiss"></span></td>'; row += "<td></td>"; row += '<td style="padding-left:4px;" class="row-custom-name">' + item.name + "</td>"; row += '<td style="padding-left:4px;" class="row-custom-selections">'; for (var i = 0; i < item.selections.length; i++)row += '<div class="wonderplugin-form-custom-selection" data-value="' +
                item.selections[i].value + '">' + item.selections[i].caption + "</div>"; row += "</td>"; row += "<tr>"; $(".wonderplugin-popup-form-row").last().after(row)
        }
    } function drawCustomInput(item, itemId) {
        var customRows = $(".wonderplugin-popup-form-row-custom"); var isNew = true; customRows.each(function (index) {
            if ($(this).data("itemid") == itemId) {
                $(this).find(".row-custom-caption").text(item.caption); $(this).find(".row-custom-size").text(item.size); $(this).find(".row-custom-name").text(item.name); $(this).find(".row-custom-placeholder").text(item.placeholder);
                isNew = false
            }
        }); if (isNew) {
            var row = '<tr data-itemid="' + itemId + '" class="wonderplugin-popup-form-row wonderplugin-popup-form-row-custom" id="wonderplugin-popup-design-custom' + itemId + '">'; row += '<th><span class="wonderplugin-form-sortup dashicons dashicons-arrow-up-alt2"></span><span class="wonderplugin-form-sortdown dashicons dashicons-arrow-down-alt2"></span></th>'; row += '<td class="row-custom-caption">' + item.caption + "</td>"; row += '<td style="text-align:center;"><span class="wonderplugin-form-custom-edit dashicons dashicons-edit"></span><span class="wonderplugin-form-custom-delete dashicons dashicons-dismiss"></span></td>';
            row += '<td style="padding-left:4px;" class="row-custom-size">' + item.size + "px</td>"; row += '<td style="padding-left:4px;" class="row-custom-name">' + item.name + "</td>"; row += '<td style="padding-left:4px;" class="row-custom-placeholder">' + item.placeholder + "</td>"; row += "<tr>"; $(".wonderplugin-popup-form-row").last().after(row)
        }
    } function drawSelectionItem(caption, value) {
        return '<div class="field-options-select-list-item" data-value="' + value + '">' + '<div class="field-options-select-list-item-caption">' + caption +
            "</div>" + '<div class="field-options-select-list-item-buttons">' + '<div class="field-options-select-list-item-up"><span class="dashicons dashicons-arrow-left-alt"></span></div>' + '<div class="field-options-select-list-item-down"><span class="dashicons dashicons-arrow-right-alt"></span></div>' + '<div class="field-options-select-list-item-edit"><span class="dashicons dashicons-edit"></span></div>' + '<div class="field-options-select-list-item-delete"><span class="dashicons dashicons-dismiss"></span></div>' +
            "</div>" + "</div>"
    } function editCustomField(customId) {
        var customFields = $("#wonderplugin-popup-customfields").val(); try { customFields = JSON.parse(customFields) } catch (err) { customFields = [] } var dialog = '<div class="wonderplugin-popup-form-addcustom-dialog">'; dialog += '<p class="addcustom-dialog-message"></p>'; dialog += '<div class="field-type-select-display">'; dialog += '<label style="margin-right:24px;">Select Field Type</label>'; dialog += '<select class="field-type-select">'; dialog += '<option value="input">Text Input</option>';
        dialog += '<option value="select">Dropdown Select</option>'; dialog += "</select>"; dialog += "</div>"; dialog += '<div class="field-options field-options-input" style="margin-top:24px;display:block;">'; dialog += '<p><label>Field Caption</label><input type="text" class="large-text" name="field-option-input-caption"></input></p>'; dialog += '<p><label>Field Name</label><input type="text" class="large-text"name="field-option-input-name"></input></p>'; dialog += '<p><label>Place Holder</label><input type="text" class="large-text" name="field-option-input-placeholder"></input></p>';
        dialog += '<p><label style="margin-right:24px;">Size (px)</label><input type="number" class="medium-text" name="field-option-input-size" value="180"></input></p>'; dialog += "</div>"; dialog += '<div class="field-options field-options-select" style="margin-top:24px;display:none;">'; dialog += '<p><label>Field Caption</label><input type="text" class="large-text" name="field-option-select-caption"></input></p>'; dialog += '<p><label>Field Name</label><input type="text" class="large-text" name="field-option-select-name"></input></p>';
        dialog += '<div class="field-options-select-list">'; dialog += "</div>"; dialog += '<div class="field-options-select-additem">Add Select Option</div>'; dialog += "</div>"; $(dialog).dialog({
            title: (typeof customId !== "undefined" ? "Edit" : "Add") + " Custom Field", resizable: true, modal: true, width: 800, open: function () {
                if (typeof customId !== "undefined") {
                    $(".field-type-select-display").hide(); $(".field-options").hide(); var item = customFields[customId]; if (item.type == "input") {
                        $(".field-type-select").val("input"); $(".field-options-input").show();
                        $("input[name=field-option-input-caption]").val(item.caption); $("input[name=field-option-input-name]").val(item.name); $("input[name=field-option-input-placeholder]").val(item.placeholder); $("input[name=field-option-input-size]").val(item.size)
                    } else if (item.type == "select") {
                        $(".field-type-select").val("select"); $(".field-options-select").show(); $("input[name=field-option-select-caption]").val(item.caption); $("input[name=field-option-select-name]").val(item.name); var selections = ""; for (var i = 0; i < item.selections.length; i++)selections +=
                            drawSelectionItem(item.selections[i].caption, item.selections[i].value); $(".field-options-select-list").html(selections)
                    }
                }
            }, buttons: {
                "Ok": function () {
                    var type = $(".wonderplugin-popup-form-addcustom-dialog .field-type-select").val(); if (type == "input") {
                        var caption = $("input[name=field-option-input-caption]").val(); if (!caption) { $(".addcustom-dialog-message").text("Please enter field caption"); return } var name = $("input[name=field-option-input-name]").val(); name = name.replace(/['"\s]+/g, ""); if (!name) {
                            $(".addcustom-dialog-message").text("Please enter field name");
                            return
                        } var placeholder = $("input[name=field-option-input-placeholder]").val(); if (!placeholder) { $(".addcustom-dialog-message").text("Please enter field placeholder"); return } var size = $("input[name=field-option-input-size]").val(); if (!size) { $(".addcustom-dialog-message").text("Please enter field size"); return } var customItem = { type: type, caption: caption, name: name, placeholder: placeholder, size: size }; if (typeof customId !== "undefined") { customFields[customId] = customItem; drawCustomInput(customItem, customId) } else {
                            customFields.push(customItem);
                            drawCustomInput(customItem, customFields.length - 1)
                        } $("#wonderplugin-popup-customfields").val(JSON.stringify(customFields))
                    } else if (type == "select") {
                        var caption = $("input[name=field-option-select-caption]").val(); if (!caption) { $(".addcustom-dialog-message").text("Please enter field caption"); return } var name = $("input[name=field-option-select-name]").val(); name = name.replace(/['"\s]+/g, ""); if (!name) { $(".addcustom-dialog-message").text("Please enter field name"); return } var selections = []; $(".field-options-select-list-item").each(function () {
                            selections.push({
                                caption: $(this).find(".field-options-select-list-item-caption").text(),
                                value: $(this).data("value")
                            })
                        }); var customItem = { type: type, caption: caption, name: name, selections: selections }; if (typeof customId !== "undefined") { customFields[customId] = customItem; drawCustomSelect(customItem, customId) } else { customFields.push(customItem); drawCustomSelect(customItem, customFields.length - 1) } $("#wonderplugin-popup-customfields").val(JSON.stringify(customFields))
                    } updateFieldOrder(); $(this).dialog("destroy").remove()
                }, "Cancel": function () { $(this).dialog("destroy").remove() }
            }
        })
    } function initCollapsePreview() {
        $("#wonderplugin-popup-preview-collapse").click(function () {
            if ($(this).data("open") ==
                1) { $(this).data("open", 0); $(this).removeClass("dashicons-arrow-up-alt2"); $(this).addClass("dashicons-arrow-down-alt2"); $(".wonderplugin-popup-preview-wrapper").css({ height: "60px" }) } else { $(this).data("open", 1); $(this).addClass("dashicons-arrow-up-alt2"); $(this).removeClass("dashicons-arrow-down-alt2"); $(".wonderplugin-popup-preview-wrapper").css({ height: "520px" }) }
        })
    } function initServiceDisplay() {
        var service = $("#wonderplugin-popup-subscription").val(); if (service != "noservice") $("#wonderplugin-popup-subscription-" +
            service).show(); $("#wonderplugin-popup-subscription").on("change", function () { $(".wonderplugin-popup-service-msg").remove(); $(".wonderplugin-popup-subscription-options").hide(); var service = $(this).val(); if (service != "noservice") $("#wonderplugin-popup-subscription-" + service).show() })
    } function initAnimationPreview() {
        $("#wonderplugin-popup-inanimationpreview").click(function () {
            if ($("#wonderplugin-popup-inanimation").val() != "noAnimation") {
                $("#wonderplugin-popup-preview .wonderplugin-box-dialog").addClass("animated " +
                    $("#wonderplugin-popup-inanimation").val()); $("#wonderplugin-popup-preview .wonderplugin-box-dialog").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { $(this).removeClass("animated " + $("#wonderplugin-popup-inanimation").val()) })
            }
        }); $("#wonderplugin-popup-outanimationpreview").click(function () {
            if ($("#wonderplugin-popup-outanimation").val() != "noAnimation") {
                $("#wonderplugin-popup-preview .wonderplugin-box-dialog").addClass("animated " + $("#wonderplugin-popup-outanimation").val());
                $("#wonderplugin-popup-preview .wonderplugin-box-dialog").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { setTimeout(function () { $("#wonderplugin-popup-preview .wonderplugin-box-dialog").removeClass("animated " + $("#wonderplugin-popup-outanimation").val()) }, 1E3) })
            }
        })
    } function initTabs() {
        $(".wonderplugin-tab-buttons").each(function () {
            if ($("#wonderplugin-popup-keepstate").length) {
                var index = $.wppCookie($(this).attr("id")); if (index >= 0) {
                    $(this).children("li").removeClass("wonderplugin-tab-button-selected");
                    $(this).children("li").eq(index).addClass("wonderplugin-tab-button-selected"); var panelsID = $(this).data("panelsid"); $("#" + panelsID).children("li").removeClass("wonderplugin-tab-selected"); $("#" + panelsID).children("li").eq(index).addClass("wonderplugin-tab-selected")
                }
            } else $.wppRemoveCookie($(this).attr("id")); $(this).find("li").each(function (index) {
                $(this).click(function () {
                    if ($(this).hasClass("wonderplugin-tab-button-selected")) return; $(this).parent().find("li").removeClass("wonderplugin-tab-button-selected");
                    $(this).addClass("wonderplugin-tab-button-selected"); var panelsID = $(this).parent().data("panelsid"); $("#" + panelsID).children("li").removeClass("wonderplugin-tab-selected"); $("#" + panelsID).children("li").eq(index).addClass("wonderplugin-tab-selected"); $.wppCookie($(this).parent().attr("id"), index)
                })
            })
        })
    } function initSelectImage() {
        $(".wonderplugin-popup-select-image").click(function () {
            var textbox_id = $(this).data("textid"); var media_uploader = wp.media.frames.file_frame = wp.media({
                title: "Select Image",
                button: { text: "Select Image" }, multiple: false
            }); media_uploader.on("select", function (event) { var attachment = media_uploader.state().get("selection").first().toJSON(); if (attachment.type == "image") $("#" + textbox_id).val(attachment.url) }); media_uploader.open()
        }); $(".wonderplugin-popup-clear-image").click(function () { var textbox_id = $(this).data("textid"); $("#" + textbox_id).val("") })
    } function selectDialog(title, description, contentCallback, okCallback) {
        var button_dialog_code = '<div class="wonderplugin-dialog-container">' +
            '<div class="wonderplugin-dialog-bg"></div>' + '<div class="wonderplugin-dialog">' + '<div class="wonderplugin-dialog-title">' + title + "</div>" + '<div class="wonderplugin-dialog-contents"></div>' + description + '<div class="wonderplugin-dialog-buttons">' + '<input type="button" class="button button-primary" id="wonderplugin-dialog-ok" value="OK" />' + '<input type="button" class="button" id="wonderplugin-dialog-cancel" value="Cancel" />' + "</div>" + "</div>" + "</div>"; var $button_dialog = $(button_dialog_code); $("body").append($button_dialog);
        $(".wonderplugin-dialog-contents", $button_dialog).html(contentCallback()); $(".wonderplugin-dialog-item", $button_dialog).click(function () { $(".wonderplugin-dialog-item", $button_dialog).removeClass("wonderplugin-dialog-item-selected"); $(this).addClass("wonderplugin-dialog-item-selected") }); var dialog_pos = $(document).scrollTop(); $(".wonderplugin-dialog", $button_dialog).css({ top: dialog_pos + "px" }); $(window).scroll(function () {
            var t0 = Math.min($(document).scrollTop(), dialog_pos); $(".wonderplugin-dialog", $button_dialog).css({
                top: t0 +
                    "px"
            })
        }); var h0 = Math.max($(document).height(), $(window).height()); $button_dialog.height(h0); $("#wonderplugin-dialog-ok", $button_dialog).click(function () { okCallback(); $button_dialog.remove() }); $("#wonderplugin-dialog-cancel", $button_dialog).click(function () { $button_dialog.remove() }); $("#wonderplugin-dialog-page-prev").click(function () {
            var count = $(".wonderplugin-dialog-page").length; var current = 0; $(".wonderplugin-dialog-page").each(function (index) {
                if ($(this).hasClass("wonderplugin-dialog-page-active")) current =
                    index
            }); $(".wonderplugin-dialog-page").eq(current).removeClass("wonderplugin-dialog-page-active"); var next = current <= 0 ? count - 1 : current - 1; $(".wonderplugin-dialog-page").eq(next).addClass("wonderplugin-dialog-page-active"); var skin_disabled = $(".wonderplugin-dialog-page").eq(next).hasClass("wonderplugin-skin-commercial-only"); $("#wonderplugin-dialog-ok").prop("disabled", skin_disabled)
        }); $("#wonderplugin-dialog-page-next").click(function () {
            var count = $(".wonderplugin-dialog-page").length; var current = 0;
            $(".wonderplugin-dialog-page").each(function (index) { if ($(this).hasClass("wonderplugin-dialog-page-active")) current = index }); $(".wonderplugin-dialog-page").eq(current).removeClass("wonderplugin-dialog-page-active"); var next = current >= count - 1 ? 0 : current + 1; $(".wonderplugin-dialog-page").eq(next).addClass("wonderplugin-dialog-page-active"); var skin_disabled = $(".wonderplugin-dialog-page").eq(next).hasClass("wonderplugin-skin-commercial-only"); $("#wonderplugin-dialog-ok").prop("disabled", skin_disabled)
        })
    }
    function initSelectButton() {
        $(".wonderplugin-popup-select-button").click(function () {
            var textbox_id = $(this).data("textid"); var textbox_value = $("#" + textbox_id).val(); selectDialog("Select A Button Style", "", function () {
                var content = ""; for (var i in WONDERPLUGIN_POPUP_BUTTON_STYLES) content += '<div class="wonderplugin-dialog-item' + (textbox_value == WONDERPLUGIN_POPUP_BUTTON_STYLES[i] ? " wonderplugin-dialog-item-selected" : "") + '"><button class="' + WONDERPLUGIN_POPUP_BUTTON_STYLES[i] + '">Subscribe Now</button></div>';
                return content
            }, function () { var selected_css = $("button", ".wonderplugin-dialog-item-selected").attr("class"); $("#" + textbox_id).val(selected_css).trigger("change") })
        })
    } function initSelectTemplate() {
        $("#wonderplugin-popup-switchskin").click(function () {
            var popup_type = $("#wonderplugin-popup-type").val(); var description = "<p>Select a template will reset all options to its default value.</p>"; selectDialog("Select A Template", description, function () {
                var plugin_folder = $("#wonderplugin-popup-pluginfolder").text();
                var current_skin = $("#wonderplugin-popup-skin").val(); var version_type = $("#wonderplugin-popup-versiontype").text(); var content = ""; for (var skin in WONDERPLUGIN_POPUP_SKINS[popup_type]) {
                    var skin_disabled = version_type == "L" && popup_type == "lightbox" && skin != "simple"; content += '<div data-skin="' + skin + '" class="wonderplugin-dialog-page' + (skin == current_skin ? " wonderplugin-dialog-page-active" : ""); content += (skin_disabled ? " wonderplugin-skin-commercial-only" : "") + '">'; content += '<div class="wonderplugin-dialog-item-skin"><img src="' +
                        plugin_folder + "images/skin-" + skin + ".jpg" + '"></div>'; content += '<div class="wonderplugin-dialog-item-skinname">Template: ' + WONDERPLUGIN_POPUP_SKINS[popup_type][skin]["skinname"] + "</div>"; if (skin_disabled) { content += '<div class="wonderplugin-skin-commercial-lock"></div>'; content += '<div class="wonderplugin-skin-commercial-textblock wonderplugin-skin-commercial-textblock-skin"><div class="wonderplugin-skin-commercial-text"><p>This template is only available in Commercial Version.</p><p><a href="https://www.wonderplugin.com/wordpress-popup/order/?ref=lite" target="_blank">Upgrade to Commercial Version</a></p><p><a href="https://www.wonderplugin.com/wordpress-popup/?ref=lite" target="_blank">View Demos Created with Commercial Version</a></p></div></div>' } content +=
                            "</div>"
                } content += '<div id="wonderplugin-dialog-page-prev"></div>'; content += '<div id="wonderplugin-dialog-page-next"></div>'; return content
            }, function () { var skin = $(".wonderplugin-dialog-page-active").data("skin"); $("#wonderplugin-popup-skin").val(skin); applyTemplate(skin) })
        })
    } function applyTemplate(skin) {
        var plugin_folder = $("#wonderplugin-popup-pluginfolder").text(); var popup_type = $("#wonderplugin-popup-type").val(); var skin_options = WONDERPLUGIN_POPUP_SKINS[popup_type][skin]; for (var key in skin_options) {
            var elem =
                $('[name="wonderplugin-popup-' + key + '"]'); if (elem.length > 0) if (elem.is(":checkbox")) { elem.prop("checked", skin_options[key] == 1); if (elem.parent().hasClass("wonderplugin-switch")) if (skin_options[key]) elem.parent().addClass("wonderplugin-switch-checked"); else elem.parent().removeClass("wonderplugin-switch-checked") } else if (elem.is(":radio")) $('[name="wonderplugin-popup-' + key + '"][value="' + skin_options[key] + '"]').prop("checked", true); else if (elem.attr("type") == "text" || elem.is("textarea")) elem.val(skin_options[key].replace("__WONDERPLUGIN_POPUP_URL__",
                    plugin_folder)); else elem.val(skin_options[key])
        } updateAllOptions(); updatePreview(); initInterface()
    } function initAutoUpdate() {
        $(".wonderplugin-popup-option").change(function () { var name = $(this).attr("name").split("-").slice(-1)[0]; if ($(this).is(":checkbox")) wonderplugin_popup_options[name] = $(this).is(":checked") ? 1 : 0; else if ($(this).attr("type") == "number") wonderplugin_popup_options[name] = Number($.trim($(this).val())); else wonderplugin_popup_options[name] = $.trim($(this).val()); updatePreview() }); $(".wonderplugin-popup-refresh").click(function () {
            updateAllOptions();
            updatePreview(); initInterface()
        })
    } function resizePopup() { if ($(".wonderplugin-box-container").length && $(".wonderplugin-box-content").length) { var h0 = $(".wonderplugin-box-container").height(); var h1 = $(".wonderplugin-box-content")[0].scrollHeight; if (h0 <= h1) $(".wonderplugin-box-dialog").css({ height: "100%", top: 0 }); else $(".wonderplugin-box-dialog").css({ height: "auto", top: (h0 - h1) / 2 + "px" }) } } function initResize() { $(window).resize(function () { resizePopup() }) } function initInterface() {
        var template = $.trim($("#wonderplugin-popup-template").val());
        $("#wonderplugin-popup-design-customcontent").css({ display: template.indexOf("__CUSTOMCONTENT__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-logo").css({ display: template.indexOf("__LOGO__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-heading").css({ display: template.indexOf("__HEADING__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-tagline").css({ display: template.indexOf("__TAGLINE__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-description").css({
            display: template.indexOf("__DESCRIPTION__") >=
                0 ? "table-row" : "none"
        }); $("#wonderplugin-popup-design-bulletedlist").css({ display: template.indexOf("__BULLETEDLIST__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-image").css({ display: template.indexOf("__IMAGE__") >= 0 ? "table-row" : "none" }); $(".wonderplugin-popup-design-video").css({ display: template.indexOf("__VIDEO__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-privacy").css({ display: template.indexOf("__PRIVACY__") >= 0 ? "table-row" : "none" }); $("#wonderplugin-popup-design-leftright").css({
            display: template.indexOf("wonderplugin-box-left") >=
                0 ? "table-row" : "none"
        }); if (template.indexOf("__FORM__") < 0) $("#wonderplugin-tab-button-form, #wonderplugin-tab-form").addClass("wonderplugin-tab-hide"); else $("#wonderplugin-tab-button-form, #wonderplugin-tab-form").removeClass("wonderplugin-tab-hide")
    } function updateAllOptions() {
        wonderplugin_popup_options = new Array; $(".wonderplugin-popup-option").each(function () {
            var name = $(this).attr("name").split("-").slice(-1)[0]; if ($(this).is(":checkbox")) wonderplugin_popup_options[name] = $(this).is(":checked") ?
                1 : 0; else if ($(this).is(":radio")) wonderplugin_popup_options[name] = $(this).filter(":checked").val(); else if ($(this).attr("type") == "number") { if (typeof $(this).val() !== "undefined") wonderplugin_popup_options[name] = Number($.trim($(this).val())) } else if (typeof $(this).val() !== "undefined") wonderplugin_popup_options[name] = $.trim($(this).val())
        })
    } function resetDisplay() { $(".wonderplugin-box-formloading").hide(); $(".wonderplugin-box-formmessage").html("").hide(); $(".wonderplugin-box-formbefore").show(); $(".wonderplugin-box-formafter").hide() }
    function updatePreview() {
        var popup_type = $("#wonderplugin-popup-type").val(); $("head").find("style").each(function () { if ($(this).data("creator") == "wonderplugin-popup-preview") $(this).remove() }); var csscode = ""; csscode += "#wonderplugin-popup-preview .wonderplugin-box-container {" + "position:absolute;top:0;left:0;width:100%;height:100%;" + "padding-top:" + wonderplugin_popup_options["mintopbottommargin"] + "px;" + "padding-bottom:" + wonderplugin_popup_options["mintopbottommargin"] + "px;" + "}"; if (popup_type == "bar") csscode +=
            "#wonderplugin-popup-preview .wonderplugin-box-dialog {width:100%;}"; else csscode += "#wonderplugin-popup-preview .wonderplugin-box-dialog {" + "width:" + wonderplugin_popup_options["width"] + "px;" + "max-width:" + wonderplugin_popup_options["maxwidth"] + "%;" + "}"; if (popup_type == "lightbox") csscode += "#wonderplugin-popup-preview .wonderplugin-box-bg {" + "background-color:" + wonderplugin_popup_options["overlaycolor"] + ";" + "opacity:" + wonderplugin_popup_options["overlayopacity"] + ";" + "}"; else csscode += "#wonderplugin-popup-preview .wonderplugin-box-bg {background-color:#333;opacity:0.8;}";
        csscode += "#wonderplugin-popup-preview .wonderplugin-box-content {" + "border-radius:" + wonderplugin_popup_options["radius"] + "px;" + "box-shadow:" + wonderplugin_popup_options["bordershadow"] + ";" + "background-color:" + wonderplugin_popup_options["backgroundcolor"] + ";" + 'background-image:url("' + wonderplugin_popup_options["backgroundimage"] + '");' + "background-repeat:" + wonderplugin_popup_options["backgroundimagerepeat"] + ";" + "background-position:" + wonderplugin_popup_options["backgroundimageposition"] + ";" + "}"; csscode +=
            "#wonderplugin-popup-preview .wonderplugin-box-top {" + "background-color:" + wonderplugin_popup_options["backgroundtopcolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-bottom {" + "background-color:" + wonderplugin_popup_options["backgroundbottomcolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-left {" + "width:" + wonderplugin_popup_options["leftwidth"] + "%;" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-right {" + "margin:0 0 0 " + wonderplugin_popup_options["leftwidth"] +
                "%;" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-heading {" + "color:" + wonderplugin_popup_options["headingcolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-tagline {" + "color:" + wonderplugin_popup_options["taglinecolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-description {" + "color:" + wonderplugin_popup_options["descriptioncolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-bulletedlist {" + "color:" + wonderplugin_popup_options["bulletedlistcolor"] +
                    ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-privacy {" + "display:" + (wonderplugin_popup_options["showprivacy"] ? "block" : "none") + ";" + "color:" + wonderplugin_popup_options["privacycolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-ribbon {" + "display:" + (wonderplugin_popup_options["showribbon"] ? "block" : "none") + ";" + wonderplugin_popup_options["ribboncss"] + "}"; if (wonderplugin_popup_options["showcancel"] && wonderplugin_popup_options["cancelastext"]) csscode += "#wonderplugin-popup-preview .wonderplugin-box-cancel {" +
                        "color:" + wonderplugin_popup_options["canceltextcolor"] + ";" + "}"; if (wonderplugin_popup_options["showclose"]) {
                            var closebuttoncss = "display:block;"; switch (wonderplugin_popup_options["closeposition"]) {
                                case "top-left-outside": closebuttoncss = "top:-14px;right:auto;bottom:auto;left:-14px;background-color:" + wonderplugin_popup_options["closebackgroundcolor"] + ";"; break; case "top-left-inside": closebuttoncss = "top:0px;right:auto;bottom:auto;left:0px;"; break; case "top-right-outside": closebuttoncss = "top:-14px;right:-14px;bottom:auto;left:auto;background-color:" +
                                    wonderplugin_popup_options["closebackgroundcolor"] + ";"; break; default: closebuttoncss = "top:0px;right:0px;bottom:auto;left:auto;"
                            }if (wonderplugin_popup_options["closeshowshadow"] && (wonderplugin_popup_options["closeposition"] == "top-left-outside" || wonderplugin_popup_options["closeposition"] == "top-right-outside")) closebuttoncss += "box-shadow:" + wonderplugin_popup_options["closeshadow"] + ";"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-closebutton {" + closebuttoncss + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-closebutton {" +
                                "color:" + wonderplugin_popup_options["closecolor"] + ";" + "}"; csscode += "#wonderplugin-popup-preview .wonderplugin-box-closebutton:hover {" + "color:" + wonderplugin_popup_options["closehovercolor"] + ";" + "}"; switch (wonderplugin_popup_options["closeposition"]) {
                                    case "top-left-inside": csscode += "#wonderplugin-popup-preview .wonderplugin-box-closetip {left:0;} #wonderplugin-popup-preview .wonderplugin-box-closetip:after {display:block;left:8px;}"; break; case "top-right-inside": csscode += "#wonderplugin-popup-preview .wonderplugin-box-closetip {right:0;} #wonderplugin-popup-preview .wonderplugin-box-closetip:after {display:block;right:8px;}";
                                        break; case "top-left-outside": csscode += "#wonderplugin-popup-preview .wonderplugin-box-closetip {left:0;} #wonderplugin-popup-preview .wonderplugin-box-closetip:after {display:none;}"; break; case "top-right-outside": csscode += "#wonderplugin-popup-preview .wonderplugin-box-closetip {right:0;} #wonderplugin-popup-preview .wonderplugin-box-closetip:after {display:none;}"; break
                                }
                        } else csscode += "#wonderplugin-popup-preview .wonderplugin-box-closebutton {display:none;}"; if (wonderplugin_popup_options["css"]) csscode +=
                            wonderplugin_popup_options["css"].replace(/#wonderplugin-box-POPUPID/g, "#wonderplugin-popup-preview"); var htmlcode = ""; htmlcode += wonderplugin_popup_options["template"]; htmlcode = htmlcode.replace("__LOGO__", wonderplugin_popup_options["logo"]); htmlcode = htmlcode.replace("__HEADING__", wonderplugin_popup_options["heading"]); htmlcode = htmlcode.replace("__TAGLINE__", wonderplugin_popup_options["tagline"]); htmlcode = htmlcode.replace("__DESCRIPTION__", wonderplugin_popup_options["description"]); htmlcode = htmlcode.replace("__BULLETEDLIST__",
                                wonderplugin_popup_options["bulletedlist"]); htmlcode = htmlcode.replace("__PRIVACY__", wonderplugin_popup_options["privacy"]); htmlcode = htmlcode.replace("__IMAGE__", wonderplugin_popup_options["image"]); htmlcode = htmlcode.replace("__RIBBON__", wonderplugin_popup_options["ribbon"]); htmlcode = htmlcode.replace("__CLOSETIP__", wonderplugin_popup_options["closetip"]); htmlcode = htmlcode.replace("__CUSTOMCONTENT__", wonderplugin_popup_options["customcontent"]); var videocode = ""; if (wonderplugin_popup_options["video"]) videocode =
                                    '<iframe class="wonderplugin-box-videoiframe" id="wonderplugin-box-videoiframe" src="' + wonderplugin_popup_options["video"] + '" frameborder="0" allowfullscreen></iframe>'; else if (wonderplugin_popup_options["videohtml5"]) videocode = '<video src="' + wonderplugin_popup_options["videohtml5"] + '"' + " muted" + (wonderplugin_popup_options["videocontrols"] ? " controls" : "") + (wonderplugin_popup_options["videonodownload"] ? ' controlsList="nodownload"' : "") + ' style="width:100%;height:100%;" />'; htmlcode = htmlcode.replace("__VIDEO__",
                                        videocode); var formcode = '<form class="wonderplugin-box-form">'; formcode += '<div class="wonderplugin-box-formmessage"></div>'; var customFields = $("#wonderplugin-popup-customfields").val(); try { customFields = JSON.parse(customFields) } catch (err) { customFields = [] } var fieldOrder = wonderplugin_popup_options["fieldorder"] && wonderplugin_popup_options["fieldorder"].length > 0 ? wonderplugin_popup_options["fieldorder"] : "email,name,firstname,lastname,company,phone,zip,message"; fieldOrder = fieldOrder.split(","); for (var i =
                                            0; i < fieldOrder.length; i++) {
                                                if (fieldOrder[i].substr(0, 6) == "custom") {
                                                    var customId = fieldOrder[i].substr(6); if (customId in customFields) {
                                                        var customItem = customFields[customId]; if (customItem.type == "input") {
                                                            formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-' + customItem.name + '" name="' + customItem.name + '" placeholder="' + customItem.placeholder + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-" + customItem.name +
                                                                " { width:" + customItem.size + "px; }"
                                                        } else if (customItem.type == "select") {
                                                            formcode += '<div class="wonderplugin-box-select">'; formcode += '<label class="wonderplugin-box-select-label">' + customItem.caption + "</label>"; formcode += '<select class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-' + customItem.name + '" name="' + customItem.name + '">'; for (var selectIndex = 0; selectIndex < customItem.selections.length; selectIndex++)formcode += '<option value="' + customItem.selections[selectIndex].value +
                                                                '">' + customItem.selections[selectIndex].caption + "</option>"; formcode += "</select>"; formcode += "</div>"
                                                        }
                                                    } continue
                                                } switch (fieldOrder[i]) {
                                                    case "email": if (wonderplugin_popup_options["showemail"]) {
                                                        formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-email" name="' + wonderplugin_popup_options["emailfieldname"] + '" placeholder="' + wonderplugin_popup_options["email"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-email { width:" +
                                                            wonderplugin_popup_options["emailinputwidth"] + "px; }"
                                                    } break; case "name": if (wonderplugin_popup_options["showname"]) { formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-name" name="' + wonderplugin_popup_options["namefieldname"] + '" placeholder="' + wonderplugin_popup_options["name"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-name { width:" + wonderplugin_popup_options["nameinputwidth"] + "px; }" } break; case "firstname": if (wonderplugin_popup_options["showfirstname"]) {
                                                        formcode +=
                                                        '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-firstname" name="' + wonderplugin_popup_options["firstnamefieldname"] + '" placeholder="' + wonderplugin_popup_options["firstname"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-firstname { width:" + wonderplugin_popup_options["firstnameinputwidth"] + "px; }"
                                                    } break; case "lastname": if (wonderplugin_popup_options["showlastname"]) {
                                                        formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-lastname" name="' +
                                                        wonderplugin_popup_options["lastnamefieldname"] + '" placeholder="' + wonderplugin_popup_options["lastname"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-lastname { width:" + wonderplugin_popup_options["lastnameinputwidth"] + "px; }"
                                                    } break; case "company": if (wonderplugin_popup_options["showcompany"]) {
                                                        formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-company" name="' + wonderplugin_popup_options["companyfieldname"] +
                                                        '" placeholder="' + wonderplugin_popup_options["company"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-company { width:" + wonderplugin_popup_options["companyinputwidth"] + "px; }"
                                                    } break; case "phone": if (wonderplugin_popup_options["showphone"]) {
                                                        formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-phone" name="' + wonderplugin_popup_options["phonefieldname"] + '" placeholder="' + wonderplugin_popup_options["phone"] +
                                                        '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-phone { width:" + wonderplugin_popup_options["phoneinputwidth"] + "px; }"
                                                    } break; case "zip": if (wonderplugin_popup_options["showzip"]) {
                                                        formcode += '<input type="text" class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-zip" name="' + wonderplugin_popup_options["zipfieldname"] + '" placeholder="' + wonderplugin_popup_options["zip"] + '">'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-zip { width:" +
                                                            wonderplugin_popup_options["zipinputwidth"] + "px; }"
                                                    } break; case "message": if (wonderplugin_popup_options["showmessage"]) {
                                                        formcode += '<textarea class="wonderplugin-box-formdata wonderplugin-box-formrequired wonderplugin-box-formbefore wonderplugin-box-message" name="' + wonderplugin_popup_options["messagefieldname"] + '" placeholder="' + wonderplugin_popup_options["message"] + '"></textarea>'; csscode += "#wonderplugin-popup-preview .wonderplugin-box-message { width:" + wonderplugin_popup_options["messageinputwidth"] +
                                                            "px;height:" + wonderplugin_popup_options["messageinputheight"] + "px;" + "}"
                                                    } break
                                                }
        } if (wonderplugin_popup_options["showterms"]) formcode += '<label class="wonderplugin-box-formbefore wonderplugin-box-terms"><input type="checkbox" class="wonderplugin-box-formdata wonderplugin-box-formrequired" name="' + wonderplugin_popup_options["termsfieldname"] + '">' + wonderplugin_popup_options["terms"] + "</label>"; if (wonderplugin_popup_options["showprivacyconsent"]) formcode += '<label class="wonderplugin-box-formbefore wonderplugin-box-privacyconsent"><input type="checkbox" class="wonderplugin-box-formdata wonderplugin-box-formrequired" name="' +
            wonderplugin_popup_options["privacyconsentfieldname"] + '">' + wonderplugin_popup_options["privacyconsent"] + "</label>"; if (wonderplugin_popup_options["showgrecaptcha"] && wonderplugin_popup_options["grecaptchasitekey"] && wonderplugin_popup_options["grecaptchasecretkey"]) formcode += '<div class="wonderplugin-box-recaptcha-container wonderplugin-box-formbefore"><div class="wonderplugin-box-recaptcha g-recaptcha" data-sitekey="' + wonderplugin_popup_options["grecaptchasitekey"] + '"></div></div>'; if (wonderplugin_popup_options["showaction"]) formcode +=
                '<input type="button" class="wonderplugin-box-formbefore ' + wonderplugin_popup_options["actioncss"] + ' wonderplugin-box-action" name="wonderplugin-box-action" value="' + wonderplugin_popup_options["action"] + '">'; if (wonderplugin_popup_options["showcancel"]) if (wonderplugin_popup_options["cancelastext"]) formcode += '<div class="wonderplugin-box-formbefore wonderplugin-box-cancel">' + wonderplugin_popup_options["cancel"] + "</div>"; else formcode += '<input type="button" class="wonderplugin-box-formbefore ' + wonderplugin_popup_options["cancelcss"] +
                    ' wonderplugin-box-cancel" name="wonderplugin-box-cancel" value="' + wonderplugin_popup_options["cancel"] + '">'; if (wonderplugin_popup_options["afteraction"] == "display") {
                        formcode += '<div class="wonderplugin-box-formafter wonderplugin-box-afteractionmessage">' + wonderplugin_popup_options["afteractionmessage"] + "</div>"; formcode += '<input type="button" class="wonderplugin-box-formafter ' + wonderplugin_popup_options["actioncss"] + ' wonderplugin-box-afteractionbutton" name="wonderplugin-box-afteractionbutton" value="' +
                            wonderplugin_popup_options["afteractionbutton"] + '">'
                    } formcode += "</form>"; htmlcode = htmlcode.replace("__FORM__", formcode); $("head").append('<style type="text/css" data-creator="wonderplugin-popup-preview">' + csscode + "</style>"); $("#wonderplugin-popup-preview").html(htmlcode); resetDisplay(); initCloseTooltip(); resizePopup(); if (wonderplugin_popup_options["showgrecaptcha"] && wonderplugin_popup_options["grecaptchasitekey"] && wonderplugin_popup_options["grecaptchasecretkey"]) if (typeof grecaptcha !== "undefined") grecaptcha.render($(".g-recaptcha")[0],
                        { sitekey: wonderplugin_popup_options["grecaptchasitekey"] })
    } function initCloseTooltip() { if (wonderplugin_popup_options["showclosetip"]) $(".wonderplugin-box-closebutton").hover(function () { $(".wonderplugin-box-closetip").fadeIn("fast") }, function () { $(".wonderplugin-box-closetip").fadeOut("fast") }) } function createParam0Code(ruletype, rule, index, rulevalue) {
        var code = ""; if (rule["param0"].type == "select") {
            code += '<select name="wonderplugin-popup-' + ruletype + "param0-" + index + '" class="wonderplugin-popup-param0">';
            for (var key in rule["param0"].select) { var value = rulevalue ? rulevalue.param0 : rule["param0"].defaultvalue; code += '<option value="' + key + '"' + (value == key ? " selected" : "") + ">" + rule["param0"].select[key] + "</option>" } code += "</select>"
        } else if (rule["param0"].type == "selectpage") {
            code += '<select name="wonderplugin-popup-' + ruletype + "param0-" + index + '" class="wonderplugin-popup-param0">'; var pagelist = {}; try { pagelist = JSON.parse($("#wonderplugin-popup-pagelist").text()) } catch (err) { } for (var key in pagelist) {
                var value =
                    rulevalue ? rulevalue.param0 : rule["param0"].defaultvalue; code += '<option value="' + pagelist[key].ID + '"' + (value == pagelist[key].ID ? " selected" : "") + ">" + pagelist[key].post_title + "</option>"
            } code += "</select>"
        } else if (rule["param0"].type == "selectpostcategory") {
            code += '<select name="wonderplugin-popup-' + ruletype + "param0-" + index + '" class="wonderplugin-popup-param0">'; var catlist = {}; try { catlist = JSON.parse($("#wonderplugin-popup-catlist").text()) } catch (err) { } for (var key in catlist) {
                var value = rulevalue ? rulevalue.param0 :
                    rule["param0"].defaultvalue; code += '<option value="' + catlist[key].ID + '"' + (value == catlist[key].ID ? " selected" : "") + ">" + catlist[key].cat_name + "</option>"
            } code += "</select>"
        } else if (rule["param0"].type == "selectcustomposttypes") {
            code += '<select name="wonderplugin-popup-' + ruletype + "param0-" + index + '" class="wonderplugin-popup-param0">'; var custompostlist = {}; try { custompostlist = JSON.parse($("#wonderplugin-popup-custompostlist").text()) } catch (err) { } for (var key in custompostlist) {
                var value = rulevalue ? rulevalue.param0 :
                    rule["param0"].defaultvalue; code += '<option value="' + custompostlist[key].name + '"' + (value == custompostlist[key].name ? " selected" : "") + ">" + custompostlist[key].name + "</option>"
            } code += "</select>"
        } else if (rule["param0"].type == "returninghours") { var value = rulevalue ? rulevalue.param0 : rule["param0"].defaultvalue; code += 'The first visit is more than <input name="wonderplugin-popup-' + ruletype + "param0-" + index + '" class="wonderplugin-popup-param0 small-text" type="number" step="0.1" min="0" value="' + value + '" /> hour(s) ago (based on cookies)' } return code
    }
    function createParam1Code(ruletype, rule, index, rulevalue) {
        var code = ""; if (rule["param1"].type == "pixels") { var value = rulevalue ? rulevalue.param1 : rule["param1"].defaultvalue; code += '<input name="wonderplugin-popup-' + ruletype + "param1-" + index + '" class="wonderplugin-popup-param1" type="text" value="' + value + '"> px' } else if (rule["param1"].type == "text") {
            var value = rulevalue ? rulevalue.param1 : rule["param1"].defaultvalue; code += '<input name="wonderplugin-popup-' + ruletype + "param1-" + index + '" class="wonderplugin-popup-param1 regular-text" type="text" value="' +
                value + '" />'
        } return code
    } function displayAllRules() { displayRules("page"); displayRules("device"); if (wonderplugin_langlist) displayRules("lang") } function redrawRemove() { $(".wonderplugin-popup-display-rule-remove").each(function () { $(this).css({ display: $(this).parent().parent().parent().children(".wonderplugin-popup-display-rule").length <= 1 ? "none" : "block" }) }) } function renderSingleRule(ruletype, singlerule, i) {
        var rulecode = '<li class="wonderplugin-popup-display-rule">'; rulecode += '<div class="wonderplugin-popup-display-rule-column">';
        rulecode += '<select name="wonderplugin-popup-' + ruletype + "ruleaction-" + i + '" class="wonderplugin-popup-ruleaction">'; for (var key in WONDERPLUGIN_POPUP_RULESACTION) rulecode += '<option value="' + key + '"' + (singlerule.action == key ? " selected" : "") + ">" + WONDERPLUGIN_POPUP_RULESACTION[key] + "</option>"; rulecode += "</select></div>"; rulecode += '<div class="wonderplugin-popup-display-rule-column">'; rulecode += '<select name="wonderplugin-popup-' + ruletype + "rule-" + i + '" class="wonderplugin-popup-rule">'; for (var key in WONDERPLUGIN_POPUP_RULES[ruletype]) rulecode +=
            '<option value="' + key + '"' + (singlerule.rule == key ? " selected" : "") + ">" + WONDERPLUGIN_POPUP_RULES[ruletype][key].rule + "</option>"; rulecode += "</select></div>"; rulecode += '<div class="wonderplugin-popup-display-rule-column">'; if ("param0" in singlerule) rulecode += createParam0Code(ruletype, WONDERPLUGIN_POPUP_RULES[ruletype][singlerule.rule], i, singlerule); rulecode += "</div>"; rulecode += '<div class="wonderplugin-popup-display-rule-column">'; if ("param1" in singlerule) rulecode += createParam1Code(ruletype, WONDERPLUGIN_POPUP_RULES[ruletype][singlerule.rule],
                i, singlerule); rulecode += "</div>"; rulecode += '<div class="wonderplugin-popup-display-rule-column wonderplugin-popup-display-rule-lastcolumn">'; rulecode += '<div class="wonderplugin-popup-display-rule-remove"></div>'; rulecode += "</div>"; rulecode += "</li>"; return rulecode
    } function displayRules(ruletype) {
        var rulestext = $("#wonderplugin-popup-display" + ruletype + "rules").text(); var rules = {}; try { rules = JSON.parse(rulestext) } catch (err) { } var rulecode = ""; for (var i in rules) rulecode += renderSingleRule(ruletype, rules[i],
            i); $("#wonderplugin-popup-display-" + ruletype + "rulelist").html(rulecode); redrawRemove()
    } function initDisplayRule() {
        $(".wonderplugin-popup-display-rulelist").on("change", ".wonderplugin-popup-rule", function () {
            var ruletype = $(this).parent().parent().parent().data("ruletype"); var index = $(this).parent().parent().index(); var value = $(this).val(); var rule = WONDERPLUGIN_POPUP_RULES[ruletype][value]; if ("param0" in rule) {
                var code = createParam0Code(ruletype, rule, index, null); var param0_column = $(this).parent().next();
                param0_column.html(code); if ("param1" in rule) { var code = createParam1Code(ruletype, rule, index, null); param0_column.next().html(code) } else param0_column.next().empty()
            } else { $(this).parent().next().empty(); $(this).parent().next().next().empty() }
        }); $(".wonderplugin-popup-display-rulelist").on("click", ".wonderplugin-popup-display-rule-remove", function () {
            $(this).parent().parent().remove(); $(".wonderplugin-popup-display-rulelist").each(function () {
                var ruletype = $(this).data("ruletype"); $(this).children(".wonderplugin-popup-display-rule").each(function (index) {
                    $(this).find(".wonderplugin-popup-ruleaction").attr("name",
                        "wonderplugin-popup-" + ruletype + "ruleaction-" + index); $(this).find(".wonderplugin-popup-rule").attr("name", "wonderplugin-popup-" + ruletype + "rule-" + index); $(this).find(".wonderplugin-popup-param0").attr("name", "wonderplugin-popup-" + ruletype + "param0-" + index); $(this).find(".wonderplugin-popup-param1").attr("name", "wonderplugin-popup-" + ruletype + "param1-" + index)
                })
            }); redrawRemove()
        }); $(".wonderplugin-popup-addrule").click(function () {
            var ruletype = $(this).data("ruletype"); var rule = {}; switch (ruletype) {
                case "page": rule =
                    { action: 1, rule: "allpagesposts" }; break; case "device": rule = { action: 1, rule: "alldevices" }; break; case "lang": rule = { action: 1, rule: "alllangs" }; break; default: return
            }var count = $("#wonderplugin-popup-display-" + ruletype + "rulelist").children(".wonderplugin-popup-display-rule").length; var rulecode = renderSingleRule(ruletype, rule, count); $("#wonderplugin-popup-display-" + ruletype + "rulelist").append(rulecode); redrawRemove()
        })
    } $(document).ready(function () { $(".wonderplugin-switch input:checkbox").click(function () { $(this).parent().toggleClass("wonderplugin-switch-checked") }) });
    $.wppCookie = function (key, value, options) {
        if (typeof value !== "undefined") { options = $.extend({}, { path: "/" }, options); if (options.expires) { var seconds = options.expires; options.expires = new Date; options.expires.setTime(options.expires.getTime() + seconds * 1E3) } return document.cookie = key + "=" + encodeURIComponent(value) + (options.expires ? ";expires=" + options.expires.toUTCString() : "") + (options.path ? ";path=" + options.path : "") } var result = null; var cookies = document.cookie ? document.cookie.split(";") : []; for (var i in cookies) {
            var parts =
                $.trim(cookies[i]).split("="); if (parts.length && parts[0] == key) { result = decodeURIComponent(parts[1]); break }
        } return result
    }; $.wppRemoveCookie = function (key) { return $.wppCookie(key, "", $.extend({}, { expires: -1 })) }
})(jQuery);
