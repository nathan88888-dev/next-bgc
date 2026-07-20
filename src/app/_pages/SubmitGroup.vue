<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pb } from '@/lib/pocketbase'
import { useAuthStore } from '@/stores/auth'
import { useEnumsStore } from '@/stores/enums'
import { useI18nStore } from '@/stores/i18n'
import { useToastStore } from '@/stores/toast'
import CustomDropdown from '@/components/popOut/CustomDropdown.vue'
import ConfirmDialog from '@/components/popOut/ConfirmDialog.vue'
import Label15Normal from '@/components/typography/Label15Normal.vue'
import LabelTitle from '@/components/typography/LabelTitle.vue'
import Input12border from '@/components/typography/Input12border.vue'
import { fetchLocationByZip } from '@/utils/fetchAPIs'
import { Icons } from '@/lib/Icons'
import { isValidEmail, isValidUrl, isValidMeetupUrl, isValidFacebookUrl, isValidDiscordId } from '@/utils/validators'
import { processImage } from '@/utils/handleImageChange'
import CoverImageUpload from '@/components/coverUpload/CoverImageUpload.vue'
import Captcha from '@/components/popOut/Captcha.vue'

const enumsStore = useEnumsStore()
const i18n = useI18nStore()
const toast = useToastStore()
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const isConfirmOpen = ref(false)
const previewFields = ref<any[]>([])

// Computed translated options

const categoryOptions = computed(() => enumsStore.categories.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))
const playstyleOptions = computed(() => enumsStore.playstyles.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))
const frequencyOptions = computed(() => enumsStore.frequencies.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))
const experienceOptions = computed(() => enumsStore.experience_levels.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))
const languageOptions = computed(() => enumsStore.languages.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))
const stateOptions = computed(() => enumsStore.states.map((o: any) => ({ id: o.id, name: enumsStore.getTranslatedName(o) })))



const form = ref<Record<string, any>>({
  name: '',
  catchline: '',
  description: '',
  city: '',
  state_ref: '',
  category_ref: '',
  frequency_ref: '',
  privacy_ref: '',
  experience_ref: '',
  language_refs: [] as string[],
  playstyle_refs: [] as string[],
  neighborhood: '',
  zipcode: '',
  venue: '',
  note: '',
  
  // Social Links
  website_url: '',
  email_url: '',
  discord_url: '',
  facebook_url: '',
  facebook_type: 'page',
  whatsapp_url: '',
  telegram_url: '',
  meetup_url: '',
  meetup_type: 'public',
  instagram_url: '',
  bgg_url: '',
  reddit_url: '',
  aftergame_co_url: '',
  
  // Captcha
  captcha_id: '',
  captcha_value: ''
})

const captchaRef = ref<any>(null)
const captchaStatus = ref(false)

const activePlatforms = ref<string[]>([])

const SOCIAL_PLATFORMS = computed(() => [
  { 
    key: 'bgg_url', 
    label: i18n.t('submit_group.sections.platforms.bgg_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.bgg_url.placeholder'),
    icon: Icons.BGG
  },
  { 
    key: 'website_url', 
    label: i18n.t('submit_group.sections.platforms.website_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.website_url.placeholder'),
    icon: Icons.Website
  },
  { 
    key: 'discord_url', 
    label: i18n.t('submit_group.sections.platforms.discord_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.discord_url.placeholder'),
    icon: Icons.Discord,
    hint: i18n.t('submit_group.sections.platforms.discord_url.hint')
  },
  { 
    key: 'facebook_url', 
    label: i18n.t('submit_group.sections.platforms.facebook_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.facebook_url.placeholder'),
    icon: Icons.Facebook
  },
  { 
    key: 'meetup_url', 
    label: i18n.t('submit_group.sections.platforms.meetup_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.meetup_url.placeholder'),
    icon: Icons.Meetup
  },
  { 
    key: 'email_url', 
    label: i18n.t('submit_group.sections.platforms.email_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.email_url.placeholder'),
    icon: Icons.Email
  },
  { 
    key: 'whatsapp_url', 
    label: i18n.t('submit_group.sections.platforms.whatsapp_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.whatsapp_url.placeholder'),
    icon: Icons.WhatsApp
  },
  { 
    key: 'reddit_url', 
    label: i18n.t('submit_group.sections.platforms.reddit_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.reddit_url.placeholder'),
    icon: Icons.Reddit
  },
  { 
    key: 'instagram_url', 
    label: i18n.t('submit_group.sections.platforms.instagram_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.instagram_url.placeholder'),
    icon: Icons.Instagram
  },
  { 
    key: 'telegram_url', 
    label: i18n.t('submit_group.sections.platforms.telegram_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.telegram_url.placeholder'),
    icon: Icons.Telegram
  },
  { 
    key: 'aftergame_co_url', 
    label: i18n.t('submit_group.sections.platforms.aftergame_co_url.label'), 
    placeholder: i18n.t('submit_group.sections.platforms.aftergame_co_url.placeholder'),
    icon: Icons.AfterGame
  }
])

