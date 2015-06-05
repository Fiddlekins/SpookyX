# SpookyX
Extend functionality on FoolFuuka imageboards.
Only actually tested on the [moe archives](https://archive.moe) so the rest are theoretical.
#### [Changelog](https://github.com/Fiddlekins/SpookyX/blob/master/CHANGELOG.md)

(This builds off of the original FoolX script which can be downloaded at: https://dl.dropbox.com/s/5fxjiuig4vnkgte/FoolX.user.js)

### [Click to Install](https://github.com/Fiddlekins/SpookyX/raw/master/SpookyX.user.js)
Or if you don't want automatic updates use [this version](https://github.com/Fiddlekins/SpookyX/raw/master/SpookyX-noupdate.user.js).
### Firefox:
Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), then click the link above to install SpookyX. If you're using a fork of Firefox (e.g. Pale Moon), you may need to use [Greasemonkey 1.15](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/versions/#version-1.15) instead of the most recent version. No idea if SpookyX works on an old version of Greasemonkey though.
### Chrome:
Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), then click the link above to install SpookyX.
### Opera:
Install [Violentmonkey](https://addons.opera.com/en-gb/extensions/details/violent-monkey/), then click the link above to install SpookyX. An alternative that I have yet to test thoroughly is [Tampermonkey Beta](https://addons.opera.com/en-gb/extensions/details/tampermonkey-beta/?hidemessage=1), give this a try if the script doesn't seem to be working properly in Violentmonkey.
 
## Added Features:
#### Settings Menu
- This can be opened using the 'Settings' link in the top right of the window or by pressing 'O'

#### Embedding linked images (and other media) into the post to imitate imageboard use in the Spooky realm
- Hyperlinks in posts will be checked for known file extensions and embedded accordingly
- A media link that is enclosed in spoiler tags will be embedded in spoilered mode
- Middle click and ctrl+leftclick open images in a new tab rather than toggle size
- More than a single image can be embedded by editing the script by changing the 'Embed Count' setting

#### Hovering over images or videos 
- Show full version of media or one shrunk to fit in view if it's too large
- You can turn off images or turn off videos independently via the settings menu

#### Gallery Mode that lets you browse through all thread images and videos.
- Press 'G' to bring it up, press it again to hide it once more.
- Left and right arrow keys are used to cycle through the images.
- Scrolls to the currently viewed image

#### Pressing Q (Outside of text entry fields) will toggle quick reply mode
- This moves the reply box to the top right of the screen and it stays where it when you scroll
- Pressing ctrl+Q will toggle showing the subject, name, email, password fields when in quick reply mode

#### Clicking post links and post reply links will expand them inline
- Inline posts will be removed from their normal place and restored when no longer inline
- Middle click and ctrl+leftclick opens these links in a new tab instead
- In the current version opening a mix of links and backlinks will result in buggy behaviour

#### Highlighting text and clicking a post number will insert both into the reply field
- The text is not post specific, nor is it constrained to posts

#### Your posts and links pointing to them will be designated by appending '(You)'
- Receive desktop notifications when someone replies to you
- Clicking the notification will take you to the relevant tab

#### Dynamic favicon that indicates whether a thread has new posts and whether any are replies to yours
- See options below for instructions on customising the favicons used for each of these states
- Activating this feature will also turn on the more advanced seen post counter which will keep track of the last post you saw in a thread and persist between sessions
- The cut off point between seen and unseen posts is designated with a horizontal red line

#### Recursive post hiding
- Hiding a post will hide all posts that reply to it
- Likewise, unhiding a post will show all posts that reply to it

#### Relative timestamps
- Hovering over them will show the 4chan timestamp for the post

#### Filter
- Under the filter tab of the settings menu you can customise how you filter thread content
- A variety of post details can be checked against [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- Can be filtered in different ways, see the Guide tab in the settings menu

#### Mascot
- You can now choose your plucky mascot to keep your company whilst browsing!
- This feature overlays an image on your page
- Can also be used to set a wallpaper

#### Fixed bugs present in the original FoolX:
- Using keyboard shortcuts to wrap highlighted text in tags no longer wraps the first instance if there are multiple instances of the highlighted text in the reply box.
- Inline OP images work
 
## Customising the favicons:
You can use custom favicons by changing the URLs in the settings menu.

The Alert Overlay is a URL to the image you wish to use as an overlay on a custom lit favicon.

Unfortunately due to security policy it cannot automatically overlay the images and set that as the favicon. Instead:
- you will need to set your custom lit or custom alertOverlay (or both)
- reload a moe page with the script running and a reply box present (such as in a thread)
- hit 'F' to bring up by the reply box a image with the output alert image
- right click and save this image
- upload it somewhere
- set the alert option in the script to equal that URL
