const mock = {
  players: ["Kullanıcı", "Eski Sevgili"],
  strategies: [
    {
      player: "Kullanıcı",
      options: [
        "Geri çekilmek",
        "Mesaj atmak",
        "Özür dilemek",
        "İletişimi kesmek",
      ],
    },
    {
      player: "Eski Sevgili",
      options: [
        "İletişimi kesmek",
        "Geri dönmek",
        "İçine kapanmak",
        "Sorunu görmezden gelmek",
      ],
    },
  ],
  payoffs_preferences: {
    objective: "İlişkideki belirsizlikten kurtulmak ve net bir çözüm bulmak.",
    ranking: [
      "Sağlıklı bir iletişim kurmak",
      "Sorunları çözmek",
      "Duygusal olarak daha az yıpranmak",
      "İlişkinin devam etmesi",
      "Kendimi iyi hissetmek",
    ],
  },
  evaluation:
    "Bu durumda, Kullanıcı'nın ve Eski Sevgili'nin stratejileri birbirini etkileyen bir döngü oluşturuyor. Özellikle Eski Sevgili'nin iletişimi kesmesi, Kullanıcı'nın duygusal olarak yıpranmasına neden oluyor. Belirsizlik, hangi stratejinin daha etkili olacağını bilinmez hale getiriyor. Kullanıcı'nın geri çekilmesi veya üzerine gitmesi, Eski Sevgili'nin tepkilerini etkileyebilir. Kullanıcı'nın hangi adımlarının daha etkili olacağını anlamak için, Eski Sevgili'nin davranışları ve duygusal durumları hakkında daha fazla bilgi gereklidir.",
  timing: "unknown",
  game_type: "repeated",
  missing_info_questions: [
    "Eski sevgilinin bu durumu nasıl hissettiğini biliyor musun?",
    "Daha önce bu sorunları konuşmayı denediniz mi?",
    "Eski sevgiliyle iletişiminizi kesmeyi düşündünüz mü?",
    "Sorunlar hakkında net bir konuşma yapmayı planlıyor musun?",
    "Eski sevgiliyle aranızda başka bir iletişim şekli var mı?",
    "Ne sıklıkla iletişim kuruyorsunuz?",
    "Bu döngünün ne kadar süredir devam ettiğini biliyor musun?",
  ],
  assumptions: [
    "İki oyuncu da birbirinin davranışlarından etkileniyor.",
    "İlişki sürekli tekrar eden bir döngü içinde.",
    "Belirsizlik her iki taraf için de stres yaratıyor.",
    "Kullanıcı'nın duygusal durumu belirsizlikten etkileniyor.",
  ],
};
