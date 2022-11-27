(function(){
	var line_profile_pos;
	var line_assets_pos;
	var line_plan_pos;
	var line_profile_pos_px;
	var line_assets_pos_px;
	var line_plan_pos_px;
	// var m_price;
	// var y_price;
	
	var ACCOUNT_PLAN_TAB = "plan";
	var ACCOUNT_PROFILE_TAB = "profile";
	
	var PLAN_ID_MONTH = 14;
	var PLAN_ID_YEAR = 15;
	var PLAN_ID_QUARTER = 22;
	var PLAN_ID_ONEYEAR = 32;
	var PLAN_ID_NO_PLAN = 0;

	var MEMBERSHIP_PRO_TRIAL = "SketchBook Pro Membership (Trial)";
	var MEMBERSHIP_PRO_CAMPAIGN = "SketchBook Pro Membership (Campaign)";
	var MEMBERSHIP_PRO = "SketchBook Pro Membership";
	var MEMBERSHIP_PRO_MONTH = "SketchBook Pro Membership (Monthly)";
	var MEMBERSHIP_PRO_YEAR = "SketchBook Pro Membership (Yearly)";
	var MEMBERSHIP_PRO_OEM = "SketchBook Pro Membership (Quarterly)";
	var MEMBERSHIP_FREE = "FREE";

	var SKETCHBOOK_TRIAL_STATUS_IN_TRIAL = 0;
	var SKETCHBOOK_TRIAL_STATUS_TRIED_ON_THIS_MACHINE = 1;
	var SKETCHBOOK_TRIAL_STATUS_EXPIRED = 2;
	var SKETCHBOOK_TRIAL_STATUS_CAN_TRY = 3;

	var SKETCHBOOK_CAMPAIGN_STATUS_USING = 1;
	var SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING = 0;

	var SKETCHBOOK_NOT_SUBSCRIBED = 0;

	var LOCALE = sb_util.getParameterValue("locale", "en-us");
	var PAGE = sb_util.getParameterValue("page", ACCOUNT_PLAN_TAB);
	var SUBSCRIPTION = sb_util.getParameterValue("subscription", SKETCHBOOK_NOT_SUBSCRIBED.toString());
	var TRIAL = sb_util.getParameterValue("trial", SKETCHBOOK_TRIAL_STATUS_CAN_TRY.toString());
	var TRIAL_TIME_LEFT = sb_util.getParameterValue("trial_time_left", "0");
	var TRIAL_EXPIRY_DATE = sb_util.getParameterValue("trial_expiry_date");
	var CAMPAIGN = sb_util.getParameterValue("campain_status", SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING.toString());
	var CAMPAIGN_TIME_LEFT = sb_util.getParameterValue("campaign_time_left", "0");
	var CAMPAIGN_EXPIRY_DATE = sb_util.getParameterValue("campaign_expiry_date");
	var ADDRESS_CODE = sb_util.getParameterValue("address_code", "US");
	
	// var tier = getParameterValue("tier");
	var MP_PLAN_15 = sb_util.getParameterValue("mp_plan_15");
	var MP_PLAN_15_PRICE = sb_util.getParameterValue("mp_plan_15_price");
	var MP_PLAN_15_SYMBOL = sb_util.getParameterValue("mp_plan_15_symbol");
	var MP_PLAN_14 = sb_util.getParameterValue("mp_plan_14");
	var MP_PLAN_14_PRICE = sb_util.getParameterValue("mp_plan_14_price");
	var MP_PLAN_14_SYMBOL = sb_util.getParameterValue("mp_plan_14_symbol");
	var ISMAS = sb_util.getParameterValue("ismas", "false");
	
	var EXPIRY_DATE = sb_util.getParameterValue("expiry_date");
	var MEMBERNAME = sb_util.getParameterValue("membername");
	var EMAIL = sb_util.getParameterValue("email");
	var ISSIGNEDIN = sb_util.getParameterValue("signedin");
	var IS_ACTIVATING_TRIAL = sb_util.getParameterValue("is_activating_trial", "false");
	var TRIAL_ACTIVATED = sb_util.getParameterValue("trial_activated", "false");
	var TRIAL_DAYS = sb_util.getParameterValue("trial_days", "15");

    var OEM = sb_util.getParameterValue("oem", "");
    var OEM_ACTIVATED = sb_util.getParameterValue("oem_activated", "false");


	var PROMOTION_PLAN = sb_util.getParameterValue("promo_plan_id");
	var PROMOTION_PRICE = sb_util.getParameterValue("promo_discount_price", "0");
	var DISCOUNT = sb_util.getParameterValue("promo_off_percent", "0");
	var EXTENSION = sb_util.getParameterValue("promo_ext_length", "0");
	var PROMOTION_DAY_LEFT = sb_util.getParameterValue("promo_days_left", "0");




	loadJS();
	changeMenuPosition();
	var page = getInitialPageName();

	window.onload=function(){ 
		// Call localizePage() again for IE8 support, cause IE8 doesn't seem to support onload event for <link> and <script>.
		localizePage();
		// localizePrice();
        prepareUIForLocalization();
        
        sb_util.hideBody(false);
        
        changePriceButton();
		// changeCurrentPlan();
		$("#expire_date").text(EXPIRY_DATE);

		changeLinePos();
		changeByPage(page);
		changeByMembership();
		initProfile();

		$(".tag").click(onTagClicked);

		$("#ok_btn").click(function(){
	        // Here we assume the page already has the trial time, so we just close the dialog here.
	        $("#trial_activated").addClass("mhide");
	    });
		
		var trialActivated = (TRIAL_ACTIVATED== "true") ? true : false;
	    showTrialActivated(trialActivated);
	    sendMixPanelEvent();
	    $("#account_activate_trial_btn_txt_1").html(TRIAL_DAYS);

	};

	function getInitialPageName(){
	    var subscription = parseInt(SUBSCRIPTION);
	    var page = PAGE;
	    if(subscription != SKETCHBOOK_NOT_SUBSCRIBED){
	    	hideMyPlan();
	    	page = ACCOUNT_PROFILE_TAB;
	    }
	    return page;
	}

	function sendMixPanelEvent(){
		// send the present of account.html event
		window.location.href = "sketchbook://banner/event?type=changed&id=profile-subtitle&subtitle=" + PAGE;
	}

	function prepareUIForLocalization(){
		// var locale = urlParseModule.getURLParameter("locale") ? urlParseModule.getURLParameter("locale") : 'en-us';
	    var locale = sb_util.getLocaleFolder(LOCALE);
	    $("html").addClass(locale);

	    // var ismas = (urlParseModule.getURLParameter("ismas") == "true") ? true : false;
	    var ismas = (ISMAS == "true") ? true : false
	    if (ismas) {
	    	$("body").addClass("mas");
	    }else{
	    	$("body").addClass("notmas");
	    }

	    $("body").addClass("price_localized_" + ADDRESS_CODE.toLowerCase());

	}

	function initProfile(){
		var expiryDate = EXPIRY_DATE;
		var membername = MEMBERNAME;
		$("#username").text(membername);
		var email = EMAIL;
		$("#account_email").text(email);

		var subscription = SUBSCRIPTION;
	    subscription = parseInt(subscription);
	    var issignedin = ISSIGNEDIN;
	    var trialStatus = TRIAL;
	    var giftCodeStatus = CAMPAIGN;

		if(subscription != SKETCHBOOK_NOT_SUBSCRIBED){ // pro user
			switch(subscription){
				case PLAN_ID_MONTH:
				$("#account_membership").text(MEMBERSHIP_PRO_MONTH);
				break;
				case PLAN_ID_YEAR:
				case PLAN_ID_ONEYEAR:
				$("#account_membership").text(MEMBERSHIP_PRO_YEAR);
				break;
				default:
				$("#account_membership").text(MEMBERSHIP_PRO_OEM);
			}
			$("#account_validatedate").text(expiryDate);
			$("#account_sec2_validatedate").removeClass("mhide");
	    }else if(issignedin=="false"){ // user is not signed in
	    	// should not happen, show free?
	    	$("#account_membership").text(MEMBERSHIP_FREE);
	    }else if (giftCodeStatus == SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING) {
	    	updateProfileAccordingToTrialStatus(trialStatus);
	    }else{
	    	var trialTimeLeft = TRIAL_TIME_LEFT;
	        trialTimeLeft = parseInt(trialTimeLeft);

	        var giftCodeTimeLeft = CAMPAIGN_TIME_LEFT;
	        giftCodeTimeLeft = parseInt(giftCodeTimeLeft);

	        if (trialTimeLeft <= giftCodeTimeLeft) {
	            updateProfileAccordingToCampaignStatus(giftCodeStatus);
	        }else{
	            updateProfileAccordingToTrialStatus(trialStatus);
	        }
	    }

	}

	function updateProfileAccordingToTrialStatus(trialStatus){
		var trialExpiryDate = TRIAL_EXPIRY_DATE;
		if(trialStatus == SKETCHBOOK_TRIAL_STATUS_CAN_TRY){ // signed in but not in trial
	    	$("#account_membership").text(MEMBERSHIP_FREE);
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_IN_TRIAL){ // signed in and in trial
	    	$("#account_membership").text(MEMBERSHIP_PRO_TRIAL);
	    	$("#account_validatedate").text(trialExpiryDate);
	    	$("#account_sec2_validatedate").removeClass("mhide");
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_EXPIRED){ // signed in but trial expired
	    	$("#account_membership").text(MEMBERSHIP_FREE);
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_TRIED_ON_THIS_MACHINE){ // signed in but can not try because the current machine has already been tried
	    	$("#account_membership").text(MEMBERSHIP_FREE);
	    }else{
	    	$("#account_membership").text(MEMBERSHIP_FREE);
	    }
	}

	function updateProfileAccordingToCampaignStatus(giftCodeStatus){
		var giftCodeExprityDate = CAMPAIGN_EXPIRY_DATE;
		if (giftCodeStatus == SKETCHBOOK_CAMPAIGN_STATUS_USING) {
			$("#account_membership").text(MEMBERSHIP_PRO_CAMPAIGN);
	    	$("#account_validatedate").text(giftCodeExprityDate);
	    	$("#account_sec2_validatedate").removeClass("mhide");
		};
		
	}

	function changeTrialActivationButton(isActivatingTrial){
		// Assume here that $("#account-activate-trial-btn") is visible
		// $("#account-activate-trial-btn").removeClass("mhide");
		
		if (isActivatingTrial) {
			$("#activating_gif").removeClass("mhide");
			if (!$("#account_activate_trial_btn_txt").hasClass("mhide")) {
				$("#account_activate_trial_btn_txt").addClass("mhide");
			}
		}else{
		    $("#account_activate_trial_btn_txt").removeClass("mhide");
		    if (!$("#activating_gif").hasClass("mhide")) {
		    	$("#activating_gif").addClass("mhide");
		    }
		}
	};

	function showTrialActivationButton(show){
		if(show){
			if ($("#account-activate-trial-btn").hasClass("mhide")){
				$("#account-activate-trial-btn").removeClass("mhide");
			}
		}else{
			if (!$("#account-activate-trial-btn").hasClass("mhide")){
				$("#account-activate-trial-btn").addClass("mhide");
			}
		}
	}

	function showTrialActivated(show){
	    var trialStatus = TRIAL;
	    if (trialStatus) {
	        trialStatus = parseInt(trialStatus);
	        if(show){
	            switch(trialStatus){
	                case SKETCHBOOK_TRIAL_STATUS_EXPIRED:
	                $("#trial_activated_failed_header").removeClass("mhide");
	                $("#trial_not_activated_expired_txt").removeClass("mhide");
	                break;
	                case SKETCHBOOK_TRIAL_STATUS_IN_TRIAL: // success
			        var timeleft = parseInt(TRIAL_TIME_LEFT);
			        var trialDaysLeft = Math.ceil(timeleft / 86400.0);
			        if (trialDaysLeft > 1) {
			            $("#trial_days").html(trialDaysLeft.toString());
			            $("#trial_validated_success_txt_2").removeClass("mhide");
			        }else{
			            // $("#trial_day").html(trialDaysLeft.toString());
			            // $("#campaign_validated_success_singular_txt").removeClass("mhide");
			        }
	                $("#trial_activated").addClass("trial_activate_success");
	                $("#trial_activated_header").removeClass("mhide");
	                $("#trial_activated_txt").removeClass("mhide");
	                break;
	                case SKETCHBOOK_TRIAL_STATUS_CAN_TRY:  // fail, try again
	                $("#trial_activated_failed_header").removeClass("mhide");
	                $("#trial_not_activated_try_again_txt").removeClass("mhide");
	                break;
	                case SKETCHBOOK_TRIAL_STATUS_TRIED_ON_THIS_MACHINE: // fail, no need to try again
	                $("#trial_activated_failed_header").removeClass("mhide");
	                $("#trial_not_activated_same_machine_txt").removeClass("mhide");
	                break;
	                default:
	                $("#trial_activated_failed_header").removeClass("mhide");
	                $("#trial_not_activated_try_again_txt").removeClass("mhide");
	                break;
	            }
	            if($("#trial_activated").hasClass("mhide")){
	                $("#trial_activated").removeClass("mhide");
	            }
	        }else{
	            if(!$("#trial_activated").hasClass("mhide")){
	                $("#trial_activated").addClass("mhide");
	            }
	        }
	    }
	}

	function changeMenuPosition(){
		var totoalWidth = $("#s_tag").width();
		var tagTotalWidth = 0;
		var tag_list = $("#account-menu").find(".tag");
		for (var i = tag_list.length - 1; i >= 0; i--) {
			tagTotalWidth += tag_list[i].clientWidth;
		};
		var menuPadding = totoalWidth/2 - tagTotalWidth/2;
	}

	function getPriceInt(priceString, decimalPoint){
		if (!(typeof priceString == 'string' || priceString instanceof String)){
			priceString = String(priceString);
		}
		priceStringArray = priceString.split(decimalPoint);
		if(priceStringArray.length >= 1){
			return priceStringArray[0];
		}else{
			return priceString;
		}
	};

	function getPriceDecimal(priceString, decimalPoint){
		if (!(typeof priceString == 'string' || myVar instanceof String)){
			priceString = String(priceString);
		}
		priceStringArray = priceString.split(decimalPoint);
		if(priceStringArray.length == 2){ //xx.xx
			return priceStringArray[1];
		}else if(priceStringArray.length == 1){ //xx
			return "0";
		}else{ // don't know what it is, just return the original value
			return priceString;
		}
	}

	// function changeCurrentPlan(){
     //    var abb_month = document.getElementById('forjs_mo').innerText;
	//     var abb_year = document.getElementById('forjs_yr').innerText;
	//     var m_price_num = MP_PLAN_14;
	//     var y_price_num = MP_PLAN_15;
    //
	//     var m_raw_price = MP_PLAN_14_PRICE;
	//     var y_raw_price = MP_PLAN_15_PRICE;
	//     var m_raw_price_symbol = MP_PLAN_14_SYMBOL;
	//     var y_raw_price_symbol = MP_PLAN_15_SYMBOL;
    //
	// 	var planID = SUBSCRIPTION;
	// 	var decimalPoint = ".";
	// 	var expiryDate = EXPIRY_DATE;
	// 	$("#expire_date").text(expiryDate);
	//
	// 	if(m_price_num == "" || y_price_num == "" || m_raw_price == "" || y_raw_price == ""){
	// 		$(".account-price-sign").text("");
	// 		// $("#price_before_right").text("");
	// 		$("#price_after_num_right").text("");
	// 		$("#price_after_txt_right").text("");
	// 		return;
	// 	}
    //
	// 	if(planID == PLAN_ID_NO_PLAN){
	// 		planID = (ISMAS == "true") ? PLAN_ID_YEAR : PLAN_ID_MONTH;
	// 	}else if(planID != PLAN_ID_YEAR){
	// 		// OEM situation, show month plan
	// 		planID = PLAN_ID_MONTH;
	// 	}
    //
	// 	if(planID == PLAN_ID_MONTH){
	// 		$(".account-price-sign").text(m_raw_price_symbol);
	// 		$("#price_before_right").text(getPriceInt(m_raw_price, decimalPoint));
	// 		$("#price_after_num_right").text(decimalPoint + getPriceDecimal(m_raw_price, decimalPoint));
	// 		$("#price_after_txt_right").text(abb_month);
	// 	}else if(planID == PLAN_ID_YEAR){
	// 		$(".account-price-sign").text(m_raw_price_symbol);
	// 		$("#price_before_right").text(getPriceInt(y_raw_price, decimalPoint));
	// 		$("#price_after_num_right").text(decimalPoint + getPriceDecimal(y_raw_price, decimalPoint));
	// 		$("#price_after_txt_right").text(abb_year);
	// 		// adjust the UI
	// 		// $("#account-price-pro").css("width", "65%");
	// 	}
    //
     //    if(!$("#account_price_loading").hasClass("mhide")){
     //    	$("#account_price_loading").addClass("mhide");
     //    }
	// 	if($("#account-price-pro").hasClass("mhide")){
	// 		$("#account-price-pro").removeClass("mhide");
	// 	}
    //
	// }

    // For pro user, gift code user, trial user and free user, we show different UI, so we need to distinguish between them.
	function changeByMembership(){
		// var tier = urlParseModule.getURLParameter("tier");
		var planID = SUBSCRIPTION;
		// 1 - not try, 2 - trying, 3 - expired, 4 - same machine
	    var trialStatus = TRIAL;
	    var trialTimeLeft; // return in seconds
	    if(trialStatus && (parseInt(trialStatus) == 0)){
	        trialTimeLeft = TRIAL_TIME_LEFT;
	        trialTimeLeft = parseInt(trialTimeLeft);
	    }

	    var giftCodeStatus = CAMPAIGN;

	    var isActivatingTrial = (IS_ACTIVATING_TRIAL == "true") ? true : false;
		var ismas = (ISMAS == "true") ? true : false;

		if(planID != 0){ // pro user
			// $("#account-left-div").css("opacity", "0.2");
			// $("#left_current_plan").css("text-decoration", "line-through");
			coverFreePlan();
			$("#account_action_pro").removeClass("mhide");
	    // }else if(issignedin=="false"){ } // it is impossible that the uesr is not signed in
	    }else if (ismas) {
			showTrialActivationButton(false);
			$("#account_mas_buy_btn_cell").removeClass("mhide");
			$("#account_mas_trial_btn_cell").removeClass("mhide");
			//$("#account-price-cell").removeClass("mhide");
		}else if (giftCodeStatus == SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING) {
	    	updateUIAccordingToTrialStatus(trialStatus, isActivatingTrial);
            updateOEMActiviationStatus();
	    }else{
	    	var trialTimeLeft = TRIAL_TIME_LEFT;
	        trialTimeLeft = parseInt(trialTimeLeft);

	        var giftCodeTimeLeft = CAMPAIGN_TIME_LEFT;
	        giftCodeTimeLeft = parseInt(giftCodeTimeLeft);

			if (trialTimeLeft <= giftCodeTimeLeft) {
	            updateUIAccordingToCampaignStatus(giftCodeStatus);
	        }else{
	            updateUIAccordingToTrialStatus(trialStatus, isActivatingTrial);
	        }
            updateOEMActiviationStatus();
	    }
	};

	function hideMyPlan(){
		$("#tag_3").addClass("mhide");
		$("#account-content-3").addClass("mhide");
	}

	function updateUIAccordingToCampaignStatus(giftCodeStatus){
		var giftCodeTimeLeft = CAMPAIGN_TIME_LEFT;
	    giftCodeTimeLeft = parseInt(giftCodeTimeLeft);

	    if (giftCodeStatus != SKETCHBOOK_CAMPAIGN_STATUS_NOT_USING) {
	    	coverFreePlan();

	    	showTrialActivationButton(false);
	        // changeTrialActivationButton(isActivatingTrial);
	    	
	    	// $("#account-price-cell").removeClass("mhide");
			showBuyButton();
	        showCampaignDaysCountDown(giftCodeTimeLeft);
	        // $("#gifticon").removeClass("mhide");
	        // $("#account-price-pro").css("width", "60%");

	    }
	}

	function updateUIAccordingToTrialStatus(trialStatus, isActivatingTrial){
		var trialTimeLeft; // return in seconds
	    if(trialStatus){
	        trialTimeLeft = TRIAL_TIME_LEFT;
	        trialTimeLeft = parseInt(trialTimeLeft);
	    }
		
		if(trialStatus == SKETCHBOOK_TRIAL_STATUS_CAN_TRY){ // signed in but not in trial

			// show the default
			showTrialActivationButton(true);
			changeTrialActivationButton(isActivatingTrial);
		        
			// $("#account-price-cell").removeClass("mhide");
			showBuyButton();
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_IN_TRIAL){ // signed in and in trial
	    	coverFreePlan();

	    	showTrialActivationButton(false);
	        // changeTrialActivationButton(isActivatingTrial);
	    	
	    	// $("#account-price-cell").removeClass("mhide");
			showBuyButton();
	        showTrailDaysCountDown(trialTimeLeft);
	        
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_EXPIRED){ // signed in but trial expired
	    	showTrialActivationButton(false);
	        // changeTrialActivationButton(isActivatingTrial);
	    	
	    	// $("#account-price-cell").removeClass("mhide");
			showBuyButton();
	    	showTrailDaysCountDown(trialTimeLeft);
	    }else if(trialStatus == SKETCHBOOK_TRIAL_STATUS_TRIED_ON_THIS_MACHINE){ // signed in but can not try because the current machine has already been tried
	        // TODO:  change the UI
	        // $("#trial_days_expired_txt").removeClass("mhide");
	        showTrialActivationButton(false);
	        // changeTrialActivationButton(isActivatingTrial);
	        
	        // $("#account-price-cell").removeClass("mhide");
			showBuyButton();
	    	showTrailDaysCountDown(trialTimeLeft);
	    }else{
	    	if (ismas) {
	    		showTrialActivationButton(false);
				$("#account_mas_buy_btn_cell").removeClass("mhide");
				$("#account_mas_trial_btn_cell").removeClass("mhide");
	    		//$("#account-price-cell").removeClass("mhide");
	    	}else{
	    		// should not happend, change to signed in but not in trial status
		        showTrialActivationButton(true);
		        changeTrialActivationButton(isActivatingTrial);
		        
		        // $("#account-price-cell").removeClass("mhide");
				showBuyButton();
	    	}
	        
	    }
	}

	function showBuyButton() {
		if(MP_PLAN_14_PRICE != "" && MP_PLAN_15_PRICE != "") {
			$("#account_connection_error").addClass("mhide");

			if(DISCOUNT == "0" && EXTENSION == "0"){
				$("#account_new_buy_btn_cell").removeClass("mhide");
			}
			else {
				$("#account_promotion_btn_cell").removeClass("mhide");

				//update the width of "account-activate-trial-btn","account_connection_error"
				$(".account-actions").css("position", "absolute");
				$(".account-actions").css("left", "50%");
				$(".account-actions").css("transform", "translateX(-50%)");

				$("#account-activate-trial-btn").css("width", document.getElementById("promotion_btn_area").offsetWidth+"px");
				$("#account_promotion_btn_cell").css("width", document.getElementById("promotion_btn_area").offsetWidth+"px");
			}
		}
		else{
			if($("#account_connection_error").hasClass("mhide")){
				$("#account_connection_error").removeClass("mhide");
			}
		}
	}

    function updateOEMActiviationStatus(){
        if(OEM!="" && OEM_ACTIVATED=="false"){
            sb_util.setVisibility($("#account_activate_oem_btn_cell"), sb_util.VISIBLE);
        }
    }

	function coverFreePlan(){
		$("#account-left-div").css("opacity", "0.5");
		$("#left_account_plan").css("text-decoration", "line-through");
		$("#left_account_plan").addClass("mhide");
	};

	function showTrailDaysCountDown(trialTimeLeft){
	 
	    var trialDaysLeft = Math.ceil(trialTimeLeft / 86400.0);
	    if (trialDaysLeft == 0) {
	    	return;
	        // $("#countdown_days").addClass("zero");
	    };

	    $("#account_countdown_days").text(trialDaysLeft.toString());
	    $("#account_trial_days_countdown").removeClass("mhide");
	    // $("#countdown_fortrial").removeClass("mhide");

	    if (trialDaysLeft <= 1) {
	        $("#account_countdown_txt_2").removeClass("mhide");
	    }else{
	        $("#account_countdown_txt_1").removeClass("mhide");
	    }
	};

	function showCampaignDaysCountDown(giftCodeTimeLeft){
	    var giftCodeDaysLeft = Math.ceil(giftCodeTimeLeft / 86400.0);

	    if (giftCodeDaysLeft == 0) {
	    	return;
	        // $("#countdown_days").addClass("zero");
	    };
	    
	    $("#account_countdown_days").text(giftCodeDaysLeft.toString());
	    $("#account_trial_days_countdown").removeClass("mhide");
	    
	    if (giftCodeDaysLeft <= 1) {
	        $("#account_countdown_txt_2").removeClass("mhide");
	    }else{
	        $("#account_countdown_txt_1").removeClass("mhide");
	    }
	}

	function changePriceButton(){

	    // if(m_price.substr(0,4) != "null" && y_price.substr(0,4) != "null" ){
        //
	    //     document.getElementById('mo_a').innerText = m_price;
	    //     document.getElementById('yr_a').innerText = y_price;
	    //     if($("#account_price_cell_txt").hasClass("mhide")){
	    //     	$("#account_price_cell_txt").removeClass("mhide");
	    //     }
	    //     $("#no_connection_gif").addClass("mhide");
	    // }
	    // else{
        //
	    //     if($("#no_connection_gif").hasClass("mhide")){
	    //     	$("#no_connection_gif").removeClass("mhide");
	    //     }
	    //     $("#account_price_cell_txt").addClass("mhide");
        //
	    // }


		if (DISCOUNT != "0" || EXTENSION != "0") {
			if (DISCOUNT != "0") {
				$("#promotion_info_detail").html(lan_subscription["promotion_info_detail_off_percent"].format(DISCOUNT));
				$("#promotion_dropdown_original_price_year").html(MP_PLAN_15_PRICE);
				$("#promotion_price").html(PROMOTION_PRICE);
				$("#promotion_choice_price_year").html(PROMOTION_PRICE);

				$("#promotion_dropdown_original_price").removeClass("mhide");
			}
			else {
				var extension_month = parseInt(EXTENSION);
				if (extension_month <= 1) {
					$("#promotion_info_detail").html(lan_subscription["promotion_info_detail_free_month"]);
					$("#promotion_dropdown_extension").html(lan_subscription["promotion_dropdown_extension_month"]);
				}
				else {
					$("#promotion_info_detail").html(lan_subscription["promotion_info_detail_free_months"].format(extension_month));
					$("#promotion_dropdown_extension").html(lan_subscription["promotion_dropdown_extension_months"].format(extension_month));
				}

				$("#promotion_price").html(MP_PLAN_15_PRICE);
				$("#promotion_choice_price_year").html(MP_PLAN_15_PRICE);

				$("#promotion_dropdown_extension").removeClass("mhide");
			}

			if (PROMOTION_DAY_LEFT != "0") {
				var day_left = parseInt(PROMOTION_DAY_LEFT);
				if (day_left <= 1) {
					$("#promotion_dropdown_dayleft").html(lan_subscription["promotion_dayleft"]);
				}
				else {
					$("#promotion_dropdown_dayleft").html(lan_subscription["promotion_daysleft"].format(day_left));
				}
			}

			$("#promotion_choice_price_month").html(MP_PLAN_14_PRICE);
		}
		else {
			$("#price_year").html(MP_PLAN_15_PRICE);
			$("#choice_price_year").html(MP_PLAN_15_PRICE);
			$("#choice_price_month").html(MP_PLAN_14_PRICE);
		}

		$(".price_symbol").text(MP_PLAN_14_SYMBOL);
	}
   
	//in - control the bahavior of the price button
	// $("#account-price-cell-btn").live("click",function(){
	//     //$("#account-price-cell-btn").css("display","none");
	//     $("#choice").css("display","block");
	//     //$("#choice").animate({left:'45px',top:'92px',width:'40px',height:'10px'},100)
	//     $("#choice").animate({left:'65px',top:'0px',width:'90px',height:'10px'},80);
	//     $("#choice").animate({left:'0px',top:'0px',width: ($("#account-price-cell").width()) +'px',height:'70px'},160);
	// });

	//out
	// $("body").click(hidePriceList);

	// function hidePriceList(){
	// 	if(parseInt($("#choice").css("height").split(".")[0])>=60){ // leave some questions
	//         $("#choice").animate({left:'65px',top:'10px',width:'90px',height:'10px'},160);
	//         $("#choice").animate({left:'89px',top:'10px',width:'40px',height:'10px'},80);
	//         setTimeout("changeDisplay()",160);
	//     }
	// };
    //
	// window.changeDisplay = function(){
	//     $("#choice").css("display","none");
	//     //$("#account-price-cell-btn").fadeIn(70);
	// };

	//change the position of the blue line under the tag
	function changeLinePos(){
	    var father_pos = $("#account-menu").offset().left;
	    var tag_1_pos = ($("#tag_1 h2").offset().left);
	    var tag_2_pos = ($("#tag_2 h2").offset().left);
	    var tag_3_pos = ($("#tag_3 h2").offset().left);
	    var tag_1_width = $("#tag_1 h2").width();
	    var tag_2_width = $("#tag_2 h2").width();
	    var tag_3_width = $("#tag_3 h2").width();
	    line_profile_pos = tag_1_pos - father_pos + (tag_1_width-40)/2;
	    line_assets_pos = tag_2_pos - father_pos + (tag_2_width-40)/2;
	    line_plan_pos = tag_3_pos - father_pos  + (tag_3_width-40)/2;
	    line_profile_pos_px = line_profile_pos + "px";
	    line_assets_pos_px = line_assets_pos + "px";
	    line_plan_pos_px = line_plan_pos + "px";
	}

	//determine the page displayed first
	function changeByPage(page){
	    // isMembership = (typeof isMembership === "undefined") ? true : false;
	    var l_page = page;
	    if(l_page == "profile"){
	        $("#tag_1").addClass("tag_active");
	        $("#tag_2").removeClass("tag_active");
	        $(".tag_line").css("left",line_profile_pos);
	        $("#account-content-2").css("left","640px");
	        $("#account-content-1").css("left","0px");
	        $("#account-content-3").css("left","640px");
	    }
	    else if(l_page == "assets"){
	        $("#tag_1").removeClass("tag_active");
	        $("#tag_2").addClass("tag_active");
	        $(".tag_line").css("left",line_assets_pos);
	        $("#account-content-2").css("left","0px");
	        $("#account-content-1").css("left","-640px");
	        $("#account-content-3").css("left","640px");
	    }
	    else if(l_page == "plan"){   
	        $("#tag_1").removeClass("tag_active");
	        $("#tag_3").addClass("tag_active");
	        $(".tag_line").css("left",line_plan_pos);
	        $("#account-content-2").css("left","-640px");
	        $("#account-content-1").css("left","-640px");
	        $("#account-content-3").css("left","0px");
	    }
	    else{
	        $("#tag_1").addClass("tag_active");
	        $(".tag_line").css("left",line_profile_pos);
	        $("#account-content-2").css("left","640px");
	        $("#account-content-1").css("left","0px");
	        $("#account-content-3").css("left","640px");
	    }
	}

	// need to reorganize
	function onTagClicked(){
	    //first, get id
	    var this_id=parseInt($(".tag_active").attr("id").split("_")[1]);
	    var next_id=parseInt($(this).attr("id").split("_")[1]);
	    //set content position
	    var content_list=$("#account-content-wrap").find(".account-content");
	    for(var i=0;i<content_list.length;i++){
	        //set z-index to zero;
	        $(content_list).eq(i).css("z-index","0");
	        //position
	        var this_content_id=parseInt(content_list.eq(i).attr("id").split("-")[2]);
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
	    if(next_id==1){
	        $(".tag_line").animate({left:line_profile_pos_px},400);
	        location.hash = ACCOUNT_PLAN_TAB;
	    }else if(next_id==2){
	        $(".tag_line").animate({left:line_assets_pos_px},400);
	    }else if(next_id==3){
	        $(".tag_line").animate({left:line_plan_pos_px},400);

	    }
	    //remove tag_active
	    $("#tag_"+this_id).removeClass("tag_active");
	    $("#tag_"+next_id).addClass("tag_active");
	}

	function loadJS(){
	    var mlocale = sb_util.getLocaleFolder(LOCALE);
	    sb_util.loadjscssfile("../lang/" + mlocale + "/lan_account.js", "js", "");
        sb_util.loadjscssfile("../lang/" + mlocale + "/lan_subscription.js", "js", "");

        if(OEM!=""){
            var oem = OEM;
            sb_util.loadjscssfile("../OEM/lang/" + mlocale + "/lan_account_oem.js", "js", "");
        }
	};

	function localizePage(){

	    $("#tag_1_txt").html(lan_account["tag_1_txt"]);
	    $("#tag_2_txt").html(lan_account["tag_2_txt"]);
	    $("#tag_3_txt").html(lan_account["tag_3_txt"]);

	    $("#account-login-out").html(lan_account["account-login-out"]);
	    $("#greeting_txt").html(lan_account["greeting_txt"]);
	    $("#account_title_email").html(lan_account["account_title_email"]);

	    $("#edit_btn").html(lan_account["edit_btn"]);
	    $("#account_title_membership").html(lan_account["account_title_membership"]);
	    MEMBERSHIP_PRO_TRIAL = lan_account["MEMBERSHIP_PRO_TRIAL"];
	    MEMBERSHIP_PRO_CAMPAIGN = lan_account["MEMBERSHIP_PRO_CAMPAIGN"];
	    MEMBERSHIP_PRO = lan_account["MEMBERSHIP_PRO"];
	    MEMBERSHIP_FREE = lan_account["MEMBERSHIP_FREE"];
	    MEMBERSHIP_PRO_MONTH = lan_account["MEMBERSHIP_PRO_MONTH"];
	    MEMBERSHIP_PRO_YEAR = lan_account["MEMBERSHIP_PRO_YEAR"];
	    MEMBERSHIP_PRO_OEM = lan_account["MEMBERSHIP_PRO_QUARTERLY"];

	    $("#account_title_validatedate").html(lan_account["account_title_validatedate"]);
	    $("#account_intro_free_id").html(lan_account["account_intro_free_id"]);
	    $("#free_feature_list_1").html(lan_account["free_feature_list_1"]);

	    $("#free_feature_list_2").html(lan_account["free_feature_list_2"]);
	    $("#free_feature_list_3").html(lan_account["free_feature_list_3"]);
	    $("#free_feature_list_4").html(lan_account["free_feature_list_4"]);
	    $("#free_feature_list_5").html(lan_account["free_feature_list_5"]);
	    // $("#left_current_plan").html(lan_account["left_current_plan"]);
		$("#left_account_plan").html(lan_account["left_current_plan"]);
	    $("#account_intro_pro_id").html(lan_account["account_intro_pro_id"]);
	    
	    $("#pro_feature_list_1").html(lan_account["pro_feature_list_1"]);
	    $("#pro_feature_list_2").html(lan_account["pro_feature_list_2"]);
	    $("#pro_feature_list_3").html(lan_account["pro_feature_list_3"]);
	    $("#pro_feature_list_4").html(lan_account["pro_feature_list_4"]);
	    $("#pro_feature_list_5").html(lan_account["pro_feature_list_5"]);
	    $("#pro_feature_list_6").html(lan_account["pro_feature_list_6"]);
	    $("#pro_feature_list_7").html(lan_account["pro_feature_list_7"]);
	    $("#pro_feature_list_8").html(lan_account["pro_feature_list_8"]);
	    $("#pro_feature_list_9").html(lan_account["pro_feature_list_9"]);
	    $("#pro_feature_list_10").html(lan_account["pro_feature_list_10"]);

	    // $("#account_learn_more").html(lan_account["account_learn_more"]);
	    $("#right_current_plan").html(lan_account["right_current_plan"]);
	    $("#account_expire_txt").html(lan_account["account_expire_txt"]);
	    // $("#account_activate_trial_btn_txt").html(lan_account["account_activate_trial_btn_txt"]);
	    $("#account_activate_trial_btn_txt_0").html(lan_account["account_activate_trial_btn_txt_0"]);
	    $("#account_activate_trial_btn_txt_2").html(lan_account["account_activate_trial_btn_txt_2"]);
	    // $("#countdown_txt_part1").html(lan_account["countdown_txt_part1"]);
	    // $("#countdown_txt_part1_1").html(lan_account["countdown_txt_part1_1"]);
	    // $("#countdown_txt_part1_2").html(lan_account["countdown_txt_part1_2"]);
	    // $("#countdown_fortrial").html(lan_account["countdown_fortrial"]);
	    // $("#account_price_cell_txt").html(lan_account["account_price_cell_txt"]);
		$("#account_countdown_txt_1").html(lan_account["account_countdown_txt_1"]);
		$("#account_countdown_txt_2").html(lan_account["account_countdown_txt_2"]);


	    $("#trial_activated_header").html(lan_account["trial_activated_header"]);
	    $("#trial_activated_failed_header").html(lan_account["trial_activated_failed_header"]);
	    // $("#trial_activated_txt").html(lan_account["trial_activated_txt"]);
	    $("#trial_validated_success_txt_1").html(lan_account["trial_validated_success_txt_1"]);
	    $("#trial_validated_success_txt_2").html(lan_account["trial_validated_success_txt_2"]);
	    $("#trial_not_activated_same_machine_txt").html(lan_account["trial_not_activated_same_machine_txt"]);

	    $("#trial_not_activated_expired_txt").html(lan_account["trial_not_activated_expired_txt"]);
	    $("#trial_not_activated_try_again_txt").html(lan_account["trial_not_activated_try_again_txt"]);
	    $("#ok_btn").html(lan_account["ok_btn"]);

	    // $("#forjs_mo").html(lan_account["forjs_mo"]);
	    // $("#forjs_yr").html(lan_account["forjs_yr"]);

	    $("#account_mas_buy_btn_txt").html(lan_account["account_mas_buy_btn_txt"]);
	    $("#account_mas_trial_btn_txt").html(lan_account["account_mas_trial_btn_txt"]);


		//title
		$("#price-title-free").html(lan_account["price-title-free"]);
		$("#price-title-pro").html(lan_account["price-title-pro"]);


		//new buy button
		$("#price_year_txt").html(lan_subscription["price_year_txt"]);
		$("#choice_price_year_txt").html(lan_subscription["price_year_txt"]);
		$("#choice_price_month_txt").html(lan_subscription["price_month_txt"]);

		//promotion buy button
		$("#promotion_info_title").html(lan_subscription["promotion_info_title_sale"]);
		$("#promotion_price_year_txt").html(lan_subscription["price_year_txt"]);
		$("#promotion_dropdown_title").html(lan_subscription["promotion_info_title_sale"]);
		$("#promotion_choice_price_year_txt").html(lan_subscription["price_year_txt"]);
		$("#promotion_choice_price_month_txt").html(lan_subscription["price_month_txt"]);


        if(OEM!=""){
            $("#account_activate_oem_txt").html(lan_account_oem["account_activate_oem_txt"]);
        }
	};

	// function localizePrice(){
	// 	var abb_month = document.getElementById('forjs_mo').innerText;
	//     var abb_year = document.getElementById('forjs_yr').innerText;
	//     m_price = MP_PLAN_14 + abb_month;
	//     y_price = MP_PLAN_15 + abb_year ;
	// }


	//in - control the behavior of the dropdown list
	$("#promotion_buy_btn_down").click(function(){
		$("#promotion_buy_choice").css("display", "block");
		$("#promotion_buy_choice").animate({left:($("#promotion_btn_area").width()/2-45)+'px', top:'0px', width:'90px', height:'10px'}, 80);
		$("#promotion_buy_choice").animate({left:'0px', top:'0px', width: ($("#promotion_btn_area").width()) +'px', height: '85px'}, 160);
	});

	$("#new_buy_btn_down").click(function () {
		$("#new_buy_choice").css("display", "block");
		$("#new_buy_choice").animate({left:($("#new_buy_btn_area").width()/2-45)+'px', top:'0px', width:'90px', height:'10px'}, 80);
		$("#new_buy_choice").animate({left:'0px', top:'0px', width: ($("#new_buy_btn_area").width()) +'px', height: '85px'}, 160);
	});

	//out
	$("body").click(function () {
		if(parseInt($("#promotion_buy_choice").css("height").split(".")[0])>=60){
			$("#promotion_buy_choice").animate({left:($("#promotion_btn_area").width()/2-45)+'px',top:'10px',width:'90px',height:'10px'},160);
			$("#promotion_buy_choice").animate({left:($("#promotion_btn_area").width()/2-20)+'px',top:'10px',width:'40px',height:'10px'},80);
			setTimeout("changeDisplay()",160);
		}
		if(parseInt($("#new_buy_choice").css("height").split(".")[0])>=60){
			$("#new_buy_choice").animate({left:($("#new_buy_btn_area").width()/2-45)+'px',top:'10px',width:'90px',height:'10px'},160);
			$("#new_buy_choice").animate({left:($("#new_buy_btn_area").width()/2-20)+'px',top:'10px',width:'40px',height:'10px'},80);
			setTimeout("changeDisplay()",160);
		}
	});

	window.changeDisplay = function(){
		$("#promotion_buy_choice").css("display","none");
		$("#new_buy_choice").css("display","none");
	};


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
// SIG // whE7k97pO/ua1KtbGbIUEtO+mD3tUgbucyXZTAFYJhyg
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
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgbdAoLvex
// SIG // ffOyays8E6+kvnw20AOeS2FvQqVFMNRNt98wDQYJKoZI
// SIG // hvcNAQEBBQAEggEAAZC4XuZQGa/BMWUv43e2M1DvRIuS
// SIG // tIKgpzRkKaq369l0DgtOBkKVJpaIxBjfhjWAeo0wSjFJ
// SIG // N4/9mQ6A5oIWIFOl/XWBwIs0Wpb31MfZnzFg3yREGW98
// SIG // 7rC50bib7QGFIwmTqWKfPGzLQswpMtHM8EhgxC80EG3B
// SIG // FXfWU6/h+tfQCe9PRXdYO9xaIEZB4XSQQJIXyyI+FI1I
// SIG // pse9F+/IKVIwloMeQebAYIh9lffZX+HJpsdiKnEfFw3S
// SIG // GHmghyyYtiVHqq2AuX/VyMviMCaIqSiX9AMZG7JP+JAR
// SIG // a8vRz4Erh0Pr5xI44gWzTyGLBT/TbsNqh0pBmpS5ibN7
// SIG // 3ULGW6GCE20wghNpBgorBgEEAYI3AwMBMYITWTCCE1UG
// SIG // CSqGSIb3DQEHAqCCE0YwghNCAgEDMQ8wDQYJYIZIAWUD
// SIG // BAIBBQAwggEMBgsqhkiG9w0BCRABBKCB/ASB+TCB9gIB
// SIG // AQYKKwYBBAGyMQIBATAxMA0GCWCGSAFlAwQCAQUABCCT
// SIG // br39AWhacAnC6i2ABKXlPBKi1PTTF2rQ98tDTVf34AIU
// SIG // a7xICADXRcwN8wy9YkZP2fbHvvMYDzIwMTkxMTEyMTg0
// SIG // NTIyWqCBiqSBhzCBhDELMAkGA1UEBhMCR0IxGzAZBgNV
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
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xOTExMTIxODQ1
// SIG // MjJaMC8GCSqGSIb3DQEJBDEiBCB+/7dDY7TVG15jeT1F
// SIG // eiNPyR6uIWJI5TFKqYkK2tgslDCB7QYLKoZIhvcNAQkQ
// SIG // Agwxgd0wgdowgdcwFgQUJcisc05IULf42RORqBuSSTZl
// SIG // n2EwgbwEFALWW5Xig3DBVwCV+oj5I92Tf62PMIGjMIGO
// SIG // pIGLMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKTmV3
// SIG // IEplcnNleTEUMBIGA1UEBxMLSmVyc2V5IENpdHkxHjAc
// SIG // BgNVBAoTFVRoZSBVU0VSVFJVU1QgTmV0d29yazEuMCwG
// SIG // A1UEAxMlVVNFUlRydXN0IFJTQSBDZXJ0aWZpY2F0aW9u
// SIG // IEF1dGhvcml0eQIQMA9vrN1mmHR8qUY2p3gtuTANBgkq
// SIG // hkiG9w0BAQEFAASCAgCYQtrSIvQN5ihAAAPruu7WAbxq
// SIG // ROiwtS6VmLdW+Ys+zNGHuTSR5ZbflFAWMpsVoNjrKjwA
// SIG // xdk7emWsvXQfuWTnIOTzlDmZnmslakXxbAbeKE0TYq3t
// SIG // r5I8t+i2F0pMSICt0RoRo79Xvv5Y9Cztj0Ko2Hy/sC/H
// SIG // AmYxOjVAqOLq1wTzA7PB1TLFrA+mI5XgnqVmYaA1Smw7
// SIG // 8d4PBiJw6WlJ/uwAo3ziPIWcSwV4P/kl3ft2QfDh4DzF
// SIG // MQ5pGTu6qdkqxRrYXYPV2mT/CKtONR9qYGg9DSq8e9Ne
// SIG // o/1EA8wh88MkC7iDNO0skV9gpIkm/V/GOmYrqNN2oHdp
// SIG // 2iQD4qS09p77BvmYZaRKkHBjFOhsvp1mf9JKgy7NL1xd
// SIG // UMkFaOdiJ3s48UuUaj11nC8xp/2cTSspXeHmT1u43cAx
// SIG // y4fI4XTQMLw0bKJJoCxgOVDxU9vGdEPBQkWKqdYd+siM
// SIG // 1eMoxrR/uZt+2D/G3KifceLQ88AeUWIOyW+juhK2bt2P
// SIG // 2xwWyG7dlxJaNY9ESx8wF2tU7Bif9pz/U8fTJyWM2lLE
// SIG // zQTte+ZAbpmrUzSIITqzPNTGeA15v4p4TspA65KV/GrO
// SIG // UpTUl1uuY5jd6goJSu0DumKbOa52e2gz7MUo511ccdGd
// SIG // eeFptcM7wP4qVH0idvIvP5Fj7+gltXmEyyxbeZgm4Q==
// SIG // End signature block
