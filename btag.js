// --------- //
// variables //
// --------- //

let breakpoints = ['xs','sm','md','lg','xl','xxl'];
let btags = ['accordion','alert','badge','breadcrumb','card','carousel','collapse','dropdown','modal','navtab','navbar','offcanvas','popover','progress','scrollspy','spinner','toast'];



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



// ------------- //
// function:void //
// ------------- //

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

// convert all custom tags to nodes, for ex. <accordion title="ttl" style="background-color: red;">...</accordion> -> actual bootstrap
function parseCustomTags() {
    // ...
}



// ---------- //
// after load //
// ---------- //
console.log('BootstrapTagManager for Bootstrap 5.1 loaded.');