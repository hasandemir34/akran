"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, Visibility, NoteType } from "@/types/note";
import { User, UserRole } from "@/types/user";
import { MOCK_NOTES, MOCK_USERS } from "@/data/mockData";

interface RegisterData {
  name: string;
  email: string;
  university: string;
  department: string;
  role: UserRole;
  year: 1 | 3;
}

interface AppContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  switchUserRole: (role: UserRole) => void;
  login: (email: string) => boolean;
  register: (data: RegisterData) => void;
  logout: () => void;
  quickLoginAs: (role: UserRole) => void;
  notes: Note[];
  publicNotes: Note[];
  privateMenteeNotes: Note[];
  userCreatedNotes: Note[];
  addNote: (newNote: Omit<Note, "id" | "authorId" | "authorName" | "authorRole" | "authorDepartment" | "authorYear" | "upvotes" | "views" | "downloads" | "commentsCount" | "createdAt">) => void;
  upvoteNote: (noteId: string) => void;
  addComment: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Varsayılan olarak Mentee (Zeynep Yılmaz - SAÜ)
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS["mentee-1"]);
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);

  const isAuthenticated = Boolean(currentUser);

  // Rol değiştirici (Test için)
  const switchUserRole = (role: UserRole) => {
    if (role === "MENTEE") {
      setCurrentUser(MOCK_USERS["mentee-1"]);
    } else {
      setCurrentUser(MOCK_USERS["mentor-1"]);
    }
  };

  // Hızlı giriş
  const quickLoginAs = (role: UserRole) => {
    switchUserRole(role);
  };

  // Simüle Login
  const login = (email: string): boolean => {
    // E-posta eşleşmesi kontrolü veya rol tahmini
    const foundUser = Object.values(MOCK_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    // Eğer listede yoksa SAÜ Mentee veya Mentor olarak simüle et
    setCurrentUser(MOCK_USERS["mentee-1"]);
    return true;
  };

  // Simüle Register
  const register = (data: RegisterData) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      role: data.role,
      university: data.university,
      department: data.department,
      year: data.year,
      bio: `${data.university} ${data.department} öğrencisiyim.`,
      matchedUserId: data.role === "MENTEE" ? "mentor-1" : "mentee-1",
      matchedUserName: data.role === "MENTEE" ? "Eren Demir (SAÜ Koç)" : "Zeynep Yılmaz (SAÜ Mentee)",
    };
    setCurrentUser(newUser);
  };

  // Çıkış Yap
  const logout = () => {
    setCurrentUser(null);
  };

  // Public Notlar
  const publicNotes = notes.filter((n) => n.visibility === "PUBLIC");

  // Mentee'ye özel notlar
  const privateMenteeNotes = notes.filter((n) => {
    if (n.visibility !== "MENTEE_ONLY") return false;
    if (!currentUser) return false;
    if (currentUser.role === "MENTEE") {
      return n.targetMenteeId === currentUser.id;
    } else {
      return n.authorId === currentUser.id;
    }
  });

  // Kullanıcının kendisinin yüklediği notlar
  const userCreatedNotes = notes.filter((n) => currentUser && n.authorId === currentUser.id);

  // Yeni Not Paylaş
  const addNote = (newNoteData: Omit<Note, "id" | "authorId" | "authorName" | "authorRole" | "authorDepartment" | "authorYear" | "upvotes" | "views" | "downloads" | "commentsCount" | "createdAt">) => {
    if (!currentUser) return;
    const newNote: Note = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorDepartment: `${currentUser.university.includes("SUBÜ") ? "SUBÜ" : "SAÜ"} ${currentUser.department}`,
      authorYear: currentUser.year,
      upvotes: 0,
      views: 1,
      downloads: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  // Beğeni (Upvote)
  const upvoteNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, upvotes: n.upvotes + 1 } : n))
    );
  };

  // Yorum Ekle
  const addComment = (noteId: string, content: string) => {
    if (!currentUser) return;
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: currentUser.name,
            authorRole: currentUser.role,
            content,
            createdAt: new Date().toISOString(),
          };
          return {
            ...n,
            commentsCount: n.commentsCount + 1,
            comments: [...(n.comments || []), newComment],
          };
        }
        return n;
      })
    );
  };

  // Not Sil
  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        switchUserRole,
        login,
        register,
        logout,
        quickLoginAs,
        notes,
        publicNotes,
        privateMenteeNotes,
        userCreatedNotes,
        addNote,
        upvoteNote,
        addComment,
        deleteNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
