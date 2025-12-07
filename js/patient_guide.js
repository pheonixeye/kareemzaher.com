document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Close others if desired, or allow multiple open.
            // Let's implement independent toggles for typical FAQ behavior.

            this.classList.toggle('active');
            const body = this.nextElementSibling;

            if (body.style.maxHeight) {
                body.style.maxHeight = null;
            } else {
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });
});
