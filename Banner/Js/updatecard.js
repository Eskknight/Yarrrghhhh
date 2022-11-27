(function () {
    var xafc = urlParseModule.getURLParameter("afc");
    var xsession = urlParseModule.getURLParameter("session");
    var xsecsession = urlParseModule.getURLParameter("secure_session");
    var xplanid = urlParseModule.getURLParameter("plan_id");
    // Change api calling server address according to version.
    var xurl = urlParseModule.getURLParameter("trans_server_url");
    var locale = urlParseModule.getURLParameter("locale");
    var xlocale = locale.replace("-", "_");

    window.onload = function () {
        $.support.cors = true;
        setSize();

        $.ajax({
            url: xurl + '/API/v1/Member?locale='+xlocale,
            type: 'PUT',
            dataType: 'json',
            headers: {
                "X-AFC" : xafc,
                "X-Session" : xsession,
                "X-Secure-Session" : xsecsession
            }
        })
        .then(getUpdateCardPage)
        .done(handleUpdateCardSuccess)
        .fail(handleUpdateCardError);
    }

    function getUpdateCardPage() {
        return $.ajax({
            url: xurl + '/API/v1/Member/Updatecard',
            type: 'GET',
            data: {
                product_id: xplanid
            },
            headers: {
                "X-AFC" : xafc,
                "X-Session" : xsession,
                "X-Secure-Session" : xsecsession
            }
        });
    }

    function handleUpdateCardSuccess(data) {
        var updatecardurl = data.UPDATECARD_URL + "&in_app=true&t=SKETCH_4";
        $('#s_content_short').append("<iframe id='buyframe' class='mhide' frameBorder='0' onload='showFrame();' src='" + updatecardurl +"'></iframe>");
        $("#buyframe").height($("#s_content_short").height());
    }

    function handleUpdateCardError(jqXHR, textStatus, errorThrown) {
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
        return false;
    }

    if (window.addEventListener) {
        window.addEventListener("message", handleMessage, false);
    } else {
        window.attachEvent("message", handleMessage);
    }

    function handleMessage(event) {
        if (!event) return false

        var eventName = '';
        try {
            eventName = JSON.parse(event.data)['name']
        } catch(err) {}

        switch (eventName) {
            case "scroll-to-top":
                typeof window.scrollTo === "function" && window.scrollTo(0, 0);
                break;
            case "updatecard-done":
            case "updatecard-fail":
            case "updatecard-cancel":
                window.top.location = 'sketchbook://banner/' + eventName;
                break;
        }
    }
})();

function showFrame() {
    // console.log("iframe onload");
    if(!$('#div_loading').hasClass('mhide')){
        $('#div_loading').addClass('mhide');
    }
    // $('#loadingImg').css('visibility','hidden');
    if($('#buyframe').hasClass('mhide')){
        $("#buyframe").removeClass('mhide');
    }
}

function hideFrame() {
    if(!$('#buyframe').hasClass('mhide')){
        $("#buyframe").addClass('mhide');
    }
}

function showLoading() {
    if($('#div_loading').hasClass('mhide')){
        $('#div_loading').removeClass('mhide');
    }
}

function showNoInternetFrame() {
    if(!$('#div_loading').hasClass('mhide')){
        $('#div_loading').addClass('mhide');
    }
    if($('#no_internet_frame').hasClass('mhide')){
        $("#no_internet_frame").removeClass('mhide');
    }
}

function setSize() {
    var height = window.innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    document.body.style.height = height + "px";
    $("#s_content_short").height(height);
}

function OnImageLoad(evt) {
    $("#loadingImg").height($("#div_loading").height());
    $("#loadingImg").css('visibility', 'visible');
}

