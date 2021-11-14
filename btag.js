// --------- //
// variables //
// --------- //

const colors = ['primary','secondary','success','danger','warning','info','light','dark'];
let defaultcolor = 'primary';
const breakpoints = ['xs','sm','md','lg','xl','xxl'];
const __tags = ['accordion','ai','alert','badge','breadcrumb','card','carousel','collapse','dropdown','modal','navtab','navbar','offcanvas','popover','progress','scrollspy','spinner','toast'];
let btags = [
    {name:'accordion', i:0, gen:genAccordion},
    {name:'ai', i:0, gen:genAi},
    {name:'alert', i:0, gen:genAlert},
    {name:'badge', i:0, gen:genBadge},
    {name:'breadcr', i:0, gen:genBreadcrumb},
    {name:'bi', i:0, gen:genBi},
    {name:'btn', i:0, gen:genBtn},
];


// ------------- //
// function:void //
// ------------- //

// tag:string
function btagsI(tag) {
    return btags.find(f => f.name==tag).i;
}

// css:boolean  js:boolean
function addBootstrap(css,js) {
    if(css==true) {
        let cssNode = document.createElement('link');
        cssNode.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
        cssNode.rel = 'stylesheet';
        cssNode.integrity = 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3';
        cssNode.crossOrigin = 'anonymous';
        document.head.prepend(cssNode);
    }
    if(js==true) {
        let jsNode = document.createElement('script');
        jsNode.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
        jsNode.integrity = 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p';
        jsNode.crossOrigin = 'anonymous';
        document.body.appendChild(jsNode);
        enableTooltips();
        enablePopovers();
    }
}

function enableTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (elem) {
       return new bootstrap.Tooltip(elem);
    })
}

function enablePopovers() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    })
}

function parseCustomTags() {
    btags.forEach((btag) => {
        let elems = document.getElementsByTagName(btag.name);    // looping through all the custom tags
        while(elems.length>0) {
            let parsedTag = btag.gen(collectAttrsObj(elems[0]), elems[0].innerHTML, elems[0].parentNode);    // generating the new one and moving the old innerHTML to it
            elems[0].parentNode.replaceChild(parsedTag, elems[0]);    // replacing the custom tag with the generated one
            btag.i++;
        }
    });
    console.log('[btag.js] Parser successfully ran.');
}


// --------------- //
// function:object //
// --------------- //

// tag:HTMLElement
function collectAttrsObj(tag) {
    let result = {
        b_attrs : [],
        attrs : []
    };
    for(let i = 0, attrs = tag.attributes; i < tag.attributes.length; i++) {
        if(attrs[i].nodeName === "b-attr") result.b_attrs = attrs[i].nodeValue.split(' ').join('').split(',');
        result.attrs.push([attrs[i].nodeName,attrs[i].nodeValue]);
    }
    return result;
}

// tag:HTMLElement
function collectAttrs(tag) {
    let result = [];
    for(let i = 0, attrs = tag.attributes; i < tag.attributes.length; i++) {
        result.push([attrs[i].nodeName,attrs[i].nodeValue]);
    }
    return result;
} 


// -------------------- // ---------------------------- //
// function:HTMLElement // Misc HTMLElement generators. //
// -------------------- // ---------------------------- //
 
// tag:string   attrs:object  classList:[]  id:string
function genElem(tag,attrs,classList,id) {
    let elem = document.createElement(tag);
    attrs.forEach(attr => {
        if(attr.length==2 && !elem.hasAttribute(attr[0])) elem.setAttribute(attr[0],attr[1]);
    });
    classList.forEach(className => {
        if(className.length>0 && !elem.classList.contains(className)) elem.classList.add(className);
    });
    if(!elem.id && id && id.length>0) elem.id = id;
    return elem;
}


// -------------------- // ---------------------------------------------- //
// function:HTMLElement // Functions for generating bootstrap components. //
// -------------------- // ---------------------------------------------- //

function genAccordion(attrs,innerHTML,parentNode) {
    let elem = genElem('div', attrs.attrs, ['accordion', attrs.b_attrs.includes('flush') ? 'accordion-flush' : ''], `accordion-${btagsI('accordion')}`);
    elem.innerHTML = innerHTML;
    return elem;
}