const addPlatform = (key: string) => {
  if (!activePlatforms.value.includes(key)) {
    activePlatforms.value.push(key)
  }
}

const removePlatform = (key: string) => {
  activePlatforms.value = activePlatforms.value.filter((k: string) => k !== key)
  form.value[key] = ''
  delete errors.value[key]
}

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})


const isEditing = computed(() => !!route.query.id)
const isReview = computed(() => route.query.review === '1')

onMounted(async () => {
  try {
    await enumsStore.fetchAllEnums()
    if (route.query.id) {
      await loadGroupData(route.query.id as string)
    } else {
      activePlatforms.value = []
      // Set default privacy to public
      const publicOption = enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('public'))
      if (publicOption) {
        form.value.privacy_ref = publicOption.id
      }
      previewUrl.value = null
    }
  } catch (err) {
    console.error('Error fetching submission options:', err)
  }
})

// Auto-fill city and state from zipcode
const handleZipcodeBlur = async () => {
  const result = await fetchLocationByZip(form.value.zipcode)
  if (result) {
    const { city, stateName, stateAbbr } = result
    
    // Set city directly as text if empty
    form.value.city = form.value.city || city
    
    // Find matching state in enumsStore
    const matchingState = enumsStore.states.find((s: any) => 
      s.name.toLowerCase().trim() === stateName.toLowerCase().trim() ||
      s.name.toLowerCase().trim() === stateAbbr.toLowerCase().trim()
    )
    if (matchingState) {
      form.value.state_ref = form.value.state_ref || matchingState.id
    }

    if (city && matchingState) {
      toast.addToast(i18n.t('submit_group.messages.location_auto_filled') || 'Location auto-filled', 'success', 2000)
    }
  }
}

const handlePlatformBlur = (key: string) => {
  const value = form.value[key]
  if (!value) {
    delete errors.value[key]
    return
  }

  if (key === 'email_url') {
    if (!isValidEmail(value)) {
      errors.value[key] = i18n.t('validation.invalid_email') || 'Invalid email address format'
    } else {
      delete errors.value[key]
    }
  } else if (key === 'facebook_url') {
    if (!isValidFacebookUrl(value)) {
      errors.value[key] = i18n.t('validation.invalid_facebook') || 'Invalid Facebook URL (must start with https://www.facebook.com/)'
    } else {
      delete errors.value[key]
    }
  } else if (key === 'discord_url') {
    if (!isValidDiscordId(value)) {
      errors.value[key] = i18n.t('validation.invalid_discord_id') || 'Invalid Discord Server ID (must be 17-19 numeric characters)'
    } else {
      delete errors.value[key]
    }
  } else if (key === 'meetup_url') {
    const validUrl = isValidMeetupUrl(value)
    if (!validUrl) {
      errors.value[key] = i18n.t('validation.invalid_meetup') || 'Invalid Meetup URL (use https://www.meetup.com/group-name/)'
    } else {
      form.value[key] = validUrl
      delete errors.value[key]
    }
  } else if (key.endsWith('_url')) {
    if (!isValidUrl(value)) {
      errors.value[key] = i18n.t('validation.invalid_url') || i18n.t('submit_group.messages.invalid_url') || 'Invalid URL format'
    } else {
      delete errors.value[key]
    }
  }
}

const validateField = (key: string) => {
  const value = form.value[key]
  
  // Social/URL fields
  if (key.endsWith('_url') || key === 'email_url' || ['discord_url', 'facebook_url', 'meetup_url'].includes(key)) {
    handlePlatformBlur(key)
    return
  }

  // Required checks
  const requiredFields = ['name', 'description', 'privacy_ref', 'category_ref', 'frequency_ref', 'experience_ref', 'city', 'state_ref', 'zipcode', 'playstyle_refs', 'language_refs', 'captcha_value']
  if (requiredFields.includes(key)) {
    const isEmpty = Array.isArray(value) ? value.length === 0 : !value
    if (isEmpty) {
      const fieldName = key.replace('_ref', '').replace('_refs', '')
      errors.value[key] = i18n.t(`submit_group.messages.required_${fieldName}`) || 'Field is required'
      return
    }
  }

  // Specific format checks
  if (key === 'zipcode' && value && !/^\d{5}$/.test(value)) {
    errors.value[key] = i18n.t('validation.invalid_zipcode') || 'Zipcode must be 5 digits'
    return
  }

  delete errors.value[key]
}

const togglePlaystyle = (id: string) => {
  if (form.value.playstyle_refs.includes(id)) {
    form.value.playstyle_refs = form.value.playstyle_refs.filter((i: string) => i !== id)
  } else {
    form.value.playstyle_refs.push(id)
  }
  validateField('playstyle_refs')
}

