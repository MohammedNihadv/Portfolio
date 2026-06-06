// --- Editorial Text Rotator ---
const words = document.querySelectorAll(".word");
words.forEach((word) => {
    const letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        const span = document.createElement("span");
        span.innerHTML = letter === " " ? "&nbsp;" : letter;
        span.className = "letter";
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
const maxWordIndex = words.length - 1;
if (words.length > 0) {
    words[currentWordIndex].style.opacity = "1";
}

const changeText = () => {
    if (words.length === 0) return;
    const currentWord = words[currentWordIndex];
    const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 50);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 300 + i * 50);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

if (words.length > 0) {
    changeText();
    setInterval(changeText, 3200);
}


// --- Magical Botanical Sunbeams & Drifting Pollen Canopy ---
const canvas = document.getElementById("hero-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const count = 70;
    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    const setCanvasSize = () => {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class SporeParticle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 20;
            this.size = Math.random() * 2.2 + 0.6;
            this.speedY = Math.random() * 0.4 + 0.15; // Slow rising spores
            this.angle = Math.random() * Math.PI * 2;
            this.spinSpeed = Math.random() * 0.02 - 0.01;
            this.wiggleFactor = Math.random() * 0.4 + 0.2;
            
            const colors = [
                "rgba(16, 185, 129, 0.4)",  // Emerald Spore
                "rgba(251, 191, 36, 0.4)",  // Daisy Yellow Pollen
                "rgba(245, 158, 11, 0.35)",  // Golden Sunbeam Dust
                "rgba(255, 255, 255, 0.25)"  // Pure Botanical Light
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y -= this.speedY;
            this.angle += this.spinSpeed;
            this.x += Math.sin(this.angle) * this.wiggleFactor;

            // Gravity / Magnetic pull to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 1.3;
                    this.y += (dy / distance) * force * 1.3;
                }
            }

            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initCanvas = () => {
        particlesArray = [];
        for (let i = 0; i < count; i++) {
            particlesArray.push(new SporeParticle());
        }
    };
    initCanvas();

    const animateCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });

        // Soft stardust constellation linking around mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
            for (let a = 0; a < particlesArray.length; a++) {
                const dx = particlesArray[a].x - mouse.x;
                const dy = particlesArray[a].y - mouse.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 120) {
                    const alpha = (1 - (distance / 120)) * 0.22;
                    ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    };
    animateCanvas();
}


// --- Interactive Card Directional Mouse Glows ---
const hoverCards = document.querySelectorAll(".Service-box, .port-box, .contact form");
hoverCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});


// --- Skill Progress Scroll Observer (Smooth Filling) ---
const animateSkillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 1. Technical skill bars animation
            const barSpans = entry.target.querySelectorAll(".skill-bar .bar span");
            barSpans.forEach(span => {
                const width = span.getAttribute("data-width");
                span.style.width = width;
            });

            // 2. Circular professional progress rings animation
            const progressRings = entry.target.querySelectorAll("circle.progress-ring");
            progressRings.forEach(ring => {
                const percent = ring.getAttribute("data-percent");
                const radius = ring.r.baseVal.value;
                const circumference = 2 * Math.PI * radius; // 314
                const offset = circumference - (percent / 100) * circumference;
                
                ring.style.strokeDasharray = circumference;
                ring.style.strokeDashoffset = offset;
            });

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

const skillSection = document.querySelector("#skill");
if (skillSection) {
    animateSkillsObserver.observe(skillSection);
}


// --- MixitUp Portfolio Filter ---
let mixer;
try {
    mixer = mixitup(".portfolio-gallery", {
        selectors: {
            target: ".port-box"
        },
        animation: {
            duration: 450,
            nudge: true,
            reverseOut: true,
            effects: "fade scale(0.85) translateZ(-40px)"
        }
    });
} catch (error) {
    console.warn("MixItUp skipped initialization:", error);
}


// --- Sticky Navigation, Scroll progress bar, Parallax leaves & Scroll Spy ---
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header ul li a");
const scrollProgress = document.getElementById("scroll-progress");
const parallaxLeaves = document.querySelectorAll(".parallax-leaf");

