import { useEffect, useState } from 'react'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const MIN_WIDTH_SCREEN = 771

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= MIN_WIDTH_SCREEN)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return (() => {
      window.removeEventListener('resize', checkWidth)
    })
  }, [isMobile])

  return isMobile
}