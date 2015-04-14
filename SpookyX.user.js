// ==UserScript==
// Displayable Name of your script
// @name          SpookyX
 
// Brief description
// @description   Enhances functionality of FoolFuuka boards. Devloped further for more comfortable ghost-posting on the moe archives.
 
// Your name, copyright  
// @author        Fiddlekins
 
// Version Number
// @version       24.9
 
// @include       https://*4plebs.org/*
// @include       http://*4plebs.org/*
// @include       https://archive.moe/*
// @include       http://*loveisover.me/*
// @include       https://*loveisover.me/*
// @include       http://*imcute.yt/*
// @include       https://*imcute.yt/*
// @include       http://boards.foolz.us/*
// @include       https://boards.foolz.us/*
// @include       https://*nyafuu.org/*
// @include       http://*nyafuu.org/*
// @include       https://*fgts.jp/*
// @include       http://*fgts.jp/*
// @include       https://*not4plebs.org/*
// @include       http://*not4plebs.org/*

// @grant         none
// @updateURL     https://github.com/Fiddlekins/SpookyX/blob/master/SpookyX.meta.js
// @downloadURL   https://github.com/Fiddlekins/SpookyX/blob/master/SpookyX.user.js
// @icon          http://i.imgur.com/LaYyYRl.png
// ==/UserScript==
 
/* USER OPTIONS START */
var imgSites = "puu.sh|i.imgur.com|i.4cdn.org|data.archive.moe|i0.kym-cdn.com|[\\S]*.deviantart.net|a.pomf.se|a.uguu.se|[0-9]{2}.media.tumblr.com"; // Sites to embed images from
var imgNumMaster = 1; // Max number of images to embed
var autoplayVids = false; // Make embedded videos play automatically (they start muted, expanding unmutes)
var hideQROptions = true; // Make the reply options hidden by default in the quick reply
var favicon = {
    "unlit": "http://i.imgur.com/xuadeJ2.png", // Choose which favicon is used normally. Default is "http://i.imgur.com/xuadeJ2.png"
    "lit": 2, // Choose which favicon is used to indicate there are unread posts. Preset numbers are 0-4, replace with link to custom image if you desire such as: "http://i.imgur.com/XGsrewo.png"
    "alert":"", // The favicon that indicates unread replies to your posts. Value is ignored if using a preset faviconLit
    "alertOverlay":"http://i.imgur.com/6EfJyYA.png" // The favicon overlay that indicates unread replies. Default is "http://i.imgur.com/6EfJyYA.png"
};
var features = {
    "postCounter":false,   // Add a post counter to the reply box
    "inlineImages":true,   // Load full-size images in the thread, enable click to expand
    "hidePosts":false,     // Allow user to hide posts manually
    "newPosts":true,       // Reflect new posts in the tab name
    "embedImages":true,    // Embed image links in thread
    "embedGalleries":true, // Embed imgur galleries into a single post for ease of image dumps
    "inlineReplies":true,  // Click replies to expand them inline
    "postQuote":true,      // Clicking the post number will insert highlighted text into the reply box
    "filter":false,          // Hide undesirable posts from view
    "labelYourPosts":true, // Add '(You)' to your posts and links that point to them
    "favicon":true,        // Switch to a dynamic favicon that indicates unread posts and unread replies
    "imageHover":true,     // Hovering over images with the mouse brings a full or window scaled version in view
    "videoHover":true,     // Hovering over videos with the mouse brings a full or window scaled version in view
    "gallery":true         // Pressing G will bring up a view that displays all the images in a thread
};
var filterCharThreshold = 100; // Filter posts with less than this number of characters
var filteredStringsT0 = [    // List of Tier 0 strings to filter for. Capitalisation sensitive
    //"[\\S]*(a{4,}|b{4,}|c{4,}|d{4,}|e{4,}|f{4,}|g{4,}|h{4,}|i{4,}|j{4,}|k{4,}|l{4,}|m{4,}|n{4,}|o{4,}|p{4,}|q{4,}|r{4,}|s{4,}|t{4,}|u{4,}|v{4,}|w{4,}|x{4,}|y{4,}|z{4,})[\\S]*",
    "[\\S]*(e{4,}|E{4,}|i{4,}|I{4,}|o{4,}|O{4,}|u{4,}|U{4,})[\\S]*",
    "E(G|g)(O|o)(-kun|kun)?"
];
var filteredStringsT1 = [    // List of Tier 1 strings to filter for
    "daki[\\S]*",
    "ded",
    "ayy lmao",
    "incest",
    "imoutos?",
    "moonrunes",
    "tale[\\S]*[^( of witches)]",
    "ree+[\\S]*",
    "boogeyman",
    "normies"
];
var filteredStringsT2 = [    // List of Tier 2 strings to filter for
    "quest whe?n[?]*",
    "test",
    "tsukaima"
];
var filteredTrips = [       // List of tripcodes to filter for
    "!!/90sanF9F3Z"
];
var filteredNames = [       // List of names to filter for
    "久保島のミズゴロウ"
];
/* USER OPTIONS END */
 
var newPostCount = 0;
var DocumentTitle = document.title;
var ignoreInline = ['v'];
var rulesBox = $(".rules_box").html();
if(autoplayVids){var autoplayVid = "autoplay";}else{var autoplayVid="";}
var queuedYouLabels = [];
 
var pattThreadAndID = new RegExp("thread\/[0-9]+\/");
var pattThreadID = new RegExp("[0-9]+");
var threadID; // Returns undefined if there's no thread
if (pattThreadAndID.exec(document.URL) !== null){
    threadID = pattThreadID.exec(pattThreadAndID.exec(document.URL))[0];
}
 
function ThreadUpdate(features) {
    if (features.postCounter){postCounter();}  
    if (features.inlineImages){inlineImages();}
    if (features.hidePosts){hidePosts();}
    if (features.newPosts){newPosts();}
    if (features.embedImages){embedImages();}
    if (features.inlineReplies){inlineReplies();}
    if (features.postQuote){postQuote();}
    if (features.filter){filter();}
}
 
