#!/bin/sh
curl 'https://raw.githubusercontent.com/4chenz/archives.json/gh-pages/archives.json' | jq -jr '.[] | select(.software == "foolfuuka") | (select(.http == true) | "http://", .domain, "\n" ), (select(.https == true) | "https://", .domain, "\n")' | sort --field-separator=: --key=2 | sed -e 's;^;// @include       ;' -e 's;$;/*;'

#Sample output:
#// @include       http://arch.b4k.co/*
#// @include       https://arch.b4k.co/*
#// @include       http://archive.4plebs.org/*
#// @include       https://archive.4plebs.org/*
#// @include       http://archived.moe/*
#// @include       https://archived.moe/*
#// @include       http://archiveofsins.com/*
#// @include       https://archiveofsins.com/*
#// @include       https://archive.palanq.win/*
#// @include       https://boards.fireden.net/*
#// @include       http://desuarchive.org/*
#// @include       https://desuarchive.org/*
#// @include       https://thebarchive.com/*
#// @include       http://thebarchive.com/*
#// @include       https://www.tokyochronos.net/*