const loadGroupData = async (id: string) => {
  try {
    const data = await pb.send('/api/social-feed', {
      method: 'GET',
      params: { groupId: id }
    })

    const group = data.group
    const isReview = route.query.review === '1'
    const isAdmin = auth.user?.user_role === 'admin'

    if (!isReview && group.owner_id !== auth.user?.id) {
       toast.addToast('You are not authorized to edit this group', 'error')
       router.push('/login')
       return
    }

    if (isReview && !isAdmin) {
       toast.addToast('Only administrators can review groups', 'error')
       router.push('/')
       return
    }

    form.value = {
      ...form.value,
      name: group.name,
      catchline: group.catchline,
      description: group.description,
      owner_name: group.owner_name,
      member_count: group.member_count,
      city: group.city,
      state_ref: group.state_ref,
      category_ref: group.category_ref,
      playstyle_refs: group.playstyle_refs || [],
      language_refs: group.language_refs || [],
      frequency_ref: group.frequency_ref,
      privacy_ref: group.privacy_ref,
      experience_ref: group.experience_ref,
      neighborhood: group.neighborhood,
      zipcode: group.zipcode,
      venue: group.venue,
      note: group.note,
    }

    if (group.header_image) {
      previewUrl.value = pb.files.getUrl(group, group.header_image)
    } else {
      previewUrl.value = null
    }

    // Social links are returned in data.links by /api/social-feed
    const socialLinks = data.links
    if (socialLinks && Object.keys(socialLinks).length > 0) {
      form.value = {
        ...form.value,
        website_url: socialLinks.website_url || '',
        email_url: socialLinks.email_url || '',
        facebook_url: socialLinks.facebook_url || '',
        facebook_type: socialLinks.facebook_type || 'page',
        discord_url: socialLinks.discord_url || '',
        whatsapp_url: socialLinks.whatsapp_url || '',
        telegram_url: socialLinks.telegram_url || '',
        meetup_url: socialLinks.meetup_url || '',
        meetup_type: socialLinks.meetup_type || 'public',
        instagram_url: socialLinks.instagram_url || '',
        bgg_url: socialLinks.bgg_url || '',
        reddit_url: socialLinks.reddit_url || '',
        aftergame_co_url: socialLinks.aftergame_co_url || '',
      }
      activePlatforms.value = SOCIAL_PLATFORMS.value
        .filter((p: any) => !!form.value[p.key])
        .map((p: any) => p.key)
    }
  } catch (err) {
    console.error('Error loading group:', err)
    toast.addToast('Failed to load group data', 'error')
    router.push('/')
  }
}

watch(() => form.value.category_ref, () => {
  validateField('category_ref')
})

watch(() => form.value.language_refs, () => {
  validateField('language_refs')
}, { deep: true })

