document.addEventListener("DOMContentLoaded", () => {
    // Toggle menu icon and navbar
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    };

    // Select necessary elements
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");
    const header = document.querySelector("header");

    // Function to update active link
    function updateActiveLink() {
        let scrollY = window.scrollY;

        sections.forEach((section) => {
            const offsetTop = section.offsetTop - 150; // Adjust for proper section activation
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollY >= offsetTop && scrollY < offsetTop + height) {
                navLinks.forEach((link) => link.classList.remove("active"));

                let activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }

    // Function to toggle sticky header
    function toggleStickyHeader() {
        header.classList.toggle("sticky", window.scrollY > 100);
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-animate");
                } else {
                    entry.target.classList.remove("show-animate");
                }
            });
        },
        { threshold: 0.3 } // Ensures animation triggers earlier
    );

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Smooth scrolling when clicking nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100, // Adjust for fixed header
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link
                menuIcon.classList.remove("bx-x");
                navbar.classList.remove("active");
            }
        });
    });

    // Add scroll event listener for sticky header + update active link
    window.addEventListener("scroll", () => {
        toggleStickyHeader();
        updateActiveLink();
    });
});
