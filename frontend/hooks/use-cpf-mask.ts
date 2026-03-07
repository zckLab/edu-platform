"use client"

import { useState, useCallback } from "react"

export function formatCPF(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  
  // Limita a 11 dígitos
  const truncated = numbers.slice(0, 11)
  
  // Aplica a máscara
  if (truncated.length <= 3) {
    return truncated
  }
  if (truncated.length <= 6) {
    return `${truncated.slice(0, 3)}.${truncated.slice(3)}`
  }
  if (truncated.length <= 9) {
    return `${truncated.slice(0, 3)}.${truncated.slice(3, 6)}.${truncated.slice(6)}`
  }
  return `${truncated.slice(0, 3)}.${truncated.slice(3, 6)}.${truncated.slice(6, 9)}-${truncated.slice(9)}`
}

export function useCPFMask(initialValue: string = "") {
  const [value, setValue] = useState(formatCPF(initialValue))
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatCPF(e.target.value))
  }, [])
  
  const rawValue = value.replace(/\D/g, "")
  const isValid = rawValue.length === 11
  
  return {
    value,
    rawValue,
    isValid,
    onChange: handleChange,
    setValue: (v: string) => setValue(formatCPF(v)),
  }
}