switch(favicon.lit) {
    case 0: favicon.lit = "http://i.imgur.com/7iTgtjy.png"; favicon.alert = "http://i.imgur.com/QrkQSo0.png"; break;
    case 1: favicon.lit = "http://i.imgur.com/AWVjxfw.png"; favicon.alert = "http://i.imgur.com/KXIPcD9.png"; break;
    case 2: favicon.lit = "http://i.imgur.com/S7uBSPZ.png"; favicon.alert = "http://i.imgur.com/7IxJvBN.png"; break;
    case 3: favicon.lit = "http://i.imgur.com/Rt8dEaq.png"; favicon.alert = "http://i.imgur.com/tvJjpqF.png"; break;
    case 4: favicon.lit = "http://i.imgur.com/3bRaVUl.png"; favicon.alert = "http://i.imgur.com/5Bv27Co.png"; break;
    default: break;
}
 
$.fn.elemText = function() {
    var text = '';
    this.each(function() {
        $(this).contents().each(function() {
            if (this.nodeType == Node.TEXT_NODE)
                text += this.textContent;
        });
    });
    return text;
};
 
var escapeRegExp;
 
$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height() - 200;
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};
 
(function () {
    // Referring to the table here:
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
    // these characters should be escaped
    // \ ^ $ * + ? . ( ) | { } [ ]
    // These characters only have special meaning inside of brackets
    // they do not need to be escaped, but they MAY be escaped
    // without any adverse effects (to the best of my knowledge and casual testing)
    // : ! , =
    // my test "~!@#$%^&*(){}[]`/=?+\|-_;:'\",<.>".match(/[\#]/g)
 
    var specials = [
        // order matters for these
        "-"
        , "["
        , "]"
        // order doesn't matter for any of these
        , "/"
        , "{"
        , "}"
        , "("
        , ")"
        , "*"
        , "+"
        , "?"
        , "."
        , "\\"
        , "^"
        , "$"
        , "|"
    ]
 
    // I choose to escape every character with '\'
    // even though only some strictly require it when inside of []
    , regex = RegExp('[' + specials.join('\\') + ']', 'g')
    ;
    escapeRegExp = function (str) {
        return str.replace(regex, "\\$&");
    };
 
    // test escapeRegExp("/path/to/res?search=this.that")
}());
 
shortcut = {
    'all_shortcuts':{},//All the shortcuts are stored in this array
    'add': function(shortcut_combination,callback,opt) {
        //Provide a set of default options
        var default_options = {
            'type':'keydown',
            'propagate':false,
            'disable_in_input':false,
            'target':document,
            'keycode':false
        };
        if(!opt) opt = default_options;
        else {
            for(var dfo in default_options) {
                if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }
 
        var ele = opt.target;
        if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
        var ths = this;
        shortcut_combination = shortcut_combination.toLowerCase();
 
        //The function to be called at keypress
        var func = function(e) {
            e = e || window.event;
 
            if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                var element;
                if(e.target) element=e.target;
                else if(e.srcElement) element=e.srcElement;
                if(element.nodeType==3) element=element.parentNode;
 
                if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
            }
 
            //Find Which key is pressed
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            var character = String.fromCharCode(code).toLowerCase();
 
            if(code == 188) character=","; //If the user presses , when the type is onkeydown
            if(code == 190) character="."; //If the user presses , when the type is onkeydown
 
            var keys = shortcut_combination.split("+");
            //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
            var kp = 0;
 
            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
                "`":"~",
                "1":"!",
                "2":"@",
                "3":"#",
                "4":"$",
                "5":"%",
                "6":"^",
                "7":"&",
                "8":"*",
                "9":"(",
                "0":")",
                "-":"_",
                "=":"+",
                ";":":",
                "'":"\"",
                ",":"<",
                ".":">",
                "/":"?",
                "\\":"|"
            };
            //Special Keys - and their codes
            var special_keys = {
                'esc':27,
                'escape':27,
                'tab':9,
                'space':32,
                'return':13,
                'enter':13,
                'backspace':8,
 
                'scrolllock':145,
                'scroll_lock':145,
                'scroll':145,
                'capslock':20,
                'caps_lock':20,
                'caps':20,
                'numlock':144,
                'num_lock':144,
                'num':144,
 
                'pause':19,
                'break':19,
 
                'insert':45,
                'home':36,
                'delete':46,
                'end':35,
 
                'pageup':33,
                'page_up':33,
                'pu':33,
 
                'pagedown':34,
                'page_down':34,
                'pd':34,
 
                'left':37,
                'up':38,
                'right':39,
                'down':40,
 
                'f1':112,
                'f2':113,
                'f3':114,
                'f4':115,
                'f5':116,
                'f6':117,
                'f7':118,
                'f8':119,
                'f9':120,
                'f10':121,
                'f11':122,
                'f12':123
            };
 
            var modifiers = {
                shift: { wanted:false, pressed:false},
                ctrl : { wanted:false, pressed:false},
                alt  : { wanted:false, pressed:false},
                meta : { wanted:false, pressed:false} //Meta is Mac specific
            };
 
            if(e.ctrlKey) modifiers.ctrl.pressed = true;
            if(e.shiftKey)  modifiers.shift.pressed = true;
            if(e.altKey)  modifiers.alt.pressed = true;
            if(e.metaKey)   modifiers.meta.pressed = true;
 
            for(var i=0; k=keys[i],i<keys.length; i++) {
                //Modifiers
                if(k == 'ctrl' || k == 'control') {
                    kp++;
                    modifiers.ctrl.wanted = true;
 
                } else if(k == 'shift') {
                    kp++;
                    modifiers.shift.wanted = true;
 
                } else if(k == 'alt') {
                    kp++;
                    modifiers.alt.wanted = true;
                } else if(k == 'meta') {
                    kp++;
                    modifiers.meta.wanted = true;
                } else if(k.length > 1) { //If it is a special key
                    if(special_keys[k] == code) kp++;
 
                } else if(opt['keycode']) {
                    if(opt['keycode'] == code) kp++;
 
                } else { //The special keys did not match
                    if(character == k) kp++;
                    else {
                        if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character];
                            if(character == k) kp++;
                        }
                    }
                }
            }
 
            if(kp == keys.length &&
               modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
               modifiers.shift.pressed == modifiers.shift.wanted &&
               modifiers.alt.pressed == modifiers.alt.wanted &&
               modifiers.meta.pressed == modifiers.meta.wanted) {
                callback(e);
 
                if(!opt['propagate']) { //Stop the event
                    //e.cancelBubble is supported by IE - this will kill the bubbling process.
                    e.cancelBubble = true;
                    e.returnValue = false;
 
                    //e.stopPropagation works in Firefox.
                    if (e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    return false;
                }
            }
        };
        this.all_shortcuts[shortcut_combination] = {
            'callback':func,
            'target':ele,
            'event': opt['type']
        };
        //Attach the function with the event
        if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
        else ele['on'+opt['type']] = func;
    },
 
    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove':function(shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination]);
        if(!binding) return;
        var type = binding['event'];
        var ele = binding['target'];
        var callback = binding['callback'];
 
        if(ele.detachEvent) ele.detachEvent('on'+type, callback);
        else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on'+type] = false;
    }
};
 
