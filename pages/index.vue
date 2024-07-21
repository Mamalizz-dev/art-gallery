<script setup lang="ts">

// state

    const { $gsap: gsap }: any = useNuxtApp()

    const isAnimating = ref<boolean>(false)
    const duration = ref<number>(1.5)

// methods

    const initializeFlexValues = () => {

        const timeline: any = document.querySelector(".timeline")
        const counters: any = timeline.querySelectorAll("p") 

        counters[0].style.flexGrow = '5';
        counters[0].style.width = "max-content";
        counters[1].style.flexGrow = '4';
        counters[1].style.width = "max-content";
        counters[2].style.flexGrow = '3';
        counters[2].style.width = "max-content";
        counters[3].style.flexGrow = '1.5';
        counters[3].style.width = "max-content";
        counters[4].style.flexGrow = '1';
        counters[4].style.width = "max-content";
 
        for(let i = 5; i < counters.length; i++){
            counters[i].style.flexGrow = 0;
            counters[i].style.width = "0px";
        }
    }

    const appendNewCounters = () => {
        const timeline: any = document.querySelector(".timeline");
        const counters: any = Array.from(timeline.querySelectorAll("p"));
        const firstIndex = counters.findIndex((p: any) => p.classList.contains("first"))
        
        for(let i = 0; i < firstIndex; i++){
            counters[i].remove()
        }

        for(let i = 1; i <= 8; i++){
            const newSup = document.createElement("sup");
            newSup.textContent = "pm"

            const newP = document.createElement("p");
            newP.textContent = `${i}`
            newP.style.flexGrow = "0";
            newP.style.width = "0px";
            newP.appendChild(newSup)
            timeline.appendChild(newP)
        }
    }

    const handleSlider = () => {
        if(isAnimating.value) return
        isAnimating.value = true

        const slider = document.querySelector(".slider")
        const slides = document.querySelectorAll(".slide")
        const firstSlide = slides[0]
        const firstSlideImg = firstSlide.querySelector("img")

        if(slides.length > 1) {
            const secondSlide = slides[1]
            const secondSlideImg = secondSlide.querySelector("img")

            gsap.set(secondSlideImg, { x : 250 })

            gsap.to(secondSlideImg, {
                x: 0,
                duration: duration.value,
                ease: "power3.out"
            })

            gsap.to(firstSlideImg, {
                x: -500,
                duration: duration.value,
                ease: "power3.out"
            })

            gsap.to(secondSlide, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: duration.value,
                ease: "power3.out",
                onComplete: () => {
                    firstSlide.remove()
                    slider.appendChild(firstSlide)

                    gsap.set(firstSlide, {
                        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                    })

                    isAnimating.value = false
                }
            })
        } else {
            isAnimating.value = false
        }

        const timeline: any = document.querySelector(".timeline");
        const counters: any = timeline.querySelectorAll("p") 
        
        let lastFlexGrow = counters[counters.length - 1].style.flexGrow;

        const lastCounter = document.querySelector(".timeline .last");
        console.log(lastCounter);
        
        if(lastCounter && lastCounter.textContent === "7pm") {      
            appendNewCounters()
        }

        counters.forEach((p: HTMLParagraphElement) => {
            p.classList.remove("last")
            p.classList.remove("first")
        });

        let firstAssigned = false

        for(let i = counters.length - 1; i > 0; i--) {
            gsap.to(counters[i], {
                flexGrow: counters[i - 1].style.flexGrow,
                duration: duration.value,
                ease: "power3.out",
                onStart: () => {
                    let newWidth = counters[i - 1].style.flexGrow > 0 ? "max-content" : "0px";
                    gsap.set(counters[i], { width: newWidth })

                    if(counters[i - 1].style.flexGrow === "5") {
                        counters[i].classList.add("first")
                        firstAssigned = true
                    } else if(counters[i - 1].style.flexGrow === "1" && !firstAssigned) {
                        counters[i].classList.add("last")
                    }
                }
            })
        }

        gsap.to(counters[0], {
            flexGrow: lastFlexGrow,
            duration: duration.value,
            ease: "power3.out",
            onStart: () => {
                const newWidth = lastFlexGrow > 0 ? "max-content" : "0px";
                gsap.set(counters[0], {width: newWidth})

                if(lastFlexGrow === "5") {
                    counters[0].classList.add("first")
                } else if(lastFlexGrow === "1" && !firstAssigned){
                    counters[0].classList.add("last")
                }
            }
        })
    }

// life-cycle

    onMounted(() => {

        setTimeout(() => {
            const slides = document.querySelectorAll('.slide')

            slides.forEach((slide, index) => {
                if(index > 0) {
                    gsap.set(slide, {clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"})
                }
            })

            initializeFlexValues()

            document.addEventListener("click", handleSlider)
        }, 500);

    })

</script>

<template>
    <main>
        
        <nav>
            <a href="#">Mamalizz</a>
            <a href="#">Developing his future</a>
        </nav>

        <footer>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, consectetur?</p>
            <p>linkedin</p>
        </footer>

        <div class="slider">
            <div class="slide" id="slide-1">
                <img src="/img-1.jpg" alt="">
            </div>
            <div class="slide" id="slide-2">
                <img src="/img-2.jpg" alt="">
            </div>
            <div class="slide" id="slide-3">
                <img src="/img-3.jpg" alt="">
            </div>
            <div class="slide" id="slide-4">
                <img src="/img-4.jpg" alt="">
            </div>
            <div class="slide" id="slide-5">
                <img src="/img-5.jpg" alt="">
            </div>
        </div>

        <div class="timeline">
            <p>1<sup>pm</sup></p>
            <p>2<sup>pm</sup></p>
            <p>3<sup>pm</sup></p>
            <p>4<sup>pm</sup></p>
            <p>5<sup>pm</sup></p>
            <p>6<sup>pm</sup></p>
            <p>7<sup>pm</sup></p>
            <p>8<sup>pm</sup></p>
        </div>

    </main>
</template>

<style scoped>

</style>