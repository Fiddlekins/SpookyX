# Updating to v26

With v26 I changed the way the last seen postID of a thread and the postIDs of posts you make are stored locally. This was to avoid an issue where interacting with two threads on two different boards that share the same threadID were originally sharing the same storage space.

Unfortunately, this means that you need to manually edit the stored values if you wish to restore the list of posts you made and what you last saw.

**Q**: Why don't I just do this programatically? Is it because I hate you?

**A**: No, it's because if you've used multiple boards with the extension you'll need to ensure that you get the threads sorted into the right board categories and this isn't something that can be done programatically (unless I can somehow read your history, I guess)

**Q**: Do you really have to do all this?

**A**: No, leaving it untouched won't break anything at all. SpookyX will simply no longer recognise the posts you made prior to the update as your own anymore and threads you once read will appear unread.

## Instructions:
Firstly disable the SpookyX extension and then reload or close all existing moe.archive tabs.
Failing to thoroughly do so will cause your changes to be lost when you reload or exit them later on.

### Chrome:
1. Hit ctrl+shift+J or right click and select 'Inspect Element' to bring up the developer tools whilst on the moe archives
2. Select the 'Resources' tab
3. From the list in the side panel click the drop down arrow next to 'Local Storage' and select 'https://archive.moe'
4. You should be presented with at least a couple of items. The ones we're interested in are 'lastSeenPosts' and 'yourPosts'

#### lastSeenPosts
1. Double click the text in the 'Value' column and copy it
2. Visit [this site](http://jsonviewer.stack.hu/) and paste the contents in
3. Click the 'Format' button
You should be presented with something like this:
```
{
  "39374173": "39374173695",
  "39394294": "3939433699",
  "123224731": "123224731"
}
```
Or, if you've entered a thread since updating, something like this:
```
{
  "39374173": "39374173695",
  "39394294": "3939433699",
  "123224731": "123224731",
  "tg": {
    "39278995": "39278995760",
    "39374173": "39374173976",
    "39394294": "39394336788"
  }
}
```
Of the pairs the first number is the thread ID and the second is the last seen post ID. If you've browsed more than a single moe board then you'll need to check which threads were on which board (if you can be bothered)
For example, the third entry is [123224731](https://archive.moe/tg/thread/123224731/) which doesn't exist on the /tg/ board. You'll need to make educated guesses about which board it does point to, or failing that, just delete it and move on.
4. Cut and paste the entries until you end up with something looking like this:
```
{
  "tg": {
    "39374173": "39374173695",
    "39394294": "3939433699",
    "39278995": "39278995760",
    "39374173": "39374173976",
    "39394294": "39394336788"
  },
  "a": {
    "123224731": "123224731"
  }
}
```
5. Once done click the 'Remove white space' button
6. Copy the text and return to the archive.moe page, double click the relevant entry again and paste this new one in to overwrite the original
7. Click elsewhere, or hit enter and it's done

#### yourPosts
Same proceedure as for the lastSeenPosts.
You'll find something similar to (but much longer than):
```
{
  "39278995": [
    "39278995_627",
    "39278995_631"
  ],
  "39374173": [
    "39374173_964",
    "39374173_965"
  ],
  "39394294": [
    "39394336_662",
    "39394336_664"
  ]
}
```
Or again, if you've browsed since the update, something like this:
```
{
  "39278995": [
    "39278995_627",
    "39278995_631"
  ],
  "39374173": [
    "39374173_964",
    "39374173_965"
  ],
  "39394294": [
    "39394336_662",
    "39394336_664"
  ],
  "tg": {
    "39278995": [
      "39278995_759",
      "39278995_760"
    ],
    "39374173": [
      "39374173_972",
      "39374173_976"
    ],
    "39394294": [
      "39394336_776",
      "39394336_778"
    ]
  }
}
```
You'll want to cut and paste bits around until it looks like this:
```
{
  "tg": {
    "39278995": [
      "39278995_627",
      "39278995_631",
      "39278995_759",
      "39278995_760"
    ],
    "39374173": [
      "39374173_964",
      "39374173_965",
      "39374173_972",
      "39374173_976"
    ],
    "39394294": [
      "39394336_662",
      "39394336_664",
      "39394336_776",
      "39394336_778"
    ]
  }
}
```
Take note that if you've posted in the same thread before and after you'll need to merge them by moving the values rather than having duplicates.
Add commas as necessary.

### Firefox:
Okay, so you guys can't edit your locally stored values manually through the developer tools as easily as those running Chrome. The rest of the proceedure is the same.

#### To access the variable
1. Right click and select 'Inspect Element' whilst on a moe archive page
2. Go to the console
3. Type in ```console.log(localStorage.lastSeenPosts)``` or ```console.log(localStorage.yourPosts)```
4. Hit enter
5. Highlight and copy the output
6. Resume the Chrome instructions

#### To store the lastSeenPosts variable
1. Access the console again
2. Type in ```localStorage.lastSeenPosts = JSON.stringify('X')``` where X is the text you're replacing the variable with.
Make sure you keep the quote marks so that it looks something like ```localStorage.lastSeenPosts = JSON.stringify('{"38909... ...9598"}')```
3. Hit enter

#### To store the yourPosts variable
1. Same as with the other one, but like this:
2. Type in ```localStorage.yourPosts = JSON.stringify('X')``` where X is the text you're replacing the variable with.

## Once you're finished
If you're done editing the locally stored values you can turn SpookyX back on and refresh any archive tabs and you'll be back in business.
