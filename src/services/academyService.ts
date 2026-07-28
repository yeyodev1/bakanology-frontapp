import APIBase from './httpBase'

export interface ApiResponse<T> {
  data: T
  message: string
}

export interface MediaAsset {
  publicId: string
  resourceType: 'image' | 'video' | 'raw'
  provider?: 'cloudinary' | 'bunny'
  format?: string
  bytes?: number
  width?: number
  height?: number
  duration?: number
  originalFilename?: string
  createdAt?: string
  deliveryUrl?: string
}

export interface Lesson {
  _id: string
  course?: string
  title: string
  slug: string
  summary: string
  content?: string
  status?: 'draft' | 'published' | 'archived'
  order: number
  durationSeconds: number
  video?: MediaAsset
  thumbnail?: MediaAsset
  materials?: Array<MediaAsset & { title: string }>
  publishedAt?: string | null
  progress?: LessonProgress | null
}

export interface LessonProgress {
  _id?: string
  course?: string
  lesson?: string
  watchedSeconds: number
  lastPositionSeconds?: number
  percent: number
  completed: boolean
  manualCompletion?: boolean | null
  completedAt?: string | null
}

export interface CourseProgress {
  courseId?: string
  totalLessons: number
  completedLessons: number
  percent: number
  lessons?: LessonProgress[]
}

export interface Course {
  _id: string
  slug: string
  title: string
  summary: string
  description: string
  status?: 'draft' | 'published' | 'archived'
  order: number
  cover?: MediaAsset
  publishedAt?: string | null
  lessons?: Lesson[]
  progress?: CourseProgress
}

export interface MediaDelivery {
  publicId: string
  provider?: 'cloudinary' | 'bunny'
  cloudName?: string
  url: string
}

class AcademyService extends APIBase {
  async listCourses() {
    const response = await this.get<ApiResponse<Course[]>>('academy/courses')
    return response.data.data || []
  }

  async getCourse(id: string) {
    const response = await this.get<ApiResponse<Course>>(`academy/courses/${id}`)
    return response.data.data
  }

  async getLesson(id: string) {
    const response = await this.get<ApiResponse<Lesson>>(`academy/lessons/${id}`)
    return response.data.data
  }

  async updateProgress(lessonId: string, watchedSeconds: number, completed: boolean) {
    const response = await this.put<ApiResponse<{ progress: LessonProgress; courseProgress: CourseProgress }>>(
      `academy/lessons/${lessonId}/progress`,
      { watchedSeconds, completed },
    )
    return response.data.data
  }

  async getVideoDelivery(videoId: string) {
    const response = await this.post<ApiResponse<MediaDelivery>>('academy/assets/delivery-url', { videoId })
    return response.data.data
  }
}

export const academyService = new AcademyService()
