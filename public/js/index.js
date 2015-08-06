/**
 * Created by bindhyeswarimishra on 8/6/15.
 */

// make ajax calls

$(function () {
    console.log('Hello from jquery ... ');

    // make a call for initiating the long running process
    $.getJSON('/long-running-operation', function (data, status_text, jqXHR) {
        console.log(data.url);
        polling(data.url); // /updates/9d10975f-9e61-47e9-95f7-80bf0b76556a
        console.log(jqXHR.status);
    });

    function polling(url) {
        //
        var intervalid = setInterval(function () {
            $.getJSON(url, function (data) {
                if (data.status === 'complete') {
                    // operation is done
                    clearInterval(intervalid);
                    console.log(data.result);
                }
            });
        }, 5000);
    }
});

