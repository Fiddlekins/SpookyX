// ==UserScript==
// @name          SpookyX
// @description   Enhances functionality of FoolFuuka boards. Developed further for more comfortable ghost-posting on the moe archives.
// @author        Fiddlekins
// @version       32.50
// @namespace     https://github.com/Fiddlekins/SpookyX
// @include       http://archive.4plebs.org/*
// @include       https://archive.4plebs.org/*
// @include       http://archive.loveisover.me/*
// @include       https://archive.loveisover.me/*
// @include       http://archive.nyafuu.org/*
// @include       https://archive.nyafuu.org/*
// @include       http://desuarchive.org/*
// @include       https://desuarchive.org/*
// @include       http://cuckchan.org/*
// @include       https://cuckchan.org/*
// @include       http://4ch.be/*
// @include       https://4ch.be/*
// @include       http://arch.b4k.co/*
// @include       https://arch.b4k.co/*
// @include       http://*ch.archive.horse*
// @include       https://*ch.archive.horse*
// @include       http://boards.fireden.net/*
// @include       https://boards.fireden.net/*
// @include       http://archived.moe/*
// @include       https://archived.moe/*
// @include       http://archiveofsins.com/*
// @include       https://archiveofsins.com/*
// @include       http://thebarchive.com/*
// @include       https://thebarchive.com/*
// @include       http://archive.whatisthisimnotgoodwithcomputers.com/*
// @include       https://archive.whatisthisimnotgoodwithcomputers.com/*
// @include       http://magyarchan.net/*
// @include       https://magyarchan.net/*
// @include       http://www.tokyochronos.net/*
// @include       https://www.tokyochronos.net/*
// @require       https://cdn.rawgit.com/madapaja/jquery.selection/master/src/jquery.selection.js
// @require       https://raw.githubusercontent.com/jquery/jquery-mousewheel/master/jquery.mousewheel.min.js
// @require       https://raw.githubusercontent.com/carloscabo/colz/master/public/js/colz.class.min.js
// @grant         none
// @icon          https://i.imgur.com/LaYyYRl.png
// ==/UserScript==

if (GM_info === undefined) {
	var GM_info = {script: {version: '32.50'}};
}

