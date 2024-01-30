(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    document.addEventListener("DOMContentLoaded", (() => {
        const phoneInputs = document.querySelectorAll("input[data-tel-input]");
        const getInputNumbersValue = input => input.value.replace(/\D/g, "");
        const onPhonePaste = e => {
            const input = e.target;
            const inputNumbersValue = getInputNumbersValue(input);
            const pasted = e.clipboardData || window.clipboardData;
            if (pasted) {
                const pastedText = pasted.getData("Text");
                if (/\D/g.test(pastedText)) {
                    input.value = inputNumbersValue;
                    return;
                }
            }
        };
        const formatPhoneNumber = inputNumbersValue => {
            let formattedInputValue = "";
            if ([ "7", "8", "9" ].includes(inputNumbersValue[0])) {
                if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
                const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
                formattedInputValue = firstSymbols + " ";
                if (inputNumbersValue.length > 1) formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
                if (inputNumbersValue.length >= 5) formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
                if (inputNumbersValue.length >= 8) formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
                if (inputNumbersValue.length >= 10) formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            } else if (inputNumbersValue.startsWith("3")) {
                formattedInputValue = "+" + inputNumbersValue[0];
                if (inputNumbersValue.length > 1) if ([ "5", "7", "8" ].includes(inputNumbersValue[1])) {
                    formattedInputValue += inputNumbersValue.substring(1, 3) + " ";
                    if (inputNumbersValue.length >= 3) formattedInputValue += "(" + inputNumbersValue.substring(3, 5);
                    if (inputNumbersValue.length >= 5) formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
                    if (inputNumbersValue.length >= 8) formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
                    if (inputNumbersValue.length >= 10) formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
                } else {
                    formattedInputValue += inputNumbersValue.substring(1, 2);
                    if (inputNumbersValue.length >= 2) formattedInputValue += " (" + inputNumbersValue.substring(2, 5);
                    if (inputNumbersValue.length >= 5) formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
                    if (inputNumbersValue.length >= 8) formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
                    if (inputNumbersValue.length >= 10) formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
                }
            } else if (inputNumbersValue.startsWith("4")) {
                formattedInputValue = "+" + inputNumbersValue[0];
                if (inputNumbersValue.length > 1) if (inputNumbersValue[1] === "4") {
                    formattedInputValue += inputNumbersValue.substring(1, 2) + " ";
                    if (inputNumbersValue.length >= 2) formattedInputValue += "(" + inputNumbersValue.substring(2, 6);
                    if (inputNumbersValue.length >= 6) formattedInputValue += ") " + inputNumbersValue.substring(6, 9);
                    if (inputNumbersValue.length >= 9) formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
                    if (inputNumbersValue.length >= 11) formattedInputValue += "-" + inputNumbersValue.substring(11, 13);
                } else if ([ "2" ].includes(inputNumbersValue[1])) {
                    formattedInputValue += inputNumbersValue.substring(1, 3) + " ";
                    if (inputNumbersValue.length >= 3) formattedInputValue += "(" + inputNumbersValue.substring(3, 5);
                    if (inputNumbersValue.length >= 5) formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
                    if (inputNumbersValue.length >= 8) formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
                    if (inputNumbersValue.length >= 10) formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
                } else {
                    formattedInputValue += inputNumbersValue.substring(1, 2);
                    if (inputNumbersValue.length >= 2) formattedInputValue += " (" + inputNumbersValue.substring(2, 5);
                    if (inputNumbersValue.length >= 5) formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
                    if (inputNumbersValue.length >= 8) formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
                    if (inputNumbersValue.length >= 10) formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
                }
            } else formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
            return formattedInputValue;
        };
        const onPhoneInput = e => {
            const input = e.target;
            let inputNumbersValue = getInputNumbersValue(input);
            const selectionStart = input.selectionStart;
            if (!inputNumbersValue) return input.value = "";
            if (input.value.length != selectionStart) {
                if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue;
                return;
            }
            if (e.inputType === "deleteContentBackward") return;
            const formattedInputValue = formatPhoneNumber(inputNumbersValue);
            input.value = formattedInputValue;
        };
        const onPhoneKeyDown = e => {
            const input = e.target;
            const inputValue = input.value;
            const cursorPosition = input.selectionStart;
            if (e.keyCode == 8) {
                if (cursorPosition === 0) return;
                let newValue = "";
                let newPosition = cursorPosition;
                newValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition);
                newPosition = cursorPosition - 1;
                newValue = newValue.replace(/(\D)(?=\D*$)/g, "");
                input.value = newValue;
                input.setSelectionRange(newPosition, newPosition);
                e.preventDefault();
            }
        };
        for (const phoneInput of phoneInputs) {
            phoneInput.addEventListener("keydown", onPhoneKeyDown);
            phoneInput.addEventListener("input", onPhoneInput);
            phoneInput.addEventListener("paste", onPhonePaste);
        }
    }));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window["FLS"] = true;
    isWebp();
})();