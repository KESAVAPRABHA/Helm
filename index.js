const express = require('express');
const app = express();

const PORT = 3000;

let quotes = [
  "✨ The only limit to our realization of tomorrow is our doubts of today. – FDR",
  "🌟 Life is 10% what happens to us and 90% how we react to it. – Swindoll",
  "🚀 Success is not final, failure is not fatal: it is the courage to continue that counts. – Churchill",
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Quote App</title>
      <style>
        body {
          margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif;
          display: flex; justify-content: center; align-items: center;
          height: 100vh; flex-direction: column;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white; text-align: center;
        }
        h1 {
          font-size: 3rem; margin-bottom: 20px;
          animation: fadeIn 1.5s ease-in-out;
        }
        .quote {
          font-size: 1.5rem; margin: 20px; transition: all 0.3s ease;
          padding: 15px 25px; background: rgba(255,255,255,0.1);
          border-radius: 10px;
          animation: slideUp 0.6s ease-in-out;
        }
        button {
          padding: 10px 20px; background: #ff7e5f; border: none;
          border-radius: 20px; color: white; font-weight: bold;
          cursor: pointer; margin-top: 10px;
        }
        form {
          margin-top: 30px;
        }
        input {
          padding: 10px; border-radius: 10px; border: none;
          width: 300px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <h1>🌈 Inspiring Quote</h1>
      <div id="quote" class="quote">Loading...</div>
      <button onclick="getQuote()">New Quote</button>

      <form onsubmit="addQuote(event)">
        <input id="newQuote" placeholder="Add your own quote..." required />
        <button type="submit">Add</button>
      </form>

      <script>
        async function getQuote() {
          const res = await fetch('/api/quote');
          const data = await res.json();
          const quoteDiv = document.getElementById('quote');
          quoteDiv.style.opacity = 0;
          setTimeout(() => {
            quoteDiv.textContent = data.quote;
            quoteDiv.style.opacity = 1;
          }, 300);
        }

        async function addQuote(e) {
          e.preventDefault();
          const input = document.getElementById('newQuote');
          const newQuote = input.value;
          await fetch('/api/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quote: newQuote })
          });
          input.value = '';
          getQuote();
        }

        // Initial quote
        getQuote();
      </script>
    </body>
    </html>
  `);
});

app.get('/api/quote', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

app.post('/api/quote', (req, res) => {
  const { quote } = req.body;
  if (quote) {
    quotes.push(quote);
    res.status(201).json({ message: 'Quote added!' });
  } else {
    res.status(400).json({ error: 'No quote provided' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

