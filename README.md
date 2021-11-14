## BOOTSTRAP TAG MANAGER
A javascript library that can generate Bootstrap (5.1.3) components from custom HTML tags, so I won't have to carry the get started page with me everywhere.<br>

## CHANGELOG
2021.11.14:
- merged btag attributes: ```<tag b-attr="flush,noautoclose,..."```
- rewrote parser with a new structure in mind
- moved attribute collector into a separate function
- attribute collector now collects btag and normal attrs into an object, separately
- generators now re-apply every attribute after parsing, and use them during generation (ids for ex.)

## TODO
* Finishing the remaining generators.
* Maybe bootstrap/other icons.
* ...

## DOCUMENTATION

### custom HTML tags
**ACCORDION**<br>
Source: [getbootstrap.com](https://getbootstrap.com/docs/5.1/components/accordion/)<br>
A list of dropdowns. By default, only one ai can be open per list (opening one autocloses the other ones), which can be disabled with the noautohide attribute. Flush removes background color, border, and rounded corners.<br>
Syntax:
```<accordion b-attr="noautohide, flush" />```
```<ai header="innerHTML" b-attr="show" />```
```html
<!-- ACCORDION -->
<accordion>
    <ai>dropdown body 1</ai>
    <ai header="this is some header 1">dropdown body 2</ai>
    <ai header="header &nbsp; <s> 3 </s> &nbsp; 2 with HTML">dropdown body 3</ai>
</accordion>
<!-- WITH MODIFIERS -->
<accordion b-attr="noautohide,flush">
    <ai header="open by default" b-attr="show">this should be visible, and...</ai>
    <ai header="noautohide">these won't close after another <code>ai</code> is opened</ai>
</accordion>
```

### function:void
```ts 
addBootstrap(css:boolean,js:boolean)
// Import (5.1.3) bootstrap.min.css, and/or bootstrap.bundle.min.js based on the parameters.
```

```ts
// Enable all bootstrap tooltips.
enableTooltips()
```

```ts
// Enable all bootstrap popovers.
enablePopovers()
```
