// ===== KRIYA WEBSITE - COMPLETE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MANUAL TOOLTIP SYSTEM =====
  function initManualTooltips() {
    if (window.innerWidth <= 991.98) {
      return;
    }

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    // Create tooltip arrow
    const tooltipArrow = document.createElement('div');
    tooltipArrow.className = 'tooltip-arrow';
    document.body.appendChild(tooltipArrow);
    
    // Get all elements with tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    let activeElement = null;
    let tooltipTimeout = null;

    function positionTooltip(element) {
      if (!element) return;

      tooltip.classList.remove('left');
      tooltipArrow.classList.remove('left');

      const rect = element.getBoundingClientRect();
      const spacing = 16;
      const arrowSpacing = 8;

      const tooltipHeight = tooltip.offsetHeight;
      const tooltipWidth = tooltip.offsetWidth;

      let tooltipX = rect.right + spacing;
      let tooltipY = rect.top + (rect.height / 2) - (tooltipHeight / 2);

      if (tooltipX + tooltipWidth > window.innerWidth - 12) {
        tooltipX = rect.left - tooltipWidth - spacing;
        tooltip.classList.add('left');
        tooltipArrow.classList.add('left');
      }

      tooltipX = Math.max(12, tooltipX);
      tooltipY = Math.max(10, Math.min(tooltipY, window.innerHeight - tooltipHeight - 10));

      tooltip.style.left = tooltipX + 'px';
      tooltip.style.top = tooltipY + 'px';

      let arrowLeft = rect.right + arrowSpacing;
      if (tooltipArrow.classList.contains('left')) {
        arrowLeft = rect.left - arrowSpacing;
      }

      const tooltipTop = tooltipY;
      const tooltipBottom = tooltipY + tooltipHeight;
      let arrowTop = rect.top + (rect.height / 2) - 6;
      arrowTop = Math.max(tooltipTop + 8, Math.min(arrowTop, tooltipBottom - 14));

      tooltipArrow.style.left = arrowLeft + 'px';
      tooltipArrow.style.top = arrowTop + 'px';
    }

    // Show tooltip function
    function showTooltip(element, text) {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = null;
      }

      tooltip.textContent = text;
      tooltip.classList.add('visible');
      tooltipArrow.classList.add('visible');

      positionTooltip(element);

      activeElement = element;
    }

    // Hide tooltip function
    function hideTooltip() {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }

      tooltipTimeout = setTimeout(() => {
        tooltip.classList.remove('visible', 'left');
        tooltipArrow.classList.remove('visible', 'left');
        activeElement = null;
      }, 100);
    }
    
    // Add event listeners to all tooltip elements
    tooltipElements.forEach(element => {
      // Mouse enter
      element.addEventListener('mouseenter', function(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        if (tooltipText) {
          showTooltip(this, tooltipText);
        }
      });
      
      // Mouse leave
      element.addEventListener('mouseleave', function(e) {
        hideTooltip();
      });
      
      // Mouse move (for follow cursor, optional)
      element.addEventListener('mousemove', function() {
        if (activeElement === this) {
          positionTooltip(this);
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (activeElement) {
        positionTooltip(activeElement);
      }
    });

    // Handle scroll
    window.addEventListener('scroll', function() {
      if (activeElement) {
        positionTooltip(activeElement);
      }
    });
    
    console.log('Manual tooltip system initialized');
  }

  // ===== PREMIUM PRELOADER =====
  const preloader = document.getElementById('preloader');
  
  function initPreloader() {
    if (!preloader) return;
    
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('fade-out');
        setTimeout(function() {
          preloader.style.display = 'none';
          document.body.classList.add('loaded');
        }, 500);
      }, 1000);
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(function() {
      if (!document.body.classList.contains('loaded')) {
        preloader.classList.add('fade-out');
        setTimeout(function() {
          preloader.style.display = 'none';
          document.body.classList.add('loaded');
        }, 500);
      }
    }, 3000);
  }

  // ===== FIXED NAVBAR WITH PROPER SUBMENU BEHAVIOR =====
  function initFixedNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const categoryItems = document.querySelectorAll('.category-item');

    function decorateSubmenuHeaders() {
      const iconMap = {
        'Biocontrol Products': 'pest_control',
        'Biostimulant Products': 'spa',
        'Substrate Products': 'compost',
        'Home & Garden': 'home'
      };

      document.querySelectorAll('.dropdown-products .submenu-header').forEach(header => {
        if (header.querySelector('.submenu-icon')) return;

        const title = header.querySelector('h5')?.textContent.trim() || '';
        const iconName = iconMap[title] || 'category';

        const icon = document.createElement('span');
        icon.className = 'submenu-icon material-symbols-outlined';
        icon.textContent = iconName;

        const textWrap = document.createElement('div');
        textWrap.className = 'submenu-text';
        while (header.firstChild) {
          textWrap.appendChild(header.firstChild);
        }

        header.appendChild(icon);
        header.appendChild(textWrap);
      });

      const techIconMap = {
        'Karyo Technology': 'precision_manufacturing',
        'Wynn Formulation': 'biotech'
      };

      document.querySelectorAll('.dropdown-tech .tech-item-compact').forEach(item => {
        if (item.querySelector('.tech-submenu-icon')) return;

        const title = item.querySelector('h5')?.textContent.trim() || '';
        const iconName = techIconMap[title] || 'science';

        const icon = document.createElement('span');
        icon.className = 'tech-submenu-icon material-symbols-outlined';
        icon.textContent = iconName;

        const content = item.querySelector('.tech-content-compact');
        if (content) {
          item.insertBefore(icon, content);
        } else {
          item.insertBefore(icon, item.firstChild);
        }
      });
    }

    if (!navbar) return;

    decorateSubmenuHeaders();

    // Scroll effect with performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
          scrollTimeout = null;
          if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }, 10);
      }
    });

    // Enhanced submenu behavior with scrollable grids
    let closeTimeout;
    let submenuTimeout;
    const closeDelay = 200;
    const submenuDelay = 150;

    // Fixed dropdown behavior
    dropdowns.forEach(dropdown => {
      const dropbtn = dropdown.querySelector('.dropbtn');
      const dropdownContent = dropdown.querySelector('.dropdown-content');

      if (!dropbtn || !dropdownContent) return;

      dropbtn.addEventListener('click', function(e) {
        const isMobile = window.innerWidth <= 991.98;

        if (!isMobile && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
          return;
        }

        const wasActive = dropdown.classList.contains('active');

        if (isMobile) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });

          if (wasActive) {
            dropdown.classList.remove('active');
            categoryItems.forEach(item => {
              if (dropdown.contains(item)) {
                item.classList.remove('active');
                item.classList.remove('submenu-active');
              }
            });
          } else {
            dropdown.classList.add('active');
          }

          categoryItems.forEach(item => {
            if (!dropdown.contains(item)) {
              item.classList.remove('active');
              item.classList.remove('submenu-active');
            }
          });
        } else {
          e.preventDefault();
          e.stopPropagation();

          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });

          categoryItems.forEach(item => {
            if (!dropdown.contains(item)) {
              item.classList.remove('submenu-active');
            }
          });

          if (wasActive) {
            dropdown.classList.remove('active');
            categoryItems.forEach(item => {
              if (dropdown.contains(item)) {
                item.classList.remove('submenu-active');
              }
            });
          } else {
            dropdown.classList.add('active');

            const submenuGrids = dropdown.querySelectorAll('.submenu-grid');
            submenuGrids.forEach(grid => {
              grid.scrollTop = 0;
            });
          }
        }
      });

      // Mouse enter - show dropdown immediately
      dropdown.addEventListener('mouseenter', function() {
        if (window.innerWidth > 991.98) {
          clearTimeout(closeTimeout);
          clearTimeout(submenuTimeout);

          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });

          categoryItems.forEach(item => {
            if (!dropdown.contains(item)) {
              item.classList.remove('submenu-active');
            }
          });

          this.classList.add('active');

          // Reset scroll position of submenu grids when opening
          const submenuGrids = this.querySelectorAll('.submenu-grid');
          submenuGrids.forEach(grid => {
            grid.scrollTop = 0;
          });
        }
      });
      
      // Mouse leave - hide with delay
      dropdown.addEventListener('mouseleave', function(e) {
        if (window.innerWidth > 991.98) {
          const relatedDropdown = e.relatedTarget?.closest('.dropdown');
          const relatedDropdownContent = e.relatedTarget?.closest('.dropdown-content');
          
          if (!relatedDropdown && !relatedDropdownContent) {
            closeTimeout = setTimeout(() => {
              this.classList.remove('active');
              
              // Close any open submenus
              categoryItems.forEach(item => {
                item.classList.remove('submenu-active');
              });
            }, closeDelay);
          }
        }
      });
      
      // Keep dropdown open when hovering over content
      dropdownContent.addEventListener('mouseenter', function() {
        clearTimeout(closeTimeout);
        if (window.innerWidth > 991.98) {
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });

          categoryItems.forEach(item => {
            if (!dropdown.contains(item)) {
              item.classList.remove('submenu-active');
            }
          });
        }
      });
      
      dropdownContent.addEventListener('mouseleave', function(e) {
        if (window.innerWidth > 991.98) {
          const relatedDropdown = e.relatedTarget?.closest('.dropdown');
          
          if (!relatedDropdown) {
            closeTimeout = setTimeout(() => {
              dropdown.classList.remove('active');
            }, closeDelay);
          }
        }
      });
    });

    // Enhanced category item and submenu behavior
    categoryItems.forEach(category => {
      const categoryLink = category.querySelector('.category-link');
      const submenu = category.querySelector('.submenu');
      const submenuGrid = category.querySelector('.submenu-grid');
      
      if (!categoryLink) return;

      if (!submenu) {
        category.addEventListener('mouseenter', function() {
          if (window.innerWidth > 991.98) {
            categoryItems.forEach(otherCategory => {
              otherCategory.classList.remove('submenu-active');
            });
          }
        });

        categoryLink.addEventListener('focus', function() {
          categoryItems.forEach(otherCategory => {
            otherCategory.classList.remove('submenu-active');
          });
        });

        categoryLink.addEventListener('click', function() {
          categoryItems.forEach(otherCategory => {
            otherCategory.classList.remove('active');
            otherCategory.classList.remove('submenu-active');
          });
        });

        return;
      }

      categoryLink.addEventListener('click', function(e) {
        const isMobile = window.innerWidth <= 991.98;
        const wasActiveMobile = category.classList.contains('active');
        const wasActiveDesktop = category.classList.contains('submenu-active');
        const hrefValue = categoryLink.getAttribute('href') || '';
        const allowDirectNav =
          categoryLink.dataset.allowNav === 'true' ||
          categoryLink.classList.contains('allow-desktop-nav') ||
          /biocontrol\.html|biostimulants\.html|substrates\.html/.test(hrefValue);

        if (!isMobile && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
          return;
        }

        if (allowDirectNav) {
          return;
        }

        if (isMobile) {
          e.preventDefault();
          e.stopPropagation();

          categoryItems.forEach(otherCategory => {
            if (otherCategory !== category) {
              otherCategory.classList.remove('active');
              otherCategory.classList.remove('submenu-active');
            }
          });

          if (wasActiveMobile) {
            category.classList.remove('active');
            category.classList.remove('submenu-active');
          } else {
            category.classList.add('active');
            category.classList.add('submenu-active');

            if (submenu) {
              const submenuGrid = category.querySelector('.submenu-grid');
              if (submenuGrid) {
                submenuGrid.scrollTop = 0;
              }
            }
          }
        } else {
          e.preventDefault();

          categoryItems.forEach(otherCategory => {
            if (otherCategory !== category) {
              otherCategory.classList.remove('submenu-active');
            }
          });

          if (wasActiveDesktop) {
            category.classList.remove('submenu-active');
          } else {
            category.classList.add('submenu-active');
          }
        }
      });

      category.addEventListener('mouseenter', function() {
        if (window.innerWidth > 991.98) {
          clearTimeout(submenuTimeout);
          // Close other submenus immediately
          categoryItems.forEach(otherCategory => {
            if (otherCategory !== category) {
              otherCategory.classList.remove('submenu-active');
            }
          });
          // Open current submenu with delay
          submenuTimeout = setTimeout(() => {
            this.classList.add('submenu-active');
          }, submenuDelay);
        }
      });

      category.addEventListener('mouseleave', function(e) {
        if (window.innerWidth > 991.98) {
          const relatedSubmenu = e.relatedTarget?.closest('.submenu');
          const relatedCategory = e.relatedTarget?.closest('.category-item');
          
          if (!relatedSubmenu && !relatedCategory) {
            clearTimeout(submenuTimeout);
            this.classList.remove('submenu-active');
          }
        }
      });

      // Submenu hover - keep it open
      submenu.addEventListener('mouseenter', function() {
        clearTimeout(submenuTimeout);
        category.classList.add('submenu-active');
      });

      submenu.addEventListener('mouseleave', function(e) {
        if (window.innerWidth > 991.98) {
          const relatedCategory = e.relatedTarget?.closest('.category-item');
          
          if (!relatedCategory) {
            clearTimeout(submenuTimeout);
            category.classList.remove('submenu-active');
          }
        }
      });

      // Enhanced scroll behavior for submenu grids
      if (submenuGrid) {
        submenuGrid.addEventListener('wheel', function(e) {
          // Prevent horizontal scroll
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
          }
        });

        // Touch events for mobile
        let touchStartY = 0;
        submenuGrid.addEventListener('touchstart', function(e) {
          touchStartY = e.touches[0].clientY;
        }, { passive: true });

        submenuGrid.addEventListener('touchmove', function(e) {
          if (window.innerWidth <= 991.98) {
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            // If scrolling up from top or down from bottom, prevent
            if ((this.scrollTop === 0 && diff < 0) || 
                (this.scrollTop + this.clientHeight >= this.scrollHeight - 1 && diff > 0)) {
              e.preventDefault();
            }
          }
        }, { passive: false });
      }
    });

    // Mobile menu functionality
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        const isOpening = !this.classList.contains('active');
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Enhanced body scroll lock
        if (isOpening) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      });
      
      // Enhanced mobile menu closing
      const navLinks = document.querySelectorAll('.nav-link:not(.dropbtn)');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          
          // Close all submenus on mobile
          categoryItems.forEach(category => {
            category.classList.remove('active');
            category.classList.remove('submenu-active');
          });
        });
      });
      
      // Enhanced click outside to close
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991.98 &&
            !e.target.closest('.dropdown') &&
            !e.target.closest('#nav-toggle') &&
            !e.target.closest('.nav-menu')) {
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
          });
          categoryItems.forEach(category => {
            category.classList.remove('active');
            category.classList.remove('submenu-active');
          });

          if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Close all submenus
            categoryItems.forEach(category => {
              category.classList.remove('active');
              category.classList.remove('submenu-active');
            });
          } else if (window.innerWidth > 991.98) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            categoryItems.forEach(category => category.classList.remove('submenu-active'));
          }
        }
      });
    }

    // Close desktop dropdowns on outside click
    document.addEventListener('click', function(e) {
      if (window.innerWidth > 991.98 && !e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
        categoryItems.forEach(category => {
          category.classList.remove('submenu-active');
        });
      }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if (window.innerWidth > 991.98) {
          // Reset mobile menu state on desktop
          if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
          
          // Close all dropdowns and submenus on resize
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
          });
          categoryItems.forEach(category => {
            category.classList.remove('active');
            category.classList.remove('submenu-active');
          });
        }
      }, 250);
    });
  }

  // ===== PDF DOWNLOAD FUNCTIONALITY =====
  function initDownloadButton() {
    const downloadBtn = document.getElementById('download-catalog');

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        // Allow default download behavior but add loading state
        const originalHTML = this.innerHTML;
        this.innerHTML = `
          <span class="btn-loading">
            <span class="loading-spinner"></span>
            Downloading...
          </span>
        `;
        this.style.pointerEvents = 'none';
        
        // Show success notification after a delay
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.pointerEvents = 'auto';
          showDownloadSuccess();
        }, 2000);
        
        // The download attribute will handle the actual download
      });
    }
  }

  function initVariantDownloadButtons() {
    const variantButtons = document.querySelectorAll('.variant-link[data-file], .btn-download[data-file]');

    if (!variantButtons.length) {
      return;
    }

    variantButtons.forEach(button => {
      button.addEventListener('click', function() {
        const file = this.getAttribute('data-file');

        if (!file) {
          return;
        }

        const newWindow = window.open(file, '_blank', 'noopener');

        if (newWindow) {
          newWindow.opener = null;
        }
      });
    });
  }

  function showDownloadSuccess() {
    // Remove existing notifications
    const existingNotification = document.querySelector('.download-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="material-symbols-outlined" style="color: #00ac0eff;">check_circle</span>
        <span>Product catalog downloaded successfully!</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 400);
      }
    }, 4000);
  }

  // ===== CONTACT FORM MAILTO =====
  function initContactForm() {
    const form = document.getElementById('kriyaContactForm');

    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get('name') || '').trim();
      const company = (formData.get('company') || '').trim();
      const country = (formData.get('country') || '').trim();
      const email = (formData.get('email') || '').trim();
      const whatsapp = (formData.get('whatsapp') || '').trim();
      const interest = (formData.get('interest') || '').trim();
      const message = (formData.get('message') || '').trim();

      const subjectLabel = interest || 'General Inquiry';
      const identifier = company || name || 'Prospect';
      const subject = encodeURIComponent(`Kriya Inquiry - ${subjectLabel} (${identifier})`);

      const bodyLines = [
        `Name: ${name || '-'}`,
        `Company: ${company || '-'}`,
        `Country: ${country || '-'}`,
        `Email: ${email || '-'}`,
        `WhatsApp: ${whatsapp || 'N/A'}`,
        `Product Interest: ${interest || '-'}`,
        '',
        'Message:',
        message || '-',
        '',
        '---',
        'Submitted via kriya.ltd contact form'
      ];

      const mailtoLink = `mailto:info@kriya.ltd?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
      }

      window.location.href = mailtoLink;

      setTimeout(() => {
        form.reset();
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove('disabled');
        }
      }, 1200);
    });
  }

  // ===== BACK TO TOP BUTTON =====
  function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (!backToTopButton) return;
    
    // Show/hide back to top button based on scroll position
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
          scrollTimeout = null;
          if (window.pageYOffset > 80) {
            backToTopButton.classList.add('visible');
          } else {
            backToTopButton.classList.remove('visible');
          }
        }, 10);
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== SMOOTH SCROLLING =====
  function initSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.offsetTop - 100;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without pushing to history
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
        }
      });
    });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const revealSelectors = [
      '.page-hero',
      '.page-hero .page-hero-content',
      '.page-hero .page-hero-visual',
      '.hero-metric',
      '.hero-actions',
      '.section',
      '.section .section-header',
      '.section .section-description',
      '.product-overview-grid > *',
      '.overview-copy',
      '.overview-insights .insight-card',
      '.variant-card',
      '.feature-card',
      '.mode-visual',
      '.mode-grid > *',
      '.coverage-card',
      '.dosage-card',
      '.use-card',
      '.compatibility-card',
      '.storage-card',
      '.contact-card',
      '.value-grid > *',
      '.steps-grid > *',
      '.mission-vision > *',
      '.story-grid > *',
      '.technology-grid > *',
      '.manufacturing-grid > *',
      '.cta',
      '.cta .cta-content',
      '.footer-strip',
      '.footer-meta',
      '.hero-showcase',
      '.floating-card',
      '.why-card',
      '.category-card',
      '.product-card',
      '.cert-card'
    ];

    const revealElements = new Set();

    document.querySelectorAll('[data-reveal]').forEach(element => {
      revealElements.add(element);
    });

    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        revealElements.add(element);
      });
    });

    if (!revealElements.size) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    revealElements.forEach(element => {
      if (!element.classList.contains('reveal-exclude')) {
        element.classList.add('reveal-ready');
      }
    });

    if (prefersReducedMotion) {
      revealElements.forEach(element => {
        element.classList.add('reveal-visible');
        element.classList.remove('reveal-ready');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('reveal-visible');
          });
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });

    const activateVisible = () => {
      revealElements.forEach(element => {
        if (element.classList.contains('reveal-visible')) {
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          element.classList.add('reveal-visible');
          observer.unobserve(element);
        }
      });
    };

    window.addEventListener('load', activateVisible);
    window.addEventListener('scroll', debounce(activateVisible, 80), { passive: true });
    activateVisible();

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.4}s`;
    });
  }

  // ===== INITIALIZE ALL FUNCTIONALITY =====
  function initAll() {
    initPreloader();
    initFixedNavbar();
    initSmoothScrolling();
    initScrollReveal();
    initDownloadButton();
    initVariantDownloadButtons();
    initBackToTop();
    initContactForm();
    initManualTooltips();

    console.log('Kriya Website - All functionality initialized');
  }

  // Start initialization
  initAll();

});

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}