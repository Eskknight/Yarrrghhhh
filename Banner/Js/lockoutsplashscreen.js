

var numOfDaysRemaining = sb_util.getParameterValue("days_remaining", "0");
numOfDaysRemaining = parseInt(numOfDaysRemaining, 10);
if (isNaN(numOfDaysRemaining)) {
    numOfDaysRemaining = 0;
}

var isLockedOut = numOfDaysRemaining === 0;


window.onload = function () {

    //
    // Set the background image   

    var heroes = [
        "image/hero/fairy-lady.jpg",
        "image/hero/mech-girl.jpg",
        "image/hero/submarine.jpg",
        "image/hero/transportation.jpg",
        "image/hero/samurai.jpg",
        "image/hero/architecture.jpg",
        "image/hero/car-race.jpg",
        "image/hero/fairy-lady.jpg"
    ];
    $(".background").css({
        "background-image": 'url("'+heroes[numOfDaysRemaining % heroes.length]+'")',
        "background-repeat": "no-repeat",
    });
    
    //
    // Load the locales file

    var locale = sb_util.getParameterValue("locale", "en-us");
    var localeFolder = sb_util.getLocaleFolder(locale);
    var localeFilePath = "./lang/" + localeFolder + "/lan_lockout.js";
    sb_util.loadjscssfile(localeFilePath, "js", startPage);
    
}

function startPage() {

    //
    // Localize page elements

    $("[i18n]")
        .each( function() {
            var localizedText = lan_lockout[$(this).attr('id')];
            if (!localizedText) {
                console.error('Could not find localized text with ID', $(this).attr('id'));
            } else {
                $(this).html(localizedText);
            }
        });
    
    //
    // Apply lockout/trial-specific styles
    
    if (isLockedOut) {
        $("body").addClass("locked-out");             
    } else {
        $("body").addClass("trial-active");             
    }

    //
    // Display normal or custom message for final day

    if (numOfDaysRemaining === 1) {
        $(".days_plural").remove();
    } else if (numOfDaysRemaining > 1) {
        $(".days_singular").remove();
    }
    	        
    //
    // Layout calculation
    
    var $win = $(window),
        $actionButtons = $("#action-buttons"),
        $autodeskIcon = $(".autodesk-icon"),
        $pencilIcon = $("#pencil-icon"),
        $announcementHeader = $("#announcement_header"),
        $announcementBody = $("#announcement_body"),
        $announcementFooter = $("#announcement_footer"),
        $startNowCopy = $("#start-now-copy"),
        $enjoyYourTrial = $("#enjoy-your-trial"),
        $calendarDay = $("#calendar-day"),
        $orCreateAccount = $("#or-create-account")
        ;
    
    function layout() {
        
        //
        // Window sizing
        
        var view = { 
            w: $win.width(), 
            h: $win.height(),
            split: { ratio: .65 },
        };
        
        view.c = { x: view.w / 2, y: view.h / 2 };
        view.split.top = view.h * view.split.ratio;
        view.split.bottom = view.h * (1 - view.split.ratio);

        //
        // Main action buttons

        $actionButtons.css({
            left:
                view.c.x - (Math.min(view.w, 384) / 2),
            top: 
                view.split.top - 
                ($actionButtons.clientRect().height * 
                (isLockedOut ? 0.5 : 1.0)),
            width: 
                Math.min(view.w, 384),
        });

        //
        // Main announcement text

        $announcementHeader.css({
            left: 
                view.c.x - ($announcementHeader.clientRect().width / 2),
            top: 
                40,
        });

        $announcementFooter.css({
            left:
                view.c.x - (Math.min(view.w, 384) / 2),
            top: 
                $actionButtons.clientRect().top - 
                $announcementFooter.clientRect().height,
            width: 
                Math.min(view.w, 384),
        });
        
        $announcementBody.css({
            left:
                view.c.x - (Math.min(view.w, 384) / 2),
            top: 
                $announcementHeader.clientRect().bottom +
                ( $announcementFooter.clientRect().top -
                $announcementHeader.clientRect().bottom ) / 2
                -
                $announcementBody.clientRect().height / 2,
            width: 
                Math.min(view.w, 384),
        });

        //
        // Hero image
        
        var heroDim = {
            orig: { w: 1176, h: 766 } 
        };
        var heroScale = 
            Math.max(
                view.w / heroDim.orig.w,
                $actionButtons.clientRect().bottom / heroDim.orig.h
            );
        heroDim.w = heroScale * heroDim.orig.w;
        heroDim.h = heroScale * heroDim.orig.h;
        
        $(".background").css({
            "background-repeat": 
                "no-repeat",
            "background-position-x": 
                0,
            "background-position-y": 
                Math.round(Math.min(0, (view.split.top - heroDim.h)/2)),
            "background-size": 
                Math.round(heroDim.w)+"px "+Math.round(heroDim.h)+"px",
            });
        
        //
        // Autodesk logo
        
        $autodeskIcon.css({ 
            left: view.c.x,
            top: view.h,
        });

        //
        // Start Now copy

        $startNowCopy.css({ 
            top: 
                ((view.split.bottom - 78) * .5) - 
                ($startNowCopy.clientRect().height / 2),
        });

        //
        // Sketchbook pencil logo
        
        $pencilIcon.css({ 
            left: view.c.x,
            top: view.h,
        });

        //
        // Trial details layout
   
        $enjoyYourTrial.css({
            left:
                view.c.x - (Math.min(view.w - 32, 384) / 2), 
            top: 
                40,
            width: Math.min(view.w - 32, 384),
        });
        $orCreateAccount.css({
            left:
                view.c.x - (Math.min(view.w, 384) / 2), 
            top: 
                view.h - 81 - 23 - $orCreateAccount.clientRect().height,
            width: Math.min(view.w, 384),
        });
        $calendarDay.css({
            left:
                view.c.x - ($calendarDay.clientRect().width / 2), 
            top: 
                40 +
                (( view.h - 81 - 23 - 40 )  / 2) -
                ($calendarDay.clientRect().height / 2),
        });
        
    }

    $win.resize(layout).trigger("resize");


    $(".remaining_days").text(numOfDaysRemaining);

    // Update all "sign in" links with the URL
    var encodedLoginUrl = sb_util.getParameterValue("login_url", "");
    var loginUrl = decodeURIComponent(encodedLoginUrl);
    $(".sign_in_link").attr("href", loginUrl);

    // Update all "create account" sinks with the URL
    var encodedCreateAccountUrl = sb_util.getParameterValue("create_account_url", encodedLoginUrl);
    var createAccountUrl = decodeURIComponent(encodedCreateAccountUrl);
    $(".create_account_link").attr("href", createAccountUrl);

    $("#start_now_link").click(onLearnMoreClicked);


};

