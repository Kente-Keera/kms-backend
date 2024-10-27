# NEST BASE AUTH

### JWT KEY

openssl rand -base64 60

{
id : string;
menu : {
dashbaord : {
c : 0;
r : 0;
u : 0;
d : 0;
}
product : {
c : 0;
r : 0;
u : 0;
d : 0;
}
}
}

Knowledge < Sub-cate < Cate < Group < User

Understand Type

type value in Schema

string = "backend,frontend"
json = {
["backend",fronend]
}

array = ["a","b","c"] //same type index = 0

data = ["a","b","c"]

data[0] = a
data[2]= c

object = { 0 , "abc" , true }

data = {
  name : "abc"
}

data.name = abc

**Important

const data = [
  {
    name : "aaa",
    value : 100
  },
  {
    name : "bbb",
    value : 200
  }
]


data[1].value = 200


//Object
  {
    name : "bbb",
    value : 200
  }

//JSON - String Only
  {
    "name" : "bbb",
    "value" : 200
  }

//FormData - Binary(File)


