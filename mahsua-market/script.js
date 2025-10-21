document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // --- Mobile Dropdown Logic (CORRECTED) ---
    const dropdown = document.querySelector('.nav-dropdown');

    if (dropdown) {
        const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                // This is a more robust way to check if we are in "mobile view".
                // It checks if the hamburger menu is currently visible, which is controlled by our CSS media queries.
                if (getComputedStyle(hamburger).display !== 'none') {
                    e.preventDefault(); // Stop the link from trying to navigate anywhere on tap.
                    dropdown.classList.toggle('active'); // Toggle the .active class to show/hide the dropdown menu.
                }
            });
        }
    }


    // --- Product Modal Logic ---
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const detailsButtons = document.querySelectorAll('.details-button');
    
    // Check if modal elements exist before adding listeners
    if (modalOverlay) {
        // Function to open the modal
        const openModal = (card) => {
            // Populate modal with data from the product card
            document.getElementById('modal-product-name').textContent = card.dataset.name;
            document.querySelector('.modal-product-image').src = card.dataset.img;
            document.querySelector('.modal-product-image').alt = card.dataset.name;
            document.getElementById('modal-product-price').innerHTML = `$${card.dataset.price} <span class="original-price">$${card.dataset.originalPrice}</span>`;
            document.getElementById('modal-product-description').textContent = card.dataset.description;

            const featuresList = document.getElementById('modal-product-features');
            featuresList.innerHTML = ''; // Clear previous features
            const features = JSON.parse(card.dataset.features);
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = `✓ ${feature}`;
                featuresList.appendChild(li);
            });
            
            modalOverlay.classList.remove('hidden');
        };

        // Function to close the modal
        const closeModal = () => {
            modalOverlay.classList.add('hidden');
        };

        // Event listeners for opening the modal
        detailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                openModal(productCard);
            });
        });

        // Event listeners for closing the modal
        if(modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // --- Modal Quantity Selector Logic ---
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity-input');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

});

