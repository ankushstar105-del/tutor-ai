document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const appUI = document.getElementById("appUI");
  const nameInput = document.getElementById("nameInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginBtn = document.getElementById("loginBtn");
  const classInput = document.getElementById("classInput");
  const subjectInput = document.getElementById("subjectInput");
  const topicInput = document.getElementById("topicInput");
  const genNotesBtn = document.getElementById("genNotesBtn");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const fileInput = document.getElementById("fileInput");
  const themeToggle = document.getElementById("themeToggle");

  loginBtn.addEventListener("click", () => {
    if (!nameInput.value || !passwordInput.value) { alert("Enter name & password!"); return; }
    localStorage.setItem("userName", nameInput.value);
    loginScreen.classList.add("hidden");
    appUI.classList.remove("hidden");
    addAIMessage(`Welcome ${nameInput.value}! Enter Class, Subject, and Topic to start.`);
  });

  genNotesBtn.addEventListener("click", async () => {
    const topic = topicInput.value.trim();
    if(!topic) return alert("Enter topic!");
    addUserMessage(topic);
    addAIMessage("Fetching notes...");

    try {
      const response = await fetch("/api/get_notes", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ query: topic })
      });
      const data = await response.json();
      addAIMessage(data.answer);
    } catch (err) {
      addAIMessage("Error fetching notes.");
      console.error(err);
    }
  });

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", e => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMessage(); } });

  function sendMessage() {
    const msg = userInput.value.trim(); if(!msg) return;
    addUserMessage(msg); userInput.value="";
    addAIMessage("Fetching answer..."); // placeholder
  }

  logoutBtn.addEventListener("click", () => {
    appUI.classList.add("hidden"); loginScreen.classList.remove("hidden");
    chatBox.innerHTML=`<div class="ai-msg">👋 Hi! I am your Kazen Tutor AI. Ask me anything!</div>`;
    nameInput.value=""; passwordInput.value=""; classInput.value=""; subjectInput.value=""; topicInput.value=""; userInput.value="";
  });

  fileInput.addEventListener("change", () => { if(fileInput.files[0]) addAIMessage(`📎 You uploaded: ${fileInput.files[0].name}`); });
  micBtn.addEventListener("click", () => addAIMessage("🎤 Mic clicked (not implemented)"));
  themeToggle.addEventListener("click", () => document.body.classList.toggle("dark"));

  function addUserMessage(msg){ const div=document.createElement("div"); div.classList.add("user-msg"); div.textContent=msg; chatBox.appendChild(div); chatBox.scrollTop=chatBox.scrollHeight; }
  function addAIMessage(msg){ const div=document.createElement("div"); div.classList.add("ai-msg"); div.textContent=msg; chatBox.appendChild(div); chatBox.scrollTop=chatBox.scrollHeight; }
});