var settings = {
	"UserSettings": {
		"inlineImages": {
			"name": "Inline Images",
			"description": "Load full-size images in the thread, enable click to expand",
			"type": "checkbox",
			"value": true,
			"suboptions": {
				"inlineVideos": {
					"name": "Inline Videos",
					"description": "Replace thumbnails of natively posted videos with the videos themselves",
					"type": "checkbox",
					"value": true,
					"suboptions": {
						"firefoxCompatibility": {
							"name": "Firefox Compatibility Mode",
							"description": "Turn this on to allow you to use the controls on an expanded video without collapsing it",
							"type": "checkbox",
							"value": false
						}
					}
				},
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
				},
				"processSpoiler": {
					"name": "Process spoilered images",
					"description": "Make native spoilered images inline",
					"type": "checkbox",
					"value": true
				}
			}
		},
		"embedImages": {
			"name": "Embed Media",
			"description": "Embed image (and other media) links in thread",
			"type": "checkbox",
			"value": true,
			"suboptions": {
				"embedVideos": {
					"name": "Embed Videos",
					"description": "Embed video links in thread",
					"type": "checkbox",
					"value": true
				},
				"imgNumMaster": {
					"name": "Embed Count",
					"description": "The maximum number of images (or other media) to embed in each post",
					"type": "number",
					"value": 1
				},
				"titleYoutubeLinks": {
					"name": "Title YouTube links",
					"description": "Fetches the video name and alters the link text accordingly",
					"type": "checkbox",
					"value": true
				}
			}
		},
		"autoHost": {
			"name": "Automatically Host Images",
			"description": "When post is submitted image links will be automatically reuploaded to Imgur in an effort to avoid having dead 4chan image links",
			"type": "select",
			"value": {
				"value": "Reupload 4chan links",
				"options": ["Don't reupload links", "Reupload 4chan links", "Reupload all links"]
			}
		},
		"embedGalleries": {
			"name": "Embed Galleries",
			"description": "Embed Imgur galleries into a single post for ease of image dumps",
			"type": "checkbox",
			"value": true,
			"suboptions": {
				"showDetails": {
					"name": "Show Details",
					"description": "Show the title, image description and view count for embedded Imgur albums",
					"type": "checkbox",
					"value": true
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
					"value": true,
					"suboptions": {
						"hideNewPosts": {
							"name": "Hide New Posts",
							"description": "Also hide replies to hidden posts that are fetched after page load",
							"type": "checkbox",
							"value": true
						}
					}
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
				"customFavicons": {
					"name": "Custom Favicons",
					"description": "If disabled SpookyX will try its hand at automatically generating suitable favicons for the site. Enabling this allows you to manually specify which favicons it should use instead",
					"type": "checkbox",
					"value": false,
					"suboptions": {
						"unlit": {
							"name": "Unlit",
							"description": "Choose which favicon is used normally. Default is \"https://i.imgur.com/xuadeJ2.png\"",
							"type": "text",
							"value": "https://i.imgur.com/xuadeJ2.png"
						},
						"lit": {
							"name": "Lit",
							"description": "Choose which favicon is used to indicate there are unread posts. Preset numbers are 0-4, replace with link to custom image if you desire such as: \"https://i.imgur.com/XGsrewo.png\"",
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
							"description": "The favicon overlay that indicates unread replies. Default is \"https://i.imgur.com/DCXVHHl.png\"",
							"type": "text",
							"value": "https://i.imgur.com/DCXVHHl.png"
						},
						"notification": {
							"name": "Notification image",
							"description": "The image that is displayed in SpookyX generated notifications. 64px square is ideal. Default is \"https://i.imgur.com/HTcKk4Y.png\"",
							"type": "text",
							"value": "https://i.imgur.com/HTcKk4Y.png"
						}
					}
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
		"revealSpoilers": {
			"name": "Reveal Spoilers",
			"description": "Spoilered text will be displayed without needing to hover over it",
			"type": "checkbox",
			"value": false
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
				"width": {
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
					"value": {"value": "Header bar", "options": ["Header bar", "Reply box"]}
				},
				"limits": {
					"name": "Show count limits",
					"description": "Adds count denominators, purely aesthetic",
					"type": "checkbox",
					"value": false,
					"suboptions": {
						"posts": {
							"name": "Posts",
							"description": "Specify the posts counter denominator",
							"type": "number",
							"value": 400
						},
						"images": {
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
				},
				"countHidden": {
					"name": "Count hidden posts",
					"description": "Adds a counter that displays how many posts of the total count are hidden",
					"type": "checkbox",
					"value": true,
					"suboptions": {
						"hideNullHiddenCounter": {
							"name": "Auto-hide null hidden counter",
							"description": "If there are no hidden posts the post counter will not display the hidden counter",
							"type": "checkbox",
							"value": true
						}
					}
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
					"value": {
						"value": "Bottom Right",
						"options": ["Top Right", "Bottom Right", "Bottom Left", "Top Left"]
					}
				},
				"zindex": {
					"name": "Z-index",
					"description": "Determine what page elements the mascot is in front and behind of. Default value is -1",
					"type": "number",
					"value": -1
				},
				"opacity": {
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
					"value": {"value": "Left", "options": ["Left", "Center", "Right"]}
				},
				"wordBreak": {
					"name": "Word-break",
					"description": "Firefox runs into difficulties with breaking really long words, test the options available until you find something that works. On auto this attempts to detect browser and select the most appropriate setting",
					"type": "select",
					"value": {"value": "Auto", "options": ["Auto", "Break-all", "Normal", "Overflow-Wrap"]}
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
					"value": {
						"value": "Collapse to button",
						"options": ["Always show", "Full hide", "Collapse to button"]
					},
					"suboptions": {
						"scroll": {
							"name": "Hide on scroll",
							"description": "Scrolling up will show the headerbar, scrolling down will hide it again",
							"if": ["Full hide", "Collapse to button"],
							"type": "checkbox",
							"value": false
						},
						"defaultHidden": {
							"name": "Default state hidden",
							"description": "Check to make the headerbar hidden or collapsed by default on pageload",
							"if": ["Full hide", "Collapse to button"],
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
								}
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
		},
		"labelDeletions": {
			"name": "Label Deletions",
			"description": "Enabling this will add 'Deleted' to all trashcan icons that designate deleted posts to allow for easier searching",
			"type": "checkbox",
			"value": false
		}
	},
	"FilterSettings": {
		"name": {
			"name": "Name",
			"value": [
				{"comment": "#/久保島のミズゴロウ/;"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.post_author').html();
			},
			"responseObjFunction": function(response){
				return response['name_processed'];
			}
		},
		"tripcode": {
			"name": "Tripcode",
			"value": [
				{"comment": "#/!!/90sanF9F3Z/;"},
				{"comment": "#/!!T2TCnNZDvZu/;"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.post_tripcode').html();
			},
			"responseObjFunction": function(response){
				return response['trip_processed'];
			}
		},
		"uniqueID": {
			"name": "Unique ID",
			"value": [
				{"comment": "# Remember to escape any special characters"},
				{"comment": "# For example these are valid:"},
				{"comment": "#/bUAl\\+t9X/;"},
				{"comment": "#/ID:bUAl\\+t9X/;"},
				{"comment": "# But this fails:"},
				{"comment": "#/bUAl+t9X/; "},
				{"comment": "# It's also worth noting that prefixing it with 'ID:' can cause the filter to fail to accurately detect when using recursive filtering. To assure it works fully stick to just using the hash like 'bUAl+t9X'"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.poster_hash').html();
			},
			"responseObjFunction": function(response){
				return response['poster_hash_processed'];
			}
		},
		"capcode": {
			"name": "Capcode",
			"value": [
				{"comment": "# Set a custom class for mods:"},
				{"comment": "#/Mod$/;highlight:mod;"},
				{"comment": "# Set a custom class for moot:"},
				{"comment": "#/Admin$/;highlight:moot;"},
				{"comment": "# (highlighting isn't implemented yet)"},
				{"comment": "# For recursive filter to always work you will need to add regex lines for M, A & D for Moderators, Admins and Developers respectively"},
				{"comment": "# e.g. /A/; will filter Admins accurately always whilst /Admin/; won't always work for recursively filtered posts"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.post_level').html();
			},
			"responseObjFunction": function(response){
				return response['capcode'];
			}
		},
		"subject": {
			"name": "Subject",
			"value": [
				{"comment": "#/(^|[^A-z])quest([^A-z]|$)/i;boards:tg;"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.post_title').html();
			},
			"responseObjFunction": function(response){
				return response['title_processed'];
			}
		},
		"comment": {
			"name": "Comment",
			"value": [
				{"comment": "#/daki[\\\\S]*/i; boards:tg;"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.text').html();
			},
			"responseObjFunction": function(response){
				return response['comment'];
			}
		},
		"flag": {
			"name": "Flag",
			"value": [
				{"comment": "#Remove kebob"},
				{"comment": "#/turkey/i;mode:remove;"}
			],
			"threadPostFunction": function(currentPost){
				return $(currentPost).find('.flag').attr('title');
			},
			"responseObjFunction": function(response){
				return response['poster_country_name_processed'];
			}
		},
		"filename": {
			"name": "Filename",
			"value": [],
			"threadPostFunction": function(currentPost){
				var combined = '';
				if ($(currentPost).hasClass('thread')) {
					combined = $(currentPost).find('.post_file_filename').html();
				} else {
					$.each($(currentPost).find('.post_file_filename'), function(){
						combined += this.innerHTML;
					});
				}
				return combined;
			},
			"responseObjFunction": function(response){
				if (response['media'] === null || response['media'] === undefined) {
					return '';
				}
				return response['media']['media_filename_processed'];
			}
		},
		"fileurl": {
			"name": "File URL",
			"value": [
				{"comment": "# Filter by site for example:"},
				{"comment": "#/tumblr/;"}
			],
			"threadPostFunction": function(currentPost){
				var combined = '';
				var $currentPost = $(currentPost);
				if ($currentPost.hasClass('thread')) {
					var $currentPostFilename = $currentPost.find('.post_file_filename');
					if ($currentPostFilename.length) {
						combined = $currentPostFilename[0].href;
					}
				} else {
					$.each($currentPost.find('.post_file_filename'), function(){
						combined += this.href;
					});
				}
				return combined;
			},
			"responseObjFunction": function(response){
				if (response['media'] === null || response['media'] === undefined) {
					return '';
				}
				return response['media']['remote_media_link'];
			}
		}
	}
};

var defaultSettings = jQuery.extend(true, {}, settings);

var defaultMascots = [
	"https://i.imgur.com/l2rGSUs.png",
	"https://i.imgur.com/QudFqBK.png",
	"https://i.imgur.com/YtdTqBW.png",
	"https://i.imgur.com/cinWJsP.png",
	"https://i.imgur.com/CrjD09g.png",
	"https://i.imgur.com/r6RuI3Q.png",
	"https://i.imgur.com/U9NQ0aQ.png",
	"https://i.imgur.com/avlBCUC.png",
	"https://i.imgur.com/RSealGL.png",
	"https://i.imgur.com/ZTf8d85.png",
	"https://i.imgur.com/47Nf9WQ.png",
	"https://i.imgur.com/zw1NtJZ.png",
	"https://i.imgur.com/jIx9a5q.png",
	"https://i.imgur.com/IGT97Rg.png",
	"https://i.imgur.com/Q8OSBd4.png",
	"https://i.imgur.com/T5LyxZ3.png",
	"https://i.imgur.com/xdcWW4m.png"
];

if (localStorage.SpookyXsettings !== undefined) {
	$.extend(true, settings, JSON.parse(localStorage.SpookyXsettings));
}

var newPostCount = 0;
var notLoadedPostCount = 0;
var DocumentTitle = document.title;
var rulesBox = $(".rules_box").html();
var autoplayVid = '';
if (settings.UserSettings.inlineImages.suboptions.autoplayVids.value) {
	autoplayVid = 'autoplay';
}

var filetypes = {
	IMAGES: ['jpg', 'jpeg', 'png', 'gif'],
	VIDEOS: ['webm', 'mp4', 'gifv']
};

var pattImageFiletypes = new RegExp('\\.(' + filetypes.IMAGES.join('|') + ')($|(\\?|:)[\\S]+$)', 'i');
var pattVideoFiletypes = new RegExp('\\.(' + filetypes.VIDEOS.join('|') + ')($|(\\?|:)[\\S]+$)', 'i');
var pattYoutubeLink = new RegExp('(youtube\\.com|youtu\\.be)', 'i');
var pattImgGal = new RegExp('http[s]?://imgur.com/[^\"]*');

var splitURL = (document.URL).toLowerCase().split("/");
var board = splitURL[3];
var threadID = splitURL[4];
if (threadID === "thread") {
	threadID = splitURL[5];
} else if (threadID === "last") {
	threadID = splitURL[6];
} else if (threadID !== "search" && threadID !== "reports") {
	if (board === "_" || threadID === "page" || threadID === "ghost" || threadID === "" || threadID === undefined) {
		if (board !== "" && board !== undefined && board !== "_") {
			threadID = "board";
		} else {
			threadID = "other";
		}
	}
}
var boardPatt = new RegExp("(^|,)\\s*" + board + "\\s*(,|$)");

var Page = {
	is: function(type){
		if (Page.cache[type] !== undefined) {
			return Page.cache[type];
		} else {
			if (Page.hasOwnProperty(type)) {
				Page.cache[type] = Page[type]();
				return Page.cache[type];
			}
			var typeArray = type.split(',');
			for (var i = 0; i < typeArray.length; i++) {
				if (Page.is(typeArray[i])) {
					Page.cache[type] = true;
					return true;
				}
			}
			Page.cache[type] = false;
			return false;
		}
	},
	cache: {},
	'thread': function(){
		return /[0-9]+/.test(threadID);
	},
	'board': function(){
		return /board/.test(threadID);
	},
	'gallery': function(){
		return /gallery/.test(threadID);
	},
	'other': function(){
		return /other/.test(threadID);
	},
	'quests': function(){
		return /quests/.test(threadID);
	},
	'search': function(){
		return /search/.test(threadID);
	},
	'statistics': function(){
		return /statistics/.test(threadID);
	}
};

//console.log(splitURL);
//console.log("Board:" + board);
//console.log("ThreadID:" + threadID);


// As taken from http://stackoverflow.com/questions/15761939/firing-css-hover-using-jquery
function allowMockHover(){

	// iterate over all styleSheets
	for (var i = 0, l = document.styleSheets.length; i < l; i++) {
		var s = document.styleSheets[i];
		if (s.cssRules == null) continue;

		// iterate over all rules in styleSheet
		for (var x = 0, rl = s.cssRules.length; x < rl; x++) {
			var r = s.cssRules[x];
			if (r.selectorText && r.selectorText.indexOf(':hover') >= 0) {
				fixRule(r);
			}
		}
	}

}

function fixRule(rule){

	// if the current rule has several selectors, treat them separately:
	var parts = rule.selectorText.split(',');
	for (var i = 0, l = parts.length; i < l; i++) {
		if (parts[i].indexOf(':hover') >= 0) {
			// update selector to be same + selector with class
			parts[i] = [parts[i], parts[i].replace(/:hover/gi, '.mock-hover')].join(',');
		}
	}

	// update rule
	rule.selectorText = parts.join(',');
}


var imageWidthOP = 250;
var imageHeightOP = 250;
var imageWidth = 125;
var imageHeight = 125;
if (settings.UserSettings.inlineImages.suboptions.customSize.value) {
	imageWidthOP = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.widthOP.value;
	imageHeightOP = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.heightOP.value;
	imageWidth = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.width.value;
	imageHeight = settings.UserSettings.inlineImages.suboptions.customSize.suboptions.height.value;
}

var yourPostsLookup = {};
if (Page.is('board,thread')) {
	var crosslinkTracker = {};
	if (localStorage.crosslinkTracker !== undefined) {
		crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
	}
	if (crosslinkTracker[board] === undefined) {
		crosslinkTracker[board] = {};
	}
	crosslinkTracker[board][threadID] = {};
	localStorage.crosslinkTracker = JSON.stringify(crosslinkTracker);
}

var faviconUnlit;
var faviconLit;
var faviconAlert;
var faviconNotification;
var faviconState = "unlit";

function generateFavicons(){ // Generate dynamic favicons
	if (settings.UserSettings.favicon.suboptions.customFavicons.value) {
		switch (settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value) {
			case "0":
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value = "https://i.imgur.com/7iTgtjy.png";
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value = "https://i.imgur.com/QrkQSo0.png";
				break;
			case "1":
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value = "https://i.imgur.com/AWVjxfw.png";
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value = "https://i.imgur.com/KXIPcD9.png";
				break;
			case "2":
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value = "https://i.imgur.com/S7uBSPZ.png";
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value = "https://i.imgur.com/7IxJvBN.png";
				break;
			case "3":
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value = "https://i.imgur.com/Rt8dEaq.png";
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value = "https://i.imgur.com/tvJjpqF.png";
				break;
			case "4":
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value = "https://i.imgur.com/3bRaVUl.png";
				settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value = "https://i.imgur.com/5Bv27Co.png";
				break;
			default:
				break;
		}
		faviconUnlit = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.unlit.value; // Store unlit favicon
		faviconLit = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value; // Store lit favicon
		faviconAlert = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alert.value; // Store alert favicon
		faviconNotification = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.notification.value; // Store notification favicon
		setFavicon();
	} else {
		var faviconCanvas = document.createElement('canvas');
		var nativeFavicon = $('<img src="/favicon.ico">');
		var overlayFavicon = $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAJZJREFUeNrs2zEOgCAQBEDO+P8vr7XGSEODN1tTkMkdQYRKMjrnGM0DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoEvO3SZcVZ8/M5OUCgAA4D9rwLPnZ/cZXsaXCgAAAAAAAAAAAAAAAAAAAADun8+7vRdwJqgFACyNM0EtAMA+wD5ACwCwBqgAAAB65gIAAP//AwAu8yh1NlUMJAAAAABJRU5ErkJggg==">');
		var ctx = faviconCanvas.getContext('2d');
		nativeFavicon.on('load', function(e){
			faviconCanvas.height = e.target.naturalHeight;
			faviconCanvas.width = e.target.naturalWidth;
			ctx.drawImage(e.target, 0, 0); // Draw native favicon
			faviconUnlit = faviconCanvas.toDataURL('image/png'); // Store unlit favicon
			var faviconData = ctx.getImageData(0, 0, faviconCanvas.height, faviconCanvas.width);
			var meanColour = [0, 0, 0, 0];
			var scale = Math.floor(64 / faviconCanvas.width);
			var faviconNotificationData = faviconData;
			var i, len;
			if (scale - 1) { // Only upscale if scale is 2 or more
				faviconNotificationData = new ImageData(scale * faviconCanvas.width, scale * faviconCanvas.height);
				for (i = 0; i < scale; i++) {
					for (var j = 0; j < scale; j++) {
						for (var x = 0, width = faviconCanvas.width, widths = width * 4; x < widths; x += 4) {
							for (var y = 0, height = faviconCanvas.height, heights = height * 4; y < heights; y += 4) {
								var start = x + (y * width);
								var end = (((x) * scale) + ((y) * width * scale * scale)) + (4 * i) + (4 * j * height * scale);
								faviconNotificationData.data[end] = faviconData.data[start];
								faviconNotificationData.data[end + 1] = faviconData.data[start + 1];
								faviconNotificationData.data[end + 2] = faviconData.data[start + 2];
								faviconNotificationData.data[end + 3] = faviconData.data[start + 3];
							}
						}
					}
				}
			}
			for (i = 0, len = faviconData.data.length; i < len; i++) {
				meanColour[i % 4] += faviconData.data[i];
			}
			for (i = 0; i < 4; i++) {
				meanColour[i] /= len / 4;
			}
			var colour = new colz.Color(meanColour);
			for (i = 0, len = faviconData.data.length; i < len; i += 4) {
				var col = new colz.Color(faviconData.data[i], faviconData.data[i + 1], faviconData.data[i + 2], faviconData.data[i + 3]);
				col.setLum(col.l + ((100 - col.l) * (100 - col.l)) / (100 * 1.5)); // Raise luminosity
				col.setSat(col.s + (100 - colour.s) * 0.3); // Raise saturation
				col.setHue(180 + colour.h); // Shift hue
				col.setLum(1.8 * (col.l - 128) + 128 + 32); // Raise contrast
				faviconData.data[i] = col.r;
				faviconData.data[i + 1] = col.g;
				faviconData.data[i + 2] = col.b;
				faviconData.data[i + 3] = col.a;
			}
			ctx.putImageData(faviconData, 0, 0); // Draw edited data on canvas
			faviconLit = faviconCanvas.toDataURL('image/png'); // Store lit favicon
			ctx.drawImage(overlayFavicon[0], 0, 0, faviconCanvas.height, faviconCanvas.width); // Draw alert symbol on canvas
			faviconAlert = faviconCanvas.toDataURL('image/png'); // Store alert favicon
			if (scale) {
				faviconCanvas.height *= scale;
				faviconCanvas.width *= scale;
			}
			ctx.putImageData(faviconNotificationData, 0, 0); // Draw faviconNotification on canvas
			faviconNotification = faviconCanvas.toDataURL('image/png'); // Store notification favicon
			setFavicon();
		});
	}
}

function setFavicon(){
	if (faviconState === "unlit") {
		$('#favicon').attr("href", faviconUnlit);
	} else if (faviconState === "lit") {
		$('#favicon').attr("href", faviconLit);
	} else if (faviconState === "alert") {
		$('#favicon').attr("href", faviconAlert);
	}
}

function ThreadUpdate(){
	if (settings.UserSettings.newPosts.value) {
		newPosts();
	}
}

/**
 * Retrieve nested item from object/array
 * @param {Object|Array} obj
 * @param {Array} path dot separated
 * @param {*} def default value ( if result undefined )
 * @returns {*}
 */
function objpath(obj, path, def){
	var i, len;

	for (i = 0, path = path.split('.'), len = path.length; i < len; i++) {
		if (!obj || typeof obj !== 'object') return def;
		obj = obj[path[i]];
	}

	if (obj === undefined) return def;
	return obj;
}

shortcut = {
	'all_shortcuts': {},//All the shortcuts are stored in this array
	'add': function(shortcut_combination, callback, opt){
		//Provide a set of default options
		var default_options = {
			'type': 'keydown',
			'propagate': false,
			'disable_in_input': false,
			'target': document,
			'keycode': false
		};
		if (!opt) opt = default_options;
		else {
			for (var dfo in default_options) {
				if (default_options.hasOwnProperty(dfo) && typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e){
			e = e || window.event;

			if (opt.disable_in_input) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if (e.target) element = e.target;
				else if (e.srcElement) element = e.srcElement;
				if (element.nodeType == 3) element = element.parentNode;

				if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' || $(element).hasClass('post_IP_name')) return;
			}

			//Find Which key is pressed
			var code;
			if (e.keyCode) {
				code = e.keyCode;
			} else if (e.which) {
				code = e.which;
			}
			var character = String.fromCharCode(code).toLowerCase();

			if (code == 188) character = ","; //If the user presses , when the type is onkeydown
			if (code == 190) character = "."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;

			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`": "~",
				"1": "!",
				"2": "@",
				"3": "#",
				"4": "$",
				"5": "%",
				"6": "^",
				"7": "&",
				"8": "*",
				"9": "(",
				"0": ")",
				"-": "_",
				"=": "+",
				";": ":",
				"'": "\"",
				",": "<",
				".": ">",
				"/": "?",
				"\\": "|"
			};
			//Special Keys - and their codes
			var special_keys = {
				'esc': 27,
				'escape': 27,
				'tab': 9,
				'space': 32,
				'return': 13,
				'enter': 13,
				'backspace': 8,

				'scrolllock': 145,
				'scroll_lock': 145,
				'scroll': 145,
				'capslock': 20,
				'caps_lock': 20,
				'caps': 20,
				'numlock': 144,
				'num_lock': 144,
				'num': 144,

				'pause': 19,
				'break': 19,

				'insert': 45,
				'home': 36,
				'delete': 46,
				'end': 35,

				'pageup': 33,
				'page_up': 33,
				'pu': 33,

				'pagedown': 34,
				'page_down': 34,
				'pd': 34,

				'left': 37,
				'up': 38,
				'right': 39,
				'down': 40,

				'f1': 112,
				'f2': 113,
				'f3': 114,
				'f4': 115,
				'f5': 116,
				'f6': 117,
				'f7': 118,
				'f8': 119,
				'f9': 120,
				'f10': 121,
				'f11': 122,
				'f12': 123
			};

			var modifiers = {
				shift: {wanted: false, pressed: false},
				ctrl: {wanted: false, pressed: false},
				alt: {wanted: false, pressed: false},
				meta: {wanted: false, pressed: false} //Meta is Mac specific
			};

			if (e.ctrlKey) modifiers.ctrl.pressed = true;
			if (e.shiftKey)  modifiers.shift.pressed = true;
			if (e.altKey)  modifiers.alt.pressed = true;
			if (e.metaKey)   modifiers.meta.pressed = true;

			for (var i = 0; k = keys[i], i < keys.length; i++) {
				//Modifiers
				if (k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if (k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if (k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if (k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if (k.length > 1) { //If it is a special key
					if (special_keys[k] == code) kp++;

				} else if (opt.keycode) {
					if (opt.keycode == code) kp++;

				} else { //The special keys did not match
					if (character == k) kp++;
					else {
						if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character];
							if (character == k) kp++;
						}
					}
				}
			}

			if (kp == keys.length &&
				modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
				modifiers.shift.pressed == modifiers.shift.wanted &&
				modifiers.alt.pressed == modifiers.alt.wanted &&
				modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);

				if (!opt.propagate) { //Stop the event
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
			'callback': func,
			'target': ele,
			'event': opt.type
		};
		//Attach the function with the event
		if (ele.addEventListener) ele.addEventListener(opt.type, func, false);
		else if (ele.attachEvent) ele.attachEvent('on' + opt.type, func);
		else ele['on' + opt.type] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove': function(shortcut_combination){
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination]);
		if (!binding) return;
		var type = binding.event;
		var ele = binding.target;
		var callback = binding.callback;

		if (ele.detachEvent) ele.detachEvent('on' + type, callback);
		else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on' + type] = false;
	}
};

function delayedLoad(posts){
	posts.each(function(i, post){
		($(post).hasClass('thread') ? $(post).children('.thread_image_box').find('img') : $(post).find('img')).each(function(i, image){
			var $image = $(image);
			$image.data('dontHover', true); // Stop imageHover displaying the thumbnails
			$image.on('click', function(e){ // Stop the OP from returning all the sub images and thus duplicating them
				if (!e.originalEvent.ctrlKey && e.which == 1) {
					e.preventDefault();
					var $target = $(e.target);
					$target.removeData('dontHover');
					$target.off('click'); // Remove event listener now that it's served its purpose
					inlineImages($target.closest('article'));
					if (!settings.UserSettings.inlineImages.suboptions.autoplayGifs.value) {
						pauseGifs($target);
					} // Stop gifs autoplaying
				}
			});
		});
	});
}

function inlineImages(posts){
	posts.each(function(i, post){
		var $post = $(post);
		($post.hasClass('thread') ? $post.children('.thread_image_box') : $post.find('.thread_image_box')).each(function(i, currentImage){
			var $currentImage = $(currentImage);
			$currentImage.find('>a').each(function(j, imgLink){
				var fullImage = imgLink.href;
				if (settings.UserSettings.inlineImages.suboptions.processSpoiler.value && $currentImage.find('.spoiler_box').length) {
					$(imgLink).html('<div class="spoilerText">Spoiler</div><img class="smallImage spoilerImage">');
					var $image = $currentImage.find('img');
					$image.one('load', function(e){
						$currentImage.find(".spoilerText").css({"top": (e.target.height / 2) - 6.5}); // Center spoiler text
					});
				}
				if (/\.webm$/i.test(fullImage)) { // Handle post webms
					if (settings.UserSettings.inlineImages.suboptions.inlineVideos.value) {
						$currentImage.prepend('<video width="' + ($(post).hasClass('thread') ? imageWidthOP : imageWidth) + '" name="media" loop muted ' + autoplayVid + '><source src="' + fullImage + '" type="video/webm"></video>');
						$(imgLink).remove();
						addHover($currentImage);
					}
				} else if (!/\.(pdf|swf)$/i.test(fullImage)) {
					$currentImage.find('img').each(function(k, image){
						var $image = $(image);
						var thumbImage = $(image).attr('src');
						$image.attr('src', fullImage);
						$image.error(function(){ // Handle images that won't load
							if (!$image.data('tried4pleb')) {
								$image.data('tried4pleb', true);
								var imgLink4pleb = fullImage.replace('data.archive.moe/board', 'img.4plebs.org/boards');
								$image.attr('src', imgLink4pleb);
								$image.parent().attr('href', imgLink4pleb); // Change link
							} else if (!$image.data('triedThumb')) {
								$image.data('triedThumb', true);
								if (fullImage !== thumbImage) { // If the image has a thumbnail aka was 4chan native then use that
									$image.attr('src', thumbImage);
									$image.parent().attr('href', fullImage); // Reset link if changed to 4pleb attempt
								}
							}
						});
						addHover($currentImage);
					});
				}
			});
		});
	});
}

function getSelectionText(){
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
}

function togglePost(postID, mode){
	var $postID = $('#' + postID);
	if (mode == "hide") {
		$postID.css({'display': 'none'});
		$postID.prev().css({'display': 'block'});
	} else if (mode == "show") {
		$postID.css({'display': 'block'});
		$postID.prev().css({'display': 'none'});
	} else {
		$postID.toggle();
		$postID.prev().toggle();
	}
	postCounter(); // Update hidden post counter
}

function recursiveToggle(postID, mode){
	var checkedPostCollection = {};
	var postList = [postID];
	for (var i = 0; i < postList.length; i++) {
		checkedPostCollection[postList[i]] = true;
		$('#p_b' + postList[i] + ' > a').each(function(i, backlink){
			var backlinkID = backlink.dataset.post;
			if (!checkedPostCollection[backlinkID]) {
				postList.push(backlinkID);
			}
		});
	}
	for (var j = 0, len = postList.length; j < len; j++) {
		togglePost(postList[j], mode);
	}
}

function filter(posts){
	posts.each(function(index, currentPost){
		var $currentPost = $(currentPost);
		if (!/!!UG0p3gRn3T1/.test($currentPost.find('.post_tripcode').html())) {
			if (settings.UserSettings.filter.suboptions.recursiveFiltering.value && !$currentPost.hasClass('thread')) { // Recursive filter and not OP
				var checkedBacklinks = {};
				$currentPost.find('.text .backlink').each(function(i, backlink){
					if (!checkedBacklinks[backlink.dataset.board + backlink.dataset.post]) { // Prevent reprocessing duplicate links
						checkedBacklinks[backlink.dataset.board + backlink.dataset.post] = true;
						var backlinkPost = $('#' + backlink.dataset.post);
						if (backlink.dataset.board === board && backlinkPost.length) { // If linked post is present in thread
							if (backlinkPost.is(':visible')) { // If linked post is visible
								if (backlinkPost.hasClass('shitpost')) { // If linked post is a shitpost
									$currentPost.addClass('shitpost');
								}
							} else { // Linked post isn't visible
								if (backlinkPost.prev().is(':visible')) { // If the hide post stub is visible (and thus the linked post is hidden)
									togglePost(currentPost.id, "hide");
								} else { // The linked post has been filtered with mode remove
									$currentPost.hide();
								}
							}
						} else { // Linked post isn't present in thread
							$.ajax({
								url: "/_/api/chan/post/",
								data: {"board": backlink.dataset.board, "num": backlink.dataset.post},
								type: "GET"
							}).done(function(response){
								processPosts(checkFilter(response, false), $currentPost, currentPost);
								$currentPost.find('.backlink_list .backlink').each(function(j, replyBacklink){ // Filter replies
									filter($('#' + replyBacklink.dataset.post));
								});
							});
						}
					}
				});
			}
			if ($(currentPost).length) { // If after all that the post hasn't been purged
				processPosts(checkFilter(currentPost, true), $currentPost, currentPost);
			}
		}
	});
}

function processPosts(type, $currentPost, currentPost){
	switch (type) {
		case 1:
			$currentPost.addClass('shitpost');
			break;
		case 2:
			togglePost(currentPost.id, 'hide');
			break;
		case 3:
			$currentPost.hide();
			break;
		case 4:
			$currentPost.prev().remove();
			$currentPost.remove();
	}
}

function checkFilter(input, inThreadPost){
	var output = 0;
	for (var filterType in settings.FilterSettings) {
		if (settings.FilterSettings.hasOwnProperty(filterType)) {
			var testText = inThreadPost ? settings.FilterSettings[filterType].threadPostFunction(input) : settings.FilterSettings[filterType].responseObjFunction(input);
			var shortcut = settings.FilterSettings[filterType].value;
			for (var line in shortcut) {
				if (shortcut.hasOwnProperty(line) && !shortcut[line].comment && shortcut[line].regex !== undefined) {
					if (shortcut[line].boards === undefined || boardPatt.test(shortcut[line].boards)) {
						var regex = new RegExp(shortcut[line].regex.pattern, shortcut[line].regex.flag);
						if (regex.test(testText)) {
							switch (shortcut[line].mode) {
								case "fade":
									if (output < 1) {
										output = 1;
									}
									break;
								case "hide":
									if (output < 2) {
										output = 2;
									}
									break;
								case "remove":
									output = 3;
									break;
								case "purge":
									return 4;
								default:
									if (output < 1) {
										output = 1;
									}
							}
						}
					}
				}
			}
		}
	}
	return output;
}

var embedImages = function(posts){
	posts.each(function(index, currentArticle){
		var $currentArticle = $(currentArticle);
		if (!$currentArticle.data('imgEmbed')) {
			$currentArticle.data('imgEmbed', true);
			var imgNum = settings.UserSettings.embedImages.suboptions.imgNumMaster.value - $currentArticle.find('.thread_image_box').length;
			var isOP = $currentArticle.hasClass('thread');
			(isOP ? $currentArticle.children('.text').find('a') : $currentArticle.find('.text a')).each(function(index, currentLink){
				if (imgNum === 0) {
					return false;
				}
				var mediaType = 'notMedia';
				var mediaLink = currentLink.href;
				if (pattImageFiletypes.test(mediaLink)) {
					mediaType = 'image';
				} else if (pattVideoFiletypes.test(mediaLink)) {
					mediaType = 'video';
				} else if (pattYoutubeLink.test(mediaLink)) {
					mediaType = 'youtube';
				}
				if (mediaType == 'image' || mediaType == 'video') {
					imgNum--;
					var filename = '<div class="post_file embedded_post_file"><a href="' + mediaLink + '" class="post_file_filename" rel="tooltip" title="' + mediaLink + '">' + mediaLink.match(/[^\/]*/g)[mediaLink.match(/[^\/]*/g).length - 2] + '</a></div>';
					var spoiler = '';
					var $elem = $('<div class="thread_image_box">' + filename + '</div>').insertBefore((isOP ? $currentArticle.children('header') : $currentArticle.find('header')));
					if ($(this).parents('.spoiler').length) {
						spoiler = "spoilerImage ";
						$elem.append('<div class="spoilerText">Spoiler</div>');
					}
					if (mediaType === 'image') {
						$elem.append('<a href="' + mediaLink + '" target="_blank" rel="noreferrer" class="thread_image_link"><img src="' + mediaLink + '" class="lazyload post_image ' + spoiler + 'smallImage"></a>');
						removeLink(currentLink);
						var $image = $elem.find('img');
						if (!$image.attr('loadEventSet')) {
							$image.attr('loadEventSet', true);
							$image.on('load', function(e){
								$image.unbind('load');
								$(e.target).closest('.thread_image_box').find(".spoilerText").css({"top": (e.target.height / 2) - 6.5}); // Center spoiler text
								$(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">' + e.target.naturalWidth + 'x' + e.target.naturalHeight + '</span>'); // Add file dimensions
							});
						}
					} else if (mediaType === 'video') {
						if (settings.UserSettings.embedImages.suboptions.embedVideos.value) {
							mediaLink = mediaLink.replace(/\.gifv$/g, ".webm"); // Only tested to work with Imgur
							$elem.append('<video width="' + imageWidth + '" style="float:left" name="media" loop muted ' + autoplayVid + ' class="' + spoiler + '"><source src="' + mediaLink + '" type="video/webm"></video>');
							removeLink(currentLink);
							$elem.find('video')[0].onloadedmetadata = function(e){
								$(e.target).closest('.thread_image_box').find(".spoilerText").css({"top": (e.target.clientHeight / 2) - 6.5}); // Center spoiler text
								$(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">' + e.target.videoWidth + 'x' + e.target.videoHeight + '</span>'); // Add file dimensions
							};
						}
					}
					addHover($elem);
				} else if (mediaType === 'youtube') {
					if (settings.UserSettings.embedImages.suboptions.titleYoutubeLinks.value) {
						var vidID = /[A-z0-9_-]{11}/.exec(mediaLink);
						if (vidID) {
							$.ajax({
								method: 'GET',
								url: 'https://content.googleapis.com/youtube/v3/videos',
								data: {
									'part': 'snippet',
									'id': vidID[0],
									'fields': 'items(id,snippet(title))',
									'key': 'AIzaSyB5_zaen_-46Uhz1xGR-lz1YoUMHqCD6CE'
								}
							}).done(function(response){
								if (response.items.length) {
									currentLink.innerHTML = '<i>(YouTube)</i> - ' + response.items[0].snippet.title;
								}
							});
						}
					}
				} else if (settings.UserSettings.embedGalleries.value && pattImgGal.exec(currentLink.href) !== null) {
					var imgurLinkFragments = currentLink.href.split('\/');
					if (imgurLinkFragments[3] == "") {
						// Do nothing with dodgy link
					} else if (imgurLinkFragments[3] == "r") {
						// TODO: add in an actual way of handling this
					} else if (imgurLinkFragments[3] == "a") {
						imgurLinkFragments[4] = imgurLinkFragments[4].replace(/#[0-9]+/, ''); // Remove the trailing image number
						if (settings.UserSettings.embedGalleries.suboptions.showDetails.value) {
							$currentArticle.find(".post_wrapper").prepend('<blockquote class="imgur-embed-pub" lang="en" data-id="a/' + imgurLinkFragments[4] + '"><a href="//imgur.com/a/' + imgurLinkFragments[4] + '"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
						} else {
							$currentArticle.find(".post_wrapper").prepend('<blockquote class="imgur-embed-pub" lang="en" data-id="a/' + imgurLinkFragments[4] + '" data-context="false"><a href="//imgur.com/a/' + imgurLinkFragments[4] + '"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>');
						}
						removeLink(currentLink);
					} else if (imgurLinkFragments[3] !== "gallery" && !isOP) { // I can't be bothered making this work properly for OPs, so let's just ignore it and pretend it doesn't exist, yes?
						var link = pattImgGal.exec(currentLink.href);
						var individualImages = link[0].match(/[A-z0-9]{7}/g);
						var allDisplayed = true; // Track whether all of the linked images get inserted so that if not the link can be kept
						$.each(individualImages, function(i, imgID){
							if (imgNum) {
								imgNum--;
								var filename = '<div class="post_file embedded_post_file"><a href="https://i.imgur.com/' + imgID + '.jpg" class="post_file_filename" rel="tooltip" title="https://i.imgur.com/' + imgID + '.jpg">' + imgID + '.jpg</a></div>';
								var imgHTML = '<div class="thread_image_box">' + filename + '<a href="https://i.imgur.com/' + imgID + '.jpg" target="_blank" rel="noreferrer" class="thread_image_link"><img src="https://i.imgur.com/' + imgID + '.jpg" class="lazyload post_image smallImage"></a></div>';
								if (i) {
									$($currentArticle.find(".thread_image_box")[i - 1]).after(imgHTML);
								} else {
									$currentArticle.find(".post_wrapper").prepend(imgHTML);
								}
							} else {
								allDisplayed = false;
								return false;
							}
						});
						$currentArticle.find(".post_wrapper").prepend('<style>.thread_image_box{min-height:' + imageHeight + 'px;}.post_wrapper header{min-width:400px;}</style>');
						$currentArticle.find('.thread_image_box img').each(function(i, image){
							var $image = $(image);
							if (!$image.attr('loadEventSet')) {
								$image.attr('loadEventSet', true);
								$image.on("load", function(e){
									$image.unbind('load');
									$(e.target).closest('.thread_image_box').find(".spoilerText").css({"top": (e.target.height / 2) - 6.5}); // Center spoiler text
									$(e.target).closest('.thread_image_box').append('<br><span class="post_file_metadata">' + e.target.naturalWidth + 'x' + e.target.naturalHeight + '</span>'); // Add file dimensions
								});
							}
						});
						if (allDisplayed) {
							removeLink(currentLink);
						}
						addHover($currentArticle);
					}
				} else {
					if (!(/&gt;&gt;/).test(mediaLink)) {
						//console.log(mediaLink);
					}
				}
			});
		}
	});
};

function removeLink(currentLink){
	if ($(currentLink)[0].nextSibling !== null) {
		if ($(currentLink)[0].nextSibling.nodeName == "BR") {
			if ($(currentLink)[0].previousSibling === null || $(currentLink)[0].previousSibling.nodeName !== "#text" || $(currentLink)[0].previousSibling.nodeValue == " ") {
				$(currentLink).next().remove(); // Remove linebreaks
			}
		}
	}
	$(currentLink).remove();
}

function pauseGifs(posts){
	posts.each(function(i, img){
		if ((/\.gif/).test(img.src)) {
			var $img = $(img);
			$img.on('load', function(){
				$img.after('<canvas class="smallImage" width="' + img.naturalWidth + '" height="' + img.naturalHeight + '"></canvas>');
				$img.attr('gif', true).toggle();
				$img.addClass("bigImage").removeClass("smallImage");
				var canvas = $img.next('canvas');
				canvas[0].getContext("2d").drawImage(img, 0, 0);
				addHover($img.parent());
			});
		}
	});
}

function addHover($elements){
	if (settings.UserSettings.inlineImages.value) {
		if (settings.UserSettings.inlineImages.suboptions.imageHover.value) {
			var $image = $elements.find('img');
			var $canvas = $elements.find('canvas');
			if ($image.length) {
				imageHover($image);
			}
			if ($canvas.length) {
				canvasHover($canvas);
			}
		}
		if (settings.UserSettings.inlineImages.suboptions.videoHover.value) {
			var $video = $elements.find('video');
			if ($video.length) {
				videoHover($video);
			}
		}
	}
}

function imageHover($image){
	$image.on('mouseenter', function(e){
		if (e.target.id !== 'mascot' && !$(e.target).hasClass('bigImage') && !$(e.target).data('dontHover')) {
			$(e.target).clone().removeClass('smallImage spoilerImage').addClass('hoverImage').appendTo('#hoverUI');
		}
	});
	$image.on('mousemove mouseenter', function(e){
		var etarget = e.target;
		var $etarget = $(etarget);
		if (!$etarget.hasClass('bigImage') && !$etarget.data('dontHover')) {
			var headerBarHeight = document.getElementById('headerFixed').offsetHeight - 1; // -1 due to slight offscreen to hide border-top
			var headerBarWidth = document.getElementById('headerFixed').offsetWidth - 1; // -1 due to slight offscreen to hide border-right
			var windowWidth = $('body').innerWidth(); // Define internal dimensions
			var windowHeight = window.innerHeight - 21; // -21 so link destination doesn't overlay image
			var visibleHeight = windowHeight - headerBarHeight;
			var visibleWidth = windowWidth - e.clientX - 50;
			var canFitFullHeight = windowHeight * etarget.naturalWidth / etarget.naturalHeight < visibleWidth - headerBarWidth + 1;
			var $hoverUI = $('#hoverUI');
			var $img = $hoverUI.children('img');
			$img.css({
				'max-height': canFitFullHeight ? windowHeight : visibleHeight,
				'max-width': visibleWidth,
				'top': canFitFullHeight ? (windowHeight - $img[0].height) * (e.clientY / windowHeight) : (visibleHeight - $img[0].height) * (e.clientY / visibleHeight) + headerBarHeight,
				'left': e.clientX + 50
			});
		}
	});
	$image.on('mouseout', function(){
		$('#hoverUI').html('');
	});
}

function canvasHover($canvas){
	$canvas.on('mouseenter', function(e){
		if (e.target.id !== 'myCanvas') {
			$(e.target.previousSibling).clone().show().removeClass('spoilerImage').addClass('hoverImage').appendTo('#hoverUI');
		}
	});
	$canvas.on('mousemove mouseenter', function(e){
		var etarget = e.target;
		var $etarget = $(etarget);
		if (!$etarget.hasClass('bigImage') && !$etarget.data('dontHover')) {
			var headerBarHeight = document.getElementById('headerFixed').offsetHeight - 1; // -1 due to slight offscreen to hide border-top
			var headerBarWidth = document.getElementById('headerFixed').offsetWidth - 1; // -1 due to slight offscreen to hide border-right
			var windowWidth = $('body').innerWidth(); // Define internal dimensions
			var windowHeight = window.innerHeight - 21; // -21 so link destination doesn't overlay image
			var visibleHeight = windowHeight - headerBarHeight;
			var visibleWidth = windowWidth - e.clientX - 50;
			var canFitFullHeight = windowHeight * etarget.naturalWidth / etarget.naturalHeight < visibleWidth - headerBarWidth + 1;
			var $hoverUI = $('#hoverUI');
			var $img = $hoverUI.children('img');
			$img.css({
				'max-height': canFitFullHeight ? windowHeight : visibleHeight,
				'max-width': visibleWidth,
				'top': canFitFullHeight ? (windowHeight - $img[0].height) * (e.clientY / windowHeight) : (visibleHeight - $img[0].height) * (e.clientY / visibleHeight) + headerBarHeight,
				'left': e.clientX + 50
			});
		}
	});
	$canvas.on('mouseout', function(){
		$('#hoverUI').html('');
	});
}

function videoHover($video){
	$video.on('mouseenter', function(e){
		if (e.target.id !== 'mascot' && !$(e.target).hasClass('fullVideo')) {
			$(e.target).clone().removeClass('spoilerImage').addClass('fullVideo hoverImage').appendTo('#hoverUI');
			var $hoverUI = $('#hoverUI');
			var $vid = $hoverUI.children('video');
			$vid.removeAttr('width');
			$vid.on('canplaythrough', function(){
				if ($vid.length) { // Check if video still exists. This is to prevent the problem where mousing out too soon still triggers the canplay event
					$vid[0].muted = false;
					$vid[0].play();
					$video.on('mousemove', function(e){
						var headerBarHeight = document.getElementById('headerFixed').offsetHeight - 1; // -1 due to slight offscreen to hide border-top
						var headerBarWidth = document.getElementById('headerFixed').offsetWidth - 1; // -1 due to slight offscreen to hide border-right
						var windowWidth = $('body').innerWidth(); // Define internal dimensions
						var windowHeight = window.innerHeight;
						var visibleHeight = windowHeight - headerBarHeight;
						var visibleWidth = windowWidth - e.clientX - 50;
						var canFitFullHeight = windowHeight * e.target.videoWidth / e.target.videoHeight < visibleWidth - headerBarWidth + 1;
						$vid.css({
							'max-height': canFitFullHeight ? windowHeight : visibleHeight,
							'max-width': visibleWidth,
							'top': canFitFullHeight ? (windowHeight - $vid[0].clientHeight) * (e.clientY / windowHeight) : (visibleHeight - $vid[0].clientHeight) * (e.clientY / visibleHeight) + headerBarHeight,
							'left': e.clientX + 50
						});
					});
				}
			});
		}
	});
	$video.on('mouseout', function(){
		$('#hoverUI').html('');
	});
}

function relativeTimestamps(posts){
	posts.find('time').each(function(index, timeElement){
		if (!$(timeElement).data('relativeTime')) {
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
	return {y: y, d: d, h: h, m: m, s: s};
}

function changeTimestamp(timeElement, postTimestamp){
	var currentTimestamp = Date.now();
	var diffMS = currentTimestamp - postTimestamp;
	if (diffMS < 0) {
		diffMS = 0;
	} // Handle the issue where mismatched local and server time could end up with negative difference
	var diff = convertMS(diffMS);
	var years = diff.y === 1 ? 'year' : 'years';
	var days = diff.d === 1 ? 'day' : 'days';
	var hours = diff.h === 1 ? 'hour' : 'hours';
	var minutes = diff.m === 1 ? 'minute' : 'minutes';
	var seconds = diff.s === 1 ? 'second' : 'seconds';
	if (diff.y) {
		$(timeElement).html(diff.y + ' ' + years + ' and ' + diff.d + ' ' + days + ' ago');
		setTimeout(function(){
			changeTimestamp(timeElement, postTimestamp);
		}, 365.25 * 24 * 60 * 60 * 1000);
	} else if (diff.d) {
		if (diff.d >= 2) {
			$(timeElement).html(diff.d + ' ' + days + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 24 * 60 * 60 * 1000);
		} else {
			$(timeElement).html(diff.d + ' ' + days + ' and ' + diff.h + ' ' + hours + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 60 * 60 * 1000);
		}
	} else if (diff.h) {
		if (diff.h >= 2) {
			$(timeElement).html(diff.h + ' ' + hours + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, (60 - diff.m) * 60 * 1000);
		} else {
			$(timeElement).html(diff.h + ' ' + hours + ' and ' + diff.m + ' ' + minutes + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 10 * 60 * 1000);
		}
	} else if (diff.m) {
		if (diff.m >= 10) {
			$(timeElement).html(diff.m + ' ' + minutes + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 5 * 60 * 1000);
		} else {
			$(timeElement).html(diff.m + ' ' + minutes + ' and ' + diff.s + ' ' + seconds + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 60 * 1000);
		}
	} else {
		if (diff.s >= 20) {
			$(timeElement).html(diff.s + ' ' + seconds + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 20 * 1000);
		} else {
			$(timeElement).html(diff.s + ' ' + seconds + ' ago');
			setTimeout(function(){
				changeTimestamp(timeElement, postTimestamp);
			}, 9 * 1000);
		}
	}
}

var lastSeenPost = threadID;
var unseenPosts = [];
function seenPosts(){
	var $backlinkContainer = $('article.backlink_container');
	$backlinkContainer.attr('id', "0"); // Prevent error when it's undefined
	var parsedLastSeenPost = [parseInt(lastSeenPost.split('_')[0]), parseInt(lastSeenPost.split('_')[1])];
	$('article').each(function(index, currentArticle){ // Add unseen posts to array
		var currentID = [parseInt(currentArticle.id.split('_')[0]), parseInt(currentArticle.id.split('_')[1])];
		if (currentID[0] > parsedLastSeenPost[0]) {
			unseenPosts.push(currentArticle.id);
		} else if (currentID[0] == parsedLastSeenPost[0]) {
			if (isNaN(currentID[1])) {
				// Do nothing
			} else if (isNaN(parsedLastSeenPost[1]) || currentID[1] > parsedLastSeenPost[1]) {
				unseenPosts.push(currentArticle.id);
			} else {
				//console.log(currentID);
			}
		}
	});
	$backlinkContainer.removeAttr('id'); // Remove id again
	$('#' + unseenPosts[0]).addClass("unseenPost");
}

var unseenReplies = [];
function newPosts(){
	if (settings.UserSettings.favicon.value) {
		if (unseenPosts.length) {
			var predictedLastSeenPostIndex = -1;
			if (windowFocus) {
				var viewportBottom = window.scrollY + window.innerHeight;
				var unseenPostOffset = document.getElementById(unseenPosts[0]).offsetTop + document.getElementById(unseenPosts[0]).offsetHeight;
				if (unseenPostOffset < viewportBottom) {
					var meanPostHeight = (document.getElementById(unseenPosts[unseenPosts.length - 1]).offsetTop - document.getElementById(unseenPosts[0]).offsetTop) / unseenPosts.length;
					var testedSeeds = []; // Keep track of which indices have been checked to prevent endless loops
					var lastSeed = 0;
					predictedLastSeenPostIndex = 0;
					var predictedLSP0offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetHeight;
					var predictedLSP1offset;
					if (unseenPosts[predictedLastSeenPostIndex + 1] !== undefined) {
						predictedLSP1offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetHeight;
					}
					while (!(predictedLSP0offset <= viewportBottom && (unseenPosts[predictedLastSeenPostIndex + 1] === undefined || predictedLSP1offset > viewportBottom))) {
						testedSeeds[predictedLastSeenPostIndex] = true;
						predictedLastSeenPostIndex += Math.floor((viewportBottom - document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop) / meanPostHeight);
						if (predictedLastSeenPostIndex >= unseenPosts.length) {
							predictedLastSeenPostIndex = unseenPosts.length - 1; // Keep it from exceeding the array bounds
						} else if (predictedLastSeenPostIndex < 0) {
							predictedLastSeenPostIndex = 0; // Keep it from being negative
						}
						if (testedSeeds[predictedLastSeenPostIndex]) { // Prevent it from getting caught in infinite loops by making sure it never uses the same predictedLSPi twice
							for (lastSeed; lastSeed < unseenPosts.length; lastSeed++) {
								if (!testedSeeds[lastSeed]) {
									predictedLastSeenPostIndex = lastSeed;
									break;
								}
							}
						}
						predictedLSP0offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex]).offsetHeight;
						if (unseenPosts[predictedLastSeenPostIndex + 1] !== undefined) {
							predictedLSP1offset = document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetTop + document.getElementById(unseenPosts[predictedLastSeenPostIndex + 1]).offsetHeight;
						}
					}
				}
			}
			for (var i = predictedLastSeenPostIndex + 1, len = unseenPosts.length; i < len; i++) {
				if (yourPostsLookup[board][unseenPosts[i]]) {
					predictedLastSeenPostIndex = i; // Consider any posts following the last seen post that are yours as seen
				} else {
					break;
				}
			}
			if (predictedLastSeenPostIndex >= 0) {
				lastSeenPost = unseenPosts[predictedLastSeenPostIndex]; // Update last seen post
				saveLastSeenPosts(); // Save new last seen post
				unseenPosts = unseenPosts.slice(predictedLastSeenPostIndex + 1); // Only keep posts after the lastSeenPost

				var parsedLastSeenPost = [parseInt(lastSeenPost.split('_')[0]), parseInt(lastSeenPost.split('_')[1])];
				var unseenRepliesTemp = []; // Avoid trying to remove entries from an array that is being iterated over
				$.each(unseenReplies, function(i, unseenID){ // Work from a copy of the array so that removing elements from it doesn't ruin everything
					var currentID = [parseInt(unseenID.split('_')[0]), parseInt(unseenID.split('_')[1])];
					if (currentID[0] < parsedLastSeenPost[0]) {
						return true;
					} else if (currentID[0] === parsedLastSeenPost[0]) {
						if (isNaN(currentID[1]) || (!isNaN(parsedLastSeenPost[1]) && currentID[1] <= parsedLastSeenPost[1])) {
							return true;
						}
					}
					unseenRepliesTemp.push(unseenID); // Keep unseenIDs that are greater than the lastSeenPostID
				});
				unseenReplies = unseenRepliesTemp;
			}
		}
		if (!windowFocus) {
			$('.unseenPost').removeClass('unseenPost'); // Remove the previous unseen post line
			$('#' + unseenPosts[0]).addClass('unseenPost'); // Add the unseen class to the first of the unseen posts
		}
		newPostCount = unseenPosts.length;
		var $favicon = $('#favicon');
		var faviconHref = $favicon.attr('href');
		if (unseenReplies.length) {
			faviconState = 'alert';
			if (faviconHref !== faviconAlert) {
				$favicon.attr('href', faviconAlert);
			}
		} else if (newPostCount > 0) {
			faviconState = 'lit';
			if (faviconHref !== faviconLit) {
				$favicon.attr('href', faviconLit);
			}
		} else {
			faviconState = 'unlit';
			if (faviconHref !== faviconUnlit) {
				$favicon.attr('href', faviconUnlit);
			}
		}
	} else { // Original newpost counter code
		$('article').each(function(index, currentArticle){
			if (!$(currentArticle).data('seen')) {
				$(currentArticle).data('seen', true);
				newPostCount += 1;
			}
		});
		if (windowFocus === true) {
			newPostCount = 0;
		}
	}
	document.title = "(" + newPostCount + ") " + DocumentTitle;
}

function postCounter(){
	if (!Page.is('other,statistics')) {
		var postCount = notLoadedPostCount + $('.post_wrapper, div.thread').length;
		var hiddenPostCount = $('.stub').length - $('.pull-left').children('.btn-toggle-post').filter(':visible').length; // Count total minus those that aren't visible to take account for hiding a whole thread on a board
		var imageCount = $('.thread_image_box').length;
		var limits = settings.UserSettings.postCounter.suboptions.limits.value;
		var countHidden = settings.UserSettings.postCounter.suboptions.countHidden.value;
		if (countHidden && settings.UserSettings.postCounter.suboptions.countHidden.suboptions.hideNullHiddenCounter.value) {
			countHidden = hiddenPostCount;
		}
		var locationHeader = settings.UserSettings.postCounter.suboptions.location.value.value === "Header bar";
		var $rules_box = $(".rules_box");
		var $threadStats = $('.threadStats');
		if (locationHeader) {
			$rules_box.html(rulesBox);
		} else {
			$threadStats.html('');
		}
		(locationHeader ? $threadStats : $rules_box).html(
			'<' + (locationHeader ? 'span' : 'h6') + '>Posts' +
			(countHidden ? '(Hidden)' : '') + ': ' + postCount +
			(countHidden ? '(' + hiddenPostCount + ')' : '') +
			(limits ? '/' + settings.UserSettings.postCounter.suboptions.limits.suboptions.posts.value : '') +
			(locationHeader ? '' : '<br>') + ' Images: ' + imageCount +
			(limits ? '/' + settings.UserSettings.postCounter.suboptions.limits.suboptions.images.value : '') +
			'</' + (locationHeader ? 'span' : 'h6') + '>' +
			(locationHeader ? '' : rulesBox)
		);
	}
}

var pokemon = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran?", "nidorina", "nidoqueen", "nidoran?", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetch'd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho-oh", "celebi", "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "taillow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys", "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime jr.", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon-z", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus", "victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismitoad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "mienfoo", "mienshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect", "chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabébé", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic", "honedge", "doublade", "aegislash", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp", "dragalge", "clauncher", "clawitzer", "helioptile", "heliolisk", "tyrunt", "tyrantrum", "amaura", "aurorus", "sylveon", "hawlucha", "dedenne", "carbink", "goomy", "sliggoo", "goodra", "klefki", "phantump", "trevenant", "pumpkaboo", "gourgeist", "bergmite", "avalugg", "noibat", "noivern", "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion"];
function notifyMe(title, icon, body, timeFade){
	if (!Notification) {
		alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
		return;
	}
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
	if (!Math.floor(Math.random() * 8192)) {
		var ND = Math.floor(Math.random() * pokemon.length);
		icon = "http://img.pokemondb.net/sprites/black-white/shiny/" + pokemon[ND] + ".png";
		timeFade = false;
	}
	var notification = new Notification(title, {
		icon: icon,
		body: body
	});
	if (timeFade) {
		notification.onshow = function(){
			setTimeout(notification.close.bind(notification), 5000);
		};
	}
	notification.onclick = function(){
		window.focus();
	};
}

var lastSeenPosts;
var yourPosts;
if (settings.UserSettings.labelYourPosts.value) {
	loadYourPosts();
}
if (settings.UserSettings.favicon.value) {
	if (localStorage.lastSeenPosts === undefined) {
		lastSeenPosts = {};
		localStorage.lastSeenPosts = "{}";
		console.log("Created unseen replies archive for the first time");
	} else {
		lastSeenPosts = JSON.parse(localStorage.lastSeenPosts);
	}
	if (lastSeenPosts[board] === undefined) {
		lastSeenPosts[board] = {};
	}
	if (lastSeenPosts[board][threadID] === undefined) {
		lastSeenPosts[board][threadID] = threadID;
	}
	lastSeenPost = lastSeenPosts[board][threadID];
}
function loadYourPosts(){
	if (localStorage.yourPosts === undefined) {
		yourPosts = {};
		localStorage.yourPosts = "{}";
		console.log("Created post archive for the first time");
	} else {
		yourPosts = JSON.parse(localStorage.yourPosts);
	}
	if (yourPosts[board] === undefined) {
		yourPosts[board] = {};
	}
	if (yourPosts[board][threadID] === undefined) {
		yourPosts[board][threadID] = [];
	}
}
function saveYourPosts(){
	if (yourPosts[board][threadID].length) { // If you posted during the thread. Prevents saving of empty arrays
		if (localStorage.yourPosts === undefined) {
			localStorage.yourPosts = JSON.stringify(yourPosts);
		} else {
			localStorage.yourPosts = JSON.stringify($.extend(true, yourPosts, JSON.parse(localStorage.yourPosts)));
		}
	}
}
function saveLastSeenPosts(){
	lastSeenPosts[board][threadID] = lastSeenPost;
	if (localStorage.lastSeenPosts !== undefined) {
		var latestLastSeenPosts = JSON.parse(localStorage.lastSeenPosts); // Get the most recent version of the stored object
		if (latestLastSeenPosts[board] === undefined) {
			latestLastSeenPosts[board] = {threadID: lastSeenPost};
		} else {
			if (latestLastSeenPosts[board][threadID] === undefined) {
				latestLastSeenPosts[board][threadID] = lastSeenPost;
			} else {
				if (parseInt(latestLastSeenPosts[board][threadID].split('_')[0]) < parseInt(lastSeenPosts[board][threadID].split('_')[0])) {
					latestLastSeenPosts[board][threadID] = lastSeenPosts[board][threadID];
				} else if (parseInt(latestLastSeenPosts[board][threadID].split('_')[0]) === parseInt(lastSeenPosts[board][threadID].split('_')[0])) {
					if (!isNaN(lastSeenPosts[board][threadID].split('_')[1]) && isNaN(latestLastSeenPosts[board][threadID].split('_')[1]) ||
						parseInt(latestLastSeenPosts[board][threadID].split('_')[1]) < parseInt(lastSeenPosts[board][threadID].split('_')[1])) {
						latestLastSeenPosts[board][threadID] = lastSeenPosts[board][threadID];
					}
				}
			}
		}
		lastSeenPosts = latestLastSeenPosts;
	}
	localStorage.lastSeenPosts = JSON.stringify(lastSeenPosts); // Save it again
}
if (Page.is('thread')) {
	// Don't save these things on reload if you're not in a thread
	window.addEventListener('beforeunload', function(){ // After user leaves the page
		if (settings.UserSettings.labelYourPosts.value) { // Save the your posts object
			saveYourPosts();
		}
		if (settings.UserSettings.favicon.value) { // Save the last read posts object
			saveLastSeenPosts();
		}
		crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
		delete crosslinkTracker[board][threadID];
		localStorage.crosslinkTracker = JSON.stringify(crosslinkTracker);

		//var confirmationMessage = "\o/";

		//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		//return confirmationMessage;                            //Webkit, Safari, Chrome
	});
}

function notificationSpoiler(postID){
	var temp = $('#' + postID + ' .text').clone(); // Make a copy of the post text element to avoid changing the original
	if (settings.UserSettings.notifications.suboptions.spoiler.value) {
		$(temp).find('.spoiler').each(function(i, spoiler){
			var newSpoilerText = '';
			for (var j = 0, spoilerLength = $(spoiler).text().length; j < spoilerLength; j++) {
				newSpoilerText += "&#x2588"; // Convert spoilered characters into black block characters
			}
			spoiler.innerHTML = newSpoilerText;
		});
		$(temp).find('br').each(function(i, br){
			$(br).after('\n');
		});
	}
	if (settings.UserSettings.notifications.suboptions.restrict.value) {
		var lineCount = settings.UserSettings.notifications.suboptions.restrict.suboptions.lines.value;
		var charCount = settings.UserSettings.notifications.suboptions.restrict.suboptions.characters.value;
		var restrictedText = temp.text().trim().substr(0, charCount * lineCount); // Dock three extra chars to replace with ellipses
		var restTextLines = restrictedText.split('\n');
		restrictedText = '';
		for (var i = 0; i < lineCount; i++) {
			if (restTextLines[i] === undefined) {
				break;
			} // If there's less than five lines break loop
			if (i !== 0) {
				restrictedText += '\n'; // Add the linebreaks back in
			}
			while (restTextLines[i].length > charCount) { // Break up lines that exceed charCount
				if (i < lineCount) {
					restrictedText += restTextLines[i].substr(0, charCount);
					if (!(/ /).test(restTextLines[i].substr(0, charCount))) { // If there's no space Firefox won't automatically break the chunk onto a new line
						restrictedText += '\n';
					}
					restTextLines[i] = restTextLines[i].substr(charCount);
					lineCount--;
				}
			}
			restrictedText += restTextLines[i];

		}
		return restrictedText + '...';
	} else {
		return temp.text().trim();
	}
}

function labelNewPosts(newPosts, boardView){
	loadYourPosts();
	var crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
	for (var boardVal in yourPosts) {
		if (yourPosts.hasOwnProperty(boardVal) && crosslinkTracker[board][threadID][boardVal]) {
			crosslinkTracker[board][threadID][boardVal] = false;
			if (yourPostsLookup[boardVal] === undefined) {
				yourPostsLookup[boardVal] = {};
			}
			for (var thread in yourPosts[boardVal]) {
				if (yourPosts[boardVal].hasOwnProperty(thread)) {
					for (var i = 0, threadLength = yourPosts[boardVal][thread].length; i < threadLength; i++) {
						yourPostsLookup[boardVal][yourPosts[boardVal][thread][i]] = true;
					}
				}
			}
		}
	}
	$.each(newPosts, function(i, postID){ // For each post returned by update
		var notificationTriggered = false;
		$('#' + postID + ' .backlink').each(function(i, link){ // For each post content backlink
			var linkBoard = link.dataset.board;
			if (yourPostsLookup[linkBoard] !== undefined) {
				var linkID = link.dataset.post.replace(',', '_');
				if (yourPostsLookup[linkBoard][linkID]) { // If the link points to your post
					if (!notificationTriggered && !boardView) {
						if (!settings.UserSettings.filter.value || !settings.UserSettings.filter.suboptions.filterNotifications.value || $('#' + postID).filter(':visible').length) { // Filter notifications
							if (settings.UserSettings.notifications.value) {
								notifyMe($('#' + postID + ' .post_poster_data').text().trim() + " replied to you", faviconNotification, notificationSpoiler(postID), true);
							}
							unseenReplies.push(postID); // add postID to list of unseen replies
							notificationTriggered = true;
						}
					}
					link.textContent += ' (You)'; // Designate the link as such
				}
				if (yourPostsLookup[linkBoard][postID] && !boardView) { // If the post is your own
					var backlink = $('#' + linkID + ' .post_backlink [data-post=' + postID + ']');
					if (backlink.length && !backlink.data('linkedYou')) {
						backlink.data('linkedYou', true);
						backlink[0].textContent += ' (You)'; // Find your post's new reply backlink and designate it too
					}
				}
			}
		});
		if (document.getElementById(postID) !== null) { // Don't add to unseen posts if filter has purged the post
			unseenPosts.push(postID); // add postID to list of unseen posts
		}
	});
}

var lastSubmittedContent;
function postSubmitEvent(){
	window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var target = $('#reply [type=submit]')[0],
		observer = new MutationObserver(function(){
			lastSubmittedContent = $('#reply_chennodiscursus')[0].value;
		}),
		config = {
			attributes: true
		};
	if (target !== undefined) { // Some threads don't allow for ghost posting
		observer.observe(target, config);
	}
}

function linkHoverEvent(){ // Hook into the native internal link hover
	window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var $backlink = $('#backlink');
	var target = $backlink[0],
		observer = new MutationObserver(function(){
			var $hoverpost = $backlink.children('article');
			$hoverpost.removeClass('shitpost');
			if (settings.UserSettings.relativeTimestamps.value) {
				relativeTimestamps($hoverpost);
			}
			if (settings.UserSettings.embedImages.value) {
				embedImages($hoverpost);
			}

			if (settings.UserSettings.inlineImages.value) { // Inline images
				$hoverpost.find('img').each(function(i, image){
					var $image = $(image);
					$image.addClass('smallImage');
					$image.removeAttr('width height');
				});
				if (settings.UserSettings.inlineImages.suboptions.delayedLoad.value) {
					delayedLoad($hoverpost);
				} else {
					inlineImages($hoverpost);
				}
			}
		}),
		config = {
			childList: true
		};
	if (target !== undefined) { // Some boards don't have posts and thus link hovering
		observer.observe(target, config);
	}
}

function mascot(mascotImageLink){
	var $mascot = $('#mascot');
	if (settings.UserSettings.mascot.value) {
		if (!$('#mascotBackground').length) {
			var $container_fluid = $('.container-fluid');
			$container_fluid.prepend('<div id="mascotBackground" style="position:fixed; background-color:' + $container_fluid.css('background-color') + '; z-index:-2; top:0; right:0; bottom:0; left:0;"></div>');
			$container_fluid.css({'background-color': 'rgba(0, 0, 0, 0)'});
		}
		var cornerCSS;
		switch (settings.UserSettings.mascot.suboptions.corner.value.value) {
			case "Top Right":
				cornerCSS = {
					"top": -settings.UserSettings.mascot.suboptions.y.value + "px",
					"right": -settings.UserSettings.mascot.suboptions.x.value + "px",
					"bottom": "",
					"left": ""
				};
				break;
			case "Bottom Right":
				cornerCSS = {
					"top": "",
					"right": -settings.UserSettings.mascot.suboptions.x.value + "px",
					"bottom": settings.UserSettings.mascot.suboptions.y.value + "px",
					"left": ""
				};
				break;
			case "Bottom Left":
				cornerCSS = {
					"top": "",
					"right": "",
					"bottom": settings.UserSettings.mascot.suboptions.y.value + "px",
					"left": settings.UserSettings.mascot.suboptions.x.value + "px"
				};
				break;
			case "Top Left":
				cornerCSS = {
					"top": -settings.UserSettings.mascot.suboptions.y.value + "px",
					"right": "",
					"bottom": "",
					"left": settings.UserSettings.mascot.suboptions.x.value + "px"
				};
				break;
			default:
				console.log("Invalid corner setting");
		}
		var $mascotContainer = $('#mascotContainer');
		if (mascotImageLink !== '') {
			if (!$mascotContainer.length) {
				$('.container-fluid').prepend('<div id="mascotContainer"></div>');
				$mascotContainer = $('#mascotContainer'); // Refresh selector
			}
			if (pattVideoFiletypes.test(mascotImageLink)) {
				$mascotContainer.children('img').remove();
				if (!$mascotContainer.children().length) {
					$mascotContainer.html('<video id="mascot" style="position:fixed; z-index:-1;" name="media" loop muted autoplay><source src="' + mascotImageLink + '" type="video/webm"></video>');
					$mascot = $('#mascot'); // Refresh selector
				} else {
					$mascot[0].src = mascotImageLink;
				}
			} else {
				$mascotContainer.children('video').remove();
				if (!$mascotContainer.children().length) {
					$mascotContainer.html('<img id="mascot" src="' + mascotImageLink + '" style="position:fixed; z-index:-1;">');
					$mascot = $('#mascot'); // Refresh selector
				} else {
					$mascot[0].src = mascotImageLink;
				}
			}
		}
		cornerCSS['z-index'] = settings.UserSettings.mascot.suboptions.zindex.value;
		cornerCSS.opacity = settings.UserSettings.mascot.suboptions.opacity.value;
		if (settings.UserSettings.mascot.suboptions.clickthrough.value) {
			cornerCSS['pointer-events'] = 'none';
		} else {
			cornerCSS['pointer-events'] = '';
		}
		if (settings.UserSettings.mascot.suboptions.width.value < 0) {
			cornerCSS.width = '';
		} else {
			cornerCSS.width = settings.UserSettings.mascot.suboptions.width.value;
		}
		$mascot.css(cornerCSS);
		if ($mascotContainer.children('video').length) {
			$mascot[0].muted = settings.UserSettings.mascot.suboptions.mute.value;
		}
		$mascot.on('load', function(){ // Wait for Mascot to load (otherwise margins won't read size properly)
			postFlow(); // Restructure the postFlow
		});
	} else {
		$mascot.remove();
		postFlow(); // Restructure the postFlow
	}
}

function parseMascotImageValue(){
	var mascotImageLink;
	if (isNaN(parseInt(settings.UserSettings.mascot.suboptions.mascotImage.value))) {
		if (settings.UserSettings.mascot.suboptions.mascotImage.value === undefined || settings.UserSettings.mascot.suboptions.mascotImage.value === '') {
			mascotImageLink = defaultMascots[Math.floor(Math.random() * defaultMascots.length)]; // If empty set to a random default mascot
		} else {
			mascotImageLink = settings.UserSettings.mascot.suboptions.mascotImage.value;
		}
	} else {
		mascotImageLink = defaultMascots[parseInt(settings.UserSettings.mascot.suboptions.mascotImage.value)];
	}
	return mascotImageLink;
}

function postFlow(){
	if (settings.UserSettings.postFlow.value) {
		var align = settings.UserSettings.postFlow.suboptions.align.value.value;
		var leftMargin = settings.UserSettings.postFlow.suboptions.leftMargin.value;
		var rightMargin = settings.UserSettings.postFlow.suboptions.rightMargin.value;
		$('article.thread').each(function(i, threadOP){
			var $threadOP = $(threadOP);
			if ($threadOP.children('.thread_image_box').length) { // Stop posts for intruding in short OPs
				var opTextHeight = $threadOP.children('.thread_image_box')[0].offsetHeight + 10 - 20 - $threadOP.children('header')[0].offsetHeight - $threadOP.children('.thread_tools_bottom')[0].offsetHeight;
				$threadOP.children('.text').css({'min-height': opTextHeight + 'px'});
			}
		});
		if (settings.UserSettings.mascot.value) {
			if (settings.UserSettings.postFlow.suboptions.leftMargin.value < 0) {
				leftMargin = document.getElementById('mascot').offsetWidth; // Make it fit around the mascot if negative value
			}
			if (settings.UserSettings.postFlow.suboptions.rightMargin.value < 0) {
				rightMargin = document.getElementById('mascot').offsetWidth; // Make it fit around the mascot if negative value
			}
			if (!leftMargin || !rightMargin) {
			}
		}
		var width = $('body').innerWidth() - leftMargin - rightMargin;
		if (align === 'Left') {
			$('.posts').css({'display': 'block'});
			$('#main').css({
				'width': width,
				'margin-left': leftMargin + 'px'
			});
			$('.pull-left').css({
				'float': 'left'
			});
		} else if (align === 'Center') {
			$('.posts').css({
				'display': 'flex',
				'flex-direction': 'column',
				'align-items': 'center'
			});
			$('#main').css({
				'width': width,
				'margin-left': leftMargin + 'px'
			});
			$('.pull-left').css({
				'float': 'left'
			});
		} else { // align == 'Right'
			$('.posts').css({
				'display': 'flex',
				'flex-direction': 'column',
				'align-items': 'flex-end'
			});
			$('#main').css({
				'width': width,
				'margin-left': 'auto',
				'margin-right': rightMargin + 'px'
			});
			$('.pull-left').css({
				'float': 'right'
			});
		}
		var wordBreak = settings.UserSettings.postFlow.suboptions.wordBreak.value.value;
		if (wordBreak === 'Auto') {
			if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { // If using Firefox
				$('#SpookyX-css-word-break').html('.text{word-break:break-all}');
			} else {
				$('#SpookyX-css-word-break').html('');
			}
		} else if (wordBreak === 'Break-all') {
			$('#SpookyX-css-word-break').html('.text{word-break:break-all}');
		} else if (wordBreak === 'Overflow-Wrap') {
				$('#SpookyX-css-word-break').html('.text{overflow-wrap: break-word}');
		} else { // wordBreak == Normal
			$('#SpookyX-css-word-break').html('.text{word-break:normal}');
		}
	} else {
		$('#main').css({
			'width': '',
			'margin': '0'
		});
		$('.posts').css({'display': 'block'});
	}
}

function adjustReplybox(){
	if (settings.UserSettings.adjustReplybox.value) {
		$('#reply_chennodiscursus').css({
			"width": settings.UserSettings.adjustReplybox.suboptions.width.value
		});
	} else {
		$('#reply_chennodiscursus').css({
			"width": "320"
		});
	}
	if (settings.UserSettings.adjustReplybox.suboptions.removeReset.value) {
		$('#reply .btn[type=reset]').remove();
		$('#reply .btn-group > .btn').css('border-radius', '4px');
	}
}

function headerBar(){
	var $headerFixed = $('#headerFixed');
	var $headerBar = $headerFixed.find('.headerBar');
	var $boardList = $headerFixed.find('.boardList');
	$(window).off('mousewheel');
	if (settings.UserSettings.headerBar.suboptions.shortcut.value) {
		if (!shortcut.all_shortcuts.h) {
			shortcut.add("h", function(){
				$headerFixed.toggleClass('shortcutHidden');
			}, {"disable_in_input": true});
		}
	} else {
		if (shortcut.all_shortcuts.h) {
			shortcut.remove("h");
		}
	}
	if (settings.UserSettings.headerBar.suboptions.behaviour.value.value === "Collapse to button") { // If in collapse mode
		$headerFixed.removeClass('shortcutHidden'); // Un-hide
		if ($headerFixed.find('a[title="Show headerbar"]').filter(':visible').length) {
			if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.settings.value) {
				$headerBar.children('a[title="SpookyX Settings"]').show();
			} else {
				$headerBar.children('a[title="SpookyX Settings"]').hide();
			}
			if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.postCounter.value) {
				$headerBar.children('.threadStats').show();
			} else {
				$headerBar.children('.threadStats').hide();
			}
		}
		if (!$('.collapseButton').length) { // Only add the collapse buttons if they don't already exist
			$boardList.after('<a class="collapseButton" title="Show headerbar" href="javascript:;" style="float:right; display:none; font-family:monospace;">[+]</a>');
			$headerBar.append('<a class="collapseButton" title="Hide headerbar" href="javascript:;" style="font-family:monospace;">[-]</a>');
		}
		$headerBar.find('a[title="Hide headerbar"]').on('click', function(){ // Add click events to the buttons
			$boardList.hide();
			if (!settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.settings.value) {
				$headerBar.children('a[title="SpookyX Settings"]').hide();
			}
			if (!settings.UserSettings.headerBar.suboptions.behaviour.suboptions.contractedForm.suboptions.postCounter.value) {
				$headerBar.children('.threadStats').hide();
			}
			$headerBar.find('a[title="Hide headerbar"]').hide();
			$headerFixed.find('a[title="Show headerbar"]').show();
			$headerFixed.css({
				"left": "initial",
				"padding": "0 10px"
			});
		});
		$headerFixed.find('a[title="Show headerbar"]').on('click', function(){ // Add click events to the buttons
			$boardList.show();
			$headerBar.children('.threadStats').show();
			$headerBar.children('a[title="SpookyX Settings"]').show();
			$headerBar.find('a[title="Hide headerbar"]').show();
			$headerFixed.find('a[title="Show headerbar"]').hide();
			$headerFixed.css({
				"left": "-1px",
				"padding": "0 10px 0 30px"
			});
		});
		if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.scroll.value) { // Add a scroll event that collapses it
			$headerFixed.removeClass('shortcutHidden');
			$(window).on('mousewheel', function(e){
				if (!$(e.target).closest('#settingsMenu').length) {
					if (e.deltaY > 0) {
						$headerFixed.find('a[title="Show headerbar"]').trigger('click');
					} else {
						$headerBar.find('a[title="Hide headerbar"]').trigger('click');
					}
				}
			});
		}
		if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.defaultHidden.value) { // Collapse on pageload
			$headerBar.find('a[title="Hide headerbar"]').trigger('click');
		} else {
			$headerFixed.find('a[title="Show headerbar"]').trigger('click');
		}
	} else { // Else remove any collapse stuff
		$('.collapseButton').remove();
		$boardList.show();
		$headerBar.children('.threadStats').show();
		$headerBar.children('a[title="SpookyX Settings"]').show();
		$headerFixed.css({
			"left": "-1px",
			"padding": "0 10px 0 30px"
		});
		if (settings.UserSettings.headerBar.suboptions.behaviour.value.value === "Full hide") { // If full hide mode
			if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.scroll.value) { // Add scroll event that hides it
				$(window).on('mousewheel', function(e){
					if (!$(e.target).closest('#settingsMenu').length) {
						if (e.deltaY > 0) {
							$headerFixed.removeClass('shortcutHidden');
						} else {
							$headerFixed.addClass('shortcutHidden');
						}
					}
				});
			}
			if (settings.UserSettings.headerBar.suboptions.behaviour.suboptions.defaultHidden.value) { // Hide on pageload
				$headerFixed.addClass('shortcutHidden');
			} else {
				$headerFixed.removeClass('shortcutHidden');
			}
		} else {
			$headerFixed.removeClass('shortcutHidden'); // Unhide it if always show mode
		}
	}
}

function addFileSelect(){
	if (!$('#file_image').length) {
		$('#reply_elitterae').parent().parent().append('<div class="input-prepend"><label class="add-on" for="file_image">File</label><input type="file" name="file_image" id="file_image" size="16" multiple="multiple"></div>');
		$('.input-append.pull-left .btn-group [name=reply_gattai]').attr('id', 'finalReplySubmit').hide();
		if (!$('#middleReplySubmit').length) {
			var $reply_btngroup = $('.input-append.pull-left .btn-group');
			$reply_btngroup.prepend('<input id="middleReplySubmit" value="Submit" class="btn btn-primary" type="button">');
			$reply_btngroup.append('<span style="float:right;"><input id="urlUploadInput" type="text" style="margin-right: 0;" placeholder="Upload via url"><input id="urlUploadSubmit" class="btn" value="Upload" type="button"></span>');
			var $middleReplySubmit = $('#middleReplySubmit');
			var $urlUploadInput = $('#urlUploadInput');
			var $urlUploadSubmit = $('#urlUploadSubmit');
			var clientId = '6a7827b84201f31';
			$middleReplySubmit.on('click', function(){
				var fileCount = document.getElementById('file_image').files.length;
				if (settings.UserSettings.autoHost.value.value !== "Don't reupload links") {
					var fourChanOnly = settings.UserSettings.autoHost.value.value === "Reupload 4chan links";
					var replyValue = $('#reply_chennodiscursus')[0].value;
					var concatFileTypes = filetypes.IMAGES.join('|');//+ '|' + filetypes.VIDEOS.join('|');
					var linkPatt = fourChanOnly ?
						new RegExp('https?:\\/\\/(i\\.4cdn\\.org|pbs\\.twimg\\.com)\\/.*\\.(' + concatFileTypes + ')', 'ig') :
						new RegExp('https?:\\/\\/.*\\.(' + concatFileTypes + ')', 'ig');
					var links = replyValue.match(linkPatt);
					var linksLength = links === null ? 0 : links.length;
					var totalUploads = linksLength + fileCount;
					var successfulUploads = 0;
				}
				if (fileCount || linksLength) {
					$middleReplySubmit.val('Uploading File' + (totalUploads > 1 ? 's' : '')).attr('disabled', 'disabled');
					if (linksLength) {
						$.each(links, function(i, link){
							if (!/i\.imgur\.com/i.test(link)) {
								$.ajax({
									url: "https://api.imgur.com/3/image",
									type: 'POST',
									headers: {
										Authorization: 'Client-ID ' + clientId
									},
									data: {
										image: link,
										type: 'URL'
									}
								}).done(function(response){
									document.getElementById('reply_chennodiscursus').value = document.getElementById('reply_chennodiscursus').value.replace(link, response.data.link.replace(/http:/, 'https:'));
									successfulUploads++;
									if (successfulUploads === totalUploads) {
										$middleReplySubmit.val('Submitting');
										$('#finalReplySubmit').trigger('click');
									}
								}).fail(function(e){
									notifyMe("An error occurred whilst uploading", 'http://i.imgur.com/qEpGpTc.png', 'The link was: ' + link + '\n' + JSON.parse(e.responseText).data.error, false);
								});
							}
						});
					}
					if (fileCount) {
						$.each(document.getElementById('file_image').files, function(i, file){
							var reader = new FileReader();
							if (false && /image/.test(file.type)) { // Disable Imgur usage, don't remove code in case it needs to be restored
								reader.readAsDataURL(file);
								reader.onloadend = function(){
									$.ajax({
										url: "https://api.imgur.com/3/image",
										type: 'POST',
										headers: {
											Authorization: 'Client-ID ' + clientId
										},
										data: {
											image: reader.result.replace(/data:.*;base64,/, ''),
											type: 'base64',
											name: file.name
										}
									}).done(function(response){
										fileCount--;
										$('#reply_chennodiscursus')[0].value += "\n" + response.data.link.replace(/http:/, 'https:');
										successfulUploads++;
										if (!fileCount) {
											$('#file_image').val('');
											if (successfulUploads === totalUploads) {
												$middleReplySubmit.val('Submitting');
												$('#finalReplySubmit').trigger('click');
											}
										}
									}).fail(function(e){
										notifyMe("An error occurred whilst uploading", 'http://i.imgur.com/qEpGpTc.png', 'The file was: ' + file.name + '\n' + JSON.parse(e.responseText).data.error, false);
									});
								};
							} else if (!/application/.test(file.type)) {
								var data = new FormData();
								data.append('files[]', file);
								var xhr = new XMLHttpRequest();
								xhr.open('POST', 'https://mixtape.moe/upload.php', true);
								xhr.addEventListener('load', function(e){
									fileCount--;
									$('#reply_chennodiscursus')[0].value += "\n" + JSON.parse(xhr.responseText).files[0].url;
									successfulUploads++;
									if (!fileCount) {
										$('#file_image').val('');
										if (successfulUploads === totalUploads) {
											$middleReplySubmit.val('Submitting');
											$('#finalReplySubmit').trigger('click');
										}
									}
								});
								xhr.send(data);
							} else {
								$middleReplySubmit.val('Filetype is not supported').removeAttr('disabled');
								setTimeout(function(){
									$middleReplySubmit.val('Submit');
								}, 3000);
							}
						});
					}
				} else {
					$middleReplySubmit.val('Submitting').attr('disabled', 'disabled');
					$('#finalReplySubmit').trigger('click');
				}
			});
			$urlUploadSubmit.on('click', function(){
				$urlUploadSubmit.val('Uploading...');
				$.ajax({
					url: "https://api.imgur.com/3/image",
					type: 'POST',
					headers: {
						Authorization: 'Client-ID ' + clientId
					},
					data: {
						image: $urlUploadInput[0].value,
						type: 'URL'
					}
				}).done(function(response){
					$urlUploadInput[0].value = '';
					$('#reply_chennodiscursus')[0].value += "\n" + response.data.link.replace(/http:/, 'https:');
				}).fail(function(e){
					notifyMe("An error occurred whilst uploading", 'http://i.imgur.com/qEpGpTc.png', 'The link was: ' + $urlUploadInput[0].value + '\n' + JSON.parse(e.responseText).data.error, false);
				}).always(function(){
					$urlUploadSubmit.val('Upload');
				});
			});
		} else {
			$('#middleReplySubmit').val('Submit').removeAttr('disabled');
		}
	}
}

function updateExportLink(){ // Define the export settings link with the latest version of the settings
	var $settingsExport = $('#settingsExport');
	$settingsExport.attr('download', 'SpookyX v.' + GM_info.script.version + '-' + Date.now() + '.json');
	$settingsExport.attr('href', 'data:' + 'text/plain' + ';charset=utf-8,' + encodeURIComponent(JSON.stringify(settings)));
}

function saveSettings(){
	settingsStore = {};
	settingsStore.UserSettings = settingsStrip(settings.UserSettings);
	settingsStore.FilterSettings = settingsStrip(settings.FilterSettings);
	localStorage.SpookyXsettings = JSON.stringify(settingsStore); // Save the settings
}

var hoveredTextColourPicker;
function revealSpoilers(){
	if (settings.UserSettings.revealSpoilers.value) {
		$('#SpookyX-css-hovered-spoilers').html('.spoiler {color:' + hoveredTextColourPicker + '!important;}');
	} else {
		$('#SpookyX-css-hovered-spoilers').html('');
	}
}

$(document).ready(function(){
	var $body = $('body');
	var $head = $('head');
	$body.append('<div id="postBackgroundColourPicker" class="thread_form_wrap" style="display:none;"></div>'); // Create an element to get the post colour from
	var $postBackgroundColourPicker = $('#postBackgroundColourPicker');
	var postBackgroundColourPicker = $postBackgroundColourPicker.css('background-color'); // Set the colour
	$postBackgroundColourPicker.remove(); // Delete the element afterwards

	var mockHoverFailed = false;
	try { // Firefox can fail with a security error (something to do with stylesheets from multiple domains)
		allowMockHover(); // Process the stylesheets to add a custom class to all hovered element instances so that we can force the style on a test element
	} catch (e) {
		mockHoverFailed = true;
	}
	var $hoveredTextColourPicker = $('<div class="spoiler mock-hover" style="position: fixed; top: -1000px;">hoveredTextColourPicker</div>'); // Create an element to get the hovered text colour from
	$body.append($hoveredTextColourPicker);
	hoveredTextColourPicker = $hoveredTextColourPicker.css('color'); // Set the colour
	if (mockHoverFailed) {
		// Use inverted regular font colour then
		hoveredTextColourPicker = hoveredTextColourPicker.replace(/([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/, function($0, $1, $2, $3){
			return (255 - $1) + ', ' + (255 - $2) + ', ' + (255 - $3);
		});
	}
	$hoveredTextColourPicker.remove(); // Delete the element afterwards

	$head.after('<style type="text/css" id="SpookyX-css"></style>');
	$head.after('<style type="text/css" id="SpookyX-css-word-break"></style>'); // Add style element that controls that one thing
	$head.after('<style type="text/css" id="SpookyX-css-hovered-spoilers"></style>'); // Add style element that controls that one thing
	$('#SpookyX-css').append('.imgur-embed-iframe-pub{float: left; margin: 10px 10px 0 0!important;}.post_wrapper .pull-left, article.backlink_container > div#backlink .pull-left{display:none;}' +
		'#gallery{position:fixed; width:100%; height:100%; top:0; left:0; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.7);}.unseenPost{border-top: red solid 1px;}' +
		'.hoverImage{position:fixed;float:none!important;}.bigImage{opacity: 1!important; max-width:100%;}.smallImage{max-width:' + imageWidth + 'px; max-height:' + imageHeight + 'px}' +
		'.smallImage.thread_image{max-width:' + imageWidthOP + 'px; max-height:' + imageHeightOP + 'px}.spoilerImage{opacity: 0.1}.spoilerText{position: relative; height: 0px; font-size: 19px; top: 47px;}' +
		'.forwarded{display:none!important}.inline{border:1px solid; display: table; margin: 2px 0;}.inlined{opacity:0.5}.post_wrapper{border-right: 1px solid #cccccc;}' +
		'.theme_default.midnight .post_wrapper{border-right: 0;}.post_wrapperInline{border-right:0!important; border-bottom:0!important;}.quickReply{position: fixed; top: 0; right: 0; margin:21px 3px !important;}' +
		'.shitpost{opacity: 0.3}.embedded_post_file{margin: 0!important; max-width: ' + imageWidth + 'px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}' +
		'.headerBar{float:right; display:inline-block; z-index:10;}.threadStats{display:inline;}#settingsMenu{position: fixed; height: 550px; max-height: 100%; width: 900px; max-width: 100%; margin: auto; padding:' +
		' 0; top: 50%; left: 50%; -moz-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);z-index: 999; border: 2px solid #364041;}' +
		'.sections-list{padding: 3px 6px; float: left;}.credits{padding: 3px 6px; float: right;}#menuSeparator{width:100%; border-top:1px solid #364041; float:left; position:relative; top:-2px;}' +
		'.sections-list a.active{font-weight: 700;}.sections-list a{text-decoration: underline;}#settingsMenu label{display: inline; text-decoration: underline; cursor: pointer;}' +
		'#settingsContent{position: absolute; overflow: auto; top: 1.8em; bottom: 0; left: 0; right: 0; padding: 0;}#settingsContent > div{padding: 3px;}.suboption-list{position: relative;}' +
		'.suboption-list::before{content: ""; display: inline-block; position: absolute; left: .7em; width: 0; height: 100%; border-left: 1px solid;}.suboption-list > div::before{content: ""; display: inline-block;' +
		' position: absolute; left: .7em; width: .7em; height: .6em; border-left: 1px solid; border-bottom: 1px solid;}.suboption-list > div{position: relative; padding-left: 1.4em;}' +
		'.suboption-list > div:last-of-type {background-color:' + postBackgroundColourPicker + ';}#settingsMenu input{margin: 3px 3px 3px 4px; padding-top:1px; padding-bottom:0; padding-right:0;}' +
		'#settingsMenu select{margin: 3px 3px 3px 4px; padding-left: 2px; padding-top: 0px; padding-bottom: 0px; padding-right: 0; height: 19px; width: auto;}#settingsMenu input[type="text"]{height:16px; line-height:0;}' +
		'#settingsMenu input[type="number"]{height:16px; line-height:0; width:44px;}.last{background-color:' + postBackgroundColourPicker + ';}#settingsMenu code{padding: 2px 4px; background-color: #f7f7f9!important; ' +
		'border: 1px solid #e1e1e8!important;}.filters-list{padding: 0 3px;}.filters-list a.active{font-weight: 700;}.filters-list a{text-decoration: underline;}#Filter textarea {margin:0; height: 493px; ' +
		'font-family:monospace; min-width:100%; max-width:100%;}#Filter > div{margin-right:14px;}.shortcutHidden{display:none!important;}.letters{margin-top:0!important;}' +
		'#headerFixed{position:fixed; left:-1px; right:-1px; top:-1px; padding:0 10px 0 30px; border:#252525 1px solid; z-index:1;}#headerStatic{position:static; padding: 0px 10px 0 30px;}' +
		'.threadStats{margin-right:20px;}#settingsMenu .description{margin-left:2px; flex-shrink: 9999;}.selectDescription{margin-top:3px;}#settingsMenu label{margin-bottom:0}' +
		'.settingsJoinLine{border-left:solid 1px; position:relative; left:0.7em; top: 1.9em;}.settingsJoinLineCheckbox{top: 1.4em;}.settingFlexContainer{display:flex;}#footer{min-height:28px; height:initial!important;}' +
		'.footer_text{margin-bottom:0!important;}');
	if (settings.UserSettings.favicon.value) {
		$('head').append('<link id="favicon" rel="shortcut icon" type="image/png">');
		generateFavicons();
		$('#reply fieldset .progress').after('<canvas id="myCanvas" width="64" height="64" style="float:left; display:none; position: relative; top: -10px; left: -10px;"></canvas>');
	}
	$body.append('<div id="hoverUI"></div>');
	var $letters = $('.letters');
	if ($letters.length === 0) {
		$body.prepend('<div class="letters"></div>'); // Add the letters bar if it's not present
		$letters = $('.letters'); // Refresh selector
	}
	$letters.prependTo('.container-fluid'); // Move it to remove the unecessary scrolling on certain pages
	if ($letters.length) {
		$letters.html('<span class="boardList">' + $letters.html() + '</span><span class="headerBar"><div class="threadStats"></div><a title="SpookyX Settings" href="javascript:;" style="margin-right:10px;">Settings</a></span>');
		$letters.clone().hide().insertAfter('.letters');
		$letters = $('.letters'); // Refresh selector
		$letters[0].id = "headerStatic";
		$letters[1].id = "headerFixed";
	} else { // Insert settings link when on board index
		$('.container-fluid').append('<div class="headerBar" style="position: fixed; right: 0; top: 0;"><a title="SpookyX Settings" href="javascript:;">Settings</a></div>');
	}
	$body.append('<div id="settingsMenu" class="thread_form_wrap" style="display: none;"><input type="file" id="fileInput" style="display:none;"><div id="settingsHeader"><div class="sections-list"><a href="javascript:;" class="active">Main</a> | <a href="javascript:;">Filter</a></div><div class="credits"><a id="settingsExport" title="Export" href="javascript:;">Export</a> | <a id="settingsImport" title="Import" href="javascript:;">Import</a> | <a title="Reset Settings" href="javascript:;">Reset Settings</a> | <a target="_blank" href="https://github.com/Fiddlekins/SpookyX" style="text-decoration: underline;">SpookyX</a> | <a target="_blank" href="https://github.com/Fiddlekins/SpookyX/blob/master/CHANGELOG.md" style="text-decoration: underline;">v.' + GM_info.script.version + '</a> | <a target="_blank" href="https://github.com/Fiddlekins/SpookyX/issues" style="text-decoration: underline;">Issues</a> | <a title="Close" href="javascript:;">Close</a></div></div><div id="menuSeparator"></div><div id="settingsContent"></div></div>');
	if (settings.UserSettings.gallery.value) {
		$('body').append('<div id="gallery" style="display:none;"></div>');
	}
	if (Page.is('thread')) { // If in a thread
		$($('.navbar .nav')[1]).append('<li><a href="//boards.4chan.org/' + board + '/thread/' + threadID + '">View thread on 4chan</a></li>'); // Add view thread on 4chan link
	}
	$('.headerBar > a[title="SpookyX Settings"], a[title=Close]').on('click', function(){
		populateSettingsMenu();
	});
	$(window).on('scroll', function(){
		if (window.scrollY > 40) {
			$('#headerFixed').show();
		} else {
			$('#headerFixed').hide();
		}
	});
	if (window.scrollY > 42) { // Show headerbar on pageload if necessary
		$('#headerFixed').show();
	}
	$('.sections-list').on('click', function(e){ // Main settings tabs change on click
		if (e.target.tagName === "A") {
			$('#settingsContent #' + $('.sections-list .active').html()).hide();
			$('.sections-list .active').removeClass('active');
			$(e.target).addClass('active');
			$('#settingsContent #' + $('.sections-list .active').html()).show();
		}
	});
	$('#settingsContent').on('click', function(e){ // Filter subtabs change on click
		if (e.target.parentNode.className === "filters-list") {
			var filterSubmenu = $(e.target).attr('name');
			$('#filter_' + $('.filters-list .active').attr('name')).hide();
			$('.filters-list .active').removeClass('active');
			$('.filters-list > a[name=' + filterSubmenu + ']').addClass('active');
			$('#filter_' + filterSubmenu).show();
		}
	});
	$('#settingsMenu .credits > a').on('click', function(e){ // Set up the import/export/reset links
		if (e.target.title === "Import") { // Import settings
			$('#fileInput').trigger('click');
		} else if (e.target.title === "Reset Settings") {
			settings = jQuery.extend(true, {}, defaultSettings);
			saveSettings(); // Save the settings
			populateSettingsMenu(); // Double populate to display changed settings
			populateSettingsMenu();
		}
	});
	$('#fileInput').on('change', function(){ // When the undisplayed file input element changes import settings
		if (typeof window.FileReader !== 'function') {
			alert("The file API isn't supported on this browser.");
			return;
		}
		var input = document.getElementById('fileInput');
		var file = input.files[0];
		if (!input.files[0]) {
			alert("Please select a file.");
		} else {
			var fr = new FileReader();
			fr.onload = function(){
				settings = JSON.parse(fr.result);
				saveSettings(); // Save the settings
				populateSettingsMenu(); // Double populate to display changed settings
				populateSettingsMenu();
				alert("Saved settings applied.");
			};
			fr.readAsText(file);
		}
	});
	$('#settingsContent').on('change', function(e){
		if ($(e.target).hasClass('filterTextarea')) {
			var store = [];
			$.each(e.target.value.split('\n'), function(i, line){
				var lineStore = {};
				if (line.trim().substr(0, 1) == "#") {
					lineStore.comment = line;
				} else {
					line = line.replace(/\\;/g, '<delimitedSemiColon>');
					$.each(line.split(';'), function(i, fragment){
						if (fragment !== "") {
							if (!i) {
								var regex = fragment.trim().replace(/<delimitedSemiColon>/g, ';');
								if ((/[gim]/).test(regex.substring(regex.length - 1))) {
									lineStore.regex = {
										"pattern": regex.substring(1, regex.length - 2),
										"flag": regex.substring(regex.length - 1)
									};
								} else {
									lineStore.regex = {"pattern": regex.substring(1, regex.length - 1), "flag": ""};
								}
							} else {
								var components = fragment.split(':');
								lineStore[components.shift().trim().replace(/<delimitedSemiColon>/g, ';')] = components.join(':').trim().replace(/<delimitedSemiColon>/g, ';');
							}
						}
					});
					if (lineStore.regex !== undefined) {
						lineStore.comment = false;
					}
				}
				store.push(lineStore);
			});
			settings.FilterSettings[$(e.target).attr('name')].value = store;
		} else {
			var value;
			var elementPath = $(e.target).attr('path');
			var settingPath = objpath(settings.UserSettings, elementPath);
			if (e.target.type === "checkbox") {
				if (e.target.name === "Filter") {
					if (settings.UserSettings.filter.value) {
						$('#filterDisabledMessage').show();
					} else {
						$('#filterDisabledMessage').hide();
					}
				}
				value = e.target.checked;
				$(e.target).closest('div:not(.settingFlexContainer)').children('.suboption-list').toggle(); // Make parent checkboxes collapse the suboptions if they're unticked
				$(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').toggle();
			} else {
				value = e.target.value;
			}
			if (e.target.nodeName == "SELECT") {
				settingPath.value.value = value;
				var testPatt = new RegExp(value);
				for (var suboption in settingPath.suboptions) {
					if (settingPath.suboptions.hasOwnProperty(suboption) && settingPath.suboptions[suboption].if !== undefined) {
						var ifMet = false;
						$.each(settingPath.suboptions[suboption].if, function(i, v){
							if (testPatt.test(v)) {
								ifMet = true;
								return false;
							}
						});
						if (ifMet) {
							$(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list [key=' + suboption + ']').closest('div:not(.settingFlexContainer)').show();
						} else {
							$(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list [key=' + suboption + ']').closest('div:not(.settingFlexContainer)').hide();
						}
						$(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > .last').removeClass('last');
						$(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > :visible:last').addClass('last');
						if ($(e.target).closest('div:not(.settingFlexContainer)').find('.suboption-list > :visible').length > 1) {
							$(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').show();
						} else {
							$(e.target).closest('.settingFlexContainer').children('.settingsJoinLine').hide();
						}
					}
				}
			} else {
				settingPath.value = value;
			}
			if (elementPath.substr(0, 6) === "mascot") { // Live update changes in mascot settings
				if (e.target.name === "Mascot image" || e.target.name === "Mascot") {
					mascot(parseMascotImageValue());
				} else {
					mascot('');
				}
			} else if (elementPath.substr(0, 8) === "postFlow") {
				postFlow();
			} else if (elementPath.substr(0, 14) === "adjustReplybox") {
				adjustReplybox();
			} else if (elementPath.substr(0, 11) === "postCounter") {
				postCounter();
			} else if (elementPath.substr(0, 9) === "headerBar") {
				headerBar();
			} else if (elementPath === "revealSpoilers") {
				revealSpoilers();
			}
		}
		if (e.target.name === "Custom Favicons" || (e.target.name === "Favicon" && e.target.checked)) {
			generateFavicons();
		}
		saveSettings(); // Save the settings
		updateExportLink(); // Recreate the export link
	});
	if (settings.UserSettings.postCounter.suboptions.countUnloaded.value) {
		if (Page.is('thread')) { // Count the posts that aren't loaded (eg. in last/50 mode)
			$.ajax({
				url: "/_/api/chan/thread/",
				method: "GET",
				data: {"board": board, "num": threadID, "inThread": true}
			}).done(function(response){
				var firstLoadedPostID = $('article.post').length ? $('article.post')[0].id : null;
				if (response[threadID].posts) {
					var postList = Object.keys(response[threadID].posts);
					if (postList) {
						for (var i = 0, len = postList.length; i < len; i++) {
							if (postList[i] !== firstLoadedPostID) {
								notLoadedPostCount++;
							} else {
								break;
							}
						}
					}
				}
				postCounter();
			});
		}
	}
	if (Page.is('thread')) {
		windowFocus = document.hasFocus();
		$(window).focus(function(){
			windowFocus = true;
			ThreadUpdate();
		});
		$(window).blur(function(){
			windowFocus = false;
		});
		$('#' + unseenPosts[0]).addClass('unseenPost'); // Add the unseen class to the first of the unseen posts
	}
	if (settings.UserSettings.labelYourPosts.value) {
		for (var boardVal in yourPosts) {
			if (yourPosts.hasOwnProperty(boardVal)) {
				yourPostsLookup[boardVal] = {};
				for (var thread in yourPosts[boardVal]) {
					if (yourPosts[boardVal].hasOwnProperty(thread)) {
						var threadLength = yourPosts[boardVal][thread].length;
						var threadArray = yourPosts[boardVal][thread];
						for (var i = 0; i < threadLength; i++) {
							yourPostsLookup[boardVal][threadArray[i]] = true;
						}
					}
				}
			}
		}
		if (Page.is('thread')) {
			postSubmitEvent();
		}
	}

	if (!Page.is('search,other,statistics')) {
		var $newPost, postID, response;
		$(document).ajaxComplete(function(event, request, ajaxSettings){
			if (!/inThread=true/i.test(ajaxSettings.url) && /api\/chan\/thread\/\?/i.test(ajaxSettings.url) || ((ajaxSettings.type === 'POST') && /\/submit\//i.test(ajaxSettings.url) )) {
				console.log(ajaxSettings.url);
				console.log(request.responseText);
				if (request.responseText !== '') {
					try {
						if (request.responseText.charAt(0) === '<') {
							console.log('The following is the request responseText:');
							console.log(request.responseText);
							response = {
								"error": "SpookyX encountered an error when parsing the response. The connection" +
								" probably timed out. Feel free to give Fiddlekins the console log to have a look at."
							};
						} else {
							response = JSON.parse(request.responseText);
						}
					} catch (e) {
						response = {"error": "SpookyX encountered an error when parsing the response."};
						console.log('The following is the request responseText:');
						console.log(request.responseText);
						alert('A nasty error has occurred. Please take a screenshot of your console and give it to ' +
							'Fiddlekins to deal with.\n\n(You can typically access the console by pressing ctrl+shift+J ' +
							'or pressing F12 and navigating to the console tab.)');
					}
				} else {
					response = {"error": "No responseText"};
				}
				if (Page.is('thread')) {
					if (ajaxSettings.type === 'POST') {
						if (response.error === undefined) {
							if (response.captcha) { // If you are required to fill a captcha before posting
								//console.log(response);
							} else {
								for (postID in response[threadID].posts) {
									if (response[threadID].posts.hasOwnProperty(postID) && response[threadID].posts[postID].comment.replace(/[\r\n]/g, '') == lastSubmittedContent.replace(/[\r\n]/g, '')) {
										yourPosts[board][threadID].push(postID);
										$newPost = $('#' + postID);
										$newPost.find('.post_author').after('<span> (You)</span>');
										if (settings.UserSettings.filter.value) {
											filter($newPost);
										} // Apply filter
									}
								}
								crosslinkTracker = JSON.parse(localStorage.crosslinkTracker);
								for (var boardVal in crosslinkTracker) {
									if (crosslinkTracker.hasOwnProperty(boardVal)) {
										for (var threadVal in crosslinkTracker[boardVal]) {
											if (crosslinkTracker[boardVal].hasOwnProperty(threadVal)) {
												crosslinkTracker[boardVal][threadVal][board] = true;
											}
										}
									}
								}
								localStorage.crosslinkTracker = JSON.stringify(crosslinkTracker);
								saveYourPosts();

								labelNewPosts(Object.keys(response[threadID].posts), false);
								addFileSelect(); // Refresh the added file upload
							}
						} else {
							if (settings.UserSettings.notifications.value) {
								notifyMe("An error occurred whilst posting", faviconNotification, response.error, false);
							}
						}
						$('#middleReplySubmit').val('Submit').removeAttr('disabled'); // Reset submit button
					} else {
						if (response.error !== undefined) {
							//console.log(response.error);
						} else {
							if (response[threadID] !== undefined) {
								for (postID in response[threadID].posts) {
									if (settings.UserSettings.filter.value) {
										filter($('#' + postID));
									} // Apply filter
								}
								labelNewPosts(Object.keys(response[threadID].posts), false);
								addFileSelect(); // Refresh the added file upload
							} else {
								//console.log("Not in a thread");
							}
						}
					}
				}

				for (var key in response) {
					if (response.hasOwnProperty(key) && response[key] !== null && response[key].posts !== undefined) {
						if (Page.is('board') && settings.UserSettings.labelYourPosts.value) { // Handle (You) deignation for expanding threads on board view
							labelNewPosts(Object.keys(response[key].posts), true);
						}
						for (postID in response[key].posts) {
							if (response[key].posts.hasOwnProperty(postID) && document.getElementById(postID) !== null) { // Don't process post if filter has purged it
								$newPost = $('#' + postID);
								if (settings.UserSettings.inlineImages.value) {
									$newPost.find('img').each(function(i, image){
										var $image = $(image);
										$image.addClass('smallImage');
										$image.removeAttr('width height');
									});
									if (settings.UserSettings.inlineImages.suboptions.delayedLoad.value) {
										delayedLoad($newPost);
									} else {
										inlineImages($newPost);
									}
								} // Inline images
								if (Page.is('board') && settings.UserSettings.labelYourPosts.value) {
									if (yourPostsLookup[board][postID]) {
										$newPost.find('.post_author').after('<span> (You)</span>');
									}
								} // Handle (You) designation for expanding threads on board view
								if (settings.UserSettings.inlineReplies.value) {
									$newPost.addClass("base");
								} // Prep inline responses
								if (settings.UserSettings.embedImages.value) {
									embedImages($newPost);
								} // Embed images
								if (settings.UserSettings.inlineImages.value && !settings.UserSettings.inlineImages.suboptions.autoplayGifs.value) {
									pauseGifs($newPost.find('img'));
								} // Stop gifs autoplaying
								if (settings.UserSettings.relativeTimestamps.value) {
									relativeTimestamps($newPost);
								} // Add relative timestamps
								if (Page.is('board') && settings.UserSettings.filter.value) {
									filter($newPost);
								} // Apply filter
								if (settings.UserSettings.postQuote.value) {
									$newPost.find('.post_data > [data-function=quote]').removeAttr('data-function').addClass('postQuote');
								} // Change the quote function
								if (settings.UserSettings.hidePosts.value) {
									$newPost.children('.pull-left').removeClass('stub');
									if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value) {
										$newPost.find('.post_backlink').attr('id', 'p_b' + postID);
										if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.suboptions.hideNewPosts.value) {
											var checkedBacklinks = {};
											$newPost.find('.text .backlink').each(function(i, backlink){
												if (!checkedBacklinks[backlink.dataset.board + backlink.dataset.post]) { // Prevent reprocessing duplicate links
													checkedBacklinks[backlink.dataset.board + backlink.dataset.post] = true;
													var backlinkPost = $('#' + backlink.dataset.post);
													if (backlink.dataset.board === board && backlinkPost.length) { // If linked post is present in thread
														if (!backlinkPost.is(':visible')) { // Linked post isn't visible
															togglePost(postID, 'hide');
															return false;
														}
													}
												}
											});
										}
									}
								} // Show hide post buttons
								if (settings.UserSettings.postCounter.value) {
									postCounter();
								} // Update post counter
								if (settings.UserSettings.removeJfont.value) {
									$newPost.find('.text').removeClass('shift-jis');
								} // Remove japanese font formatting
								if (settings.UserSettings.labelDeletions.value) {
									$newPost.find('.icon-trash').html(' [Deleted]');
								} // Label deletions
							}
						}
					}
				}
			}
		});
	}

	var staticPosts = $('article.post');
	var onlyOP = $('article.thread[data-thread-num]:not(.backlink_container)');
	var staticPostsAndOP = staticPosts.add(onlyOP); // Save querying the staticPosts twice by extending the first query with the OP
	addFileSelect(); // Intialise ghosting image posting
	revealSpoilers();
	if (settings.UserSettings.headerBar.value) {
		headerBar();
	} // Customise headerbar behaviour
	mascot(parseMascotImageValue()); // Insert mascot
	if (settings.UserSettings.adjustReplybox.value) {
		adjustReplybox();
	} // Adjust reply box
	if (settings.UserSettings.inlineImages.value) { // Inline images
		$('.toggle-expansion').remove(); // Remove the native inline expansion button
		if (localStorage.expandpref === "yes") {
			localStorage.expandpref = "no";
		} // Disable native inline image expansion (might require a reload after to work?)
		if (!Page.is('statistics')) { // Stop this interfering with the images it displays
			$('#main img').each(function(i, image){
				var $image = $(image);
				$image.addClass('smallImage');
				if (Page.is('search,quests')) {
					if ($image.attr('width') >= 249 || $image.attr('height') >= 249) { // Assuming OP images are 250px limited across all archives might be false
						$image.addClass('thread_image');
					}
				}
				$image.removeAttr('width height');
			});
		}
		if (settings.UserSettings.inlineImages.suboptions.delayedLoad.value) {
			delayedLoad(staticPostsAndOP);
		} else {
			inlineImages(staticPostsAndOP);
		}
	}
	if (settings.UserSettings.removeJfont.value) {
		$('.shift-jis').removeClass('shift-jis');
	} // Remove japanese font formatting
	if (settings.UserSettings.inlineReplies.value) { // Inline replies
		staticPostsAndOP.each(function(i, post){
			$(post).addClass("base");
		});
	}
	if (settings.UserSettings.labelYourPosts.value) { // Label your posts
		if (Page.is('search,board,quests,gallery')) {
			if (board === "_") { // Handle finding the board per post for all-board searches
				$('article.post').each(function(i, post){
					var postBoard = $(post).find('.post_show_board').html().replace(/\//g, '');
					if (yourPostsLookup[postBoard] !== undefined) {
						if (yourPostsLookup[postBoard][post.id]) {
							$(post).find('.post_author').after('<span> (You)</span>');
						}
					}
				});
			} else { // Handle the lack of threadID for board indexes and single-board searches
				if (yourPostsLookup[board] !== undefined) {
					$('article.post, article.thread').each(function(i, post){
						if (yourPostsLookup[board][post.id]) {
							$(post).find('.post_author').after('<span> (You)</span>');
						}
					});
				}
			}
		} else { // Handle regular threads by iterating over the yourPosts values for that specific thread (better performance than per each post parsing)
			$.each(yourPosts[board][threadID], function(i, v){ // Parse all backlinks present on pageload
				$('#' + v).find('.post_author').after('<span> (You)</span>');
			});
		}
		$('.backlink').each(function(i, backlink){
			if (yourPostsLookup[backlink.dataset.board] !== undefined && yourPostsLookup[backlink.dataset.board][backlink.dataset.post.replace(',', '_')]) {
				backlink.textContent += ' (You)';
			}
		});
	}
	if (settings.UserSettings.embedImages.value) {
		embedImages(staticPostsAndOP);
	} // Embed images
	if (settings.UserSettings.inlineImages.value && !settings.UserSettings.inlineImages.suboptions.autoplayGifs.value) {
		pauseGifs($('img'));
	} // Stop gifs autoplaying
	if (!Page.is('other') && settings.UserSettings.relativeTimestamps.value) {
		relativeTimestamps(staticPostsAndOP);
		linkHoverEvent();
	} // Initiate relative timestamps
	if (Page.is('thread') && settings.UserSettings.postQuote.value) {
		$('.post_data > [data-function=quote]').each(function(){
			$(this).removeAttr('data-function'); // Disable native quote function
			$(this).addClass('postQuote'); // Make it findable so that inline posts will be handled
		});
	}
	if (settings.UserSettings.hidePosts.value) {
		$('.pull-left.stub').removeClass('stub'); // Show hide post buttons
		if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value) {
			$('article.post').each(function(i, val){
				$(val).find('.post_backlink').attr('id', 'p_b' + val.id);
			});
			$('article.post').filter(':hidden').each(function(i, post){ // Recursively hide pre-hidden posts
				recursiveToggle(post.id, "hide");
			});
		}
	}
	if (settings.UserSettings.adjustReplybox.suboptions.hideQROptions.value) {
		$('#reply').toggleClass("showQROptions"); // Make options hidden in QR by default
	}
	if (settings.UserSettings.postCounter.value) {
		postCounter();
	} // Update post counter
	if (settings.UserSettings.filter.value) {
		filter(staticPostsAndOP);
	} // Filter posts
	if (settings.UserSettings.labelDeletions.value) {
		$('.icon-trash').html(' [Deleted]');
	} // Label deletions

	$('#main').on('click', function(e){ // Detect clicks on page content
		if (settings.UserSettings.inlineReplies.value && $(e.target).hasClass("backlink")) { // Inline replies
			if (!e.originalEvent.ctrlKey && e.which == 1) {
				e.preventDefault();
				var etarget = e.target;
				var $etarget = $(etarget);
				var postID = etarget.dataset.post.replace(',', '_'); // Replace to deal with crossboard links
				var rootPostID = $etarget.closest('article.base').attr('id');
				if (etarget.parentNode.className == "post_backlink") {
					if ($etarget.hasClass("inlined")) {
						$etarget.removeClass("inlined");
						$('.sub' + rootPostID).each(function(index, currentPost){
							$("#" + currentPost.id.substr(1) + ".forwarded").removeClass("forwarded");
						});
						$('#i' + postID + '.sub' + rootPostID).remove();
					} else {
						$etarget.addClass("inlined");
						$(etarget.parentNode.parentNode).after('<div class="inline sub' + rootPostID + '" id="i' + postID + '"></div>');
						$("#" + postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id", "r" + postID).show().appendTo($("#i" + postID + '.sub' + rootPostID));
						$("#" + rootPostID + '.base .inline').each(function(index, currentPost){
							if (!$(currentPost).hasClass('sub' + rootPostID)) {
								$(currentPost).attr("class", "inline sub" + rootPostID);
							}
						});
						$("#i" + postID + " .post_wrapper").addClass("post_wrapperInline");
						if (settings.UserSettings.inlineImages.value) {
							inlineImages($('#r' + postID));
						} // Inline images
						addHover($('#i' + postID));
					}
				} else {
					if ($etarget.hasClass("inlined")) {
						$etarget.removeClass("inlined");
						$('.sub' + rootPostID).each(function(index, currentPost){
							$("#" + currentPost.id.substr(1) + ".forwarded").removeClass("forwarded");
						});
						$('#i' + postID + '.sub' + rootPostID).remove();
					} else {
						$etarget.addClass("inlined");
						$(etarget.parentNode).after('<div class="inline sub' + rootPostID + '" id="i' + postID + '"></div>');
						$("#" + postID).addClass("forwarded").clone().removeClass("forwarded base post").attr("id", "r" + postID).show().appendTo($("#i" + postID + '.sub' + rootPostID));
						$("#" + rootPostID + '.base .inline').each(function(index, currentPost){
							if (!$(currentPost).hasClass('sub' + rootPostID)) {
								$(currentPost).attr("class", "inline sub" + rootPostID);
							}
						});
						$("#i" + postID + " .post_wrapper").addClass("post_wrapperInline");
						if (settings.UserSettings.inlineImages.value) {
							inlineImages($('#r' + postID));
						} // Inline images
						addHover($('#i' + postID));
					}
				}
			}
		} else if (settings.UserSettings.postQuote.value && e.target.className === "postQuote") { // Better post quoting
			if (!e.originalEvent.ctrlKey && e.which == 1) {
				e.preventDefault();
				var postnum = e.target.innerHTML;
				var input = document.getElementById('reply_chennodiscursus');

				if (input.selectionStart !== undefined) {
					var startPos = input.selectionStart;
					//var endPos = input.selectionEnd;
					var startText = input.value.substring(0, startPos);
					var endText = input.value.substring(startPos);

					var originalText = input.value;
					var selectedText = getSelectionText();
					var newText;
					if (selectedText === "") {
						newText = startText + ">>" + postnum + "\n" + endText;
					} else {
						newText = startText + ">>" + postnum + "\n>" + selectedText + "\n" + endText;
					}
					document.getElementById('reply_chennodiscursus').value = originalText.replace(originalText, newText);
				}
			}
		} else if (settings.UserSettings.inlineImages.value && e.target.nodeName === "IMG") { // Expand images
			if (!e.originalEvent.ctrlKey && e.which == 1) {
				e.preventDefault();
				var image = $(e.target);
				image.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
				if (image.attr('gif')) {
					var canvas = image.next('canvas');
					canvas.toggle();
					image.toggle();
				} else {
					image.toggleClass("smallImage bigImage");
					$('#hoverUI').html('');
					image.trigger("mouseenter");
				}
			}
		} else if (settings.UserSettings.inlineImages.value && e.target.nodeName === "CANVAS") { // Expand images
			if (!e.originalEvent.ctrlKey && e.which == 1) {
				e.preventDefault();
				var canvas = $(e.target);
				var image = canvas.prev('img');
				canvas.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
				canvas.toggle();
				image.toggle();
				$('#hoverUI').html('');
				image.trigger("mouseenter");
			}
		} else if (settings.UserSettings.inlineImages.value && e.target.nodeName === "VIDEO") { // Expand videos
			var video = e.target;
			var $video = $(video);
			$video.toggleClass('bigImage'); // Make it full opacity to override spoilering
			$video.closest('.thread_image_box').find('.spoilerText').toggle(); // Toggle the Spoiler text
			if ($video.hasClass('fullVideo')) {
				if (!settings.UserSettings.inlineImages.suboptions.inlineVideos.suboptions.firefoxCompatibility.value ||
					e.pageY < (video.offsetTop + video.videoHeight - 28)) { // Firefox blows. FF controls are 28px tall at this point
					video.pause();
					video.muted = true;
					$video.attr('width', ($video.closest('article').hasClass('thread') ? imageWidthOP : imageWidth));
					$video.removeAttr('controls');
					$video.removeClass("fullVideo");
					window.setTimeout(function(){ // Firefox can suck my dick
						video.pause();
					}, 0);
				}
			} else {
				$video.removeAttr('width');
				$video.attr('controls', '');
				$video.addClass("fullVideo");
				video.muted = false;
				video.play();
			}
			$('#hoverUI').html('');
			$video.trigger("mouseenter");
		} else if (e.target.className === "btn-toggle-post" || e.target.parentNode.className === "btn-toggle-post") { // If a hide post button is clicked
			var button = e.target.className === "btn-toggle-post" ? e.target : e.target.parentNode;
			if (settings.UserSettings.hidePosts.suboptions.recursiveHiding.value) { // If recursive toggling is enabled
				if (button.attributes["data-function"].value === "showPost") {
					recursiveToggle($('article.doc_id_' + button.attributes["data-doc-id"].value).attr('id'), "show");
				} else if (button.attributes["data-function"].value === "hidePost") {
					recursiveToggle($('article.doc_id_' + button.attributes["data-doc-id"].value).attr('id'), "hide");
				}
			}
			var waitForNativeHide = setInterval(function(){ // Calling postCounter immediately does so before the native site toggles everything
				if ($(button).closest('.post, .thread').css('display') === "none") {
					clearInterval(waitForNativeHide);
					postCounter(); // Update post counter
				}
			}, 100);
		}
	});
});

var executeShortcut = function(shortcut){
	var input = document.getElementById('reply_chennodiscursus');

	if (input.selectionStart !== undefined) {
		$('#reply_chennodiscursus').selection('insert', {
			text: "[" + shortcut + "]",
			mode: 'before'
		});
		$('#reply_chennodiscursus').selection('insert', {
			text: "[/" + shortcut + "]",
			mode: 'after'
		});
	}
};

function quickReply(){
	$('#reply').toggleClass("quickReply");
	$('#reply fieldset > div:nth-child(1)').css("width", "");
	if ($('#reply').hasClass("showQROptions")) {
		$('#reply .pull-left:not(.input-append)').toggle();
	}
}

function quickReplyOptions(){
	$('#reply').toggleClass("showQROptions");
	$('#reply.quickReply .pull-left:not(.input-append)').toggle();
}

var favican = document.createElement("IMG");
favican.src = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.lit.value;
var exclam = document.createElement("IMG");
exclam.src = settings.UserSettings.favicon.suboptions.customFavicons.suboptions.alertOverlay.value;

function canfav(){
	$('#myCanvas').toggle();
	$('#myCanvas')[0].getContext("2d").drawImage(favican, 0, 0);
	$('#myCanvas')[0].getContext("2d").drawImage(exclam, 0, 0);
}
var imgIndex;
function galleryToggle(){
	console.time('gal');
	var $imageBoxes = $('.thread_image_box');
	if ($imageBoxes.length === 0 || $('#gallery').filter(':visible').length) {
		$('#gallery').hide();
	} else {
		$('#gallery').show();
		var viewportTop = window.scrollY;
		var viewportBottom = viewportTop + window.innerHeight;
		$imageBoxes.each(function(i, imageBox){
			imgIndex = i;
			if (imageBox.offsetTop + imageBox.offsetHeight > viewportTop) {
				if (imageBox.offsetTop >= viewportBottom) {
					imgIndex = i - 1;
				}
				return false; // break loop
			}
		});
		if (imgIndex == -1) {
			imgIndex = 0;
		}
		if (!$('#gallery').length) {
			$('body').append('<div id="gallery"></div>');
		}
		galleryUpdate();
	}
	console.timeEnd('gal');
}

function galleryChange(direction){
	if ($('#gallery').filter(':visible').length) {
		if (direction == "left") {
			if (imgIndex === 0) {
				imgIndex = $('.thread_image_box').length - 1;
			} else {
				imgIndex--;
			}
		} else if (direction == "right") {
			if (imgIndex == $('.thread_image_box').length - 1) {
				imgIndex = 0;
			} else {
				imgIndex++;
			}
		} else {
			console.log("Something went wrong boss.");
		}
		galleryUpdate();
	}
}

function galleryUpdate(){
	if ($('#gallery').length) {
		var imgList = $('.thread_image_box');
		if ($(imgList[imgIndex]).find('img').length) {
			$('#gallery').html('<img style="max-width:90%; max-height:90%;" src="' + $(imgList[imgIndex]).find('img')[0].src + '">');
		} else if ($(imgList[imgIndex]).find('video').length) {
			$('#gallery').html('<video style="float:left; max-width:90%; max-height:90%;" name="media" loop muted controls ' + autoplayVid + '><source src="' + $(imgList[imgIndex]).find('video')[0].currentSrc + '" type="video/webm"></video>');
		} else {
			console.log("Oh boy something gone wrong again!");
			console.log($(imgList[imgIndex]));
		}
		$(document).scrollTop($(imgList[imgIndex]).find('img, video').offset().top - 26);
	}
}

function populateSettingsMenu(){
	if ($('#settingsMenu').is(":visible")) {
		$('#settingsMenu').hide();
	} else {
		if (localStorage.SpookyXsettings !== undefined) {
			$.extend(true, settings, JSON.parse(localStorage.SpookyXsettings));
		}
		var settingsHTML = '<div id="Main">' + generateSubOptionHTML(settings.UserSettings, '') + '</div>';
		settingsHTML += '<div id="Filter">' + generateFilterHTML() + '</div>';
		$('#settingsContent').html(settingsHTML);
		if (!settings.UserSettings.filter.value) {
			$('#filterDisabledMessage').show(); // Show filter disabled message if the filter is disabled
		}
		$('#settingsMenu').show(); // Show the menu
		$('#settingsContent .suboption-list > :visible:last').addClass('last');
		$('#settingsContent > div').hide(); //  Hide all tabs
		$('#settingsContent #' + $('.sections-list .active').html()).show(); // Show active tab
		$('#settingsContent select, #settingsContent input').each(function(i, el){
			if (el.type !== "checkbox") { // Add the top margins for non-checkboxes to align description with name
				$(el).parent().next().addClass('selectDescription');
			}
			if (el.nodeName === "SELECT") { // Hide the settings join line for select options that start with one or less visible suboptions
				var visibleSubopsCount = 0;
				$(el).closest('div:not(.settingFlexContainer)').children('.suboption-list').children().each(function(i, subop){
					if ($(subop).css('display') !== "none") {
						visibleSubopsCount++;
					}
				});
				if (visibleSubopsCount <= 1) {
					$(el).closest('.settingFlexContainer').children('.settingsJoinLine').hide();
				}
			}
		});
		updateExportLink(); // Create the export link
	}
}

function generateFilterHTML(){
	var settingsHTML = '';
	var type;
	settingsHTML += '<div class="filters-list"><a href="javascript:;" class="active" name="guide">Guide</a>';
	for (type in settings.FilterSettings) {
		if (settings.FilterSettings.hasOwnProperty(type)) {
			settingsHTML += ' | <a href="javascript:;" name="' + type + '">' + settings.FilterSettings[type].name + '</a>';
		}
	}
	settingsHTML += '</div>';
	settingsHTML += '<div id="filter_guide" style="padding:4px;"><div id="filterDisabledMessage" style="color: #d14; background-color: #f7f7f9; text-align: center; font-size: 15px; display:none;">The Filter is currently disabled. Turn it on via the setting in the Main tab</div><p>Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions" style="text-decoration: underline;">regular expressions</a>, one per line. <br>Lines starting with a <code>#</code> will be ignored. <br>For example, <code>/weeaboo/i</code> will filter posts containing the string <code>weeaboo</code>, case-insensitive. <br><br>You can use these settings with each regular expression, separate them with semicolons: </p><ul> <li>Per boards, separate them with commas. It is global if not specified. <br>For example: <code>boards:a,tg;</code></li><li> Set the way the filter will handle the post with <code>mode</code><br>For example: <code>mode:hide;</code><br>Valid options are: <ul> <li><code>purge</code>: Remove the post from the page entirely, the site will need to reload the post for hoverlinks and such to work.</li><li><code>remove</code>: Remove the post from view but leave it in the page.</li><li><code>hide</code>: Collapse the post, leave a button to restore it.</li><li><code>fade</code>: Simply halve the opacity of the post. This is the default if the mode isn\'t specified.</li></ul> </li></ul></div>';
	for (type in settings.FilterSettings) {
		if (settings.FilterSettings.hasOwnProperty(type)) {
			settingsHTML += '<div id="filter_' + type + '" style="display: none;"><textarea name="' + type + '" spellcheck="false" class="filterTextarea">';
			$.each(settings.FilterSettings[type].value, function(i, line){
				if (i) {
					settingsHTML += '\n';
				}
				if (!line.comment) {
					if (line.regex !== undefined && line.regex.pattern !== undefined) {
						settingsHTML += "/" + line.regex.pattern + "/" + line.regex.flag + ';';
						for (var prop in line) {
							if (line.hasOwnProperty(prop) && prop !== "comment" && prop !== "regex") {
								settingsHTML += prop + ':' + line[prop] + ';';
							}
						}
					}
				} else {
					settingsHTML += line.comment;
				}
			});
			settingsHTML += '</textarea></div>';
		}
	}
	return settingsHTML;
}

function generateSubOptionHTML(input, path){
	var settingsHTML = '';
	$.each(input, function(key, value){
		if (value.name !== undefined) {
			var checked = '';
			var subOpsHidden = '';
			if (value.value) {
				checked = ' checked';
			} else {
				subOpsHidden = ' style="display: none;"';
			}
			if (value.if !== undefined) {
				var parentPath = objpath(settings.UserSettings, path.substring(0, path.length - '.suboptions.'.length));
				var pattTest = new RegExp(parentPath.value.value);
				var ifMet = false;
				$.each(value.if, function(i, v){
					if (pattTest.test(v)) {
						ifMet = true;
						return false;
					}
				});
				if (ifMet) {
					settingsHTML += '<div>';
				} else {
					settingsHTML += '<div style="display:none;">';
				}
			} else {
				settingsHTML += '<div>';
			}
			settingsHTML += '<div class="settingFlexContainer">';
			if (value.suboptions !== undefined && Object.keys(value.suboptions).length > 1) {
				settingsHTML += '<div class="settingsJoinLine';
				if (value.type === "checkbox") {
					settingsHTML += ' settingsJoinLineCheckbox';
				}
				settingsHTML += '"' + subOpsHidden + '></div>';
			}
			settingsHTML += '<label>';
			switch (value.type) {
				case "checkbox":
					settingsHTML += '<input type="checkbox" name="' + value.name + '" key="' + key + '"' + checked + ' path="' + path + key + '">';
					break;
				case "text":
					settingsHTML += '<input type="text" name="' + value.name + '" key="' + key + '" value="' + value.value + '" path="' + path + key + '">';
					break;
				case "number":
					settingsHTML += '<input type="number" name="' + value.name + '" key="' + key + '" value="' + value.value + '" path="' + path + key + '">';
					break;
				case "select":
					settingsHTML += '<select name="' + value.name + '" key="' + key + '" path="' + path + key + '">';
					$.each(value.value.options, function(i, v){
						settingsHTML += '<option';
						if (v == value.value.value) {
							settingsHTML += ' selected';
						}
						settingsHTML += '>' + v + '</option>';
					});
					settingsHTML += '</select>';
					break;
			}
			settingsHTML += value.name + ': </label><span class="description">' + value.description + '</span></div>';
			if (value.suboptions !== undefined) {
				settingsHTML += '<div class="suboption-list"' + subOpsHidden + '>' + generateSubOptionHTML(value.suboptions, path + key + '.suboptions.') + '</div>';
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
		if (value.suboptions !== undefined) {
			obj[key].suboptions = settingsStrip(value.suboptions);
		}
	});
	return obj;
}

$(function(){
	shortcut.add("ctrl+s", function(){
		executeShortcut("spoiler");
	});
	shortcut.add("ctrl+i", function(){
		executeShortcut("i");
	});
	shortcut.add("ctrl+b", function(){
		executeShortcut("b");
	});
	shortcut.add("ctrl+u", function(){
		executeShortcut("u");
	});
	shortcut.add("q", function(){
		quickReply();
	}, {"disable_in_input": true});
	shortcut.add("ctrl+q", function(){
		quickReplyOptions();
	}, {"disable_in_input": false});
	shortcut.add("f", function(){
		if (settings.UserSettings.favicon.value) {
			canfav();
		}
	}, {"disable_in_input": true});
	shortcut.add("g", function(){
		if (settings.UserSettings.gallery.value) {
			galleryToggle();
		}
	}, {"disable_in_input": true});
	shortcut.add("left", function(){
		if (settings.UserSettings.gallery.value) {
			galleryChange("left");
		}
	}, {"disable_in_input": true});
	shortcut.add("right", function(){
		if (settings.UserSettings.gallery.value) {
			galleryChange("right");
		}
	}, {"disable_in_input": true});
	shortcut.add("o", function(){
		populateSettingsMenu();
	}, {"disable_in_input": true});
	if (Page.is('thread')) {
		seenPosts();
		ThreadUpdate();
		window.setInterval(function(){
			ThreadUpdate();
		}, 250);
	}
});
