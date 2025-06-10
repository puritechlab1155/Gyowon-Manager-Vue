<template>
<div>
    <textarea :id="editorId"></textarea>
</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const editorId = `editor-${Math.random().toString(36).substr(2, 9)}`
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

let editorInstance = null

onMounted(async () => {
    const tinymce = window.tinymce || (await import('tinymce/tinymce')).default

    await import('tinymce/themes/silver')
    await import('tinymce/icons/default')
    await import('tinymce/plugins/link')
    await import('tinymce/plugins/lists')
    await import('tinymce/plugins/code')
    await import('tinymce/plugins/table')

    tinymce.init({
        selector: `#${editorId}`,
        height: 480,
        menubar: false,
        toolbar:
            'undo redo | bold underline strikethrough | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | removeformat',
        skin_url: '/tinymce/skins/ui/oxide',  
        base_url: '/tinymce', 
        suffix: '.min', 
        license_key: 'gpl',

        setup(editor) {
            editor.on('init', () => {
                editor.setContent(props.modelValue)
                editorInstance = editor
            })
            editor.on('Change KeyUp', () => {
                emit('update:modelValue', editor.getContent())
            })
        }
    })
})

onBeforeUnmount(() => {
    if (editorInstance) {
        editorInstance.destroy()
        editorInstance = null
    }
})

watch(() => props.modelValue, (newValue) => {
    if (window.tinymce && window.tinymce.activeEditor) {
        // 에디터가 로드되고 활성화되어 있을 때만 업데이트
        if (window.tinymce.activeEditor.getContent() !== newValue) {
            window.tinymce.activeEditor.setContent(newValue || '');
        }
    }
}, { immediate: true }); 
</script>
