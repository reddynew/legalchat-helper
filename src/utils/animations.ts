
// Utility functions for animations and transitions

// Function for staggered animation of multiple elements
export const staggerAnimation = (elements: HTMLElement[], delay = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate-fade-up');
      element.style.opacity = '1';
    }, index * delay);
  });
};

// Function for smooth scroll to element
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Intersection observer for revealing elements on scroll
export const createScrollRevealObserver = (
  animationClass = 'animate-fade-up', 
  threshold = 0.1
) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          entry.target.style.opacity = '1';
        }
      });
    },
    { threshold }
  );
};

// Typing animation for text
export const typeText = (
  element: HTMLElement, 
  text: string, 
  speed = 50
): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        resolve();
      }
    }, speed);
  });
};
