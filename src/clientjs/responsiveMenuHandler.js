const addResponsiveNavigationHandler = () => {
    const displayNavigationButton = document.getElementById('displayNavButton');
    const mobileNavigationLinks = document.getElementById('navLinks');

    displayNavigationButton.addEventListener('click', (event) => {
        const cssClasses = mobileNavigationLinks.getAttribute('class').split(' ');

        const newCssClasses = cssClasses.includes('dn') ?
            cssClasses.slice(0, cssClasses.length - 1).join(' ') :
            [...cssClasses, 'dn'].join(' ');
        mobileNavigationLinks.setAttribute('class', newCssClasses);
    });
};

export default addResponsiveNavigationHandler;
