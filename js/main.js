(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzJe0oR4PU23mhIokfZ5B1yeM6hODo+sIvG7Z9RpSsOuzr3+9m7Ir27OC9dG6lBucdZeIbwKH0ReNcPRXOjHV1ksN3AJwHVj7pCUlC1bieKUyEgXYdojr6mwNw3EmzX3epUDX23fWW02iaBNvNm05gmeLXIRPq7vei8Yrl7tV/ytdO8H6YPYi5jYDa2wmxA1PBuZDJDhfcnPCGSkZ/UlCK9ZgwNZ5oemtOz5fBpWwybUTxpzOk57hfFfMqXTXHrsDChlPQ2SwxCIBIJnz9ANFIMWmgbqFEl3n+P011LuEGY0cFnNV25RC48+v1ojLqOngjBCCesUi7H03bc9Rdp/t8wIDAQAB";
    var name = $('.validate-input input[name="name"]');
    var ic = $('.validate-input input[name="ic"]');
    var mobile = $('.validate-input input[name="mobile"]');
    var qrcode = null;
    var encrypt = null;

    $('.validate-form-btn').on('click', function () {

        if ($(name).val().trim() == '' || $(name).val().trim().length > 50) {
            showValidate(name);
            return false;
        }


        if ($(ic).val().trim() == '' || !$(ic).val().trim().match(/^[0-9a-zA-Z]*$/) || $(ic).val().trim().length > 10) {
            showValidate(ic);
            return false;
        }

        if ($(mobile).val().trim() == '' || !$(mobile).val().trim().match(/^[6,8,9][0-9]*$/) || $(mobile).val().trim().length != 8) {
            showValidate(mobile);
            return false;
        }

        var content = {};
        content["name"] = $(name).val().trim();
        content["ic"] = $(ic).val().trim();
        content["mobile"] = $(mobile).val().trim();
        
        showLoader();
        var encrypted = encryptContent(content);
        generateQRCode(encrypted);
        hideLoader();

//        var jqXHR = jQuery.ajax({
//                type: 'POST',
//                async: true,
//                cache: false,
//                url: '#',
//                contentType: 'application/json; charset=UTF-8',
//                crossDomain: true,
//                dataType: 'json',
//                timeout: 2000,
//                data: content
//            })
//            .fail(function (jqXHR, textStatus, errorThrown) {
//                showErrorMessage();
//            })
//            .done(function (data, textStatus, jqXHR) {
//                generateQRCode(content);
//            })
//            .always(function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
//                hideLoader();
//            });

        return false;
    });

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
            hideErrorMessage();
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function generateQRCode(content) {
        if (qrcode != null) {
            qrcode.clear();
            qrcode.makeCode(JSON.stringify(content));
        } else {
            qrcode = new QRCode('qrcode', {
                text: JSON.stringify(content),
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }
    
    function encryptContent(content) {
        // 使用jsencrypt库加密前端参数
        if (encrypt == null) {
            encrypt = new JSEncrypt();
        }
        encrypt.setPublicKey(PUBLIC_KEY);
        var encrypted = encrypt.encrypt(JSON.stringify(content));
        return encrypted;
    }
    
    function showLoader() {
        $('.mask').css("display", "block");
        $('.loader').css("display", "block");
    }
    
    function hideLoader() {
        $('.mask').css("display", "none");
        $('.loader').css("display", "none");
    }
    
    function showErrorMessage() {
        $('.error-messge').css("display", "block");
    }
    
    function hideErrorMessage() {
        $('.error-messge').css("display", "none");
    }

})(jQuery);