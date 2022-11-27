// buynow.js is dependent on buyNowModule.js
loadJS();

window.onload=function(){
    $.support.cors = true;
    // loadJS();
    localizePage();
    setSize();

    var xafc = urlParseModule.getURLParameter("afc");
    var xsession = urlParseModule.getURLParameter("session");
    var xsecsession = urlParseModule.getURLParameter("secure_session");
    var xplanid = urlParseModule.getURLParameter("plan_id");
    // Change api calling server address according to version.
    var xurl = urlParseModule.getURLParameter("trans_server_url");
    var xlocale = urlParseModule.getURLParameter("locale");
    xlocale = xlocale.replace("-", "_");
    // var addressCode = urlParseModule.getURLParameter("address_code") ? urlParseModule.getURLParameter("address_code") : "US";
    // var xlang = xlocale.split("_")[0] + "_" + addressCode;


    // getBuynowPage();
    $.ajax({
        url: xurl + '/API/v1/Member?locale='+xlocale,
        type: 'PUT',
        dataType: 'json',
        success: getBuynowPage,
        error: buyNowErrorCallback,
        headers: {
            "X-AFC" : xafc,
            "X-Session" : xsession,
            "X-Secure-Session" : xsecsession
        }

    });
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var handleMessage = function(event) {
    if (!event) return false

    var parser = document.createElement("a");
    parser.href = event.origin;

    switch (event.data) {
        case "iframe-ready":
            var win = document.getElementById("buyframe").contentWindow;
            var xcoupon = urlParseModule.getURLParameter("coupon") || urlParseModule.getURLParameter("code");
            win.postMessage(JSON.stringify({
                name: "init-page",
                coupon_code: xcoupon
            }), "*");
            break;
        case "scroll-to-top":
            typeof window.scrollTo === "function" && window.scrollTo(0, 0);
            break;
        case "coupon-show-link":
            window.location.href = "sketchbook://banner/event?type=clicked&id=promo-code";
            break;
        case "coupon-apply-start":
            window.location.href = "sketchbook://banner/event?type=clicked&id=promo-code-apply";
            break;
        case "coupon-apply-done":
            window.location.href = "sketchbook://banner/event?type=others&id=promo-code-success";
            break;
    }

    if (parser.hostname.endsWith(".squidplatform.com") || parser.hostname.endsWith(".123dapp.com") || parser.hostname.endsWith(".acg.autodesk.com")) {
      if (Object == event.data.constructor) {
        if ("mixpanel.track" == event.data["eventType"]) {
          var eventName = event.data["eventName"];
          var eventProperties = {};
          var propertyName = event.data["propertyName"];
          if (propertyName) {
            var propertyValue = event.data["propertyValue"];
            if ("@monthOrYear" == propertyValue) {
              propertyValue = "month";
            }
            eventProperties[propertyName] = propertyValue;
          }
          if(eventName === "confirm billing address"){
            window.location.href = "sketchbook://banner/event?type=clicked&id=confirm-billing-address";
          }
        }
      }
    }
}

if (window.addEventListener) {
    window.addEventListener("message", handleMessage, false);
} else {
    window.attachEvent("message", handleMessage);
}

function getBuynowPage(){
    var xafc = urlParseModule.getURLParameter("afc");
    var xsession = urlParseModule.getURLParameter("session");
    var xsecsession = urlParseModule.getURLParameter("secure_session");
    var xplanid = urlParseModule.getURLParameter("plan_id");
    // Change api calling server address according to version.
    var xurl = urlParseModule.getURLParameter("trans_server_url");
    buyNowModule.buynow(xurl, xplanid, xafc, xsession, xsecsession, buyNowSuccessCallback, buyNowErrorCallback);
}

function loadJS(){
    var locale = urlParseModule.getURLParameter("locale") ? urlParseModule.getURLParameter("locale") : 'en-us';
    // locale = locale.toLowerCase();
    locale = sb_util.getLocaleFolder(locale);
    sb_util.loadjscssfile("../lang/" + locale + "/lan_buynow.js", "js", localizePage);
};

function localizePage(){
    $("#apply_button").text(lan_buynow["apply_button"]);
    $("#code_success").text(lan_buynow["code_success"]);
    $("#code_fail").text(lan_buynow["code_fail"]);
    $("#buynow_1").text(lan_buynow["buynow_1"]);
};

function setSize(){
    var height = window.innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.body.style.height = height + "px";
    $("#s_content_short").height(height);

};

function hideFrame(){
    if(!$('#buyframe').hasClass('mhide')){
        $("#buyframe").addClass('mhide');
    }
};

function showLoading(){
    if($('#div_loading').hasClass('mhide')){
        $('#div_loading').removeClass('mhide');
    }
};

function buyNowSuccessCallback(data) {
    var buynowurl = data.BUYNOW_URL + "&in_app=true&t=SKETCH_4";
    $('#s_content_short').append("<iframe id='buyframe' class='mhide' frameBorder='0' onload='showFrame();' src='" + buynowurl +"'></iframe>");
    $("#buyframe").height($("#s_content_short").height());
};

function buyNowErrorCallback(jqXHR, textStatus, errorThrown) {
    // console.dir(textStatus);
    var locale = urlParseModule.getURLParameter("locale") ? urlParseModule.getURLParameter("locale") : 'en-us';
    var folder = "html";
    if (jqXHR.status === 0) {
        // console.log('Not connect.\n Verify Network.');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_internet.html?locale=" + locale + "'></iframe>");
    } else if (jqXHR.status == 404) {
        // console.log('Requested page not found. [404]');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_server.html?locale=" + locale + "'></iframe>");
    } else if (jqXHR.status == 500) {
        // console.log('Internal Server Error [500].');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_server.html?locale=" + locale + "'></iframe>");
    } else if (textStatus === 'parsererror') {
        // console.log('Requested JSON parse failed.');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_server.html?locale=" + locale + "'></iframe>");
    } else if (textStatus === 'timeout') {
        // console.log('Time out error.');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_server.html?locale=" + locale + "'></iframe>");
    } else if (textStatus === 'abort') {
        // console.log('Ajax request aborted.');
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_server.html?locale=" + locale + "'></iframe>");
    } else {
        // console.log("error");
        $('#s_content_short').append("<iframe id='no_internet_frame' class='mhide' frameBorder='0' scrolling='no' onload='showNoInternetFrame();' src='../" + folder + "/fail_internet.html?locale=" + locale + "'></iframe>");
    }

};

function showFrame(){
    // console.log("iframe onload");
    if(!$('#div_loading').hasClass('mhide')){
        $('#div_loading').addClass('mhide');
    }
    // $('#loadingImg').css('visibility','hidden');
    if($('#buyframe').hasClass('mhide')){
        $("#buyframe").removeClass('mhide');
    }
};

function showNoInternetFrame(){
    if(!$('#div_loading').hasClass('mhide')){
        $('#div_loading').addClass('mhide');
    }
    if($('#no_internet_frame').hasClass('mhide')){
        $("#no_internet_frame").removeClass('mhide');
    }
};

function OnImageLoad(evt)
{
    $("#loadingImg").height($("#div_loading").height());
    $("#loadingImg").css('visibility', 'visible');
};


// SIG // Begin signature block
// SIG // MIIZfQYJKoZIhvcNAQcCoIIZbjCCGWoCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // wVKoaPwGoEXA6gEZbAB5kpJdIAh6KTNwaSIbQFoILcWg
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
// SIG // nGdukAsak3HUJgLDwFojMYIOuzCCDrcCAQEwgZkwgYQx
// SIG // CzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBD
// SIG // b3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1
// SIG // c3QgTmV0d29yazE1MDMGA1UEAxMsU3ltYW50ZWMgQ2xh
// SIG // c3MgMyBTSEEyNTYgQ29kZSBTaWduaW5nIENBIC0gRzIC
// SIG // EAkI2uucBh4uubp+Jqpih4owDQYJYIZIAWUDBAIBBQCg
// SIG // fDAQBgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMx
// SIG // DAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYK
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgAnysDsUE
// SIG // 6hzdzakZXKmOLAP2Il3ECNPJgYF0BXtcH1owDQYJKoZI
// SIG // hvcNAQEBBQAEggEAJ0TTj+MIV4eiFQFUMacKvFkOBe9F
// SIG // LdV+iV09Cd7lTxRbs1XGuxre1TMJ5uKdFEUMXAlt+xVL
// SIG // d0Ru+4VjReKYBbpl5C3tJMz7bWuogzVVSb8sZfp22iM/
// SIG // ptkEf4GZjdiZkWSXDPHQh4a0mD6MTKzMNqMepGZnWaYr
// SIG // COYxyizKNYWqb+a+5QEB9jptrJpEO/tp1km2wWliuPB1
// SIG // aWucp4mS+VrN3pa6Q8dM0oSJ7G49dhqYtABeMLMTtgjk
// SIG // gSBLy2wkWPHuATABlREnq+YlZLA4ntOdPo+KwwN6a+Us
// SIG // 3xVBYpikN7YbFq2P+v0QPtiMEwqCFtlnMazAsqM3EqtZ
// SIG // UL+HrqGCDHQwggxwBgorBgEEAYI3AwMBMYIMYDCCDFwG
// SIG // CSqGSIb3DQEHAqCCDE0wggxJAgEDMQ8wDQYJYIZIAWUD
// SIG // BAIBBQAwga8GCyqGSIb3DQEJEAEEoIGfBIGcMIGZAgEB
// SIG // BgkrBgEEAaAyAgMwMTANBglghkgBZQMEAgEFAAQgqCjc
// SIG // 5WgYczk4dwK126gxKL/ifBTYXL6Sko6iAUYCjSwCFGe2
// SIG // BPxV3FCNZvmNrAU+VD8i70GUGA8yMDE5MTExMjE4NDMz
// SIG // NVqgL6QtMCsxKTAnBgNVBAMMIEdsb2JhbFNpZ24gVFNB
// SIG // IGZvciBBZHZhbmNlZCAtIEcyoIII0zCCBLYwggOeoAMC
// SIG // AQICDAynz10HBySsieeaOjANBgkqhkiG9w0BAQsFADBb
// SIG // MQswCQYDVQQGEwJCRTEZMBcGA1UEChMQR2xvYmFsU2ln
// SIG // biBudi1zYTExMC8GA1UEAxMoR2xvYmFsU2lnbiBUaW1l
// SIG // c3RhbXBpbmcgQ0EgLSBTSEEyNTYgLSBHMjAeFw0xODAy
// SIG // MTkwMDAwMDBaFw0yOTAzMTgxMDAwMDBaMCsxKTAnBgNV
// SIG // BAMMIEdsb2JhbFNpZ24gVFNBIGZvciBBZHZhbmNlZCAt
// SIG // IEcyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
// SIG // AQEAt8eSiijY85HLUA1d6ylEwYJZpcpkzr2DtVHllMxu
// SIG // gJoXbNz/YuY2Q14Bwgxkjcp3nvZdd0W5Xsgk60E3EWY3
// SIG // rMjNdJvMs+9M4n8bznO+yZadNR5891T3bOygEtaumZ1j
// SIG // xHhfWakuIvXDJ9iyW0VjJ5D/jLE9qbTzDsDxIGUGiZ0D
// SIG // HKOwUkGFNOu8y85U9hL+swGJSqb6VMUf+9McwOO/l+M/
// SIG // 0Bv5QMcb1esmfEMwx3DyeBGqhU6lDg0ASjoRd6PKIwGA
// SIG // nsiTVl1GzIrY0qoKhIWyiVvVMs5BexhOVMqr0VJeEtMk
// SIG // nlbzDI/dvZKOedVBicOjoOWR/MdnnYczznEycwIDAQAB
// SIG // o4IBqDCCAaQwDgYDVR0PAQH/BAQDAgeAMEwGA1UdIARF
// SIG // MEMwQQYJKwYBBAGgMgEeMDQwMgYIKwYBBQUHAgEWJmh0
// SIG // dHBzOi8vd3d3Lmdsb2JhbHNpZ24uY29tL3JlcG9zaXRv
// SIG // cnkvMAkGA1UdEwQCMAAwFgYDVR0lAQH/BAwwCgYIKwYB
// SIG // BQUHAwgwRgYDVR0fBD8wPTA7oDmgN4Y1aHR0cDovL2Ny
// SIG // bC5nbG9iYWxzaWduLmNvbS9ncy9nc3RpbWVzdGFtcGlu
// SIG // Z3NoYTJnMi5jcmwwgZgGCCsGAQUFBwEBBIGLMIGIMEgG
// SIG // CCsGAQUFBzAChjxodHRwOi8vc2VjdXJlLmdsb2JhbHNp
// SIG // Z24uY29tL2NhY2VydC9nc3RpbWVzdGFtcGluZ3NoYTJn
// SIG // Mi5jcnQwPAYIKwYBBQUHMAGGMGh0dHA6Ly9vY3NwMi5n
// SIG // bG9iYWxzaWduLmNvbS9nc3RpbWVzdGFtcGluZ3NoYTJn
// SIG // MjAdBgNVHQ4EFgQULW5u0Y3lA4Du52Ppp9naCzxXIj0w
// SIG // HwYDVR0jBBgwFoAUkiGnSpVdZLCbtB7mADdH5p1BK0ww
// SIG // DQYJKoZIhvcNAQELBQADggEBAI39HR+PiNNl+LVcRumn
// SIG // 07Y/SstDBcIHDcNeA4QjN6h6jJcj/yechH1h61xLVz6b
// SIG // 9ETbgFj3tmXejxIKX6eHdLfaFECHUeyfSkdV8BfoGD5x
// SIG // IDHmKCKrTvaunGvC50T7aA0gf1M/lBuhhoJOMhYQWj+J
// SIG // WMHQtNu2kPuNMumhS0ZQN7bDOukpJBKSWk4rubYKejaM
// SIG // l8DviXwz3jHhoZfk50WtYVL9WonTVH6KTVuJew6Wd9Hy
// SIG // PDgb2vmlYSBlArzFrdcMYhAoLN2246hhAKwIJqONhdBk
// SIG // yTaQHopSyYeNNaVdSJH8k6alZfHs+TrcpSyeBG1iM/7e
// SIG // +p/Fzq+V81Go8s4wggQVMIIC/aADAgECAgsEAAAAAAEx
// SIG // icZQBDANBgkqhkiG9w0BAQsFADBMMSAwHgYDVQQLExdH
// SIG // bG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMK
// SIG // R2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAe
// SIG // Fw0xMTA4MDIxMDAwMDBaFw0yOTAzMjkxMDAwMDBaMFsx
// SIG // CzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
// SIG // IG52LXNhMTEwLwYDVQQDEyhHbG9iYWxTaWduIFRpbWVz
// SIG // dGFtcGluZyBDQSAtIFNIQTI1NiAtIEcyMIIBIjANBgkq
// SIG // hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqpuOw6sRUSUB
// SIG // tpaU4k/YwQj2RiPZRcWVl1urGr/SbFfJMwYfoA/GPH5T
// SIG // SHq/nYeer+7DjEfhQuzj46FKbAwXxKbBuc1b8R5EiY7+
// SIG // C94hWBPuTcjFZwscsrPxNHaRossHbTfFoEcmAhWkkJGp
// SIG // eZ7X61edK3wi2BTX8QceeCI2a3d5r6/5f45O4bUIMf3q
// SIG // 7UtxYowj8QM5j0R5tnYDV56tLwhG3NKMvPSOdM7IaGlR
// SIG // dhGLD10kWxlUPSbMQI2CJxtZIH1Z9pOAjvgqOP1roEBl
// SIG // H1d2zFuOBE8sqNuEUBNPxtyLufjdaUyI65x7MCb8eli7
// SIG // WbwUcpKBV7d2ydiACoBuCQIDAQABo4HoMIHlMA4GA1Ud
// SIG // DwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0G
// SIG // A1UdDgQWBBSSIadKlV1ksJu0HuYAN0fmnUErTDBHBgNV
// SIG // HSAEQDA+MDwGBFUdIAAwNDAyBggrBgEFBQcCARYmaHR0
// SIG // cHM6Ly93d3cuZ2xvYmFsc2lnbi5jb20vcmVwb3NpdG9y
// SIG // eS8wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2NybC5n
// SIG // bG9iYWxzaWduLm5ldC9yb290LXIzLmNybDAfBgNVHSME
// SIG // GDAWgBSP8Et/qC5FJK5NUPpjmove4t0bvDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAQEABFaCSnzQzsm/NmbRvjWek2yX6AbO
// SIG // MRhZ+WxBX4AuwEIluBjH/NSxN8RooM8oagN0S2OXhXdh
// SIG // O9cv4/W9M6KSfREfnops7yyw9GKNNnPRFjbxvF7stICY
// SIG // ePzSdnno4SGU4B/EouGqZ9uznHPlQCLPOc7b5neVp7uy
// SIG // y/YZhp2fyNSYBbJxb051rvE9ZGo7Xk5GpipdCJLxo/Md
// SIG // dL9iDSOMXCo4ldLA1c3PiNofKLW6gWlkKrWmotVzr9xG
// SIG // 2wSukdduxZi61EfEVnSAR3hYjL7vK/3sbL/RlPe/UOB7
// SIG // 4JD9IBh4GCJdCC6MHKCX8x2ZfaOdkdMGRE4EbnocIOM2
// SIG // 8LZQuTGCAqgwggKkAgEBMGswWzELMAkGA1UEBhMCQkUx
// SIG // GTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExMTAvBgNV
// SIG // BAMTKEdsb2JhbFNpZ24gVGltZXN0YW1waW5nIENBIC0g
// SIG // U0hBMjU2IC0gRzICDAynz10HBySsieeaOjANBglghkgB
// SIG // ZQMEAgEFAKCCAQ4wGgYJKoZIhvcNAQkDMQ0GCyqGSIb3
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xOTExMTIxODQz
// SIG // MzVaMC8GCSqGSIb3DQEJBDEiBCDFUlOq2WBmoXzf6drU
// SIG // xKixnpxcrKLBgZeJW6L3DEj7ZzCBoAYLKoZIhvcNAQkQ
// SIG // AgwxgZAwgY0wgYowgYcEFJsSBXrnKq/21jdytJ9qI28m
// SIG // Sc2pMG8wX6RdMFsxCzAJBgNVBAYTAkJFMRkwFwYDVQQK
// SIG // ExBHbG9iYWxTaWduIG52LXNhMTEwLwYDVQQDEyhHbG9i
// SIG // YWxTaWduIFRpbWVzdGFtcGluZyBDQSAtIFNIQTI1NiAt
// SIG // IEcyAgwMp89dBwckrInnmjowDQYJKoZIhvcNAQEBBQAE
// SIG // ggEAPLr7WJxIL1GLF035hmd+ysUdk6RoX3SIL5uo2D+Q
// SIG // rxK6/gO2GDIgsc9rG7mPpCmzqb8kMBX8cibZCqgybJ2d
// SIG // ktQ+IXvRF0IRCeroH0IqNtuFAVamRbJHgaWnxMNZdQxy
// SIG // hMBYoxiJDY37ijQlOqiozmtogIZc39XsWvXhP+7tE5l6
// SIG // oC78vxBF5JchH18hhJ26aUa/L78CxxbqQoals2t/gzJO
// SIG // IQuGpYtYv1Ws3pAVvGWDm/hDpVME5tQvUVMfJG1UWE5x
// SIG // VNhh+zyqwA9+0BcPB2OP9HQNuva4bK+0JUw/acLmOeJr
// SIG // PHyvFiJouFBYUoizCvWRSPR0zrcL5s1z3EYZ7Q==
// SIG // End signature block
