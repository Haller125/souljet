var inputs2 = $('.form2 input');



var values2 = []; 


function outputData(){ // function outputs data from cookie to webPage
    // below we are checking if we have necessary values in cookie
        var cookieValue1 = document.cookie.replace(/(?:(?:^|.*;\s*)nameI\s*\=\s*([^;]*).*$)|^.*$/, "$1");// parsing cookie
        var cookieValue2 = document.cookie.replace(/(?:(?:^|.*;\s*)lastOnl\s*\=\s*([^;]*).*$)|^.*$/, "$1");// parsing cookie
        var cookieValue3 = document.cookie.replace(/(?:(?:^|.*;\s*)emailI\s*\=\s*([^;]*).*$)|^.*$/, "$1");// parsing cookie
        console.log(cookieValue1);
        console.log(cookieValue3);
        $('#nameI').replaceWith(cookieValue1); // replacing <input> with user's name
        //$('#countryI').replaceWith(cookieValue2); // replacing <input> with user's country
        $('#emailI').replaceWith(cookieValue3); // replacing <input> with user's email
        $('.ProfileH1').html('Hello, ' + cookieValue1 + '!');
}

// Set data, such as name, country, email from input's to cookie
function setData(){
    inputs2.each(function(index, elements) {
        values2.push($(this).val()); // adding data to massive
    });
    document.cookie = 'nameI=' + values2[0]  + ';'; // setting to cookie
    //document.cookie = 'countryI=' + values2[1]  + ';';  // setting to cookie
    document.cookie = 'emailI=' + values2[1]  + ';';  // setting to cookie
    document.cookie = 'password=' + values2[2] + ';';   
}

function recordTime(){
    document.cookie = "lastOnl=" + Date.now();
}

// functions that we call on refreshing the page
function onload(){
    howMuchtime();
    outputData();
}

// changing innerHTML of id LastTime (output the result)
function howMuchtime(){
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('lastOnl=')).length) {//checking cookie
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)lastOnl\s*\=\s*([^;]*).*$)|^.*$/, "$1");// parsing cookie
        var time = (Date.now() - cookieValue) / 1000; // Formatting the difference between last visited time and current time from ms to sec by dividing it by 1000
        $('#timeI').html("Last time you visited the site was " + time + " second ago"); // change the innerHTML
    }
    recordTime(); // call the function which save data into cookie
}

function clearCookie(){
    browser.cookies.remove();
}