function genAi(attrs,innerHTML,parentNode) {
    let elem = genElem('div',attrs.attrs,['accordion-item'], '');
    let header = attrs.attrs.find(a => a[0]==='header');
    // bruh...
    let head = `<h2 class="accordion-header" id="header-${btagsI('ai')}"><button class="accordion-button${(attrs.b_attrs.includes('show')?'':' collapsed')}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${btagsI('ai')}" aria-expanded="${(attrs.b_attrs.includes('show')?'true':'false')}" aria-controls="collapse-${btagsI('ai')}">${(header?header[1]:'')}</button></h2>`;
    let body = `<div id="collapse-${btagsI('ai')}" class="accordion-collapse collapse${(attrs.b_attrs.includes('show')?' show':'')}" aria-labelledby="header-${btagsI('ai')}"${(parentNode.hasAttribute('b-attr') && parentNode.getAttribute('b-attr').split(',').includes('noautohide') ?'':` data-bs-parent="#${parentNode.id}"`)}>${innerHTML}</div>`;
    elem.innerHTML = head+body;
    return elem;
}

function genAlert(attrs,innerHTML,parentNode) {
    let elem = genElem('div',attrs.attrs,['alert'], '');
    elem.innerHTML = innerHTML;
    elem.setAttribute('role','alert');
    attrs.b_attrs.forEach(b_attr => {
        if(colors.includes(b_attr)) elem.classList.add('alert-'+b_attr);
        else if(b_attr==='dismiss') {
            elem.innerHTML += '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
            elem.classList.add('alert-dismissible');
        }
        else if(b_attr==='fade' || b_attr==='show') elem.classList.add(b_attr);
    });
    return elem;
}

function genBadge(attrs,innerHTML,parentNode) {
    let elem = genElem('span',attrs.attrs,['badge', attrs.b_attrs.includes('pill') ? 'rounded-pill' : ''],'');
    elem.innerHTML = innerHTML;
    attrs.b_attrs.forEach(b_attr => {
        if(['warning','info','light'].includes(b_attr)) {
            elem.classList.add('bg-'+b_attr);
            elem.classList.add('text-dark');
        }
        else if(colors.includes(b_attr)) elem.classList.add('bg-'+b_attr);
    });
    return elem;
}

function genBreadcrumb(attrs,innerHTML,parentNode) {
    let nav_elem = genElem('nav',[['aria-label','breadcrumb']],[''],'');
    let ol_elem = genElem('ol',attrs.attrs,['breadcrumb'],'');
    ol_elem.innerHTML = innerHTML;
    nav_elem.appendChild(ol_elem);
    return nav_elem;
}

function genBi(attrs,innerHTML,parentNode) {
    let elem = genElem('li',attrs.attrs,['breadcrumb-item', attrs.b_attrs.includes('active') ? 'active' : ''],'');
    elem.innerHTML = innerHTML;
    return elem;
}

function genBtn(attrs,innerHTML,parentNode) {
    let outline = attrs.b_attrs.includes('outline') ? 'outline-' : '';
    let colorAttrs = attrs.b_attrs.concat('link').filter(b_attr => colors.includes(b_attr));
    let typeAttrs = attrs.b_attrs.filter(attr => ['submit','button','reset','radio','checkbox'].includes(attr));
    let active = attrs.b_attrs.includes('active') ? 'active' : '';
    let elem;
    if(attrs.b_attrs.includes('a')) elem = genElem('a',attrs.attrs.concat([['role','button'],['href','#']]),['btn',active],'');
    else if(attrs.b_attrs.includes('input') && typeAttrs.length>0 && ['radio','checkbox'].includes(typeAttrs[0])) {
        let _id = `btag-btn-${typeAttrs[0]}-${btagsI('btn')}`;
        input_elem = genElem('input',attrs.attrs.concat([['autocomplete','off']]),['btn-check'],_id);
        elem = genElem('label',attrs.attrs.concat([['for',_id]]),['btn']); // label for input
        elem.innerHTML = innerHTML;
        parentNode.appendChild(input_elem);
    }
    else if(attrs.b_attrs.includes('input')) elem = genElem('input',attrs.attrs.concat([['value',innerHTML]]),['btn',active],'');
    else elem = genElem('button',attrs.attrs,['btn',active],'');
    elem.innerHTML = ['A','BUTTON'].includes(elem.tagName) ? innerHTML : '';
    elem.classList.add(colorAttrs.length===0 ? 'btn-'+outline+'primary' : 'btn-'+outline+colorAttrs[0]);
    elem.setAttribute('type',typeAttrs.length>0 ? typeAttrs[0] : 'button');
    return elem;
}

function genBtnGroup(attrs,innerHTML,parentNode) {}


// ---------- //
// after load //
// ---------- //
console.log('[btag.js] BootstrapTagManager for Bootstrap 5.1 loaded.');