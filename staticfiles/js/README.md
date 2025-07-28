# JavaScript Architecture Documentation

## Overview
The JavaScript codebase has been refactored from a single monolithic `main.js` file into a modular, page-specific architecture for better maintainability, performance, and organization.

## File Structure

### Core Modules (Loaded on every page)
1. **`utils.js`** - Utility functions used across the application
2. **`form-validation.js`** - Centralized form validation logic
3. **`modal.js`** - Modal functionality and management
4. **`lazy-load.js`** - Image lazy loading implementation
5. **`core-animations.js`** - Common GSAP animations and scroll effects
6. **`main.js`** - Orchestrates core functionality initialization

### Page-Specific Modules (Loaded only on respective pages)
1. **`home.js`** - Home page specific functionality (existing)
2. **`about.js`** - About page specific functionality (existing)
3. **`contact.js`** - Contact form and page interactions
4. **`donate.js`** - Donation form and payment processing
5. **`volunteer.js`** - Volunteer application and opportunities
6. **`photos.js`** - Photo gallery and lightbox functionality
7. **`team.js`** - Team member interactions and profiles
8. **`activities.js`** - Activities registration and filtering
9. **`adopt-a-dog.js`** - Pet adoption functionality
10. **`testimonial.js`** - Testimonial submission and display
11. **`founders.js`** - Founders page interactions

## Loading Order

### Base Template (`base.html`)
```html
<!-- Core Libraries (loaded first) -->
<script src="gsap.min.js"></script>
<script src="ScrollTrigger.min.js"></script>
<script src="TextPlugin.min.js"></script>

<!-- Core Modules -->
<script src="utils.js"></script>
<script src="form-validation.js"></script>
<script src="modal.js"></script>
<script src="lazy-load.js"></script>
<script src="core-animations.js"></script>

<!-- Main JavaScript -->
<script src="main.js"></script>
```

### Page-Specific Templates
Each page template includes its specific JavaScript in the `extra_js` block:
```html
{% block extra_js %}
<script src="{% static 'js/[page-name].js' %}"></script>
{% endblock %}
```

## Module Descriptions

### Core Modules

#### `utils.js`
- **Purpose**: Common utility functions
- **Functions**:
  - `debounce(func, wait)` - Limits function call frequency
  - `throttle(func, limit)` - Throttles function execution
  - `isInViewport(element)` - Checks if element is visible
  - `smoothScroll(target)` - Smooth scrolling to element

#### `form-validation.js`
- **Purpose**: Centralized form validation
- **Functions**:
  - `isValidEmail(email)` - Email format validation
  - `isValidPhone(phone)` - Phone number validation
  - `showError(input, message)` - Display error messages
  - `clearError(input)` - Clear error states
  - `validateField(input)` - Validate individual field
  - `validateForm(form)` - Validate entire form
  - `init()` - Initialize validation for all forms

#### `modal.js`
- **Purpose**: Modal management
- **Functions**:
  - `init()` - Initialize modal triggers and event listeners
  - `open(modalElement)` - Open modal with animations
  - `close(modalElement)` - Close modal and cleanup

#### `lazy-load.js`
- **Purpose**: Image lazy loading optimization
- **Functions**:
  - `init()` - Initialize lazy loading
  - `polyfill()` - Fallback for unsupported browsers
  - `observerLazyLoad()` - Intersection Observer implementation

#### `core-animations.js`
- **Purpose**: Common GSAP animations
- **Functions**:
  - `initGSAP()` - Initialize GSAP with plugins
  - `initScrollAnimations()` - Common scroll-triggered animations
  - `initStaggerAnimations()` - Staggered list animations
  - `initParallax()` - Parallax effects
  - `animateCounters()` - Number counter animations
  - `initCardAnimations()` - Card hover and scroll animations

#### `main.js` (Refactored)
- **Purpose**: Core functionality orchestration
- **Functions**:
  - Initializes all core modules
  - Sets up common event listeners
  - Provides smooth scrolling for anchor links
  - Manages scroll-based animations

### Page-Specific Modules

#### `contact.js`
- Contact form validation and submission
- Google Maps integration
- Notification system
- Contact page animations

#### `donate.js`
- Donation amount selection
- Recurring vs one-time donation handling
- Payment processing simulation
- Impact calculator
- Donation page animations

