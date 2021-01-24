/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const allSections = document.querySelectorAll('section');
const allNavItems = [];
let timer; // to clear timout for hiding navbar
const btn = document.getElementById('topButton'); // back to top button



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// returns Li Node
function createLiNode (textNode, sectionId) {

    let li = document.createElement('li');
    let a = document.createElement('a');
    let text = document.createTextNode(textNode);
    a.appendChild(text);
    a.classList.add('menu__link');
    a.setAttribute('href', sectionId)
    li.setAttribute('data-id',sectionId);
    li.appendChild(a);
    allNavItems.push(li);
    return li;
}

// hide navbar after 2 seconds
function hideNavbar() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function(){
        document.querySelector('.navbar__menu').style.display = "none";
    },2500); 
}


// show or hide back to top button
function showHideTopButton() {
    if(window.pageYOffset > 1000) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

// fired on clicking back to top button
(function backToTop () {
    btn.addEventListener('click', function() {
        window.scrollTo(0,0);
    });
}());


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// builds the navigation bar according to the number of all page sections
(function buildTheNav () {

    const navbarList = document.getElementById('navbar__list');

    for (section of allSections) { // loop over all page sections

        let textNode = section.dataset.nav; // get the corrosponding data-nav value
        let sectionId = section.id; // get the section id

        navbarList.appendChild(createLiNode(textNode,`#${sectionId}`)); // build the navbar li elements
    }

}());



// Add active State to section in viewport and its corresponding nav item
function addActiveState () {

    for (section of allSections) {

        let sectionTop = section.getBoundingClientRect().top;
        let sectionBottom = section.getBoundingClientRect().bottom;


        // remove active calss from nav items when on top of page
        if (window.pageYOffset < 100) {

            for (item of allNavItems) { 
                item.classList.remove('active');
            }
        }

        // add active class to current active section only
        section.classList.remove('active');
        if (sectionTop < 200 && sectionBottom > 200) {
            
            section.classList.add('active'); 
            
            // also add active class to current item of active section only
            for (item of allNavItems) { 
                
                item.classList.remove('active');

                if (`#${section.id}` == item.dataset.id) {
                    item.classList.add('active'); 
                }
            }

        }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('scroll', function() {
    
    // show navbar
    document.querySelector('.navbar__menu').style.display = "block";
    
    // add active state
    addActiveState();

    // hide navbar after 2.5 seconds from not scrolling
    hideNavbar();

    // show or hide back to top button
    showHideTopButton();

});