const handleFileSelect = async (file: File) => {
  try {
    const processed = await processImage(file)
    selectedFile.value = processed
    previewUrl.value = URL.createObjectURL(processed)
  } catch (err) {
    console.error('Image processing failed:', err)
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const clearImage = () => {
  selectedFile.value = null
  previewUrl.value = null
}

const submitGroup = async () => {
  if (isSubmitting.value) return

  // Trigger all validations
  const fieldsToValidate = ['name', 'description', 'privacy_ref', 'category_ref', 'frequency_ref', 'experience_ref', 'city', 'state_ref', 'zipcode', 'playstyle_refs', 'language_refs', 'captcha_value']
  fieldsToValidate.forEach((key: string) => validateField(key))

  // Also validate any active social platforms
  activePlatforms.value.forEach((key: string) => validateField(key))

  if (Object.keys(errors.value).length > 0) {
    toast.addToast(i18n.t('submit_group.messages.fix_errors') || 'Please fix the errors in the form.', 'error', 5000)
    return
  }

  if (!captchaStatus.value) {
    toast.addToast(i18n.t('submit_group.messages.captcha_required') || 'Please enter the verification code.', 'error', 5000)
    errors.value.captcha_value = 'Verification required'
    return
  }

  // Prepare preview fields for confirmation
  const fields: any[] = []
  const addField = (label: string, value: any) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'none' && (!Array.isArray(value) || value.length > 0)) {
      fields.push({ label, value })
    }
  }

  addField(i18n.t('submit_group.sections.info.name_label').replace('*', '').trim(), form.value.name)
  addField(i18n.t('submit_group.sections.info.catchline_label').trim(), form.value.catchline)
  addField(i18n.t('submit_group.sections.info.desc_label').replace('*', '').trim(), form.value.description)

  // Combine City, State, Zip into one Location field
  const stateName = form.value.state_ref ? enumsStore.getTranslatedName(enumsStore.states.find((s: any) => s.id === form.value.state_ref)) : ''
  const locationParts = [form.value.city, stateName].filter(Boolean).join(', ')
  const fullLocation = [locationParts, form.value.zipcode].filter(Boolean).join(' ')
  addField(i18n.t('group_detail.location_label'), fullLocation)
  addField(i18n.t('submit_group.sections.location_type.neighborhood_label').trim(), form.value.neighborhood)
  addField(i18n.t('submit_group.sections.location_type.venue_label').trim(), form.value.venue)

  if (form.value.privacy_ref) {
     addField(i18n.t('submit_group.sections.location_type.privacy_label').replace('*', '').trim(), enumsStore.getTranslatedName(enumsStore.private_levels.find((o: any) => o.id === form.value.privacy_ref)))
  }

  if (form.value.category_ref) {
    addField(i18n.t('submit_group.sections.location_type.group_type_label').replace('*', '').trim(), enumsStore.getTranslatedName(enumsStore.categories.find((c: any) => c.id === form.value.category_ref)))
  }

  if (form.value.experience_ref) {
    addField(i18n.t('submit_group.sections.location_type.experience_label').replace('*', '').trim(), enumsStore.getTranslatedName(enumsStore.experience_levels.find((o: any) => o.id === form.value.experience_ref)))
  }

  if (form.value.frequency_ref) {
    addField(i18n.t('submit_group.sections.location_type.frequency_label').replace('*', '').trim(), enumsStore.getTranslatedName(enumsStore.frequencies.find((o: any) => o.id === form.value.frequency_ref)))
  }

  if (form.value.language_refs && form.value.language_refs.length > 0) {
    const names = form.value.language_refs.map((id: string) => enumsStore.getTranslatedName(enumsStore.languages.find((l: any) => l.id === id))).join(', ')
    addField(i18n.t('group_detail.language_label').trim(), names)
  }

  if (form.value.playstyle_refs && form.value.playstyle_refs.length > 0) {
     const names = form.value.playstyle_refs.map((id: string) => enumsStore.getTranslatedName(enumsStore.playstyles.find((c: any) => c.id === id))).join(', ')
     addField(i18n.t('submit_group.sections.location_type.playstyle_label').replace('*', '').trim(), names)
  }

  SOCIAL_PLATFORMS.value.forEach((platform: any) => {
    if (form.value[platform.key]) {
      addField(platform.label, form.value[platform.key])
    }
  })

  addField(i18n.t('submit_group.sections.note.note_label').trim(), form.value.note)

  previewFields.value = fields

  isConfirmOpen.value = true
}

