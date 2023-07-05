const mobileNav = () => {
  const navBtn = document.querySelector('.mobile-nav-btn'),
        nav = document.querySelector('.mobile-nav'),
        menuIcon = document.querySelector('.nav-icon');

  navBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-nav__open');
    menuIcon.classList.toggle('nav-icon__active');
    document.body.classList.toggle('no-scroll');
  });
};

export default mobileNav;