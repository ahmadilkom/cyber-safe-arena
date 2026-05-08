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
      { text: "Klik tautan dan ubah kata sandi agar akun Anda tetap aman dari ancaman.", isCorrect: false, explanation: "Ini adalah taktik Phishing! Bank asli tidak pernah meminta kata sandi melalui email." },
      { text: "Abaikan email tersebut dan hubungi bank melalui nomor resmi.", isCorrect: true, explanation: "Tepat sekali! Selalu verifikasi melalui saluran komunikasi resmi jika ada permintaan mencurigakan." },
      { text: "Balas email tersebut dan tanyakan detail aktivitas mencurigakan yang dimaksud.", isCorrect: false, explanation: "Membalas email phishing hanya akan mengonfirmasi bahwa email Anda aktif." },
      { text: "Teruskan email ke teman untuk mendapatkan saran keamanan dari sudut pandang mereka.", isCorrect: false, explanation: "Ini berbahaya karena teman Anda bisa secara tidak sengaja mengklik tautannya." }
    ]
  },
  {
    id: 2,
    title: "Wi-Fi Publik",
    description: "Anda sedang di kafe dan ingin login ke aplikasi mobile banking menggunakan Wi-Fi 'Kafe_Free_WiFi'. Langkah paling aman adalah:",
    options: [
      { text: "Segera login karena jaringan Wi-Fi di kafe terkenal biasanya sudah terenkripsi.", isCorrect: false, explanation: "Wi-Fi publik rentan terhadap peretasan (Man-in-the-Middle attack)." },
      { text: "Gunakan jaringan seluler (paket data) atau VPN sebelum login.", isCorrect: true, explanation: "Benar! Jaringan seluler pribadi atau VPN mengenkripsi data Anda dan melindunginya dari jaringan publik yang tidak aman." },
      { text: "Login dengan cepat lalu segera logout untuk meminimalisir waktu pemantauan.", isCorrect: false, explanation: "Peretas dapat mencuri data Anda bahkan dalam waktu sepersekian detik saat proses login." },
      { text: "Hanya login jika Anda duduk di dekat router Wi-Fi agar sinyal lebih stabil dan kuat.", isCorrect: false, explanation: "Jarak dengan router tidak menjamin keamanan jaringan publik." }
    ]
  },
  {
    id: 3,
    title: "Kata Sandi Kuat",
    description: "Anda sedang membuat akun baru. Manakah dari kata sandi berikut yang paling kuat dan aman?",
    options: [
      { text: "Budi12345 (Mudah diingat)", isCorrect: false, explanation: "Kata sandi ini terlalu mudah ditebak dan mengandung informasi pribadi." },
      { text: "password123! (Kuat karena simbol)", isCorrect: false, explanation: "Kata sandi yang umum digunakan sangat rentan terhadap serangan brute force." },
      { text: "Kucing&Buku^Biru99!", isCorrect: true, explanation: "Sangat baik! Kata sandi ini panjang, menggabungkan huruf, angka, simbol, dan tidak menggunakan informasi pribadi." },
      { text: "20_Mei_1995_Lahir", isCorrect: false, explanation: "Jangan pernah menggunakan informasi pribadi seperti tanggal lahir sebagai kata sandi." }
    ]
  },
  {
    id: 4,
    title: "Pembaruan Perangkat Lunak",
    description: "Smartphone Anda menampilkan notifikasi pembaruan sistem operasi (OS). Apa yang sebaiknya Anda lakukan?",
    options: [
      { text: "Abaikan saja karena pembaruan sistem akan menghabiskan banyak ruang memori.", isCorrect: false, explanation: "Mengabaikan pembaruan membuat perangkat Anda rentan terhadap ancaman keamanan terbaru." },
      { text: "Tunggu beberapa bulan sampai ada versi stabil yang lebih baru lagi di masa depan.", isCorrect: false, explanation: "Menunda pembaruan memberikan celah waktu bagi peretas untuk mengeksploitasi sistem." },
      { text: "Segera unduh dan instal pembaruan saat terhubung ke Wi-Fi yang aman.", isCorrect: true, explanation: "Benar! Pembaruan perangkat lunak sering kali berisi perbaikan keamanan penting yang melindungi dari virus dan peretas." },
      { text: "Hanya perbarui sistem jika aplikasi mulai berjalan sangat lambat atau sering error.", isCorrect: false, explanation: "Pembaruan tidak hanya tentang performa, tapi lebih penting untuk menambal celah keamanan." }
    ]
  },
  {
    id: 5,
    title: "Autentikasi Dua Faktor (2FA)",
    description: "Apa fungsi utama dari mengaktifkan Autentikasi Dua Faktor (2FA) di akun media sosial Anda?",
    options: [
      { text: "Agar profil akun Anda terlihat lebih profesional dan terpercaya di mata pengikut.", isCorrect: false, explanation: "2FA bukan tentang penampilan, tapi tentang keamanan." },
      { text: "Memberikan lapisan keamanan tambahan selain kata sandi.", isCorrect: true, explanation: "Benar! 2FA memastikan bahwa orang yang masuk adalah Anda, dengan meminta kode tambahan yang dikirim ke perangkat Anda." },
      { text: "Mempercepat proses login otomatis sehingga Anda tidak perlu mengetik kata sandi.", isCorrect: false, explanation: "Sebaliknya, 2FA sedikit memperlambat login tetapi jauh meningkatkan keamanan." },
      { text: "Mencegah munculnya iklan mengganggu yang sering muncul di beranda akun Anda.", isCorrect: false, explanation: "2FA tidak memiliki kaitan dengan sistem periklanan." }
    ]
  },
  {
    id: 6,
    title: "Privasi Media Sosial",
    description: "Anda ingin memposting foto tiket pesawat untuk memamerkan liburan Anda yang akan datang. Risiko utama dari tindakan ini adalah:",
    options: [
      { text: "Orang lain mungkin akan merasa iri dengan kemewahan liburan yang Anda pamerkan.", isCorrect: false, explanation: "Itu masalah emosional, tapi ada risiko keamanan yang jauh lebih besar." },
      { text: "Pihak maskapai dapat membatalkan tiket Anda jika foto tersebut dianggap ilegal.", isCorrect: false, explanation: "Maskapai tidak akan membatalkan tiket hanya karena Anda mempostingnya." },
      { text: "Tiket berisi barcode dan data pribadi yang bisa disalahgunakan.", isCorrect: true, explanation: "Tepat! Barcode tiket pesawat mengandung banyak data pribadi seperti nama, kode booking, and bahkan detail paspor yang bisa dicuri." },
      { text: "Postingan foto tiket tersebut kemungkinan tidak akan mendapatkan banyak 'likes'.", isCorrect: false, explanation: "Ini bukan risiko keamanan." }
    ]
  },
  {
    id: 7,
    title: "Pesan Teks Misterius (Smishing)",
    description: "Anda menerima SMS: 'Selamat! Anda memenangkan undian Rp 10 Juta. Klik link ini untuk klaim: http://klaim-hadiah.xyz'. Anda harus:",
    options: [
      { text: "Klik tautan untuk melihat syarat dan ketentuan cara klaim hadiah uang tersebut.", isCorrect: false, explanation: "Mengklik tautan dari nomor tidak dikenal sangat berisiko mengunduh malware." },
      { text: "Hapus pesan dan blokir nomor pengirim.", isCorrect: true, explanation: "Benar! Ini adalah bentuk penipuan Smishing (SMS Phishing). Abaikan dan blokir nomor tersebut." },
      { text: "Balas pesan dengan sopan untuk memastikan kebenaran dari informasi undian ini.", isCorrect: false, explanation: "Membalas pesan akan menandakan nomor Anda aktif dan menjadi target spam lanjutan." },
      { text: "Teruskan SMS ke seluruh keluarga agar mereka juga berkesempatan memenangkan hadiah.", isCorrect: false, explanation: "Ini akan menyebarkan potensi penipuan ke orang terdekat Anda." }
    ]
  },
  {
    id: 8,
    title: "Software Gratis",
    description: "Anda membutuhkan aplikasi edit video berbayar dan menemukan situs web yang menawarkan unduhan gratis secara ilegal. Risiko terbesarnya adalah:",
    options: [
      { text: "Video yang dihasilkan oleh aplikasi bajakan tersebut akan memiliki resolusi rendah.", isCorrect: false, explanation: "Risiko keamanan lebih besar daripada sekadar kualitas video." },
      { text: "Aplikasi mungkin mengandung malware atau virus Trojan.", isCorrect: true, explanation: "Benar! Software bajakan (crack) sering kali disisipi virus yang dapat merusak komputer atau mencuri data Anda." },
      { text: "Proses pengunduhan aplikasi ilegal tersebut akan memakan waktu yang sangat lambat.", isCorrect: false, explanation: "Itu hanya ketidaknyamanan, bukan risiko utama." },
      { text: "Aplikasi tersebut akan menghabiskan memori RAM secara berlebihan saat dijalankan.", isCorrect: false, explanation: "Itu mungkin terjadi, tapi risiko infeksi malware jauh lebih kritis." }
    ]
  },
  {
    id: 9,
    title: "Cyberbullying (Perundungan Siber)",
    description: "Seorang teman sekelas terus-menerus mengirimkan komentar kasar dan ancaman di akun Instagram Anda. Apa yang sebaiknya dilakukan?",
    options: [
      { text: "Balas dengan komentar yang jauh lebih kasar juga agar dia merasa takut dan berhenti.", isCorrect: false, explanation: "Membalas hanya akan memperburuk situasi dan membuat Anda ikut bersalah." },
      { text: "Screenshot buktinya, blokir akunnya, dan laporkan ke orang dewasa.", isCorrect: true, explanation: "Sangat tepat! Menyimpan bukti dan melaporkan adalah cara paling aman menangani cyberbullying." },
      { text: "Hapus akun Instagram Anda secara permanen untuk menghindari interaksi dengannya.", isCorrect: false, explanation: "Anda tidak perlu mengorbankan akun Anda. Cukup blokir pelaku." },
      { text: "Abaikan saja semua pesan tersebut dan biarkan dia terus melakukannya sampai dia bosan.", isCorrect: false, explanation: "Mengabaikan terkadang tidak menghentikan perundungan. Tindakan tegas lebih baik." }
    ]
  },
  {
    id: 10,
    title: "Mengenali Hoaks (Berita Palsu)",
    description: "Anda membaca berita sensasional di WhatsApp bahwa 'Minum air garam dapat menyembuhkan virus X seketika'. Langkah terbaik adalah:",
    options: [
      { text: "Langsung bagikan ke seluruh grup keluarga agar semua orang tahu informasi penting ini.", isCorrect: false, explanation: "Anda berpotensi menyebarkan misinformasi yang berbahaya." },
      { text: "Segera coba tips kesehatan tersebut di rumah untuk membuktikan kebenaran beritanya.", isCorrect: false, explanation: "Mempraktikkan informasi kesehatan yang belum terverifikasi sangat berbahaya." },
      { text: "Cari tahu kebenarannya melalui sumber berita resmi atau medis terpercaya.", isCorrect: true, explanation: "Benar! Selalu verifikasi informasi sensasional melalui sumber-sumber resmi sebelum mempercayainya." },
      { text: "Percaya saja pada berita tersebut jika yang mengirimkannya adalah teman sangat dekat.", isCorrect: false, explanation: "Teman dekat juga bisa menjadi korban penyebaran berita palsu tanpa disadari." }
    ]
  },
  {
    id: 11,
    title: "Situs Web Aman (HTTPS)",
    description: "Saat Anda ingin melakukan pembelian online, Anda melihat alamat situs web dimulai dengan 'http://' tanpa ikon gembok. Artinya:",
    options: [
      { text: "Situs tersebut sangat aman dan dilindungi enkripsi data kelas militer tingkat tinggi.", isCorrect: false, explanation: "HTTPS-lah yang menggunakan enkripsi, sedangkan HTTP tidak." },
      { text: "Situs sedang dalam proses pembaruan sistem keamanan oleh pemilik resminya.", isCorrect: false, explanation: "Tidak ada hubungannya dengan status perbaikan situs." },
      { text: "Data yang Anda kirim (termasuk kartu kredit) tidak dienkripsi dan rawan dicuri.", isCorrect: true, explanation: "Benar! 'http' tanpa 's' berarti koneksi tidak aman. Jangan pernah memasukkan data sensitif di situs semacam itu." },
      { text: "Situs tersebut dipastikan milik lembaga pemerintah resmi yang sudah terverifikasi.", isCorrect: false, explanation: "Situs pemerintah justru selalu menggunakan HTTPS demi keamanan." }
    ]
  },
  {
    id: 12,
    title: "Mengunci Perangkat",
    description: "Anda meninggalkan laptop di meja perpustakaan untuk pergi ke toilet. Apa yang harus Anda lakukan?",
    options: [
      { text: "Minta tolong kepada teman baru di sebelah yang tidak dikenal untuk menjaganya sebentar.", isCorrect: false, explanation: "Mempercayai orang asing dengan perangkat Anda sangat berisiko." },
      { text: "Biarkan laptop tetap menyala agar saat kembali nanti Anda bisa langsung bekerja lagi.", isCorrect: false, explanation: "Orang lain dapat dengan mudah mengakses data atau akun Anda yang sedang terbuka." },
      { text: "Kunci layar perangkat (Lock Screen) sebelum meninggalkannya.", isCorrect: true, explanation: "Tepat! Mengunci layar mencegah akses fisik dari orang tak berwenang." },
      { text: "Tutup layarnya setengah saja tanpa perlu mematikan daya laptop tersebut sepenuhnya.", isCorrect: false, explanation: "Itu tidak mengunci layar dan tetap rentan diakses." }
    ]
  },
  {
    id: 13,
    title: "Pencadangan Data (Backup)",
    description: "Mengapa penting melakukan pencadangan data (backup) komputer Anda secara berkala?",
    options: [
      { text: "Agar sistem operasi komputer Anda dapat berjalan lebih cepat dan responsif dari sebelumnya.", isCorrect: false, explanation: "Backup tidak memengaruhi kecepatan komputer Anda." },
      { text: "Untuk mencegah kehilangan data jika terjadi kerusakan hard disk atau serangan Ransomware.", isCorrect: true, explanation: "Sangat benar! Backup memastikan Anda tetap memiliki salinan file penting Anda dalam kondisi darurat." },
      { text: "Supaya Anda bisa mendapatkan lebih banyak ruang kosong di memori internal komputer.", isCorrect: false, explanation: "Backup justru menyalin data, bukan menghapus atau mengosongkan memori utama." },
      { text: "Untuk memenuhi syarat klaim garansi resmi dari pabrik pembuat komputer Anda tersebut.", isCorrect: false, explanation: "Garansi tidak berkaitan dengan backup data pribadi." }
    ]
  },
  {
    id: 14,
    title: "Oversharing Informasi",
    description: "Saat mendaftar aplikasi kuis kepribadian di Facebook, aplikasi meminta akses ke daftar teman, foto, dan lokasi Anda. Apa tindakan Anda?",
    options: [
      { text: "Setuju saja pada semua syaratnya, karena kuis kepribadian tersebut terlihat sangat menyenangkan.", isCorrect: false, explanation: "Kesenangan sementara tidak sepadan dengan mengorbankan privasi data Anda." },
      { text: "Tolak akses tersebut atau batalkan penggunaan aplikasi kuis.", isCorrect: true, explanation: "Tepat! Aplikasi pihak ketiga sering mengumpulkan data secara berlebihan (data harvesting) yang bisa dijual ke pihak lain." },
      { text: "Berikan akses pada aplikasinya namun gunakan nama samaran palsu di profil Facebook Anda.", isCorrect: false, explanation: "Data lokasi dan foto tetap berisiko terekspos." },
      { text: "Hanya setujui akses terbatas pada daftar teman saja tanpa memberikan akses ke foto pribadi.", isCorrect: false, explanation: "Memberikan akses teman berarti Anda juga mengkompromikan privasi orang lain." }
    ]
  },
  {
    id: 15,
    title: "Pencurian Identitas",
    description: "Tanda mana di bawah ini yang mengindikasikan identitas digital Anda mungkin telah dicuri?",
    options: [
      { text: "Semua aplikasi yang sedang terbuka berjalan jauh lebih lambat dari performa biasanya.", isCorrect: false, explanation: "Itu lebih merupakan masalah performa atau ruang memori." },
      { text: "Anda menerima pemberitahuan login dari perangkat/lokasi tak dikenal.", isCorrect: true, explanation: "Benar! Jika ada yang mencoba login dari negara lain sementara Anda di rumah, itu tanda kuat akun Anda diretas." },
      { text: "Daya baterai ponsel cerdas Anda menjadi jauh lebih cepat habis saat digunakan.", isCorrect: false, explanation: "Itu bisa disebabkan oleh penuaan baterai atau terlalu banyak aplikasi aktif." },
      { text: "Situs web yang Anda kunjungi meminta Anda untuk menyetujui kebijakan penggunaan cookie.", isCorrect: false, explanation: "Persetujuan cookie adalah standar prosedur situs web normal." }
    ]
  },
  {
    id: 16,
    title: "USB Tak Dikenal",
    description: "Anda menemukan sebuah flash disk (USB drive) tergeletak di tempat parkir kampus. Apa yang harus Anda lakukan?",
    options: [
      { text: "Colokkan segera ke laptop Anda untuk mencari tahu siapa pemilik asli flash disk tersebut.", isCorrect: false, explanation: "Flash disk tersebut mungkin sengaja diletakkan dan berisi malware berbahaya." },
      { text: "Serahkan ke bagian keamanan atau lost and found tanpa mencolokkannya.", isCorrect: true, explanation: "Benar! Jangan pernah menghubungkan perangkat tak dikenal ke komputer pribadi Anda." },
      { text: "Format ulang flash disk tersebut agar bersih dan bisa digunakan kembali untuk keperluan sendiri.", isCorrect: false, explanation: "Bahkan proses format bisa memicu virus yang tersembunyi untuk aktif." },
      { text: "Jual flash disk temuan tersebut secara online di marketplace untuk mendapatkan keuntungan.", isCorrect: false, explanation: "Ini tidak etis dan bisa menyebarkan malware ke orang lain." }
    ]
  },
  {
    id: 17,
    title: "Izin Aplikasi (App Permissions)",
    description: "Anda mengunduh aplikasi 'Senter HP'. Aplikasi ini meminta izin akses ke Kontak, Mikrofon, dan Lokasi. Langkah Anda adalah:",
    options: [
      { text: "Setuju saja pada semua permintaan izinnya agar fungsi senternya dapat bekerja secara maksimal.", isCorrect: false, explanation: "Aplikasi senter sama sekali tidak membutuhkan kontak, mikrofon, atau lokasi." },
      { text: "Batalkan penginstalan atau tolak semua izin yang tidak relevan.", isCorrect: true, explanation: "Tepat! Jangan memberikan izin pada fitur yang tidak relevan dengan fungsi utama aplikasi. Itu kemungkinan besar aplikasi mata-mata (spyware)." },
      { text: "Matikan koneksi internet ponsel Anda sebelum menyetujui semua permintaan izin aplikasi.", isCorrect: false, explanation: "Setelah terhubung ke internet nanti, data tetap akan dikirimkan." },
      { text: "Hanya izinkan akses lokasi GPS saja agar aplikasi tahu posisi senter saat digunakan.", isCorrect: false, explanation: "Senter tidak butuh lokasi. Memberikan izin apa pun yang tak perlu berisiko melanggar privasi." }
    ]
  },
  {
    id: 18,
    title: "Ekstensi Browser",
    description: "Anda ingin memasang ekstensi (plugin) untuk memblokir iklan di browser. Bagaimana cara amannya?",
    options: [
      { text: "Unduh melalui tautan yang dibagikan oleh orang asing di kolom komentar video YouTube.", isCorrect: false, explanation: "Kolom komentar sering berisi tautan berbahaya atau phising." },
      { text: "Instal sembarang ekstensi yang tersedia di internet asalkan aplikasi tersebut gratis digunakan.", isCorrect: false, explanation: "Ekstensi gratis dari sumber tidak jelas bisa jadi adalah pencuri data (keylogger)." },
      { text: "Unduh dari toko resmi ekstensi browser (seperti Chrome Web Store) dan baca ulasannya.", isCorrect: true, explanation: "Benar! Toko resmi memiliki proses verifikasi, dan membaca ulasan membantu mengidentifikasi plugin yang aman." },
      { text: "Matikan perlindungan antivirus komputer Anda sementara waktu agar proses instalasi berjalan cepat.", isCorrect: false, explanation: "Jangan pernah mematikan perlindungan antivirus Anda saat mengunduh dari internet." }
    ]
  },
  {
    id: 19,
    title: "Penipuan Online",
    description: "Anda melihat iklan laptop gaming terbaru dengan harga hanya Rp 1 Juta di media sosial (harga asli belasan juta). Tindakan Anda:",
    options: [
      { text: "Segera transfer uang ke rekening penjual tersebut agar barang tidak keburu dibeli orang lain.", isCorrect: false, explanation: "Ini kemungkinan besar adalah penipuan. Harga yang tidak masuk akal adalah tanda bahaya utama." },
      { text: "Klik tautan di iklan tersebut dan masukkan semua data kartu kredit Anda dengan sangat cepat.", isCorrect: false, explanation: "Anda akan memberikan data perbankan Anda langsung ke penipu." },
      { text: "Curigai sebagai penipuan 'Too Good To Be True' dan abaikan iklan tersebut.", isCorrect: true, explanation: "Tepat! Jika sebuah tawaran terlihat terlalu bagus untuk menjadi kenyataan, biasanya itu memang penipuan." },
      { text: "Bagikan iklan tersebut ke semua grup diskon belanja agar teman-teman Anda juga bisa membelinya.", isCorrect: false, explanation: "Anda berpotensi menjebak orang lain dalam penipuan." }
    ]
  },
  {
    id: 20,
    title: "Jejak Digital (Digital Footprint)",
    description: "Manakah pernyataan yang paling tepat menggambarkan jejak digital?",
    options: [
      { text: "Kumpulan file-file data penting yang secara sengaja Anda simpan di dalam perangkat flash disk.", isCorrect: false, explanation: "Itu adalah penyimpanan data lokal." },
      { text: "Rekaman seluruh aktivitas online Anda yang bersifat permanen dan sulit dihapus.", isCorrect: true, explanation: "Benar! Semua postingan, komentar, dan riwayat browsing membentuk jejak digital yang memengaruhi reputasi masa depan Anda." },
      { text: "Bekas sidik jari fisik berminyak yang tertempel pada layar sentuh perangkat smartphone Anda.", isCorrect: false, explanation: "Itu adalah jejak fisik, bukan jejak siber." },
      { text: "Sebuah program perangkat lunak antivirus yang berfungsi secara otomatis menghapus virus komputer.", isCorrect: false, explanation: "Antivirus adalah pelindung keamanan, bukan aktivitas terekam Anda." }
    ]
  },
  {
    id: 21,
    title: "Penguntitan Siber (Cyber Stalking)",
    description: "Seseorang yang tidak dikenal terus melacak lokasi Anda secara online dan mengetahui ke mana pun Anda pergi. Apa tindakan pencegahannya?",
    options: [
      { text: "Matikan fitur berbagi lokasi otomatis di semua platform media sosial Anda.", isCorrect: true, explanation: "Sangat tepat! Selalu tinjau dan matikan fitur berbagi lokasi secara real-time untuk mencegah orang jahat melacak Anda." },
      { text: "Gunakan foto profil karakter kartun lucu sebagai pengganti foto wajah asli Anda di media sosial.", isCorrect: false, explanation: "Mengganti foto profil tidak menghentikan pelacakan lokasi Anda." },
      { text: "Berhenti menggunakan ponsel cerdas sama sekali untuk sisa hidup Anda demi keamanan pribadi.", isCorrect: false, explanation: "Itu tindakan yang berlebihan. Mengatur privasi lokasi sudah cukup." },
      { text: "Aktifkan mode terbang (airplane mode) pada ponsel Anda setiap saat meskipun sedang tidak terbang.", isCorrect: false, explanation: "Anda tidak bisa menggunakan fungsi ponsel yang berguna jika dalam mode penerbangan." }
    ]
  },
  {
    id: 22,
    title: "Melaporkan Spam",
    description: "Kotak masuk email Anda penuh dengan pesan promosi obat penurun berat badan dari pengirim tidak jelas. Tindakan yang tepat:",
    options: [
      { text: "Balas semua email promosi tersebut dan minta mereka secara tegas untuk berhenti mengirim pesan.", isCorrect: false, explanation: "Membalas akan menunjukkan bahwa email Anda aktif dan justru menambah jumlah spam." },
      { text: "Tandai pesan tersebut sebagai 'Spam' menggunakan fitur di penyedia email Anda.", isCorrect: true, explanation: "Benar! Menandainya sebagai spam melatih filter email Anda untuk secara otomatis memblokir pesan serupa di masa depan." },
      { text: "Abaikan saja pesan-pesan tersebut karena nantinya folder masuk akan terhapus dengan sendirinya.", isCorrect: false, explanation: "Spam tidak akan berhenti jika Anda tidak mengambil tindakan pemblokiran." },
      { text: "Segera buat alamat email baru yang rahasia dan tinggalkan semua akun email yang lama tersebut.", isCorrect: false, explanation: "Itu merepotkan dan tidak menyelesaikan masalah mendasar." }
    ]
  },
  {
    id: 23,
    title: "Keamanan Webcam",
    description: "Anda khawatir tentang peretas yang mungkin diam-diam mengaktifkan kamera laptop (webcam) Anda. Solusi paling sederhana adalah:",
    options: [
      { text: "Menutupi kamera webcam dengan stiker atau plester penutup fisik saat tidak digunakan.", isCorrect: true, explanation: "Tepat sekali! Solusi fisik adalah cara paling pasti untuk mencegah seseorang memata-matai Anda, bahkan jika komputer telah diretas." },
      { text: "Membongkar paksa bingkai layar laptop dan melepas komponen kameranya tanpa bantuan teknisi.", isCorrect: false, explanation: "Itu akan merusak laptop Anda dan membatalkan garansi." },
      { text: "Hanya menggunakan laptop Anda di dalam ruangan yang sangat gelap agar peretas tidak bisa melihat.", isCorrect: false, explanation: "Ini tidak nyaman dan peretas masih dapat merekam suara Anda." },
      { text: "Menghapus aplikasi kamera bawaan yang terpasang secara standar dari sistem operasi Windows Anda.", isCorrect: false, explanation: "Malware sering kali membawa kode pemanggil kameranya sendiri secara diam-diam." }
    ]
  },
  {
    id: 24,
    title: "Belanja Online Aman",
    description: "Anda akan membeli sepatu di sebuah toko online baru. Tanda mana yang menjamin keamanan metode pembayarannya?",
    options: [
      { text: "Penjual tersebut meminta Anda untuk segera mentransfer uang ke rekening atas nama perorangan.", isCorrect: false, explanation: "Itu tanda peringatan penipuan!" },
      { text: "Situs web menggunakan *payment gateway* pihak ketiga (misal: Midtrans/PayPal) dan memiliki URL 'HTTPS'.", isCorrect: true, explanation: "Benar! Menggunakan gerbang pembayaran pihak ketiga jauh lebih aman dan meminimalkan risiko penipuan dibanding transfer manual perorangan." },
      { text: "Toko online tersebut sama sekali tidak memiliki ulasan dari pembeli lain atau rating bintang satu pun.", isCorrect: false, explanation: "Toko tanpa ulasan berisiko tinggi sebagai akun bodong." },
      { text: "Harga produk sepatu tersebut sedang didiskon besar-besaran sebanyak 90% dari harga pasar normal.", isCorrect: false, explanation: "Itu tanda peringatan 'Too Good To Be True'." }
    ]
  },
  {
    id: 25,
    title: "Menghindari Malware",
    description: "Rekan kerja mengirimi Anda dokumen berformat `.exe` melalui WhatsApp, dan berkata itu adalah jadwal rapat. Langkah Anda:",
    options: [
      { text: "Langsung buka file tersebut sekarang karena Anda sangat membutuhkan informasi jadwal rapat itu.", isCorrect: false, explanation: "File dokumen nyata (Word/PDF) sangat jarang berformat executable (.exe). Anda bisa terinfeksi virus." },
      { text: "Teruskan file tersebut ke atasan Anda agar dia yang memeriksanya terlebih dahulu di laptopnya.", isCorrect: false, explanation: "Anda berisiko membahayakan perangkat bos Anda juga." },
      { text: "Hubungi rekan kerja tersebut secara langsung untuk memverifikasi apakah akunnya diretas.", isCorrect: true, explanation: "Tepat! File '.exe' sangat mencurigakan. Akun rekan Anda mungkin telah diambil alih oleh peretas yang menyebarkan malware." },
      { text: "Buka file tersebut menggunakan smartphone karena Anda percaya virus komputer tidak bisa menyerang HP.", isCorrect: false, explanation: "HP juga bisa diserang oleh malware yang dikemas secara khusus." }
    ]
  },
  {
    id: 26,
    title: "Keamanan Bluetooth",
    description: "Anda berada di stasiun kereta api dan pengaturan Bluetooth smartphone Anda dalam posisi 'Visible to all' (Dapat dilihat semua orang). Risikonya adalah:",
    options: [
      { text: "Baterai ponsel cerdas Anda akan menjadi jauh lebih awet dan tahan lama berhari-hari kemudian.", isCorrect: false, explanation: "Bluetooth yang terus menyala dan memindai justru menguras baterai." },
      { text: "Peretas dapat mengeksploitasi celah Bluetooth (Bluebugging) untuk mengakses kontak dan pesan Anda.", isCorrect: true, explanation: "Benar! Selalu matikan Bluetooth atau atur sebagai 'Tidak Terlihat' (Invisible) di tempat umum untuk mencegah peretasan." },
      { text: "Ponsel Anda akan secara otomatis terhubung ke jaringan Wi-Fi gratis yang ada di seluruh stasiun.", isCorrect: false, explanation: "Wi-Fi dan Bluetooth menggunakan sistem koneksi yang berbeda." },
      { text: "Layar ponsel akan menjadi semakin terang dengan sendirinya saat terdeteksi perangkat lain.", isCorrect: false, explanation: "Tidak ada hubungannya." }
    ]
  },
  {
    id: 27,
    title: "Perangkat Rumah Pintar (Smart Home)",
    description: "Anda baru saja membeli kamera CCTV pintar (Smart Camera). Langkah keamanan paling awal yang harus Anda ambil adalah:",
    options: [
      { text: "Langsung menyambungkannya ke jaringan internet global agar bisa dipantau dari kantor Anda.", isCorrect: false, explanation: "Menyambungkannya tanpa mengamankan perangkat terlebih dahulu sangat berisiko." },
      { text: "Mengganti kata sandi bawaan pabrik (default password) dengan sandi yang kuat.", isCorrect: true, explanation: "Sangat penting! Peretas sering menyisir internet untuk mencari kamera IoT yang masih menggunakan kata sandi standar seperti 'admin123'." },
      { text: "Meletakkannya tepat di depan jendela depan rumah agar semua tetangga Anda bisa melihatnya.", isCorrect: false, explanation: "Itu melanggar privasi Anda sendiri." },
      { text: "Segera membuang buku panduan instruksinya ke tempat sampah karena Anda sudah sangat ahli.", isCorrect: false, explanation: "Anda mungkin membutuhkannya untuk mereset perangkat di kemudian hari." }
    ]
  },
  {
    id: 28,
    title: "Pelacakan Lokasi Aplikasi",
    description: "Aplikasi kalkulator yang baru Anda unduh meminta akses lokasi presisi Anda (GPS). Apa alasannya?",
    options: [
      { text: "Aplikasi tersebut membutuhkan data lokasi Anda untuk melakukan penghitungan angka jauh lebih cepat.", isCorrect: false, explanation: "Kalkulator tidak membutuhkan GPS untuk berhitung." },
      { text: "Agar kalkulator tersebut dapat mengetahui zona waktu tempat Anda berada saat sedang berhitung.", isCorrect: false, explanation: "Zona waktu diambil dari sistem operasi, bukan butuh izin lokasi GPS khusus." },
      { text: "Kemungkinan besar aplikasi ini bertujuan mengumpulkan dan menjual data lokasi Anda ke pengiklan.", isCorrect: true, explanation: "Tepat! Selalu waspada terhadap aplikasi sederhana yang meminta izin berlebihan yang tidak sesuai dengan fungsinya." },
      { text: "Untuk secara otomatis mengubah bahasa pengaturan aplikasi sesuai dengan negara tempat Anda berdiri.", isCorrect: false, explanation: "Bahasa ditentukan oleh pengaturan utama telepon, bukan pelacakan GPS." }
    ]
  },
  {
    id: 29,
    title: "Penggunaan Ulang Kata Sandi",
    description: "Apa bahaya dari menggunakan kata sandi yang sama persis (misal: KopiManis123!) untuk Email, Instagram, dan Mobile Banking Anda?",
    options: [
      { text: "Anda akan menjadi jauh lebih mudah mengingatnya setiap saat tanpa perlu mencatatnya di kertas.", isCorrect: false, explanation: "Itu memang memudahkan, tetapi risiko keamanannya terlalu tinggi." },
      { text: "Jika salah satu akun diretas, peretas dapat dengan mudah mengambil alih akun lainnya.", isCorrect: true, explanation: "Sangat tepat! Ini disebut efek domino. Peretas selalu mencoba kata sandi curian di berbagai platform lainnya." },
      { text: "Kecepatan proses login Anda di semua akun tersebut akan menjadi semakin cepat setiap harinya.", isCorrect: false, explanation: "Penggunaan sandi sama tidak memengaruhi performa server." },
      { text: "Pihak perusahaan bank akan segera memberi Anda bonus poin keamanan karena Anda sangat efisien.", isCorrect: false, explanation: "Justru sebaliknya, bank menyarankan Anda memakai sandi eksklusif untuk layanan perbankan." }
    ]
  },
  {
    id: 30,
    title: "Komputer Publik",
    description: "Setelah menggunakan komputer umum di warnet atau perpustakaan, hal yang MUTLAK harus Anda lakukan sebelum pergi adalah:",
    options: [
      { text: "Menghapus riwayat browsing dan melakukan 'Log Out' (Keluar) dari semua akun.", isCorrect: true, explanation: "Benar sekali! Meninggalkan akun dalam keadaan login di komputer publik sama dengan memberikan akses penuh ke orang berikutnya." },
      { text: "Mematikan layar monitornya saja agar orang lain mengira komputer tersebut sudah mati sepenuhnya.", isCorrect: false, explanation: "Mematikan layar tidak mengakhiri sesi login Anda." },
      { text: "Meninggalkan secarik kertas berisi username rahasia Anda agar bisa digunakan pengguna selanjutnya.", isCorrect: false, explanation: "Itu sama sekali tidak masuk akal dalam keamanan siber." },
      { text: "Mengganti gambar wallpaper latar belakang layar komputer untuk meninggalkan jejak kenangan Anda.", isCorrect: false, explanation: "Itu tidak mengamankan data pribadi Anda sama sekali." }
    ]
  }
];
