<template>
  <div class="notes-container">
    <div class="top-bar">
        <button class="back-button" @click="goBack">← Back to Home Page</button>
        <h1 class="heading">BGC Notes Tool</h1>
    </div>

    <div class="main-content">
        <QuillEditor
            v-model:content="note"
            content-type="html"
            theme="snow"
            class="note-input"
        />

        <button class="save-note" @click="saveNote">Save Note</button>

        <div class="upload-note">
            <h3>Import a Note</h3>
            <input type="file" @change="handleFileUpload" accept="image/*,audio/*,video/*" />
            <div v-if="fileUrl" class="preview">
              <img v-if="mediaType === 'image'" :src="fileUrl" alt="Image preview" />
              <img v-if="mediaType === 'audio'" :src="fileUrl" controls />
              <img v-if="mediaType === 'video'" :src="fileUrl" controls />
            </div>
            <button class="save-note" @click="saveFile">Save File</button>
        </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'NotesPage',
  components: { QuillEditor },
  setup() {
    const router = useRouter()
    const note = ref('')
    const fileUrl = ref(null)
    const mediaType = ref('')
    
    const goBack = () => {
      return router.push({ name: 'home' });
    }

    const navigateTo = (mode) => {
      router.push({ name: mode })
    }

    function saveNote() {
      if (note.value.trim()) {
        const saved = JSON.parse(localStorage.getItem('my-notes') || '[]')
        saved.push(note.value)
        localStorage.setItem('my-notes', JSON.stringify(saved))
        note.value = ''
      }
    }

    function handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      const url = URL.createObjectURL(file)

      if (file.type.startsWith('image')) {
        mediaType.value = 'image'
      }
      else if (file.type.startsWith('audio')) {
        mediaType.value = 'audio'
      }
      else if (file.type.startsWith('video')) {
        mediaType.value = 'video'
      }
      else {
        mediaType.value = ''
        alert('Unsupported file type.')
        return
      }
      fileUrl.value = url
    }

    function saveFile() {
        if (!fileUrl.value) return
        const savedMedia = JSON.parse(localStorage.getItem('media-files') || '[]')
        savedMedia.push({
          url: fileUrl.value,
          type: mediaType.value,
        })
        localStorage.setItem('media-files', JSON.stringify(savedMedia))
        URL.revokeObjectURL(fileUrl.value)
        fileUrl.value = null
        mediaType.value = ''
    }
    
    return {
      navigateTo,
      goBack,
      note,
      saveNote,
      fileUrl,
      mediaType, 
      handleFileUpload,
      saveFile
    }
  }
}
</script>

<style scoped>
.notes-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
}

.top-bar {
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.heading {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.back-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: none;
  background-color: #3986A8;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
}

.main-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.note-input {
  width: 100%;
  max-width: 700px;
  padding: 8px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  font-family: inherit;
  font-size: 16px; 
  resize: vertical;
  box-sizing: border-box;
}

.save-note {
  background-color: #3986A8;
  color: white;
  padding: 8px 16px; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px; 
  font-size: 16px;
}

.save-note:hover {
  background-color:#2c6b8a;
}

.upload-note {
  margin-top: 24px;
}

.preview {
  margin-top: 16px;
}

img, video {
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style> 