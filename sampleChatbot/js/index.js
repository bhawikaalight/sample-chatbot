var LOCALDB = [],
    BOT_CONFIG = {},
    BOT_RESOURCES = {},
    DEBUG = true;

function btnResponse(submitBtn, msg) {
    $('#stick').before('<div class="botMsg"><span class="botavtar-img"></span><span class="content"><blockquote><p>' + msg + '</p></blockquote></span></div>');
    submitBtn.disabled = true;
    $("#userInput").focus();
}

$(document).ready(function () {

    var DEBUG = true;
    Promise.all([fetchLocalDB(), fetchBotConfig(), fetchBotResources()]).then(function (DBandConfig) {
        $("#userInput").removeAttr("disabled");

        $("#stick").before('<div class="botMsg"><span class="botavtar-img"></span><span class="content">' + BOT_CONFIG.metaConfig.welcomeText + '</span></div>')
    })

    $("#userInput").keyup(function (event) {
        if (event.keyCode == 13) {
            if (this.value.trim().length) {
                sendUserMsg(this.value).then(function (identifiedIntent) {
                    var BOTREPLY = {},
                        responseAudio = "audio/AUD_",
                        botResponseObject = {};

                    identifiedIntent = identifiedIntent.data
                    if (identifiedIntent.dialogState.toLowerCase() === "elicitintent") {
                        BOTREPLY = {
                            "intent": BOT_CONFIG.metaConfig.botName + "_UNKNOWN_INTENT_ERROR",
                            "description": "Intent not identified",
                            "resources": "",
                            "suggestions": [],
                            "type": "plaintext",
                            "responses": [{
                                    "content": "<p>Sorry, I didn't get that. Could you please rephrase it for me?</p>"
                            }
                        ]
                        }
                        botResponseObject = prepareResponse(BOTREPLY)
                        responseAudio += "ERROR.mp3"
                    } else if (identifiedIntent.dialogState.toLowerCase() === "failed") {
                        BOTREPLY = {
                            "intent": BOT_CONFIG.metaConfig.botName + "_ENDCONV_ERROR",
                            "description": "Intent not identified. Closing conversation",
                            "resources": "",
                            "suggestions": [],
                            "type": "plaintext",
                            "responses": [{
                                    "content": "<p>I'm sorry, probably I can't help you with that.</p>"
                            }
                        ]
                        }
                        botResponseObject = prepareResponse(BOTREPLY)
                        responseAudio += "END.mp3"
                    } else {
                        BOTREPLY = getRespFromDB(identifiedIntent.intentName)
                        botResponseObject = prepareResponse(BOTREPLY)
                        responseAudio += identifiedIntent.intentName + "_RESP_" + botResponseObject.responseIndex + ".mp3";
                    }
                    $("#userInput").val('');
                    console.log('response object: ', BOTREPLY);
                    // var botResponseObject = prepareResponse(BOTREPLY)
                    var responseHTML = botResponseObject.responseDOM;
                    $("#typing").toggleClass("hidden");
                    console.log('responseAudio path:', responseAudio);

                    if (BOT_CONFIG.enableBotVoice) {
                        console.info('Fetching : ', responseAudio);
                        fetchAudio(responseAudio, responseHTML, BOTREPLY);
                    } else {
                        $("#stick").before(responseHTML);
                        $("#userInput").removeAttr("disabled");
                        $("#userInput").focus();
                        if (BOT_CONFIG.enableSuggestions) {
                            showSuggestions(BOTREPLY.suggestions)
                        }
                    }
                    if (BOT_CONFIG.enableLogging) {
                        logger(identifiedIntent, BOT_CONFIG, BOTREPLY);
                    }
                }).catch(function (a, b, c) {
                    if ((a.status >= 400) && (a.status <= 600))
                        $("#stick").before("<div class='row'><div class='col-lg-6 col-lg-offset-3'><div class='alert alert-danger text-center'><p>Something went wrong. Please try after some time.</p></div></div></div>");
                    $("#typing p").addClass("hidden");
                });
                $("#typing").toggleClass("hidden");
                $("#stick").before("<div class='userMsg text-right'><span class='avtar-img'></span><span class='content'>" + this.value + "</span></div>");
                var conheight = $("#conversation").height();
                $('.chat-wrapper').animate({
                    scrollTop: conheight
                }, 2000);
            }
        }
    })

    $("#suggestionSelector").on("click", ".badge", function () {
        var e = $.Event('keyup');
        e.which = 13;
        e.keyCode = 13;
        $("#userInput").val(this.innerHTML)
        $("#userInput").trigger(e);
    })
    $("#sendBtn").on("click", function () {
 var e = $.Event('keyup');
        e.which = 13;
        e.keyCode = 13;
        $("#userInput").trigger(e);
    })
})
//INIT FUNCTIONS=======================
function fetchLocalDB() {
    return $.ajax({
            url: "js/localDB.json",
            type: "GET",
            contentType: "application/json",
            processData: false,
            dataType: "json"
        })
        .then(function (localDB) {
            LOCALDB = localDB;
            return true;
        })
        .catch(function (err) {
            console.error("Error fetching DB : ", err)
        });
}

