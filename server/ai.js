export async function generateReply(message) {
  return {
    reply: `Koneksi berhasil. Pesan diterima: "${message}".`,
    source: "demo",
  };
}
