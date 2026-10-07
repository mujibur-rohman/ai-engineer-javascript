// Fokus coding saat video: ganti isi fungsi ini dengan panggilan model.
// Ini respons demo lokal, BUKAN hasil AI. UI selalu menampilkan label sumber.
export async function generateReply(message) {
  return {
    reply: `Koneksi React → Express berhasil. Pesan diterima: "${message}". Berikutnya kita hubungkan ke model AI.`,
    source: "demo",
  };
}
