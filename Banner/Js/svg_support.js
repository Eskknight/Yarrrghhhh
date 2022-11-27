$(document).ready(function(){
    var isRetina = (
        window.devicePixelRatio > 1 ||
        (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
    );

    if(isRetina){
        $(".svg_gif").attr('src', '../image/banner_loading@2x.gif');
    }else{
        $(".svg_gif").attr('src', '../image/banner_loading.gif');
    }

});

function detectSafari_let6(){
    var objappVersion = navigator.appVersion; 
    var objAgent = navigator.userAgent; 
    var objbrowserName = navigator.appName; 
    var objfullVersion = ''+parseFloat(navigator.appVersion); 
    var objBrMajorVersion = parseInt(navigator.appVersion,10); 
    var objOffsetName,objOffsetVersion,ix; 
    
    if ((objOffsetVersion=objAgent.indexOf("Safari"))!=-1){ 
        objbrowserName = "Safari"; 
        objfullVersion = objAgent.substring(objOffsetVersion+7); 
        if ((objOffsetVersion=objAgent.indexOf("Version"))!=-1) {
            var dotindex = objAgent.substring(objOffsetVersion+8).indexOf(".");
            if(dotindex > 2){
                dotindex = objAgent.substring(objOffsetVersion+8).indexOf(" ");
            }
            objfullVersion = objAgent.substring(objOffsetVersion+8,objOffsetVersion+8+dotindex); 
        }
        if(objfullVersion <= 6)
            return true;
    }
    return false;
};

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
};


