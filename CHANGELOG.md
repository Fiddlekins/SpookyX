The changelog becomes progressively more comprehensive as I became progressively more committed to keeping it orderly. As such the changes for the earliest versions are not documented and some of these link to pastebins.

The links to individual versions below are to copies of the script with the update URL removed. If you want automatic updates, install the script from the links on the [main page](https://github.com/Fiddlekins/SpookyX).

**v24.9:** *(2015-04-13)* - [GitHub](https://github.com/Fiddlekins/SpookyX/raw/v24.9/SpookyX-noupdate.user.js)
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