var getBoard = function() {
    var URL = document.URL;
    return URL.split("/")[3];
};
 
var inlineImages = function()
{
    // I Believe because I'm setting the src of the thumbnail to the full image right away,
    // it also causes the images to be prefetched
    $('.thread_image_box').each(function(index,currentImage) {
        if ($(currentImage).data("inline") != "true"){
            //$(currentImage).find('a').each(function() {
            $(currentImage).find('>a').each(function() {
                var fullImage = $(this).attr('href');
                //    if (!fullImage.match(/thumb(-[23])?/)){
                //        if (!fullImage.match(/search(-[23])?/)){
                //            if (!fullImage.match(/redirect?/)){
                //                if (!fullImage.match(/download/)){
                if (fullImage.match(/\.webm$/)){ // Handle post webms
                    $(currentImage).html('<video width="125" style="float:left" name="media" loop muted '+autoplayVid+'><source src="'+fullImage+'" type="video/webm"></video>');
                }else if (!fullImage.match(/(\.pdf|\.swf)$/)){
                    $(currentImage).find('img').each(function()  {
                        var thumbImage = $(this).attr('src');
                        $(this).attr('src',fullImage);
                        $(this).error(function(e){ // Handle images that won't load
                            if (fullImage !== thumbImage){ // If the image has a thumbnail aka was 4chan native then use that
                                $(this).attr('src',thumbImage);
                            }
                        });
                        $(this).removeAttr('width');
                        $(this).removeAttr('height');
                        if ($(this).data("handled") != "true"){
                            if ($(this).hasClass("thread_image")){ // Handle OP images
                                $(this).data("handled","true");
                                $(this).addClass("smallImageOP");
                                $(this).click(function(e){
                                    if (!e.originalEvent.ctrlKey && e.which == 1){
                                        e.preventDefault();
                                        $($(this)["0"]["previousSibling"]).toggle(); // Toggle the Spoiler text
                                        $(this).toggleClass("smallImageOP");
                                        $(this).toggleClass("bigImage");
                                        $('#hoverUI').html('');
                                        $(this).trigger("mouseenter");
                                    }
                                });
                            }else{ // Handle post images
                                $(this).addClass("smallImage");
                                $(this).click(function(e){
                                    if (!e.originalEvent.ctrlKey && e.which == 1){
                                        e.preventDefault();
                                        $($(this)["0"]["previousSibling"]).toggle(); // Toggle the Spoiler text
                                        $(this).toggleClass("smallImage");
                                        $(this).toggleClass("bigImage");
                                        $('#hoverUI').html('');
                                        $(this).trigger("mouseenter");
                                    }
                                });
                            }
                        }
                    });
                }
                //              }
                //          }    
                //      }
                //  }
            });
            if(features.imageHover){imageHover();}
            $(currentImage).data("inline","true");
        }
    });
 
    $('#main video').each(function(index,currentVideo) {
        if ($(currentVideo).data("inline") != "true"){
            $(this).click(function(e){
                //e.preventDefault();
                if ($(this).hasClass("fullVideo")){
                    this.pause();
                    this.muted=true;
                    $(this).attr('width',"125");
                    $(this).removeAttr('controls');
                    $(this).removeClass("fullVideo");
                }else{
                    $(this).removeAttr('width');
                    $(this).attr('controls',"");
                    $(this).addClass("fullVideo");
                    this.muted=false;
                    this.play();
                }
                $('#hoverUI').html('');
                $(this).trigger("mouseenter");
            });
            $(currentVideo).data("inline","true");
            if(features.videoHover){videoHover();}
        }
    });
};
 
