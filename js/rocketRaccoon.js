/**
 * Created by Aislen404 on 6/5/17.
 */

/**
 * @description Make the actual CORS request
 * @param meth
 * @param url
 * @example  makeCorsRequest("GET", "http://api.carriots.com/devices/jrdvll_e_w_1@aislen404.aislen404/streams/?sort=at&order=-1");
 */
function makeCorsRequest(meth, url) {

    var jsonData = null;

    var apikey= 'ea88aba0148e8f42312e67838cc90dcb9d71ac7dc1d56dc6493886df916c80d4';
    var device = 'jrdvll_e_w_1@aislen404.aislen404';
    var url_tail = '/streams/?sort=at&order=-1';

    url = url + device + url_tail;

    var xhr = _createCORSRequest(meth, url);

    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    //xhr.setRequestHeader("Origin", "*");
    //xhr.setRequestHeader('Host', 'api.carriots.com');
    //xhr.setRequestHeader('User-Agent', 'Carriots-client');

    xhr.setRequestHeader('carriots.apiKey', apikey);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        //console.log(text);
        return text;

    };

    xhr.onerror = function() {
        alert('There was an error making the request.');
    };

    xhr.send(jsonData);
}


/**
 * @description Create the XHR object.
 * @param method
 * @param url
 * @returns {XMLHttpRequest}
 */
function _createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);  // TODO : change true per false
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
