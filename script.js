
        // Three.js 3D Scene Setup
        class ThreeJSScene {
            constructor() {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                this.renderer = new THREE.WebGLRenderer({ 
                    canvas: document.getElementById('threejs-canvas'),
                    alpha: true 
                });
                
                this.init();
                this.createGeometry();
                this.animate();
                this.handleResize();
            }

            init() {
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setClearColor(0x000000, 0);
                
                // Add ambient light
                const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                this.scene.add(ambientLight);
                
                // Add directional light
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(1, 1, 1);
                this.scene.add(directionalLight);
                
                this.camera.position.z = 5;
            }

            createGeometry() {
                // Create multiple geometric shapes
                this.shapes = [];
                
                // Rotating cube
                const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
                const cubeMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x00d4ff,
                    transparent: true,
                    opacity: 0.8
                });
                this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                this.cube.position.set(-2, 0, 0);
                this.scene.add(this.cube);
                this.shapes.push(this.cube);
                
                // Rotating sphere
                const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
                const sphereMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0xff6b6b,
                    transparent: true,
                    opacity: 0.8
                });
                this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                this.sphere.position.set(2, 0, 0);
                this.scene.add(this.sphere);
                this.shapes.push(this.sphere);
                
                // Torus
                const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
                const torusMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x4ecdc4,
                    transparent: true,
                    opacity: 0.8
                });
                this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
                this.torus.position.set(0, 1.5, 0);
                this.scene.add(this.torus);
                this.shapes.push(this.torus);
            }

            animate() {
                requestAnimationFrame(() => this.animate());
                
                // Rotate shapes
                this.cube.rotation.x += 0.01;
                this.cube.rotation.y += 0.01;
                
                this.sphere.rotation.x += 0.015;
                this.sphere.rotation.z += 0.01;
                
                this.torus.rotation.x += 0.02;
                this.torus.rotation.y += 0.01;
                
                // Add floating animation
                const time = Date.now() * 0.001;
                this.shapes.forEach((shape, index) => {
                    shape.position.y += Math.sin(time + index) * 0.002;
                });
                
                this.renderer.render(this.scene, this.camera);
            }

            handleResize() {
                window.addEventListener('resize', () => {
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                });
            }
        }

        // Form Validation
        class FormValidator {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.initEventListeners();
            }

            initEventListeners() {
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.validateForm();
                });

                // Real-time validation
                const inputs = this.form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });
                });
            }

            validateForm() {
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');

                let isValid = true;

                // Clear previous errors
                this.clearErrors();

                // Validate name
                if (!this.validateField(name)) {
                    isValid = false;
                }

                // Validate email
                if (!this.validateField(email)) {
                    isValid = false;
                }

                // Validate message
                if (!this.validateField(message)) {
                    isValid = false;
                }

                if (isValid) {
                    this.submitForm();
                }
            }

            validateField(field) {
                const value = field.value.trim();
                const errorElement = document.getElementById(field.id + 'Error');

                switch (field.id) {
                    case 'name':
                        if (value === '') {
                            this.showError(errorElement, 'Name is required');
                            return false;
                        }
                        break;

                    case 'email':
                        if (value === '') {
                            this.showError(errorElement, 'Email is required');
                            return false;
                        }
                        if (!this.isValidEmail(value)) {
                            this.showError(errorElement, 'Please enter a valid email');
                            return false;
                        }
                        break;

                    case 'message':
                        if (value === '') {
                            this.showError(errorElement, 'Message is required');
                            return false;
                        }
                        if (value.length < 10) {
                            this.showError(errorElement, 'Message must be at least 10 characters');
                            return false;
                        }
                        break;
                }

                this.clearError(errorElement);
                return true;
            }

            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            showError(element, message) {
                element.textContent = message;
                element.style.display = 'block';
            }

            clearError(element) {
                element.textContent = '';
                element.style.display = 'none';
            }

            clearErrors() {
                const errors = document.querySelectorAll('.error');
                errors.forEach(error => {
                    error.textContent = '';
                    error.style.display = 'none';
                });
            }

            submitForm() {
                // Simulate form submission
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.form.reset();
            }
        }

        // Smooth scrolling for navigation links
        class SmoothScroll {
            constructor() {
                this.initEventListeners();
            }

            initEventListeners() {
                const navLinks = document.querySelectorAll('a[href^="#"]');
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            }
        }

        // Navbar scroll effect
        class NavbarController {
            constructor() {
                this.navbar = document.querySelector('.navbar');
                this.initScrollListener();
            }

            initScrollListener() {
                let lastScrollTop = 0;
                
                window.addEventListener('scroll', () => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > 100) {
                        this.navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                    } else {
                        this.navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                    }
                    
                    lastScrollTop = scrollTop;
                });
            }
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ThreeJSScene();
            new FormValidator();
            new SmoothScroll();
            new NavbarController();
        });

        // Add some interactive animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.addEventListener('DOMContentLoaded', () => {
            const animateElements = document.querySelectorAll('.project-card, .about-content');
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });
        