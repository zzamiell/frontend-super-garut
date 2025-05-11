// const config = useRuntimeConfig()
// const baseURL = config.public.apiBaseUrl

// export const api = {
//   async get(url: string) {
//     const response = await fetch(`${baseURL}${url}`)
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async post(url: string, data: any) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async put(url: string, data: any) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async patch(url: string, data: any) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async delete(url: string) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'DELETE'
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async postFormData(url: string, formData: FormData) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'POST',
//       body: formData
//       // Don't set Content-Type header, let the browser set it automatically
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async putFormData(url: string, formData: FormData) {
//     const response = await fetch(`${baseURL}${url}`, {
//       method: 'PUT',
//       body: formData
//     })
//     if (!response.ok) {
//       const error = await this.parseError(response)
//       throw error
//     }
//     return await response.json()
//   },

//   async parseError(response: Response) {
//     try {
//       const errorData = await response.json()
//       return new Error(errorData.message || `HTTP error! status: ${response.status}`)
//     } catch {
//       return new Error(`HTTP error! status: ${response.status}`)
//     }
//   }
// }