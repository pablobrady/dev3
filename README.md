# dev3
Dev3 - My hand-coded, responsive portfolio site.

## Sample Screenshots

### On the Desktop...
![Sample desktop screenshot](https://github.com/pablobrady/dev3/blob/73cfca4024709846c764ba6a728199194640ba86/screenshot-Desktop.jpg)

### On a Mobile Device...
![Sample mobile screenshot](https://github.com/pablobrady/dev3/blob/73cfca4024709846c764ba6a728199194640ba86/screenshot-Mobile.jpg)



## Getting Started

1. Install Grunt-cli with ```npm install -g grunt-cli```.

2. Install the other npm packages with ```npm install```.

3. Run Grunt with ```grunt```.


## Starting the Grunt/Sass watch process

Running ```grunt``` from the command line, will...

1. jsLint the app.js

2. Uglify the app.js into app.min.js (referenced in index.html)

3. Start watching the Sass (.scss) file for changes.

4. The Watch process will continue running until you stop it (ex. with ctrl-c).


Be sure the only CSS you edit is in the "/Sass/main.scss" file.  
These compiled changes will overwrite the contents of "/public/css/main.css".


Or, running ```grunt dev``` from the command line, will...

1. jsLint the app.js
2. Uglify the app.js into app.min.js
3. Compile the .scss file *ONLY ONCE*, and then exit.


## Visit the Live Site
You can visit my latest portfolio site [here](http://www.pbrady.net).  
Grazie!

