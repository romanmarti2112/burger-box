import { createContext, useContext, useState } from 'react'
import { BRANCHES } from '../data/menu'

const KEY = 'bb-branch'
const Ctx = createContext(null)

const read = () => {
  try {
    const id = localStorage.getItem(KEY)
    return BRANCHES[id] ? id : null
  } catch {
    return null
  }
}

// id === null => todavía no eligió sucursal (se muestra el selector).
export function BranchProvider({ children }) {
  const [id, setId] = useState(read)
  const setBranch = (next) => {
    setId(next)
    try {
      if (next) localStorage.setItem(KEY, next)
      else localStorage.removeItem(KEY)
    } catch {
      /* sin storage */
    }
  }
  return <Ctx.Provider value={{ branch: BRANCHES[id] ?? BRANCHES.lujan, chosen: !!id, setBranch }}>{children}</Ctx.Provider>
}

export const useBranch = () => useContext(Ctx)