// SIG // Begin signature block
// SIG // MIIbRQYJKoZIhvcNAQcCoIIbNjCCGzICAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // B7bXrfM7GsmrcO000g+PRUj+MP3EmGyfc/8uhYSk/uSg
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
// SIG // nGdukAsak3HUJgLDwFojMYIQgzCCEH8CAQEwgZkwgYQx
// SIG // CzAJBgNVBAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBD
// SIG // b3Jwb3JhdGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1
// SIG // c3QgTmV0d29yazE1MDMGA1UEAxMsU3ltYW50ZWMgQ2xh
// SIG // c3MgMyBTSEEyNTYgQ29kZSBTaWduaW5nIENBIC0gRzIC
// SIG // EAkI2uucBh4uubp+Jqpih4owDQYJYIZIAWUDBAIBBQCg
// SIG // fDAQBgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMx
// SIG // DAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYK
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgkZs7Xzwt
// SIG // 1ksA4IbsiD39e/1tk1PAkysEhFaGpY8S9tkwDQYJKoZI
// SIG // hvcNAQEBBQAEggEADG1pNLXsjFjnL8fkczVzONGJSpTr
// SIG // ntXLgb1iQpvQ/xaEFXUm7Ym/e/jbjRg+v/0AzHVWlMDT
// SIG // 1TuyO45KieEpe8afWIAPr2YQtqTqEbd+LTeLP7XCDu8Q
// SIG // g/tQT2fLAYBACeZKeqz86CSeR0CoIw40+J1iGLj0PWhG
// SIG // Frd894qqlbmY7VtljADmrxe3ZvMSBK496opQsOQiNSOh
// SIG // LSTBmI2uIyr8Uaw7SRefqabd5azYxNHQos5Y2DwWuxzy
// SIG // u+oo9h+YKO1Y1f/TJWlwfmIUl+YffS+fcFODjbStz69p
// SIG // 7ZT+C9sNGxU2b6HtDcv9vYMoe0u1yRzeN8wKb2eJZUCT
// SIG // hN1Di6GCDjwwgg44BgorBgEEAYI3AwMBMYIOKDCCDiQG
// SIG // CSqGSIb3DQEHAqCCDhUwgg4RAgEDMQ0wCwYJYIZIAWUD
// SIG // BAIBMIIBDgYLKoZIhvcNAQkQAQSggf4EgfswgfgCAQEG
// SIG // C2CGSAGG+EUBBxcDMDEwDQYJYIZIAWUDBAIBBQAEINWP
// SIG // +PWXukOHT+PheRx6Rbk7Wsf6xFFnWMqeVueVVag2AhRx
// SIG // ZKvsQx+6pXgqT8qlOLNRo1c1nhgPMjAxOTExMTIxODQ0
// SIG // MDFaMAMCAR6ggYakgYMwgYAxCzAJBgNVBAYTAlVTMR0w
// SIG // GwYDVQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlvbjEfMB0G
// SIG // A1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0d29yazExMC8G
// SIG // A1UEAxMoU3ltYW50ZWMgU0hBMjU2IFRpbWVTdGFtcGlu
// SIG // ZyBTaWduZXIgLSBHM6CCCoswggU4MIIEIKADAgECAhB7
// SIG // BbHUSWhRRPfJidKcGZ0SMA0GCSqGSIb3DQEBCwUAMIG9
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xHzAdBgNVBAsTFlZlcmlTaWduIFRydXN0IE5l
// SIG // dHdvcmsxOjA4BgNVBAsTMShjKSAyMDA4IFZlcmlTaWdu
// SIG // LCBJbmMuIC0gRm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkx
// SIG // ODA2BgNVBAMTL1ZlcmlTaWduIFVuaXZlcnNhbCBSb290
// SIG // IENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE2MDEx
// SIG // MjAwMDAwMFoXDTMxMDExMTIzNTk1OVowdzELMAkGA1UE
// SIG // BhMCVVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0
// SIG // aW9uMR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3
// SIG // b3JrMSgwJgYDVQQDEx9TeW1hbnRlYyBTSEEyNTYgVGlt
// SIG // ZVN0YW1waW5nIENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
// SIG // AQ8AMIIBCgKCAQEAu1mdWVVPnYxyXRqBoutV87ABrTxx
// SIG // rDKPBWuGmicAMpdqTclkFEspu8LZKbku7GOz4c8/C1aQ
// SIG // +GIbfuumB+Lef15tQDjUkQbnQXx5HMvLrRu/2JWR8/Du
// SIG // bPitljkuf8EnuHg5xYSl7e2vh47Ojcdt6tKYtTofHjmd
// SIG // w/SaqPSE4cTRfHHGBim0P+SDDSbDewg+TfkKtzNJ/8o7
// SIG // 1PWym0vhiJka9cDpMxTW38eA25Hu/rySV3J39M2ozP4J
// SIG // 9ZM3vpWIasXc9LFL1M7oCZFftYR5NYp4rBkyjyPBMkEb
// SIG // WQ6pPrHM+dYr77fY5NUdbRE6kvaTyZzjSO67Uw7UNpeG
// SIG // eMWhNwIDAQABo4IBdzCCAXMwDgYDVR0PAQH/BAQDAgEG
// SIG // MBIGA1UdEwEB/wQIMAYBAf8CAQAwZgYDVR0gBF8wXTBb
// SIG // BgtghkgBhvhFAQcXAzBMMCMGCCsGAQUFBwIBFhdodHRw
// SIG // czovL2Quc3ltY2IuY29tL2NwczAlBggrBgEFBQcCAjAZ
// SIG // GhdodHRwczovL2Quc3ltY2IuY29tL3JwYTAuBggrBgEF
// SIG // BQcBAQQiMCAwHgYIKwYBBQUHMAGGEmh0dHA6Ly9zLnN5
// SIG // bWNkLmNvbTA2BgNVHR8ELzAtMCugKaAnhiVodHRwOi8v
// SIG // cy5zeW1jYi5jb20vdW5pdmVyc2FsLXJvb3QuY3JsMBMG
// SIG // A1UdJQQMMAoGCCsGAQUFBwMIMCgGA1UdEQQhMB+kHTAb
// SIG // MRkwFwYDVQQDExBUaW1lU3RhbXAtMjA0OC0zMB0GA1Ud
// SIG // DgQWBBSvY9bKo06FcuCnvEHzKaI4f4B1YjAfBgNVHSME
// SIG // GDAWgBS2d/ppSEefUxLVwuoHMnYH0ZcHGTANBgkqhkiG
// SIG // 9w0BAQsFAAOCAQEAdeqwLdU0GVwyRf4O4dRPpnjBb9fq
// SIG // 3dxP86HIgYj3p48V5kApreZd9KLZVmSEcTAq3R5hF2Yg
// SIG // VgaYGY1dcfL4l7wJ/RyRR8ni6I0D+8yQL9YKbE4z7Na0
// SIG // k8hMkGNIOUAhxN3WbomYPLWYl+ipBrcJyY9TV0GQL+Ee
// SIG // TU7cyhB4bEJu8LbF+GFcUvVO9muN90p6vvPN/QPX2fYD
// SIG // qA/jU/cKdezGdS6qZoUEmbf4Blfhxg726K/a7JsYH6q5
// SIG // 4zoAv86KlMsB257HOLsPUqvR45QDYApNoP4nbRQy/D+X
// SIG // QOG/mYnb5DkUvdrk08PqK1qzlVhVBH3HmuwjA42FKtL/
// SIG // rqlhgTCCBUswggQzoAMCAQICEHvU5a+6zAc/oQEjBCJB
// SIG // TRIwDQYJKoZIhvcNAQELBQAwdzELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8w
// SIG // HQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMSgw
// SIG // JgYDVQQDEx9TeW1hbnRlYyBTSEEyNTYgVGltZVN0YW1w
// SIG // aW5nIENBMB4XDTE3MTIyMzAwMDAwMFoXDTI5MDMyMjIz
// SIG // NTk1OVowgYAxCzAJBgNVBAYTAlVTMR0wGwYDVQQKExRT
// SIG // eW1hbnRlYyBDb3Jwb3JhdGlvbjEfMB0GA1UECxMWU3lt
// SIG // YW50ZWMgVHJ1c3QgTmV0d29yazExMC8GA1UEAxMoU3lt
// SIG // YW50ZWMgU0hBMjU2IFRpbWVTdGFtcGluZyBTaWduZXIg
// SIG // LSBHMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAK8Oiqr43L9pe1QXcUcJvY08gfh0FXdnkJz93k4C
// SIG // nkt29uU2PmXVJCBtMPndHYPpPydKM05tForkjUCNIqq+
// SIG // pwsb0ge2PLUaJCj4G3JRPcgJiCYIOvn6QyN1R3AMs19b
// SIG // jwgdckhXZU2vAjxA9/TdMjiTP+UspvNZI8uA3hNN+RDJ
// SIG // qgoYbFVhV9HxAizEtavybCPSnw0PGWythWJp/U6FwYpS
// SIG // Matb2Ml0UuNXbCK/VX9vygarP0q3InZl7Ow28paVgSYs
// SIG // /buYqgE4068lQJsJU/ApV4VYXuqFSEEhh+XetNMmsntA
// SIG // U1h5jlIxBk2UA0XEzjwD7LcA8joixbRv5e+wipsCAwEA
// SIG // AaOCAccwggHDMAwGA1UdEwEB/wQCMAAwZgYDVR0gBF8w
// SIG // XTBbBgtghkgBhvhFAQcXAzBMMCMGCCsGAQUFBwIBFhdo
// SIG // dHRwczovL2Quc3ltY2IuY29tL2NwczAlBggrBgEFBQcC
// SIG // AjAZGhdodHRwczovL2Quc3ltY2IuY29tL3JwYTBABgNV
// SIG // HR8EOTA3MDWgM6Axhi9odHRwOi8vdHMtY3JsLndzLnN5
// SIG // bWFudGVjLmNvbS9zaGEyNTYtdHNzLWNhLmNybDAWBgNV
// SIG // HSUBAf8EDDAKBggrBgEFBQcDCDAOBgNVHQ8BAf8EBAMC
// SIG // B4AwdwYIKwYBBQUHAQEEazBpMCoGCCsGAQUFBzABhh5o
// SIG // dHRwOi8vdHMtb2NzcC53cy5zeW1hbnRlYy5jb20wOwYI
// SIG // KwYBBQUHMAKGL2h0dHA6Ly90cy1haWEud3Muc3ltYW50
// SIG // ZWMuY29tL3NoYTI1Ni10c3MtY2EuY2VyMCgGA1UdEQQh
// SIG // MB+kHTAbMRkwFwYDVQQDExBUaW1lU3RhbXAtMjA0OC02
// SIG // MB0GA1UdDgQWBBSlEwGpn4XMG24WHl87Map5NgB7HTAf
// SIG // BgNVHSMEGDAWgBSvY9bKo06FcuCnvEHzKaI4f4B1YjAN
// SIG // BgkqhkiG9w0BAQsFAAOCAQEARp6v8LiiX6KZSM+oJ0sh
// SIG // zbK5pnJwYy/jVSl7OUZO535lBliLvFeKkg0I2BC6NiT6
// SIG // Cnv7O9Niv0qUFeaC24pUbf8o/mfPcT/mMwnZolkQ9B5K
// SIG // /mXM3tRr41IpdQBKK6XMy5voqU33tBdZkkHDtz+G5vbA
// SIG // f0Q8RlwXWuOkO9VpJtUhfeGAZ35irLdOLhWa5Zwjr1sR
// SIG // 6nGpQfkNeTipoQ3PtLHaPpp6xyLFdM3fRwmGxPyRJbIb
// SIG // lumFCOjd6nRgbmClVnoNyERY3Ob5SBSe5b/eAL13sZgU
// SIG // chQk38cRLB8AP8NLFMZnHMweBqOQX1xUiz7jM1uCD8W3
// SIG // hgJOcZ/pZkU/djGCAlowggJWAgEBMIGLMHcxCzAJBgNV
// SIG // BAYTAlVTMR0wGwYDVQQKExRTeW1hbnRlYyBDb3Jwb3Jh
// SIG // dGlvbjEfMB0GA1UECxMWU3ltYW50ZWMgVHJ1c3QgTmV0
// SIG // d29yazEoMCYGA1UEAxMfU3ltYW50ZWMgU0hBMjU2IFRp
// SIG // bWVTdGFtcGluZyBDQQIQe9Tlr7rMBz+hASMEIkFNEjAL
// SIG // BglghkgBZQMEAgGggaQwGgYJKoZIhvcNAQkDMQ0GCyqG
// SIG // SIb3DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xOTExMTIx
// SIG // ODQ0MDFaMC8GCSqGSIb3DQEJBDEiBCDrRuDezm14noq5
// SIG // c/4NOeOPel5tab929QY3OLGQXbMFOzA3BgsqhkiG9w0B
// SIG // CRACLzEoMCYwJDAiBCDEdM52AH0COU4NpeTefBTGgPni
// SIG // ggE8/vZT7123H99h+DALBgkqhkiG9w0BAQEEggEAXjMz
// SIG // M4vqeUidwpvfgX8ssUPnFy2UPyqHHCobkTXFcz/wLjjT
// SIG // 68x5UKVyzoXFgv3jFIO86HAOxrkZTkQ05O3UbpkITkvg
// SIG // uFRQwiRH3gsQXmOyjdOGL0ZZnbGpMM60MmKEDimyLha1
// SIG // vVFPjDcHWoaow+W/e6IT+J2QU15rMHTtpeMyjFuFi843
// SIG // XD6Mmwn0+3dVzszgh1LjRDW9VzztA7fys22qfm3nnqws
// SIG // ZePb+13PBTGCodetkZa8U+dvdIlxn2Au88UtC+p8TKF2
// SIG // 3cBOBOXqf9LgnWCJu65+Ae2wUvW9xe0PmYD6/ZNBsEjL
// SIG // 6+xDGu8oJtDdNAuDOSaJe7VMaLvoIw==
// SIG // End signature block
