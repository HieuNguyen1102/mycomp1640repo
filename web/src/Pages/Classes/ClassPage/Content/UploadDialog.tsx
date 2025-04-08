<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
<<<<<<< HEAD
=======
  DialogTrigger,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
} from "@/Components/ui/dialog"
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
<<<<<<< HEAD
import { FaEdit, FaFile } from 'react-icons/fa'
import { IoBookOutline } from 'react-icons/io5'

export interface ContentUploadData {
  title: string
  description: string
  file: File
}

export interface ContentItem {
  id: string
  title: string
  duration?: string
  description: string
  date: string
  fileUrl?: string
  fileName?: string
  ownerId?: string
  uploadedBy: {
    username: string
    role: string
  }
}
=======
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

interface UploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (data: ContentUploadData) => void
<<<<<<< HEAD
  editingContent?: ContentItem | null
}

const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, onUpload, editingContent }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingContent) {
      setTitle(editingContent.title)
      setDescription(editingContent.description)
    } else {
      // Reset form when not editing
      setTitle('')
      setDescription('')
      setFile(null)
    }
  }, [editingContent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file')
      return
    }

    setIsSubmitting(true)
    try {
      await onUpload({
        title,
        description,
        file: file!,
      })
      
      // Reset form
      setTitle('')
      setDescription('')
      setFile(null)
      onClose()
    } catch (error) {
      console.error('Error uploading:', error)
    } finally {
      setIsSubmitting(false)
    }
=======
}

export interface ContentUploadData {
  title: string
  type: string
  description: string
  file?: File
  link?: string
}

const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState<ContentUploadData>({
    title: '',
    type: '',
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpload({
      ...formData,
      file: file || undefined,
    })
    // Reset form
    setFormData({
      title: '',
      type: '',
      description: '',
    })
    setFile(null)
    onClose()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
<<<<<<< HEAD
      <DialogContent className="max-w-md sm:max-w-lg w-[95vw] p-4 sm:p-6 border border-gray-100 shadow-xl">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-lg">
              {editingContent ? (
                <FaEdit className="h-4 w-4 text-white" />
              ) : (
                <IoBookOutline className="h-4 w-4 text-white" />
              )}
            </div>
            <DialogTitle className="text-lg md:text-xl text-gray-800">
              {editingContent ? 'Edit Content' : 'Upload New Content'}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs md:text-sm text-gray-500">
            {editingContent 
              ? 'Update your content details below.'
              : 'Add a new piece of content to your course.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>
        
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 pt-2">
          <div>
            <Label htmlFor="title" className="text-xs md:text-sm font-medium text-gray-700">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 text-sm h-9 md:h-10 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter a descriptive title"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-xs md:text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 text-sm min-h-[80px] focus:border-purple-500 focus:ring-purple-500"
              placeholder="Provide a brief description of this content"
            />
          </div>
          <div>
            <Label htmlFor="file" className="text-xs md:text-sm font-medium text-gray-700">File</Label>
            <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-purple-300 transition-colors">
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required={!editingContent || (editingContent && !editingContent.fileUrl)}
                className="hidden"
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <FaFile className="h-4 w-4 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    {file ? file.name : 'Click to select a file'}
                  </span>
                  <p className="text-xs text-gray-500">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size: 10MB'}
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-2 md:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-sm h-9 md:h-10 border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto text-sm h-9 md:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isSubmitting 
                ? (editingContent ? 'Updating...' : 'Uploading...') 
                : (editingContent ? 'Update Content' : 'Upload Content')}
            </Button>
=======
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Content</DialogTitle>
            <DialogDescription>
              Add new learning materials or questions to your class.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Link">Link</SelectItem>
                  <SelectItem value="Question">Question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            {formData.type !== 'Link' ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  File
                </Label>
                <Input
                  id="file"
                  type="file"
                  className="col-span-3"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required={formData.type !== 'Link'}
                />
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  type="url"
                  className="col-span-3"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required={formData.type === 'Link'}
                  placeholder="https://"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

<<<<<<< HEAD
export default UploadDialog
=======
export default UploadDialog 
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
