import { User } from '@/types/user';
import { Note } from '@/types/note';

// Sakarya Üniversiteleri odaklı - İleride diğer üniversiteler bu listeye kolayca eklenebilir
export const MOCK_UNIVERSITIES = [
  "Sakarya Üniversitesi (SAÜ)",
  "Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ)",
];

export const MOCK_DEPARTMENTS = [
  "Bilgisayar Mühendisliği",
  "Yazılım Mühendisliği",
  "Bilişim Sistemleri Mühendisliği",
  "Yapay Zeka ve Veri Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Endüstri Mühendisliği",
  "Mekatronik Mühendisliği",
];

export const MOCK_USERS: Record<string, User> = {
  "mentor-1": {
    id: "mentor-1",
    name: "Eren Demir",
    email: "eren.demir@sakarya.edu.tr",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    role: "MENTOR",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    year: 3,
    gpa: 3.84,
    bio: "SAÜ Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. Veri Yapıları, Algoritmalar ve Web teknolojileri üzerine çalışıyorum. 1. sınıf arkadaşlarıma sınav tüyoları ve lab kodlamalarında rehberlik ediyorum.",
    matchedUserId: "mentee-1",
    matchedUserName: "Zeynep Yılmaz",
    mentorProfile: {
      experiences: [
        "SAÜ Bilişim Kulübü Teknik Koordinatörü",
        "TÜBİTAK 2209-A Proje Yürütücüsü",
        "Sakarya Teknokent Stajyeri (2025)"
      ],
      capacity: 3,
      activeMenteesCount: 2,
      aboutMentor: "Haftalık Esentepe Kampüsü kütüphane veya online Discord soru çözümü, lab öncesi kod inceleme desteği veriyorum."
    }
  },
  "mentee-1": {
    id: "mentee-1",
    name: "Zeynep Yılmaz",
    email: "zeynep.yilmaz@sakarya.edu.tr",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    role: "MENTEE",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    year: 1,
    gpa: 3.20,
    bio: "SAÜ Bilgisayar 1. Sınıf öğrencisiyim. Esentepe Kampüsü'ne yeni başladım. Matematik 1 ve C laboratuvar derslerinde mentorluk alıyorum.",
    matchedUserId: "mentor-1",
    matchedUserName: "Eren Demir",
    menteeProfile: {
      strugglingCourses: ["MAT101 (Matematik 1)", "BSM102 (Algoritma ve Programlama 1)"],
      interests: ["Web Geliştirme", "Yapay Zeka", "Açık Kaynak"],
      goals: "1. sınıfı 3.50+ GANO ile bitirip SAÜ Teknokent ekiplerine dahil olmak."
    }
  },
  "mentor-2": {
    id: "mentor-2",
    name: "Büşra Yıldız",
    email: "busra.yildiz@subu.edu.tr",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    role: "MENTOR",
    university: "Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ)",
    department: "Yazılım Mühendisliği",
    year: 3,
    gpa: 3.72,
    bio: "SUBÜ Yazılım Mühendisliği 3. sınıf. +1 İşletmede Mesleki Eğitim (7+1) tecrübelerimi ve backend mimarileri 1. sınıf öğrencilerine aktarıyorum.",
    mentorProfile: {
      experiences: [
        "SUBÜ Yazılım Topluluğu Lideri",
        "Fintech Part-time Backend Developer",
        "Teknofest Finalisti"
      ],
      capacity: 2,
      activeMenteesCount: 1,
      aboutMentor: "SUBÜ 7+1 modeline erken hazırlık, portfolyo kurma ve derslerde çıkmış soru analizi yapıyoruz."
    }
  },
  "mentee-2": {
    id: "mentee-2",
    name: "Burak Kaya",
    email: "burak.kaya@subu.edu.tr",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200",
    role: "MENTEE",
    university: "Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ)",
    department: "Yazılım Mühendisliği",
    year: 1,
    gpa: 3.10,
    bio: "SUBÜ Yazılım 1. sınıf öğrencisiyim. Nesne yönelimli programlama temelleri için mentor arıyorum.",
    menteeProfile: {
      strugglingCourses: ["FZK101 (Fizik)", "MAT101 (Calculus)"],
      interests: ["Mobil Uygulama", "Flutter", "Siber Güvenlik"],
      goals: "Temel CS derslerini A ile geçip proje üretmek."
    }
  }
};

