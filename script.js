window.onload = () => {
    const state = {
        activeMainMenu : document.getElementsByClassName('active')[0],
    }
    const activity = {
        mainMenuChenges : (item) => {
            state.activeMainMenu.classList.toggle('active');
            item.classList.toggle('active');
            state.activeMainMenu = item;
        },
    }
    const mainMenu = document.getElementsByClassName('body-header_nav')[0];
    mainMenu.addEventListener('click', (e) => {activity.mainMenuChenges(e.target)});
    console.log(state.activeMainMenu);
}