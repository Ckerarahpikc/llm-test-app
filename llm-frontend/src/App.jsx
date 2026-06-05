import { useState, useRef, useEffect } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { DefaultChatTransport } from "ai";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { useChat } from "@ai-sdk/react";

function App() {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:2000/api/chat",
    }),
  });
  const isLoading = status === "submitted";

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "100%",
          overflowY: "hidden",
          padding: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => {
          let textMessage = msg.parts
            ?.filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");

          return (
            <div
              key={msg.id}
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
                  textAlign: msg.role === "user" ? "right" : "left",
                  color: msg.role === "user" ? "#999" : "inherit",
                  fontStyle: msg.role === "user" ? "italic" : "normal",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {textMessage}
                </ReactMarkdown>
              </div>

              {msg.role === "user" && (
                <div
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
          );
        })}

        {isLoading && (
          <div
            style={{
              fontStyle: "italic",
              color: "#999",
              margin: "10px 0",
              alignSelf: "flex-start",
            }}
          >
            Gemini is preparing a response...
          </div>
        )}

        {/* this div will be scrolled into view */}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          position: "relative",
          display: "flex",
          gap: "10px",
          minWidth: "900px",
          bottom: "50px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini something..."
          style={{
            flexGrow: 1,
            padding: "14px",
            border: "1px solid #ccc",
            borderRadius: "50px",
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default App;