export const MOCK_NOTES: Note[] = [
  // --- PUBLIC COMMUNITY NOTES (SAÜ & SUBÜ ODAKLI) ---
  {
    id: "note-1",
    title: "MAT101 - Matematik 1 Esentepe Kampüsü Vize Özel Özeti + Çıkmış Soru Tipleri",
    courseCode: "MAT101",
    courseName: "Matematik 1 (Analiz I)",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    term: "1. Sınıf Güz",
    noteType: "SUMMARY",
    contentType: "MARKDOWN",
    content: `### SAÜ MAT101 Vize Hazırlık Özeti (Hocaların En Çok Sorduğu Konular)

1. **Limit ve Süreklilik:**
   - Epsilon-Delta tanımını sözel olarak sorabilirler, ancak esas soru belirsizlik giderme $(x^2 - 4)/(x - 2)$ ve L'Hôpital kuralından gelir.
   - Trigo limit formülü: $\\lim_{x \\to 0} \\frac{\\sin ax}{bx} = \\frac{a}{b}$ kuralını unutmayın!

2. **Türev Alma & Zincir Kuralı:**
   - SAÜ ortak havuz sınavında türevin adımlarını tek tek yazın, kısmi puan veriliyor.
   - Kapalı fonksiyon türevinde ($x^2 + y^2 = 25$) her $y$ teriminin yanına $y'$ çarpanı eklemeyi unutmayın.

3. **Optimizasyon & Ekstremum Noktaları:**
   - 1. Türev = 0 kökleri kritik noktadır. Vizede banko 1 adet kutu hacmi veya tel bükme optimizasyon sorusu var!`,
    fileUrl: "https://drive.google.com/example/mat101-sau-vize-ozeti.pdf",
    visibility: "PUBLIC",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    tags: ["vize", "özet", "çıkmış sorular", "matematik", "calculus", "saü"],
    upvotes: 142,
    views: 1250,
    downloads: 388,
    commentsCount: 12,
    createdAt: "2026-09-20T10:30:00Z"
  },
  {
    id: "note-2",
    title: "BSM102 - C Programlama & Algoritmalara Giriş: Pointer ve Struct Rehberi",
    courseCode: "BSM102",
    courseName: "Algoritma ve Programlamaya Giriş",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    term: "1. Sınıf Bahar",
    noteType: "CHEAT_SHEET",
    contentType: "MARKDOWN",
    content: `### C Dilinde Pointer & Bellek Yönetimi Hızlı El Kitabı

- **Pointer Tanımı:** \`int *p = &x;\` -> p x'in RAM adresini tutar. \`*p\` ise o adresteki değere erişir.
- **Dinamik Bellek:**
  \`\`\`c
  int *arr = (int*)malloc(n * sizeof(int));
  if (arr == NULL) { /* bellek yetmedi */ }
  // işimiz bitince MUTLAKA:
  free(arr);
  \`\`\`
- **Struct ve Ok Operatörü:** \`ptr->name\` ile \`(*ptr).name\` aynıdır. Lab asistanlarının sınavda sorduğu en kritik yer!`,
    fileUrl: "https://github.com/example/c-pointers-cheat-sheet",
    visibility: "PUBLIC",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    tags: ["c-lang", "pointer", "algoritma", "özet", "kodlama", "saü"],
    upvotes: 98,
    views: 890,
    downloads: 245,
    commentsCount: 7,
    createdAt: "2026-09-24T14:15:00Z"
  },
  {
    id: "note-3",
    title: "YZM101 - SUBÜ Yazılım 1. Sınıflar İçin Kariyer & 7+1 Hazırlık Yol Haritası",
    courseCode: "YZM101",
    courseName: "Yazılım Mühendisliğine Giriş",
    university: "Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ)",
    department: "Yazılım Mühendisliği",
    term: "1. Sınıf Güz",
    noteType: "ROADMAP",
    contentType: "MARKDOWN",
    content: `### SUBÜ Yazılım 1. Sınıfta Ne Yapmalısın?
- **1. Dönem:** Temel C/Python mantığı, GitHub hesabı açma ve ilk commitleri atma, İngilizce teknik döküman okuma pratiği.
- **2. Dönem:** Veri yapılarına hazırlık, Linux terminal komutları, Teknofest kulüp projelerine gönüllü katılma.
- **Yaz Tatili & 7+1 Hedefi:** 4. sınıftaki tam dönem staj için şimdiden portfolyonuzda 2 adet çalışan full-stack proje bulundurun.`,
    fileUrl: "https://roadmap.sh/software-engineer",
    visibility: "PUBLIC",
    authorId: "mentor-2",
    authorName: "Büşra Yıldız",
    authorRole: "MENTOR",
    authorDepartment: "SUBÜ Yazılım Müh.",
    authorYear: 3,
    tags: ["yol haritası", "kariyer", "1. sınıf", "tavsiye", "subü", "7+1"],
    upvotes: 188,
    views: 1530,
    downloads: 410,
    commentsCount: 14,
    createdAt: "2026-10-02T11:20:00Z"
  },
  {
    id: "note-4",
    title: "FZK101 - Genel Fizik I Mekanik Formül Tablosu ve Serbest Cisim Diyagramları",
    courseCode: "FZK101",
    courseName: "Genel Fizik 1",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Elektrik-Elektronik Mühendisliği",
    term: "1. Sınıf Güz",
    noteType: "CHEAT_SHEET",
    contentType: "PDF",
    content: `Fizik 1 dersi için vize ve finale girmeden önce masanızda durması gereken 2 sayfalık renkli formül dökümü. Eğik düzlem, sürtünme katsayısı, açısal momentum ve enerjinin korunumu örnekleri eklenmiştir.`,
    fileUrl: "https://example.com/fzk101-mekanik-formul-tablosu.pdf",
    visibility: "PUBLIC",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    tags: ["fizik", "vize", "final", "formül", "özet", "saü"],
    upvotes: 115,
    views: 940,
    downloads: 310,
    commentsCount: 5,
    createdAt: "2026-09-28T09:00:00Z"
  },
  {
    id: "note-5",
    title: "BSM203 - Veri Yapıları: Ağaçlar (BST, AVL) ve Graflar Çözümlü Final Soruları",
    courseCode: "BSM203",
    courseName: "Veri Yapıları",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    term: "2. Sınıf Güz",
    noteType: "PAST_EXAMS",
    contentType: "MARKDOWN",
    content: `### Son 3 Yılın Finalinde Çıkan Ağaç & Graf Sorularının Çözümleri
1. AVL Ağacı Dengelenmesi (Right Rotation, Left-Right Rotation adım adım çizimleri)
2. Dijkstra En Kısa Yol Algoritması Tablo Doldurma Tekniği
3. Hash Tablolarında Çakışma Çözümü (Quadratic Probing)`,
    fileUrl: "https://drive.google.com/example/veri-yapilari-final.pdf",
    visibility: "PUBLIC",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    tags: ["çıkmış sorular", "final", "veri yapıları", "avl", "graf", "saü"],
    upvotes: 210,
    views: 1820,
    downloads: 620,
    commentsCount: 19,
    createdAt: "2026-10-01T16:45:00Z"
  },

  // --- PRIVATE MENTEE-ONLY NOTES ---
  {
    id: "note-private-1",
    title: "⭐ [SANA ÖZEL] Zeynep İçin MAT101 Vize Taktikleri & Hoca Soru Şablonları",
    courseCode: "MAT101",
    courseName: "Matematik 1",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    term: "1. Sınıf Güz",
    noteType: "SUMMARY",
    contentType: "MARKDOWN",
    content: `Selam Zeynep! Geçen haftaki Esentepe kütüphanesindeki görüşmemizde bahsettiğin gibi Türev ve Süreklilik tarafında takıldığın noktaları toparladım.

### Vize İçin Altın İpuçları:
1. **Bizim hocanın favorisi:** Fonksiyonun grafiğini çizdirip yerel min/max sordurur. Tablo yaparken işaretleri kontrol etmeyi unutma!
2. **Soru 3 genelde Teorem sorusudur:** 'Ortalama Değer Teoremi (MVT)' koşullarını mutlaka ezberle, 15 puan buradan geliyor.
3. Eklediğim linkte benim 1. sınıftayken aldığım el yazısı çözümler var. İnceledikten sonra perşembe saat 17:00'de Discord üzerinden birlikte 2 soru çözelim!`,
    fileUrl: "https://drive.google.com/example/zeynep-ozel-mat101-taktikler.pdf",
    visibility: "MENTEE_ONLY",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    targetMenteeId: "mentee-1",
    targetMenteeName: "Zeynep Yılmaz",
    tags: ["mentee-özel", "mat101", "vize", "taktikler"],
    upvotes: 1,
    views: 8,
    downloads: 3,
    commentsCount: 3,
    createdAt: "2026-10-02T15:00:00Z",
    comments: [
      {
        id: "c-1",
        authorName: "Zeynep Yılmaz",
        authorRole: "MENTEE",
        content: "Eren abi çok teşekkürler, MVT tablosu çok iyi oturdu! Perşembe günkü soru çözümünde görüşürüz.",
        createdAt: "2026-10-02T16:20:00Z"
      }
    ]
  },
  {
    id: "note-private-2",
    title: "⭐ [SANA ÖZEL] BSM102 Lab 3 Öncesi Hazırlık Notu & Test Case'ler",
    courseCode: "BSM102",
    courseName: "Algoritma ve Programlama",
    university: "Sakarya Üniversitesi (SAÜ)",
    department: "Bilgisayar Mühendisliği",
    term: "1. Sınıf Güz",
    noteType: "LAB_NOTES",
    contentType: "MARKDOWN",
    content: `Zeynep merhaba, bu haftaki Lab 3'te asistanlar 'İki Boyutlu Diziler (Matrix Multiplication)' soracaklar.

Dikkat etmen gereken kritik kısımlar:
- Döngü sınırlarını sıfırdan başlatmayı unutma (\`i < N\`).
- Matris çarpımında iç içe 3 döngü kullanman gerekecek (i, j, k).
- Kodunu yazdıktan sonra verdiğim şu test girdisini dene:
  Matris A: [[1, 2], [3, 4]], Matris B: [[2, 0], [1, 2]] -> Beklenen Sonuç: [[4, 4], [10, 8]].`,
    visibility: "MENTEE_ONLY",
    authorId: "mentor-1",
    authorName: "Eren Demir",
    authorRole: "MENTOR",
    authorDepartment: "SAÜ Bilgisayar Müh.",
    authorYear: 3,
    targetMenteeId: "mentee-1",
    targetMenteeName: "Zeynep Yılmaz",
    tags: ["mentee-özel", "lab-notu", "matrisler", "kodlama"],
    upvotes: 1,
    views: 5,
    downloads: 2,
    commentsCount: 1,
    createdAt: "2026-10-03T08:15:00Z"
  }
];