const executeSubmit = async () => {
  isConfirmOpen.value = false
  isSubmitting.value = true
  try {
    const groupData = new FormData()
    const appendIfPresent = (key: string, value: any) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'null' && value !== 'undefined') {
        groupData.append(key, value)
      }
    }

    appendIfPresent('name', form.value.name)
    appendIfPresent('catchline', form.value.catchline)
    appendIfPresent('description', form.value.description)
    appendIfPresent('city', form.value.city)
    appendIfPresent('state_ref', form.value.state_ref)
    appendIfPresent('category_ref', form.value.category_ref)
    appendIfPresent('frequency_ref', form.value.frequency_ref)
    
    if (form.value.language_refs && form.value.language_refs.length > 0) {
      form.value.language_refs.forEach((id: string) => groupData.append('language_refs', id))
    }

    appendIfPresent('privacy_ref', form.value.privacy_ref)
    appendIfPresent('experience_ref', form.value.experience_ref)
    appendIfPresent('neighborhood', form.value.neighborhood)
    appendIfPresent('zipcode', form.value.zipcode)
    appendIfPresent('venue', form.value.venue)
    appendIfPresent('note', form.value.note)
    appendIfPresent('captcha_id', form.value.captcha_id)
    appendIfPresent('captcha_value', form.value.captcha_value)

    if (!isEditing.value) groupData.append('approved', 'false')
    const recordId = route.query.id as string
    if (isEditing.value) groupData.append('id', recordId)
    
    form.value.language_refs.forEach((id: string) => groupData.append('language_refs', id))
    if (form.value.playstyle_refs && form.value.playstyle_refs.length > 0) {
      form.value.playstyle_refs.forEach((id: string) => groupData.append('playstyle_refs', id))
    }

    if (selectedFile.value) {
      groupData.append('header_image', selectedFile.value)
    }

    // Add social links to groupData
    const platforms = [
      'website_url', 'email_url', 'facebook_url', 'discord_url', 
      'whatsapp_url', 'telegram_url', 'meetup_url', 'instagram_url', 
      'bgg_url', 'reddit_url', 'aftergame_co_url'
    ]
    platforms.forEach(key => {
      if (form.value[key]) {
        groupData.append(key, form.value[key])
        if (key === 'facebook_url') {
           groupData.append('facebook_type', form.value.facebook_type)
        }
        if (key === 'meetup_url') {
           groupData.append('meetup_type', form.value.meetup_type)
        }
      }
    })

    const response = await pb.send('/api/submit-group', {
      method: 'POST',
      body: groupData
    })

    const recordIdResult = response.id
    
    toast.addToast(isEditing.value ? i18n.t('submit_group.actions.save_success') || 'Success!' : i18n.t('submit_group.messages.success'), 'success', 4000)
    
    const stateName = enumsStore.states.find((s: any) => s.id === form.value.state_ref)?.name?.replace(/ /g, '_') || 'unknown'
    
    if (isReview.value) {
      router.push('/admin-dashboard')
    } else if (isEditing.value) {
      router.push(`/group/${stateName}/${recordIdResult}`)
    } else {
      router.push('/directory')
    }
  } catch (err: any) {
    console.error(err)
    const errorMsg = err.data?.error || err.message || ''
    toast.addToast((i18n.t('submit_group.messages.fail') || 'Submission failed: ') + errorMsg, 'error', 5000)
  } finally {
    isSubmitting.value = false
    // Refresh captcha on submit fail (or even success if staying on page, but we push elsewhere)
    if (Object.keys(errors.value).length > 0 || isConfirmOpen.value === false) {
      captchaRef.value?.refresh()
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FDFCFB] font-sans pb-24">
    <div class="max-w-4xl mx-auto px-6 pt-16">
      <div class="text-center mb-16">
        <span class="text-[#FE9A00] font-normal text-xs   tracking-[0.3em] mb-4 block">{{ isReview ? i18n.t('admin.actions.review') : i18n.t('submit_group.subtitle') }}</span>
        <LabelTitle :text="isReview ? i18n.t('admin.actions.review') + ': ' + form.name : i18n.t('submit_group.title')" class="!mb-6" />
        <p class="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{{ i18n.t('submit_group.desc') }}</p>
      </div>

      <!-- Warning Alert -->
      <div v-if="!auth.isValid" class="mb-12 p-6 rounded-[1.5rem] bg-orange-50/50 border border-orange-100 flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FE9A00] flex-shrink-0">
          <span class="w-6 h-6" v-html="Icons.Warning"></span>
        </div>
        <div>
          <h4 class="font-normal text-orange-900 mb-1">
            {{ i18n.t('submit_group.sections.guest_warning.title_p1') }}<span class="font-bold border-b border-orange-200">{{ i18n.t('submit_group.sections.guest_warning.unclaimed') }}</span>{{ i18n.t('submit_group.sections.guest_warning.title_p2') }}
          </h4>
          <p class="text-sm text-orange-800/70 font-normal leading-relaxed">
            {{ i18n.t('submit_group.sections.guest_warning.message_p1') }}<span class="font-bold text-orange-900">{{ i18n.t('submit_group.sections.guest_warning.unclaimed') }}</span>{{ i18n.t('submit_group.sections.guest_warning.message_p2') }}
            <br/>
            <router-link to="/login" class="text-[#FE9A00] font-bold underline decoration-2 underline-offset-4 hover:text-[#EA580C]">{{ i18n.t('submit_group.sections.guest_warning.sign_in') }}</router-link>{{ i18n.t('submit_group.sections.guest_warning.suffix') }}
          </p>
        </div>
      </div>

      <div class="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-14">
        <form @submit.prevent="submitGroup" class="space-y-16">
          <section>
            <div class="flex items-center gap-4 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE9A00] flex items-center justify-center font-black text-xl">1</div>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 leading-none mb-1">{{ i18n.t('submit_group.sections.info.title') }}</h2>
                    <p class="text-sm text-gray-400 font-medium   tracking-widest">{{ i18n.t('submit_group.sections.info.subtitle') }}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="md:col-span-2">
                <Label15Normal :text="i18n.t('submit_group.sections.info.name_label')" />
                <Input12border v-model="form.name" :placeholder="i18n.t('submit_group.sections.info.name_placeholder')" @blur="validateField('name')" required />
                <p v-if="errors.name" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.name }}</p>
              </div>

              <div class="md:col-span-2">
                <Label15Normal :text="i18n.t('submit_group.sections.info.catchline_label')" />
                <Input12border v-model="form.catchline" :placeholder="i18n.t('submit_group.sections.info.catchline_placeholder')" maxlength="150" @blur="validateField('catchline')" />
                <p v-if="errors.catchline" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.catchline }}</p>
                <p class="text-[10px] text-gray-400 font-normal mt-2 ml-2">{{ i18n.t('submit_group.sections.info.char_limit', { count: form.catchline.length }) }}</p>
              </div>
              <div class="md:col-span-2">
                <Label15Normal :text="i18n.t('submit_group.sections.info.desc_label')" />
                <textarea v-model="form.description" :placeholder="i18n.t('submit_group.sections.info.desc_placeholder')" 
                          @blur="validateField('description')"
                          class="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FE9A00] outline-none transition-all font-normal text-gray-700 h-40" 
                          :class="errors.description ? 'border-red-400' : 'border-gray-200'"
                          required></textarea>
                <p v-if="errors.description" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.description }}</p>
              </div>
              <div class="md:col-span-2">
                <Label15Normal :text="i18n.t('submit_group.sections.info.banner_label')" class="mb-4" />
                <CoverImageUpload 
                  :previewUrl="previewUrl"
                  :aspectRatio="3 / 1"
                  variant="banner"
                  @fileSelect="handleFileSelect"
                  @clear="clearImage"
                />
              </div>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE9A00] flex items-center justify-center font-black text-xl">2</div>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 leading-none mb-1">{{ i18n.t('submit_group.sections.location_type.title') }}</h2>
                    <p class="text-sm text-gray-400 font-medium   tracking-widest">{{ i18n.t('submit_group.sections.location_type.subtitle') }}</p>
                </div>
            </div>
            
            <div class="space-y-8">
              <!-- Zipcode & Neighborhood Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label15Normal :text="i18n.t('submit_group.sections.location_type.zipcode_label')" />
                  <Input12border 
                    v-model="form.zipcode" 
                    :placeholder="i18n.t('submit_group.sections.location_type.zipcode_placeholder')" 
                    :icon="Icons.Location"
                    maxlength="5"
                    @input="form.zipcode = form.zipcode.replace(/\D/g, '')"
                    @blur="validateField('zipcode'); handleZipcodeBlur()"
                    required 
                  />
                  <p v-if="errors.zipcode" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.zipcode }}</p>
                </div>
                <div>
                  <Label15Normal :text="i18n.t('submit_group.sections.location_type.neighborhood_label')" />
                  <Input12border 
                    v-model="form.neighborhood" 
                    :placeholder="i18n.t('submit_group.sections.location_type.neighborhood_placeholder')" 
                    :icon="Icons.Location"
                  />
                </div>
              </div>

              <!-- City & State Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label15Normal :text="i18n.t('submit_group.sections.location_type.city_label')" />
                  <Input12border 
                    v-model="form.city" 
                    :placeholder="i18n.t('submit_group.sections.location_type.city_placeholder')" 
                    :icon="Icons.Location"
                    @blur="validateField('city')"
                    required 
                  />
                  <p v-if="errors.city" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.city }}</p>
                </div>
                <div>
                  <CustomDropdown v-model="form.state_ref" :options="stateOptions" :label="i18n.t('submit_group.sections.location_type.state_label')" :placeholder="i18n.t('submit_group.sections.location_type.state_placeholder')" :icon="Icons.Location" @blur="validateField('state_ref')" required />
                  <p v-if="errors.state_ref" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.state_ref }}</p>
                </div>
              </div>

              <!-- Venue Row -->
              <div>
                <Label15Normal :text="i18n.t('submit_group.sections.location_type.venue_label')" />
                <Input12border 
                  v-model="form.venue" 
                  :placeholder="i18n.t('submit_group.sections.location_type.venue_placeholder')" 
                  :icon="Icons.Location"
                />
              </div>

              <div>
                <Label15Normal :text="i18n.t('submit_group.sections.location_type.privacy_label')" class="mb-3" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Public Group Card -->
                  <div @click="form.privacy_ref = enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('public'))?.id || ''"
                       :class="[
                         'p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4',
                         form.privacy_ref === enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('public'))?.id 
                           ? 'bg-orange-50/50 border-[#FE9A00] shadow-[0_10px_30px_rgba(254,154,0,0.1)]' 
                           : 'bg-white border-gray-200 hover:border-gray-300'
                       ]">
                    <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', form.privacy_ref === enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('public'))?.id ? 'bg-[#FE9A00] text-white' : 'bg-orange-50 text-[#FE9A00]']" v-html="Icons.Privacy"></div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">{{ i18n.t('submit_group.sections.location_type.public_title') }}</h4>
                      <p class="text-xs text-gray-500 font-normal leading-relaxed">{{ i18n.t('submit_group.sections.location_type.public_desc') }}</p>
                    </div>
                  </div>
                  <!-- Private Group Card -->
                  <div @click="form.privacy_ref = enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('private'))?.id || ''"
                       :class="[
                         'p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4',
                         form.privacy_ref === enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('private'))?.id 
                           ? 'bg-orange-50/50 border-[#FE9A00] shadow-[0_10px_30px_rgba(254,154,0,0.1)]' 
                           : 'bg-white border-gray-200 hover:border-gray-300'
                       ]">
                    <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', form.privacy_ref === enumsStore.private_levels.find((o: any) => o.name.toLowerCase().includes('private'))?.id ? 'bg-[#FE9A00] text-white' : 'bg-orange-50 text-[#FE9A00]']" v-html="Icons.Privacy"></div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">{{ i18n.t('submit_group.sections.location_type.private_title') }}</h4>
                      <p class="text-xs text-gray-500 font-normal leading-relaxed">{{ i18n.t('submit_group.sections.location_type.private_desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CustomDropdown v-model="form.category_ref" :options="categoryOptions" :label="i18n.t('submit_group.sections.location_type.group_type_label')" :placeholder="i18n.t('submit_group.sections.location_type.category_placeholder')" @blur="validateField('category_ref')" required />
                  <p v-if="errors.category_ref" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.category_ref }}</p>
                </div>
                <div>
                  <CustomDropdown v-model="form.experience_ref" :options="experienceOptions" :label="i18n.t('submit_group.sections.location_type.experience_label')" :placeholder="i18n.t('submit_group.sections.location_type.experience_placeholder')" @blur="validateField('experience_ref')" required />
                  <p v-if="errors.experience_ref" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.experience_ref }}</p>
                </div>
                <div>
                  <CustomDropdown v-model="form.frequency_ref" :options="frequencyOptions" :label="i18n.t('submit_group.sections.location_type.frequency_label')" :placeholder="i18n.t('submit_group.sections.location_type.frequency_placeholder')" @blur="validateField('frequency_ref')" required />
                  <p v-if="errors.frequency_ref" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.frequency_ref }}</p>
                </div>
                <div>
                  <CustomDropdown v-model="form.language_refs" :options="languageOptions" :label="i18n.t('group_detail.language_label')" :placeholder="i18n.t('directory.all_languages')" :multiple="true" @blur="validateField('language_refs')" required />
                  <p v-if="errors.language_refs" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.language_refs }}</p>
                </div>
              </div>



              <div class="pt-4 border-t border-gray-50">
                <Label15Normal :text="i18n.t('submit_group.sections.location_type.playstyle_label')" class="mb-4" />
                <div class="flex flex-wrap gap-2">
                  <button v-for="opt in playstyleOptions" :key="opt.id"
                          type="button"
                          @click="togglePlaystyle(opt.id)"
                          :class="[
                            'px-4 py-2 rounded-xl text-xs font-normal border transition-all',
                            form.playstyle_refs.includes(opt.id) 
                              ? 'bg-orange-50 border-[#FE9A00] text-[#FE9A00]' 
                              : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                          ]">
                    {{ opt.name }}
                  </button>
                </div>
                <p v-if="errors.playstyle_refs" class="text-[10px] text-red-500 font-medium mt-2 ml-2">{{ errors.playstyle_refs }}</p>
                <p class="text-[10px] text-gray-400 font-normal mt-4 ml-2   tracking-widest">{{ i18n.t('submit_group.sections.location_type.playstyle_hint') }}</p>
              </div>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE9A00] flex items-center justify-center font-black text-xl">3</div>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 leading-none mb-1">{{ i18n.t('submit_group.sections.links.title') }}</h2>
                </div>
            </div>
            
            <p class="text-sm text-gray-500 font-normal mb-8">{{ i18n.t('submit_group.sections.links.subtitle') }}</p>

            <div class="space-y-6 mb-12">
              <div v-for="platform in (SOCIAL_PLATFORMS.filter((p: any) => activePlatforms.includes(p.key)))" :key="platform.key" 
                   class="flex flex-col gap-4 p-6 rounded-2xl bg-gray-50/50 group transition-all">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#FE9A00] transition-colors" v-html="platform.icon"></div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <Label15Normal :text="platform.label" class="!ml-0 !mb-0" />
                      <div v-if="platform.hint" class="group/tooltip relative">
                        <div v-html="Icons.Question" class="w-4 h-4 text-gray-400 cursor-help hover:text-[#FE9A00] transition-colors"></div>
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-[11px] font-normal rounded-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-10 shadow-xl leading-relaxed">
                          {{ platform.hint }}
                          <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <input v-model="form[platform.key]" type="text" :placeholder="platform.placeholder" 
                           @blur="handlePlatformBlur(platform.key)"
                           :class="[
                             'w-full bg-transparent border-b p-0 focus:ring-0 font-normal text-gray-700 placeholder-gray-300 transition-colors',
                             errors[platform.key] ? 'border-red-400' : 'border-gray-200'
                           ]" />
                    <p v-if="errors[platform.key]" class="text-[10px] text-red-500 font-medium mt-1">{{ errors[platform.key] }}</p>
                  </div>
                  <button type="button" @click="removePlatform(platform.key)" class="text-gray-300 hover:text-red-500 transition-colors p-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>

                <!-- Special handling for Facebook -->
                <template v-if="platform.key === 'facebook_url'">
                  <div class="flex items-center gap-2 mt-2 pt-4 border-t border-gray-200/50">
                    <div class="flex items-center gap-6">
                      <label class="flex items-center gap-2 cursor-pointer group/radio">
                        <input type="radio" v-model="form.facebook_type" value="page" class="w-4 h-4 text-[#FE9A00] border-gray-300 focus:ring-[#FE9A00]" />
                        <span class="text-sm font-medium text-gray-600 group-hover/radio:text-[#FE9A00] transition-colors">Facebook Page</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer group/radio">
                        <input type="radio" v-model="form.facebook_type" value="group" class="w-4 h-4 text-[#FE9A00] border-gray-300 focus:ring-[#FE9A00]" />
                        <span class="text-sm font-medium text-gray-600 group-hover/radio:text-[#FE9A00] transition-colors">Facebook Group</span>
                      </label>
                    </div>
                  </div>

                </template>

                <!-- Special handling for Meetup -->
                <template v-if="platform.key === 'meetup_url'">
                  <div class="flex flex-col gap-2 mt-2 pt-4 border-t border-gray-200/50">
                    <div class="flex items-center gap-6">
                      <label class="flex items-center gap-2 cursor-pointer group/radio">
                        <input type="radio" v-model="form.meetup_type" value="public" class="w-4 h-4 text-[#FE9A00] border-gray-300 focus:ring-[#FE9A00]" />
                        <span class="text-sm font-medium text-gray-600 group-hover/radio:text-[#FE9A00] transition-colors">
                          {{ i18n.t('submit_group.sections.platforms.meetup_url.public_title') }}
                        </span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer group/radio">
                        <input type="radio" v-model="form.meetup_type" value="private" class="w-4 h-4 text-[#FE9A00] border-gray-300 focus:ring-[#FE9A00]" />
                        <span class="text-sm font-medium text-gray-600 group-hover/radio:text-[#FE9A00] transition-colors">
                          {{ i18n.t('submit_group.sections.platforms.meetup_url.private_title') }}
                        </span>
                      </label>
                    </div>
                    
                    <!-- Description block -->
                    <div class="p-1 rounded-xl bg-orange-50/30 border border-orange-100/50">
                      <p class="text-[11px] text-gray-500 leading-relaxed">
                        <span v-if="form.meetup_type === 'public'">{{ i18n.t('submit_group.sections.platforms.meetup_url.public_desc') }}</span>
                        <span v-else>{{ i18n.t('submit_group.sections.platforms.meetup_url.private_desc') }}</span>
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="activePlatforms.length < SOCIAL_PLATFORMS.length">
              <h3 class="text-xs font-normal text-gray-400   tracking-widest mb-4">{{ i18n.t('submit_group.sections.links.add_more') }}</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button v-for="platform in (SOCIAL_PLATFORMS.filter((p: any) => !activePlatforms.includes(p.key)))" :key="platform.key"
                        type="button" @click="addPlatform(platform.key)"
                        class="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50 transition-all group">
                  <div class="flex items-center gap-3">
                    <div class="text-gray-400 group-hover:text-[#FE9A00] transition-colors" v-html="platform.icon"></div>
                    <span class="text-sm font-normal text-gray-600">{{ platform.label }}</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-300 group-hover:text-[#FE9A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-10">
                <div class="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE9A00] flex items-center justify-center font-black text-xl">4</div>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 leading-none mb-1">{{ i18n.t('submit_group.sections.note.title') }}</h2>
                </div>
            </div>
            
            <div class="md:col-span-2">
              <Label15Normal :text="i18n.t('submit_group.sections.note.note_label')" />
              <textarea v-model="form.note" :placeholder="i18n.t('submit_group.sections.note.note_placeholder')" 
                        class="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FE9A00] outline-none transition-all font-normal text-gray-700 h-32"></textarea>
            </div>
          </section>

          <section>
            <div class="md:col-span-2">
              <Captcha 
                ref="captchaRef"
                v-model="form.captcha_value"
                @status-change="(status: boolean) => captchaStatus = status"
                @captcha-id-change="(id: string) => form.captcha_id = id"
              />
              <p v-if="errors.captcha_value" class="text-[10px] text-red-500 font-medium mt-1 ml-2">{{ errors.captcha_value }}</p>
            </div>
          </section>

          <div class="flex items-center justify-end gap-4 pt-10 border-t border-gray-100">
            <button type="button" @click="router.back()" class="px-6 py-4 text-gray-400 font-normal   tracking-widest text-xs hover:text-gray-600 transition-colors">
              {{ i18n.t('submit_group.actions.cancel') }}
            </button>
            <button type="submit" class="px-8 py-4 rounded-2xl bg-[#FE9A00] text-white font-normal text-lg hover:bg-[#EA580C] shadow-lg hover:shadow-xl transition-all disabled:opacity-50" :disabled="isSubmitting">
              {{ isEditing ? i18n.t('submit_group.actions.save') : i18n.t('submit_group.actions.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Universal Confirmation Dialog -->
    <ConfirmDialog
      :is-open="isConfirmOpen"
      :title="isEditing ? i18n.t('submit_group.actions.save') : i18n.t('submit_group.actions.submit')"
      message=""
      :confirm-text="isEditing ? i18n.t('submit_group.actions.save') : i18n.t('submit_group.actions.submit')"
      :is-loading="isSubmitting"
      :preview-fields="previewFields"
      @confirm="executeSubmit"
      @close="isConfirmOpen = false"
    />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap');
.font-display { font-family: 'Outfit', sans-serif; }
</style>
