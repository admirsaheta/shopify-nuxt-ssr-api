<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Test Shopify API Integration</h1>
    
    <div class="max-w-md mx-auto">
      <form @submit.prevent="testShopifyAuth" class="space-y-4">
        <div>
          <label for="storeName" class="block text-sm font-medium text-gray-700 mb-2">
            Store Name (e.g., mystore.myshopify.com)
          </label>
          <input
            id="storeName"
            v-model="storeName"
            type="text"
            placeholder="Enter your Shopify store name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Testing...' : 'Test Shopify Auth' }}
        </button>
      </form>
      
      <div v-if="error" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h3 class="font-bold">Error:</h3>
        <p>{{ error }}</p>
      </div>
      
      <div v-if="result" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        <h3 class="font-bold">Success:</h3>
        <p>{{ result }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const storeName = ref('')
const loading = ref(false)
const error = ref('')
const result = ref('')

const testShopifyAuth = async () => {
  loading.value = true
  error.value = ''
  result.value = ''
  
  try {
    const response = await $fetch('/api/shopify/auth', {
      method: 'POST',
      body: {
        storeName: storeName.value
      }
    })
    
    result.value = JSON.stringify(response, null, 2)
  } catch (err) {
    error.value = err.data?.message || err.message || 'An error occurred'
    console.error('Shopify auth error:', err)
  } finally {
    loading.value = false
  }
}
</script>