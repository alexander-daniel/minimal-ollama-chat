"use client";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import useChatScroll from "@/hooks/useChatScroll";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Chat() {
  const [activeModel, setActiveModel] = useState("llama3.2");
  const { data, error, isLoading } = useSWR('/api/list', fetcher);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      modelId: activeModel,
    }
  });

  const handleModelSelection = (e: any) => {
    setActiveModel(e.target.value);
  }

  const chatRef = useChatScroll(messages);

  if (isLoading) {
    // totally centered;
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: '100vw' }}>
      {"Loading available models..."}
    </div>
  }

  if (!isLoading && error) {
    // totally centered;
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: '100vw' }}>
      {"Error loading available models. Is ollama running?"}
    </div>
  }

  if (!isLoading && !data.models.length) {
    return <div>{'No ollama models available, pull some locally and they\'ll show up here'}</ div>
  }

  return (
    <div className="chat-section">
      <div
        className="messages-container"
        ref={chatRef}
      >
        <div className="messages">
          {messages.length ? (
            messages.map((m, i) => {
              return m.role === "user" ? (
                <div key={i} className="message-container">
                  <span className="nametag user-nametag">me</span>
                  <div className="message user-message">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ) : (
                <div key={i} className="message-container">
                  <span className="nametag ai-nametag">ollama</span>
                  <div className="message ai-message">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="">
              <h1>local ollama</h1>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="text-input"
          value={input}
          placeholder="Ask me anything..."
          onChange={handleInputChange}
        />
        <select className="model-select" onChange={handleModelSelection}>
          {data.models.map((model: any) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
}