#### `volunteer.js`
- Volunteer application form
- Opportunity filtering
- Skills and availability validation
- Testimonials carousel
- Volunteer page animations

#### `photos.js`
- Photo gallery with lightbox
- Image filtering by category
- Keyboard navigation
- Infinite scroll (optional)
- Gallery animations

#### `team.js`
- Team member profile modals
- Enhanced card interactions
- Team statistics counters
- Member filtering and search
- Team page animations

#### `activities.js`
- Activity filtering and search
- Registration modals
- Activity details display
- Calendar integration
- Activities page animations

#### `adopt-a-dog.js`
- Pet filtering by attributes
- Adoption application forms
- Favorites functionality
- Pet details modals
- Adoption page animations

#### `testimonial.js`
- Testimonial submission form
- Image upload preview
- Rating system
- Testimonial filtering
- Share functionality
- Testimonials page animations

#### `founders.js`
- Founder profile interactions
- Contact founder functionality
- Timeline interactions
- Mission statement reveal
- Founders page animations

## Benefits of the New Architecture

### 1. **Performance**
- **Reduced Bundle Size**: Each page only loads necessary JavaScript
- **Faster Initial Load**: Core modules are lightweight and focused
- **Better Caching**: Modular files can be cached individually

### 2. **Maintainability**
- **Separation of Concerns**: Each file has a single responsibility
- **Easier Debugging**: Issues can be isolated to specific modules
- **Code Reusability**: Common functions are centralized in utils and core modules

### 3. **Scalability**
- **Easy Extension**: New pages can have their own JS files
- **Modular Development**: Team members can work on different modules simultaneously
- **Clean Dependencies**: Clear dependency chain and loading order

### 4. **Developer Experience**
- **Better Organization**: Logical file structure
- **Easier Testing**: Smaller, focused modules are easier to unit test
- **Clear Architecture**: Obvious where to add new functionality

## Dependencies

### External Libraries
- **GSAP 3.12.2** - Animation library
- **ScrollTrigger** - Scroll-based animations
- **TextPlugin** - Text animations
- **AOS** - Animate On Scroll library
- **Bootstrap** - Modal and UI components

### Internal Dependencies
```
main.js
├── utils.js
├── form-validation.js
├── modal.js
├── lazy-load.js
└── core-animations.js

[page-specific].js
├── utils.js (dependency)
├── form-validation.js (dependency)
├── modal.js (optional dependency)
└── core-animations.js (optional dependency)
```

## Migration Notes

### Changes Made
1. **Extracted utilities** from main.js to utils.js
2. **Centralized form validation** into form-validation.js
3. **Separated modal logic** into modal.js
4. **Isolated lazy loading** into lazy-load.js
5. **Created core animations module** for common GSAP animations
6. **Created page-specific modules** for each template
7. **Updated templates** to include appropriate JS files

### Breaking Changes
- **None** - All existing functionality is preserved
- **Enhanced** - Added new features to each page-specific module

### Backward Compatibility
- All existing functionality is maintained
- Enhanced with additional features and better error handling
- Improved accessibility and user experience

## Future Enhancements

### Potential Improvements
1. **ES6 Modules**: Convert to ES6 import/export syntax
2. **TypeScript**: Add type safety with TypeScript
3. **Build Process**: Implement webpack or similar for bundling
4. **Testing**: Add unit tests for each module
5. **Service Workers**: Add caching and offline functionality
6. **Progressive Enhancement**: Ensure functionality without JavaScript

### Performance Optimizations
1. **Code Splitting**: Further split large modules
2. **Tree Shaking**: Remove unused code
3. **Minification**: Compress JavaScript files
4. **CDN Delivery**: Use CDN for static assets

## Usage Guidelines

### Adding New Pages
1. Create a new JavaScript file: `[page-name].js`
2. Follow the existing module pattern
3. Add the script tag to the template's `extra_js` block
4. Document any new dependencies or functions

### Modifying Existing Modules
1. Update the appropriate module file
2. Test across all pages that use the module
3. Update documentation if APIs change
4. Consider backward compatibility

### Best Practices
1. Use the existing utility functions when possible
2. Follow the established naming conventions
3. Add proper error handling and accessibility features
4. Test on different devices and browsers
5. Keep modules focused and cohesive
