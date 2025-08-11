document.addEventListener('DOMContentLoaded', () => {
            // Initialize Swiper
            const swiper = new Swiper('.school-tour-slider', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 40 }
                },
                keyboard: {
                    enabled: true,
                },
            });

            // --- Lightbox Functionality ---
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.close-btn');

            document.querySelector('.swiper-wrapper').addEventListener('click', (e) => {
                const slide = e.target.closest('.swiper-slide');
                if (slide && slide.classList.contains('swiper-slide-active')) {
                    const img = slide.querySelector('img');
                    const captionElement = slide.querySelector('.image-caption');
                    const captionTitle = captionElement.querySelector('h2').textContent;
                    const captionDescription = captionElement.querySelector('p').textContent;

                    lightbox.style.display = 'flex';
                    lightboxImg.src = img.src; 
                    lightboxImg.alt = img.alt;
                    lightboxCaption.innerHTML = `<h2>${captionTitle}</h2><p>${captionDescription}</p>`;
                }
            });

            const closeLightbox = () => {
                lightbox.style.display = 'none';
            };

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                    closeLightbox();
                }
            });
            
            // --- NEW: Announcements Functionality ---
            const announcements = [
                {
                    title: "Annual Sports Day",
                    date: "2025-10-15",
                    message: "Get ready for a day of thrilling athletic events! Sign-ups for races and team sports are now open."
                },
                {
                    title: "Parent-Teacher Meetings",
                    date: "2025-10-05",
                    message: "We invite all parents to discuss their child's progress with our teachers. Please book your slot online."
                },
                {
                    title: "Science Fair Submissions",
                    date: "2025-09-28",
                    message: "The annual science fair is approaching! Submit your project proposals by the end of the month."
                },
                {
                    title: "School Holiday Notice",
                    date: "2025-09-20",
                    message: "The school will be closed on October 2nd for a national holiday. Classes will resume as normal the following day."
                },
                {
                    title: "Library Book Sale",
                    date: "2025-09-12",
                    message: "Come find your next favorite book at our annual library sale. All proceeds go towards new acquisitions."
                },
                {
                    title: "Welcome Back Assembly",
                    date: "2025-09-01",
                    message: "A warm welcome to all new and returning students! Join us for the first assembly of the academic year."
                }
            ];

            const container = document.getElementById('announcements-container');
            const toggleBtn = document.getElementById('toggle-announcements-btn');
            const initialVisibleCount = 3;
            let isExpanded = false;

            function renderAnnouncements() {
                container.innerHTML = ''; // Clear existing content
                announcements.forEach((item, index) => {
                    const card = document.createElement('div');
                    card.className = 'announcement-card';
                    if (index >= initialVisibleCount) {
                        card.classList.add('hidden');
                    }
                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <div class="date">${item.date}</div>
                        <p>${item.message}</p>
                    `;
                    container.appendChild(card);
                });
                
                // Hide button if not needed
                if (announcements.length <= initialVisibleCount) {
                    toggleBtn.style.display = 'none';
                }
            }

            toggleBtn.addEventListener('click', () => {
                isExpanded = !isExpanded;
                const cards = container.querySelectorAll('.announcement-card');
                
                cards.forEach((card, index) => {
                    if (index >= initialVisibleCount) {
                        card.classList.toggle('hidden', !isExpanded);
                    }
                });
                
                toggleBtn.textContent = isExpanded ? 'Show Less' : 'Show More';
            });

            // Initial render
            renderAnnouncements();
        });