function fetchBotResources() {
    return $.ajax({
            url: "js/resources.json",
            type: "GET",
            contentType: "application/json",
            processData: false,
            dataType: "json"
        })
        .then(function (botresources) {
            BOT_RESOURCES = botresources;
            return true;
        })
        .catch(function (err) {
            console.error("Error fetching DB : ", err)
        });
}

function fetchBotConfig() {
    return $.ajax({
            url: "js/botConfig.json",
            type: "GET",
            contentType: "application/json",
            processData: false,
            dataType: "json"
        })
        .then(function (botConfig) {
            botConfig.botServiceConfig.forEach(function (conf, ind) {
                BOT_CONFIG[conf.serviceCode] = conf.value;
            });
            botConfig.botUIConfig.forEach(function (conf, ind) {
                BOT_CONFIG[conf.serviceCode] = conf.value;
            });
            BOT_CONFIG.metaConfig = botConfig.metaConfig;
            BOT_CONFIG.metaConfig.userId = botConfig.metaConfig.botName.toUpperCase() + Date.now();
            document.head.appendChild(document.createElement("style")).id = "customStyles"
            var customStyles = $("#customStyles");
            customStyles.append(".userMsg  .content{background:" + BOT_CONFIG.userRespColor + ";color:" + BOT_CONFIG.userRespFontColor + ";}.botMsg .content{background:" + BOT_CONFIG.botRespColor + ";color:" + BOT_CONFIG.botRespFontColor + "}.avtar-img{background:url(img/" + BOT_CONFIG.userAvatar + ".png)}.botavtar-img{background:url(img/" + BOT_CONFIG.botAvatar + ".png)}.container{background:" + BOT_CONFIG.conversationColor + "}");
            return true;
        })
        .catch(function (err) {
            console.error("Error fetching Bot config : ", err)
        });
}

//MESSAGE HANDLING=====================
function sendUserMsg(userInput) {
    params = {
        "action": "postText",
        data: {
            "botAlias": BOT_CONFIG.metaConfig.botAlias,
            "botName": BOT_CONFIG.metaConfig.botName,
            "userId": BOT_CONFIG.metaConfig.userId,
            "inputStream": userInput,
            "contentType": "text/plain; charset=utf-8",
            "sessionAttributes": {}
        }

    };
    return $.ajax({
        url: BOT_CONFIG.metaConfig.API_URL,
        type: "POST",
        contentType: "application/json",
        processData: false,
        dataType: "json",
        data: JSON.stringify(params)
    });
}

function getRespFromDB(intentName) {
    var responseFromDB = {}
    LOCALDB.forEach(function (response) {
        if (response.intent == intentName) {
            responseFromDB = response;
        }
    });
    return responseFromDB;
}

