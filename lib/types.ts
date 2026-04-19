export type Status = "published" | "draft"

export type Video = {
  id: string
  name: string
  duration?: number      
  status: Status
  url?: string           
  chapterId: string
  order: number          
}

export type Chapter = {
  id: string
  name: string
  description?: string   
  status: Status
  topicId: string
  videos: Video[]
  order: number
}

export type Topic = {
  id: string
  name: string
  description?: string
  status: Status
  subjectId: string
  chapters: Chapter[]
  order: number
}

export type Subject = {
    id: string 
    name: string
    level?: string
    topics: Topic[]
}

export type FileItem = Topic | Chapter | Video
// render some to optional
// what if i want to place a folder inside a folder or a chapter inside a folder

export type Level = "topics" | "chapters" | "videos"

export type CurrentPath = {
    subjectId: string
    topicId?: string
    chapterId?: string
}