const handleScrollEffects = () => {
    const scrollValue = window.scrollY;

    if (header) {
        // Sticky navbar (re-centers automatically due to absolute transform layout)
        header.classList.toggle("sticky", scrollValue > 50);
    }

    // Dynamic Scroll Progress Bar
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (scrollValue / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
    }

    // 3D Parallax Edge Leaves scrolling translation shifts
    parallaxLeaves.forEach(leaf => {
        const speed = parseFloat(leaf.getAttribute("data-speed"));
        leaf.style.transform = `translateY(${scrollValue * speed}px)`;
    });

    // Scrollspy active nav link indicator
    let activeSectionId = "";
    sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (scrollValue >= top && scrollValue < top + height) {
            activeSectionId = sec.getAttribute("id");
        }
    });

    if (activeSectionId) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeSectionId}`) {
                link.classList.add("active");
            }
        });
    }
};

window.addEventListener("scroll", handleScrollEffects);
// Run initially on load
handleScrollEffects();


// --- Mobile Navigation Menu Toggle ---
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

if (menuIcon && navlist) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };

    navLinks.forEach(link => {
        link.onclick = () => {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
        };
    });

    window.addEventListener("scroll", () => {
        if (navlist.classList.contains("open")) {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
        }
    });
}


// --- Global Scroll Reveal Parallax ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        }
    });
}, { threshold: 0.08 });

const scrollScales = document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top");
scrollScales.forEach((el) => revealObserver.observe(el));


// --- Volumetric 3D Glass Slider Theme Switcher ---
const themeToggleBtn = document.getElementById("theme-toggle-btn");
if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector(".toggle-knob i");
    const label = themeToggleBtn.querySelector(".toggle-label");
    
    const currentTheme = localStorage.getItem("theme");
    
    const setLightTheme = () => {
        document.body.classList.add("light-theme");
        if (icon) icon.className = "bx bx-sun";
        if (label) {
            label.style.opacity = "0";
            setTimeout(() => {
                label.textContent = "Light";
                label.style.opacity = "1";
            }, 150);
        }
    };

    const setDarkTheme = () => {
        document.body.classList.remove("light-theme");
        if (icon) icon.className = "bx bx-moon";
        if (label) {
            label.style.opacity = "0";
            setTimeout(() => {
                label.textContent = "Dark";
                label.style.opacity = "1";
            }, 150);
        }
    };

    // Apply preference
    if (currentTheme === "light") {
        setLightTheme();
    } else {
        setDarkTheme();
    }

    themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("light-theme")) {
            setDarkTheme();
            localStorage.setItem("theme", "dark");
        } else {
            setLightTheme();
            localStorage.setItem("theme", "light");
        }
    });
}


// --- Custom Toast Notification Helper ---
const showToast = (message, type = "success") => {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconClass = type === "success" ? "bx bx-check-circle" : "bx bx-error-circle";
    toast.innerHTML = `
        <div class="toast-icon"><i class="${iconClass}"></i></div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
};


