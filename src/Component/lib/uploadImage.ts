import axios from 'axios'
export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBBB_API_KEY}`,
    formData
  )
  return data?.data?.url
}
