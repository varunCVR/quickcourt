import fetch from "node-fetch";

const bookingId = "60f738b8-f91a-4a85-b5dd-a155b3b402e7"; // your real booking ID

async function testPayment() {
  try {
    const response = await fetch("http://localhost:8000/api/payments/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    });

    const data = await response.json();
    console.log("Response from backend:", data);
  } catch (err) {
    console.error("Error testing payment:", err);
  }
}

testPayment();
