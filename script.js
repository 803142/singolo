window.onload = () => {
    const state = {
        activeMainMenu : document.querySelector('.active'),
        activePortfolioMenu : document.querySelector('.portfolio-link-active'),        
        sliderCollection : [...document.querySelectorAll('.slider-slide')],
        activeSlide : 0,
        nextSlide : 1,
        prevSlide : 1,
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
        slideLeft : () => {
            state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-active');
            state.sliderCollection[state.prevSlide].classList.toggle('slider-slide-left');            
            setTimeout(function () { 
                state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-active'); 
                state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-left');
            }, 0);
            
            state.nextSlide = state.activeSlide;
            state.activeSlide = state.prevSlide;
            state.prevSlide = state.nextSlide; 
        },
        slideRight : () => {
            state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-active');
            state.sliderCollection[state.nextSlide].classList.toggle('slider-slide-right');            
            setTimeout(function () { 
                state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-active'); 
                state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-right');
            }, 0);

            state.prevSlide = state.activeSlide;            
            state.activeSlide = state.nextSlide;
            state.nextSlide = state.prevSlide;
        },
        foneScreenSwitcher : (item) => {
            let target = item.target;
            console.log(target.className);
            while (target.className !== 'slider-slide1'){
                if (target.className === 'fone-contur'){
                    target.querySelector('.fone-screen').classList.toggle('switch-off-fone-screen') 
                }
                target = target.parentNode;
            }

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
        },
        portfolioImagesBorder : (item) => {
            let target = helper.findTargetNode(item.target, 'IMG', 'UL');
            if (target){
                target.classList.toggle('portfolio-img-bordered');
            }
        },
        getAQuoteFormSubmit : (event) => {
            const {subject, description} = event.target;
            alert(`Письмо отправлено 
            \n\r Тема: ${subject.value?subject.value==='Singolo'?subject.value:'Без темы':'Без темы' } 
            \n\r Описание: ${description.value?description.value==='Portfolio project'?description.value:'Без описания':'Без описания'}`);
            event.target.reset();
            event.preventDefault();
        }
    }

    state.sliderCollection[state.activeSlide].classList.toggle('slider-slide-active');

    const mainMenu = document.querySelector('.body-header_nav');

    const portfolioMenu = document.querySelector('.portfolio-navigation');

    mainMenu.addEventListener('click', (e) => {activity.mainMenuChanges(e)});
    portfolioMenu.addEventListener('click', (e) => {
        activity.portfolioMenuChanges(e);
        const collection = document.querySelectorAll('.portfolio-item');
        const portfolio = document.querySelector('.portfolio-ul');

        portfolio.innerHTML = '';
        activity.portfolioImagesChanges(collection).reduce((acc, cur) => { return portfolio.appendChild(cur) ; }, portfolio);
    }, false);

    const slideLeft = document.querySelector('.prev-slide');
    const slideRight = document.querySelector('.next-slide');

    slideLeft.onclick = activity.slideLeft;
    slideRight.onclick = activity.slideRight;

    const slideSlide1 = document.querySelector('.slider-slide1');
    slideSlide1.addEventListener('click', (e) => {
        activity.foneScreenSwitcher(e);
    })

    const portfolioUl = document.querySelector('.portfolio-ul');
    portfolioUl.addEventListener('click', (e) => {activity.portfolioImagesBorder(e)});

    const getAQuoteForm = document.forms.getaquote;
    getAQuoteForm.onsubmit = activity.getAQuoteFormSubmit;
}