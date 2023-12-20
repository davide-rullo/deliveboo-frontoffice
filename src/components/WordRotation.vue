<script>
export default {
    data() {
        return {
            words: ['Pizza', 'Sushi', 'Hamburger', 'Poke', 'Chicken', 'Ramen', 'Kebab', 'Pasta', 'Paella'],
            currentWordIndex: 0,
            rotationInterval: null,
            isTransitioning: false,
        };
    },
    computed: {
        currentWord() {
            return this.words[this.currentWordIndex];
        },
    },
    mounted() {
        this.startWordRotation();
    },
    methods: {
        startWordRotation() {
            this.rotationInterval = setInterval(() => {
                this.isTransitioning = true;
                setTimeout(() => {
                    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                }, 0);
            }, 2000);
        },
        handleTransitionEnd() {
            this.isTransitioning = false;
        },
    },
    beforeDestroy() {
        clearInterval(this.rotationInterval);
    },
};
</script>

<template>
    <div>
        <h2 class="display-4" :class="{ 'word-rotation': true, 'is-transitioning': isTransitioning }"
            @transitionend="handleTransitionEnd">
            {{ currentWord }}
        </h2>
    </div>
</template>
  
<style scoped lang="scss">
.word-rotation {
    position: relative;
    animation: rotateWords 10s infinite;
}

@keyframes rotateWords {

    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
        opacity: 0;
        transform: translateY(1em);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Aggiungi un'animazione di transizione solo quando non si sta girando */
.word-rotation:not(.is-transitioning) {
    transition: opacity 0.3s;
}
</style>
  