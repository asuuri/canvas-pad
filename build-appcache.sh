#!/bin/bash

version=`git rev-parse HEAD`

echo "CACHE MANIFEST" > canvas.appcache
echo "# Version ${version}"  >> canvas.appcache
find ./ -type f -regextype posix-egrep -regex '.+\.(js|css|html|png|json)' | sed 's/.\///' >> canvas.appcache