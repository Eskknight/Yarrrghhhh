var sb_util = (function () {
	var getURLParameter = function(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	};

	return {
		loadjscssfile: function(filename, filetype, callback){
		    if (filetype=="js"){ //if filename is a external JavaScript file
		    	var fileref=document.createElement('script');
		    	fileref.setAttribute("type","text/javascript");
		    	fileref.setAttribute("src", filename);
		    	fileref.onload = callback;
		    }
		    else if (filetype=="css"){ //if filename is an external CSS file
				var fileref=document.createElement("link")
				fileref.setAttribute("rel", "stylesheet")
				fileref.setAttribute("type", "text/css")
				fileref.setAttribute("href", filename)
				fileref.onload = callback;
			}
			if (typeof fileref!="undefined")
				document.getElementsByTagName("head")[0].appendChild(fileref)
		},

		getParameterValue: function(paramName, defaultValue){
	        if (typeof(defaultValue)==='undefined') defaultValue = "";
	        var value = getURLParameter(paramName)?getURLParameter(paramName):defaultValue;
	        return value;
	    },

	    getURLParameter: getURLParameter,
		
		getWindowWidth: function () {
			var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || window.top.innerWidth;
			return w;
		},
		 
		getWindowHeight: function () {
		    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || window.top.innerHeight;
		    return h;
		},

		isRetina: function(){
			return (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches));
		},

		getLocaleFolder: function(locale){
			locale = locale.toLowerCase();
			switch(locale){
				case 'de-de':
				    break;
				case 'en-us':
				    break;
				case 'es-es':
					break;
				case 'fr-fr':
					break;
				case 'it-it':
					break;
				case 'ja-jp':
					break;
				case 'ko-kr':
					break;
				case 'pt-br':
					break;
				case 'ru-ru':
					break;
				case 'zh-cn':
					break;
				case 'zh-tw':
					break;
				default:
					locale = 'en-us';
					break;
			}
			return locale;
		},

        VISIBLE: 0,
        INVISIBLE: 1,
        GONE: 2,

        setVisibility: function(elem, visibility){
            switch(visibility){
                case 1: // INVISIBLE
                    if($(elem).hasClass("mhide")){
                        $(elem).removeClass("mhide");
                    }
                    if(!$(elem).hasClass("mhidden")){
                        $(elem).addClass("mhidden");
                    }
                    break;
                case 2: // GONE
                    if($(elem).hasClass("mhidden")){
                        $(elem).removeClass("mhidden");
                    }
                    if(!$(elem).hasClass("mhide")){
                        $(elem).addClass("mhide");
                    }
                    break;
                case 0: // VISIBLE
                default:
                    if($(elem).hasClass("mhidden")){
                        $(elem).removeClass("mhidden");
                    }else if($(elem).hasClass("mhide")){
                        $(elem).removeClass("mhide");
                    }
            }
		},

		hideBody: function(hide){
		    if(hide){
		        $("body").addClass("mhidden");
		    }else if($("body").hasClass("mhidden")){
		        $("body").removeClass("mhidden");
		    }
		}
		 
	};
 
})();
// SIG // Begin signature block
// SIG // MIIgdgYJKoZIhvcNAQcCoIIgZzCCIGMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // Iy04kP+pJ8qpkTPI/b1Ix1UwhmHsaQ/VW1As1k6vi6+g
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
// SIG // KwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgN6txv23W
// SIG // 87XdEOZNz1q8XL2yXlHNjujKf0mK/qRYuSUwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAJj16AZk5deJY7NEcg4UvSuEDj4h/
// SIG // Ro4kPuvg5CPmbBj9x/+a1nTyLRZyykkFD8iSBTN+Oyr4
// SIG // fqnhWtl0lyPPbLJw9uptqYi2Vgw3CVNvGSGr8KyGUbgh
// SIG // LVjIQG+5y5Ax8hfC2BaAAb8vJU4K4Lgo54hxD858oVmJ
// SIG // fesSKKC2tRrRV5NAv3uYzauC78g6viW6uPPc4YgVYN1u
// SIG // Yh+/FKQliKN6nAEOBLoZH7HFv6gmgIM4Qyl0M59ZlqDY
// SIG // oIHNECUjXpqolJaT2Fxv7Id8RYKCm+twyP6wrcr+BQ9p
// SIG // X8eGB93vCYfiNU7ec5QVn6ILeddwgsKl1ZC1vYiILkfh
// SIG // yc4Pp6GCE20wghNpBgorBgEEAYI3AwMBMYITWTCCE1UG
// SIG // CSqGSIb3DQEHAqCCE0YwghNCAgEDMQ8wDQYJYIZIAWUD
// SIG // BAIBBQAwggEMBgsqhkiG9w0BCRABBKCB/ASB+TCB9gIB
// SIG // AQYKKwYBBAGyMQIBATAxMA0GCWCGSAFlAwQCAQUABCB0
// SIG // FA/PmDPqdHhd6AO4tVYBqe2MZ4UNnUiK4P2b4rV9tQIU
// SIG // b6/lIp55wQB/XwtRgKdpRjUPlD8YDzIwMTkxMTEyMTg0
// SIG // NDM3WqCBiqSBhzCBhDELMAkGA1UEBhMCR0IxGzAZBgNV
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
// SIG // DQEJEAEEMBwGCSqGSIb3DQEJBTEPFw0xOTExMTIxODQ0
// SIG // MzdaMC8GCSqGSIb3DQEJBDEiBCCA5DZEjn7orBMS5QFw
// SIG // HTg9DYb/G4ZPV/n0cIO48/wx+zCB7QYLKoZIhvcNAQkQ
// SIG // Agwxgd0wgdowgdcwFgQUJcisc05IULf42RORqBuSSTZl
// SIG // n2EwgbwEFALWW5Xig3DBVwCV+oj5I92Tf62PMIGjMIGO
// SIG // pIGLMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKTmV3
// SIG // IEplcnNleTEUMBIGA1UEBxMLSmVyc2V5IENpdHkxHjAc
// SIG // BgNVBAoTFVRoZSBVU0VSVFJVU1QgTmV0d29yazEuMCwG
// SIG // A1UEAxMlVVNFUlRydXN0IFJTQSBDZXJ0aWZpY2F0aW9u
// SIG // IEF1dGhvcml0eQIQMA9vrN1mmHR8qUY2p3gtuTANBgkq
// SIG // hkiG9w0BAQEFAASCAgCEnNdRKbX9ygg/pDi4JGQn9gDZ
// SIG // iGlEv0xLEGEt3AD21KZFnsrYA3hAF9RNItGxrsEqev2x
// SIG // 1JkTcoxAQI2Wr/LAng681LL9+RSvmpKbJdc0oJPy3Blq
// SIG // AqTC3WugRzHYESMMd7/zrUqDOubeZU23Hf3QU+ZepeYA
// SIG // p+/MoKD7OLYWEaeyx5Bj7CSKpmQvXBWcD+SrdABUk10W
// SIG // atULapisjt9dib3T7GhgAAH4FmzS26ciBN7Mjj2eP6RT
// SIG // qYvuq+Su1w+wybOA7GhcIJ0RbwNuH95IOSXPdOL+xQJA
// SIG // Xyfni72pevS9A7NQlT6h9ROmAJFaaHkyrlEVcYOTrpcw
// SIG // HPd4xSZIwTeaeHKOPDeFmGI+1GwUZdWNw7ZTkPJnQDEn
// SIG // xMDN1ie1xYjOG4E/3nnxNVpW3gT8Yx5AOpJshY9znJBb
// SIG // dDcV3oaVcbIeMH6KORvXboTeAAfnMzQHQdGuDwXnrFJL
// SIG // 9fYzVLq8xqbQSfDNForBy3D+vbNGMYpizN8IC1DQMjWL
// SIG // /cQ308ERGy3NUlQVhPBTb8kH+VLRU5PgbocRjB1W4We2
// SIG // LxODxo0XNZ4CUwMUhEpWknbq5iWB2JDVR8gR7yYpzLDk
// SIG // gCpy8Xl094JI+SKu262tKm50FXoyjC2vDdbuUyLEK++c
// SIG // 8TYFzFA0w9f7XW4KCp9KVLyMgShZ9oG0ylW12VBgug==
// SIG // End signature block
