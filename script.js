document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const clearButton = document.getElementById('clear-btn');
    const newChatButton = document.querySelector('.new-chat-btn');
    const submitButton = chatForm.querySelector('.btn-primary');
    const historyContainer = document.getElementById('history-container');

    // --- Configuración de la API de Mistral ---
    const MISTRAL_API_KEY = 'Ja5uOq0QXJQ2HAAtVYpKxaocO7VcdCcZ'; // 🚨 ¡REEMPLAZA ESTO!
    const API_URL = 'https://api.mistral.ai/v1/chat/completions';

    let currentChatId = null;

    // --- Event Listeners ---
    chatForm.addEventListener('submit', handleFormSubmit);
    clearButton.addEventListener('click', () => startNewChat(true));
    newChatButton.addEventListener('click', () => startNewChat(true));
    historyContainer.addEventListener('click', handleHistoryClick);

    // --- Funciones Principales ---
    async function handleFormSubmit(e) {
        e.preventDefault();
        const userMessageText = userInput.value.trim();
        if (!userMessageText) return;

        let conversationHistory;

        // Si es un chat nuevo, crea un ID y guárdalo
        if (!currentChatId) {
            currentChatId = Date.now();
            conversationHistory = [];
            chatMessages.innerHTML = ''; // Limpia el saludo inicial
            saveChat(currentChatId, userMessageText, conversationHistory);
        } else {
            conversationHistory = loadChat(currentChatId);
        }
        
        addMessageToUI(userMessageText, 'user');
        conversationHistory.push({ role: 'user', content: userMessageText });
        saveChat(currentChatId, null, conversationHistory);

        userInput.value = '';
        toggleLoading(true);

        try {
            const mistralResponseText = await callMistralAPI(conversationHistory);
            
            const formattedHtml = marked.parse(mistralResponseText);
            addMessageToUI(formattedHtml, 'assistant', true);
            
            conversationHistory.push({ role: 'assistant', content: mistralResponseText });
            saveChat(currentChatId, null, conversationHistory);

        } catch (error) {
            console.error('Error al llamar a la API de Mistral:', error);
            addMessageToUI('Lo siento, ha ocurrido un error. Revisa la consola para más detalles.', 'assistant');
        } finally {
            toggleLoading(false);
        }
    }

    async function callMistralAPI(history) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${MISTRAL_API_KEY}` },
            body: JSON.stringify({ model: 'mistral-small-latest', messages: history })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error de la API: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // --- CAMBIO: Lógica de Historial MÁS ROBUSTA ---
    function saveChat(id, title, messages) {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
        
        // Si el chat no existe, créalo (solo si se proporciona un título)
        if (!history[id] && title) {
            const truncatedTitle = title.length > 35 ? title.substring(0, 32) + '...' : title;
            history[id] = { title: truncatedTitle, messages: [] };
        }
        
        // Si el chat ya existe, actualiza sus mensajes
        if (history[id] && messages) {
            history[id].messages = messages;
        }

        localStorage.setItem('chatHistory', JSON.stringify(history));
        renderHistory();
    }

    function loadChat(id) {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
        return history[id] ? history[id].messages : [];
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
        historyContainer.innerHTML = '';
        const chatIds = Object.keys(history).sort((a, b) => b - a);
        if (chatIds.length === 0) {
            historyContainer.innerHTML = '<p>No hay chats guardados.</p>';
            return;
        }
        chatIds.forEach(id => {
            const chat = history[id];
            const historyItem = document.createElement('button');
            historyItem.className = 'history-item';
            historyItem.textContent = chat.title;
            historyItem.dataset.chatId = id;
            historyContainer.appendChild(historyItem);
        });
    }

    function handleHistoryClick(e) {
        if (e.target.classList.contains('history-item')) {
            const chatId = e.target.dataset.chatId;
            startNewChat(false, chatId);
        }
    }

    // --- Funciones de la Interfaz (UI) ---
    function addMessageToUI(content, sender, isHTML = false) {
        const writingIndicator = chatMessages.querySelector('.writing-indicator');
        if (writingIndicator) writingIndicator.remove();

        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper';
        wrapper.innerHTML = `
            <div class="message-icon ${sender === 'user' ? 'user-icon' : 'mistral-icon'}">${sender === 'user' ? 'TÚ' : 'IA'}</div>
            <div class="message ${sender}-message">${isHTML ? content : `<p>${content}</p>`}</div>`;
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function toggleLoading(isLoading) {
        submitButton.disabled = isLoading;
        userInput.disabled = isLoading;
        if (isLoading) {
            const wrapper = document.createElement('div');
            wrapper.className = 'message-wrapper writing-indicator';
            wrapper.innerHTML = `<div class="message-icon mistral-icon">IA</div><div class="message mistral-message"><p>Escribiendo...</p></div>`;
            chatMessages.appendChild(wrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    function startNewChat(showGreeting = true, chatIdToLoad = null) {
        currentChatId = chatIdToLoad;
        chatMessages.innerHTML = '';
        userInput.value = '';

        if (chatIdToLoad) {
            const messages = loadChat(chatIdToLoad);
            messages.forEach(msg => {
                const contentToDisplay = msg.role === 'assistant' ? marked.parse(msg.content) : msg.content;
                addMessageToUI(contentToDisplay, msg.role, msg.role === 'assistant');
            });
        } else if (showGreeting) {
            addMessageToUI('Hola, soy el Asistente de IA. ¿En qué puedo ayudarte hoy?', 'assistant');
        }
    }
    
    // --- Inicialización de la App ---
    renderHistory();
    startNewChat();
});