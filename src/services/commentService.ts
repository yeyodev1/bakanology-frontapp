import APIBase from './httpBase'
import type { ApiResponse } from './academyService'

export interface CommentAuthor {
  id: string
  name: string
  lastName: string
  profilePicture: string | null
  isTeam: boolean
}

export interface LessonComment {
  id: string
  lesson: string
  parent: string | null
  body: string
  status: 'pending' | 'published' | 'rejected'
  createdAt: string
  updatedAt: string
  edited: boolean
  isOwn: boolean
  author: CommentAuthor
  replies: LessonComment[]
}

export interface CommentPage {
  comments: LessonComment[]
  total: number
  pagination: { page: number; limit: number; total: number; totalPages: number }
}

export interface AdminComment {
  _id: string
  body: string
  status: 'pending' | 'published' | 'rejected'
  parent: string | null
  createdAt: string
  user: { _id: string; name: string; lastName: string; profilePicture: string | null; role?: string } | null
  lesson: { _id: string; title: string; course: { _id: string; title: string } | null } | null
}

class CommentService extends APIBase {
  async list(lessonId: string, page = 1) {
    const response = await this.get<ApiResponse<CommentPage>>(
      `academy/lessons/${lessonId}/comments?page=${page}&limit=20`,
    )
    return response.data.data
  }

  async create(lessonId: string, body: string, parent?: string) {
    const response = await this.post<ApiResponse<LessonComment>>(
      `academy/lessons/${lessonId}/comments`,
      { body, parent },
    )
    return response.data.data
  }

  async update(id: string, body: string) {
    const response = await this.put<ApiResponse<LessonComment>>(`academy/comments/${id}`, { body })
    return response.data.data
  }

  async remove(id: string) {
    await this.delete<ApiResponse<{ deleted: boolean }>>(`academy/comments/${id}`)
  }

  async adminList(page = 1, status?: string) {
    const query = new URLSearchParams({ page: String(page), limit: '30' })
    if (status) query.set('status', status)
    const response = await this.get<
      ApiResponse<{ comments: AdminComment[]; pagination: CommentPage['pagination'] }>
    >(`admin/comments?${query}`)
    return response.data.data
  }

  async adminSetStatus(id: string, status: 'published' | 'rejected') {
    await this.put<ApiResponse<unknown>>(`admin/comments/${id}/status`, { status })
  }

  async adminRemove(id: string) {
    await this.delete<ApiResponse<unknown>>(`admin/comments/${id}`)
  }
}

export const commentService = new CommentService()
