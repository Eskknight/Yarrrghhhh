
(function () {
    var isIE8 = !checkVersion();

    var video_want_send_data = true; // set to true if want to send video click event, false if not.
    var line_tut_pos_px;
    var line_news_pos_px;
    var line_oem_pos_px;

    /*
    var SKETCHBOOK_TRIAL_STATUS_IN_TRIAL = 0;
    var SKETCHBOOK_TRIAL_STATUS_TRIED_ON_THIS_MACHINE = 1;
    var SKETCHBOOK_TRIAL_STATUS_EXPIRED = 2;
    var SKETCHBOOK_TRIAL_STATUS_CAN_TRY = 3;

    var SKETCHBOOK_CAMPAIGN_STATUS_USING = 1;
    var SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING = 0;
     */

    var HOME_TUTORIAL_TAB = "tutorials";

    /* Collect all the parameter values passed to the page here. */
    var LOCALE = sb_util.getParameterValue("locale", "en-us");
    var PAGE = sb_util.getParameterValue("page", "");
    var ISSIGNEDIN = sb_util.getParameterValue("signedin", "");
    var ISMAS = sb_util.getParameterValue("ismas", "false");
    var VIDEO = sb_util.getParameterValue("video", "");
    var NEWS = sb_util.getParameterValue("news", "");

    var OEM = sb_util.getParameterValue("oem", "");
    var OEM_ACTIVATED = sb_util.getParameterValue("oem_activated", "false");

    /*
    var TRIAL = sb_util.getParameterValue("trial", SKETCHBOOK_TRIAL_STATUS_CAN_TRY.toString());
    var TRIAL_DAYS = sb_util.getParameterValue("trial_days", "15");
    var TRIAL_TIME_LEFT = sb_util.getParameterValue("trial_time_left", "0");
    var CAMPAIGN = sb_util.getParameterValue("campain_status", SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING);
    var CAMPAIGN_TIME_LEFT = sb_util.getParameterValue("campaign_time_left", "0");

    var TRIAL_ACTIVATED = sb_util.getParameterValue("trial_activated", "false");
    var IS_ACTIVATING_TRIAL = sb_util.getParameterValue("is_activating_trial", "false");

    var PROMOTION_PLAN = sb_util.getParameterValue("promo_plan_id");
    var PROMOTION_PRICE = sb_util.getParameterValue("promo_discount_price", "0");
    var DISCOUNT = sb_util.getParameterValue("promo_off_percent", "0");
    var EXTENSION = sb_util.getParameterValue("promo_ext_length", "0");
    var PROMOTION_DAY_LEFT = sb_util.getParameterValue("promo_days_left", "0");

    var MP_PLAN_15 = sb_util.getParameterValue("mp_plan_15");
    var MP_PLAN_15_PRICE = sb_util.getParameterValue("mp_plan_15_price");
    var MP_PLAN_15_SYMBOL = sb_util.getParameterValue("mp_plan_15_symbol");
    var MP_PLAN_14 = sb_util.getParameterValue("mp_plan_14");
    var MP_PLAN_14_PRICE = sb_util.getParameterValue("mp_plan_14_price");
    var MP_PLAN_14_SYMBOL = sb_util.getParameterValue("mp_plan_14_symbol");
     */
    /* End - Collect all the parameter values passed to the page here. */

    var isOEM = (OEM != "");


    setupOEM();
    loadJS();

    window.onload=function(){
        localizePage();
        
        selectParameters();
        hideBody(false);

        prepareUIForLocalization();

        $("#index_34").click(function(){
            window.location.href = "sketchbook://banner/account";
        });
    };

    window.onmessage = function(event) {
        if(!event)
            return;
        var result = JSON.parse(event.data);
        // src url of a container (e.g., iframe)
        if (result.container_id && result.url){
            $("#"+result.container_id).attr('src', result.url);
        }
    }

    function prepareUIForLocalization(){
        var locale = LOCALE;
        locale = sb_util.getLocaleFolder(locale);
        $("html").addClass(locale);

        var ismas = (ISMAS == "true") ? true : false;
        if (ismas) {
            $("body").addClass("mas");
        }else{
            $("body").addClass("notmas");
        }
    }

    function hideBody(hide){
        if(hide){
            $("body").addClass("mhidden");
        }else if($("body").hasClass("mhidden")){
            $("body").removeClass("mhidden");
        }
    }

    function setupOEM(){
        if(isOEM){
            if ($("#tag_4").hasClass("mhide")) {
                $("#tag_4").removeClass("mhide");
            }
            var oem = OEM;
            var oemUrl;
            if(OEM_ACTIVATED == "true"){
                oemUrl = "../OEM/html/activate_oem_suc.html?locale=" + LOCALE + "&oem=" + oem + "&ismas=" + ISMAS;
            }else{
                oemUrl = "../OEM/html/activate_oem.html?locale=" + LOCALE + "&oem=" + oem + "&ismas=" + ISMAS;
            }
            $("#content_4_iframe").attr('src', oemUrl);
            if ($("#content_4").hasClass("mhidden")) {
                $("#content_4").removeClass("mhidden");
            }
        }
    };

    function localizePage() {
        $("#index_2").html(lan_index["index_2"]);
        $("#index_3").html(lan_index["index_3"]);

        $("#index_12").html(lan_index["index_12"]);
        $("#index_14").html(lan_index["index_14"]);
        $("#index_16").html(lan_index["index_16"]);
        //$("#index_18").html(lan_index["index_18"]);
        $("#index_20").html(lan_index["index_20"]);
        //$("#index_22").html(lan_index["index_22"]);
        $("#index_24").html(lan_index["index_24"]);
        $("#index_26").html(lan_index["index_26"]);
        $("#index_28").html(lan_index["index_28"]);
        $("#index_30").html(lan_index["index_30"]);
        $("#index_32").html(lan_index["index_32"]);
        $("#index_34").html(lan_index["index_34"]);
        $("#index_35").html(lan_index["index_35"]);

        $("#login").html(lan_index["login"]);

        if(isOEM){
            $("#index_4").html(lan_index_oem["index_4"]);
        }
    };

    //change the position of the blue line under the tag
    function changeLinePos(){
        var father_pos = $("#tag").offset().left;
        var tag_2_pos = ($("#tag_2 h2").offset().left);
        var tag_3_pos = ($("#tag_3 h2").offset().left);
        var tag_4_pos = ($("#tag_4 h2").offset().left);
        var tag_2_width = $("#tag_2 h2").width();
        var tag_3_width = $("#tag_3 h2").width();
        var tag_4_width = $("#tag_4 h2").width();
        var line_tut_pos = tag_2_pos - father_pos + (tag_2_width-30)/2;
        var line_news_pos = tag_3_pos - father_pos  + (tag_3_width-30)/2;
        var line_oem_pos = tag_4_pos - father_pos + (tag_4_width-30)/2;
        line_tut_pos_px = line_tut_pos + "px";
        line_news_pos_px = line_news_pos + "px";
        line_oem_pos_px = line_oem_pos + "px";
    };

    //change the layout of the page depends on the parameters sent by the apps
    function selectParameters() {
        if(isIE8){
            $("#t_videocontent").css("display","none");
            $("#v_image").css("display","block");
        }

        var page = (PAGE == "") ? HOME_TUTORIAL_TAB : PAGE;
        var issignedin = ISSIGNEDIN;
        updateAccountButton(issignedin);
        changeByPage(page);

        //Update quick tutorial page
        updateTutorialTab();
    };

    function updateAccountButton(issignedin){
        changeLinePos();
    }

    function updateTutorialTab(){
        $(".t_lock_essentials").css("visibility","hidden");
        $(".t_lock_pro").css("visibility","hidden");
        $(".t_content_starter").addClass("t_content_active");
        $(".t_content_essentials").addClass("t_content_active");
        $(".t_content_pro").addClass("t_content_active");
    }

    //if is signed in, hide the bottom bar of the page
    function changeSignIn(issignedin){
        var i = issignedin;
        if(i=="true"){
            // $("#tag_account").css("display","none");
            $("#account").text(lan_index["signout"]);
            $("#account").attr("href", "sketchbook://banner/signout?source=signout-button");
        }
        else{
            // $("#tag_account").css("display","inline");
            $("#account").text(lan_index["login"]);
            $("#account").attr("href", "sketchbook://banner/signin?source=signin-button");
        }
        if($("#account").hasClass("mhide"))
            $("#account").removeClass("mhide");

    };

    //determine the page displayed first
    function changeByPage(page){
        switch (page) {
            case 'membership': // Fall through to tutorials because "membership" no longer exists
            case 'tutorials':
                checkVideo();
                $("#tag_2").addClass("tag_active");
                $("#tag_4").removeClass("tag_active");
                $(".tag_line").css("left", line_tut_pos_px);
                $("#content_2").css("left", "0px");
                $("#content_3").css("left", "640px");
                $("#content_4").css("left", "640px");
                break;
            case 'news':
                if (NEWS == "") {
                    goToHomePage();
                    return;
                }
                $("#tag_3").addClass("tag_active");
                $("#tag_4").removeClass("tag_active");
                $(".tag_line").css("left", line_news_pos_px);
                $("#content_2").css("left", "-640px");
                $("#content_3").css("left", "0px");
                $("#content_4").css("left", "640px");
                break;
            case 'oem':
                $("#tag_2").removeClass("tag_active");
                $("#tag_3").removeClass("tag_active");
                $("#tag_4").addClass("tag_active");
                $(".tag_line").css("left", line_oem_pos_px);
                $("#content_2").css("left", "-640px");
                $("#content_3").css("left", "-640px");
                $("#content_4").css("left", "0px");
                break;
            default:
                $("#tag_2").addClass("tag_active");
                $(".tag_line").css("left", line_tut_pos_px);
                $("#content_2").css("left", "0px");
                $("#content_3").css("left", "640px");
                $("#content_4").css("left", "640px");
                break;
        }
    };

    function goToHomePage(){
        changeByPage("tutorials");
    }

    function checkVideo(){
        var video_tag = VIDEO;
        if(video_tag != ""){
            video_want_send_data = false;
            $("#t_content_"+video_tag).click();
            if(video_tag=="gradient_fill" ||video_tag=="distort" ||video_tag=="flipbooks" ||video_tag=="perspective"){
                document.getElementById("t_list").scrollTop=1000;
            }
            else if(video_tag=="copic_color" ||video_tag=="ruler" || video_tag=="symmetry" || video_tag=="brush_property"){
                document.getElementById("t_list").scrollTop=100;
            }
        }
    };

    $(".tag").click(function(){
        var myVideo=document.getElementById("t_videocontent"); 
        //myVideo.pause();
        //first, get id
        var this_id=parseInt($(".tag_active").attr("id").split("_")[1]);
        var next_id=parseInt($(this).attr("id").split("_")[1]);
        //set content position
        var content_list=$("#content_wrap").find(".content");
        for(var i=0;i<content_list.length;i++){
            //set z-index to zero;
            $(content_list).eq(i).css("z-index","0");
            //position
            var this_content_id=parseInt(content_list.eq(i).attr("id").split("_")[1]);
            if(this_content_id<this_id){
                $(content_list.eq(i)).css("left","-640px");
            }else if(this_content_id==this_id){
                $(content_list.eq(i)).css("left","0px");
            }else{
                $(content_list.eq(i)).css("left","640px");
            }
        }
        //set content z-index
        $(content_list.eq(this_id-1)).css("z-index","20");
        $(content_list.eq(next_id-1)).css("z-index","40");
        //start to trans
        //alert("start");
        if(this_id<next_id){
            $(content_list.eq(this_id-1)).animate({left:'-640px'},400);
            $(content_list.eq(next_id-1)).animate({left:'0px'},400);
        }else if(this_id>next_id){
            $(content_list.eq(this_id-1)).animate({left:'640px'},400);
            $(content_list.eq(next_id-1)).animate({left:'0px'},400);
        }
        //change position of tag_line
        if(next_id==2){
            $(".tag_line").animate({left:line_tut_pos_px},400);
        }else if(next_id==3){
            $(".tag_line").animate({left:line_news_pos_px},400);
        }else if(next_id==4){
            $(".tag_line").animate({left:line_oem_pos_px},400);
        }
        //remove tag_active
        $("#tag_"+this_id).removeClass("tag_active");
        $("#tag_"+next_id).addClass("tag_active");
    });


    function checkVersion(){
        var ua = navigator.userAgent; 
        var b = ua.indexOf("MSIE ");
        if(b >= 0){   
            var version = parseFloat(ua.substring(b + 5, ua.indexOf(";", b)));
            if(version >= 9.0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }

    };

    $(".t_content_wrap").live("click",function(){
        if(!$(this).hasClass('t_content_inactive')){
            $("#unlockbar_content_pro").fadeOut();
            $("#unlockbar_content_essentials").fadeOut();
        }
        var id = $(".changegray").attr("id");
        if(video_want_send_data){
            sendMixPanelEvent($(this).attr("id"));
        }else{
            video_want_send_data = true;
        }
        
        $("#"+id).removeClass("changegray");
        $(this).addClass("changegray");
        var n_video_name = $(this).attr("id").substring(10);
        var myVideo=document.getElementById("t_videocontent"); 
        if(!isIE8){// check if can play the video
            myVideo.pause();
            myVideo.setAttribute("src", "../video/"+n_video_name+".mp4");
            $("#forchange").attr("src","../video/"+n_video_name+".mp4");
            $("#forchange_2").attr("src","../video/"+n_video_name+".mp4");
            myVideo.load();
            myVideo.play();
        }
        else{
            $("#v_image_pic").attr("src","../image_ie8/"+n_video_name+".jpg");
        }
    });

    function sendMixPanelEvent(id){
        switch(id){
            case "t_content_brush_puck":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-brush-puck";
                break;
            case "t_content_color_wheel":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-color-wheel";
                break;
            case "t_content_lagoon":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-lagoon";
                break;
            case "t_content_brush_property":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-brush-property";
                break;
            case "t_content_brush_management":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-brush-management";
                break;                
            case "t_content_symmetry":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-symmetry";
                break;
            case "t_content_copic_color":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-copic-color-library";
                break;
            case "t_content_ruler":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-ruler-french";
                break;
            case "t_content_gradient_fill":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-gradient-fill";
                break;
            case "t_content_distort":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-distort";
                break;
            case "t_content_flipbooks":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-flipbooks";
                break;
            case "t_content_perspective":
                window.location.href = "sketchbook://banner/event?type=clicked&id=tutorials-video-perspective-tools";
                break;
            default:
                break;
        }
    };

    $(".t_content_inactive").live("click",function(){
        if($(this).hasClass('t_content_essentials')){
            $("#unlockbar_content_pro").fadeOut();
            $("#unlockbar_content_essentials").fadeTo(400,0.9);
        }
        else if($(this).hasClass('t_content_pro')){
            $("#unlockbar_content_essentials").fadeOut();
            $("#unlockbar_content_pro").fadeTo(400,0.9);
        }
    });

    function quick_tour_essentials_change(){
        video_want_send_data = false;
        $("#t_content_brush_property").click();
        setTimeout("$('#tag_2').click()",200);
        ess_learn_page_change.click();
        document.getElementById("t_list").scrollTop=100;
    };

    function quick_tour_pro_change(){
        video_want_send_data = false;
        $("#t_content_brush_management").click();
        setTimeout("$('#tag_2').click()",200);
        pro_learn_page_change.click();
        document.getElementById("t_list").scrollTop=1000;
    };

    function load_loop_image(){
        var num_of_list=5;
        var loop_image_name_list=["hero1","hero2","hero3","hero4","hero5"];
        var loop_image_length=[5,5,6,5,3];
        var loop_image_author_list=["Na Young Irene Lee","Kyle Runciman","Siyan Ren","Paul Vera Broadbent","Trent Kanigua"];
        
        var random_list=getRandomInt(0, num_of_list-1);
        
        var loop_image_div=$("#loop_images_section0 video");
        
        var myVideo=document.getElementById("myVideo"); 
        if (!isIE8) {
            myVideo.pause();
            myVideo.setAttribute("src", "../image/loop_image/" + loop_image_name_list[random_list] +".mp4");
            myVideo.load();
            myVideo.play();
        }else{
            $("#myVideo_img").attr("src", "../image/loop_image/" + loop_image_name_list[random_list] +"@2x.png");
        }

        var loop_image_author=$(".author");
        $("#author_name").text(loop_image_author_list[random_list]);

    }

    function loop_next_image(){
        var loop_image_list=$("#loop_images_section0").children();
        
        var last_active=loop_image_list.index($("#loop_images_section0").children(".active"));
        var next_active=last_active-1;
        if(last_active==0){
            next_active=loop_image_list.length;
        }
        for(var j=loop_image_list.length-1;j>=0;j--){
            if(j==next_active){
                loop_image_list.eq(j).fadeIn(2000);
                loop_image_list.eq(j).addClass("active");
            }
            else{
                setTimeout(function (){loop_image_list.eq(j).fadeOut(0);}, 2000);
                loop_image_list.eq(j).removeClass("active");
            }
        }
        setTimeout(loop_next_image, 2000);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //slides arrow
    $(".arrowUp").click(function(){
        $.fn.fullpage.moveSectionUp();
    });

    $(".arrowDown").click(function(){
        $.fn.fullpage.moveSectionDown();
    });

    $(".explore_arrow").click(function(){
        $.fn.fullpage.moveSectionDown();
    });

    function loadJS(){
        var locale = LOCALE;
        locale = sb_util.getLocaleFolder(locale);
        sb_util.loadjscssfile("../lang/" + locale + "/lan_index.js", "js", "");
        sb_util.loadjscssfile("../lang/" + locale + "/lan_subscription.js", "js", "");

        if(isOEM){
            var oem = OEM;
            sb_util.loadjscssfile("../OEM/" + oem + "/lang/" + locale + "/lan_index_oem.js", "js", "");
        }
    };

    // function getParameterValue(paramName, defaultValue){
    //     if (typeof(defaultValue)==='undefined') defaultValue = "";
    //     var value = urlParseModule.getURLParameter(paramName)?urlParseModule.getURLParameter(paramName):defaultValue;
    //     return value;
    // }

    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({[" + i + "]})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };

})();


// SIG // Begin signature block
// SIG // MIIgdgYJKoZIhvcNAQcCoIIgZzCCIGMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // CkQWAf+i6w3yoARZT7whWvnyx3KElkgOYFXuWcsIjHGg
// SIG // ggoaMIIEyzCCA7OgAwIBAgIQCQja65wGHi65un4mqmKH
// SIG // ijANBgkqhkiG9w0BAQsFADCBhDELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8w
// SIG // HQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMTUw
// SIG // MwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1NiBD
// SIG // b2RlIFNpZ25pbmcgQ0EgLSBHMjAeFw0xOTA1MTQwMDAw
// SIG // MDBaFw0yMDA1MTMyMzU5NTlaMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIDApDYWxpZm9ybmlhMRMwEQYDVQQHDApT
// SIG // YW4gUmFmYWVsMRcwFQYDVQQKDA5BdXRvZGVzaywgSW5j
// SIG // LjERMA8GA1UECwwIU2VjdXJpdHkxFzAVBgNVBAMMDkF1
// SIG // dG9kZXNrLCBJbmMuMIIBIjANBgkqhkiG9w0BAQEFAAOC
// SIG // AQ8AMIIBCgKCAQEAkVKRoPYsoxPdlabspcuG8HYDfcWQ
// SIG // 9qyPOT2punwpVdjt2slktcpSTlydrGy8ijcbl5/k8AOJ
// SIG // afKMQvow0fNjIoNB5nsb8j2xFJPbBhHl8GT4P6DZ1OWK
// SIG // ioiUXgGHKjctUws49J4elntqvBYhKCbuPqG772QCoYFU
// SIG // P7qcFbh3PbyNB6cnKMn2vNGRqiEtV2aGg+/MiL3QPsvT
// SIG // kTWhVuTLIvwZ4kK5C5ACiQzlGOlE+C7gWuFoxtvy6gUa
// SIG // A8JAq/xLjYKwFevQwGncg3s1cuiGhx0P7Rvn6oCd2cem
// SIG // FmbK3I3rMRt+jc9wzAj3oHxvCo4f5Lfva+OpC1dETUVV
// SIG // sk0VGwIDAQABo4IBPjCCATowCQYDVR0TBAIwADAOBgNV
// SIG // HQ8BAf8EBAMCB4AwEwYDVR0lBAwwCgYIKwYBBQUHAwMw
// SIG // YQYDVR0gBFowWDBWBgZngQwBBAEwTDAjBggrBgEFBQcC
// SIG // ARYXaHR0cHM6Ly9kLnN5bWNiLmNvbS9jcHMwJQYIKwYB
// SIG // BQUHAgIwGQwXaHR0cHM6Ly9kLnN5bWNiLmNvbS9ycGEw
// SIG // HwYDVR0jBBgwFoAU1MAGIknrOUvdk+JcobhHdglyA1gw
// SIG // KwYDVR0fBCQwIjAgoB6gHIYaaHR0cDovL3JiLnN5bWNi
// SIG // LmNvbS9yYi5jcmwwVwYIKwYBBQUHAQEESzBJMB8GCCsG
// SIG // AQUFBzABhhNodHRwOi8vcmIuc3ltY2QuY29tMCYGCCsG
// SIG // AQUFBzAChhpodHRwOi8vcmIuc3ltY2IuY29tL3JiLmNy
// SIG // dDANBgkqhkiG9w0BAQsFAAOCAQEA0Q2+iVSEfT4xGq3A
// SIG // OADVb0rT5Z8E+PPb1x6hKknSzuaZKk/acDz9mdnFajaU
// SIG // WgIKiFJlsqJnuAM1w4lqKaEWsz3DoxvGIEwexj71Ud6a
// SIG // KlBJNcR9DdkXUZwMhbw9d78rjJAIX6tOwfSludZfdq8b
// SIG // YEkuIzQi9uYW9vHVPSCzhnUBKjwc9qTo9yBc7Fcn4FAT
// SIG // 90DzWM2hS9oc3p0pprYI2I/O4th90BEmwWkVqVgfaR0z
// SIG // VyIEmBbqB/IWLfjUBZJ/8sbkwWuWlYVRrfPxsj1e9qvb
// SIG // wE3Y28jWyGbqoUG39GhXk3uT8R8i3+T6M0c4rMfdifBC
// SIG // pceCaFTJzSye7LoeVzCCBUcwggQvoAMCAQICEHwbNTVK
// SIG // 59t050FfEWnKa6gwDQYJKoZIhvcNAQELBQAwgb0xCzAJ
// SIG // BgNVBAYTAlVTMRcwFQYDVQQKEw5WZXJpU2lnbiwgSW5j
// SIG // LjEfMB0GA1UECxMWVmVyaVNpZ24gVHJ1c3QgTmV0d29y
// SIG // azE6MDgGA1UECxMxKGMpIDIwMDggVmVyaVNpZ24sIElu
// SIG // Yy4gLSBGb3IgYXV0aG9yaXplZCB1c2Ugb25seTE4MDYG
// SIG // A1UEAxMvVmVyaVNpZ24gVW5pdmVyc2FsIFJvb3QgQ2Vy
// SIG // dGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTQwNzIyMDAw
// SIG // MDAwWhcNMjQwNzIxMjM1OTU5WjCBhDELMAkGA1UEBhMC
// SIG // VVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9u
// SIG // MR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3Jr
// SIG // MTUwMwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1
// SIG // NiBDb2RlIFNpZ25pbmcgQ0EgLSBHMjCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBANeVQ9Tc32euOftS
// SIG // pLYmMQRw6beOWyq6N2k1lY+7wDDnhthzu9/r0XY/ilaO
// SIG // 6y1L8FcYTrGNpTPTC3Uj1Wp5J92j0/cOh2W13q0c8fU1
// SIG // tCJRryKhwV1LkH/AWU6rnXmpAtceSbE7TYf+wnirv+9S
// SIG // rpyvCNk55ZpRPmlfMBBOcWNsWOHwIDMbD3S+W8sS4duM
// SIG // xICUcrv2RZqewSUL+6McntimCXBx7MBHTI99w94Zzj7u
// SIG // BHKOF9P/8LIFMhlM07Acn/6leCBCcEGwJoxvAMg6ABFB
// SIG // ekGwp4qRBKCZePR3tPNgKuZsUAS3FGD/DVH0qIuE/iHa
// SIG // XF599Sl5T7BEdG9tcv8CAwEAAaOCAXgwggF0MC4GCCsG
// SIG // AQUFBwEBBCIwIDAeBggrBgEFBQcwAYYSaHR0cDovL3Mu
// SIG // c3ltY2QuY29tMBIGA1UdEwEB/wQIMAYBAf8CAQAwZgYD
// SIG // VR0gBF8wXTBbBgtghkgBhvhFAQcXAzBMMCMGCCsGAQUF
// SIG // BwIBFhdodHRwczovL2Quc3ltY2IuY29tL2NwczAlBggr
// SIG // BgEFBQcCAjAZGhdodHRwczovL2Quc3ltY2IuY29tL3Jw
// SIG // YTA2BgNVHR8ELzAtMCugKaAnhiVodHRwOi8vcy5zeW1j
// SIG // Yi5jb20vdW5pdmVyc2FsLXJvb3QuY3JsMBMGA1UdJQQM
// SIG // MAoGCCsGAQUFBwMDMA4GA1UdDwEB/wQEAwIBBjApBgNV
// SIG // HREEIjAgpB4wHDEaMBgGA1UEAxMRU3ltYW50ZWNQS0kt
// SIG // MS03MjQwHQYDVR0OBBYEFNTABiJJ6zlL3ZPiXKG4R3YJ
// SIG // cgNYMB8GA1UdIwQYMBaAFLZ3+mlIR59TEtXC6gcydgfR
// SIG // lwcZMA0GCSqGSIb3DQEBCwUAA4IBAQB/68qn6ot2Qus+
// SIG // jiBUMOO3udz6SD4Wxw9FlRDNJ4ajZvMC7XH4qsJVl5Fw
// SIG // g/lSflJpPMnx4JRGgBi7odSkVqbzHQCR1YbzSIfgy8Q0
// SIG // aCBetMv5Be2cr3BTJ7noPn5RoGlxi9xR7YA6JTKfRK9u
// SIG // QyjTIXW7l9iLi4z+qQRGBIX3FZxLEY3ELBf+1W5/muJW
// SIG // kvGWs60t+fTf2omZzrI4RMD3R3vKJbn6Kmgzm1By3qif
// SIG // 1M0sCzS9izB4QOCNjicbkG8avggVgV3rL+JR51EeyXgp
// SIG // 5x5lvzjvAUoBCSQOFsQUecFBNzTQPZFSlJ3haO8I8OJp
// SIG // nGdukAsak3HUJgLDwFojMYIVtDCCFbACAQEwgZkwgYQx
// SIG // CzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBD
// SIG // b3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1
// SIG // c3QgTmV0d29yazE1MDMGA1UEAxMsU3ltYW50ZWMgQ2xh
// SIG // c3MgMyBTSEEyNTYgQ29kZSBTaWduaW5nIENBIC0gRzIC
// SIG // EAkI2uucBh4uubp+Jqpih4owDQYJYIZIAWUDBAIBBQCg
// SIG // fDAQBgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMx
// SIG // DAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYK
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgvpbuEbml
// SIG // PuxawX7BctMBGokDg989cPiwhj8nvoEBpYIwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAI0hiHdVZstgyXTOIJ+rP0UGJ9Mu+
// SIG // j4fDHjgvHGWzwAhtogR8A3Za19DWH1UgImmmLu4f/MSO
// SIG // 6yqIfru4jDtRwnIUxBTOWosxe+gT8Fv3n3wKnbVG2H+e
// SIG // lg43KUXd+hYlF1fgeIFq6X5XbMd+AxtUik0ft5LTlLHB
// SIG // AnIyKF55CtZrGRL16niCupAaxF7712tgklZdE2P2EeDU
// SIG // d0DipbFNIra+F4psCszxTkDySPJ4Da4aVycCrDSkA6J9
// SIG // qsqrEQMDgqCN7+5vieW0oSfY0BjB80N3xHJFr5p05dDc
// SIG // LQoR/9QLlzLfJFEJPXUpskS5+mYIzK/cu7qybocCEZ5T
// SIG // wyhOUqGCE20wghNpBgorBgEEAYI3AwMBMYITWTCCE1UG
// SIG // CSqGSIb3DQEHAqCCE0YwghNCAgEDMQ8wDQYJYIZIAWUD
// SIG // BAIBBQAwggEMBgsqhkiG9w0BCRABBKCB/ASB+TCB9gIB
// SIG // AQYKKwYBBAGyMQIBATAxMA0GCWCGSAFlAwQCAQUABCCP
// SIG // x0iQxbcGhgQIPVl0LXfrZq3ZzMQ+Hxa9z20tmhA7MQIU
// SIG // FvaHKc/GHJDzrEgabQ4BWoEVJpMYDzIwMTkxMTEyMTg0
// SIG // MzM0WqCBiqSBhzCBhDELMAkGA1UEBhMCR0IxGzAZBgNV
// SIG // BAgMEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UEBwwH
// SIG // U2FsZm9yZDEYMBYGA1UECgwPU2VjdGlnbyBMaW1pdGVk
// SIG // MSwwKgYDVQQDDCNTZWN0aWdvIFJTQSBUaW1lIFN0YW1w
// SIG // aW5nIFNpZ25lciAjMaCCDfowggcGMIIE7qADAgECAhA9
// SIG // GjVyMBWCYzDQE3F+gkEIMA0GCSqGSIb3DQEBDAUAMH0x
// SIG // CzAJBgNVBAYTAkdCMRswGQYDVQQIExJHcmVhdGVyIE1h
// SIG // bmNoZXN0ZXIxEDAOBgNVBAcTB1NhbGZvcmQxGDAWBgNV
// SIG // BAoTD1NlY3RpZ28gTGltaXRlZDElMCMGA1UEAxMcU2Vj
// SIG // dGlnbyBSU0EgVGltZSBTdGFtcGluZyBDQTAeFw0xOTA1
// SIG // MDIwMDAwMDBaFw0zMDA4MDEyMzU5NTlaMIGEMQswCQYD
// SIG // VQQGEwJHQjEbMBkGA1UECAwSR3JlYXRlciBNYW5jaGVz
// SIG // dGVyMRAwDgYDVQQHDAdTYWxmb3JkMRgwFgYDVQQKDA9T
// SIG // ZWN0aWdvIExpbWl0ZWQxLDAqBgNVBAMMI1NlY3RpZ28g
// SIG // UlNBIFRpbWUgU3RhbXBpbmcgU2lnbmVyICMxMIICIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy1FQ/1b+
// SIG // /HhjcAGTWp4Y9DtT9gevIWz1og99HXAthHRIi5yKlQU9
// SIG // WYT5kYB5USzZirfBC5q6CorNZk8DiwG7MMqrvdvATxJe
// SIG // /ArM4kWwATiKu03n1BxUmO05WM9bwi9FmDEK+TU4uDEu
// SIG // bbQeOXLhuCq+n4yMGqVGrgsrTJn+LEv8KLkiOmYX0KpW
// SIG // iiHA85YktNCFJmu68G9kmHmmrb1c2FNrKwrWcoqFRuMN
// SIG // GAbaxntBVjabFT7xahGg92b1GNCAVWOHaGbrDnlVglyj
// SIG // 7Um4cYaekzewa6PqYmyjrpbouf2Lq8b2WVsAPFcgGC1w
// SIG // A6ec75LreaHHXex8tI9L3+td/KMg3ZI45WpROmuFnEyg
// SIG // mAhpWwbnKhnQlZOLO2uKBQkp2Nba2+Ny+lxKL3sVVoYy
// SIG // v38FCZ0tKs9Q4eZhINvHBoBcThRGvq5XcaKqbDCTHH53
// SIG // ywbpV82R9dUzchzh2spu6/MP7Hlbuyee6B7+L/K7f+nl
// SIG // 0GfruA18pCtZA4uV7SIozfosO8cWEa/j1rFQZ2nFjvV5
// SIG // 0K3/h8z4f6r5ou1h+MiNadqx9FGR62dX0WQR62TLA71J
// SIG // VTpFQxgsJWzRLwwtb/VBNSSg8mNZFl/ZpOksTtu7MRLG
// SIG // bfhbbgPcyxWPG41y7NsPFZDWEk7u4gAxJZM1b2pbpRJj
// SIG // QAGKuWmIOoi4DxkCAwEAAaOCAXgwggF0MB8GA1UdIwQY
// SIG // MBaAFBqh+GEZIA/DQXdFKI7RNV8GEgRVMB0GA1UdDgQW
// SIG // BBRvTYYH2DInniwp0tATA4CB3QWDKTAOBgNVHQ8BAf8E
// SIG // BAMCBsAwDAYDVR0TAQH/BAIwADAWBgNVHSUBAf8EDDAK
// SIG // BggrBgEFBQcDCDBABgNVHSAEOTA3MDUGDCsGAQQBsjEB
// SIG // AgEDCDAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3Rp
// SIG // Z28uY29tL0NQUzBEBgNVHR8EPTA7MDmgN6A1hjNodHRw
// SIG // Oi8vY3JsLnNlY3RpZ28uY29tL1NlY3RpZ29SU0FUaW1l
// SIG // U3RhbXBpbmdDQS5jcmwwdAYIKwYBBQUHAQEEaDBmMD8G
// SIG // CCsGAQUFBzAChjNodHRwOi8vY3J0LnNlY3RpZ28uY29t
// SIG // L1NlY3RpZ29SU0FUaW1lU3RhbXBpbmdDQS5jcnQwIwYI
// SIG // KwYBBQUHMAGGF2h0dHA6Ly9vY3NwLnNlY3RpZ28uY29t
// SIG // MA0GCSqGSIb3DQEBDAUAA4ICAQDAaO2z2NRQm+/TdcsP
// SIG // O/ck03o3RY0s7xb7UaksH7UltYqfXQvCGyB0jWYPNsuq
// SIG // 9jYND36PS0p0Q2WsDSr2Cu1rbcUJOO0AG/jl3KYKQAVH
// SIG // 74TKCbxDZoO/n+3bjj3RQWSxcAItA1dbGG8cLMsesgDo
// SIG // ugkvW4EENbmpY22OCMUY0eEhrPkSChTAEtt+JZ2sHRDA
// SIG // WqWD0h8aZlX8myri7DdXjuXfljD4wJMLQxj5Am+pUa+4
// SIG // VwrzHAdpOY83nG3Xka6lLknpSt6z0Iy/OZANwIHO8CoH
// SIG // OgymLVHScvNTxvm97+8MaUl3nyxWxOmhCD0HrsUe1oQi
// SIG // x7x9QxtYOGJO0QUlhMVC+B8v9tv6q4xU7EWKbBJNMFpS
// SIG // 5aQXCSLm72/1X4ZD36EtvUpGkqCBlixhl39Ab9g/jDVa
// SIG // q9HGoDuFZlSA7x8a9fGbsKEnfbLnC8/2LZxYE5SphvxF
// SIG // UqIobX90D1KRSXrpEvipO7CS/X2RFOlbbUiU8siW7gU4
// SIG // s8XsMD/hByAEsdiLvP2zPm/yAlMG9KDtyZpyo5dfAPvL
// SIG // Y9DozXT9dcnUNkW6exJZcu3n8npQAHj4Q5pG2N+/VNRe
// SIG // scfRvBuD9CvnC+hHyFOezBqs9vqKdVNsIIWp1bhquiSO
// SIG // iisIkZ83BBz2b6LdNKqR/8YVLh5CGgkpT/TGzeKRotNA
// SIG // DI544zCCBuwwggTUoAMCAQICEDAPb6zdZph0fKlGNqd4
// SIG // LbkwDQYJKoZIhvcNAQEMBQAwgYgxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpOZXcgSmVyc2V5MRQwEgYDVQQHEwtK
// SIG // ZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVT
// SIG // VCBOZXR3b3JrMS4wLAYDVQQDEyVVU0VSVHJ1c3QgUlNB
// SIG // IENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE5MDUw
// SIG // MjAwMDAwMFoXDTM4MDExODIzNTk1OVowfTELMAkGA1UE
// SIG // BhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3Rl
// SIG // cjEQMA4GA1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2Vj
// SIG // dGlnbyBMaW1pdGVkMSUwIwYDVQQDExxTZWN0aWdvIFJT
// SIG // QSBUaW1lIFN0YW1waW5nIENBMIICIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAg8AMIICCgKCAgEAyBsBr9ksfoiZfQGYPyCQ
// SIG // vZyAIVSTuc+gPlPvs1rAdtYaBKXOR4O168TMSTTL80Vl
// SIG // ufmnZBYmCfvVMlJ5LsljwhObtoY/AQWSZm8hq9VxEHmH
// SIG // 9EYqzcRaydvXXUlNclYP3MnjU5g6Kh78zlhJ07/zObu5
// SIG // pCNCrNAVw3+eolzXOPEWsnDTo8Tfs8VyrC4Kd/wNlFK3
// SIG // /B+VcyQ9ASi8Dw1Ps5EBjm6dJ3VV0Rc7NCF7lwGUr3+A
// SIG // z9ERCleEyX9W4L1GnIK+lJ2/tCCwYH64TfUNP9vQ6oWM
// SIG // ilZx0S2UTMiMPNMUopy9Jv/TUyDHYGmbWApU9AXn/TGs
// SIG // +ciFF8e4KRmkKS9G493bkV+fPzY+DjBnK0a3Na+WvtpM
// SIG // YMyou58NFNQYxDCYdIIhz2JWtSFzEh79qsoIWId3pBXr
// SIG // GVX/0DlULSbuRRo6b83XhPDX8CjFT2SDAtT74t7xvAIo
// SIG // 9G3aJ4oG0paH3uhrDvBbfel2aZMgHEqXLHcZK5OVmJyX
// SIG // nuuOwXhWxkQl3wYSmgYtnwNe/YOiU2fKsfqNoWTJiJJZ
// SIG // y6hGwMnypv99V9sSdvqKQSTUG/xypRSi1K1DHKRJi0E5
// SIG // FAMeKfobpSKupcNNgtCN2mu32/cYQFdz8HGj+0p9RTbB
// SIG // 942C+rnJDVOAffq2OVgy728YUInXT50zvRq1naHelUF6
// SIG // p4MCAwEAAaOCAVowggFWMB8GA1UdIwQYMBaAFFN5v1qq
// SIG // K0rPVIDh2JvAnfKyA2bLMB0GA1UdDgQWBBQaofhhGSAP
// SIG // w0F3RSiO0TVfBhIEVTAOBgNVHQ8BAf8EBAMCAYYwEgYD
// SIG // VR0TAQH/BAgwBgEB/wIBADATBgNVHSUEDDAKBggrBgEF
// SIG // BQcDCDARBgNVHSAECjAIMAYGBFUdIAAwUAYDVR0fBEkw
// SIG // RzBFoEOgQYY/aHR0cDovL2NybC51c2VydHJ1c3QuY29t
// SIG // L1VTRVJUcnVzdFJTQUNlcnRpZmljYXRpb25BdXRob3Jp
// SIG // dHkuY3JsMHYGCCsGAQUFBwEBBGowaDA/BggrBgEFBQcw
// SIG // AoYzaHR0cDovL2NydC51c2VydHJ1c3QuY29tL1VTRVJU
// SIG // cnVzdFJTQUFkZFRydXN0Q0EuY3J0MCUGCCsGAQUFBzAB
// SIG // hhlodHRwOi8vb2NzcC51c2VydHJ1c3QuY29tMA0GCSqG
// SIG // SIb3DQEBDAUAA4ICAQBtVIGlM10W4bVTgZF13wN6Mgst
// SIG // JYQRsrDbKn0qBfW8Oyf0WqC5SVmQKWxhy7VQ2+J9+Z8A
// SIG // 70DDrdPi5Fb5WEHP8ULlEH3/sHQfj8ZcCfkzXuqgHCZY
// SIG // XPO0EQ/V1cPivNVYeL9IduFEZ22PsEMQD43k+ThivxMB
// SIG // xYWjTMXMslMwlaTW9JZWCLjNXH8Blr5yUmo7Qjd8Fng5
// SIG // k5OUm7Hcsm1BbWfNyW+QPX9FcsEbI9bCVYRm5LPFZgb2
// SIG // 89ZLXq2jK0KKIZL+qG9aJXBigXNjXqC72NzXStM9r4MG
// SIG // OBIdJIct5PwC1j53BLwENrXnd8ucLo0jGLmjwkcd8F3W
// SIG // oXNXBWiap8k3ZR2+6rzYQoNDBaWLpgn/0aGUpk6qPQn1
// SIG // BWy30mRa2Coiwkud8TleTN5IPZs0lpoJX47997FSkc4/
// SIG // ifYcobWpdR9xv1tDXWU9UIFuq/DQ0/yysx+2mZYm9Dx5
// SIG // i1xkzM3uJ5rloMAMcofBbk1a0x7q8ETmMm8c6xdOlMN4
// SIG // ZSA7D0GqH+mhQZ3+sbigZSo04N6o+TzmwTC7wKBjLPxc
// SIG // FgCo0MR/6hGdHgbGpm0yXbQ4CStJB6r97DDa8acvz7f9
// SIG // +tCjhNknnvsBZne5VhDhIG7GrrH5trrINV0zdo7xfCAM
// SIG // KneutaIChrop7rRaALGMq+P5CslUXdS5anSevUiumDGC
// SIG // BBwwggQYAgEBMIGRMH0xCzAJBgNVBAYTAkdCMRswGQYD
// SIG // VQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAOBgNVBAcT
// SIG // B1NhbGZvcmQxGDAWBgNVBAoTD1NlY3RpZ28gTGltaXRl
// SIG // ZDElMCMGA1UEAxMcU2VjdGlnbyBSU0EgVGltZSBTdGFt
// SIG // cGluZyBDQQIQPRo1cjAVgmMw0BNxfoJBCDANBglghkgB
// SIG // ZQMEAgEFAKCCAVswGgYJKoZIhvcNAQkDMQ0GCyqGSIb3
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xOTExMTIxODQz
// SIG // MzRaMC8GCSqGSIb3DQEJBDEiBCA1mwte/FUBhbr04mMY
// SIG // Ujf0DiHFobwj4aOfj6xbSHPoEDCB7QYLKoZIhvcNAQkQ
// SIG // Agwxgd0wgdowgdcwFgQUJcisc05IULf42RORqBuSSTZl
// SIG // n2EwgbwEFALWW5Xig3DBVwCV+oj5I92Tf62PMIGjMIGO
// SIG // pIGLMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKTmV3
// SIG // IEplcnNleTEUMBIGA1UEBxMLSmVyc2V5IENpdHkxHjAc
// SIG // BgNVBAoTFVRoZSBVU0VSVFJVU1QgTmV0d29yazEuMCwG
// SIG // A1UEAxMlVVNFUlRydXN0IFJTQSBDZXJ0aWZpY2F0aW9u
// SIG // IEF1dGhvcml0eQIQMA9vrN1mmHR8qUY2p3gtuTANBgkq
// SIG // hkiG9w0BAQEFAASCAgCJ6m1I4dgwMxRLjUiLHuT2D+4K
// SIG // qABIMwd0i+zgmh4y+HchKm9c3HJbhJNA1nVz/RZGA7mW
// SIG // WJwkuvoFUSJLjb2oriJaJgH1S0QDGoIaAwuv8CEkZ6xg
// SIG // pv8U1pl4DwESeZNyTiARWy7ibE5BBlB6lO3hMU6wJp0e
// SIG // 1fVKC7kqc0rCRnXJxx3geHd8jSenVD/4cn4fsup382S2
// SIG // TmIFOPuDg4EM/Zuk/WGVNS1IK4ZJQlXdHAR8wXQB5X14
// SIG // WmQjyFx2f87nlHw0XFDTmt6cl2+PsjwFLeG8i8YgCdZA
// SIG // SzlEjkzAuFfgcEn4Amqf88DYXTDrgXNoV4t4o7lp6ntj
// SIG // 74fx6P9uJAoxAxT2U3MOQsgs43oOuF79j1u2r/Eydksv
// SIG // sSkQGfpiWmLJRFOg63ssh5NQFVPsa2VIEWLhUZgq2w3N
// SIG // fPnpl7Z+MES6LsEtfMR8R737g1bARZKHYvLUwYYmw/Dw
// SIG // w9jDHTe5E6kYjhuniCllFqb9+0CqzG5YD+uv9zxULPyx
// SIG // 2yZ35A3gB5dyvsZXfUzHUyZjO1thEE3R+9plnOmDta8L
// SIG // wjqS+ROrHkysJLO0Ha1XE0qKc/6sUOm2DmMH26/PFTDu
// SIG // kECLBYmoyjZgAWNNWbMKV4Ecnfzj86RBLlyfO46xw1Ig
// SIG // Dfcz0T93PBcoePcC3EbFvpfTz8kqJHXVAOLLU6DnYA==
// SIG // End signature block
