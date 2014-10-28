/* Seale Core js v2014
*  Copyright 2014 SealeCorp. All rights reserved.
*/

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function goBack() {
    if (history.length) {
        history.go(-1);
        return false;
    }
    return true; //follow the regular link
}



