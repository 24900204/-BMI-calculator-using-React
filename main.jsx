import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();

    const h = Number(height);
    const w = Number(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setResult({ error: "Please enter valid height and weight." });
      return;
    }

    const bmi = w / ((h / 100) ** 2);
    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmi.toFixed(2), category });
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="page">
      <header>
        <div className="icon">⚕</div>
        <h1>BMI Calculator</h1>
        <p>Calculate your Body Mass Index</p>
      </header>

      <main className="card">
        <form onSubmit={calculateBMI}>
          <label>Height (cm)</label>
          <input
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            step="0.1"
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="1"
            step="0.1"
          />

          <div className="buttons">
            <button type="submit" className="calculate">Calculate BMI</button>
            <button type="button" className="reset" onClick={reset}>Reset</button>
          </div>
        </form>

        {result && (
          <section className="result">
            {result.error ? (
              <p className="error">{result.error}</p>
            ) : (
              <>
                <h2>Your BMI</h2>
                <div className="bmi-value">{result.bmi}</div>
                <div className="category">{result.category}</div>
                <p className="formula">BMI = Weight (kg) / Height² (m²)</p>
              </>
            )}
          </section>
        )}

        <div className="guide">
          <h3>BMI Categories</h3>
          <div><span>Below 18.5</span><b>Underweight</b></div>
          <div><span>18.5 – 24.9</span><b>Normal</b></div>
          <div><span>25.0 – 29.9</span><b>Overweight</b></div>
          <div><span>30.0 and above</span><b>Obese</b></div>
        </div>
      </main>

      <footer>
        Designed and Developed by <strong>Rithika L</strong> | Register No: 24900204
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
