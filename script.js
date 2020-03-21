window.onload = () => {
    const state = {
        activeMainMenu : document.getElementsByClassName('active')[0],
        activePortfolioMenu : document.getElementsByClassName('portfolio-link-active')[0],
        activeSlide : document.getElementsByClassName('slider-slide-active')[0],
    }

    const helper = {
        findTargetNode : (target, neededTarget, stopTrigger) => {
            while (target.tagName !== neededTarget){
                if (target.tagName === stopTrigger) { 
                   return false;
                }
                target = target.parentNode;                
            }
            return target;
        },
        putToCache : (elem, cache) => {
            if(cache.indexOf(elem) != -1){
                return;
            }
            const i = Math.floor(Math.random()*(cache.length + 1));
            cache.splice(i, 0, elem);
        },
        madness : () => {
            const cache = [];
            return function(a, b){
                helper.putToCache(a, cache);
                helper.putToCache(b, cache);
                return cache.indexOf(b) - cache.indexOf(a);
            }
        }
    }

    const activity = {
        mainMenuChanges : (item) => {
            const target = helper.findTargetNode(item.target, 'A', 'NAV');

            if (target){
                state.activeMainMenu.classList.toggle('active');
                target.classList.toggle('active');
                state.activeMainMenu = target;
            }
        },
        slideLeft : (e) => {
            console.log(e);
            state.activeSlide.classList.toggle('slider-slide-active')
        },
        slideRight : (e) => {
            e.target.classList.toggle('slider-slide-active')
        },
        portfolioMenuChanges : (item) => {
            item.preventDefault();
            const target = helper.findTargetNode(item.target, 'A', 'NAV');

            if (target){
                state.activePortfolioMenu.classList.toggle('portfolio-link-active');
                target.classList.toggle('portfolio-link-active');
                state.activePortfolioMenu = target;
            }
        },
        portfolioImagesChanges : (collection) => {
            const compare = helper.madness();
            return [...collection].sort(compare);
        }

    }

    const mainMenu = document.getElementsByClassName('body-header_nav')[0];

    const portfolioMenu = document.getElementsByClassName('portfolio-navigation')[0];

    mainMenu.addEventListener('click', (e) => {activity.mainMenuChanges(e)});
    portfolioMenu.addEventListener('click', (e) => {
        activity.portfolioMenuChanges(e);
        const collection = document.getElementsByClassName('portfolio-item');

        activity.portfolioImagesChanges(collection).map((element, i) => {
            element.setAttribute('style', `grid-column: ${i%4+1}; grid-row: ${(i-i%4)/4+1} / ${(i-i%4)/4+2};`);
        });
    }, false);
    const slideLeft = document.getElementsByClassName('nav-slider prev')[0];
    const slideRight = document.getElementsByClassName('nav-slider next')[0];
    slideLeft.onclick = activity.slideLeft;
    slideRight.onclick = activity.slideRight;
    document.addEventListener('click',(e)=>{console.log(e.target.tagName)})
}