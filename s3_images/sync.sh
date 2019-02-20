#!/bin/sh

aws s3 sync . s3://duckdebug/images/ --acl public-read
