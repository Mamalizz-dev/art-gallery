import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from "gsap/CustomEase"

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase)
    }

    CustomEase.create(
        "hop",
        "MO,0 CO.083,0.294 0.117,0.767 0.413,0.908 0.606,1 0.752,1 1,1 "
    )

    return {
        provide: {
            gsap,
            ScrollTrigger,
        },
    }
})