## BOOTSTRAP TAG MANAGER
A javascript library that can be used to generate Bootstrap (5.1.3) components quickly. For now, it doesn't support additional HTML content, non-bootstrap classes, and other attributes.

## DOCUMENTATION

### function:HTMLElement
* ```ts addBootstrap(css:boolean,js:boolean)``` Imports Bootstrap, only the 5.1.3 version right now.
* ```ts genContainer(breakpoint:string)``` Returns a container node with an optional breakpoint class.
* ```ts genRow(cols)``` Returns a row node with optional column nodes. The cols parameter can be a ```number```(appends that many row children), ```number[]```(each item is a column, with the number being its width), or ```string[]```(each item is a column, with the string being the classes after row- in bootstrap).
* ```ts genCol(param)``` Returns a column node with an optional breakpoint and/or column span class from the parameter.
* ```ts genGrid(rows,breakpoint)``` Returns a grid, with an optional row-column layout and breakpoint class. The rows parameter is an array of row parameters (see ```genRow(cols)```).

### function:void
* ```ts initializeTooltips()``` Returns a grid, with an optional row-column layout and breakpoint class. The rows parameter is an array of row parameters (see ```genRow(cols)```).

## TODO