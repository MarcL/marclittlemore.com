const addResponsiveNavigationHandler = () => {
    const displayNavigationButton = document.getElementById('displayNavButton');
    if (displayNavigationButton) {
        const mobileNavigationLinks = document.getElementById('mobileLinks');
        if (mobileNavigationLinks) {
            displayNavigationButton.addEventListener('click', (event) => {
                mobileNavigationLinks.classList.toggle('hidden');
            });
        } else {
            throw new Error('Missing element with mobileLinks identifier')
        }
    }
};

export default addResponsiveNavigationHandler;