function prepareResponse(BOTREPLY) {
    if (BOTREPLY.type == "plaintext") {
        var botResponseObject = randomFromArray(BOTREPLY.responses);
        var botResources = BOTREPLY.resource;
        var responseMsg = "<div class='botMsg'><span class='botavtar-img'></span><span class='content'>" + botResponseObject.resp.content;

        if (botResources && botResources != "") {
            responseMsg += "<span class='special'>" + BOT_RESOURCES.resources[botResources].text + "</span>";
        }
        responseMsg += "</span></div>";
        return {
            responseDOM: responseMsg,
            responseIndex: botResponseObject.respIndex
        }
    } else if (BOTREPLY.type == "card" && BOTREPLY.subType == "link") {
        var botResponseObject = randomFromArray(BOTREPLY.responses);
        var hyperlink = BOTREPLY.URL;
        return {
            responseDOM: "<div class='botMsg'><span class='botavtar-img'></span><span class='content'><a class='link' href='" + hyperlink + "' target='_blank'>" + botResponseObject.resp.content + "</a></span></div>",
            responseIndex: botResponseObject.respIndex
        }
    } else if (BOTREPLY.type == "card" && BOTREPLY.subType == "image") {
        var botResponseObject = randomFromArray(BOTREPLY.responses);
        var imgsrc = BOTREPLY.URL;
        return {
            responseDOM: "<div class='botMsg'><span class='botavtar-img'></span><span class='content'><img src='" + imgsrc + "' class='chat-img' /> <span class='withimg'>" + botResponseObject.resp.content + "</span></span></div>",
            responseIndex: botResponseObject.respIndex
        }
    } else if (BOTREPLY.type == "form" && BOTREPLY.subType == "single") {

        var botResponseObjects = BOTREPLY.formOptions;
        var followUp = BOTREPLY.followUpMsg;
        var formHead = BOTREPLY.responses[0];
        var responseForm = '<div class="botMsg"><span class="botavtar-img"></span><span class="content"><div class="form-start"><p class="form-head">' + formHead.content + '</p>';
        botResponseObjects.forEach(function (botResponseObject, index) {
            responseForm += '<label class="radio"><input type="radio" id="inlineRadio" value="' + botResponseObject + '"/>' + botResponseObject + '</label>';
        });
        responseForm += "<button class=\"btn submitrqst btn-sm pull-right\" onclick=\"btnResponse(this,'" + followUp + "')\">Submit</button></div></span></div>";
        return {
            responseDOM: responseForm
        }
    } else if (BOTREPLY.type == "form" && BOTREPLY.subType == "multi") {
        var botResponseObjects = BOTREPLY.formOptions;
        var followUp = BOTREPLY.followUpMsg;
        var formHead = BOTREPLY.responses[0];
        var responseForm = '<div class="botMsg"><span class="botavtar-img"></span><span class="content"><div class="form-start"><p class="form-head">' + formHead.content + '</p>';
        botResponseObjects.forEach(function (botResponseObject, index) {
            responseForm += '<label class="checkbox"><input type="checkbox" name="" id="inlineCheck" value="' + botResponseObject + '"/>' + botResponseObject + '</label>';
        });
        responseForm += "<button class=\"btn submitrqst btn-sm pull-right\" onclick=\"btnResponse(this,'" + followUp + "')\">Submit</button></div></span></div>";
        return {
            responseDOM: responseForm
        }
    } else if (BOTREPLY.type == "card" && BOTREPLY.subType == "linkList") {
        var botResponseObjects = BOTREPLY.responses[0];
        var listItems = BOTREPLY.linkList;
        var linkListDOM =
            '<div class="botMsg"><span class="botavtar-img"></span><span class="content"><p>' + botResponseObjects.content + '</p><ul class="list list-unstyled">';
        listItems.forEach(function (listItem, index) {
            linkListDOM += '<li class="cool-link"><a href="' + listItem.url + '"  target="_blank">' + listItem.name + '</li>';
        });
        linkListDOM += '</ul></span></div>';
        return {
            responseDOM: linkListDOM
        }
    } else if (BOTREPLY.type == "card" && BOTREPLY.subType == "option") {
        var botResponseObject = randomFromArray(BOTREPLY.responses);
        var btnUrl1 = BOTREPLY.actionURL1;
        var btnUrl2 = BOTREPLY.actionURL2;
        return {
            responseDOM: "<div class='botMsg'><span class='botavtar-img'></span><span class='content text-center'>" + botResponseObject.resp.content + "<a href='" + btnUrl1 + "' class='btn submitrqst btn-sm' target='_blank'>" + botResponseObject.resp.action1 + "</a><a href='" + btnUrl2 + "' class='btn submitrqst btn-sm' target='_blank'>" + botResponseObject.resp.action2 + "</a></span></span></div>",
            responseIndex: botResponseObject.respIndex
        }
    }
}