function onLearnMoreClicked(event) {
    event.preventDefault();
    $(".trial-slide").removeClass("trial-slide").addClass("trial-slide-nodelay");
    $("#start_now_link").off('click');
    if ($("body").hasClass("trial-card-expanded")) {
        $("#trial-maxi-card").css({"pointer-events": "none", "z-index": "250" });
        $("body").removeClass("trial-card-expanded");
        $("#start_now_link").click(onLearnMoreClicked);
    } else {
        $("#trial-maxi-card").css({"pointer-events": "initial", "z-index": "400" });
        $("body").addClass("trial-card-expanded");
    }
}

// SIG // Begin signature block
// SIG // MIIZfQYJKoZIhvcNAQcCoIIZbjCCGWoCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // uEF7DONtuZt4ad1xKtltP0xL++SzU+yY+EjSQajGJ1ag
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
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgseg9RYiq
// SIG // lJsGrJ4uxlJ0IFfsKDzB7NaUszkyVfbH2+cwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAdEE13p11zK5Gf6GpVkY+b90zCU+G
// SIG // 9pYKO2+Iryc4VNfY55OF2Vb4X8B8MT2/MU5QTVXn5DJV
// SIG // lHhglbLKhdYfnKl1BVVwBO7Y2n7zy4uReHnDdtsaxLeo
// SIG // L+9mm2DrdVc4fjZFzm++9l8fX0PhmypESjjQ6grQh8as
// SIG // xwqhMzcLCu9Duz/IBVaiW45d3HNQNuyhaV6rRFtY6Zl+
// SIG // FADAZPt3G6EgGF0Qea0C7y1573svy/LTmiwPErj2NX15
// SIG // +KcyP1l0gUKf6+/5OOh9f/+LxxW28+qPq95eyb6vkfcg
// SIG // WJx5pub/gqz4aLM+Cf5Xon2gM6C7J1Zs+FhYskOK397v
// SIG // i1m9OqGCDHQwggxwBgorBgEEAYI3AwMBMYIMYDCCDFwG
// SIG // CSqGSIb3DQEHAqCCDE0wggxJAgEDMQ8wDQYJYIZIAWUD
// SIG // BAIBBQAwga8GCyqGSIb3DQEJEAEEoIGfBIGcMIGZAgEB
// SIG // BgkrBgEEAaAyAgMwMTANBglghkgBZQMEAgEFAAQg+I70
// SIG // aJ27dR6EfFYxQCp9OlRPW2fLLIgWQqpLwgZWvHYCFA/U
// SIG // VMy4Opjk4O7VTekf5M8g0iO9GA8yMDE5MTExMjE4NDM0
// SIG // NFqgL6QtMCsxKTAnBgNVBAMMIEdsb2JhbFNpZ24gVFNB
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
// SIG // NDRaMC8GCSqGSIb3DQEJBDEiBCDpYYf5csuq1UslIpi2
// SIG // 6EY79bdewuDpMxg2V6KWQUkASjCBoAYLKoZIhvcNAQkQ
// SIG // AgwxgZAwgY0wgYowgYcEFJsSBXrnKq/21jdytJ9qI28m
// SIG // Sc2pMG8wX6RdMFsxCzAJBgNVBAYTAkJFMRkwFwYDVQQK
// SIG // ExBHbG9iYWxTaWduIG52LXNhMTEwLwYDVQQDEyhHbG9i
// SIG // YWxTaWduIFRpbWVzdGFtcGluZyBDQSAtIFNIQTI1NiAt
// SIG // IEcyAgwMp89dBwckrInnmjowDQYJKoZIhvcNAQEBBQAE
// SIG // ggEAqPzXQyA/hVcW/mqceFQMEArc//e8SJQUEJ4vfDxX
// SIG // n4kwZ4+B8smQ7363Yc/U3jkOnjVDQD/OfH2oZPi3ZqcL
// SIG // dz/pwhK2EazBIFUINJibATPtA1LbD8+HKPI+kWMmQ4jo
// SIG // 6iL4RVA/TZHNOocSKCQHtyhP6urF8uJ1E3dlnJocXaVE
// SIG // qlGLyq6vFQY6BwQ+AKiL/+8YnYAiHE3GhoacrjriypYp
// SIG // qfrm9yB8Y6FXAI9l0FJEhIkyX02BuRnL8d5pJMQxaODf
// SIG // hKQKWffZJtVJy2997e7aKwN0jx+ifKokEmaz84aTAfQt
// SIG // PLGa62ITYJuVAYJTg0wYER1JOY8C86nyKyb4uw==
// SIG // End signature block
