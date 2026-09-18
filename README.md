# PriceWISE | Real-Time Price Comparison Engine

PriceWISE is a high-performance, stateless web application that aggregates, filters, and instantly compares live e-commerce product data across major platforms like Amazon, Flipkart, Myntra, and Meesho.

### The Problem It Solves

Manually cross-referencing prices across multiple e-commerce sites is slow and tedious. PriceWISE automates this by executing parallel, asynchronous web scraping to deliver real-time market data instantly. It features an integrated AI shopping assistant to recommend the best deals, and utilizes a custom fuzzy-matching algorithm to overcome product title discrepancies and typos.

### Technical Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Python, FastAPI
- **Data Extraction:** Selenium WebDriver, WebDriver Manager
- **Algorithms:** Fuzzy String Matching (`difflib`), Parallel Processing (`ThreadPoolExecutor`)

---

## Local Installation & Setup

This project requires two active terminal instances to run the separated frontend and backend environments concurrently.

### 1. Backend Setup (FastAPI + Python)

Ensure you have Python 3.8+ and Google Chrome installed on your machine.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

# 4. Install required dependencies
pip install -r requirements.txt

# 5. Start the FastAPI server
uvicorn main:app --reload --port 8000
```

_The API will now be running at http://localhost:8000_

### 2. Frontend Setup (React + Vite)

Open a new terminal window at the root directory of the project.

```bash
# 1. Install Node modules
npm install

# 2. Start the Vite development server
npm run dev
```

_The web interface will now be running at http://localhost:5173 (or port 3000)_

---

## Core Features

- **Parallel Asynchronous Scraping:** Utilizes Python's `ThreadPoolExecutor` to query multiple e-commerce platforms simultaneously, drastically reducing data-fetching latency.
- **Smart Search Validation:** Implements `difflib` fuzzy string matching (80% similarity threshold) to automatically handle typos and validate unstructured product titles against user queries.
- **Client-Side State Management:** Executes dynamic sorting (by price and rating) instantly on the client side, eliminating redundant API calls.
- **Integrated AI Assistant:** Features a stateless chatbot interface ready to process scraped product data and deliver dynamic shopping recommendations.
