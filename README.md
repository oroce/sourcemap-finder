sourcemap-finder
==============

find the original position of row and column using sourcemap.

install
==============

`npm install -g smfinder`


how to use
==============

`smfinder --position 1200:10 your-source-map`

or 

`smfinder -row 1200 --column 10 http://your-source-map`


example
=============

`smfinder -P 1000:1 http://code.jquery.com/jquery-2.0.3.min.map` will print
  
   {
    "source": "jquery-2.0.3.js",
    "line": 8829,
    "column": 4,
    "name": "window"
  }

why?
==============

because i did this snippet like 20 times already and i don't want to write it again:)


LICENSE
==============

MIT