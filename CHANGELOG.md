The changelog becomes progressively more comprehensive as I became progressively more committed to keeping it orderly. As such the changes for the earliest versions are not documented and some of these link to pastebins.

The links to individual versions below are to copies of the script with the update URL removed. If you want automatic updates, install the script from the links on the [main page](https://github.com/Fiddlekins/SpookyX).

**v28.2:** *(2015-06-09)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v28.3/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v28.3/README.md)
- New Feature: postFlow. This allows you to change the width, placement and alignment of the posts
- Submitting a post and changing the tab before it goes through will now no longer make the tab title indicate you have an unseen post in that thread (more precisely your posts are no longer added to the list of unseen posts)
- Posting failure now creates a notification to alert you
- Added customisable opacity of the mascot
- Added an option to allow mascots to be click-through (it can overlay a button or link but won't stop you clicking it)
- Crossthread and crossboard links now recognise the destination posts as being yours (if you made them)
- Moved the 'button' that opens the settings menu to a higher z-index level (10 now) so that the mascot won't overlay it (unless it's above 10 itself)
- The gallery feature is now fixed (I completely killed it with one of the updates) and has had both performance and image finding accuracy improved
- fixed bug where trying to expand crossboard posts inline failed
- fixed bug where nothing worked on the last 50 replies thread view
- fixed bug where mousing over the mascot triggered the image hover feature when in higher z-index levels
- fixed bug where some media links were not being embedded correctly
- fixed bugs that arose when the script was running on pages that weren't threads (searches, board index, etc)

**v28.2:** *(2015-06-05)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v28.2/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v28.2/README.md)
- The mascot feature now supports videos
- You can now specify the width of the mascot

**v28.1:** *(2015-06-05)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v28.1/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v28.1/README.md)
- fixed bug where is the last seen post is a non-ghost post it wasn't being removed from the list of unseen posts on page load

**v28.0:** *(2015-06-05)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v28.0/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v28.0/README.md)
- New Feature: Mascot. Pick your browsing companion!
- Added filter settings to the settings menu, expanded their funtionality
- Massive performance gains, should make browsing threads with thousands of posts more bearable
- Unchecked options in the settings menu have their suboptions collapsed
- fixed bug where the last seen post ID was still being compared incorrectly. This will unfortunately require you to delete the lastSeenPosts item from the browser's Local Storage since the stored values have incomplete information. See [here](https://github.com/Fiddlekins/SpookyX/blob/v28.0/ManualFixForv28.0.md) for further instructions
- fixed bug where expanding an image hid the filename if it wasn't a spoilered image
- fixed bug where media links ending in non-lowercase file extensions were being ignored

**v27.6:** *(2015-05-22)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.6/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.6/README.md)
- fixed bug where image dimensions were appearing twice in some instances

**v27.5:** *(2015-05-19)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.5/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.5/README.md)
- Added file details to embedded Imgur image collections that aren't albums
- fixed bug with the tests to determine whether to remove a linebreak whilst removing a link where a previous node that was null caused an error
- fixed bug where imgur album links to a specific image of the set (the url ends in #number) were being embedded incorrectly

**v27.4:** *(2015-04-29)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.4/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.4/README.md)
- Added some links to the settings menu that takes you to the various github pages
- Made multiple embedded images embedded in the order the links were written, rather than the reverse
- Made linebreaks at the end of a line with an image link get remove alongside the link so long as there isn't any text on the same line
- Imgur albums can now be embedded provided the link is of the form "https://imgur.com/a/12qoX". This is accompanied by a new setting, 'Show Details'
- fixed bug where when embedding multiple images the dimensions were all appended to the first one
- fixed bug where when embedding multiple spoilered images only the spoiler text of the first one was centered.

**v27.3:** *(2015-04-28)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.3/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.3/README.md)
- Massive performance boost for recursive hiding
- fixed bug where quoting a post threw an error in the console (it was interfering with the site's native javascript)
- fixed bug where the gallery couldn't scroll to videos

**v27.2:** *(2015-04-27)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.2/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.2/README.md)
- Made the hide post button hidden from the popup posts when you hover over reply links and the inline posts from when you click them
- Made it such that hidden posts that are embedded inline by clicking a reply link are visible rather than showing as a small square

**v27.1:** *(2015-04-27)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27.1/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27.1/README.md)
- fixed bug where it just plain didn't work in Firefox
- fixed bug where inline posts can't be quoted

**v27:** *(2015-04-27)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v27/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v27/README.md)
- New Feature: Settings menu. Hit 'O' or click on the 'Settings' link in the top right to bring up the menu. Settings are saved as they are changed, refresh the page for the changes to fully take effect
- Gallery mode scrolls the page to the viewed image
- The last seen post line updates when the tab leaves focus. This should mimic the behaviour of the 4chanX extension and is less distracting than having it update as you read the thread

