Get a request with file and info
put info in db
write file to folder
put file location in redis
  only set redis to true if found in folder
    then just trust redis
  if redis info doesnt exist check db
    update redis if true, update to true if in folder
get request at url to find it
