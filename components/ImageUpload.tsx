/* eslint-disable @next/next/no-img-element */
// components/ImageUpload.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { arvanStorage } from '../lib/arvan-storage'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  folder?: string
  label?: string
}

export default function ImageUpload({ 
  onUploadComplete, 
  folder = 'memories',
  label = 'Upload Image' 
}: ImageUploadProps) {
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Create preview
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)

    setUploading(true)
    
    try {
      let result
      if (folder === 'avatar') {
        result = await arvanStorage.uploadUserAvatar(user.id, file)
      } else {
        result = await arvanStorage.uploadMemoryImage(user.id, file)
      }
      
      onUploadComplete(result.url)
    } catch (error) {
      console.error('Upload error:', error)
      alert('خطا در آپلود عکس')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="flex items-center space-x-4">
        {previewUrl && (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-20 h-20 object-cover rounded border"
          />
        )}
        
        <label className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${uploading ? 'opacity-50' : ''}`}>
          {uploading ? 'در حال آپلود...' : 'انتخاب عکس'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}