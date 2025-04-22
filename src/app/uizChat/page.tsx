import './uizChat.css';

export default function UizChat() {
  return (
    <div className="uizchat-background">
      <main className="uizchat-container">
        <span className="uizchat-icon" role="img" aria-label="Chat bubble">
          💬
        </span>

        <h1>University Chatbot</h1>
        <p>
          I'm currently building a chatbot for my university needs. I'm going to
          launch it soon, and it will be able to answer questions about:
          <ul>
            <li>Course information</li>
            <li>Enrollment procedures</li>
            <li>Campus events</li>
            <li>General inquiries</li>
          </ul>
        </p>
        <p className="highlight">
          Stay tuned for updates on this innovative project.
        </p>
      </main>
    </div>
  );
}
