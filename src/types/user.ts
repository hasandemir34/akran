export type UserRole = 'MENTEE' | 'MENTOR';

export interface MenteeProfile {
  strugglingCourses: string[]; // e.g. ["MAT101", "Fizik 1"]
  interests: string[]; // e.g. ["Yapay Zeka", "Web Geliştirme", "Oyun"]
  goals: string; // e.g. "Ortalamamı 3.5 üstü tutmak ve staj hazırlığı yapmak"
}

export interface MentorProfile {
  experiences: string[]; // e.g. ["TÜBİTAK Proje Stajyeri", "GDG Campus Lead"]
  capacity: number; // max mentee count, e.g. 3
  activeMenteesCount: number;
  aboutMentor: string; // Tavsiyeler, çalışma tarzı
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  university: string;
  department: string;
  year: 1 | 3;
  gpa?: number;
  bio: string;
  matchedUserId?: string; // Eşleştiği öğrenci / koç id'si
  matchedUserName?: string;
  menteeProfile?: MenteeProfile;
  mentorProfile?: MentorProfile;
}
