// --------- //
// variables //
// --------- //

let breakpoints = ['xs','sm','md','lg','xl','xxl'];
let btags = {
    tags: ['accordion','ai','alert','badge','breadcrumb','card','carousel','collapse','dropdown','modal','navtab','navbar','offcanvas','popover','progress','scrollspy','spinner','toast'],
    accordion: {
        attrs: ['type','open'],
        type: ['flush'],
        open: 'always',
        index: 0,
        gen: genAccordion,
    },
    ai: {
        attrs: ['header','show'],
        header: 'innerHTML',
        show: 'show',
        index: 0,
        gen: genAi,
    }
}

// ------------- //
// function:void //
// ------------- //

// css:boolean
// js:boolean
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
    btags.tags.forEach((btag) => {
        let elems = document.getElementsByTagName(btag);            // looping through all the custom tags
        while(elems.length>0) {
            let attrs = [];
            for(_a of btags[btag].attrs) {
                attrs.push(elems[0].getAttribute(_a));              // collecting attributes from the custom tag
            }
            let parsedTag = btags[btag].gen(attrs,elems[0].parentNode,elems[0].innerHTML);    // generating the new one and moving the old innerHTML to it
            elems[0].parentNode.replaceChild(parsedTag,elems[0]);                             // replacing the custom tag with the generated one
            btags[btag].index++;
        }
    });
    console.log('[btag.js] Parser successfully ran.');
}



// -------------------- //
// function:HTMLElement //
// -------------------- //

// breakpoint:string
// .container / .container-fluid / .container-{breakpoint: sm/md/lg/xl/xxl}
function genContainer(breakpoint) {
    let container = document.createElement('div');
    container.className = breakpoints.includes(breakpoint) || breakpoint=='fluid' ? `container-${breakpoint}` : 'container';
    return container;
}

// cols param => col-count:number / col-widths:number[] / col-params:string[]
function genRow(cols) {
    let row = document.createElement('div');
    row.className = 'row';
    if(Array.isArray(cols)) {
        cols.forEach(elem => {
            row.appendChild(genCol(elem));
        });
    }
    else if(cols!=null && !isNaN(cols)) {
        for(let c=0; c<cols; c++) {
            row.appendChild(genCol());
        }
    }
    return row;
}

// param:string / param:number
function genCol(param) {
    let col = document.createElement('div');
    col.className = param ? `col-${param}` : 'col';
    return col;
}

// rows:number / [ []:number / []:string / []:number ]
function genGrid(rows,breakpoint) {
    let container = genContainer(breakpoint);
    if(Array.isArray(rows)) {
        rows.forEach(cols => {
            container.appendChild(genRow(cols));
        });
    }
    else if(rows!=null && !isNaN(rows)) {
        for(let r=0; r<rows; r++) {
            container.appendChild(genRow());
        }
    }
    return container;
}

function genAccordion(attrs,parentNode,innerHTML) {
    let elem = document.createElement('div');
    if(attrs.includes('always')) {
        elem.setAttribute('open','always');
    }
    elem.classList.add('accordion');
    if(attrs.includes('flush')) {
        elem.classList.add('accordion-flush');
    }
    elem.id = `accordion-${btags['accordion'].index}`;
    elem.innerHTML = innerHTML;
    return elem;
}

function genAi(attrs,parentNode,innerHTML) {
    let elem = document.createElement('div');
    elem.className = 'accordion-item';
    // bruh...
    let head = `<h2 class="accordion-header" id="header-${btags['ai'].index}"><button class="accordion-button${(attrs.includes('show')?'':' collapsed')}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${btags['ai'].index}" aria-expanded="${(attrs.includes('show')?'true':'false')}" aria-controls="collapse-${btags['ai'].index}">${attrs[0]}</button></h2>`;
    let body = `<div id="collapse-${btags['ai'].index}" class="accordion-collapse collapse${(attrs.includes('show')?' show':'')}" aria-labelledby="header-${btags['ai'].index}"${(parentNode.hasAttribute('open')?'':` data-bs-parent="#${parentNode.id}"`)}>${innerHTML}</div>`;
    elem.innerHTML = head+body;
    return elem;
}



// ---------- //
// after load //
// ---------- //
console.log('[btag.js] BootstrapTagManager for Bootstrap 5.1 loaded.');