import React from 'react';
import fetch from 'dva/fetch';
import reqwest from 'reqwest';
import Promise from 'promise-polyfill';
import JsonP from 'fetch-jsonp';
import { message , Modal } from 'antd';
import sstokey from '../../mock/sstoken.js';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
window.requestData = function(url, options) {
	if( window.env == 'local' ){
		options.body += `&sstoken=${sstokey.sstoken}`;
	}else{
		//添加sstoken
		var aCookie = document.cookie.split(';');
		var oCookie = {};
		for( var i = 0; i < aCookie.length; i++ ){
			if( !!aCookie[i] ){
				var prop = aCookie[i].split('=')[0].trim();
				var value = aCookie[i].split('=')[1].trim();
				oCookie[prop] = value;
			}
		}

		var sstoken = oCookie.sstoken;
//		options.body += `&sstoken=${sstoken}`;
        if(options.body && options.body.length > 0) {
            options.body += `&sstoken=${sstoken}`;
        } else {
            options.body = `sstoken=${sstoken}`;
        }
	}

    options = {
        ...options,
        credentials: 'include',     //fetch  请求加上cookie
        headers: {
            ...options.headers,
            isAjax: 'yes',
        }
    };
  	return fetch(url, options)
    	.then(checkStatus)
    	.then(parseJSON)
    	.then(function(ret) {
            if(ret && ret.errorCode == 2000) {
                window.location = BASE_URL;
            }else if( ret && ret.errorCode == 4000){
				window.location = BASE_URL + '/logout'
			}
            return {ret};
        })
		.catch((err) => ({ err }));
}

window.serviceRequest = function(url, data, suc, fail) {
	if( window.env == 'local' ){
		data.sstoken = sstokey.sstoken;
	}else{
		//添加sstoken
		var aCookie = document.cookie.split(';');
		var oCookie = {};
		for( var i = 0; i < aCookie.length; i++ ){
			if( !!aCookie[i] ){
				var prop = aCookie[i].split('=')[0].trim();
				var value = aCookie[i].split('=')[1].trim();
				oCookie[prop] = value;
			}
		}
		var sstoken = oCookie.sstoken;
		data.sstoken = sstoken;
	}
	//异步请求
    reqwest({
      url: url,
      method: 'POST',
      type: 'json',
      headers: {
          isAjax: 'yes',
      },
      data: data,
    }).then(result => {
    	if(result.errorCode == 9000) {
			if(suc) {
				suc(result);
			}
		} else {
            if(result.errorCode == 2000) {
                window.location = BASE_URL;
            }else if( result.errorCode == 4000 ){
				window.location = BASE_URL + '/logout'
			} else {
                if(fail) {
                    fail(result);
                } else {
                    message.error(result.errorMessage||'服务器开小差啦');
                }
            }
		}

    },function(err, msg){
    	message.error('服务器开小差啦');
    });
}

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

//jsonp跨域请求，仅支持get请求
window.JsonpRequest = function(url,suc,fail){
    JsonP(url,{
        jsonpCallback: 'callback',
    })
    .then(function(response) {
        return response.json()
    }).then(function(json) {
        if(json.status == '1'){
            if(!!suc){
                suc();
            }
        }else{
            if(!!fail){
                fail();
            }
        }
        console.log('parsed json', json)
    }).catch(function(ex) {
        if(!!fail){
            fail();
        }
        console.log('parsing failed', ex)
    })
}

window._ = function(...value){
	console.info(...value);
}

window.CallPhone = function(phone){
    if(isNaN(phone)){
        return Modal.error({
            title: '拨号失败',
            content: (<div>号码不存在或格式不正确</div>)
        })
    }
    function suc(){
        Modal.success({
            title: '拨号成功',
            content: (<div>请稍候...</div>)
        })
    };
    function fail(){
        Modal.error({
            title: '拨号失败',
            content: (<div>请检查软件运行情况</div>)
        })
    };
    window.JsonpRequest(`http://127.0.0.1:3366/callout?phone=${phone}`, suc , fail)
}



