import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from "gsap/CustomEase"

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase)
    }

    return {
        provide: {
            gsap,
            ScrollTrigger,
        },
    }
})