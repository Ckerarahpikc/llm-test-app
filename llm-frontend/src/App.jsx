import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { HiMiniPencilSquare } from "react-icons/hi2";

function App() {
  // const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // add user message to the ui
    const userMessage = { role: "user", text: input };
    const typingIndicator = { role: "typing", id: "ai_typing_indicator" };
    setMessages((prev) => [...prev, userMessage, typingIndicator]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => {
          const updatedMessages = prev.filter(
            (msg) => msg.id !== "ai_typing_indicator",
          );
          return [...updatedMessages, { role: "ai", text: data.reply }];
        });
      } else {
        console.log("Server error:", data.error);
        // still removing the typing indicator
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== "ai_typing_indicator"),
        );
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      // still removing the typing indicator
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== "ai_typing_indicator"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const editMessage = async () => {
  //
  // };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        minWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              margin: "16px 0",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: msg.role === "user" ? "#3a393c" : "#242325",
                padding: "10px 14px",
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                maxWidth: "75%",
                wordBreak: "break-word",
                color: msg.role === "typing" ? "#999" : "inherit",
                fontStyle: msg.role === "typing" ? "italic" : "normal",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {msg.role === "typing" ? (
                <em
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  Gemini is typing...
                </em>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>

            {msg.role === "user" && (
              <div
                // onClick={editMessage}
                style={{
                  marginTop: "4px",
                  marginRight: "4px",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  opacity: 0.7,
                }}
                title="Edit message"
              >
                <HiMiniPencilSquare />
              </div>
            )}
          </div>
        ))}
        {/* this div will be scrolled into view */}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask Gemini something..."
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
