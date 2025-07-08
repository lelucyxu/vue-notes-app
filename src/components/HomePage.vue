<template>
  <div class="homepage">
    <div class="top-bar">
      <h1 class="heading">BGC Notes Tool</h1>
    </div>
    
    <div class="main-content">
      <div v-if="notes.length > 0" class="notes-list">
        <h2>Saved Notes</h2>
        <div v-for="(n, index) in notes" :key="index" class="note-display">
          {{ n }}
          <div class="menu-wrapper">
            <button @click="toggleMenu(index)" class="dots-btn">⋮</button>
            <div v-if="menuOpenIndex === index" class="menu-dropdown">
              <button @click="confirmDelete(index)">Delete</button>
              <!--<button @click="editNote(index, n)">Edit</button>  could possibly edit the notes and go to the note page?--> 
            </div>
          </div>
        </div>
      </div>
      <div v-else><p>No notes saved yet.</p></div>
      
      <div class="note-card" @click="navigateTo('notes')">
        <button class="note-button">Add a Note</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    
    const navigateTo = (mode) => {
      router.push({ name: mode })
    }

    const notes = ref([])
    const menuOpenIndex = ref(null)

    onMounted(() => {
      const saved = JSON.parse(localStorage.getItem('my-notes'))
      if (saved) {
        notes.value = saved
      }
    })

    function toggleMenu(index) {
      menuOpenIndex.value = menuOpenIndex.value === index ? null : index
    }

    function confirmDelete(index) {
      if (confirm('Delete this note?')) {
        notes.value.splice(index, 1)
        localStorage.setItem('my-notes', JSON.stringify(notes.value))
        menuOpenIndex.value = null
      }
    }
    
    return {
      navigateTo,
      notes,
      menuOpenIndex,
      toggleMenu,
      confirmDelete
    }
  }
}
</script>

<style scoped>
.homepage {
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

.main-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.note-card {
  display: flex;
  gap: 30px;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
}

.note-button {
  background-color: #3986A8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
}

.note-button:hover {
  background-color: #2c6b8a;
}

.notes-list {
  margin-top: 15px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px; 
}

.notes-title {
  font-weight: 600;
  font-size: 18px; 
  margin-bottom: 8px;
}

.note-display {
  position: relative;
  background-color: #fef3c7;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #fbbf24;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  width: 100%;
  max-height: 200px;
}

.menu-wrapper {
  position: relative;
}

.dots-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

.menu-dropdown {
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 10;
}

.menu-dropdown button {
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  padding: 6px 12px;
  cursor: pointer;
}
</style> 