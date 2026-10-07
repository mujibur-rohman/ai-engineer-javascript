import { useEffect, useRef, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const bottom = useRef(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(event) {
    event.preventDefault();
    const message = input.trim();
    if (!message || busy.current) return;
    busy.current = true;
    setLoading(true);
    setError("");
    setMessages((previous) => [...previous, { role: "user", text: message }]);
    setInput("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request gagal.");
      if (
        typeof data.reply !== "string" ||
        !["demo", "ai"].includes(data.source)
      )
        throw new Error("Respons server tidak valid.");
      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.reply, source: data.source },
      ]);
    } catch (err) {
      setError(
        err.name === "TimeoutError"
          ? "Request terlalu lama. Coba lagi."
          : err instanceof TypeError
            ? "Server tidak bisa dihubungi. Pastikan backend berjalan."
            : err.message,
      );
      setInput(message);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <header>
        <span className="eyebrow">VIBE LEARNING / LEVEL 01</span>
        <h1>
          Toko Nusa <span>AI</span>
        </h1>
        <p>Episode 01 · Chat dasar</p>
      </header>
      <aside className="notice">
        Starter memakai respons demo lokal. Belum terhubung ke model AI atau
        data toko.
      </aside>
      <section className="chat" aria-label="Percakapan">
        <div className="messages" role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className="empty">
              <span className="chip">01</span>
              <h2>Satu pesan. Satu perjalanan.</h2>
              <p>React → Express → respons di layar</p>
              <button
                type="button"
                onClick={() =>
                  setInput("Jelaskan API dalam satu kalimat sederhana.")
                }
              >
                Coba pertanyaan contoh ↗
              </button>
            </div>
          )}
          {messages.map((message, index) => (
            <article className={`bubble ${message.role}`} key={index}>
              <small>
                {message.role === "user"
                  ? "KAMU"
                  : message.source === "demo"
                    ? "DEMO LOKAL · BUKAN AI"
                    : "MODEL AI"}
              </small>
              <p>{message.text}</p>
            </article>
          ))}
          {loading && (
            <p className="loading" role="status">
              Menunggu jawaban…
            </p>
          )}
          <div ref={bottom} />
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={submit}>
          <label className="sr-only" htmlFor="message">
            Pesan
          </label>
          <input
            id="message"
            maxLength={2000}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tulis pertanyaan…"
            disabled={loading}
            autoComplete="off"
          />
          <button disabled={loading || !input.trim()}>
            {loading ? "Menunggu…" : "Kirim ↗"}
          </button>
        </form>
      </section>
      <footer>
        API key hanya di server · Pesan belum disimpan · Model hanya menerima
        pesan terbaru
      </footer>
    </main>
  );
}