// --- Contact EmailJS Integration ---
function sendMail() {
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const addressEl = document.getElementById("address");
    const phoneEl = document.getElementById("phone");
    const messageEl = document.getElementById("message");

    if (!nameEl || !emailEl || !addressEl || !phoneEl || !messageEl) {
        console.error("Form inputs are missing from DOM.");
        return;
    }

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const address = addressEl.value.trim();
    const phone = phoneEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
        showToast("Please complete the required fields: Name, Email, and Message.", "error");
        return;
    }

    const params = {
        name: name,
        from_name: name,
        email: email,
        from_email: email,
        reply_to: email,
        address: address,
        phone: phone,
        message: message,
    };

    const btn = document.querySelector(".formbtn button");
    const originalText = btn.innerHTML;
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
    btn.disabled = true;

    emailjs.send("service_stk0ztj", "template_e5wrwnb", params, "YcJwrN5YTckjZ55kt")
        .then(() => {
            showToast("Message sent successfully! Thank you.", "success");
            nameEl.value = "";
            emailEl.value = "";
            addressEl.value = "";
            phoneEl.value = "";
            messageEl.value = "";
            btn.innerHTML = originalText;
            btn.disabled = false;
        })
        .catch((error) => {
            console.error("EmailJS failed to deliver message:", error);
            const errorMsg = error && error.text ? error.text : (error && error.message ? error.message : "Unknown error");
            showToast(`Delivery failed: ${errorMsg}. Please check your dashboard setup.`, "error");
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}


// --- 3D Coverflow Projects Carousel (Premium Card Flow) ---
const initCoverflowSlider = () => {
    const cards = document.querySelectorAll(".coverflow-card");
    const container = document.querySelector(".coverflow-container");
    const bulletsContainer = document.querySelector(".coverflow-bullets");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (cards.length === 0 || !container) return;
    
    let activeIndex = 0;
    
    const updateCoverflow = () => {
        const isMobile = window.innerWidth <= 768;
        const spacing = isMobile ? 65 : 140;
        const rotateAngle = isMobile ? 25 : 45;
        
        cards.forEach((card, idx) => {
            const diff = idx - activeIndex;
            const absDiff = Math.abs(diff);
            
            if (diff === 0) {
                // Center active card
                card.style.transform = `translate3d(0, 0, 150px) scale(1) rotateY(0deg)`;
                card.style.opacity = "1";
                card.style.zIndex = "10";
                card.style.filter = "none";
                card.style.pointerEvents = "auto";
                card.classList.add("active");
            } else {
                // Side cards
                card.classList.remove("active");
                const direction = diff > 0 ? 1 : -1;
                const xOffset = direction * spacing + diff * (isMobile ? 15 : 25);
                const zOffset = -absDiff * (isMobile ? 80 : 120);
                const scale = Math.max(0.5, 1 - absDiff * 0.12);
                const rotation = -direction * rotateAngle;
                
                card.style.transform = `translate3d(${xOffset}px, 0, ${zOffset}px) scale(${scale}) rotateY(${rotation}deg)`;
                card.style.opacity = Math.max(0.1, 0.85 - absDiff * 0.25).toString();
                card.style.zIndex = (10 - absDiff).toString();
                card.style.filter = `brightness(${Math.max(0.4, 0.8 - absDiff * 0.15)}) blur(${Math.min(3, absDiff * 1)}px)`;
                card.style.pointerEvents = "auto";
            }
        });
        
        // Update bullets
        const bullets = bulletsContainer ? bulletsContainer.querySelectorAll(".coverflow-bullet") : [];
        bullets.forEach((bullet, idx) => {
            bullet.classList.toggle("active", idx === activeIndex);
        });
    };
    
    const navigateCoverflow = (direction) => {
        activeIndex += direction;
        if (activeIndex < 0) {
            activeIndex = cards.length - 1;
        } else if (activeIndex >= cards.length) {
            activeIndex = 0;
        }
        updateCoverflow();
    };
    
    // Create bullets
    if (bulletsContainer) {
        bulletsContainer.innerHTML = "";
        cards.forEach((_, idx) => {
            const bullet = document.createElement("div");
            bullet.className = "coverflow-bullet";
            if (idx === activeIndex) bullet.classList.add("active");
            bullet.addEventListener("click", () => {
                activeIndex = idx;
                updateCoverflow();
            });
            bulletsContainer.appendChild(bullet);
        });
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener("click", () => navigateCoverflow(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => navigateCoverflow(1));
    }
    
    cards.forEach((card, idx) => {
        card.addEventListener("click", (e) => {
            if (activeIndex !== idx) {
                activeIndex = idx;
                updateCoverflow();
                e.preventDefault();
            }
        });
    });
    
    // Swipe gestures for touch screens
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        if (diffX > 50) {
            navigateCoverflow(1);
        } else if (diffX < -50) {
            navigateCoverflow(-1);
        }
    }, { passive: true });
    
    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
        const rect = container.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport) {
            if (e.key === "ArrowLeft") {
                navigateCoverflow(-1);
            } else if (e.key === "ArrowRight") {
                navigateCoverflow(1);
            }
        }
    });
    
    // Initial display and window resize handling
    updateCoverflow();
    window.addEventListener("resize", updateCoverflow);
};

// Initialise the Coverflow carousel
document.addEventListener("DOMContentLoaded", initCoverflowSlider);
if (document.readyState === "interactive" || document.readyState === "complete") {
    initCoverflowSlider();
}