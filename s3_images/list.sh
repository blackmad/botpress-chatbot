#!/bin/sh

for i in $(ls * | egrep -v sh); do
    echo "http://duckdebug.s3.amazonaws.com/images/$i";
done