// SIG // Begin signature block
// SIG // MIIbRgYJKoZIhvcNAQcCoIIbNzCCGzMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // D5F2oSxydMnjl0vQtuNuZYCBLQ7crtHHytKKszTWdnyg
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
// SIG // nGdukAsak3HUJgLDwFojMYIQhDCCEIACAQEwgZkwgYQx
// SIG // CzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBD
// SIG // b3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1
// SIG // c3QgTmV0d29yazE1MDMGA1UEAxMsU3ltYW50ZWMgQ2xh
// SIG // c3MgMyBTSEEyNTYgQ29kZSBTaWduaW5nIENBIC0gRzIC
// SIG // EAkI2uucBh4uubp+Jqpih4owDQYJYIZIAWUDBAIBBQCg
// SIG // fDAQBgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMx
// SIG // DAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYK
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgQdEm08tW
// SIG // ooVOLHJgSK/SGSfsYh87pcxyExr14aVf8A8wDQYJKoZI
// SIG // hvcNAQEBBQAEggEAM6s2FmbAYdKm8Jnh6Fst0fBOay+B
// SIG // xgbUFKtmcELAICGP/GNujwdNyh7xpqZvqsxae3nGo1YS
// SIG // u3oW9rOfrl+KfjqXbMIXHx48RgvF9DaZ73pfYWSsz5WP
// SIG // xo5Jg7ut9UzbeANPd58Dh+nmT2QvBDkMZwqS0fTNsNx9
// SIG // 1n4W6p6W0Y75IF9GERsHaUBkhgWlfuiOIHBR6YBvS6l+
// SIG // 10+/e1OnZRi7vgDkoZA18/KtwfI08ri7h8Wj3Ln10Xbf
// SIG // 3WHjYq4b2rU5fsKGNRtdQODn24vusCXxwJV3nCAVFRNS
// SIG // zJ034xwG0LTtHu8aSPtzHV1ndtMTE2sYcdyuHQ5irBVi
// SIG // VQue/KGCDj0wgg45BgorBgEEAYI3AwMBMYIOKTCCDiUG
// SIG // CSqGSIb3DQEHAqCCDhYwgg4SAgEDMQ0wCwYJYIZIAWUD
// SIG // BAIBMIIBDwYLKoZIhvcNAQkQAQSggf8EgfwwgfkCAQEG
// SIG // C2CGSAGG+EUBBxcDMDEwDQYJYIZIAWUDBAIBBQAEIKNz
// SIG // jRi+Ro1FtJkMAZemzZgHXQb8wk2uilzrPttdLY6pAhUA
// SIG // paLA4GiL5aqUj4P40k15qVmodlgYDzIwMTkxMTEyMTg0
// SIG // NDA2WjADAgEeoIGGpIGDMIGAMQswCQYDVQQGEwJVUzEd
// SIG // MBsGA1UEChMUU3ltYW50ZWMgQ29ycG9yYXRpb24xHzAd
// SIG // BgNVBAsTFlN5bWFudGVjIFRydXN0IE5ldHdvcmsxMTAv
// SIG // BgNVBAMTKFN5bWFudGVjIFNIQTI1NiBUaW1lU3RhbXBp
// SIG // bmcgU2lnbmVyIC0gRzOgggqLMIIFODCCBCCgAwIBAgIQ
// SIG // ewWx1EloUUT3yYnSnBmdEjANBgkqhkiG9w0BAQsFADCB
// SIG // vTELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWdu
// SIG // LCBJbmMuMR8wHQYDVQQLExZWZXJpU2lnbiBUcnVzdCBO
// SIG // ZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwOCBWZXJpU2ln
// SIG // biwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5
// SIG // MTgwNgYDVQQDEy9WZXJpU2lnbiBVbml2ZXJzYWwgUm9v
// SIG // dCBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTAeFw0xNjAx
// SIG // MTIwMDAwMDBaFw0zMTAxMTEyMzU5NTlaMHcxCzAJBgNV
// SIG // BAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBDb3Jwb3Jh
// SIG // dGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0
// SIG // d29yazEoMCYGA1UEAxMfU3ltYW50ZWMgU0hBMjU2IFRp
// SIG // bWVTdGFtcGluZyBDQTCCASIwDQYJKoZIhvcNAQEBBQAD
// SIG // ggEPADCCAQoCggEBALtZnVlVT52Mcl0agaLrVfOwAa08
// SIG // cawyjwVrhponADKXak3JZBRLKbvC2Sm5Luxjs+HPPwtW
// SIG // kPhiG37rpgfi3n9ebUA41JEG50F8eRzLy60bv9iVkfPw
// SIG // 7mz4rZY5Ln/BJ7h4OcWEpe3tr4eOzo3HberSmLU6Hx45
// SIG // ncP0mqj0hOHE0XxxxgYptD/kgw0mw3sIPk35CrczSf/K
// SIG // O9T1sptL4YiZGvXA6TMU1t/HgNuR7v68kldyd/TNqMz+
// SIG // CfWTN76ViGrF3PSxS9TO6AmRX7WEeTWKeKwZMo8jwTJB
// SIG // G1kOqT6xzPnWK++32OTVHW0ROpL2k8mc40juu1MO1DaX
// SIG // hnjFoTcCAwEAAaOCAXcwggFzMA4GA1UdDwEB/wQEAwIB
// SIG // BjASBgNVHRMBAf8ECDAGAQH/AgEAMGYGA1UdIARfMF0w
// SIG // WwYLYIZIAYb4RQEHFwMwTDAjBggrBgEFBQcCARYXaHR0
// SIG // cHM6Ly9kLnN5bWNiLmNvbS9jcHMwJQYIKwYBBQUHAgIw
// SIG // GRoXaHR0cHM6Ly9kLnN5bWNiLmNvbS9ycGEwLgYIKwYB
// SIG // BQUHAQEEIjAgMB4GCCsGAQUFBzABhhJodHRwOi8vcy5z
// SIG // eW1jZC5jb20wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDov
// SIG // L3Muc3ltY2IuY29tL3VuaXZlcnNhbC1yb290LmNybDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDCDAoBgNVHREEITAfpB0w
// SIG // GzEZMBcGA1UEAxMQVGltZVN0YW1wLTIwNDgtMzAdBgNV
// SIG // HQ4EFgQUr2PWyqNOhXLgp7xB8ymiOH+AdWIwHwYDVR0j
// SIG // BBgwFoAUtnf6aUhHn1MS1cLqBzJ2B9GXBxkwDQYJKoZI
// SIG // hvcNAQELBQADggEBAHXqsC3VNBlcMkX+DuHUT6Z4wW/X
// SIG // 6t3cT/OhyIGI96ePFeZAKa3mXfSi2VZkhHEwKt0eYRdm
// SIG // IFYGmBmNXXHy+Je8Cf0ckUfJ4uiNA/vMkC/WCmxOM+zW
// SIG // tJPITJBjSDlAIcTd1m6JmDy1mJfoqQa3CcmPU1dBkC/h
// SIG // Hk1O3MoQeGxCbvC2xfhhXFL1TvZrjfdKer7zzf0D19n2
// SIG // A6gP41P3CnXsxnUuqmaFBJm3+AZX4cYO9uiv2uybGB+q
// SIG // ueM6AL/OipTLAduexzi7D1Kr0eOUA2AKTaD+J20UMvw/
// SIG // l0Dhv5mJ2+Q5FL3a5NPD6itas5VYVQR9x5rsIwONhSrS
// SIG // /66pYYEwggVLMIIEM6ADAgECAhB71OWvuswHP6EBIwQi
// SIG // QU0SMA0GCSqGSIb3DQEBCwUAMHcxCzAJBgNVBAYTAlVT
// SIG // MR0wGwYDVQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlvbjEf
// SIG // MB0GA1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29yazEo
// SIG // MCYGA1UEAxMfU3ltYW50ZWMgU0hBMjU2IFRpbWVTdGFt
// SIG // cGluZyBDQTAeFw0xNzEyMjMwMDAwMDBaFw0yOTAzMjIy
// SIG // MzU5NTlaMIGAMQswCQYDVQQGEwJVUzEdMBsGA1UEChMU
// SIG // U3ltYW50ZWMgQ29ycG9yYXRpb24xHzAdBgNVBAsTFlN5
// SIG // bWFudGVjIFRydXN0IE5ldHdvcmsxMTAvBgNVBAMTKFN5
// SIG // bWFudGVjIFNIQTI1NiBUaW1lU3RhbXBpbmcgU2lnbmVy
// SIG // IC0gRzMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
// SIG // AoIBAQCvDoqq+Ny/aXtUF3FHCb2NPIH4dBV3Z5Cc/d5O
// SIG // Ap5LdvblNj5l1SQgbTD53R2D6T8nSjNObRaK5I1AjSKq
// SIG // vqcLG9IHtjy1GiQo+BtyUT3ICYgmCDr5+kMjdUdwDLNf
// SIG // W48IHXJIV2VNrwI8QPf03TI4kz/lLKbzWSPLgN4TTfkQ
// SIG // yaoKGGxVYVfR8QIsxLWr8mwj0p8NDxlsrYViaf1OhcGK
// SIG // UjGrW9jJdFLjV2wiv1V/b8oGqz9KtyJ2ZezsNvKWlYEm
// SIG // LP27mKoBONOvJUCbCVPwKVeFWF7qhUhBIYfl3rTTJrJ7
// SIG // QFNYeY5SMQZNlANFxM48A+y3API6IsW0b+XvsIqbAgMB
// SIG // AAGjggHHMIIBwzAMBgNVHRMBAf8EAjAAMGYGA1UdIARf
// SIG // MF0wWwYLYIZIAYb4RQEHFwMwTDAjBggrBgEFBQcCARYX
// SIG // aHR0cHM6Ly9kLnN5bWNiLmNvbS9jcHMwJQYIKwYBBQUH
// SIG // AgIwGRoXaHR0cHM6Ly9kLnN5bWNiLmNvbS9ycGEwQAYD
// SIG // VR0fBDkwNzA1oDOgMYYvaHR0cDovL3RzLWNybC53cy5z
// SIG // eW1hbnRlYy5jb20vc2hhMjU2LXRzcy1jYS5jcmwwFgYD
// SIG // VR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQD
// SIG // AgeAMHcGCCsGAQUFBwEBBGswaTAqBggrBgEFBQcwAYYe
// SIG // aHR0cDovL3RzLW9jc3Aud3Muc3ltYW50ZWMuY29tMDsG
// SIG // CCsGAQUFBzAChi9odHRwOi8vdHMtYWlhLndzLnN5bWFu
// SIG // dGVjLmNvbS9zaGEyNTYtdHNzLWNhLmNlcjAoBgNVHREE
// SIG // ITAfpB0wGzEZMBcGA1UEAxMQVGltZVN0YW1wLTIwNDgt
// SIG // NjAdBgNVHQ4EFgQUpRMBqZ+FzBtuFh5fOzGqeTYAex0w
// SIG // HwYDVR0jBBgwFoAUr2PWyqNOhXLgp7xB8ymiOH+AdWIw
// SIG // DQYJKoZIhvcNAQELBQADggEBAEaer/C4ol+imUjPqCdL
// SIG // Ic2yuaZycGMv41UpezlGTud+ZQZYi7xXipINCNgQujYk
// SIG // +gp7+zvTYr9KlBXmgtuKVG3/KP5nz3E/5jMJ2aJZEPQe
// SIG // Sv5lzN7Ua+NSKXUASiulzMub6KlN97QXWZJBw7c/hub2
// SIG // wH9EPEZcF1rjpDvVaSbVIX3hgGd+Yqy3Ti4VmuWcI69b
// SIG // EepxqUH5DXk4qaENz7Sx2j6aescixXTN30cJhsT8kSWy
// SIG // G5bphQjo3ep0YG5gpVZ6DchEWNzm+UgUnuW/3gC9d7GY
// SIG // FHIUJN/HESwfAD/DSxTGZxzMHgajkF9cVIs+4zNbgg/F
// SIG // t4YCTnGf6WZFP3YxggJaMIICVgIBATCBizB3MQswCQYD
// SIG // VQQGEwJVUzEdMBsGA1UEChMUU3ltYW50ZWMgQ29ycG9y
// SIG // YXRpb24xHzAdBgNVBAsTFlN5bWFudGVjIFRydXN0IE5l
// SIG // dHdvcmsxKDAmBgNVBAMTH1N5bWFudGVjIFNIQTI1NiBU
// SIG // aW1lU3RhbXBpbmcgQ0ECEHvU5a+6zAc/oQEjBCJBTRIw
// SIG // CwYJYIZIAWUDBAIBoIGkMBoGCSqGSIb3DQEJAzENBgsq
// SIG // hkiG9w0BCRABBDAcBgkqhkiG9w0BCQUxDxcNMTkxMTEy
// SIG // MTg0NDA2WjAvBgkqhkiG9w0BCQQxIgQgW6fAmntNtwVy
// SIG // juTeX7d4Okklzzev2EZ7r9SMAMWCKOAwNwYLKoZIhvcN
// SIG // AQkQAi8xKDAmMCQwIgQgxHTOdgB9AjlODaXk3nwUxoD5
// SIG // 4oIBPP72U+9dtx/fYfgwCwYJKoZIhvcNAQEBBIIBAGnm
// SIG // zTjf48i9ot808Z+zBsP3+MQqOB9UW3uZICCM8XGgGku0
// SIG // b1BkT3ZN5kA3a/rs7aAXGlinBnYc2lNu4uIUvdF7+NmD
// SIG // 1oBeW/YyMEvQMUIVqwXghs8+QNSun3TPiBQupo7JXPDs
// SIG // cz7TM2NFvgqkrUnkWsGb1CHf6t+Iud0Lw0rjCiie0H4Y
// SIG // fJa49Ba1jIaWjQ1cZZPFGJv03aQq+RNLZ7O+twNrTkb5
// SIG // lTZD8nc08Q6JpEOP+sF4IMDUYJsgel2BgfzyTQbraJ7R
// SIG // U3ul91P/mxD+alD5Qm+jnWK3v5rHngGEacaiIHtM4avH
// SIG // XIj5jfme8EtuyIkYCaVwAyP2JpCEpnU=
// SIG // End signature block
