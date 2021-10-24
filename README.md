## BOOTSTRAP TAG MANAGER
A javascript library that can be used to generate Bootstrap (only 5.1.3 for now) components quickly. It doesn't support additional HTML content, non-bootstrap classes, and other attributes yet.

## DOCUMENTATION

### custom HTML tags
```html
<!-- ACCORDION-->
<accordion>
    <ai header="this is some header 1">this is the collapsable body 1</ai>
    <ai header="this is some header 2">which can have <code>HTML</code> in it</ai>
</accordion>
<!-- ACCORDION WITH MODIFIER ATTRIBUTES -->
<accordion type="flush" open="always">
    <ai header="should be open" show="show">this should be visible</ai>
    <ai header="independant collapse">also these shouldn't close after another <code>ai</code> (accordion item) is opened</ai>
</accordion>
```

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
genAccordion(attrs:[],parentNode:Node,innerHTML:string)
// Returns a new accordion node.
// - attrs:[] can contain: 
// - number[] (each item is a column, with the number being its width)
// - string[] (each item is a column, with the string being the classes after row- in bootstrap).
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
