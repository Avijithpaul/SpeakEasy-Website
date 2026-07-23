import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

function PageMotion({ children }) {
  const { pathname } = useLocation()
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current?.firstElementChild
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!page || prefersReducedMotion) {
      return undefined
    }

    const observedElements = new Set()

    const showElement = (element) => {
      element.classList.add('is-visible')
    }

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              showElement(entry.target)
              observer.unobserve(entry.target)
              observedElements.delete(entry.target)
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
      )
      : null

    const prepareElement = (element, index = 0) => {
      element.dataset.motionReady = 'true'
      element.style.setProperty('--motion-delay', `${Math.min(index * 45, 180)}ms`)
      element.classList.add('motion-reveal')

      if (isInViewport(element)) {
        showElement(element)
        return
      }

      if (observer) {
        observer.observe(element)
        observedElements.add(element)
      } else {
        showElement(element)
      }
    }

    const gridSelector = [
      '[class*=grid]',
      '.timeline',
      '.mode-list',
      '.modes-list',
      '.passage-list',
      '.topic-list',
      '.side-selection',
      '.navigation',
      '.cta-actions',
      '.hero-stats',
      '.review-stats',
    ].join(', ')

    const prepareGridItems = (scope) => {
      const grids = scope.matches?.(gridSelector)
        ? [scope, ...scope.querySelectorAll(gridSelector)]
        : scope.querySelectorAll(gridSelector)

      grids.forEach((grid) => {
        Array.from(grid.children).forEach((item, index) => {
          item.classList.add('motion-item')
          item.style.setProperty('--motion-item-delay', `${Math.min(index * 70, 280)}ms`)
        })
      })
    }

    const resetElement = (element) => {
      element.classList.remove('motion-reveal', 'is-visible', 'motion-item')
      delete element.dataset.motionReady
      element.style.removeProperty('--motion-delay')
      element.style.removeProperty('--motion-item-delay')
    }

    const preparePageChildren = () => {
      Array.from(page.children).forEach((element, index) => {
        resetElement(element)
        prepareElement(element, index)
      })
    }

    preparePageChildren()
    prepareGridItems(page)

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        prepareGridItems(record.target)

        record.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) {
            return
          }

          if (node.parentElement === page) {
            resetElement(node)
            prepareElement(node, Array.from(page.children).indexOf(node))
          }

          prepareGridItems(node)
        })
      })
    })

    mutationObserver.observe(page, { childList: true, subtree: true })

    const fallbackTimer = window.setTimeout(() => {
      Array.from(page.children).forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          showElement(element)
        }
      })
    }, 800)

    return () => {
      window.clearTimeout(fallbackTimer)
      mutationObserver.disconnect()
      observer?.disconnect()
      observedElements.clear()
      Array.from(page.children).forEach(resetElement)
    }
  }, [pathname])

  return (
    <div className="route-motion" key={pathname} ref={pageRef}>
      {children}
    </div>
  )
}

export default PageMotion
