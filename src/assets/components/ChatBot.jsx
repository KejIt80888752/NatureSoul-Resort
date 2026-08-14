import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { getReply, welcomeMessage, quickQuestions } from "../utils/chatBrain";
import "../style/chatbot.css";

export default function ChatBot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", ...welcomeMessage() },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (question) => {
    const text = question.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    // small delay so the answer feels like a reply, not a page render
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", ...getReply(text) }]);
    }, 450);
  };

  const handleAction = (action) => {
    if (action.to) {
      navigate(action.to);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className={`chat-launcher ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Chat with us"
      >
        <FaComments />
        <span>Chat with us</span>
      </button>

      <div className={`chat-panel ${open ? "open" : ""}`} role="dialog" aria-label="Resort assistant">
        <header className="chat-header">
          <div>
            <h4>Nature Soul Assistant</h4>
            <span className="chat-status">Online · replies instantly</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat">
            <FaTimes />
          </button>
        </header>

        <div className="chat-messages" ref={listRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-row ${msg.from}`}>
              <div className="chat-bubble">
                {msg.text.split("\n").map((line, j) => (
                  <p key={j}>{line}</p>
                ))}

                {msg.actions?.length > 0 && (
                  <div className="chat-actions">
                    {msg.actions.map((action, k) =>
                      action.href ? (
                        <a
                          key={k}
                          href={action.href}
                          target={action.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="chat-action"
                        >
                          {action.label}
                        </a>
                      ) : (
                        <button
                          key={k}
                          className="chat-action"
                          onClick={() => handleAction(action)}
                        >
                          {action.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-row bot">
              <div className="chat-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="chat-chips">
              {quickQuestions.map((q) => (
                <button key={q} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rooms, price, location..."
            aria-label="Your question"
          />
          <button type="submit" aria-label="Send">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </>
  );
}
