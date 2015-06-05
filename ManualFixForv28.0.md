# Updating to v28.0

I've done it again, hopefully for the last time now.

Long story short my fix for the postID comparison didn't work properly on threads with intermingled normal and ghost posts.

If you look at the stored data for the lastSeenPosts key you should see entries that resemble
```
"39278995": "39278995760"
```
and basically they need to look like
```
"39278995": "39278995_760"
```
for the latest version of the script to recognise which part is the the ghost post number.

Since this simply records which post you last saw in a thread most of you won't be bothered (I imagine) by simply deleting the store and rebuilding it anew from the threads you go on read.

To do so simply access your browser console and submit the following:
```
localStorage.removeItem('lastSeenPosts')
```

If you wish to manually amend the entries and so keep a record of which threads you've read up to what point then see [this page](https://github.com/Fiddlekins/SpookyX/blob/v26/ManualFixForv26.md) for instructions on how to access the data, edit it and replace it.
