// ==UserScript==
// @name          SpookyX
// @description   Enhances functionality of FoolFuuka boards. Developed further for more comfortable ghost-posting on the moe archives.
// @author        Fiddlekins
// @version       29.9
// @namespace     https://github.com/Fiddlekins/SpookyX
// @include       http://archive.4plebs.org/*
// @include       https://archive.4plebs.org/*
// @include       https://*archive.moe/*
// @include       http://archive.loveisover.me/*
// @include       https://archive.loveisover.me/*
// @include       http://boards.foolz.us/*
// @include       https://boards.foolz.us/*
// @include       http://archive.nyafuu.org/*
// @include       https://archive.nyafuu.org/*
// @include       http://*fgts.jp/*
// @include       https://*fgts.jp/*
// @include       http://totally.not4plebs.org/*
// @include       https://totally.not4plebs.org/*
// @include       http://archive*.desustorage.org/*
// @include       https://archive*.desustorage.org/*
// @include       http://boards.fireden.net/*
// @include       https://boards.fireden.net/*
// @include       http://boards.wohlfe.net/*
// @include       https://boards.wohlfe.net/*
// @include       http://www.neetchan.org/*
// @include       https://www.neetchan.org/*
// @include       http://archive.sfur.net/*
// @include       https://archive.sfur.net/*
// @require       https://cdn.rawgit.com/madapaja/jquery.selection/master/src/jquery.selection.js
// @require       https://raw.githubusercontent.com/jquery/jquery-mousewheel/master/jquery.mousewheel.min.js
// @grant         none
// @icon          http://i.imgur.com/LaYyYRl.png
// ==/UserScript==

