# 🤖 Asistente con IA - Interfaz de Chat en Tiempo Real

Una aplicación web ligera y funcional que permite a los usuarios interactuar en tiempo real con la **API de Mistral AI**. La interfaz es moderna, responsiva y visualmente atractiva, con un fondo de gradiente animado y una paleta de colores "Neón Nocturno".

![Asistente con IA Screenshot](https://github.com/DiorangelRD/Asistente-con-AI/blob/main/screenshot.jpg)


---

## ✨ Características Principales

-   **Interacción en Tiempo Real:** Conversaciones fluidas con la API de Mistral AI.
-   **Interfaz Moderna:** Diseño "Neón Nocturno" con efectos de cristal esmerilado (`backdrop-filter`) y un fondo de gradiente animado.
-   **Historial de Chats:** Las conversaciones se guardan en el `localStorage` del navegador, permitiendo persistencia entre sesiones.
-   **Cargar Conversaciones:** Haz clic en un chat del historial para cargar y continuar la conversación.
-   **Cero Dependencias:** Construido con HTML, CSS y JavaScript puros. ¡Sin frameworks!
-   **Responsivo:** Se adapta a diferentes tamaños de pantalla, desde móviles hasta escritorio.

---

## 🛠️ Tecnologías Utilizadas

-   **HTML5:** Para la estructura semántica de la aplicación.
-   **CSS3:** Para los estilos visuales, el layout con Flexbox y las animaciones.
-   **JavaScript (ES6+):** Para toda la lógica de la aplicación, manipulación del DOM y la integración con la API.
-   **API de Mistral AI:** Como el cerebro de la inteligencia artificial.
-   **Marked.js:** Una pequeña librería para renderizar las respuestas de la IA (que vienen en formato Markdown) como HTML.

---

## ⚙️ Cómo Empezar (Uso Local)

Sigue estos pasos para ejecutar el proyecto en tu propia máquina.

### Prerrequisitos

-   Un navegador web moderno (Chrome, Firefox, Edge, etc.).
-   Un editor de texto (como [VS Code](https://code.visualstudio.com/)).
-   Una clave de API de [Mistral AI](https://console.mistral.ai/).

### Instalación

1.  **Clona el repositorio:**
    ```sh
    git clone https://github.com/DiorangelRD/Asistente-con-AI.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```sh
    cd Asistente-con-AI
    ```

3.  **Añade tu clave de API:**
    -   Abre el archivo `script.js` en tu editor de texto.
    -   Busca la siguiente línea (cerca del principio):
        ```javascript
        const MISTRAL_API_KEY = 'TU_API_KEY_DE_MISTRAL_AQUI';
        ```
    -   🚨 **Reemplaza** `'TU_API_KEY_DE_MISTRAL_AQUI'` con tu clave de API real de Mistral. Asegúrate de que la clave quede **dentro de las comillas**.

4.  **Abre la aplicación:**
    -   Simplemente haz doble clic en el archivo `index.html` para abrirlo en tu navegador.
    -   *(Recomendado)* Si usas VS Code, puedes instalar la extensión "Live Server" para una mejor experiencia de desarrollo.

---

## 🚀 Despliegue

Puedes desplegar esta aplicación fácilmente en servicios gratuitos como:

-   [Vercel](https://vercel.com/)
-   [Netlify](https://www.netlify.com/)
-   [GitHub Pages](https://pages.github.com/)

> **¡ADVERTENCIA DE SEGURIDAD!**
> La configuración actual expone tu clave de API en el archivo `script.js`. **Nunca subas tu clave a un repositorio público si lo vas a desplegar.** Para un despliegue seguro, deberías implementar una función "serverless" (o un pequeño backend) que actúe como proxy y guarde tu clave de forma segura como una variable de entorno.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
