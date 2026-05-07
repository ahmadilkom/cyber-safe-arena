export interface Option {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  options: Option[];
}

export const allScenarios: Scenario[] = [
  {
    id: 1,
    title: "Email Misterius",
    description: "Anda menerima email dari 'support@bank-anda-verifikasi.com' yang meminta Anda mengklik tautan untuk memverifikasi kata sandi karena ada aktivitas mencurigakan. Apa yang Anda lakukan?",
    options: [
      { text: "Klik tautan dan ubah kata sandi agar aman.", isCorrect: false, explanation: "Ini adalah taktik Phishing! Bank asli tidak pernah meminta kata sandi melalui email." },
      { text: "Abaikan email tersebut dan hubungi bank melalui nomor resmi.", isCorrect: true, explanation: "Tepat sekali! Selalu verifikasi melalui saluran komunikasi resmi jika ada permintaan mencurigakan." },
      { text: "Balas email tersebut dan tanyakan apakah ini penipuan.", isCorrect: false, explanation: "Membalas email phishing hanya akan mengonfirmasi bahwa email Anda aktif." },
      { text: "Teruskan email ke teman untuk menanyakan pendapat mereka.", isCorrect: false, explanation: "Ini berbahaya karena teman Anda bisa secara tidak sengaja mengklik tautannya." }
    ]
  },
  {
    id: 2,
    title: "Wi-Fi Publik",
    description: "Anda sedang di kafe dan ingin login ke aplikasi mobile banking menggunakan Wi-Fi 'Kafe_Free_WiFi'. Langkah paling aman adalah:",
    options: [
      { text: "Segera login karena Wi-Fi kafe biasanya aman.", isCorrect: false, explanation: "Wi-Fi publik rentan terhadap peretasan (Man-in-the-Middle attack)." },
      { text: "Gunakan jaringan seluler (paket data) atau VPN sebelum login.", isCorrect: true, explanation: "Benar! Jaringan seluler pribadi atau VPN mengenkripsi data Anda dan melindunginya dari jaringan publik yang tidak aman." },
      { text: "Login dengan cepat lalu segera logout.", isCorrect: false, explanation: "Peretas dapat mencuri data Anda bahkan dalam waktu sepersekian detik saat proses login." },
      { text: "Hanya login jika Anda duduk di dekat router Wi-Fi.", isCorrect: false, explanation: "Jarak dengan router tidak menjamin keamanan jaringan publik." }
    ]
  },
  {
    id: 3,
    title: "Kata Sandi Kuat",
    description: "Anda sedang membuat akun baru. Manakah dari kata sandi berikut yang paling kuat dan aman?",
    options: [
      { text: "Budi12345", isCorrect: false, explanation: "Kata sandi ini terlalu mudah ditebak dan mengandung informasi pribadi." },
      { text: "password123!", isCorrect: false, explanation: "Kata sandi yang umum digunakan sangat rentan terhadap serangan brute force." },
      { text: "Kucing&Buku^Biru99!", isCorrect: true, explanation: "Sangat baik! Kata sandi ini panjang, menggabungkan huruf, angka, simbol, dan tidak menggunakan informasi pribadi." },
      { text: "tanggal_lahir_saya", isCorrect: false, explanation: "Jangan pernah menggunakan informasi pribadi seperti tanggal lahir sebagai kata sandi." }
    ]
  },
  {
    id: 4,
    title: "Pembaruan Perangkat Lunak",
    description: "Smartphone Anda menampilkan notifikasi pembaruan sistem operasi (OS). Apa yang sebaiknya Anda lakukan?",
    options: [
      { text: "Abaikan saja karena akan menghabiskan memori.", isCorrect: false, explanation: "Mengabaikan pembaruan membuat perangkat Anda rentan terhadap ancaman keamanan terbaru." },
      { text: "Tunggu beberapa bulan sampai ada versi yang lebih baru lagi.", isCorrect: false, explanation: "Menunda pembaruan memberikan celah waktu bagi peretas untuk mengeksploitasi sistem." },
      { text: "Segera unduh dan instal pembaruan saat terhubung ke Wi-Fi yang aman.", isCorrect: true, explanation: "Benar! Pembaruan perangkat lunak sering kali berisi perbaikan keamanan penting yang melindungi dari virus dan peretas." },
      { text: "Hanya perbarui jika aplikasi mulai lambat.", isCorrect: false, explanation: "Pembaruan tidak hanya tentang performa, tapi lebih penting untuk menambal celah keamanan." }
    ]
  },
  {
    id: 5,
    title: "Autentikasi Dua Faktor (2FA)",
    description: "Apa fungsi utama dari mengaktifkan Autentikasi Dua Faktor (2FA) di akun media sosial Anda?",
    options: [
      { text: "Agar akun terlihat lebih profesional.", isCorrect: false, explanation: "2FA bukan tentang penampilan, tapi tentang keamanan." },
      { text: "Memberikan lapisan keamanan tambahan selain kata sandi.", isCorrect: true, explanation: "Benar! 2FA memastikan bahwa orang yang masuk adalah Anda, dengan meminta kode tambahan yang dikirim ke perangkat Anda." },
      { text: "Mempercepat proses login.", isCorrect: false, explanation: "Sebaliknya, 2FA sedikit memperlambat login tetapi jauh meningkatkan keamanan." },
      { text: "Mencegah munculnya iklan di beranda Anda.", isCorrect: false, explanation: "2FA tidak memiliki kaitan dengan sistem periklanan." }
    ]
  },
  {
    id: 6,
    title: "Privasi Media Sosial",
    description: "Anda ingin memposting foto tiket pesawat untuk memamerkan liburan Anda yang akan datang. Risiko utama dari tindakan ini adalah:",
    options: [
      { text: "Orang lain akan iri dengan Anda.", isCorrect: false, explanation: "Itu masalah emosional, tapi ada risiko keamanan yang jauh lebih besar." },
      { text: "Maskapai dapat membatalkan tiket Anda.", isCorrect: false, explanation: "Maskapai tidak akan membatalkan tiket hanya karena Anda mempostingnya." },
      { text: "Tiket berisi barcode dan data pribadi yang bisa disalahgunakan.", isCorrect: true, explanation: "Tepat! Barcode tiket pesawat mengandung banyak data pribadi seperti nama, kode booking, dan bahkan detail paspor yang bisa dicuri." },
      { text: "Foto tidak akan mendapat banyak 'likes'.", isCorrect: false, explanation: "Ini bukan risiko keamanan." }
    ]
  },
  {
    id: 7,
    title: "Pesan Teks Misterius (Smishing)",
    description: "Anda menerima SMS: 'Selamat! Anda memenangkan undian Rp 10 Juta. Klik link ini untuk klaim: http://klaim-hadiah.xyz'. Anda harus:",
    options: [
      { text: "Klik tautan untuk melihat syarat klaim hadiah.", isCorrect: false, explanation: "Mengklik tautan dari nomor tidak dikenal sangat berisiko mengunduh malware." },
      { text: "Hapus pesan dan blokir nomor pengirim.", isCorrect: true, explanation: "Benar! Ini adalah bentuk penipuan Smishing (SMS Phishing). Abaikan dan blokir nomor tersebut." },
      { text: "Balas pesan untuk memastikan kebenarannya.", isCorrect: false, explanation: "Membalas pesan akan menandakan nomor Anda aktif dan menjadi target spam lanjutan." },
      { text: "Teruskan SMS ke keluarga agar mereka juga bisa menang.", isCorrect: false, explanation: "Ini akan menyebarkan potensi penipuan ke orang terdekat Anda." }
    ]
  },
  {
    id: 8,
    title: "Software Gratis",
    description: "Anda membutuhkan aplikasi edit video berbayar dan menemukan situs web yang menawarkan unduhan gratis secara ilegal. Risiko terbesarnya adalah:",
    options: [
      { text: "Video yang dihasilkan akan beresolusi rendah.", isCorrect: false, explanation: "Risiko keamanan lebih besar daripada sekadar kualitas video." },
      { text: "Aplikasi mungkin mengandung malware atau virus Trojan.", isCorrect: true, explanation: "Benar! Software bajakan (crack) sering kali disisipi virus yang dapat merusak komputer atau mencuri data Anda." },
      { text: "Proses unduhan akan sangat lambat.", isCorrect: false, explanation: "Itu hanya ketidaknyamanan, bukan risiko utama." },
      { text: "Aplikasi akan menghabiskan memori RAM terlalu banyak.", isCorrect: false, explanation: "Itu mungkin terjadi, tapi risiko infeksi malware jauh lebih kritis." }
    ]
  },
  {
    id: 9,
    title: "Cyberbullying (Perundungan Siber)",
    description: "Seorang teman sekelas terus-menerus mengirimkan komentar kasar dan ancaman di akun Instagram Anda. Apa yang sebaiknya dilakukan?",
    options: [
      { text: "Balas dengan komentar kasar juga agar dia takut.", isCorrect: false, explanation: "Membalas hanya akan memperburuk situasi dan membuat Anda ikut bersalah." },
      { text: "Screenshot buktinya, blokir akunnya, dan laporkan ke orang dewasa.", isCorrect: true, explanation: "Sangat tepat! Menyimpan bukti dan melaporkan adalah cara paling aman menangani cyberbullying." },
      { text: "Hapus akun Instagram Anda secara permanen.", isCorrect: false, explanation: "Anda tidak perlu mengorbankan akun Anda. Cukup blokir pelaku." },
      { text: "Abaikan dan biarkan saja sampai dia berhenti sendiri.", isCorrect: false, explanation: "Mengabaikan terkadang tidak menghentikan perundungan. Tindakan tegas lebih baik." }
    ]
  },
  {
    id: 10,
    title: "Mengenali Hoaks (Berita Palsu)",
    description: "Anda membaca berita sensasional di WhatsApp bahwa 'Minum air garam dapat menyembuhkan virus X seketika'. Langkah terbaik adalah:",
    options: [
      { text: "Langsung bagikan ke grup keluarga agar semua tahu.", isCorrect: false, explanation: "Anda berpotensi menyebarkan misinformasi yang berbahaya." },
      { text: "Segera coba tips tersebut di rumah.", isCorrect: false, explanation: "Mempraktikkan informasi kesehatan yang belum terverifikasi sangat berbahaya." },
      { text: "Cari tahu kebenarannya melalui sumber berita resmi atau medis terpercaya.", isCorrect: true, explanation: "Benar! Selalu verifikasi informasi sensasional melalui sumber-sumber resmi sebelum mempercayainya." },
      { text: "Percaya saja jika yang mengirim adalah teman dekat.", isCorrect: false, explanation: "Teman dekat juga bisa menjadi korban penyebaran berita palsu tanpa disadari." }
    ]
  },
  {
    id: 11,
    title: "Situs Web Aman (HTTPS)",
    description: "Saat Anda ingin melakukan pembelian online, Anda melihat alamat situs web dimulai dengan 'http://' tanpa ikon gembok. Artinya:",
    options: [
      { text: "Situs tersebut sangat aman dan dilindungi enkripsi kelas militer.", isCorrect: false, explanation: "HTTPS-lah yang menggunakan enkripsi, sedangkan HTTP tidak." },
      { text: "Situs sedang diperbarui oleh pemiliknya.", isCorrect: false, explanation: "Tidak ada hubungannya dengan status perbaikan situs." },
      { text: "Data yang Anda kirim (termasuk kartu kredit) tidak dienkripsi dan rawan dicuri.", isCorrect: true, explanation: "Benar! 'http' tanpa 's' berarti koneksi tidak aman. Jangan pernah memasukkan data sensitif di situs semacam itu." },
      { text: "Situs tersebut milik pemerintah resmi.", isCorrect: false, explanation: "Situs pemerintah justru selalu menggunakan HTTPS demi keamanan." }
    ]
  },
  {
    id: 12,
    title: "Mengunci Perangkat",
    description: "Anda meninggalkan laptop di meja perpustakaan untuk pergi ke toilet. Apa yang harus Anda lakukan?",
    options: [
      { text: "Minta teman baru yang tidak dikenal untuk menjaganya.", isCorrect: false, explanation: "Mempercayai orang asing dengan perangkat Anda sangat berisiko." },
      { text: "Biarkan saja menyala agar saat kembali bisa langsung kerja.", isCorrect: false, explanation: "Orang lain dapat dengan mudah mengakses data atau akun Anda yang sedang terbuka." },
      { text: "Kunci layar perangkat (Lock Screen) sebelum meninggalkannya.", isCorrect: true, explanation: "Tepat! Mengunci layar mencegah akses fisik dari orang tak berwenang." },
      { text: "Tutup layarnya setengah tanpa mematikannya.", isCorrect: false, explanation: "Itu tidak mengunci layar dan tetap rentan diakses." }
    ]
  },
  {
    id: 13,
    title: "Pencadangan Data (Backup)",
    description: "Mengapa penting melakukan pencadangan data (backup) komputer Anda secara berkala?",
    options: [
      { text: "Agar komputer berjalan lebih cepat.", isCorrect: false, explanation: "Backup tidak memengaruhi kecepatan komputer Anda." },
      { text: "Untuk mencegah kehilangan data jika terjadi kerusakan hard disk atau serangan Ransomware.", isCorrect: true, explanation: "Sangat benar! Backup memastikan Anda tetap memiliki salinan file penting Anda dalam kondisi darurat." },
      { text: "Supaya mendapatkan lebih banyak ruang kosong di memori.", isCorrect: false, explanation: "Backup justru menyalin data, bukan menghapus atau mengosongkan memori utama." },
      { text: "Untuk memenuhi syarat garansi dari pabrik komputer.", isCorrect: false, explanation: "Garansi tidak berkaitan dengan backup data pribadi." }
    ]
  },
  {
    id: 14,
    title: "Oversharing Informasi",
    description: "Saat mendaftar aplikasi kuis kepribadian di Facebook, aplikasi meminta akses ke daftar teman, foto, dan lokasi Anda. Apa tindakan Anda?",
    options: [
      { text: "Setuju saja, karena kuis tersebut terlihat menyenangkan.", isCorrect: false, explanation: "Kesenangan sementara tidak sepadan dengan mengorbankan privasi data Anda." },
      { text: "Tolak akses tersebut atau batalkan penggunaan aplikasi kuis.", isCorrect: true, explanation: "Tepat! Aplikasi pihak ketiga sering mengumpulkan data secara berlebihan (data harvesting) yang bisa dijual ke pihak lain." },
      { text: "Berikan akses namun gunakan nama palsu di profil Facebook.", isCorrect: false, explanation: "Data lokasi dan foto tetap berisiko terekspos." },
      { text: "Hanya setujui akses ke daftar teman.", isCorrect: false, explanation: "Memberikan akses teman berarti Anda juga mengkompromikan privasi orang lain." }
    ]
  },
  {
    id: 15,
    title: "Pencurian Identitas",
    description: "Tanda mana di bawah ini yang mengindikasikan identitas digital Anda mungkin telah dicuri?",
    options: [
      { text: "Aplikasi berjalan lambat dari biasanya.", isCorrect: false, explanation: "Itu lebih merupakan masalah performa atau ruang memori." },
      { text: "Anda menerima pemberitahuan login dari perangkat/lokasi tak dikenal.", isCorrect: true, explanation: "Benar! Jika ada yang mencoba login dari negara lain sementara Anda di rumah, itu tanda kuat akun Anda diretas." },
      { text: "Baterai ponsel cepat habis.", isCorrect: false, explanation: "Itu bisa disebabkan oleh penuaan baterai atau terlalu banyak aplikasi aktif." },
      { text: "Situs web meminta Anda untuk menyetujui kebijakan cookie.", isCorrect: false, explanation: "Persetujuan cookie adalah standar prosedur situs web normal." }
    ]
  },
  {
    id: 16,
    title: "USB Tak Dikenal",
    description: "Anda menemukan sebuah flash disk (USB drive) tergeletak di tempat parkir kampus. Apa yang harus Anda lakukan?",
    options: [
      { text: "Colokkan ke laptop Anda untuk mencari tahu siapa pemiliknya.", isCorrect: false, explanation: "Flash disk tersebut mungkin sengaja diletakkan dan berisi malware berbahaya." },
      { text: "Serahkan ke bagian keamanan atau lost and found tanpa mencolokkannya.", isCorrect: true, explanation: "Benar! Jangan pernah menghubungkan perangkat tak dikenal ke komputer pribadi Anda." },
      { text: "Format ulang flash disk tersebut untuk digunakan sendiri.", isCorrect: false, explanation: "Bahkan proses format bisa memicu virus yang tersembunyi untuk aktif." },
      { text: "Jual flash disk tersebut secara online.", isCorrect: false, explanation: "Ini tidak etis dan bisa menyebarkan malware ke orang lain." }
    ]
  },
  {
    id: 17,
    title: "Izin Aplikasi (App Permissions)",
    description: "Anda mengunduh aplikasi 'Senter HP'. Aplikasi ini meminta izin akses ke Kontak, Mikrofon, dan Lokasi. Langkah Anda adalah:",
    options: [
      { text: "Setujui saja agar senternya berfungsi maksimal.", isCorrect: false, explanation: "Aplikasi senter sama sekali tidak membutuhkan kontak, mikrofon, atau lokasi." },
      { text: "Batalkan penginstalan atau tolak semua izin yang tidak relevan.", isCorrect: true, explanation: "Tepat! Jangan memberikan izin pada fitur yang tidak relevan dengan fungsi utama aplikasi. Itu kemungkinan besar aplikasi mata-mata (spyware)." },
      { text: "Matikan internet sebelum menyetujui izin.", isCorrect: false, explanation: "Setelah terhubung ke internet nanti, data tetap akan dikirimkan." },
      { text: "Hanya izinkan akses lokasi saja.", isCorrect: false, explanation: "Senter tidak butuh lokasi. Memberikan izin apa pun yang tak perlu berisiko melanggar privasi." }
    ]
  },
  {
    id: 18,
    title: "Ekstensi Browser",
    description: "Anda ingin memasang ekstensi (plugin) untuk memblokir iklan di browser. Bagaimana cara amannya?",
    options: [
      { text: "Unduh dari tautan di kolom komentar YouTube.", isCorrect: false, explanation: "Kolom komentar sering berisi tautan berbahaya atau phising." },
      { text: "Instal sembarang ekstensi asalkan gratis.", isCorrect: false, explanation: "Ekstensi gratis dari sumber tidak jelas bisa jadi adalah pencuri data (keylogger)." },
      { text: "Unduh dari toko resmi ekstensi browser (seperti Chrome Web Store) dan baca ulasannya.", isCorrect: true, explanation: "Benar! Toko resmi memiliki proses verifikasi, dan membaca ulasan membantu mengidentifikasi plugin yang aman." },
      { text: "Matikan antivirus sementara agar proses instalasi lebih cepat.", isCorrect: false, explanation: "Jangan pernah mematikan perlindungan antivirus Anda saat mengunduh dari internet." }
    ]
  },
  {
    id: 19,
    title: "Penipuan Online",
    description: "Anda melihat iklan laptop gaming terbaru dengan harga hanya Rp 1 Juta di media sosial (harga asli belasan juta). Tindakan Anda:",
    options: [
      { text: "Segera transfer uang agar tidak kehabisan.", isCorrect: false, explanation: "Ini kemungkinan besar adalah penipuan. Harga yang tidak masuk akal adalah tanda bahaya utama." },
      { text: "Klik tautan dan masukkan data kartu kredit dengan cepat.", isCorrect: false, explanation: "Anda akan memberikan data perbankan Anda langsung ke penipu." },
      { text: "Curigai sebagai penipuan 'Too Good To Be True' dan abaikan iklan tersebut.", isCorrect: true, explanation: "Tepat! Jika sebuah tawaran terlihat terlalu bagus untuk menjadi kenyataan, biasanya itu memang penipuan." },
      { text: "Bagikan ke grup diskon agar orang lain juga bisa beli.", isCorrect: false, explanation: "Anda berpotensi menjebak orang lain dalam penipuan." }
    ]
  },
  {
    id: 20,
    title: "Jejak Digital (Digital Footprint)",
    description: "Manakah pernyataan yang paling tepat menggambarkan jejak digital?",
    options: [
      { text: "Kumpulan file yang Anda simpan di dalam flash disk.", isCorrect: false, explanation: "Itu adalah penyimpanan data lokal." },
      { text: "Rekaman seluruh aktivitas online Anda yang bersifat permanen dan sulit dihapus.", isCorrect: true, explanation: "Benar! Semua postingan, komentar, dan riwayat browsing membentuk jejak digital yang memengaruhi reputasi masa depan Anda." },
      { text: "Bekas sidik jari fisik pada layar sentuh smartphone Anda.", isCorrect: false, explanation: "Itu adalah jejak fisik, bukan jejak siber." },
      { text: "Program antivirus yang secara otomatis menghapus virus.", isCorrect: false, explanation: "Antivirus adalah pelindung keamanan, bukan aktivitas terekam Anda." }
    ]
  },
  {
    id: 21,
    title: "Penguntitan Siber (Cyber Stalking)",
    description: "Seseorang yang tidak dikenal terus melacak lokasi Anda secara online dan mengetahui ke mana pun Anda pergi. Apa tindakan pencegahannya?",
    options: [
      { text: "Matikan fitur berbagi lokasi otomatis di semua platform media sosial Anda.", isCorrect: true, explanation: "Sangat tepat! Selalu tinjau dan matikan fitur berbagi lokasi secara real-time untuk mencegah orang jahat melacak Anda." },
      { text: "Gunakan foto profil kartun sebagai pengganti foto asli.", isCorrect: false, explanation: "Mengganti foto profil tidak menghentikan pelacakan lokasi Anda." },
      { text: "Berhenti menggunakan ponsel cerdas sama sekali.", isCorrect: false, explanation: "Itu tindakan yang berlebihan. Mengatur privasi lokasi sudah cukup." },
      { text: "Aktifkan mode terbang (airplane mode) setiap saat.", isCorrect: false, explanation: "Anda tidak bisa menggunakan fungsi ponsel yang berguna jika dalam mode penerbangan." }
    ]
  },
  {
    id: 22,
    title: "Melaporkan Spam",
    description: "Kotak masuk email Anda penuh dengan pesan promosi obat penurun berat badan dari pengirim tidak jelas. Tindakan yang tepat:",
    options: [
      { text: "Balas email dan minta mereka berhenti mengirim.", isCorrect: false, explanation: "Membalas akan menunjukkan bahwa email Anda aktif dan justru menambah jumlah spam." },
      { text: "Tandai pesan tersebut sebagai 'Spam' menggunakan fitur di penyedia email Anda.", isCorrect: true, explanation: "Benar! Menandainya sebagai spam melatih filter email Anda untuk secara otomatis memblokir pesan serupa di masa depan." },
      { text: "Abaikan saja karena akan terhapus dengan sendirinya.", isCorrect: false, explanation: "Spam tidak akan berhenti jika Anda tidak mengambil tindakan pemblokiran." },
      { text: "Buat email baru dan tinggalkan email yang lama.", isCorrect: false, explanation: "Itu merepotkan dan tidak menyelesaikan masalah mendasar." }
    ]
  },
  {
    id: 23,
    title: "Keamanan Webcam",
    description: "Anda khawatir tentang peretas yang mungkin diam-diam mengaktifkan kamera laptop (webcam) Anda. Solusi paling sederhana adalah:",
    options: [
      { text: "Menutupi kamera webcam dengan stiker atau plester penutup fisik saat tidak digunakan.", isCorrect: true, explanation: "Tepat sekali! Solusi fisik adalah cara paling pasti untuk mencegah seseorang memata-matai Anda, bahkan jika komputer telah diretas." },
      { text: "Membongkar layar laptop dan melepas kameranya secara paksa.", isCorrect: false, explanation: "Itu akan merusak laptop Anda dan membatalkan garansi." },
      { text: "Hanya menggunakan laptop di ruangan yang gelap.", isCorrect: false, explanation: "Ini tidak nyaman dan peretas masih dapat merekam suara Anda." },
      { text: "Menghapus aplikasi kamera dari sistem operasi Windows.", isCorrect: false, explanation: "Malware sering kali membawa kode pemanggil kameranya sendiri secara diam-diam." }
    ]
  },
  {
    id: 24,
    title: "Belanja Online Aman",
    description: "Anda akan membeli sepatu di sebuah toko online baru. Tanda mana yang menjamin keamanan metode pembayarannya?",
    options: [
      { text: "Penjual meminta Anda mentransfer uang ke rekening atas nama perorangan yang berbeda-beda.", isCorrect: false, explanation: "Itu tanda peringatan penipuan!" },
      { text: "Situs web menggunakan *payment gateway* pihak ketiga (misal: Midtrans/PayPal) dan memiliki URL 'HTTPS'.", isCorrect: true, explanation: "Benar! Menggunakan gerbang pembayaran pihak ketiga jauh lebih aman dan meminimalkan risiko penipuan dibanding transfer manual perorangan." },
      { text: "Toko tidak memiliki ulasan pembeli atau rating sama sekali.", isCorrect: false, explanation: "Toko tanpa ulasan berisiko tinggi sebagai akun bodong." },
      { text: "Harga produk didiskon 90% dari harga pasar.", isCorrect: false, explanation: "Itu tanda peringatan 'Too Good To Be True'." }
    ]
  },
  {
    id: 25,
    title: "Menghindari Malware",
    description: "Rekan kerja mengirimi Anda dokumen berformat `.exe` melalui WhatsApp, dan berkata itu adalah jadwal rapat. Langkah Anda:",
    options: [
      { text: "Langsung buka karena Anda butuh jadwal rapat.", isCorrect: false, explanation: "File dokumen nyata (Word/PDF) sangat jarang berformat executable (.exe). Anda bisa terinfeksi virus." },
      { text: "Teruskan ke bos untuk diperiksa.", isCorrect: false, explanation: "Anda berisiko membahayakan perangkat bos Anda juga." },
      { text: "Hubungi rekan kerja tersebut secara langsung untuk memverifikasi apakah akunnya diretas.", isCorrect: true, explanation: "Tepat! File '.exe' sangat mencurigakan. Akun rekan Anda mungkin telah diambil alih oleh peretas yang menyebarkan malware." },
      { text: "Buka file tersebut menggunakan ponsel karena virus tidak bisa menyerang HP.", isCorrect: false, explanation: "HP juga bisa diserang oleh malware yang dikemas secara khusus." }
    ]
  },
  {
    id: 26,
    title: "Keamanan Bluetooth",
    description: "Anda berada di stasiun kereta api dan pengaturan Bluetooth smartphone Anda dalam posisi 'Visible to all' (Dapat dilihat semua orang). Risikonya adalah:",
    options: [
      { text: "Baterai ponsel Anda akan awet berhari-hari.", isCorrect: false, explanation: "Bluetooth yang terus menyala dan memindai justru menguras baterai." },
      { text: "Peretas dapat mengeksploitasi celah Bluetooth (Bluebugging) untuk mengakses kontak dan pesan Anda.", isCorrect: true, explanation: "Benar! Selalu matikan Bluetooth atau atur sebagai 'Tidak Terlihat' (Invisible) di tempat umum untuk mencegah peretasan." },
      { text: "Ponsel Anda akan otomatis terhubung ke Wi-Fi stasiun.", isCorrect: false, explanation: "Wi-Fi dan Bluetooth menggunakan sistem koneksi yang berbeda." },
      { text: "Layar ponsel akan menjadi lebih terang dengan sendirinya.", isCorrect: false, explanation: "Tidak ada hubungannya." }
    ]
  },
  {
    id: 27,
    title: "Perangkat Rumah Pintar (Smart Home)",
    description: "Anda baru saja membeli kamera CCTV pintar (Smart Camera). Langkah keamanan paling awal yang harus Anda ambil adalah:",
    options: [
      { text: "Langsung menyambungkannya ke internet agar bisa dipantau.", isCorrect: false, explanation: "Menyambungkannya tanpa mengamankan perangkat terlebih dahulu sangat berisiko." },
      { text: "Mengganti kata sandi bawaan pabrik (default password) dengan sandi yang kuat.", isCorrect: true, explanation: "Sangat penting! Peretas sering menyisir internet untuk mencari kamera IoT yang masih menggunakan kata sandi standar seperti 'admin123'." },
      { text: "Meletakkannya tepat di depan jendela rumah agar tetangga bisa melihat.", isCorrect: false, explanation: "Itu melanggar privasi Anda sendiri." },
      { text: "Membuang buku panduan instruksinya.", isCorrect: false, explanation: "Anda mungkin membutuhkannya untuk mereset perangkat di kemudian hari." }
    ]
  },
  {
    id: 28,
    title: "Pelacakan Lokasi Aplikasi",
    description: "Aplikasi kalkulator yang baru Anda unduh meminta akses lokasi presisi Anda (GPS). Apa alasannya?",
    options: [
      { text: "Untuk menghitung angka lebih cepat.", isCorrect: false, explanation: "Kalkulator tidak membutuhkan GPS untuk berhitung." },
      { text: "Agar kalkulator tahu zona waktu Anda.", isCorrect: false, explanation: "Zona waktu diambil dari sistem operasi, bukan butuh izin lokasi GPS khusus." },
      { text: "Kemungkinan besar aplikasi ini bertujuan mengumpulkan dan menjual data lokasi Anda ke pengiklan.", isCorrect: true, explanation: "Tepat! Selalu waspada terhadap aplikasi sederhana yang meminta izin berlebihan yang tidak sesuai dengan fungsinya." },
      { text: "Untuk mengubah bahasa aplikasi sesuai negara.", isCorrect: false, explanation: "Bahasa ditentukan oleh pengaturan utama telepon, bukan pelacakan GPS." }
    ]
  },
  {
    id: 29,
    title: "Penggunaan Ulang Kata Sandi",
    description: "Apa bahaya dari menggunakan kata sandi yang sama persis (misal: KopiManis123!) untuk Email, Instagram, dan Mobile Banking Anda?",
    options: [
      { text: "Anda akan mudah mengingatnya tanpa perlu mencatat.", isCorrect: false, explanation: "Itu memang memudahkan, tetapi risiko keamanannya terlalu tinggi." },
      { text: "Jika salah satu akun diretas, peretas dapat dengan mudah mengambil alih akun lainnya.", isCorrect: true, explanation: "Sangat tepat! Ini disebut efek domino. Peretas selalu mencoba kata sandi curian di berbagai platform lainnya." },
      { text: "Kecepatan login Anda akan semakin cepat.", isCorrect: false, explanation: "Penggunaan sandi sama tidak memengaruhi performa server." },
      { text: "Perusahaan bank akan memberi Anda bonus keamanan.", isCorrect: false, explanation: "Justru sebaliknya, bank menyarankan Anda memakai sandi eksklusif untuk layanan perbankan." }
    ]
  },
  {
    id: 30,
    title: "Komputer Publik",
    description: "Setelah menggunakan komputer umum di warnet atau perpustakaan, hal yang MUTLAK harus Anda lakukan sebelum pergi adalah:",
    options: [
      { text: "Menghapus riwayat browsing dan melakukan 'Log Out' (Keluar) dari semua akun.", isCorrect: true, explanation: "Benar sekali! Meninggalkan akun dalam keadaan login di komputer publik sama dengan memberikan akses penuh ke orang berikutnya." },
      { text: "Mematikan monitornya saja.", isCorrect: false, explanation: "Mematikan layar tidak mengakhiri sesi login Anda." },
      { text: "Meninggalkan secarik kertas berisi username Anda untuk pengguna selanjutnya.", isCorrect: false, explanation: "Itu sama sekali tidak masuk akal dalam keamanan siber." },
      { text: "Mengganti wallpaper layar untuk meninggalkan jejak.", isCorrect: false, explanation: "Itu tidak mengamankan data pribadi Anda sama sekali." }
    ]
  }
];
