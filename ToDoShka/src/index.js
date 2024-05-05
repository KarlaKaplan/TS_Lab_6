import { revertString } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputString");
    const form = document.getElementById("form");
    form.addEventListener("submit", event => {
        event.preventDefault();
        input.value = revertString(input.value);
    });
});