**v26.1:** *(2015-04-23)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v26.1/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v26.1/README.md)
- Adjusted the media link detection so that the file-extension doesn't strictly have to be at the end of the URL. If the extension is followed by a question mark and then other characters it will be detected, an example of a newly detected link is https://cdn.artstation.com/p/assets/images/images/000/643/001/large/benedick-bana-blood-blades2.jpg?1429603884

**v26:** *(2015-04-18)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v26/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v26/README.md)
- New feature: relative post times
- fixed bug where thread IDs weren't board specific which meant that the script considers the Xth thread on one board the same as the Xth thread on another board. This unfortunately requires manual adjustment of locally stored data for previous records to be accessed, see [here](https://github.com/Fiddlekins/SpookyX/blob/v26/ManualFixForv26.md) for instructions
- fixed bug where if the archive has scrubbed a 4chan native posted image's thumbnail it would perpetually try to reload it
- fixed bug where the last seen post ID was being compared to the list of unseen posts lexicographically
- fixed bug where it would try to embed invalid imgur gallery links

**v25:** *(2015-04-16)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v25/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v25/README.md)
- New Feature: Recursive Hiding. Manually hiding a post will hide all replies to it
 - Unhiding a post will recursively show all replies to it
- updated the way media links are embedded.
 - It now checks the links for a relevant file extension rather than a recognised media site
 - Links to videos wrapped in spoiler tags are now actually spoilered
 - Media resolution displayed below media
- fixed bug where imgur galleries were embedded in reverse order

**v24.9:** *(2015-04-13)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v24.9/SpookyX-noupdate.user.js) - [Readme](https://github.com/Fiddlekins/SpookyX/blob/v24.9/README.md)
- Set GitHub up such that I can link to manual update past versions

**v24.8:** *(2015-04-13)* - No archive
- New Feature: Pressing 'G' will bring up a gallery view of all images and videos in the thread. Use left and right arrow keys to cycle through them.
 
**v24.7:** *(2015-04-08)* - [Pastebin](http://pastebin.com/PP4WjJVb)
- fully fixed the bug where dead images trigger perpetual attempts to reload. Dead native 4chan images switch to their thumbnail once again
 
**v24.6:** *(2015-04-08)* - [Pastebin](http://pastebin.com/GhR2BDS5)
- fixed bug where embedded images that cannot load (dead link, not actually an image...) would cause perpetual attempts to reload it. This current iteration of the fix is simply disabling the code that switches a dead native 4chan image to its thumbnail, so they'll be broken again for now
 
**v24.5:** *(2015-04-08)* - [Pastebin](http://pastebin.com/rqaVcJXe)
- New Feature: embed the images from links to Imgur galleries in the post for ease of image dumping
 
**v24:** *(2015-03-29)* - [Pastebin](http://pastebin.com/KhNhwKuh)
- New Feature: image and video hover.
- fixed bug where images for which the archives have deleted the fullsized image but not the thumbnail were being replaced by the dead link. They now don't get replaced
- fixed bug where have multiple tabs of the same thread open was able to save an incorrect last post seen value
 
**v23:** *(2015-03-28)* - [Pastebin](http://pastebin.com/af1UrQCJ)
- New Feature: the favicon now changes to indicate unread posts and replies to your posts
- In addition the favicon feature will make SpookyX keep track which posts you have viewed on your screen. Whereas before if you returned to a tab with new posts it would set the counter to zero regardless of if you saw them it now decrements as you scroll through the new ones
 
**v22:** *(2015-03-27)* - [Pastebin](http://pastebin.com/87j6bZDs)
- Embedded images now have their filename above them. Hover to read their full link
- Favicon changes to indicate if there are new posts or not
 
**v21:** *(2015-03-27)* - [Pastebin](http://pastebin.com/cWqa00Qw)
- New Feature: Desktop notifications when someone replies to you
- fixed bugs with designating your posts and the links
- fixed bug where videos were being dual-loaded and issues with them being muted in FireFox
- fixed bug such that the labelYourPosts option now actually does something
 
**v20:** *(2015-03-27)* - [Pastebin](http://pastebin.com/3Cb7VMTg)
- New Feature: recognise your posts. SpookyX will append '(You)' to the name of your posts and to the links that point to it
- Added: video autoplay option
- Added: other FoolFuuka boards to the list
- Added: filteredNames option. Names that match the list will be collapsed
- fixed bug where posts with files posted on 4chan were being ignored by the imgNum value
- fixed bug where filtered posts that get collapsed sometimes loaded expanded
- fixed 4chan-native .webm thumbnails - the webms are now embedded instead
- fixed 4chan-native .sfw thumbnails
- Tweaked the shitpost filter lists. Still far from perfect
