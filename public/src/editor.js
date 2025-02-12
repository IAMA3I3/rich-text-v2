const editor = document.querySelector('#editor')
const richTextArea = document.querySelector('#rich-text-area')
const buttons = document.querySelectorAll(".editor-btn");
const colorPicker = document.getElementById("textColor");

if (editor && richTextArea && buttons && colorPicker) {
    // Function to update active buttons
    function updateActiveButtons() {
        buttons.forEach(button => {
            const command = button.getAttribute("data-command");
            if (document.queryCommandState(command)) {
                button.classList.add("bg-gray-400");
                button.classList.add("text-white");
                button.classList.remove("text-gray-400");
            } else {
                button.classList.remove("bg-gray-400");
                button.classList.remove("text-white");
                button.classList.add("text-gray-400");
            }
        });
    }
    // Apply formatting commands when buttons are clicked
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const command = this.getAttribute("data-command");

            if (command === "createLink") {
                const url = prompt("Enter the link URL:");
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, null);
            }

            editor.focus(); // Keep focus on editor after formatting
            updateActiveButtons(); // Update active styles
        });
    });
    // Change text color when color is selected
    colorPicker.addEventListener("input", () => {
        document.execCommand("foreColor", false, colorPicker.value);
        editor.focus();
    });
    // Prevent pasting unformatted text
    editor.addEventListener("paste", (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData("text");
        document.execCommand("insertText", false, text);
    });
    // Detect changes in the editor and update active buttons
    editor.addEventListener("keyup", updateActiveButtons);
    editor.addEventListener("mouseup", updateActiveButtons);
    // Ensure the editor remains focusable
    editor.addEventListener("click", () => {
        editor.focus();
    });

    editor.addEventListener("input", () => {
        // console.log(editor.innerHTML)
        richTextArea.value = editor.innerHTML
    })
}