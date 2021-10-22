## BOOTSTRAP TAG MANAGER
A javascript library that can be used to generate Bootstrap (only 5.1.3 for now) components quickly. It doesn't support additional HTML content, non-bootstrap classes, and other attributes yet.

## DOCUMENTATION

### function:HTMLElement
```ts 
addBootstrap(css:boolean,js:boolean)
// Imports Bootstrap, only the 5.1.3 version right now.
```

```ts
genContainer(breakpoint:string)
// Returns a container node with an optional breakpoint class.
```

```ts
genRow(cols:number)
genRow(cols:number[])
genRow(cols:string[])
// Returns a row node with optional column nodes.
// The cols parameter can be:
// - number   (appends that many row children)
// - number[] (each item is a column, with the number being its width)
// - string[] (each item is a column, with the string being the classes after row- in bootstrap).
```

```ts
genCol(param:string)
genCol(param:number)
// Returns a column node with an optional breakpoint and/or column span class from the parameter.
```

```ts
genGrid(rows,breakpoint:string)
// Returns a grid, with an optional row-column layout and breakpoint class.
// The rows parameter is an array of row parameters (see genRow(...)).
```

### function:void
```ts
enableTooltips()
// Enables all tooltips.
```

```ts
enablePopovers()
// Enables all popovers.
```

## TODO
* Finishing the generators.
* Changing the btags variable to an object which includes everything needed to convert the custom tags.
* Multiple bootstrap version support.
* Maybe bootstrap/other icons.
* ...
