import { createApp } from 'vue'
import App from './App.vue'

function removeAllChildren(parent: HTMLElement | null) {
    if (!!parent) {
        Array.from(parent.childNodes).forEach(x => parent.removeChild(x));
    }
}

removeAllChildren(document.getElementById("content"));
createApp(App).mount('#content');