var inlineReplies = function(){
    $('article.post').each(function(index,currentPost) {
        if ($(currentPost).data("inline") != "true"){
            $(this).addClass("base");
        }
        $(currentPost).data("inline","true");
    });
    $('.post_backlink > .backlink').each(function(index,currentPost) {
        if ($(currentPost).data("inline") != "true"){
            $(this).on("click", function(e){
                if (!e.originalEvent.ctrlKey && e.which == 1){
                    e.preventDefault();
                    //e.stopPropagation();
                    var postID = $(this).attr("data-post");
                    var rootPostID = $(e["target"].closest('article.base')).attr('id');
                    if ($(e["target"]).hasClass("inlined")){
                        $(e["target"]).removeClass("inlined");
                        $('.sub'+rootPostID).each(function(index,currentPost){
                            $("#"+currentPost.id.substr(1)+".forwarded").removeClass("forwarded");
                        });
                        $('#i'+postID+'.sub'+rootPostID).remove();
                    }else{
                        $(e["target"]).addClass("inlined");
                        $(e["target"]["parentNode"]["parentNode"]).after('<div class="inline sub'+rootPostID+'" id="i'+postID+'"></div>');
                        $("#"+postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id","r"+postID).appendTo($("#i"+postID+'.sub'+rootPostID));
                        $("#"+rootPostID+'.base .inline').each(function(index,currentPost){
                            if (!$(this).hasClass('sub'+rootPostID)){
                                $(this).attr("class","inline sub"+rootPostID);
                            }
                        });
                        $("#i"+postID+" .post_wrapper").addClass("post_wrapperInline");
                    }
                }
            });
            $(currentPost).data("inline","true");
        }
    });
    $('.text .backlink').each(function(index,currentPost) {
        if ($(currentPost).data("inline") != "true"){
            $(this).on("click", function(e){
                if (!e.originalEvent.ctrlKey && e.which == 1){
                    e.preventDefault();
                    //e.stopPropagation();
                    var postID = $(this).attr("data-post");
                    var rootPostID = $(e["target"].closest('article.base')).attr('id');
                    if ($(e["target"]).hasClass("inlined")){
                        $(e["target"]).removeClass("inlined");
                        $('.sub'+rootPostID).each(function(index,currentPost){
                            $("#"+currentPost.id.substr(1)+".forwarded").removeClass("forwarded");
                        });
                        $('#i'+postID+'.sub'+rootPostID).remove();
                    }else{
                        $(e["target"]).addClass("inlined");
                        $(e["target"]["parentNode"]).after('<div class="inline sub'+rootPostID+'" id="i'+postID+'"></div>');
                        $("#"+postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id","r"+postID).appendTo($("#i"+postID+'.sub'+rootPostID));
                        $("#"+rootPostID+'.base .inline').each(function(index,currentPost){
                            if (!$(this).hasClass('sub'+rootPostID)){
                                $(this).attr("class","inline sub"+rootPostID);
                            }
                        });
                        $("#i"+postID+" .post_wrapper").addClass("post_wrapperInline");
                    }
                }
            });
            $(currentPost).data("inline","true");
        }
    });
};
 
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
 
var postQuote = function(){
    $('.post_data > [data-function=quote]').each(function(index,currentPost) {
        if ($(currentPost).data("quotable") != "true"){
            $(this).removeAttr("data-function"); // Disable native quote function
            $(this).on("click", function(e){
                if (!e.originalEvent.ctrlKey && e.which == 1){
                    e.preventDefault();
                    var postnum = $(this)["0"].innerHTML;
                    var input = document.getElementById('reply_chennodiscursus');
 
                    if (input.selectionStart !== undefined)
                    {
                        var startPos = input.selectionStart;
                        var endPos = input.selectionEnd;
                        var startText = input.value.substring(0, startPos);
                        var endText = input.value.substring(startPos);
 
                        var originalText = input.value;
                        var selectedText = getSelectionText();
                        var newText;
                        if (selectedText === ""){
                            newText = startText +">>"+postnum+"\n"+ endText;
                        }else{
                            newText = startText +">>"+postnum+"\n>"+ selectedText +"\n"+ endText;
                        }
                        document.getElementById('reply_chennodiscursus').value = originalText.replace(originalText,newText);
                    }
                }
            });
            $(currentPost).data("quotable","true");
        }
    });
};
 
var hidePosts = function(){
    $('.pull-left').each(function(index, currentPost){
        if ($(currentPost).hasClass('stub')) {
            $(currentPost).removeClass('stub');
        }
    });
};
 
var filter = function(){
    var sieveStrT0 = new RegExp("\\b("+filteredStringsT0.join("|")+")\\b"); // \b or (^|\s) works
    var sieveStrT1 = new RegExp("\\b("+filteredStringsT1.join("|")+")\\b","i"); // \b or (^|\s) works
    var sieveStrT2 = new RegExp("(^|\\s)("+filteredStringsT2.join("|")+")($|\\s)","i");
    var sieveTrip = new RegExp("("+filteredTrips.join("|")+")");
    var sieveName = new RegExp("("+filteredNames.join("|")+")");
 
    $('article.post').each(function(index,currentPost){
        if ($(currentPost).data("filtered") != "true"){
            $(currentPost).data("filtered","true");
            var postText = $(this).find('.text').elemText();
            if (sieveTrip.test($(this).find('.post_tripcode').text()) || sieveName.test($(this).find('.post_author').text())){
                shitpostT2(currentPost, postText);
            }else if(sieveStrT0.test(postText)){
                //console.log(postText.match(sieveStrT0));
                shitpostT0(currentPost, postText);
            }else if (postText.length <= filterCharThreshold){
                if (sieveStrT1.test(postText)){
                    //console.log(postText.match(sieveStrT1));
                    shitpostT1(currentPost, postText);
                } else if (sieveStrT2.test(postText)){
                    //console.log(postText.match(sieveStrT2));
                    shitpostT2(currentPost, postText);
                }
            }
        }
    });
};
 
function shitpostT0(post, postText){
    $(post).addClass("shitpost");
}
function shitpostT1(post, postText){
    $(post).addClass("shitpost");
}
function shitpostT2(post, postText){
    $(post).removeClass('stub');
    $(post).find('.pull-left').removeClass('stub');
    var docID = $(post).find('.pull-left > button').attr("data-doc-id");
    $('.doc_id_'+docID).hide();
    $('.stub_doc_id_'+docID).show();
}
 
var embedImages = function() {
    $('.posts article').each(function(index, currentArticle){
        if ($(currentArticle).data('imgEmbed') != 'true'){
            var patt = new RegExp("http[s]?://("+imgSites+")/[^\"]*");
            var pattImgGal = new RegExp("http[s]?://imgur.com/[^\"]*");
            var imgNum = imgNumMaster - $(currentArticle).find('.thread_image_box').length;
            $(currentArticle).find(".text > a, .text > .spoiler, .text > strong").each(function(index, currentLink){
                if (imgNum === 0) {
                    return false;
                }
                var imglink = patt.exec($(this).html());
                if (imglink !== null){
                    imgNum--;
                    // var patt2 = new RegExp(escapeRegExp(imglink["0"]), 'g'); Can't see what this does, uncomment if things break again
                    imglink["0"] = imglink["0"].replace(/.gifv/g, ".webm"); // Only tested to work with Imgur
                    var filename = '<div class="post_file embedded_post_file"><a href="'+imglink["0"]+'" class="post_file_filename" rel="tooltip" title="'+imglink["0"]+'">'+imglink["0"].match(/[^\/]*/g)[imglink["0"].match(/[^\/]*/g).length -2]+'</a></div>';
                    var filestats = ""; //'<br><span class="post_file_metadata"> 937KiB, '+imglink["0"].naturalWidth+'x'+imglink["0"].naturalHeight+'</span>';
                    if ((/.webm/g).test(imglink["0"]) || (/.mp4/g).test(imglink["0"])){
                        $(currentArticle).find(".post_wrapper").prepend('<div class="thread_image_box"></div>');
                        $(currentArticle).find(".thread_image_box:first-child").html(filename+'<video width="125" style="float:left" name="media" loop muted '+autoplayVid+'><source src="'+imglink["0"]+'" type="video/webm"></video>'+filestats);
                    }else if ($(this).hasClass("spoiler")){
                        $(currentArticle).find(".post_wrapper").prepend('<div class="thread_image_box">'+filename+'<a href="'+imglink["0"]+'" target="_blank" rel="noreferrer" class="thread_image_link"><div class="spoilerText">Spoiler</div><img src="'+imglink["0"]+'" class="lazyload post_image spoilerImage smallImage"></a>'+filestats+'</div>');
                    }else{
                        $(currentArticle).find(".post_wrapper").prepend('<div class="thread_image_box">'+filename+'<a href="'+imglink["0"]+'" target="_blank" rel="noreferrer" class="thread_image_link"><img src="'+imglink["0"]+'" class="lazyload post_image smallImage"></a>'+filestats+'</div>');
                    }
                    $(this).remove();
                } else if (features.embedGalleries && pattImgGal.exec($(this).html()) !== null){
                    var link = pattImgGal.exec($(this).html());
                    var individualImages = link[0].match(/[A-z0-9]{7}/g);
                    $.each(individualImages, function(i,imgID){
                        $(currentArticle).find(".post_wrapper").prepend('<div class="thread_image_box"><a href="https://i.imgur.com/'+imgID+'.jpg" target="_blank" rel="noreferrer" class="thread_image_link"><img src="https://i.imgur.com/'+imgID+'.jpg" class="lazyload post_image smallImage"></a></div>');
                    });
                }
            });
            $(currentArticle).data('imgEmbed', 'true');
        }
    });
};
 
function imageHover(){
    $('img').off("mouseenter");
    $('img').off("mousemove");
    $('img').off("mouseout");
    $('img').on("mouseenter", function(e){
        if(!$(this).hasClass("bigImage")){
            $(this).clone().removeClass("smallImage smallImageOP spoilerImage").addClass("hoverImage").appendTo('#hoverUI');
            $('#hoverUI > img').css({
                "max-height":window.innerHeight,
                "max-width":window.innerWidth - e.clientX - 50,
                "top": function(){
                    return (e.clientY / window.innerHeight)*(window.innerHeight - $('#hoverUI > img')[0].height);
                },
                "left":e.clientX + 50
            });
        }
    });
    $('img').on("mousemove", function(e){
        if(!$(this).hasClass("bigImage")){
            $('#hoverUI > img').css({
                "max-width":window.innerWidth - e.clientX - 50,
                "top": function(){
                    return (e.clientY / window.innerHeight)*(window.innerHeight - $('#hoverUI > img')[0].height);
                },
                "left":e.clientX + 50
            });
        }
    });
    $('img').on("mouseout", function(e){
        $('#hoverUI').html('');
    });
}
 
function videoHover(){
    $('video').off("mouseenter");
    $('video').off("mousemove");
    $('video').off("mouseout");
    $('video').on("mouseenter", function(e){
        if(!$(this).hasClass("fullVideo")){
            $(this).clone().addClass("fullVideo hoverImage").appendTo('#hoverUI');
            $('#hoverUI > video').removeAttr('width');
            $('#hoverUI > video')[0].oncanplay = function(){
                if ($('#hoverUI > video').length){ // Check if video still exists. This is to prevent the problem where mousing out too soon still triggers the canplay event
                    $('#hoverUI > video')[0].muted=false;
                    $('#hoverUI > video')[0].play();
                    $('#hoverUI > video').css({
                        "max-height":window.innerHeight,
                        "max-width":window.innerWidth - e.clientX - 50,
                        "top": function(){
                            return (e.clientY / window.innerHeight)*(window.innerHeight - $('#hoverUI > video')[0].videoHeight);
                        },
                        "left":e.clientX + 50
                    });
                    $('video').on("mousemove", function(e){
                        $('#hoverUI > video').css({
                            "top": function(){
                                return (e.clientY / window.innerHeight)*(window.innerHeight - $('#hoverUI > video')[0].videoHeight);
                            },
                            "left":e.clientX + 50
                        });
                    });
                }
            }
        }
    });
    $('video').on("mouseout", function(e){
        $('#hoverUI').html('');
    });
}
 
var lastSeenPost;
var unseenPosts = [];
var seenPosts = function(){
    $('article.backlink_container').attr('id',"0"); // Prevent error when it's undefined
    $('article').each(function(index, currentArticle){ // Add unseen posts to array
        if (parseInt($(currentArticle).attr('id').replace(/_/g, "")) > lastSeenPost){
            unseenPosts.push($(currentArticle).attr('id'));
        }
    });
    $('article.backlink_container').removeAttr('id'); // Remove id again
    $('#'+unseenPosts[0]).addClass("unseenPost");
};
 
var unseenReplies = [];
var newPosts = function(){
    if (features.favicon){
        //console.log("newPosts called");
        if (windowFocus === true){
            $.each(unseenPosts, function(i,postID){
                if ($('#'+postID).isOnScreen() === true){
                    lastSeenPost = postID.replace(/_/g, ""); // Update last seen post
                    $.each(unseenReplies, function(i, unseenID){
                        if (unseenID == postID){
                            unseenReplies.splice(i,1); // Remove seen posts from the unseen replies
                            return;
                        }
                    });
                }
            });
            $.each(unseenPosts.filter(function(el){
                return el.replace(/_/g, "") <= lastSeenPost;
            }),function(i,postID){
                $('#'+postID).removeClass("unseenPost"); // Remove unseen class from all posts with lower ID than the last seen one
            });
            unseenPosts = unseenPosts.filter(function(el){
                return el.replace(/_/g, "") > lastSeenPost; // Remove posts from list of unseen ones if their ID is lower than the last seen one
            });
            $('#'+unseenPosts[0]).addClass("unseenPost"); // Add the unseen class to the first of the unseen posts
        }
        newPostCount = unseenPosts.length;
        if (unseenReplies.length){
            $('#favicon').attr("href", favicon.alert);
        }else if (newPostCount > 0){
            $('#favicon').attr("href", favicon.lit);
        }else{
            $('#favicon').attr("href", favicon.unlit);
        }
    }else{ // Original newpost counter code
        $('article').each(function(index, currentArticle){
            if ($(currentArticle).data('seen') != 'true')
            {
                $(currentArticle).data('seen', 'true')
                newPostCount +=1
            }
        });
        if (windowFocus == true){newPostCount = 0;}
    }
    document.title = "(" + newPostCount + ") " + DocumentTitle;
};
 
var postCounter = function() {$(".rules_box").html("<h6>Posts: " + $('.post_wrapper').length + "/400 <br> Images: " + $(".thread_image_box").length + "/250</h6>" + rulesBox);};
 
var bindShortcuts = function()
{
 
};
 
var pokemon = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran♀","nidorina","nidoqueen","nidoran♂","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetch'd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr. mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","porygon2","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","ho-oh","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat","illumise","roselia","gulpin","swalot","carvanha","sharpedo","wailmer","wailord","numel","camerupt","torkoal","spoink","grumpig","spinda","trapinch","vibrava","flygon","cacnea","cacturne","swablu","altaria","zangoose","seviper","lunatone","solrock","barboach","whiscash","corphish","crawdaunt","baltoy","claydol","lileep","cradily","anorith","armaldo","feebas","milotic","castform","kecleon","shuppet","banette","duskull","dusclops","tropius","chimecho","absol","wynaut","snorunt","glalie","spheal","sealeo","walrein","clamperl","huntail","gorebyss","relicanth","luvdisc","bagon","shelgon","salamence","beldum","metang","metagross","regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys","turtwig","grotle","torterra","chimchar","monferno","infernape","piplup","prinplup","empoleon","starly","staravia","staraptor","bidoof","bibarel","kricketot","kricketune","shinx","luxio","luxray","budew","roserade","cranidos","rampardos","shieldon","bastiodon","burmy","wormadam","mothim","combee","vespiquen","pachirisu","buizel","floatzel","cherubi","cherrim","shellos","gastrodon","ambipom","drifloon","drifblim","buneary","lopunny","mismagius","honchkrow","glameow","purugly","chingling","stunky","skuntank","bronzor","bronzong","bonsly","mime jr.","happiny","chatot","spiritomb","gible","gabite","garchomp","munchlax","riolu","lucario","hippopotas","hippowdon","skorupi","drapion","croagunk","toxicroak","carnivine","finneon","lumineon","mantyke","snover","abomasnow","weavile","magnezone","lickilicky","rhyperior","tangrowth","electivire","magmortar","togekiss","yanmega","leafeon","glaceon","gliscor","mamoswine","porygon-z","gallade","probopass","dusknoir","froslass","rotom","uxie","mesprit","azelf","dialga","palkia","heatran","regigigas","giratina","cresselia","phione","manaphy","darkrai","shaymin","arceus","victini","snivy","servine","serperior","tepig","pignite","emboar","oshawott","dewott","samurott","patrat","watchog","lillipup","herdier","stoutland","purrloin","liepard","pansage","simisage","pansear","simisear","panpour","simipour","munna","musharna","pidove","tranquill","unfezant","blitzle","zebstrika","roggenrola","boldore","gigalith","woobat","swoobat","drilbur","excadrill","audino","timburr","gurdurr","conkeldurr","tympole","palpitoad","seismitoad","throh","sawk","sewaddle","swadloon","leavanny","venipede","whirlipede","scolipede","cottonee","whimsicott","petilil","lilligant","basculin","sandile","krokorok","krookodile","darumaka","darmanitan","maractus","dwebble","crustle","scraggy","scrafty","sigilyph","yamask","cofagrigus","tirtouga","carracosta","archen","archeops","trubbish","garbodor","zorua","zoroark","minccino","cinccino","gothita","gothorita","gothitelle","solosis","duosion","reuniclus","ducklett","swanna","vanillite","vanillish","vanilluxe","deerling","sawsbuck","emolga","karrablast","escavalier","foongus","amoonguss","frillish","jellicent","alomomola","joltik","galvantula","ferroseed","ferrothorn","klink","klang","klinklang","tynamo","eelektrik","eelektross","elgyem","beheeyem","litwick","lampent","chandelure","axew","fraxure","haxorus","cubchoo","beartic","cryogonal","shelmet","accelgor","stunfisk","mienfoo","mienshao","druddigon","golett","golurk","pawniard","bisharp","bouffalant","rufflet","braviary","vullaby","mandibuzz","heatmor","durant","deino","zweilous","hydreigon","larvesta","volcarona","cobalion","terrakion","virizion","tornadus","thundurus","reshiram","zekrom","landorus","kyurem","keldeo","meloetta","genesect","chespin","quilladin","chesnaught","fennekin","braixen","delphox","froakie","frogadier","greninja","bunnelby","diggersby","fletchling","fletchinder","talonflame","scatterbug","spewpa","vivillon","litleo","pyroar","flabébé","floette","florges","skiddo","gogoat","pancham","pangoro","furfrou","espurr","meowstic","honedge","doublade","aegislash","spritzee","aromatisse","swirlix","slurpuff","inkay","malamar","binacle","barbaracle","skrelp","dragalge","clauncher","clawitzer","helioptile","heliolisk","tyrunt","tyrantrum","amaura","aurorus","sylveon","hawlucha","dedenne","carbink","goomy","sliggoo","goodra","klefki","phantump","trevenant","pumpkaboo","gourgeist","bergmite","avalugg","noibat","noivern","xerneas","yveltal","zygarde","diancie","hoopa","volcanion"];
function notifyMe(title, image, body){
    //console.log("notifyMe called");
    if (!Notification){
        alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
        return;
    }
 
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    var icon = image;
    var timeFade = true;
    if(!Math.floor(Math.random()*8192)){
        var ND = Math.floor(Math.random()*720);
        icon = "http://img.pokemondb.net/sprites/black-white/shiny/"+pokemon[ND]+".png";
        timeFade = false;
    }
 
    var notification = new Notification(title, {
        icon: icon,
        body: body
    });
 
    if (timeFade){
        notification.onshow = function (){
            setTimeout(notification.close.bind(notification), 5000);
        };
    }
    notification.onclick = function (){
        window.focus();
    };
}
 
if (features.labelYourPosts){
    var yourPosts = localStorage.yourPosts;
    if (yourPosts === undefined){
        yourPosts = {};
        console.log("Created post archive for the first time");
    } else {
        yourPosts = JSON.parse(localStorage.yourPosts);
    }
}
if (features.favicon){
    var lastSeenPosts = localStorage.lastSeenPosts;
    if (lastSeenPosts === undefined){
        lastSeenPosts = {};
        console.log("Created unseen replies archive for the first time");
    } else {
        lastSeenPosts = JSON.parse(localStorage.lastSeenPosts);
    }
    lastSeenPost = lastSeenPosts[threadID];
}
window.addEventListener("beforeunload", function (e) { // After user leaves the page
    if (features.labelYourPosts){ // Save the your posts object
        if (localStorage.yourPosts === undefined){
            localStorage.yourPosts = JSON.stringify(yourPosts);
        } else {
            localStorage.yourPosts = JSON.stringify($.extend(true, yourPosts, JSON.parse(localStorage.yourPosts)));
        }
    }
    if (features.favicon){ // Save the last read posts object
        lastSeenPosts[threadID] = lastSeenPost;
        if (localStorage.lastSeenPosts === undefined){
            localStorage.lastSeenPosts = JSON.stringify(lastSeenPosts);
        } else {
            latestLastSeenPosts = JSON.parse(localStorage.lastSeenPosts); // Get the most recent version of the stored object
            if (latestLastSeenPosts[threadID] > lastSeenPosts[threadID]){
                localStorage.lastSeenPosts = JSON.stringify(latestLastSeenPosts); // Save it again
            }else{
                localStorage.lastSeenPosts = JSON.stringify(lastSeenPosts); // Save it again
            }
        }
    }
    //var confirmationMessage = "\o/";
 
    //(e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //return confirmationMessage;                            //Webkit, Safari, Chrome
});
 
 
function labelYourPosts(firstcall){
    $.each(queuedYouLabels, function(i, v){ // Parse all names on pageload and with each post submission
        $('#'+v+' .post_author').after('<span> (You)</span>');
    });
    queuedYouLabels = [];
 
    if (firstcall){ // Parse all backlinks present on pageload
        $.each(yourPosts[threadID], function(i,v){
            $('.backlink[data-post='+v+']').each(function(){
                if ($(this).data('linkedYou') != 'true'){
                    this.textContent += ' (You)';
                    $(this).data('linkedYou','true');
                }
            });
        });
    }
}
 
function labelNewPosts(response){
    var newPosts = Object.keys(response[threadID]["posts"]);
    $.each(newPosts, function(i,postID){ // For each post returned by update
        var notificationTriggered = false;
        $('#'+postID+' .greentext > a').each(function(i, link){ // For each post content backlink
            var linkID = $(link).attr('data-post');
            if ($.inArray(linkID, yourPosts[threadID])+1){ // If the link points to your post
                if (!notificationTriggered){
                    notifyMe($('#'+postID+' .post_poster_data').text().trim()+" replied to you","http://i.imgur.com/HTcKk4Y.png",$('#'+postID+' .text').text().trim());
                    unseenReplies.push(postID); // add postID to list of unseen replies
                    notificationTriggered = true;
                }
                link.textContent += ' (You)'; // Designate the link as such
            }
            if ($.inArray(postID, yourPosts[threadID])+1){ // If the post is your own
                var backlink = $('#'+linkID+' .post_backlink [data-post='+postID+']');
                if (backlink.data('linkedYou') != 'true'){
                    backlink[0].textContent += ' (You)'; // Find your post's new reply backlink and designate it too
                    backlink.data('linkedYou','true');
                }
            }
        });
        unseenPosts.push(postID); // add postID to list of unseen posts
    });
}
 
var lastSubmittedContent;
function postSubmitEvent(){
    if ($('#reply [type=submit]').length){
        window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var target =  $('#reply [type=submit]')["0"],
            observer = new MutationObserver(function(mutation) {
                //console.log("Post Submit Event Triggered");
                lastSubmittedContent = $('#reply_chennodiscursus')[0].value;
            }),
            config = {
                attributes: true
            };
        observer.observe(target, config);
    }
}
 
$(document).ready(function(){
    $('head').after('<script src="https://cdn.rawgit.com/madapaja/jquery.selection/master/src/jquery.selection.js"></script>'); // Pull in selection plugin (http://madapaja.github.io/jquery.selection/)
    $('head').after('<style type="text/css" id="FoolX-css">#gallery{position:fixed; width:100%; height:100%; top:0; left:0; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.7);}.unseenPost{border-top: red solid 1px;}.hoverImage{position:fixed;float:none!important;}.bigImage{opacity: 1!important; max-width:100%;}.smallImage{max-width:125px; max-height:125px}.smallImageOP{max-width:250px; max-height:250px}.spoilerImage{opacity: 0.1}.spoilerText{position: relative; height: 0px; font-size: 19px; top: 47px;}.forwarded{display:none}.inline{border:1px solid; display: table; margin: 2px 0;}.inlined{opacity:0.5}.post_wrapper{border-right: 1px solid #cccccc;}.post_wrapperInline{border-right:0!important; border-bottom:0!important;}.quickReply{position: fixed; top: 0; right: 0; margin: 3px !important;}.shitpost{opacity: 0.3}.embedded_post_file{margin: 0!important; width: 125px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}</style>');
    if (features.favicon){
        $('head').append('<link id="favicon" rel="shortcut icon" type="image/png" href="'+favicon.unlit+'">');
        $('#reply fieldset .progress').after('<canvas id="myCanvas" width="64" height="64" style="float:left; display:none; position: relative; top: -10px; left: -10px;"></canvas>');
    }
    $('body').append('<div id="hoverUI"></div>');
 
    windowFocus = true;
    $(window).focus(function(){windowFocus = true; ThreadUpdate(features);});
    $(window).blur(function(){windowFocus = false;});
    if (hideQROptions){
        $('#reply').toggleClass("showQROptions"); // Make options hidden in QR by default
    }
    if (features.favicon){
        if (lastSeenPosts[threadID] === undefined){
            lastSeenPosts[threadID] = threadID;
        }
        lastSeenPost = lastSeenPosts[threadID];
    }
    if (features.labelYourPosts){
        if (yourPosts[threadID] === undefined){
            yourPosts[threadID] = [];
        } else {
            queuedYouLabels = yourPosts[threadID].slice(0);
            //console.log(queuedYouLabels);
        }
        //console.log(yourPosts);
        postSubmitEvent();
 
        $(document).ajaxComplete(function(event, request, settings) {
            //console.log(event);
            //console.log(request);
            //console.log(settings);
            if (request.responseText !== ""){
                response = JSON.parse(request.responseText);
            }else{
                response = {"error":"No responseText"};
            }
            //console.log(response);
            if (response.error !== undefined){
                //console.log(response.error);
            }else{
                if (settings.type == "POST"){
                    if (response.error === undefined ){
                        for (var post in response[threadID]["posts"]) {
                            //console.log(lastSubmittedContent);                    
                            if(response[threadID]["posts"][post]["comment"].replace(/[\r\n]/g,'') == lastSubmittedContent.replace(/[\r\n]/g,'')){
                                yourPosts[threadID].push(post);
                                queuedYouLabels.push(post);
                                //console.log(yourPosts);
                                //console.log(queuedYouLabels);
                                labelYourPosts();
                                break;
                            }
                        }
                        labelNewPosts(response);
                    }else{
                        console.log(response.error);
                    }
                }else{
                    if (response[threadID] !== undefined){
                        labelNewPosts(response);
                    }else{
                        //console.log("Not in a thread");
                    }
                }
            }
        });
        labelYourPosts(true); // First call, add (You) to page content
    }
    if(features.imageHover){imageHover();}
    if(features.videoHover){videoHover();}
});
 
var executeShortcut = function(shortcut) {
    var input = document.getElementById('reply_chennodiscursus');
 
    if (input.selectionStart !== undefined){
        $('#reply_chennodiscursus').selection('insert', {
            text: "["+shortcut+"]",
            mode: 'before'
        });
        $('#reply_chennodiscursus').selection('insert', {
            text: "[/"+shortcut+"]",
            mode: 'after'
        });
    }
};
 
function quickReply(){
    $('#reply').toggleClass("quickReply");
    $('#reply fieldset > div:nth-child(1)').css("width","");
    if ($('#reply').hasClass("showQROptions")){
        $('#reply fieldset > div:nth-child(3)').toggle();
    }
}
 
function quickReplyOptions(){
    $('#reply').toggleClass("showQROptions");
    $('#reply.quickReply fieldset > div:nth-child(3)').toggle();
}
 
var favican = document.createElement("IMG");
favican.src=favicon.lit;
var exclam = document.createElement("IMG");
exclam.src=favicon.alertOverlay;
 
function canfav(){
    $('#myCanvas').toggle();
    $('#myCanvas')["0"].getContext("2d").drawImage(favican, 0, 0);
    $('#myCanvas')["0"].getContext("2d").drawImage(exclam, 0, 0);
}
var imgIndex;
function galleryToggle(){
    if ($('#gallery').length){
        $('#gallery').remove();
    }else{
        var lowestVisiblePostID;
        $('article').each(function(i, post){
            if ($(post).isOnScreen()){
                lowestVisiblePostID = $(post).attr("id");
            }
        });
        lowestVisiblePostID = parseInt(lowestVisiblePostID.replace(/_/g, ""));
        var imgList = $('.thread_image_box');
        imgIndex = imgList.length -1;
 
        $.each(imgList, function(i,imageBox){
            var postID = $(imageBox).parents('article.post').attr("id");
            if (postID === undefined){
                postID = $(imageBox).parents('article').attr("id");
            }
            if (parseInt(postID.replace(/_/g, "")) > lowestVisiblePostID){
                imgIndex = i-1;
                return false;
            }
        });
        if (imgIndex == -1){imgIndex = 0;}
        $('body').append('<div id="gallery"></div>');
        galleryUpdate();
    }
}
 
function galleryChange(direction){
    if (direction == "left"){
        if (imgIndex == 0 ){
            imgIndex = $('.thread_image_box').length -1;
        }else{
            imgIndex--;
        }
    }else if (direction == "right"){
        if (imgIndex == $('.thread_image_box').length -1 ){
            imgIndex = 0;
        }else{
            imgIndex++;
        }
    }else{
        console.log("Something went wrong boss.");
    }
    galleryUpdate();
}
 
function galleryUpdate(){
    if ($('#gallery').length){    
        var imgList = $('.thread_image_box');
        if ($(imgList[imgIndex]).find('img').length){
            $('#gallery').html('<img style="max-width:90%; max-height:90%;" src="'+$(imgList[imgIndex]).find('img')[0].src+'">');
        }else{
            $('#gallery').html('<video style="float:left; max-width:90%; max-height:90%;" name="media" loop muted controls '+autoplayVid+'><source src="'+$(imgList[imgIndex]).find('video')[0].currentSrc+'" type="video/webm"></video>');
        }
    }
}
 
$(function(){
    shortcut.add("ctrl+s", function(){ executeShortcut("spoiler");});
    shortcut.add("ctrl+i", function(){ executeShortcut("i");});
    shortcut.add("ctrl+b", function(){ executeShortcut("b");});
    shortcut.add("ctrl+u", function(){ executeShortcut("u");});
    shortcut.add("q", function(){quickReply();}, {"disable_in_input":true});
    shortcut.add("ctrl+q", function(){quickReplyOptions();}, {"disable_in_input":false});
    if (features.favicon){shortcut.add("f", function(){canfav();}, {"disable_in_input":true});}
    if (features.gallery){shortcut.add("g", function(){galleryToggle();}, {"disable_in_input":true});}
    shortcut.add("left", function(){galleryChange("left");}, {"disable_in_input":true});
    shortcut.add("right", function(){galleryChange("right");}, {"disable_in_input":true});
 
    seenPosts();
    ThreadUpdate(features);
    getBoard();
    bindShortcuts();
    window.setInterval( function(){ ThreadUpdate(features); }, 500 );
});
