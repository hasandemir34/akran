export type Visibility = 'PUBLIC' | 'MENTEE_ONLY';

export type NoteType = 'SUMMARY' | 'PAST_EXAMS' | 'ROADMAP' | 'CHEAT_SHEET' | 'LAB_NOTES';

export interface NoteComment {
  id: string;
  authorName: string;
  authorRole: 'MENTOR' | 'MENTEE';
  content: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  university: string;
  department: string;
  term: string; // örn: "2024 Güz" veya "1. Sınıf Güz"
  noteType: NoteType;
  contentType: 'MARKDOWN' | 'EXTERNAL_LINK' | 'PDF';
  content: string; // Markdown metni veya not açıklaması
  fileUrl?: string; // PDF veya Drive linki
  visibility: Visibility;
  authorId: string;
  authorName: string;
  authorRole: 'MENTOR' | 'MENTEE';
  authorDepartment: string;
  authorYear: number;
  targetMenteeId?: string; // Sadece MENTEE_ONLY ise dolu
  targetMenteeName?: string;
  tags: string[]; // ["vize", "final", "özet", "çıkmış sorular", "yol haritası"]
  upvotes: number;
  views: number;
  downloads: number;
  commentsCount: number;
  comments?: NoteComment[];
  createdAt: string;
}

export interface NoteFilterState {
  search: string;
  university: string;
  department: string;
  courseCode: string;
  noteType: string;
  sortBy: 'popular' | 'newest' | 'upvotes';
}