var settings = {
    "UserSettings": {
        "inlineImages": {
            "name": "Inline Images",
            "description": "Load full-size images in the thread, enable click to expand",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "delayedLoad": {
                    "name": "Delayed Load",
                    "description": "Fullsize images are not automatically retrieved and used to replace the thumbnails. Instead this occurs on an individual basis when the thumbnails are clicked on",
                    "type": "checkbox",
                    "value": false
                },
                "imageHover": {
                    "name": "Image Hover",
                    "description": "Hovering over images with the mouse brings a full or window scaled version in view",
                    "type": "checkbox",
                    "value": true
                },
                "videoHover": {
                    "name": "Video Hover",
                    "description": "Hovering over videos with the mouse brings a full or window scaled version in view",
                    "type": "checkbox",
                    "value": true
                },
                "autoplayGifs": {
                    "name": "Autoplay embedded gifs",
                    "description": "Make embedded gifs play automatically",
                    "type": "checkbox",
                    "value": true
                },
                "autoplayVids": {
                    "name": "Autoplay embedded videos",
                    "description": "Make embedded videos play automatically (they start muted, expanding unmutes)",
                    "type": "checkbox",
                    "value": false
                },
                "customSize": {
                    "name": "Custom thumbnail size",
                    "description": "Specify the thumbnail dimensions",
                    "type": "checkbox",
                    "value": false,
                    "suboptions": {
                        "widthOP": {
                            "name": "OP image width",
                            "description": "The maximum width of OP images in pixels",
                            "type": "number",
                            "value": 250
                        },
                        "heightOP": {
                            "name": "OP image height",
                            "description": "The maximum height of OP images in pixels",
                            "type": "number",
                            "value": 250
                        },
                        "width": {
                            "name": "Post image width",
                            "description": "The maximum width of post images in pixels",
                            "type": "number",
                            "value": 125
                        },
                        "height": {
                            "name": "Post image height",
                            "description": "The maximum height of post images in pixels",
                            "type": "number",
                            "value": 125
                        }
                    }
                }
            }
        },
        "embedImages": {
            "name": "Embed Images",
            "description": "Embed image (and other media) links in thread",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "imgNumMaster": {
                    "name": "Embed Count",
                    "description": "The maximum number of images (or other media) to embed in each post",
                    "type": "number",
                    "value": 1
                }
            }
        },
        "embedGalleries": {
            "name": "Embed Galleries",
            "description": "Embed Imgur galleries into a single post for ease of image dumps",
            "type": "checkbox",
            "value": true,
            "suboptions":{
                "showDetails":{
                    "name":"Show Details",
                    "description":"Show the title, image description and view count for embedded Imgur albums",
                    "type":"checkbox",
                    "value":true
                }
            }
        },
        "gallery": {
            "name": "Gallery",
            "description": "Pressing G will bring up a view that displays all the images in a thread",
            "type": "checkbox",
            "value": true
        },
        "hidePosts": {
            "name": "Hide Posts",
            "description": "Allow user to hide posts manually",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "recursiveHiding": {
                    "name": "Recursive Hiding",
                    "description": "Hide replies to hidden posts",
                    "type": "checkbox",
                    "value": true
                }
            }
        },
        "newPosts": {
            "name": "New Posts",
            "description": "Reflect the number of new posts in the tab name",
            "type": "checkbox",
            "value": true
        },
        "favicon": {
            "name": "Favicon",
            "description": "Switch to a dynamic favicon that indicates unread posts and unread replies",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "unlit": {
                    "name": "Unlit",
                    "description": "Choose which favicon is used normally. Default is \"http://i.imgur.com/xuadeJ2.png\"",
                    "type": "text",
                    "value": "http://i.imgur.com/xuadeJ2.png"
                },
                "lit": {
                    "name": "Lit",
                    "description": "Choose which favicon is used to indicate there are unread posts. Preset numbers are 0-4, replace with link to custom image if you desire such as: \"http://i.imgur.com/XGsrewo.png\"",
                    "type": "text",
                    "value": "2"
                },
                "alert": {
                    "name": "Alert",
                    "description": "The favicon that indicates unread replies to your posts. Value is ignored if using a preset Lit favicon",
                    "type": "text",
                    "value": ""
                },
                "alertOverlay": {
                    "name": "Alert Overlay",
                    "description": "The favicon overlay that indicates unread replies. Default is \"http://i.imgur.com/6EfJyYA.png\"",
                    "type": "text",
                    "value": "http://i.imgur.com/6EfJyYA.png"
                }
            }
        },
        "labelYourPosts": {
            "name": "Label Your Posts",
            "description": "Add '(You)' to your posts and links that point to them",
            "type": "checkbox",
            "value": true
        },
        "inlineReplies": {
            "name": "Inline Replies",
            "description": "Click replies to expand them inline",
            "type": "checkbox",
            "value": true
        },
        "notifications": {
            "name": "Enable notifications",
            "description": "Browser notifications will be enabled, for example to alert you when your post has been replied to or if you encountered a posting error",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "spoiler": {
                    "name": "Hide spoilers",
                    "description": "When creating a notification to alert you of a reply the spoilered text will be replaced with black boxes since nofications cannot hide them like normal",
                    "type": "checkbox",
                    "value": true
                },
                "restrict": {
                    "name": "Restrict size",
                    "description": "Firefox option only. By default there is no size limit on Firefox notifications, use this option to keep notifications at a sensible size",
                    "type": "checkbox",
                    "value": false,
                    "suboptions": {
                        "lines": {
                            "name": "Line count",
                            "description": "Number of lines the notification is restricted to",
                            "type": "number",
                            "value": 5
                        },
                        "characters": {
                            "name": "Character count",
                            "description": "Number of characters per line the notification is restricted to",
                            "type": "number",
                            "value": 50
                        }
                    }
                }
            }
        },
        "relativeTimestamps": {
            "name": "Relative Timestamps",
            "description": "Timestamps will be replaced by elapsed time since post",
            "type": "checkbox",
            "value": true
        },
        "postQuote": {
            "name": "Post Quote",
            "description": "Clicking the post number will insert highlighted text into the reply box",
            "type": "checkbox",
            "value": true
        },
        "filter": {
            "name": "Filter",
            "description": "Hide undesirable posts from view",
            "type": "checkbox",
            "value": false,
            "suboptions": {
                "filterNotifications": {
                    "name": "Filter Notifications",
                    "description": "Enabling this will stop creating reply notifications if the reply is filtered with hide or remove mode. Purge mode filtered replies will never create notifications",
                    "type": "checkbox",
                    "value": true
                },
                "recursiveFiltering": {
                    "name": "Recursive Filtering",
                    "description": "Posts that reply to filtered posts will also be filtered",
                    "type": "checkbox",
                    "value": false
                }
            }
        },
        "adjustReplybox": {
            "name": "Adjust Replybox",
            "description": "Change the layout of the reply box",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "width":{
                    "name": "Width",
                    "description": "Specify the default width of the reply field in pixels",
                    "type": "number",
                    "value": 600
                },
                "hideQROptions": {
                    "name": "Hide QR Options",
                    "description": "Make the reply options hidden by default in the quick reply",
                    "type": "checkbox",
                    "value": true
                },
                "removeReset": {
                    "name": "Remove Reset",
                    "description": "Remove the reset button from the reply box to prevent unwanted usage",
                    "type": "checkbox",
                    "value": false
                }
            }
        },
        "postCounter": {
            "name": "Post Counter",
            "description": "Add a post counter to the reply box",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "location": {
                    "name": "Location",
                    "description": "Specify where the post counter is placed",
                    "type": "select",
                    "value": {"value":"Header bar","options":["Header bar","Reply box"]}
                },
                "limits": {
                    "name": "Show count limits",
                    "description": "Adds count denominators, purely aesthetic",
                    "type": "checkbox",
                    "value": false,
                    "suboptions": {
                        "posts":{
                            "name": "Posts",
                            "description": "Specify the posts counter denominator",
                            "type": "number",
                            "value": 400
                        },
                        "images":{
                            "name": "Images",
                            "description": "Specify the images counter denominator",
                            "type": "number",
                            "value": 250
                        }
                    }                    
                },
                "countUnloaded": {
                    "name": "Count unloaded posts",
                    "description": "If only viewing the last x posts in a thread use this setting for the post counter to count the total number of posts rather than just the number of posts that have been loaded",
                    "type": "checkbox",
                    "value": true
                }
            }
        },
        "mascot": {
            "name": "Mascot",
            "description": "Place your favourite mascot on the background to keep you company!",
            "type": "checkbox",
            "value": false,
            "suboptions": {
                "mascotImage": {
                    "name": "Mascot image",
                    "description": "Specify a link to your custom mascot or leave blank for SpookyX defaults",
                    "type": "text",
                    "value": ""
                },
                "corner": {
                    "name": "Corner",
                    "description": "Specify which corner to align the mascot to",
                    "type": "select",
                    "value": {"value":"Bottom Right","options":["Top Right","Bottom Right","Bottom Left","Top Left"]}
                },
                "zindex":{
                    "name": "Z-index",
                    "description": "Determine what page elements the mascot is in front and behind of. Default value is -1",
                    "type": "number",
                    "value": -1
                },
                "opacity":{
                    "name": "Opacity",
                    "description": "Specify the opacity of the mascot, ranges from 0 to 1",
                    "type": "number",
                    "value": 1
                },
                "clickthrough": {
                    "name": "Click-through",
                    "description": "Allow you to click through the mascot if it is on top of buttons, etc",
                    "type": "checkbox",
                    "value": true
                },
                "width": {
                    "name": "Width",
                    "description": "Specify the width of the mascot in pixels. Use a negative number to leave it as the image's default width",
                    "type": "number",
                    "value": -1
                },
                "x": {
                    "name": "Horizontal Displacement",
                    "description": "Specify horizontal displacement of the mascot in pixels",
                    "type": "number",
                    "value": 0
                },
                "y": {
                    "name": "Vertical Displacement",
                    "description": "Specify vertical displacement of the mascot in pixels",
                    "type": "number",
                    "value": 0
                },
                "mute": {
                    "name": "Mute videos",
                    "description": "If using a video for a mascot the sound will be muted",
                    "type": "checkbox",
                    "value": true
                }
            }
        },
        "postFlow": {
            "name": "Adjust post flow",
            "description": "Change the way posts are laid out in the page",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "leftMargin": {
                    "name": "Left margin",
                    "description": "Specify the width in pixels of the gap between the start of the posts and the left side of the screen. Negative values set it to equal the mascot width",
                    "type": "number",
                    "value": 0
                },
                "rightMargin": {
                    "name": "Right margin",
                    "description": "Specify the width in pixels of the gap between the end of the posts and the right side of the screen. Negative values set it to equal the mascot width",
                    "type": "number",
                    "value": 0
                },
                "align": {
                    "name": "Align",
                    "description": "Specify how posts are aligned",
                    "type": "select",
                    "value": {"value":"Left","options":["Left","Center","Right"]}
                },
                "wordBreak": {
                    "name": "Word-break",
                    "description": "Firefox runs into difficulties with breaking really long words, test the options available until you find something that works. On auto this attempts to detect browser and select the most appropriate setting",
                    "type": "select",
                    "value": {"value":"Auto","options":["Auto","Break-all","Normal"]}
                }
            }
        },
        "headerBar": {
            "name": "Adjust Headerbar behaviour",
            "description": "Determine whether the headerbar hides and how it does so",
            "type": "checkbox",
            "value": true,
            "suboptions": {
                "behaviour": {
                    "name": "Behaviour",
                    "description": "Firefox runs into difficulties with breaking really long words, test the options available until you find something that works. On auto this attempts to detect browser and select the most appropriate setting",
                    "type": "select",
                    "value": {"value":"Collapse to button","options":["Always show","Full hide","Collapse to button"]},
                    "suboptions": {
                        "scroll": {
                            "name": "Hide on scroll",
                            "description": "Scrolling up will show the headerbar, scrolling down will hide it again",
                            "if": ["Full hide","Collapse to button"],
                            "type": "checkbox",
                            "value": false
                        },
                        "defaultHidden": {
                            "name": "Default state hidden",
                            "description": "Check to make the headerbar hidden or collapsed by default on pageload",
                            "if": ["Full hide","Collapse to button"],
                            "type": "checkbox",
                            "value": true
                        },
                        "contractedForm": {
                            "name": "Customise contracted form",
                            "description": "Specify what the contracted headerbar form contains",
                            "if": ["Collapse to button"],
                            "type": "checkbox",
                            "value": true,
                            "suboptions": {
                                "settings": {
                                    "name": "Settings button",
                                    "description": "Display the settings button in contracted headerbar",
                                    "type": "checkbox",
                                    "value": false
                                },                        
                                "postCounter": {
                                    "name": "Post counter",
                                    "description": "Display the post counter stats in contracted headerbar",
                                    "type": "checkbox",
                                    "value": true
                                },
                            }
                        }
                    }
                },
                "shortcut": {
                    "name": "Hide shortcut",
                    "description": "Pressing H will toggle the visiblity of the headerbar",
                    "type": "checkbox",
                    "value": true
                }
            }
        },
        "removeJfont": {
            "name": "Remove Japanese Font",
            "description": "Enabling this will make the addition of japanese characters to a post cease to change the post font and size. Presumably will cause issues for people whose default font doesn't support japanese characters",
            "type": "checkbox",
            "value": false
        }
    },
    "FilterSettings": {
        "name":{
            "name":"Name",
            "value":[
                {"comment": "#/久保島のミズゴロウ/;"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.post_author').html();},
            "responseObjFunction":function(response){return response.name_processed;}
        },
        "tripcode":{
            "name":"Tripcode",
            "value":[
                {"comment": "#/!!/90sanF9F3Z/;"},
                {"comment": "#/!!T2TCnNZDvZu/;"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.post_tripcode').html();},
            "responseObjFunction":function(response){return response.trip_processed;}
        },
        "uniqueID":{
            "name":"Unique ID",
            "value":[
                {"comment": "# Remember to escape any special characters"},
                {"comment": "# For example these are valid:"},
                {"comment": "#/bUAl\\+t9X/;"},
                {"comment": "#/ID:bUAl\\+t9X/;"},
                {"comment": "# But this fails:"},
                {"comment": "#/bUAl+t9X/; "},
                {"comment": "# It's also worth noting that prefixing it with 'ID:' can cause the filter to fail to accurately detect when using recursive filtering. To assure it works fully stick to just using the hash like 'bUAl+t9X'"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.poster_hash').html();},
            "responseObjFunction":function(response){return response.poster_hash_processed;}
        },
        "capcode":{
            "name":"Capcode",
            "value":[
                {"comment": "# Set a custom class for mods:"},
                {"comment": "#/Mod$/;highlight:mod;"},
                {"comment": "# Set a custom class for moot:"},
                {"comment": "#/Admin$/;highlight:moot;"},
                {"comment": "# (highlighting isn't implemented yet)"},
                {"comment": "# For recursive filter to always work you will need to add regex lines for M, A & D for Moderators, Admins and Developers respectively"},
                {"comment": "# e.g. /A/; will filter Admins accurately always whilst /Admin/; won't always work for recursively filtered posts"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.post_level').html();},
            "responseObjFunction":function(response){return response.capcode;}
        },
        "subject":{
            "name":"Subject",
            "value":[
                {"comment": "#/(^|[^A-z])quest([^A-z]|$)/i;boards:tg;"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.post_title').html();},
            "responseObjFunction":function(response){return response.title_processed;}
        },
        "comment":{
            "name":"Comment",
            "value":[
                {"comment": "#/daki[\\\\S]*/i; boards:tg;"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.text').html();},
            "responseObjFunction":function(response){return response.comment;}
        },
        "flag":{
            "name":"Flag",
            "value":[
                {"comment": "#Remove kebob"},
                {"comment": "#/turkey/i;mode:remove;"}
            ],
            "threadPostFunction":function(currentPost){return $(currentPost).find('.flag').attr('title');},
            "responseObjFunction":function(response){return response.poster_country_name_processed;}
        },
        "filename":{
            "name":"Filename",
            "value":[],
            "threadPostFunction":function(currentPost){var combined = ''; if($(currentPost).hasClass('thread')){combined = $(currentPost).find('.post_file_filename').html();}else{$.each($(currentPost).find('.post_file_filename'), function(){combined += this.innerHTML;});} return combined;},
            "responseObjFunction":function(response){if(response.media === null || response.media === undefined){return "";} return response.media.media_filename_processed;}
        },
        "fileurl":{
            "name":"File URL",
            "value":[
                {"comment": "# Filter by site for example:"},
                {"comment": "#/tumblr/;"}
            ],
            "threadPostFunction":function(currentPost){var combined = ''; if($(currentPost).hasClass('thread')){combined = $(currentPost).find('.post_file_filename')[0].href;}else{$.each($(currentPost).find('.post_file_filename'), function(){combined += this.href;});} return combined;},
            "responseObjFunction":function(response){if(response.media === null || response.media === undefined){return "";} return response.media.remote_media_link;}
        }
    }
};

var defaultMascots = [
    "http://i.imgur.com/l2rGSUs.png",
    "http://i.imgur.com/QudFqBK.png",
    "http://i.imgur.com/YtdTqBW.png",
    "http://i.imgur.com/cinWJsP.png",
    "http://i.imgur.com/CrjD09g.png",
    "http://i.imgur.com/r6RuI3Q.png",
    "http://i.imgur.com/U9NQ0aQ.png",
    "http://i.imgur.com/avlBCUC.png",
    "http://i.imgur.com/RSealGL.png",
    "http://i.imgur.com/ZTf8d85.png",
    "http://i.imgur.com/47Nf9WQ.png",
    "http://i.imgur.com/zw1NtJZ.png",
    "http://i.imgur.com/jIx9a5q.png",
    "http://i.imgur.com/IGT97Rg.png",
    "http://i.imgur.com/Q8OSBd4.png",
    "http://i.imgur.com/T5LyxZ3.png",
    "http://i.imgur.com/xdcWW4m.png"
];

if (localStorage.SpookyXsettings !== undefined){
    $.extend(true, settings, JSON.parse(localStorage.SpookyXsettings));
}
presetFavicons();

var newPostCount = 0;
var notLoadedPostCount = 0;
var DocumentTitle = document.title;
var ignoreInline = ['v'];
var rulesBox = $(".rules_box").html();
if(settings.UserSettings.inlineImages.suboptions.autoplayVids.value){var autoplayVid = "autoplay";}else{var autoplayVid = "";}

var splitURL = (document.URL).toLowerCase().split("/");
var board = splitURL[3];
var threadID = splitURL[4];
if (threadID === "thread"){
    threadID = splitURL[5];
}else if (threadID === "last"){
    threadID = splitURL[6];
}else if (threadID !== "search"){
    if (board === "_" || threadID === "page" || threadID === "ghost" || threadID === "" || threadID === undefined){
        if (board !== "" && board !== undefined && board !== "_"){
            threadID = "board";
        }else{
            threadID = "other";
        }
    }
}
/*
console.log(splitURL);
console.log("Board:"+board);
console.log("ThreadID:"+threadID);*/

var imageWidthOP = 250;
var imageHeightOP = 250;
var imageWidth = 125;
var imageHeight = 125;
if (settings.UserSettings.inlineImages.suboptions.customSize.value){
    imageWidthOP = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.widthOP.value;
    imageHeightOP = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.heightOP.value;
    imageWidth = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.width.value;
    imageHeight = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.height.value;
}

var yourPostsLookup = {};
var crosslinkTracker = {};
if (localStorage.crosslinkTracker === undefined){
    localStorage.crosslinkTracker = "{}";
}

function presetFavicons(){
    switch(settings.UserSettings.favicon.suboptions.lit.value) {
        case "0": settings.UserSettings.favicon.suboptions.lit.value = "http://i.imgur.com/7iTgtjy.png"; settings.UserSettings.favicon.suboptions.alert.value = "http://i.imgur.com/QrkQSo0.png"; break;
        case "1": settings.UserSettings.favicon.suboptions.lit.value = "http://i.imgur.com/AWVjxfw.png"; settings.UserSettings.favicon.suboptions.alert.value = "http://i.imgur.com/KXIPcD9.png"; break;
        case "2": settings.UserSettings.favicon.suboptions.lit.value = "http://i.imgur.com/S7uBSPZ.png"; settings.UserSettings.favicon.suboptions.alert.value = "http://i.imgur.com/7IxJvBN.png"; break;
        case "3": settings.UserSettings.favicon.suboptions.lit.value = "http://i.imgur.com/Rt8dEaq.png"; settings.UserSettings.favicon.suboptions.alert.value = "http://i.imgur.com/tvJjpqF.png"; break;
        case "4": settings.UserSettings.favicon.suboptions.lit.value = "http://i.imgur.com/3bRaVUl.png"; settings.UserSettings.favicon.suboptions.alert.value = "http://i.imgur.com/5Bv27Co.png"; break;
        default: break;
    }
}

function ThreadUpdate(){
    if (settings.UserSettings.newPosts.value){newPosts();}
}

/**
 * Retrieve nested item from object/array
 * @param {Object|Array} obj
 * @param {String} path dot separated
 * @param {*} def default value ( if result undefined )
 * @returns {*}
 */
function objpath(obj, path, def){
    var i, len;

    for(i = 0,path = path.split('.'), len = path.length; i < len; i++){
        if(!obj || typeof obj !== 'object') return def;
        obj = obj[path[i]];
    }

    if(obj === undefined) return def;
    return obj;
}

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

            if(opt.disable_in_input) { //Don't enable shortcut keys in Input, Textarea fields
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

                } else if(opt.keycode) {
                    if(opt.keycode == code) kp++;

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

                if(!opt.propagate) { //Stop the event
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
            'event': opt.type
        };
        //Attach the function with the event
        if(ele.addEventListener) ele.addEventListener(opt.type, func, false);
        else if(ele.attachEvent) ele.attachEvent('on'+opt.type, func);
        else ele['on'+opt.type] = func;
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove':function(shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination]);
        if(!binding) return;
        var type = binding.event;
        var ele = binding.target;
        var callback = binding.callback;

        if(ele.detachEvent) ele.detachEvent('on'+type, callback);
        else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on'+type] = false;
    }
};

function delayedLoad(posts){
    posts.each(function(i, post){
        ($(post).hasClass('thread') ? $(post).children('.thread_image_box').find('img') : $(post).find('img')).each(function(i,image){
            var $image = $(image);
            $image.data('dontHover',true); // Stop imageHover displaying the thumbnails
            $image.on('click', function(e){ // Stop the OP from returning all the sub images and thus duplicating them
                if (!e.originalEvent.ctrlKey && e.which == 1){
                    e.preventDefault();
                    var $target = $(e.target);
                    $target.removeData('dontHover');
                    $target.off('click'); // Remove event listener now that it's served its purpose
                    inlineImages($target.closest('article'));
                    if (!settings.UserSettings.inlineImages.suboptions.autoplayGifs.value){pauseGifs($target);} // Stop gifs autoplaying
                }
            });
        });
    });
}

function inlineImages(posts){
    posts.each(function(i, post){
        ($(post).hasClass('thread') ? $(post).children('.thread_image_box') : $(post).find('.thread_image_box')).each(function(i,currentImage){
            $(currentImage).find('>a').each(function(j,imgLink){
                var fullImage = imgLink.href;
                if (fullImage.match(/\.webm$/)){ // Handle post webms
                    $(currentImage).prepend('<video width="'+($(post).hasClass('thread') ? imageWidthOP : imageWidth)+'" name="media" loop muted '+autoplayVid+'><source src="'+fullImage+'" type="video/webm"></video>');
                    $(imgLink).remove();
                    if (settings.UserSettings.inlineImages.suboptions.delayedLoad.value){
                        videoHover();
                    }
                }else if (!fullImage.match(/(\.pdf|\.swf)$/)){
                    $(currentImage).find('img').each(function(k, image){
                        var $image = $(image);
                        var thumbImage = $(image).attr('src');
                        $image.attr('src',fullImage);
                        $image.error(function(e){ // Handle images that won't load
                            if (!$image.data("triedThumb")){
                                $image.data("triedThumb", true);
                                if (fullImage !== thumbImage){ // If the image has a thumbnail aka was 4chan native then use that
                                    $image.attr('src',thumbImage);
                                }
                            }
                        });
                        $image.removeAttr('width');
                        $image.removeAttr('height');
                        $image.addClass("smallImage");
                    });
                }
            });
        });
    });
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function togglePost(postID, mode){
    if (mode == "hide"){
        $('#'+postID).css({'display':'none'});
        $('#'+postID).prev().css({'display':'block'});
    }else if (mode == "show"){
        $('#'+postID).css({'display':'block'});
        $('#'+postID).prev().css({'display':'none'});
    }else{
        $('#'+postID).toggle();
        $('#'+postID).prev().toggle();
    }
    postCounter(); // Update hidden post counter
}

function recursiveToggle(postID, mode){
    var checkedPostCollection = {};
    var postList = [postID];
    for (var i=0; i < postList.length; i++) {
        checkedPostCollection[postList[i]] = true;
        $('#p_b'+postList[i]+' > a').each(function(i, backlink){
            var backlinkID = backlink.dataset.post;
            if (!checkedPostCollection[backlinkID]){
                postList.push(backlinkID);
            }
        });
    }
    for (var j=0, len = postList.length; j < len; j++) {
        togglePost(postList[j], mode);
    }
}

function filter(posts){
    var boardPatt = new RegExp("(^|,)\\s*"+board+"\\s*(,|$)");
    posts.each(function(index,currentPost){
        var $currentPost = $(currentPost);
        if (!/!!UG0p3gRn3T1/.test($currentPost.find('.post_tripcode').html())){
            if (settings.UserSettings.filter.suboptions.recursiveFiltering.value && !$currentPost.hasClass('thread')){ // Recursive filter and not OP
                var checkedBacklinks = {};
                $currentPost.find('.text .backlink').each(function(i,backlink){
                    if (!checkedBacklinks[backlink.dataset.board+backlink.dataset.post]){ // Prevent reprocessing duplicate links
                        checkedBacklinks[backlink.dataset.board+backlink.dataset.post] = true;
                        var backlinkPost = $('#'+backlink.dataset.post);
                        if (backlink.dataset.board === board && backlinkPost.length){ // If linked post is present in thread
                            if (backlinkPost.is(':visible')){ // If linked post is visible
                                if (backlinkPost.hasClass('shitpost')){ // If linked post is a shitpost
                                    $currentPost.addClass('shitpost');
                                }
                            }else{ // Linked post isn't visible
                                if (backlinkPost.prev().is(':visible')){ // If the hide post stub is visible (and thus the linked post is hidden)
                                    togglePost(currentPost.id, "hide");
                                }else{ // The linked post has been filtered with mode remove
                                    $currentPost.hide();
                                }
                            }
                        }else{ // Linked post isn't present in thread
                            $.ajax({
                                url: "/_/api/chan/post/",
                                data:{"board":backlink.dataset.board,"num":backlink.dataset.post},
                                type:"GET"
                            }).done(function(response){
                                processPosts(checkFilter(response, false), $currentPost, currentPost);
                                $currentPost.find('.backlink_list .backlink').each(function(j,replyBacklink){ // Filter replies
                                    filter($('#'+replyBacklink.dataset.post));
                                });
                            });                        
                        }
                    }
                });
            }
            if ($(currentPost).length){ // If after all that the post hasn't been purged
                processPosts(checkFilter(currentPost, true), $currentPost, currentPost);
            }
        }
    });
}

function processPosts(type, $currentPost, currentPost){
    switch(type){
        case 1: $currentPost.addClass("shitpost"); break;
        case 2: togglePost(currentPost.id, "hide"); break;
        case 3: $currentPost.hide(); break;
        case 4: $currentPost.prev().remove(); $currentPost.remove();
    }
}

function checkFilter(input, inThreadPost){
    var output = 0;
    for (var filterType in settings.FilterSettings){
        var testText = inThreadPost ? settings.FilterSettings[filterType].threadPostFunction(input) : settings.FilterSettings[filterType].responseObjFunction(input);
        var shortcut = settings.FilterSettings[filterType].value;
        for (var line in shortcut){
            if (!shortcut[line].comment && shortcut[line].regex !== undefined){
                if (shortcut[line].boards === undefined || boardPatt.test(shortcut[line].boards)){
                    var regex = new RegExp(shortcut[line].regex.pattern, shortcut[line].regex.flag);
                    if(regex.test(testText)){
                        switch(shortcut[line].mode){
                            case "fade": if (output < 1){output = 1}; break;
                            case "hide": if (output < 2){output = 2}; break;
                            case "remove": output = 3; break;
                            case "purge": return 4;
                            default: if (output < 1){output = 1};
                        }
                    }
                }
            }
        }
    }
    return output;
}

var embedImages = function(posts){
    var imageFiletypes = new RegExp("\\.(jpg|jpeg|png|gif)($|(\\?|:)[\\S]+$)",'i');
    var videoFiletypes = new RegExp("\\.(webm|gifv|mp4)($|(\\?|:)[\\S]+$)",'i');
    var pattImgGal = new RegExp("http[s]?://imgur.com/[^\"]*");
    posts.each(function(index, currentArticle){
        if (!$(currentArticle).data('imgEmbed')){
            $(currentArticle).data('imgEmbed',true);
            var imgNum = settings.UserSettings.embedImages.suboptions.imgNumMaster.value - $(currentArticle).find('.thread_image_box').length;
            $(currentArticle).find(".text a").each(function(index, currentLink){
                if (imgNum === 0){
                    return false;
                }
                var mediaType = "notMedia";
                var mediaLink = currentLink.href;
                if (imageFiletypes.test(mediaLink)){
                    mediaType = "image";
                }else if (videoFiletypes.test(mediaLink)){
                    mediaType = "video";
                }
                if (mediaType == "image" || mediaType == "video"){
                    imgNum--;
                    var filename = '<div class="post_file embedded_post_file"><a href="'+mediaLink+'" class="post_file_filename" rel="tooltip" title="'+mediaLink+'">'+mediaLink.match(/[^\/]*/g)[mediaLink.match(/[^\/]*/g).length -2]+'</a></div>';
                    var spoiler = "";
                    var elem = $('<div class="thread_image_box">'+filename+'</div>').insertBefore($(currentArticle).find("header"));
                    if($(this).parents('.spoiler').length){
                        spoiler = "spoilerImage ";
                        elem.append('<div class="spoilerText">Spoiler</div>');
                    }
                    if (mediaType == "image"){
                        elem.append('<a href="'+mediaLink+'" target="_blank" rel="noreferrer" class="thread_image_link"><img src="'+mediaLink+'" class="lazyload post_image '+spoiler+'smallImage"></a>');
                        removeLink(currentLink);
                        elem.find('img').on('load', function(e){
                            elem.find('img').unbind('load');
                            $(e.target).closest('.thread_image_box').find(".spoilerText").css({"top":(e.target.height/2)-6.5}); // Center spoiler text
                            $(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">'+e.target.naturalWidth+'x'+e.target.naturalHeight+'</span>'); // Add file dimensions
                        });
                        imageHover();
                        canvasHover();
                    }else if (mediaType == "video"){
                        mediaLink = mediaLink.replace(/\.gifv$/g, ".webm"); // Only tested to work with Imgur
                        elem.append('<video width="'+imageWidth+'" style="float:left" name="media" loop muted '+autoplayVid+' class="'+spoiler+'"><source src="'+mediaLink+'" type="video/webm"></video>');
                        removeLink(currentLink);
                        elem.find('video')[0].onloadedmetadata = function(e){
                            $(e.target).closest('.thread_image_box').find(".spoilerText").css({"top":(e.target.clientHeight/2)-6.5}); // Center spoiler text
                            $(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">'+e.target.videoWidth+'x'+e.target.videoHeight+'</span>'); // Add file dimensions
                        };
                        if(settings.UserSettings.inlineImages.suboptions.videoHover.value){videoHover();}
                    }
                }else if (settings.UserSettings.embedGalleries.value && pattImgGal.exec($(this).html()) !== null){
                    var imgurLinkFragments = $(this).html().split('\/');
                    if (imgurLinkFragments[3] == "a"){
                        imgurLinkFragments[4] = imgurLinkFragments[4].replace(/#[0-9]+/, ''); // Remove the trailing image number
                        if (settings.UserSettings.embedGalleries.suboptions.showDetails.value){
                            $(currentArticle).find(".post_wrapper").prepend('<blockquote class="imgur-embed-pub" lang="en" data-id="a/'+imgurLinkFragments[4]+'"><a href="//imgur.com/a/'+imgurLinkFragments[4]+'"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
                        }else{
                            $(currentArticle).find(".post_wrapper").prepend('<blockquote class="imgur-embed-pub" lang="en" data-id="a/'+imgurLinkFragments[4]+'" data-context="false"><a href="//imgur.com/a/'+imgurLinkFragments[4]+'"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
                        }
                        removeLink(currentLink);
                    }else if (imgurLinkFragments[3] !== "gallery"){
                        var link = pattImgGal.exec($(this).html());
                        var individualImages = link[0].match(/[A-z0-9]{7}/g);
                        $.each(individualImages.reverse(), function(i,imgID){
                            var filename = '<div class="post_file embedded_post_file"><a href="https://i.imgur.com/'+imgID+'.jpg" class="post_file_filename" rel="tooltip" title="https://i.imgur.com/'+imgID+'.jpg">'+imgID+'.jpg</a></div>';
                            $(currentArticle).find(".post_wrapper").prepend('<div class="thread_image_box">'+filename+'<a href="https://i.imgur.com/'+imgID+'.jpg" target="_blank" rel="noreferrer" class="thread_image_link"><img src="https://i.imgur.com/'+imgID+'.jpg" class="lazyload post_image smallImage"></a></div>');
                        });
                        $(currentArticle).find('.thread_image_box img').each(function(i, image){
                            $(image).on("load", function(e){
                                $(image).unbind('load');
                                $(e.target).closest('.thread_image_box').find(".spoilerText").css({"top":(e.target.height/2)-6.5}); // Center spoiler text
                                $(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">'+e.target.naturalWidth+'x'+e.target.naturalHeight+'</span>'); // Add file dimensions
                            });
                        });
                        removeLink(currentLink);
                        imageHover();
                        canvasHover();
                    }
                }else{
                    if(!(/&gt;&gt;/).test(mediaLink)){
                        //console.log(mediaLink);
                    }
                }
            });
        }
    });
};

function removeLink(currentLink){
    if ($(currentLink)[0].nextSibling !== null){
        if ($(currentLink)[0].nextSibling.nodeName == "BR"){
            if ($(currentLink)[0].previousSibling === null || $(currentLink)[0].previousSibling.nodeName !== "#text" || $(currentLink)[0].previousSibling.nodeValue == " "){
                $(currentLink).next().remove(); // Remove linebreaks
            }
        }
    }
    $(currentLink).remove();
}

function pauseGifs(posts){
    posts.each(function(i,img){
        if ((/\.gif/).test(img.src)){
            $(img).on('load',function(){
                $(img).after('<canvas class="smallImage" width="'+img.naturalWidth+'" height="'+img.naturalHeight+'"></canvas>');
                $(img).attr('gif',true).toggle();
                $(img).addClass("bigImage").removeClass("smallImage");
                var canvas = $(img).next('canvas');
                canvas[0].getContext("2d").drawImage(img,0,0);
                canvasHover();
            });
        }
    });
}

function imageHover(){
    if(settings.UserSettings.inlineImages.value && settings.UserSettings.inlineImages.suboptions.imageHover.value){
        var $image = $('img');
        $image.off("mouseenter mousemove mouseout");
        $image.on("mouseenter", function(e){
            if(e.target.id !== "mascot" && !$(e.target).hasClass("bigImage") && !$(e.target).data('dontHover')){
                $(e.target).clone().removeClass("smallImage spoilerImage").addClass("hoverImage").appendTo('#hoverUI');
            }
        });
        $image.on("mousemove mouseenter", function(e){
            var etarget = e.target;
            var $etarget = $(etarget);
            if(!$etarget.hasClass("bigImage") && !$etarget.data('dontHover')){
                var headerBarHeight = document.getElementById('headerFixed').offsetHeight -1; // -1 due to slight offscreen to hide border-top
                var headerBarWidth = document.getElementById('headerFixed').offsetWidth -1; // -1 due to slight offscreen to hide border-right
                var windowWidth = $('body').innerWidth(); // Define internal dimensions
                var windowHeight = window.innerHeight -21; // -21 so link destination doesn't overlay image
                var visibleHeight = windowHeight - headerBarHeight;
                var visibleWidth = windowWidth - e.clientX - 50;
                var canFitFullHeight = windowHeight*etarget.naturalWidth/etarget.naturalHeight < visibleWidth - headerBarWidth +1;
                var $img = $('#hoverUI > img');
                $img.css({
                    "max-height": canFitFullHeight ? windowHeight : visibleHeight,
                    "max-width": visibleWidth,
                    "top": canFitFullHeight ? (windowHeight - $img[0].height)*(e.clientY / windowHeight) : (visibleHeight - $img[0].height)*(e.clientY / visibleHeight) + headerBarHeight,
                    "left":e.clientX + 50
                });
            }
        });
        $image.on("mouseout", function(e){
            $('#hoverUI').html('');
        });
    }
}

function canvasHover(){
    if(settings.UserSettings.inlineImages.value && settings.UserSettings.inlineImages.suboptions.imageHover.value){
        var $canvas = $('canvas');
        $canvas.off("mouseenter mousemove mouseout");
        $canvas.on("mouseenter", function(e){
            if(e.target.id !== "myCanvas"){
                $(e.target.previousSibling).clone().show().removeClass("spoilerImage").addClass("hoverImage").appendTo('#hoverUI');
            }
        });
        $canvas.on("mousemove mouseenter", function(e){
            var etarget = e.target;
            var $etarget = $(etarget);
            if(!$etarget.hasClass("bigImage") && !$etarget.data('dontHover')){
                var headerBarHeight = document.getElementById('headerFixed').offsetHeight -1; // -1 due to slight offscreen to hide border-top
                var headerBarWidth = document.getElementById('headerFixed').offsetWidth -1; // -1 due to slight offscreen to hide border-right
                var windowWidth = $('body').innerWidth(); // Define internal dimensions
                var windowHeight = window.innerHeight -21; // -21 so link destination doesn't overlay image
                var visibleHeight = windowHeight - headerBarHeight;
                var visibleWidth = windowWidth - e.clientX - 50;
                var canFitFullHeight = windowHeight*etarget.naturalWidth/etarget.naturalHeight < visibleWidth - headerBarWidth +1;
                var $img = $('#hoverUI > img');
                $img.css({
                    "max-height": canFitFullHeight ? windowHeight : visibleHeight,
                    "max-width": visibleWidth,
                    "top": canFitFullHeight ? (windowHeight - $img[0].height)*(e.clientY / windowHeight) : (visibleHeight - $img[0].height)*(e.clientY / visibleHeight) + headerBarHeight,
                    "left":e.clientX + 50
                });
            }
        });
        $canvas.on("mouseout", function(e){
            $('#hoverUI').html('');
        });
    }
}

function videoHover(){
    if(settings.UserSettings.inlineImages.value && settings.UserSettings.inlineImages.suboptions.videoHover.value){
        $('video').off("mouseenter mousemove mouseout");
        $('video').on("mouseenter", function(e){
            if(e.target.id !== "mascot" && !$(e.target).hasClass("fullVideo")){
                $(e.target).clone().removeClass("spoilerImage").addClass("fullVideo hoverImage").appendTo('#hoverUI');
                var $video = $('#hoverUI > video');
                $video.removeAttr('width');
                $video.on('canplaythrough', function(){
                    if ($video.length){ // Check if video still exists. This is to prevent the problem where mousing out too soon still triggers the canplay event
                        $video[0].muted=false;
                        $video[0].play();
                        $('video').on("mousemove", function(e){
                            var headerBarHeight = document.getElementById('headerFixed').offsetHeight -1; // -1 due to slight offscreen to hide border-top
                            var headerBarWidth = document.getElementById('headerFixed').offsetWidth -1; // -1 due to slight offscreen to hide border-right
                            var windowWidth = $('body').innerWidth(); // Define internal dimensions
                            var windowHeight = window.innerHeight;
                            var visibleHeight = windowHeight - headerBarHeight;
                            var visibleWidth = windowWidth - e.clientX - 50;
                            var canFitFullHeight = windowHeight*e.target.videoWidth/e.target.videoHeight < visibleWidth - headerBarWidth +1;
                            $video.css({
                                "max-height": canFitFullHeight ? windowHeight : visibleHeight,
                                "max-width": visibleWidth,
                                "top": canFitFullHeight ? (windowHeight - $video[0].clientHeight)*(e.clientY / windowHeight) : (visibleHeight - $video[0].clientHeight)*(e.clientY / visibleHeight) + headerBarHeight,
                                "left":e.clientX + 50
                            });
                        });
                    }
                });
            }
        });
        $('video').on("mouseout", function(e){
            $('#hoverUI').html('');
        });
    }
}

function relativeTimestamps(posts){
    posts.find('time').each(function(index, timeElement){
        if (!$(timeElement).data('relativeTime')){
            $(timeElement).data('relativeTime', true);
            changeTimestamp(timeElement, Date.parse($(timeElement).attr('datetime')));
        }
    });
}

function convertMS(ms){
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    y = Math.floor(d / 365.25);
    d = Math.floor(d % 365.25);
    return { y: y, d: d, h: h, m: m, s: s };
}

function changeTimestamp(timeElement, postTimestamp){
    var currentTimestamp = Date.now();
    var diffMS = currentTimestamp - postTimestamp;
    if (diffMS < 0){diffMS = 0;} // Handle the issue where mismatched local and server time could end up with negative difference
    var diff = convertMS(diffMS);
    var years = diff.y === 1 ? "year" : "years";
    var days = diff.d === 1 ? "day" : "days";
    var hours = diff.h === 1 ? "hour" : "hours";
    var minutes = diff.m === 1 ? "minute" : "minutes";
    var seconds = diff.s === 1 ? "second" : "seconds";
    if (diff.y){
        $(timeElement).html(diff.y+' '+years+' and '+diff.d+' '+days+' ago');
        setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 365.25*24*60*60*1000);        
    }else if (diff.d){
        if (diff.d >= 2){
            $(timeElement).html(diff.d+' '+days+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 24*60*60*1000);
        }else{
            $(timeElement).html(diff.d+' '+days+' and '+diff.h+' '+hours+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 60*60*1000);
        }
    }else if (diff.h){
        if (diff.h >= 2){
            $(timeElement).html(diff.h+' '+hours+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, (60 - diff.m)*60*1000);
        }else{
            $(timeElement).html(diff.h+' '+hours+' and '+diff.m+' '+minutes+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 10*60*1000);
        }
    }else if (diff.m){
        if (diff.m >= 10){
            $(timeElement).html(diff.m+' '+minutes+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 5*60*1000);
        }else{
            $(timeElement).html(diff.m+' '+minutes+' and '+diff.s+' '+seconds+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 1*60*1000);
        }
    }else{
        if (diff.s >= 20){
            $(timeElement).html(diff.s+' '+seconds+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 20*1000);
        }else{
            $(timeElement).html(diff.s+' '+seconds+' ago');
            setTimeout(function(){changeTimestamp(timeElement, postTimestamp);}, 9*1000);
        }
    }
}

var lastSeenPost;
var unseenPosts = [];
function seenPosts(){
    $('article.backlink_container').attr('id',"0"); // Prevent error when it's undefined
    var parsedLastSeenPost = [parseInt(lastSeenPost.split('_')[0]),parseInt(lastSeenPost.split('_')[1])];
    $('article').each(function(index, currentArticle){ // Add unseen posts to array
        var currentID = [parseInt(currentArticle.id.split('_')[0]),parseInt(currentArticle.id.split('_')[1])];  
        if (currentID[0] > parsedLastSeenPost[0]){
            unseenPosts.push(currentArticle.id);
        }else if (currentID[0] == parsedLastSeenPost[0]){
            if (isNaN(currentID[1])){
                // Do nothing
            }else if (isNaN(parsedLastSeenPost[1]) || currentID[1] > parsedLastSeenPost[1]){
                unseenPosts.push(currentArticle.id);
            }else{
                //console.log(currentID);
            }
        }
    });
    $('article.backlink_container').removeAttr('id'); // Remove id again
    $('#'+unseenPosts[0]).addClass("unseenPost");
}

var unseenReplies = [];
function newPosts(){
    if (settings.UserSettings.favicon.value){
        if (unseenPosts.length){
            //console.time('lastpost');
            var predictedLastSeenPostIndex = -1;
            if (windowFocus){
                var viewportBottom = window.scrollY + window.innerHeight;
                var unseenPostOffset = document.getElementById(unseenPosts[0]).offsetTop + document.getElementById(unseenPosts[0]).offsetHeight;
                if (unseenPostOffset < viewportBottom){
                    var meanPostHeight = (document.getElementById(unseenPosts[unseenPosts.length -1]).offsetTop - document.getElementById(unseenPosts[0]).offsetTop) / unseenPosts.length;
                    var testedSeeds = []; // Keep track of which indices have been checked to prevent endless loops
                    var lastSeed = 0;
                    predictedLastSeenPostIndex = 0;
                    var predictedLSP0offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetHeight;
                    var predictedLSP1offset;
                    if (unseenPosts[predictedLastSeenPostIndex + 1] !== undefined){
                        predictedLSP1offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetHeight;
                    }
                    while (!(predictedLSP0offset <= viewportBottom && (unseenPosts[predictedLastSeenPostIndex + 1] === undefined || predictedLSP1offset > viewportBottom))){
                        testedSeeds[predictedLastSeenPostIndex] = true;
                        predictedLastSeenPostIndex += Math.floor((viewportBottom - document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop) / meanPostHeight);
                        if (predictedLastSeenPostIndex >= unseenPosts.length){
                            predictedLastSeenPostIndex = unseenPosts.length -1; // Keep it from exceeding the array bounds
                        }else if (predictedLastSeenPostIndex < 0){
                            predictedLastSeenPostIndex = 0; // Keep it from being negative
                        }
                        if (testedSeeds[predictedLastSeenPostIndex]){ // Prevent it from getting caught in infinite loops by making sure it never uses the same predictedLSPi twice
                            for (lastSeed; lastSeed < unseenPosts.length; lastSeed++){
                                if (!testedSeeds[lastSeed]){
                                    predictedLastSeenPostIndex = lastSeed;
                                    break;
                                }
                            }
                        }
                        predictedLSP0offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetHeight;                    
                        if (unseenPosts[predictedLastSeenPostIndex + 1] !== undefined){
                            predictedLSP1offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetHeight;
                        }
                    }
                }
            }
            for (var i = predictedLastSeenPostIndex + 1, len = unseenPosts.length; i < len; i++){
                if (yourPostsLookup[board][unseenPosts[i]]){
                    predictedLastSeenPostIndex = i; // Consider any posts following the last seen post that are yours as seen
                }else{
                    break;
                }
            }
            if (predictedLastSeenPostIndex >= 0){
                lastSeenPost = unseenPosts[predictedLastSeenPostIndex]; // Update last seen post
                unseenPosts = unseenPosts.slice(predictedLastSeenPostIndex + 1); // Only keep posts after the lastSeenPost

                var parsedLastSeenPost = [parseInt(lastSeenPost.split('_')[0]),parseInt(lastSeenPost.split('_')[1])];
                $.each(unseenReplies, function(i, unseenID){
                    var currentID = [parseInt(unseenID.split('_')[0]),parseInt(unseenID.split('_')[1])];                        
                    if (currentID[0] < parsedLastSeenPost[0]){
                        unseenReplies.splice(i,1); // Remove seen posts from the unseen replies
                        return;
                    }else if (currentID[0] == parsedLastSeenPost[0]){
                        if(isNaN(parsedLastSeenPost[1]) && !(isNaN(currentID[1]))){
                            return;
                        }else if (isNaN(currentID[1]) || currentID[1] <= parsedLastSeenPost[1]){
                            unseenReplies.splice(i,1); // Remove seen posts from the unseen replies
                            return;
                        }
                    }
                });
            }
            //console.timeEnd('lastpost');
        }
        if (!windowFocus){
            $('.unseenPost').removeClass('unseenPost'); // Remove the previous unseen post line
            $('#'+unseenPosts[0]).addClass('unseenPost'); // Add the unseen class to the first of the unseen posts
        }
        newPostCount = unseenPosts.length;
        if (unseenReplies.length){
            if ($('#favicon').attr("href") !== settings.UserSettings.favicon.suboptions.alert.value){
                $('#favicon').attr("href", settings.UserSettings.favicon.suboptions.alert.value);
            }
        }else if (newPostCount > 0){
            if ($('#favicon').attr("href") !== settings.UserSettings.favicon.suboptions.lit.value){
                $('#favicon').attr("href", settings.UserSettings.favicon.suboptions.lit.value);
            }
        }else{
            if ($('#favicon').attr("href") !== settings.UserSettings.favicon.suboptions.unlit.value){
                $('#favicon').attr("href", settings.UserSettings.favicon.suboptions.unlit.value);
            }
        }
    }else{ // Original newpost counter code
        $('article').each(function(index, currentArticle){
            if (!$(currentArticle).data('seen')){
                $(currentArticle).data('seen', true);
                newPostCount +=1;
            }
        });
        if (windowFocus === true){newPostCount = 0;}
    }
    document.title = "(" + newPostCount + ") " + DocumentTitle;
}

function postCounter(){
    if (!/(other|statistics)/.test(threadID)){
        var postCount = notLoadedPostCount + $('.post_wrapper').length;
        var hiddenPostCount = $('.post.stub:visible').length;
        var imageCount = $(".thread_image_box").length;
        if (settings.UserSettings.postCounter.suboptions.location.value.value === "Header bar"){
            $(".rules_box").html(rulesBox);
            if (settings.UserSettings.postCounter.suboptions.limits.value){
                $(".threadStats").html("<span>Posts(Hidden): " + postCount +"("+hiddenPostCount+")"+ "/"+settings.UserSettings.postCounter.suboptions.limits.suboptions.posts.value+" Images: " +imageCount+ "/"+settings.UserSettings.postCounter.suboptions.limits.suboptions.images.value+"</span>");
            }else{
                $(".threadStats").html("<span>Posts(Hidden): " + postCount +"("+hiddenPostCount+")"+ " Images: " +imageCount+ "</span>");
            }
        }else{
            $(".threadStats").html('');
            if (settings.UserSettings.postCounter.suboptions.limits.value){
                $(".rules_box").html("<h6>Posts(Hidden): " + postCount +"("+hiddenPostCount+")"+ "/"+settings.UserSettings.postCounter.suboptions.limits.suboptions.posts.value+" <br> Images: " +imageCount+ "/"+settings.UserSettings.postCounter.suboptions.limits.suboptions.images.value+"</h6>" + rulesBox);
            }else{
                $(".rules_box").html("<h6>Posts(Hidden): " + postCount +"("+hiddenPostCount+")"+ "<br> Images: " +imageCount+ "</h6>" + rulesBox);
            }
        }
    }
}

var pokemon = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran♀","nidorina","nidoqueen","nidoran♂","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetch'd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr. mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","porygon2","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","ho-oh","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat","illumise","roselia","gulpin","swalot","carvanha","sharpedo","wailmer","wailord","numel","camerupt","torkoal","spoink","grumpig","spinda","trapinch","vibrava","flygon","cacnea","cacturne","swablu","altaria","zangoose","seviper","lunatone","solrock","barboach","whiscash","corphish","crawdaunt","baltoy","claydol","lileep","cradily","anorith","armaldo","feebas","milotic","castform","kecleon","shuppet","banette","duskull","dusclops","tropius","chimecho","absol","wynaut","snorunt","glalie","spheal","sealeo","walrein","clamperl","huntail","gorebyss","relicanth","luvdisc","bagon","shelgon","salamence","beldum","metang","metagross","regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys","turtwig","grotle","torterra","chimchar","monferno","infernape","piplup","prinplup","empoleon","starly","staravia","staraptor","bidoof","bibarel","kricketot","kricketune","shinx","luxio","luxray","budew","roserade","cranidos","rampardos","shieldon","bastiodon","burmy","wormadam","mothim","combee","vespiquen","pachirisu","buizel","floatzel","cherubi","cherrim","shellos","gastrodon","ambipom","drifloon","drifblim","buneary","lopunny","mismagius","honchkrow","glameow","purugly","chingling","stunky","skuntank","bronzor","bronzong","bonsly","mime jr.","happiny","chatot","spiritomb","gible","gabite","garchomp","munchlax","riolu","lucario","hippopotas","hippowdon","skorupi","drapion","croagunk","toxicroak","carnivine","finneon","lumineon","mantyke","snover","abomasnow","weavile","magnezone","lickilicky","rhyperior","tangrowth","electivire","magmortar","togekiss","yanmega","leafeon","glaceon","gliscor","mamoswine","porygon-z","gallade","probopass","dusknoir","froslass","rotom","uxie","mesprit","azelf","dialga","palkia","heatran","regigigas","giratina","cresselia","phione","manaphy","darkrai","shaymin","arceus","victini","snivy","servine","serperior","tepig","pignite","emboar","oshawott","dewott","samurott","patrat","watchog","lillipup","herdier","stoutland","purrloin","liepard","pansage","simisage","pansear","simisear","panpour","simipour","munna","musharna","pidove","tranquill","unfezant","blitzle","zebstrika","roggenrola","boldore","gigalith","woobat","swoobat","drilbur","excadrill","audino","timburr","gurdurr","conkeldurr","tympole","palpitoad","seismitoad","throh","sawk","sewaddle","swadloon","leavanny","venipede","whirlipede","scolipede","cottonee","whimsicott","petilil","lilligant","basculin","sandile","krokorok","krookodile","darumaka","darmanitan","maractus","dwebble","crustle","scraggy","scrafty","sigilyph","yamask","cofagrigus","tirtouga","carracosta","archen","archeops","trubbish","garbodor","zorua","zoroark","minccino","cinccino","gothita","gothorita","gothitelle","solosis","duosion","reuniclus","ducklett","swanna","vanillite","vanillish","vanilluxe","deerling","sawsbuck","emolga","karrablast","escavalier","foongus","amoonguss","frillish","jellicent","alomomola","joltik","galvantula","ferroseed","ferrothorn","klink","klang","klinklang","tynamo","eelektrik","eelektross","elgyem","beheeyem","litwick","lampent","chandelure","axew","fraxure","haxorus","cubchoo","beartic","cryogonal","shelmet","accelgor","stunfisk","mienfoo","mienshao","druddigon","golett","golurk","pawniard","bisharp","bouffalant","rufflet","braviary","vullaby","mandibuzz","heatmor","durant","deino","zweilous","hydreigon","larvesta","volcarona","cobalion","terrakion","virizion","tornadus","thundurus","reshiram","zekrom","landorus","kyurem","keldeo","meloetta","genesect","chespin","quilladin","chesnaught","fennekin","braixen","delphox","froakie","frogadier","greninja","bunnelby","diggersby","fletchling","fletchinder","talonflame","scatterbug","spewpa","vivillon","litleo","pyroar","flabébé","floette","florges","skiddo","gogoat","pancham","pangoro","furfrou","espurr","meowstic","honedge","doublade","aegislash","spritzee","aromatisse","swirlix","slurpuff","inkay","malamar","binacle","barbaracle","skrelp","dragalge","clauncher","clawitzer","helioptile","heliolisk","tyrunt","tyrantrum","amaura","aurorus","sylveon","hawlucha","dedenne","carbink","goomy","sliggoo","goodra","klefki","phantump","trevenant","pumpkaboo","gourgeist","bergmite","avalugg","noibat","noivern","xerneas","yveltal","zygarde","diancie","hoopa","volcanion"];
function notifyMe(title,icon,body,timeFade){
    if (!Notification){
        alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
        return;
    }
    if (Notification.permission !== "granted"){Notification.requestPermission();}
    if(!Math.floor(Math.random()*8192)){
        var ND = Math.floor(Math.random()*pokemon.length);
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

var lastSeenPosts;
var yourPosts;
if (settings.UserSettings.labelYourPosts.value){
    loadYourPosts();
}
if (settings.UserSettings.favicon.value){
    if (localStorage.lastSeenPosts === undefined){
        lastSeenPosts = {};
        localStorage.lastSeenPosts = "{}";
        console.log("Created unseen replies archive for the first time");
    }else{
        lastSeenPosts = JSON.parse(localStorage.lastSeenPosts);
    }
    if (lastSeenPosts[board] === undefined){
        lastSeenPosts[board] = {};
    }
    if (lastSeenPosts[board][threadID] === undefined){
        lastSeenPosts[board][threadID] = threadID;
    }
    lastSeenPost = lastSeenPosts[board][threadID];
}
function loadYourPosts(){
    if (localStorage.yourPosts === undefined){
        yourPosts = {};
        localStorage.yourPosts = "{}";
        console.log("Created post archive for the first time");
    }else{
        yourPosts = JSON.parse(localStorage.yourPosts);
    }
    if (yourPosts[board] === undefined){
        yourPosts[board] = {};
    }
    if (yourPosts[board][threadID] === undefined){
        yourPosts[board][threadID] = [];
    }
}
function saveYourPosts(){
    if (yourPosts[board][threadID].length){ // If you posted during the thread. Prevents saving of empty arrays
        if (localStorage.yourPosts === undefined){
            localStorage.yourPosts = JSON.stringify(yourPosts);
        }else{
            localStorage.yourPosts = JSON.stringify($.extend(true, yourPosts, JSON.parse(localStorage.yourPosts)));
        }
    }
}
window.addEventListener("beforeunload", function (e){ // After user leaves the page
    if (settings.UserSettings.labelYourPosts.value){ // Save the your posts object
        saveYourPosts();
    }
    if (settings.UserSettings.favicon.value){ // Save the last read posts object
        lastSeenPosts[board][threadID] = lastSeenPost;
        if (localStorage.lastSeenPosts === undefined){
            localStorage.lastSeenPosts = JSON.stringify(lastSeenPosts);
        }else{
            latestLastSeenPosts = JSON.parse(localStorage.lastSeenPosts); // Get the most recent version of the stored object
            if (latestLastSeenPosts[board] !== undefined && latestLastSeenPosts[board][threadID] !== undefined){
                if (parseInt(latestLastSeenPosts[board][threadID].split('_')[0]) > parseInt(lastSeenPosts[board][threadID].split('_')[0])){
                    lastSeenPosts[board][threadID] = latestLastSeenPosts[board][threadID];
                }else if (parseInt(latestLastSeenPosts[board][threadID].split('_')[0]) == parseInt(lastSeenPosts[board][threadID].split('_')[0])){
                    if (isNaN(lastSeenPosts[board][threadID].split('_')[1]) || parseInt(latestLastSeenPosts[board][threadID].split('_')[1]) > parseInt(lastSeenPosts[board][threadID].split('_')[1])){
                        lastSeenPosts[board][threadID] = latestLastSeenPosts[board][threadID];
                    }
                }
            }
            localStorage.lastSeenPosts = JSON.stringify(lastSeenPosts); // Save it again
        }
    }
    //var confirmationMessage = "\o/";

    //(e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //return confirmationMessage;                            //Webkit, Safari, Chrome
});

function notificationSpoiler(postID){
    var temp = $('#'+postID+' .text').clone(); // Make a copy of the post text element to avoid changing the original
    if (settings.UserSettings.notifications.suboptions.spoiler.value){
        $(temp).find('.spoiler').each(function(i,spoiler){
            var newSpoilerText = '';
            for (var j=0, spoilerLength = $(spoiler).text().length; j < spoilerLength; j++){
                newSpoilerText += "&#x2588"; // Convert spoilered characters into black block characters
            }
            spoiler.innerHTML = newSpoilerText;
        });
        $(temp).find('br').each(function(i,br){
            $(br).after('\n');
        });
    }
    if (settings.UserSettings.notifications.suboptions.restrict.value){
        var lineCount = settings.UserSettings.notifications.suboptions.restrict.suboptions.lines.value;
        var charCount = settings.UserSettings.notifications.suboptions.restrict.suboptions.characters.value;
        var restrictedText = temp.text().trim().substr(0, charCount*lineCount); // Dock three extra chars to replace with ellipses
        var restTextLines = restrictedText.split('\n');
        restrictedText = '';
        for (var i = 0; i < lineCount; i++){
            if (restTextLines[i] === undefined){break;} // If there's less than five lines break loop
            if (i !== 0){
                restrictedText += '\n'; // Add the linebreaks back in
            }
            while (restTextLines[i].length > charCount){ // Break up lines that exceed charCount
                if (i < lineCount){
                    restrictedText += restTextLines[i].substr(0,charCount);
                    if (!(/ /).test(restTextLines[i].substr(0,charCount))){ // If there's no space Firefox won't automatically break the chunk onto a new line
                        restrictedText += '\n';
                    }
                    restTextLines[i] = restTextLines[i].substr(charCount);
                    lineCount--;
                }
            }
            restrictedText += restTextLines[i];

        }
        return restrictedText + '...';
    }else{
        return temp.text().trim();
    }
}

function labelNewPosts(newPosts, boardView){
    var crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
    localStorage.crosslinkTracker = "{}";
    loadYourPosts();
    for (var boardVal in yourPosts){
        if (crosslinkTracker[boardVal]){
            if (yourPostsLookup[boardVal] === undefined){
                yourPostsLookup[boardVal] = {};
            }
            for (var thread in yourPosts[boardVal]){
                for (var i=0, threadLength = yourPosts[boardVal][thread].length; i < threadLength; i++){
                    yourPostsLookup[boardVal][yourPosts[boardVal][thread][i]] = true;
                }
            }
        }
    }
    $.each(newPosts, function(i,postID){ // For each post returned by update
        var notificationTriggered = false;
        $('#'+postID+' .backlink').each(function(i, link){ // For each post content backlink
            var linkBoard = link.dataset.board;
            if (yourPostsLookup[linkBoard] !== undefined){
                var linkID = link.dataset.post.replace(',','_');
                if (yourPostsLookup[linkBoard][linkID]){ // If the link points to your post
                    if (!notificationTriggered && !boardView){
                        if (!settings.UserSettings.filter.value || !settings.UserSettings.filter.suboptions.filterNotifications.value || $('#'+postID+':visible').length){ // Filter notifications
                            if (settings.UserSettings.notifications.value){
                                notifyMe($('#'+postID+' .post_poster_data').text().trim()+" replied to you","http://i.imgur.com/HTcKk4Y.png",notificationSpoiler(postID),true);
                            }
                            unseenReplies.push(postID); // add postID to list of unseen replies
                            notificationTriggered = true;
                        }
                    }
                    link.textContent += ' (You)'; // Designate the link as such
                }
                if (yourPostsLookup[linkBoard][postID] && !boardView){ // If the post is your own
                    var backlink = $('#'+linkID+' .post_backlink [data-post='+postID+']');
                    if (backlink.length && !backlink.data('linkedYou')){
                        backlink.data('linkedYou',true);
                        backlink[0].textContent += ' (You)'; // Find your post's new reply backlink and designate it too
                    }
                }
            }
        });
        if (document.getElementById(postID) !== null){ // Don't add to unseen posts if filter has purged the post
            unseenPosts.push(postID); // add postID to list of unseen posts
        }
    });
}

var lastSubmittedContent;
function postSubmitEvent(){
    window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var target =  $('#reply [type=submit]')[0],
        observer = new MutationObserver(function(mutation) {
            lastSubmittedContent = $('#reply_chennodiscursus')[0].value;
        }),
        config = {
            attributes: true
        };
    if (target !== undefined){ // Some threads don't allow for ghost posting
        observer.observe(target, config);
    }
}

function linkHoverEvent(){ // Hook into the native internal link hover
    window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var target =  $('#backlink')[0],
        observer = new MutationObserver(function(mutation) {
            $('#backlink > article').removeClass('shitpost');
            relativeTimestamps($('#backlink > article'));
            embedImages($('#backlink > article'));
        }),
        config = {
            childList: true
        };
    if (target !== undefined){ // Some boards don't have posts and thus link hovering
        observer.observe(target, config);
    }
}

function mascot(mascotImageLink){
    if (settings.UserSettings.mascot.value){
        if (!$('#mascotBackground').length){
            $('.container-fluid').prepend('<div id="mascotBackground" style="position:fixed; background-color:'+$('.container-fluid').css('background-color')+'; z-index:-2; top:0; right:0; bottom:0; left:0;"></div>');
            $('.container-fluid').css({'background-color':'rgba(0, 0, 0, 0)'});
        }
        var cornerCSS;
        switch (settings.UserSettings.mascot.suboptions.corner.value.value){
            case "Top Right": cornerCSS = {"top":-settings.UserSettings.mascot.suboptions.y.value+"px","right":-settings.UserSettings.mascot.suboptions.x.value+"px","bottom":"","left":""}; break;
            case "Bottom Right": cornerCSS = {"top":"","right":-settings.UserSettings.mascot.suboptions.x.value+"px","bottom":settings.UserSettings.mascot.suboptions.y.value+"px","left":""}; break;
            case "Bottom Left": cornerCSS = {"top":"","right":"","bottom":settings.UserSettings.mascot.suboptions.y.value+"px","left":settings.UserSettings.mascot.suboptions.x.value+"px"}; break;
            case "Top Left": cornerCSS = {"top":-settings.UserSettings.mascot.suboptions.y.value+"px","right":"","bottom":"","left":settings.UserSettings.mascot.suboptions.x.value+"px"}; break;
            default: console.log("Invalid corner setting");
        }
        if (mascotImageLink !== ""){
            if (!$('#mascotContainer').length){
                $('.container-fluid').prepend('<div id="mascotContainer"></div>');
            }
            var videoFiletypes = new RegExp(".(webm|gifv|mp4)($|\\?[\\S]+$)",'i');
            if (videoFiletypes.test(mascotImageLink)){
                $('#mascotContainer > img').remove();
                if (!$('#mascotContainer > *').length){
                    $('#mascotContainer').html('<video id="mascot" style="position:fixed; z-index:-1;" name="media" loop muted autoplay><source src="'+mascotImageLink+'" type="video/webm"></video>');
                }else{
                    $('#mascot')[0].src = mascotImageLink;
                }
            }else{
                $('#mascotContainer > video').remove();
                if (!$('#mascotContainer > *').length){
                    $('#mascotContainer').html('<img id="mascot" src="'+mascotImageLink+'" style="position:fixed; z-index:-1;">');
                }else{
                    $('#mascot')[0].src = mascotImageLink;
                }
            }
        }
        cornerCSS["z-index"] = settings.UserSettings.mascot.suboptions.zindex.value;
        cornerCSS.opacity = settings.UserSettings.mascot.suboptions.opacity.value;
        if (settings.UserSettings.mascot.suboptions.clickthrough.value){
            cornerCSS["pointer-events"] = "none";
        }else{
            cornerCSS["pointer-events"] = "";
        }
        if (settings.UserSettings.mascot.suboptions.width.value < 0){
            cornerCSS.width = "";
        }else{
            cornerCSS.width = settings.UserSettings.mascot.suboptions.width.value;
        }
        $('#mascot').css(cornerCSS);
        if ($('#mascotContainer > video').length){
            if (settings.UserSettings.mascot.suboptions.mute.value){
                $('#mascot')[0].muted=true;
            }else{
                $('#mascot')[0].muted=false;
            }
        }
        $('#mascot').on('load', function(e){ // Wait for Mascot to load (otherwise margins won't read size properly)
            postFlow(); // Restructure the postFlow
        });
    }else{
        $('#mascot').remove();
        postFlow(); // Restructure the postFlow
    }    
}

function parseMascotImageValue(){
    var mascotImageLink;
    if (isNaN(parseInt(settings.UserSettings.mascot.suboptions.mascotImage.value))){
        if (settings.UserSettings.mascot.suboptions.mascotImage.value === undefined || settings.UserSettings.mascot.suboptions.mascotImage.value === ""){
            mascotImageLink = defaultMascots[Math.floor(Math.random()*defaultMascots.length)]; // If empty set to a random default mascot
        }else{
            mascotImageLink = settings.UserSettings.mascot.suboptions.mascotImage.value;
        }
    }else{
        mascotImageLink = defaultMascots[parseInt(settings.UserSettings.mascot.suboptions.mascotImage.value)];
    }
    return mascotImageLink;
}

function postFlow(){
    if (settings.UserSettings.postFlow.value){
        var align = settings.UserSettings.postFlow.suboptions.align.value.value;
        var leftMargin = settings.UserSettings.postFlow.suboptions.leftMargin.value;
        var rightMargin = settings.UserSettings.postFlow.suboptions.rightMargin.value;
        $('article.thread').each(function(i,threadOP){
            if ($(threadOP).children('.thread_image_box').length){ // Stop posts for intruding in short OPs
                var opTextHeight = $(threadOP).children('.thread_image_box')[0].offsetHeight + 10 -20 - $(threadOP).children('header')[0].offsetHeight - $(threadOP).children('.thread_tools_bottom')[0].offsetHeight;
                $(threadOP).children('.text').css({"min-height":opTextHeight+"px"});
            }
        });
        if (settings.UserSettings.mascot.value){
            if (settings.UserSettings.postFlow.suboptions.leftMargin.value < 0){
                leftMargin = document.getElementById('mascot').offsetWidth; // Make it fit around the mascot if negative value
            }
            if (settings.UserSettings.postFlow.suboptions.rightMargin.value < 0){
                rightMargin = document.getElementById('mascot').offsetWidth; // Make it fit around the mascot if negative value
            }
            if (!leftMargin || !rightMargin){
            }
        }
        var width = $('body').innerWidth() - leftMargin - rightMargin;
        if (align === "Left"){
            $('.posts').css({"display":"block"});
            $('#main').css({
                "width":width,
                "margin-left":leftMargin+"px"
            });
            $('.pull-left').css({
                "float":"left"
            });
        }else if (align === "Center"){
            $('.posts').css({
                "display":"flex",
                "flex-direction":"column",
                "align-items":"center"
            });
            $('#main').css({
                "width":width,
                "margin-left":leftMargin+"px"
            });
            $('.pull-left').css({
                "float":"left"
            });
        }else{ // align == "Right"
            $('.posts').css({
                "display":"flex",
                "flex-direction":"column",
                "align-items":"flex-end"
            });
            $('#main').css({
                "width":width,
                "margin-left":"auto",
                "margin-right":rightMargin+"px"
            });
            $('.pull-left').css({
                "float":"right"
            });
        }
        var wordBreak = settings.UserSettings.postFlow.suboptions.wordBreak.value.value;
        if (wordBreak === "Auto"){
            if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){ // If using Firefox
                $('#SpookyX-css-word-break').html('.text{word-break:break-all}');
            }else{
                $('#SpookyX-css-word-break').html('');
            }
        }else if(wordBreak === "Break-all"){
            $('#SpookyX-css-word-break').html('.text{word-break:break-all}');
        }else{ // wordBreak == Normal
            $('#SpookyX-css-word-break').html('.text{word-break:normal}');
        }
    }else{
        $('#main').css({
            "width":"",
            "margin":"0"
        });
        $('.posts').css({"display":"block"});        
    }
}

function adjustReplybox(){
    if (settings.UserSettings.adjustReplybox.value){
        $('#reply_chennodiscursus').css({
            "width":settings.UserSettings.adjustReplybox.suboptions.width.value
        });
    }else{
        $('#reply_chennodiscursus').css({
            "width":"320"
        });
    }
    if (settings.UserSettings.adjustReplybox.suboptions.removeReset.value){
        $('#reply .btn[type=reset]').remove();
    }
}

function headerBar(){
    $(window).off('mousewheel');
    if (settings.UserSettings.headerBar.suboptions.shortcut.value){
        if (!shortcut.all_shortcuts.h){
            shortcut.add("h", function(){$('#headerFixed').toggleClass('shortcutHidden');}, {"disable_in_input":true});
        }
    }else{
        if (shortcut.all_shortcuts.h){
            shortcut.remove("h");
        }
    }
    if (settings.UserSettings.headerBar.suboptions.behaviour.value.value === "Collapse to button"){ // If in collapse mode
        $('#headerFixed').removeClass('shortcutHidden'); // Un-hide
        if ($('#headerFixed a[title="Show headerbar"]:visible').length){
            if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.settings.value){
                $('#headerFixed .headerBar > a[title="SpookyX Settings"]').show();
            }else{
                $('#headerFixed .headerBar > a[title="SpookyX Settings"]').hide();
            }
            if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.postCounter.value){
                $('#headerFixed .headerBar > .threadStats').show();
            }else{
                $('#headerFixed .headerBar > .threadStats').hide();
            }
        }
        if (!$('.collapseButton').length){ // Only add the collapse buttons if they don't already exist
            $('#headerFixed > .boardList').after('<a class="collapseButton" title="Show headerbar" href="javascript:;" style="float:right; display:none; font-family:monospace;">[+]</a>');
            $('#headerFixed .headerBar').append('<a class="collapseButton" title="Hide headerbar" href="javascript:;" style="font-family:monospace;">[-]</a>');
        }
        $('#headerFixed .headerBar a[title="Hide headerbar"]').on('click', function(){ // Add click events to the buttons
            $('#headerFixed .boardList').hide();
            if (!settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.settings.value){
                $('#headerFixed .headerBar > a[title="SpookyX Settings"]').hide();
            }
            if (!settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.postCounter.value){
                $('#headerFixed .headerBar > .threadStats').hide();
            }
            $('#headerFixed .headerBar a[title="Hide headerbar"]').hide();
            $('#headerFixed a[title="Show headerbar"]').show();
            $('#headerFixed').css({
                "left":"initial",
                "padding":"0 10px"
            });
        });
        $('#headerFixed a[title="Show headerbar"]').on('click', function(){ // Add click events to the buttons
            $('#headerFixed .boardList').show();
            $('#headerFixed .headerBar > .threadStats').show();
            $('#headerFixed .headerBar > a[title="SpookyX Settings"]').show();
            $('#headerFixed .headerBar a[title="Hide headerbar"]').show();
            $('#headerFixed a[title="Show headerbar"]').hide();
            $('#headerFixed').css({
                "left":"-1px",
                "padding":"0 10px 0 30px"
            });
        });
        if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.scroll.value){ // Add a scroll event that collapses it
            $('#headerFixed').removeClass('shortcutHidden');
            $(window).on('mousewheel', function(e){
                if (!$(e.target).closest('#settingsMenu').length){
                    if (e.deltaY > 0){
                        $('#headerFixed a[title="Show headerbar"]').trigger('click');
                    }else{
                        $('#headerFixed .headerBar a[title="Hide headerbar"]').trigger('click');
                    }
                }
            });
        }
        if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.defaultHidden.value){ // Collapse on pageload
            $('#headerFixed .headerBar a[title="Hide headerbar"]').trigger('click');
        }else{
            $('#headerFixed a[title="Show headerbar"]').trigger('click');
        }
    }else{ // Else remove any collapse stuff
        $('.collapseButton').remove();
        $('#headerFixed .boardList').show();
        $('#headerFixed .headerBar > .threadStats').show();
        $('#headerFixed .headerBar > a[title="SpookyX Settings"]').show();
        $('#headerFixed').css({
            "left":"-1px",
            "padding":"0 10px 0 30px"
        });
        if (settings.UserSettings.headerBar.suboptions.behaviour.value.value === "Full hide"){ // If full hide mode
            if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.scroll.value){ // Add scroll event that hides it
                $(window).on('mousewheel', function(e){
                    if (!$(e.target).closest('#settingsMenu').length){
                        if (e.deltaY > 0){
                            $('#headerFixed').removeClass('shortcutHidden');
                        }else{
                            $('#headerFixed').addClass('shortcutHidden');
                        }
                    }
                });
            }
            if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.defaultHidden.value){ // Hide on pageload
                $('#headerFixed').addClass('shortcutHidden');
            }else{
                $('#headerFixed').removeClass('shortcutHidden');
            }
        }else{
            $('#headerFixed').removeClass('shortcutHidden'); // Unhide it if always show mode
        }
    }
}

$(document).ready(function(){
    $('body').append('<div id="postBackgroundColourPicker" class="thread_form_wrap" style="display:none;"></div>'); // Create an element to get the post colour from
    var postBackgroundColourPicker = $('#postBackgroundColourPicker').css('background-color'); // Set the colour
    $('#postBackgroundColourPicker').remove(); // Delete the element afterwards
    $('head').after('<style type="text/css" id="SpookyX-css"></style>');
    $('head').after('<style type="text/css" id="SpookyX-css-word-break"></style>'); // Add style element that controls that one thing
    $('#SpookyX-css').append('.imgur-embed-iframe-pub{float: left; margin: 10px 10px 0 0!important;}.post_wrapper .pull-left, article.backlink_container > div#backlink .pull-left{display:none;}#gallery{position:fixed; width:100%; height:100%; top:0; left:0; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.7);}.unseenPost{border-top: red solid 1px;}.hoverImage{position:fixed;float:none!important;}.bigImage{opacity: 1!important; max-width:100%;}.smallImage{max-width:'+imageWidth+'px; max-height:'+imageHeight+'px}.smallImage.thread_image{max-width:'+imageWidthOP+'px; max-height:'+imageHeightOP+'px}.spoilerImage{opacity: 0.1}.spoilerText{position: relative; height: 0px; font-size: 19px; top: 47px;}.forwarded{display:none!important}.inline{border:1px solid; display: table; margin: 2px 0;}.inlined{opacity:0.5}.post_wrapper{border-right: 1px solid #cccccc;}.theme_default.midnight .post_wrapper{border-right: 0;}.post_wrapperInline{border-right:0!important; border-bottom:0!important;}.quickReply{position: fixed; top: 0; right: 0; margin:21px 3px !important;}.shitpost{opacity: 0.3}.embedded_post_file{margin: 0!important; max-width: '+imageWidth+'px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}');
    $('#SpookyX-css').append('.headerBar{float:right; display:inline-block; z-index:10;}.threadStats{display:inline;}#settingsMenu{position: fixed; height: 550px; max-height: 100%; width: 900px; max-width: 100%; margin: auto; padding: 0; top: 50%; left: 50%; -moz-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);z-index: 999; border: 2px solid #364041;}.sections-list{padding: 3px 6px; float: left;}.credits{padding: 3px 6px; float: right;}#menuSeparator{width:100%; border-top:1px solid #364041; float:left; position:relative; top:-2px;}.sections-list a.active{font-weight: 700;}.sections-list a{text-decoration: underline;}#settingsMenu label{display: inline; text-decoration: underline; cursor: pointer;}#settingsContent{position: absolute; overflow: auto; top: 1.8em; bottom: 0; left: 0; right: 0; padding: 0;}#settingsContent > div{padding: 3px;}.suboption-list{position: relative;}.suboption-list::before{content: ""; display: inline-block; position: absolute; left: .7em; width: 0; height: 100%; border-left: 1px solid;}.suboption-list > div::before{content: ""; display: inline-block; position: absolute; left: .7em; width: .7em; height: .6em; border-left: 1px solid; border-bottom: 1px solid;}.suboption-list > div{position: relative; padding-left: 1.4em;}.suboption-list > div:last-of-type {background-color:'+postBackgroundColourPicker+';}#settingsMenu input{margin: 3px 3px 3px 4px; padding-top:1px; padding-bottom:0; padding-right:0;}#settingsMenu select{margin: 3px 3px 3px 4px; padding-left: 2px; padding-top: 0px; padding-bottom: 0px; padding-right: 0; height: 19px; width: auto;}#settingsMenu input[type="text"]{height:16px; line-height:0;}#settingsMenu input[type="number"]{height:16px; line-height:0; width:44px;}');
    $('#SpookyX-css').append('.last{background-color:'+postBackgroundColourPicker+';}#settingsMenu code{padding: 2px 4px; background-color: #f7f7f9!important; border: 1px solid #e1e1e8!important;}.filters-list{padding: 0 3px;}.filters-list a.active{font-weight: 700;}.filters-list a{text-decoration: underline;}#Filter textarea {margin:0; height: 493px; font-family:monospace; min-width:100%; max-width:100%;}#Filter > div{margin-right:14px;}');
    $('#SpookyX-css').append('.shortcutHidden{display:none!important;}.letters{margin-top:0!important;}#headerFixed{position:fixed; left:-1px; right:-1px; top:-1px; padding:0 10px 0 30px; border:#252525 1px solid; z-index:1;}#headerStatic{position:static; padding: 0px 10px 0 30px;}.threadStats{margin-right:20px;}');
    $('#SpookyX-css').append('#settingsMenu .description{margin-left:2px; flex-shrink: 9999;}.selectDescription{margin-top:3px;}#settingsMenu label{margin-bottom:0}.settingsJoinLine{border-left:solid 1px; position:relative; left:0.7em; top: 1.9em;}.settingsJoinLineCheckbox{top: 1.4em;}.settingFlexContainer{display:flex;}');
    if (settings.UserSettings.favicon.value){
        $('head').append('<link id="favicon" rel="shortcut icon" type="image/png" href="'+settings.UserSettings.favicon.suboptions.unlit.value+'">');
        $('#reply fieldset .progress').after('<canvas id="myCanvas" width="64" height="64" style="float:left; display:none; position: relative; top: -10px; left: -10px;"></canvas>');
    }
    $('body').append('<div id="hoverUI"></div>');
    if ($('.letters').length){
        $('.letters').html('<span class="boardList">'+$('.letters').html()+'</span><span class="headerBar"><div class="threadStats"></div><a title="SpookyX Settings" href="javascript:;" style="margin-right:10px;">Settings</a></span>');
        $('.letters').clone().hide().insertAfter('.letters');
        $('.letters')[0].id="headerStatic";
        $('.letters')[1].id="headerFixed";
    }else{ // Insert settings link when on board index
        $('.container-fluid').append('<div class="headerBar" style="position: fixed; right: 0; top: 0;"><a title="SpookyX Settings" href="javascript:;">Settings</a></div>');
    }
    $('body').append('<div id="settingsMenu" class="thread_form_wrap" style="display: none;"><div id="settingsHeader"><div class="sections-list"><a href="javascript:;" class="active">Main</a> | <a href="javascript:;">Filter</a></div><div class="credits"><a target="_blank" href="https://github.com/Fiddlekins/SpookyX" style="text-decoration: underline;">SpookyX</a> | <a target="_blank" href="https://github.com/Fiddlekins/SpookyX/blob/master/CHANGELOG.md" style="text-decoration: underline;">v.'+GM_info.script.version+'</a> | <a target="_blank" href="https://github.com/Fiddlekins/SpookyX/issues" style="text-decoration: underline;">Issues</a> | <a target="_blank" href="https://archive.moe/a/thread/126054592" style="text-decoration: underline;">Feedback</a> | <a title="Close" href="javascript:;">Close</a></div></div><div id="menuSeparator"></div><div id="settingsContent"></div></div>'); // <a title="Export" href="javascript:;">Export</a> | <a title="Import" href="javascript:;">Import</a> | <a title="Reset Settings" href="javascript:;">Reset Settings</a> |
    if (settings.UserSettings.gallery.value){$('body').append('<div id="gallery" style="display:none;"></div>');}
    if (/[0-9]+/.test(threadID)){ // If in a thread
        $($('.navbar .nav')[1]).append('<li><a href="//boards.4chan.org/'+board+'/thread/'+threadID+'">View thread on 4chan</a></li>'); // Add view thread on 4chan link
    }
    $('.headerBar > a[title="SpookyX Settings"], a[title=Close]').on('click', function(){
        populateSettingsMenu();
    });
    $(window).on('scroll', function(){
        if (window.scrollY > 40){
            $('#headerFixed').show();            
        }else{
            $('#headerFixed').hide();
        }
    });
    if (window.scrollY > 42){ // Show headerbar on pageload if necessary
        $('#headerFixed').show();            
    }
    $('.sections-list').on('click', function(e){ // Main settings tabs change on click
        if (e.target.tagName == "A"){
            $('#settingsContent #'+$('.sections-list .active').html()).hide();
            $('.sections-list .active').removeClass('active');
            $(e.target).addClass('active');
            $('#settingsContent #'+$('.sections-list .active').html()).show();
        }
    });
    $('#settingsContent').on('click', function(e){ // Filter subtabs change on click
        if (e.target.parentNode.className == "filters-list"){
            var filterSubmenu = $(e.target).attr('name');
            $('#filter_'+$('.filters-list .active').attr('name')).hide();
            $('.filters-list .active').removeClass('active');
            $('.filters-list > a[name='+filterSubmenu+']').addClass('active');
            $('#filter_'+filterSubmenu).show();
        }
    });
    $('#settingsContent').on('change', function(e){
        if ($(e.target).hasClass('filterTextarea')){
            var store = [];
            $.each(e.target.value.split('\n'), function(i, line){
                var lineStore = {};
                if (line.trim().substr(0,1) == "#"){
                    lineStore.comment = line;
                }else{
                    line = line.replace(/\\;/g, '<delimitedSemiColon>');
                    $.each(line.split(';'), function(i, fragment){
                        if (fragment !== ""){
                            if (!i){
                                var regex = fragment.trim().replace(/<delimitedSemiColon>/g, ';');
                                if ((/[gim]/).test(regex.substring(regex.length -1))){                                    
                                    lineStore.regex = {"pattern":regex.substring(1,regex.length-2),"flag":regex.substring(regex.length-1)};
                                }else{
                                    lineStore.regex = {"pattern":regex.substring(1,regex.length-1),"flag":""};
                                }
                            }else{
                                var components = fragment.split(':');
                                lineStore[components.shift().trim().replace(/<delimitedSemiColon>/g, ';')] = components.join(':').trim().replace(/<delimitedSemiColon>/g, ';');
                            }
                        }
                    });
                    if (lineStore.regex !== undefined){
                        lineStore.comment = false;
                    }
                }
                store.push(lineStore);
            });
            settings.FilterSettings[$(e.target).attr('name')].value = store;
        }else{
            var value;
            var elementPath = $(e.target).attr('path');
            var settingPath = objpath(settings.UserSettings, elementPath);
            if (e.target.type === "checkbox"){
                if (e.target.name === "Filter"){
                    if (settings.UserSettings.filter.value){
                        $('#filterDisabledMessage').show();
                    }else{
                        $('#filterDisabledMessage').hide();
                    }
                }
                value = e.target.checked;
                $(e.target).closest('div:not(.settingFlexContainer)').children('.suboption-list').toggle(); // Make parent checkboxes collapse the suboptions if they're unticked
                $(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').toggle();
            }else{
                value = e.target.value;
            }
            if (e.target.nodeName == "SELECT"){
                settingPath.value.value = value;
                var testPatt = new RegExp(value);
                for (var suboption in settingPath.suboptions){
                    if (settingPath.suboptions[suboption].if !== undefined){
                        var ifMet = false;
                        $.each(settingPath.suboptions[suboption].if, function(i,v){
                            if (testPatt.test(v)){
                                ifMet = true;
                                return false;
                            }
                        });
                        if (ifMet){
                            $(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list [key='+suboption+']').closest('div:not(.settingFlexContainer)').show();
                        }else{
                            $(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list [key='+suboption+']').closest('div:not(.settingFlexContainer)').hide();
                        }
                        $(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > .last').removeClass('last');
                        $(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > :visible:last').addClass('last');
                        if ($(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > :visible').length > 1){
                            $(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').show();
                        }else{
                            $(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').hide();
                        }
                    }
                }
            }else{
                settingPath.value = value;
            }
            if (elementPath.substr(0,6) == "mascot"){ // Live update changes in mascot settings
                if (e.target.name == "Mascot image" || e.target.name == "Mascot"){
                    mascot(parseMascotImageValue());
                }else{
                    mascot('');
                }
            }else if (elementPath.substr(0,8) == "postFlow"){
                postFlow();
            }else if (elementPath.substr(0,14) == "adjustReplybox"){
                adjustReplybox();
            }else if (elementPath.substr(0,11) == "postCounter"){
                postCounter();
            }else if (elementPath.substr(0,9) == "headerBar"){
                headerBar();
            }
        }
        settingsStore = {};
        settingsStore.UserSettings = settingsStrip(settings.UserSettings);
        settingsStore.FilterSettings = settingsStrip(settings.FilterSettings);
        localStorage.SpookyXsettings = JSON.stringify(settingsStore); // Save the settings
    });
    if (settings.UserSettings.postCounter.suboptions.countUnloaded.value){
        if (/[0-9]+/.test(threadID)){ // Count the posts that aren't loaded (eg. in last/50 mode)
            $.ajax({
                url:"/_/api/chan/thread/",
                method:"GET",
                data:{"board":board,"num":threadID,"inThread":true}
            }).done(function(response){
                var firstLoadedPostID = $('article.post')[0].id;
                var postList = Object.keys(response[threadID].posts);
                for (var i=0, len=postList.length; i < len; i++){
                    if (postList[i] !== firstLoadedPostID){
                        notLoadedPostCount++;
                    }else{break;}
                }
                postCounter();
            });
        }
    }
    if (/[0-9]+/.test(threadID)){
        windowFocus = true;
        $(window).focus(function(){
            windowFocus = true;
            ThreadUpdate();
        });
        $(window).blur(function(){
            windowFocus = false;
        });
        $('#'+unseenPosts[0]).addClass('unseenPost'); // Add the unseen class to the first of the unseen posts
    }
    if (settings.UserSettings.labelYourPosts.value){
        for (var boardVal in yourPosts){
            yourPostsLookup[boardVal] = {};
            for (var thread in yourPosts[boardVal]){
                var threadLength = yourPosts[boardVal][thread].length;
                var threadArray = yourPosts[boardVal][thread];
                for (var i=0; i < threadLength; i++){
                    yourPostsLookup[boardVal][threadArray[i]] = true;
                }
            }
        }
        if (/[0-9]+/.test(threadID)){
            postSubmitEvent();
            $(document).ajaxComplete(function(event, request, ajaxSettings){
                if (!(/inThread=true/).test(ajaxSettings.url)){
                    if (request.responseText !== ""){
                        response = JSON.parse(request.responseText);
                    }else{
                        response = {"error":"No responseText"};
                    }
                    if (ajaxSettings.type == "POST"){
                        if (response.error === undefined){
                            if (response.captcha){ // If you are required to fill a captcha before posting
                                //console.log(response);
                            }else{
                                for (var postID in response[threadID].posts){
                                    if(response[threadID].posts[postID].comment.replace(/[\r\n]/g,'') == lastSubmittedContent.replace(/[\r\n]/g,'')){
                                        yourPosts[board][threadID].push(postID);
                                        var newPost = $('#'+postID);
                                        newPost.find('.post_author').after('<span> (You)</span>');
                                        if (settings.UserSettings.filter.value){filter(newPost);} // Apply filter
                                    }
                                }
                                crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
                                crosslinkTracker[board] = true;
                                localStorage.crosslinkTracker = JSON.stringify(crosslinkTracker);
                                saveYourPosts();

                                labelNewPosts(Object.keys(response[threadID].posts), false);
                            }
                        }else{
                            if (settings.UserSettings.notifications.value){
                                notifyMe("An error occurred whilst posting", "http://i.imgur.com/HTcKk4Y.png", response.error, false);
                            }
                        }
                    }else{
                        if (response.error !== undefined){
                            //console.log(response.error);
                        }else{
                            if (response[threadID] !== undefined){
                                for (var postID in response[threadID].posts){
                                    if (settings.UserSettings.filter.value){filter($('#'+postID));} // Apply filter
                                }
                                labelNewPosts(Object.keys(response[threadID].posts), false);
                            }else{
                                //console.log("Not in a thread");
                            }
                        }
                    }
                }
            });
        }
    }
    var staticPosts = $('article.post');
    var onlyOP = $('article.thread:not(.backlink_container)');
    var staticPostsAndOP = staticPosts.add(onlyOP); // Save querying the staticPosts twice by extending the first query with the OP
    if (settings.UserSettings.headerBar.value){headerBar();} // Customise headerbar behaviour
    mascot(parseMascotImageValue()); // Insert mascot
    if (settings.UserSettings.adjustReplybox.value){adjustReplybox();} // Adjust reply box
    if (settings.UserSettings.inlineImages.value){ // Inline images
        $('.toggle-expansion').remove(); // Remove the native inline expansion button
        if (localStorage.expandpref === "yes"){localStorage.expandpref = "no";} // Disable native inline image expansion (might require a reload after to work?)
        if (threadID !== "statistics"){ // Stop this interfering with the images it displays
            var designateOPimages = /(search|quests)/.test(threadID);
            $('#main img').each(function(i, image){
                var $image = $(image);
                $image.addClass('smallImage');
                if (designateOPimages){
                    if ($image.attr('width') >= 249 || $image.attr('height') >= 249){ // Assuming OP images are 250px limited across all archives might be false
                        $image.addClass('thread_image');
                    }
                }
            });
        }
        if (settings.UserSettings.inlineImages.suboptions.delayedLoad.value){
            delayedLoad(staticPostsAndOP);
        }else{
            inlineImages(staticPostsAndOP);
        }
    }
    if (settings.UserSettings.removeJfont.value){$('.shift-jis').removeClass('shift-jis');} // Remove japanese font formatting
    if (settings.UserSettings.inlineReplies.value){ // Inline replies
        staticPostsAndOP.each(function(i, post){
            $(post).addClass("base");
        });
    }
    if (settings.UserSettings.labelYourPosts.value){ // Label your posts
        if (/(search|board|quest|gallery)/.test(threadID)){
            if (board === "_"){ // Handle finding the board per post for all-board searches
                $('article.post').each(function(i,post){
                    var postBoard = $(post).find('.post_show_board').html().replace(/\//g,'');
                    if (yourPostsLookup[postBoard] !== undefined){
                        if (yourPostsLookup[postBoard][post.id]){
                            $(post).find('.post_author').after('<span> (You)</span>');
                        }
                    }
                });
            }else{ // Handle the lack of threadID for board indexes and single-board searches
                if (yourPostsLookup[board] !== undefined){
                    $('article.post, article.thread').each(function(i,post){
                        if (yourPostsLookup[board][post.id]){
                            $(post).find('.post_author').after('<span> (You)</span>');
                        }
                    });
                }
            }
        }else{ // Handle regular threads by iterating over the yourPosts values for that specific thread (better performance than per each post parsing)
            $.each(yourPosts[board][threadID], function(i,v){ // Parse all backlinks present on pageload
                $('#'+v+' .post_author').after('<span> (You)</span>');
            });
        }
        $('.backlink').each(function(i,backlink){
            if (yourPostsLookup[backlink.dataset.board] !== undefined && yourPostsLookup[backlink.dataset.board][backlink.dataset.post.replace(',','_')]){
                backlink.textContent += ' (You)';
            }
        });
    }
    if (settings.UserSettings.embedImages.value){embedImages(staticPosts);} // Embed images
    if (settings.UserSettings.inlineImages.value && !settings.UserSettings.inlineImages.suboptions.autoplayGifs.value){pauseGifs($('img'));} // Stop gifs autoplaying
    if (threadID !== "other" && settings.UserSettings.relativeTimestamps.value){relativeTimestamps(staticPostsAndOP);linkHoverEvent();} // Initiate relative timestamps
    if (/[0-9]+/.test(threadID) && settings.UserSettings.postQuote.value){
        $('.post_data > [data-function=quote]').each(function(){
            $(this).removeAttr('data-function'); // Disable native quote function
            $(this).addClass('postQuote'); // Make it findable so that inline posts will be handled
        });
    }
    if (settings.UserSettings.hidePosts.value){
        $('.pull-left.stub').removeClass('stub'); // Show hide post buttons
        if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value){
            $('article.post').each(function(i, val){
                $(val).find('.post_backlink').attr('id','p_b'+val.id);
            });
            $('article.post:hidden').each(function(i, post){ // Recursively hide pre-hidden posts
                recursiveToggle(post.id, "hide");
            });
        }
    }
    if (settings.UserSettings.adjustReplybox.suboptions.hideQROptions.value){
        $('#reply').toggleClass("showQROptions"); // Make options hidden in QR by default
    }
    if (settings.UserSettings.postCounter.value){postCounter();} // Update post counter
    if (settings.UserSettings.filter.value){filter(staticPostsAndOP);}
    if (threadID !== "statistics"){
        imageHover();
        canvasHover();
        videoHover();
    }

    if (!(/(search|other|statistics)/).test(threadID)){
        $(document).ajaxComplete(function(event, request, ajaxSettings){ // Parse all GET and POST delivered posts and apply SpookyX features to them
            if (!(/inThread=true/).test(ajaxSettings.url)){
                if (request.responseText !== ""){
                    response = JSON.parse(request.responseText);
                }else{
                    response = {"error":"No responseText"};
                }
                if (response.error !== undefined){
                    //console.log(response.error);
                }else{
                    for (var key in response){
                        if (response[key] !== null && response[key].posts !== undefined){
                            var isBoard = threadID === "board";
                            if (isBoard && settings.UserSettings.labelYourPosts.value){ // Handle (You) deignation for expanding threads on board view
                                labelNewPosts(Object.keys(response[key].posts), true);
                            }
                            for (var postID in response[key].posts){
                                if (document.getElementById(postID) !== null){ // Don't process post if filter has purged it
                                    var newPost = $('#'+postID);
                                    if (settings.UserSettings.inlineImages.value){inlineImages(newPost);} // Inline images
                                    if (isBoard && settings.UserSettings.labelYourPosts.value){ // Handle (You) designation for expanding threads on board view
                                        if (yourPostsLookup[board][postID]){
                                            newPost.find('.post_author').after('<span> (You)</span>');
                                        }
                                    }
                                    if (settings.UserSettings.inlineReplies.value){
                                        newPost.addClass("base");
                                    }
                                    if (settings.UserSettings.embedImages.value){embedImages(newPost);} // Embed images
                                    if (settings.UserSettings.inlineImages.value && !settings.UserSettings.inlineImages.suboptions.autoplayGifs.value){pauseGifs(newPost.find('img'));} // Stop gifs autoplaying
                                    if (settings.UserSettings.relativeTimestamps.value){relativeTimestamps(newPost);} // Add relative timestamps
                                    if (isBoard && settings.UserSettings.filter.value){filter(newPost);} // Apply filter
                                    if (settings.UserSettings.postQuote.value){
                                        newPost.find('.post_data > [data-function=quote]').removeAttr('data-function').addClass('postQuote'); // Change the quote function
                                    }
                                    if (settings.UserSettings.hidePosts.value){
                                        newPost.children('.pull-left').removeClass('stub'); // Show hide post buttons
                                        if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value){
                                            newPost.find('.post_backlink').attr('id','p_b'+newPost[0].id);
                                        }
                                    }
                                    if (settings.UserSettings.postCounter.value){postCounter();} // Update post counter
                                    if (settings.UserSettings.removeJfont.value){newPost.find('.text').removeClass('shift-jis');} // Remove japanese font formatting
                                }
                            }
                            imageHover();
                            canvasHover();
                            videoHover();
                        }
                    }
                }
            }
        });
    }

    $('#main').on('click', function(e){ // Detect clicks on page content
        if (settings.UserSettings.inlineReplies.value && $(e.target).hasClass("backlink")){ // Inline replies
            if (!e.originalEvent.ctrlKey && e.which == 1){
                e.preventDefault();
                var postID = e.target.dataset.post.replace(',','_'); // Replace to deal with crossboard links
                var rootPostID = e.target.closest('article.base').id;
                if (e.target.parentNode.className == "post_backlink"){
                    if ($(e.target).hasClass("inlined")){
                        $(e.target).removeClass("inlined");
                        $('.sub'+rootPostID).each(function(index,currentPost){
                            $("#"+currentPost.id.substr(1)+".forwarded").removeClass("forwarded");
                        });
                        $('#i'+postID+'.sub'+rootPostID).remove();
                    }else{
                        $(e.target).addClass("inlined");
                        $(e.target.parentNode.parentNode).after('<div class="inline sub'+rootPostID+'" id="i'+postID+'"></div>');
                        $("#"+postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id","r"+postID).show().appendTo($("#i"+postID+'.sub'+rootPostID));
                        $("#"+rootPostID+'.base .inline').each(function(index,currentPost){
                            if (!$(currentPost).hasClass('sub'+rootPostID)){
                                $(currentPost).attr("class","inline sub"+rootPostID);
                            }
                        });
                        $("#i"+postID+" .post_wrapper").addClass("post_wrapperInline");
                        if (settings.UserSettings.inlineImages.value){inlineImages($('#r'+postID));} // Inline images
                        imageHover();
                        canvasHover();
                        videoHover();
                    }
                }else{
                    if ($(e.target).hasClass("inlined")){
                        $(e.target).removeClass("inlined");
                        $('.sub'+rootPostID).each(function(index,currentPost){
                            $("#"+currentPost.id.substr(1)+".forwarded").removeClass("forwarded");
                        });
                        $('#i'+postID+'.sub'+rootPostID).remove();
                    }else{
                        $(e.target).addClass("inlined");
                        $(e.target.parentNode).after('<div class="inline sub'+rootPostID+'" id="i'+postID+'"></div>');
                        $("#"+postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id","r"+postID).show().appendTo($("#i"+postID+'.sub'+rootPostID));
                        $("#"+rootPostID+'.base .inline').each(function(index,currentPost){
                            if (!$(currentPost).hasClass('sub'+rootPostID)){
                                $(currentPost).attr("class","inline sub"+rootPostID);
                            }
                        });
                        $("#i"+postID+" .post_wrapper").addClass("post_wrapperInline");
                        if (settings.UserSettings.inlineImages.value){inlineImages($('#r'+postID));} // Inline images
                        imageHover();
                        canvasHover();
                        videoHover();
                    }
                }
            }
        }else if (settings.UserSettings.postQuote.value && e.target.className == "postQuote"){ // Better post quoting
            if (!e.originalEvent.ctrlKey && e.which == 1){
                e.preventDefault();
                var postnum = e.target.innerHTML;
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
        }else if (settings.UserSettings.inlineImages.value && e.target.nodeName == "IMG"){ // Expand images
            if (!e.originalEvent.ctrlKey && e.which == 1){
                e.preventDefault();
                var image = $(e.target);
                image.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
                if (image.attr('gif')){
                    var canvas = image.next('canvas');
                    canvas.toggle();
                    image.toggle();
                }else{
                    image.toggleClass("smallImage bigImage");
                    $('#hoverUI').html('');
                    image.trigger("mouseenter");
                }
            }
        }else if (settings.UserSettings.inlineImages.value && e.target.nodeName == "CANVAS"){ // Expand images
            if (!e.originalEvent.ctrlKey && e.which == 1){
                e.preventDefault();
                var canvas = $(e.target);
                var image = canvas.prev('img');
                canvas.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
                canvas.toggle();
                image.toggle();
                $('#hoverUI').html('');
                image.trigger("mouseenter");
            }
        }else if (settings.UserSettings.inlineImages.value && e.target.nodeName == "VIDEO"){ // Expand videos
            var video = $(e.target);
            video.toggleClass("bigImage"); // Make it full opacity to override spoilering
            video.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
            if (video.hasClass("fullVideo")){
                video[0].pause();
                video[0].muted=true;
                video.attr('width',(video.closest('article').hasClass('thread') ? imageWidthOP : imageWidth));
                video.removeAttr('controls');
                video.removeClass("fullVideo");
            }else{
                video.removeAttr('width');
                video.attr('controls',"");
                video.addClass("fullVideo");
                video[0].muted=false;
                video[0].play();
            }
            $('#hoverUI').html('');
            video.trigger("mouseenter");
        }else if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value && e.target.className === "btn-toggle-post"){ // Recursive hiding
            var button = e.target;
            if(button.attributes["data-function"].value === "showPost"){
                recursiveToggle($('article.doc_id_'+button.attributes["data-doc-id"].value).attr('id'), "show");
            }else if(button.attributes["data-function"].value === "hidePost"){
                recursiveToggle($('article.doc_id_'+button.attributes["data-doc-id"].value).attr('id'), "hide");
            }
        }else if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value && e.target.parentNode.className === "btn-toggle-post"){ // Recursive hiding
            var button = e.target.parentNode;
            if(button.attributes["data-function"].value === "showPost"){
                recursiveToggle($('article.doc_id_'+button.attributes["data-doc-id"].value).attr('id'), "show");
            }else if(button.attributes["data-function"].value === "hidePost"){
                recursiveToggle($('article.doc_id_'+button.attributes["data-doc-id"].value).attr('id'), "hide");
            }
        }
    });
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
        $('#reply .pull-left:not(.input-append)').toggle();
    }
}

function quickReplyOptions(){
    $('#reply').toggleClass("showQROptions");
    $('#reply.quickReply .pull-left:not(.input-append)').toggle();
}

var favican = document.createElement("IMG");
favican.src = settings.UserSettings.favicon.suboptions.lit.value;
var exclam = document.createElement("IMG");
exclam.src = settings.UserSettings.favicon.suboptions.alertOverlay.value;

function canfav(){
    $('#myCanvas').toggle();
    $('#myCanvas')[0].getContext("2d").drawImage(favican, 0, 0);
    $('#myCanvas')[0].getContext("2d").drawImage(exclam, 0, 0);
}
var imgIndex;
function galleryToggle(){
    console.time('gal');
    if ($('#gallery:visible').length){
        $('#gallery').hide();
    }else{
        $('#gallery').show();
        var viewportTop = window.scrollY;
        var viewportBottom = viewportTop + window.innerHeight;
        $('.thread_image_box').each(function(i,imageBox){
            imgIndex = i;
            if (imageBox.offsetTop + imageBox.offsetHeight > viewportTop){
                if (imageBox.offsetTop >= viewportBottom){
                    imgIndex = i - 1;
                }
                return false; // break loop
            }
        });
        if (imgIndex == -1){imgIndex = 0;}
        if (!$('#gallery').length){
            $('body').append('<div id="gallery"></div>');
        }
        galleryUpdate();
    }
    console.timeEnd('gal');
}

function galleryChange(direction){
    if ($('#gallery:visible').length){
        if (direction == "left"){
            if (imgIndex === 0 ){
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
}

function galleryUpdate(){
    if ($('#gallery').length){    
        var imgList = $('.thread_image_box');        
        if ($(imgList[imgIndex]).find('img').length){
            $('#gallery').html('<img style="max-width:90%; max-height:90%;" src="'+$(imgList[imgIndex]).find('img')[0].src+'">');
        }else if ($(imgList[imgIndex]).find('video').length){
            $('#gallery').html('<video style="float:left; max-width:90%; max-height:90%;" name="media" loop muted controls '+autoplayVid+'><source src="'+$(imgList[imgIndex]).find('video')[0].currentSrc+'" type="video/webm"></video>');
        }else{
            console.log("Oh boy something gone wrong again!");
            console.log($(imgList[imgIndex]));
        }
        $(document).scrollTop($(imgList[imgIndex]).find('img, video').offset().top-26);
    }
}

function populateSettingsMenu(){
    if ($('#settingsMenu').is(":visible")){
        $('#settingsMenu').hide();
    }else{
        if (localStorage.SpookyXsettings !== undefined){
            $.extend(true, settings, JSON.parse(localStorage.SpookyXsettings));
        }
        presetFavicons();
        var settingsHTML = '<div id="Main">'+generateSubOptionHTML(settings.UserSettings, '')+'</div>';
        settingsHTML += '<div id="Filter">'+generateFilterHTML()+'</div>';
        $('#settingsContent').html(settingsHTML);
        if (!settings.UserSettings.filter.value){
            $('#filterDisabledMessage').show(); // Show filter disabled message if the filter is disabled
        }
        $('#settingsContent > div').hide(); //  Hide all tabs
        $('#settingsContent #'+$('.sections-list .active').html()).show(); // Show active tab
        $('#settingsMenu').show(); // Show the menu
        $('#settingsContent select, #settingsContent input').each(function(i,el){
            if (el.type !== "checkbox"){ // Add the top margins for non-checkboxes to align description with name
                $(el).parent().next().addClass('selectDescription');
            }
            if (el.nodeName === "SELECT"){ // Hide the settings join line for select options that start with one or less visible suboptions
                if ($(el).closest('div:not(.settingFlexContainer)').children('.suboption-list').children(':visible').length <= 1){
                    $(el).closest('.settingFlexContainer').children('.settingsJoinLine').hide();
                }                
            }
        });
        $('#settingsContent .suboption-list > :visible:last').addClass('last');
    }
}

function generateFilterHTML(){
    var settingsHTML = '';
    settingsHTML += '<div class="filters-list"><a href="javascript:;" class="active" name="guide">Guide</a>';
    for (var type in settings.FilterSettings){
        settingsHTML += ' | <a href="javascript:;" name="'+type+'">'+settings.FilterSettings[type].name+'</a>';
    }
    settingsHTML += '</div>';
    settingsHTML += '<div id="filter_guide" style="padding:4px;"><div id="filterDisabledMessage" style="color: #d14; background-color: #f7f7f9; text-align: center; font-size: 15px; display:none;">The Filter is currently disabled. Turn it on via the setting in the Main tab</div><p>Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions" style="text-decoration: underline;">regular expressions</a>, one per line. <br>Lines starting with a <code>#</code> will be ignored. <br>For example, <code>/weeaboo/i</code> will filter posts containing the string <code>weeaboo</code>, case-insensitive. <br><br>You can use these settings with each regular expression, separate them with semicolons: </p><ul> <li>Per boards, separate them with commas. It is global if not specified. <br>For example: <code>boards:a,tg;</code></li><li> Set the way the filter will handle the post with <code>mode</code><br>For example: <code>mode:hide;</code><br>Valid options are: <ul> <li><code>purge</code>: Remove the post from the page entirely, the site will need to reload the post for hoverlinks and such to work.</li><li><code>remove</code>: Remove the post from view but leave it in the page.</li><li><code>hide</code>: Collapse the post, leave a button to restore it.</li><li><code>fade</code>: Simply halve the opacity of the post. This is the default if the mode isn\'t specified.</li></ul> </li></ul></div>';
    for (var type in settings.FilterSettings){
        settingsHTML += '<div id="filter_'+type+'" style="display: none;"><textarea name="'+type+'" spellcheck="false" class="filterTextarea">';
        $.each(settings.FilterSettings[type].value, function(i,line){
            if (i){
                settingsHTML += '\n';
            }
            if(!line.comment){
                if (line.regex !== undefined && line.regex.pattern !== undefined){
                    settingsHTML += "/" + line.regex.pattern + "/" + line.regex.flag + ';';
                    for (var prop in line){
                        if (prop !== "comment" && prop !=="regex"){
                            settingsHTML += prop + ':' + line[prop] + ';';
                        }
                    }
                }
            }else{
                settingsHTML += line.comment;
            }
        });
        settingsHTML += '</textarea></div>';
    }
    return settingsHTML;
}

function generateSubOptionHTML(input, path){
    var settingsHTML = '';
    $.each(input, function(key, value){
        if (value.name !== undefined){
            var checked = '';
            var subOpsHidden = '';
            if (value.value){
                checked = ' checked';
            }else{
                subOpsHidden = ' style="display: none;"';
            }
            if (value.if !== undefined){
                var parentPath = objpath(settings.UserSettings, path.substring(0, path.length-'.suboptions.'.length));
                var pattTest = new RegExp(parentPath.value.value);
                var ifMet = false;
                $.each(value.if, function(i,v){
                    if (pattTest.test(v)){
                        ifMet = true;
                        return false;
                    }
                });
                if (ifMet){
                    settingsHTML += '<div>';
                }else{
                    settingsHTML += '<div style="display:none;">';
                }
            }else{
                settingsHTML += '<div>';
            }
            settingsHTML += '<div class="settingFlexContainer">';
            if (value.suboptions !== undefined && Object.keys(value.suboptions).length > 1){
                settingsHTML += '<div class="settingsJoinLine';
                if (value.type === "checkbox"){
                    settingsHTML += ' settingsJoinLineCheckbox';
                }
                settingsHTML += '"'+subOpsHidden+'></div>';
            }
            settingsHTML += '<label>';
            switch(value.type){
                case "checkbox": settingsHTML += '<input type="checkbox" name="'+value.name+'" key="'+key+'"'+checked+' path="'+path+key+'">'; break;
                case "text": settingsHTML += '<input type="text" name="'+value.name+'" key="'+key+'" value="'+value.value+'" path="'+path+key+'">'; break;
                case "number": settingsHTML += '<input type="number" name="'+value.name+'" key="'+key+'" value="'+value.value+'" path="'+path+key+'">'; break;
                case "select": settingsHTML += '<select name="'+value.name+'" key="'+key+'" path="'+path+key+'">'; $.each(value.value.options, function(i,v){settingsHTML += '<option'; if(v == value.value.value){settingsHTML += ' selected';} settingsHTML += '>'+v+'</option>';}); settingsHTML +='</select>'; break;
            }
            settingsHTML += value.name+': </label><span class="description">'+value.description+'</span></div>';
            if (value.suboptions !== undefined){
                settingsHTML += '<div class="suboption-list"'+subOpsHidden+'>' + generateSubOptionHTML(value.suboptions,path+key+'.suboptions.') + '</div>';
            }
            settingsHTML += '</div>';
        }
    });
    return settingsHTML;
}

function settingsStrip(input){
    var obj = {};
    $.each(input, function(key, value){
        obj[key] = {};
        obj[key].value = value.value;
        if (value.suboptions !== undefined){
            obj[key].suboptions = settingsStrip(value.suboptions);
        }
    });
    return obj;
}

$(function(){
    shortcut.add("ctrl+s", function(){ executeShortcut("spoiler");});
    shortcut.add("ctrl+i", function(){ executeShortcut("i");});
    shortcut.add("ctrl+b", function(){ executeShortcut("b");});
    shortcut.add("ctrl+u", function(){ executeShortcut("u");});
    shortcut.add("q", function(){quickReply();}, {"disable_in_input":true});
    shortcut.add("ctrl+q", function(){quickReplyOptions();}, {"disable_in_input":false});
    shortcut.add("f", function(){if (settings.UserSettings.favicon.value){canfav();}}, {"disable_in_input":true});
    shortcut.add("g", function(){if (settings.UserSettings.gallery.value){galleryToggle();}}, {"disable_in_input":true});
    shortcut.add("left", function(){if (settings.UserSettings.gallery.value){galleryChange("left");}}, {"disable_in_input":true});
    shortcut.add("right", function(){if (settings.UserSettings.gallery.value){galleryChange("right");}}, {"disable_in_input":true});
    shortcut.add("o", function(){populateSettingsMenu();}, {"disable_in_input":true});
    if (/[0-9]+/.test(threadID)){
        seenPosts();
        ThreadUpdate();
        window.setInterval(function(){ThreadUpdate();},250);
    }
});
