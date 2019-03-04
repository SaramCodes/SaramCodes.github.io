
//helper function which returns a dom element with a classname
function returnDiv(element, className) {
    let myEl = document.createElement(element);
    if (className === 0) {
        return myEl
    }
    myEl.classList.add(className);
    return myEl;
}

//Setting up the important selectors

const hamburger = document.querySelector('.hamburger');
const navOverlay = document.querySelector('.nav-overlay');
const sideNav = document.querySelector('nav');
const body = document.querySelector("body");
const mainContainer = document.querySelector(".desktop-container");
const landing = document.querySelector(".landing");

//Nav ----> Hamburger ----> CODE Below

//Calling the function responsible for drawing the side nav out.

navOverlay.addEventListener('click', () => {
    sideNav.classList.remove("sidenav-out");
    navOverlay.style.display = "none";
    body.style.overflowY = "auto";

});
hamburger.addEventListener('click', bringOutTheSideNav);

//Intializing the function bringOutTheSideNav function.
function bringOutTheSideNav() {
    sideNav.classList.toggle("sidenav-out");
    navOverlay.style.display = "block";
    body.style.overflowY = "hidden";
}

//Nav ----> Hamburger ----> CODE above


// Portfolio work code below

const works = document.querySelectorAll(".portfolio-work")

works.forEach(work => {

    let workText = work.dataset.work;

    //setting the heading of the individual work
    let workTextContainer = work.querySelector(".portfolio-work-text p");
    workTextContainer.innerText = workText;

    //setting the background image of the individual work
    let workOverlay = work.querySelector(".portfolio-work-overlay");
    workOverlay.style.backgroundImage = `url("../assets/work/${workText}/thumb.jpg")`

    //Setting up the click event on the works.
    work.addEventListener("click", OpenWork);

    //the function called whenever a work is clicked.
    function OpenWork() {
        //Hiding body overflow so no scrolling
        body.style.overflow = "hidden";
        mainContainer.style.overflowY = "hidden";

        //creating the page which will display all the information.
        let workPage = returnDiv("div", "work-open");

        // creating the innerHTML which will be added to the workPage i.e a cross button and a loading bar
        let cross = returnDiv("div", "portfolio-cross-holder");
        cross.insertAdjacentHTML('beforeend', "<div class='portfolio-cross'><div></div><div></div></div>");

        let loadingBar = returnDiv("div", "loading-port");
        loadingBar.insertAdjacentHTML('beforeend', "<p>Loading...</p><div></div><div></div><div></div>");

        //adding the cross and loadingbar to the workPage as innerHTML
        workPage.appendChild(cross)
        workPage.appendChild(loadingBar)

        //creating an overlay which will be just behind the workPage so users can accidentally click on something not needing being clicked on. Also this overlay will be a dark color with a 50 percent opacity.
        let bodyOverlay = returnDiv("div", "body-overlay");

        //appending the overlaay and the workpage to the body.
        body.appendChild(bodyOverlay)
        body.appendChild(workPage)

        // setting up an eventlistener on cross button so this work section closes.
        let portfolioCross = document.querySelector(".portfolio-cross");
        portfolioCross.addEventListener("click", removePortfolio);

        //creating the url
        let url = this.dataset.work;
        url = url.toLowerCase();
        url = "assets/work/" + url + "/" + url + ".json";

        //ready to rock and ROLL -- ehm I meant use the fetch api

        fetch(url)
            .then(response => response.json())
            .then(result => {

                // in case of success, displaying the data.
                workPage.removeChild(loadingBar)
                let workLeft = returnDiv("div", "work-left-side")
                let leftContent = `
                        <div class="work-heading">
                            <h2>${result.projectName}</h2>
                        </div>
                        <div class="work-meta">
                            <div class="work-meta-icon">
                            </div>
                            <p class="work-meta-heading">
                                Date
                            </p>
                            <div class="work-meta-main">
                                <p> ${result.projectDate} </p>
                            </div>
                        </div>
                        <div class="work-buttons">
                        ${result.projectGithub ? `<a class="work-github" target="_blank" href="${result.projectGithub}">Github</a>` : ""}
                        ${result.projectLink ? `<a class="work-visit" target="_blank" href="${result.projectLink}">Visit</a>` : ""}
                        </div>
                        
                `;


                workLeft.insertAdjacentHTML("beforeEnd", leftContent);
                // let projectName = result.projectName
                let workRight = returnDiv("div", "work-right-side");
                let contentRight = `
                    <h3 class="work-details">
                    Details
                    </h3>
                    <p class="work-details-content">
                    ${result.projectDescription}
                    </p>
                    <div class="work-gif">
                        <div class="loading-port">
                        <p> Loading Image...</p>
                        <div></div>
                        <div></div>
                        <div></div>
                        </div>
                    </div>
                    
                `
                workRight.insertAdjacentHTML("beforeEnd", contentRight);


                workPage.appendChild(workLeft)
                workPage.appendChild(workRight)

                //selecting the loading port that i've added to the work-gif div.
                //This div will hold the gif.
                //Since gif is a large file, it loads slowly.
                //To avoid frustrating users, I've added a default loading.
                //once image finishees loading, it appends the image tag and removes the loading
                //if image loads to fail, it displays an error message.

                let loadBarWork = document.querySelector(".work-gif .loading-port");

                //selecting the gif container tag in workRight. Everything will be appended to it.
                let myImageContainer = document.querySelector('.work-gif');

                //creating the gif img tag here.
                let loadingImage = new Image();

                //logic in case the function finishes loading.
                loadingImage.onload = function () {

                    //removing the loading bar
                    myImageContainer.removeChild(loadBarWork);

                    //appending the fully loaded image
                    myImageContainer.appendChild(loadingImage);
                }

                //logic in case the function throws an error.
                loadingImage.onerror = function () {

                    //removing the loading bar
                    myImageContainer.removeChild(loadBarWork);

                    //creating the p tag to display the error
                    let err = returnDiv("p", "load-img-err");
                    err.innerText = "Hmmm... Something went wrong while loading the display image. (´･ω･)";

                    //appending the p tag to display the error.
                    myImageContainer.appendChild(err);
                }

                //actually loading the image here.
                loadingImage.src = `assets/work/${result.projectName}/gify.gif`;


            })

    }
})




//removing portfolio page
function removePortfolio() {
    let bgDiv = document.querySelector(".body-overlay");
    let port = document.querySelector(".work-open");
    port.style.animationName = "work-close";
    bgDiv.style.animationName = "body-overlay-close";
    body.style.overflowY = "auto";
    mainContainer.style.overflowY = "auto";
    mainContainer.style.overflowX = "hidden";

    setTimeout(() => {
        body.removeChild(port);
        body.removeChild(bgDiv)
    }, 1000);


}



// Portfolio work code above


//Scroll Out here
// ScrollOut({
//     threshold: 0.5,
// });
//Scroll Out above

// var rellax = new Rellax()