const addResponsiveNavigationHandler = () => {
    const displayNavigationButton = document.getElementById('displayNavButton');
    if (displayNavigationButton) {
        const mobileNavigationLinks = document.getElementById('navLinks');
    
        displayNavigationButton.addEventListener('click', (event) => {
            mobileNavigationLinks.classList.toggle('dn');
        });
    }
};

export default addResponsiveNavigationHandler;
