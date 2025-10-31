import React, { createContext, useContext, useCallback, useState } from 'react'

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, { type = 'info', timeout = 4000 } = {}) => {
    const id = Math.random().toString(36).slice(2, 9)
    const t = { id, message, type }
    setToasts((s) => [...s, t])
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id))
    }, timeout)
  }, [])

  // Listen for global toast events for simple cross-file notification
  React.useEffect(() => {
    const handler = (e) => {
      const { message, type } = e.detail || {}
      if (message) showToast(message, { type })
    }
    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [showToast])

  const removeToast = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-sm w-full px-4 py-2 rounded shadow-lg text-sm text-white ${
              t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>{t.message}</div>
              <button onClick={() => removeToast(t.id)} className="ml-4 opacity-80 hover:opacity-100">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastContext
