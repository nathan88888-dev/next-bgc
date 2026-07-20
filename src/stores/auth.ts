import { defineStore } from 'pinia';
import { pb } from '@/lib/pocketbase';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(pb.authStore.model);
    const isValid = ref(pb.authStore.isValid);

    pb.authStore.onChange((_token, model) => {
        user.value = model;
        isValid.value = pb.authStore.isValid;
    });

    const logout = () => {
        pb.authStore.clear();
    };

    const refreshUser = async () => {
        if (pb.authStore.isValid && pb.authStore.model) {
            try {
                const userData = await pb.collection('users').getOne(pb.authStore.model.id, {
                    // Always expand common fields we might need globally
                    expand: 'location_ref',
                    requestKey: null // Disable auto-cancellation
                });
                pb.authStore.save(pb.authStore.token, userData);
            } catch (error) {
                console.error('Failed to refresh user data:', error);
            }
        }
    };

    return {
        user,
        isValid,
        logout,
        refreshUser
    };
});
