# BOOTSTRAP TAG MANAGER
A javascript library that can generate Bootstrap (5.1.3) components from custom HTML tags, so I won't have to carry the get started page with me everywhere.<br>

# CHANGELOG
2021.11.14:
- merged btag attributes: ```<tag b-attr="flush,noautoclose,..."```
- rewrote parser with a new structure in mind
- moved attribute collector into a separate function
- attribute collector now collects btag and normal attrs into an object, separately
- generators now re-apply every attribute after parsing, and use them during generation (ids for ex.)

# TODO
* Finishing the remaining generators.
* Maybe bootstrap/other icons.
* Set primary color as default on other components too, not just for buttons.
* Maybe add a button with a badge on its top right corner as an individual component
* Maybe move the breadcrumb separator character to an attribute.
* Have a minimized variant.

# HOW TO USE
* Include **btag.js** somewhere.
* (Optional: include **bootstrap 5.1.3** automatically with ```addBootstrap(true,true)```)
* Run ```parseCustomTags()``` at the end of the page.




## ACCORDION ([docs](https://getbootstrap.com/docs/5.1/components/accordion/))
A list of dropdowns. By default, only one ai can be open per list (opening one autocloses the other ones), which can be disabled with the noautohide attribute. Flush removes background color, border, and rounded corners.

**Attributes**:
- accordion: ```b-attr: noautohide, flush```
- ai: ```header: <any HTML>```, ```b-attr: show```
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



## ALERT ([docs](https://getbootstrap.com/docs/5.1/components/alerts/))
A simple text block with different colors with static and a dismissible variant. When the dismiss attribute is set, it will create a button on the right side of the alert to close it. Fade just sets the fade animation, and show makes it visible by default (useful only for dismissible alerts).

**Attributes**: ```b-attr: <a color>, dismiss, fade, show```<br>
**Colors**: ```primary, secondary, success, danger, warning, info, light, dark```
```html
<!-- NORMAL AND DISMISSIBLE ALERT -->
<alert>basic</alert>
<alert b-attr="danger">red</alert>
<alert b-attr="success, dismiss, fade, show">green</alert>
```



## BADGE ([docs](https://getbootstrap.com/docs/5.1/components/badge/))
A small inline text block with different background colors (automatically sets the text color to light/dark). Pill makes the corners more rounded.

**Attributes**: ```b-attr: <a color>, pill```<br>
**Colors**: ```primary, secondary, success, danger, warning, info, light, dark```
```html
<!-- NORMAL AND PILL BADGES -->
<badge>Basic</badge>
<badge b-attr="primary">Primary</badge>
<badge b-attr="warning,pill">Warning</badge>
```



## BREADCRUMB ([docs](https://getbootstrap.com/docs/5.1/components/breadcrumb/))
A visualized path, separated with ```/``` by default, but can be changed with css to another character, or even svg/image with url(). Also works like a list, and using the active attribute on a list item (the last one makes the most sense) makes that a bit lighter.

**Attributes**:
- breadcr: *none*
- bi: ```b-attr: active```
```html
<!-- BREADCRUMB -->
<breadcr>
    <bi>Home</bi>
    <bi>Downloads</bi>
</breadcr>
<!-- BREADCRUMB + CUSTOM DIVIDER -->
<breadcr style="--bs-breadcrumb-divider: '>';">
    <bi><a href="#">Home</a></bi>
    <bi><a href="#">Downloads</a></bi>
    <bi><a href="#">Twitch</a></bi>
    <bi b-attr="active">src</bi>
</breadcr>
```



## [WIP] BUTTON ([docs](https://getbootstrap.com/docs/5.1/components/breadcrumb/))
*The input variant with the radio and checkbox types is still in development, but other attributes should work.*<br>

There were tons of options here to make a bootstrap button, and for some reason I'm implementing all of them. Anyways, outline replaces the filled background color style with an outline, a/input generates ```<a>```/```<input>``` tags instead of ```<button>```, submit/button/reset sets the ```type="..."``` attribute in HTML, which is neccessary for the input variant, and active darkens the button a little bit.

**Attributes**: ```b-attr: <a color>, outline, a/input, submit/button/reset, active```<br>
**Colors**: ```primary, secondary, success, danger, warning, info, light, dark, link```
```html
<!-- BUTTON,A,INPUT -->
<btn>Basic</btn>
<btn b-attr="active">Active</btn>
<btn b-attr="primary,a">A, primary</btn>
<btn b-attr="success,submit,input">INPUT, type-submit</btn>
<btn b-attr="warning,outline,a">A, outlined</btn>
<btn b-attr="danger,reset">type-reset</btn>
<btn b-attr="secondary,button,input">INPUT, type-button</btn>
```



## function:void
```ts 
addBootstrap(css:boolean,js:boolean)
// Import (5.1.3) bootstrap.min.css, and/or bootstrap.bundle.min.js based on the parameters.
```

```ts
parseCustomTags()
// Start the custom tag parser.
```

```ts
enableTooltips()
// Enable all bootstrap tooltips.
```

```ts
enablePopovers()
// Enable all bootstrap popovers.
```
