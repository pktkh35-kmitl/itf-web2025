const action = document.getElementById("action");
const value = document.getElementById("value");
const account = document.getElementById("account");
const cash = document.getElementById("cash");
const transactions = document.getElementById("transactions");
const input = document.getElementById("input");
const output = document.getElementById("output");
const currency = document.getElementById("currency");
let count = 1

function addlog(text) {
    transactions.value = count + text + "\n" + transactions.value
    count++
}

function change() {
    addlog(", Current account balance: " + account.value + ", Current cash balance: " + cash.value)
}

function proceed() {
    if (!Number(value.value)) return
    if (action.value === "deposit" && (Number(cash.value) >= Number(value.value))) {
        cash.value = Number(cash.value) - Number(value.value)
        account.value = Number(account.value) + Number(value.value)
        addlog(", Current account balance: " + account.value + ", Current cash balance: " + cash.value)
        return
    } else if (action.value === "withdraw" && (Number(account.value) >= Number(value.value))) {
        account.value = Number(account.value) - Number(value.value)
        cash.value = Number(cash.value) + Number(value.value)
        addlog(", Current account balance: " + account.value + ", Current cash balance: " + cash.value)
        return
    }

    addlog(", Couldn't deposit entered balance. (Insufficient cash balance)")
}

async function convert() {
    const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            input: Number(input.value),
            type: currency.value
        })
    });
    const text = await response.json();

    output.value = text.amount;
}

addlog(", Current account balance: " + account.value + ", Current cash balance: " + cash.value)