//SERVICE FUNCTIONS====================
function showSuggestions(suggestions) {
    if (!suggestions.length) {
        $(".suggest").addClass("invisible");
    } else {
        $(".suggest").removeClass("invisible");
        $("#suggestionSelector").empty();
        if ($(".suggest").has("strong")) {
            $(".suggest").find("strong").remove();
        }
        $("#suggestionSelector").before("<strong>Related Topics:</strong>");
        suggestions.forEach(function (suggestion) {
            $("<span class='badge'>" + suggestion + "</span>").hide()
                .appendTo("#suggestionSelector")
                .fadeIn(300);
        });
    }
}

//DATE FUNCTION
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


//LOGGING FUNCTION
function logger(identifiedIntent, BOT_CONFIG, BOTREPLY) {
    var logEntry = {};
    logEntry.user_question = $("#conversation .userMsg .content").last().text();
    logEntry.bot_response = $("#conversation .botMsg .content").last().text();
    logEntry.intent_name = identifiedIntent.intentName;
    logEntry.userip = BOT_CONFIG.metaConfig.userId;
    logEntry.intent_identified="true";
    logEntry.useSuggestion="false";
    logEntry.timestamp = new Date();
    if(identifiedIntent.intentName == BOTREPLY.intent){
        logEntry.intent_identified = "true";
    }
    else
    {
         logEntry.intent_identified = "false";
    }
   console.log(logEntry.intent_identified);
   console.log("Logging : " + JSON.stringify(logEntry));
    botanalytics(logEntry);
}

function fetchAudio(responseAudio, responseHTML, BOTREPLY) {
    Howler.unload();
    var sound = new Howl({
        src: responseAudio, //'https://s3.amazonaws.com/dsi-basebot/AUD_intent-1_RESP_0.mp3',
        autoplay: true,
        onplay: function () {
            //            $(responseHTML).hide().prependTo("#conversation").slideDown(100);           
            $('#stick').before(responseHTML).hide();
            var conheight = $("#conversation").height();
            $('.chat-wrapper').animate({
                scrollTop: conheight
            }, 2000);
            $("#userInput").removeAttr("disabled");
            if (BOT_CONFIG.enableSuggestions) {
                showSuggestions(BOTREPLY.suggestions)
            }
        }
    });
}

//HELPER FUNCTIONS=====================
randomFromArray = function (arg) {
    if (typeof arg === "object" && arg.length != undefined) {
        var random = Math.floor(Math.random() * (arg.length));
        return {
            resp: arg[random],
            respIndex: random
        };
    } else
        return false;
};
randomFromObjectKey = function (arr, key) {
    var resp = arr.map(function (obj, index) {
        return obj[key];
    });
    return randomFromArray(resp)
};
shuffle = function (array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//ANALYTICS FUNCTION
function botanalytics(logdata){
    
    var params = {action: "botanalytics", data: {"botname": BOT_CONFIG.metaConfig.botName, "clientname": BOT_CONFIG.metaConfig.botName, "data": logdata}};
    console.log(JSON.stringify(params));
$.ajax({
 url: "https://jkd5zz0mic.execute-api.us-east-1.amazonaws.com/dsidev/request"
  , type: "POST"
, contentType: "application/json"
 , processData: false
, dataType: "json"
 , headers:{
  "Content-Type": "text/plain"
 }
 , data: JSON.stringify(params)
 }).then(function(data){
if (DEBUG) 
console.log(data);
}); 
}