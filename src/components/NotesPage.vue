<template>
  <div class="notes-container">
    <div class="top-bar">
        <button class="back-button" @click="goBack">← Back to Home Page</button>
        <h1 class="heading">Notes</h1>
    </div>

    <div class="main-content">
        <textarea 
            class="note-input" 
            v-model="note"
            rows="7"
            placeholder="Write your note here..."
        ></textarea>  
        <button class="save-note" @click="saveNote">Save Note</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'NotesPage',
  setup() {
    const router = useRouter()
    
    const goBack = () => {
      return router.push({ name: 'home' });
    }

    const navigateTo = (mode) => {
      router.push({ name: mode })
    }
    
    const note = ref('')


    function saveNote() {
      const trimmed = note.value.trim()
      if (!trimmed) return
      const savedNotes = JSON.parse(localStorage.getItem('my-notes')) || []
      savedNotes.push(trimmed)
      localStorage.setItem('my-notes', JSON.stringify(savedNotes))
      note.value = ''
    }

    return {
      navigateTo,
      goBack,
      note,
      saveNote
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

</style> 