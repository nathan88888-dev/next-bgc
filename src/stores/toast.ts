import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
    id: number
    message: string
    type: ToastType
    duration: number
}

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Toast[]
    }),
    actions: {
        addToast(message: string, type: ToastType = 'info', duration: number = 3000) {
            const id = Date.now()
            this.toasts.push({ id, message, type, duration })

            if (duration > 0) {
                setTimeout(() => {
                    this.removeToast(id)
                }, duration)
            }

            return id
        },
        removeToast(id: number) {
            const index = this.toasts.findIndex((t) => t.id === id)
            if (index !== -1) {
                this.toasts.splice(index, 1)
            }
        }
    }
})
