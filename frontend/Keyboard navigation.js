//keyboard navigation for profile management 
class KeyboardNavigation {
  constructor() {
    this.currentFocusIndex = -1;  // Tracks currently focused element
    this.focusableElements = []; // Stores all focusable elements
    this.subMenuOpen = false;  // Tracks submenu state
    
    // Bind methods (to ensure 'this' refers to the class instance when they're used as event handlers)
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.initializeNavigation = this.initializeNavigation.bind(this);
    
    // Initialize
    this.initializeNavigation();
  }

  initializeNavigation() {
    // Get all focusable elements in the profile section 
    this.focusableElements = Array.from(document.querySelectorAll(`
      .profile-section button,
      .profile-section input,
      .profile-section a,
      .profile-section select,
      .profile-section [tabindex="0"]
    `));

    // Add keyboard event listeners
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Set initial focus on first element
    if (this.focusableElements.length > 0) {
      this.currentFocusIndex = 0;
      this.focusableElements[0].focus();
    }
  }

  handleKeyDown(event) {
    switch(event.key) {
      case 'Tab':
        // Prevent default Tab behavior and handle focus manually
        event.preventDefault();
        this.handleTabNavigation(event.shiftKey); //line 76
        break;
        
      case 'Enter':
      case ' ': // Space key
        event.preventDefault();
        this.handleActivation(); //line 87
        break;
        
      case 'Escape':
        this.handleEscape(); //line 101
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        this.navigateVertical(-1); //line 107
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        this.navigateVertical(1); //line 107
        break;
        
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateHorizontal(-1); //line 121
        break;
        
      case 'ArrowRight':
        event.preventDefault();
        this.navigateHorizontal(1); //line 121
        break;
    }
  }

  handleTabNavigation(isShiftKey) {
    if (isShiftKey) { //move backward
      this.currentFocusIndex = this.currentFocusIndex <= 0 ? 
        this.focusableElements.length - 1 : this.currentFocusIndex - 1;
    } else { //move forward
      this.currentFocusIndex = this.currentFocusIndex >= this.focusableElements.length - 1 ? 
        0 : this.currentFocusIndex + 1;
    }
    this.focusableElements[this.currentFocusIndex].focus();
  }

  handleActivation() {
    const currentElement = this.focusableElements[this.currentFocusIndex];
    
    if (currentElement.getAttribute('role') === 'button' || 
        currentElement.tagName.toLowerCase() === 'button') {
      currentElement.click();
    }
    
    // Handle submenu toggling
    if (currentElement.classList.contains('submenu-trigger')) {
      this.toggleSubmenu(currentElement);
    }
  }

  handleEscape() {
    if (this.subMenuOpen) {
      this.closeAllSubmenus();
    }
  }

  navigateVertical(direction) {
    let newIndex = this.currentFocusIndex + direction;
    
    // Loop around if we reach the ends 
    if (newIndex < 0) {
      newIndex = this.focusableElements.length - 1;
    } else if (newIndex >= this.focusableElements.length) {
      newIndex = 0;
    }
    
    this.currentFocusIndex = newIndex;
    this.focusableElements[this.currentFocusIndex].focus();
  }

  navigateHorizontal(direction) {
    // Implement horizontal navigation for elements that are laid out horizontally
    const currentElement = this.focusableElements[this.currentFocusIndex];
    
    if (currentElement.classList.contains('horizontal-nav-item')) {
      let newIndex = this.currentFocusIndex + direction;
      
      // Find next/previous horizontal item
      while (newIndex >= 0 && newIndex < this.focusableElements.length) {
        if (this.focusableElements[newIndex].classList.contains('horizontal-nav-item')) {
          this.currentFocusIndex = newIndex;
          this.focusableElements[newIndex].focus();
          break;
        }
        newIndex += direction;
      }
    }
  }

  toggleSubmenu(triggerElement) {
    const submenuId = triggerElement.getAttribute('aria-controls');
    const submenu = document.getElementById(submenuId);
    
    if (submenu) {   // Toggle submenu visibility
      const isExpanded = triggerElement.getAttribute('aria-expanded') === 'true';
      triggerElement.setAttribute('aria-expanded', !isExpanded);
      submenu.style.display = isExpanded ? 'none' : 'block';
      this.subMenuOpen = !isExpanded;
      
      if (!isExpanded) { 
        // Focus first element in submenu
        const firstSubmenuElement = submenu.querySelector('[tabindex="0"], button, a');
        if (firstSubmenuElement) {
          firstSubmenuElement.focus();
        }
      }
    }
  }

  closeAllSubmenus() {
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
      submenu.style.display = 'none';
      const trigger = document.querySelector(`[aria-controls="${submenu.id}"]`);
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    this.subMenuOpen = false;
  }
}

// Initialize keyboard navigation
const profileNav = new KeyboardNavigation();