import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pb } from '@/lib/pocketbase'
import { useI18nStore } from './i18n'

export const useEnumsStore = defineStore('enums', () => {
    const i18nStore = useI18nStore()
    const states = ref<any[]>([])
    const categories = ref<any[]>([])
    const frequencies = ref<any[]>([])
    const private_levels = ref<any[]>([])
    const experience_levels = ref<any[]>([])
    const languages = ref<any[]>([])
    const social_platforms = ref<any[]>([])
    const report_reasons = ref<any[]>([])
    const playstyles = ref<any[]>([])

    const isLoaded = ref(false)
    const isLoading = ref(false)

    const fetchAllEnums = async (force = false) => {
        if (isLoaded.value && !force) return
        if (isLoading.value) return

        isLoading.value = true
        try {
            const [
                statesRes,
                categoriesRes,
                frequenciesRes,
                privateLevelsRes,
                experienceLevelsRes,
                languagesRes,
                socialPlatformsRes,
                reportReasonsRes,
                playstylesRes
            ] = await Promise.all([
                pb.collection('enum_state').getFullList({ sort: 'name' }),
                pb.collection('enum_categories').getFullList({ sort: 'name' }),
                pb.collection('enum_frequencies').getFullList({ sort: 'name' }),
                pb.collection('enum_privacy_levels').getFullList({ sort: 'name' }),
                pb.collection('enum_experience_levels').getFullList({ sort: 'name' }),
                pb.collection('enum_languages').getFullList({ sort: 'name' }),
                pb.collection('enum_social_platforms').getFullList({ sort: 'name' }),
                pb.collection('enum_report_reasons').getFullList({ sort: 'name' }),
                pb.collection('enum_playstyles').getFullList({ sort: 'name' })
            ])

            states.value = statesRes
            categories.value = categoriesRes
            frequencies.value = frequenciesRes
            private_levels.value = privateLevelsRes
            experience_levels.value = experienceLevelsRes
            languages.value = languagesRes
            social_platforms.value = socialPlatformsRes
            report_reasons.value = reportReasonsRes
            playstyles.value = playstylesRes

            isLoaded.value = true
        } catch (err) {
            console.error('Failed to fetch enums:', err)
        } finally {
            isLoading.value = false
        }
    }

    const getTranslatedName = (item: any) => {
        if (!item) return ''
        const locale = i18nStore.locale
        if (locale === 'en') return item.name
        const fieldKey = `name_${locale}`
        return item[fieldKey] || item.name
    }

    return {
        states,
        categories,
        frequencies,
        private_levels,
        experience_levels,
        languages,
        social_platforms,
        report_reasons,
        playstyles,
        isLoaded,
        isLoading,
        fetchAllEnums,
        getTranslatedName
    }
})
