/*
 * Free Choice - Jasper Adams - 1/4/18
 */

var numTweets = 0;

$(document).ready(function () {
    $.ajax({
        url: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180116T183002Z.192ac0a6cf041a45.d70bb0ebc90b0a35c2a519a3ed363a615c147ed6',
        type: 'POST',
        success: function(result) {
            populateList(result);
        }
    });
    getTweets();
    $(".button1").click(function () {
        console.log("test");
        getTweets();
    })
});

function getTweets() {
    $.getJSON("condensed_2018.json", function(result) {
        var n = numTweets;
        for (var i = n; i < (n + 5); i++) {
            var tweet = makeTweet(result[i].text, result[i].created_at.substring(0, 10), i);
            $("#tweets").append(tweet);
            numTweets++;
        }
        $(".twitter-tweet").click(function () {
            var text = result[this.id].text;
            translate(text);
        });
    });
}

function translate(input){
    var text = deleteSpace(input);
    var lang = $("#langs").val();
    $.ajax({
        url: 'https://translate.yandex.net/api/v1.5/tr/translate?lang=' + lang + '&key=trnsl.1.1.20180116T183002Z.192ac0a6cf041a45.d70bb0ebc90b0a35c2a519a3ed363a615c147ed6&text=' + text,
        type: 'POST',
        success: function(result) {
            var text = new XMLSerializer().serializeToString(result);
            var display = $("#translation");
            display.empty();
            var tweet = makeTranslatedTweet(text);
            display.append(tweet);
        }
    });
}

function deleteSpace(term) {
    var returnTerm = "";
    for(var i = 0; i < term.length; i++){
        if(term[i] === " "){
            returnTerm += "+";
        }
        else{
            returnTerm += term[i];
        }
    }
    return returnTerm;
}

function populateList(obj){
    for(var i in obj.langs){
        var opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = obj.langs[i];
        document.getElementById("langs").appendChild(opt);
    }
}

function makeTweet(text, date, index){
    return "<blockquote id='" + index + "' class='twitter-tweet'>" +
        "                <p>" + text + "</p>" +
        "                -Donald Trump (" + date + ")" +
        "            </blockquote>";
}

function makeTranslatedTweet(text){
    return "<blockquote class='twitter-tweet'>" +
        "                <p>" + text + "</p>" +
        "                -Donald Trump" +
        "            </blockquote>";
}


