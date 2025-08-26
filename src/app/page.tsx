'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    window.location.replace('/presentacion/index.html')
  }, [])
  return null
}

