import React, { useState, useEffect } from "react";
import "./App.css";

// Daftar operator dan angka yang akan digunakan
const operators = ["AC", "/", "x", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Komponen utama
const App = () => {
  // State untuk input layar kalkulator
  const [input, setInput] = useState("0");

  // State untuk hasil perhitungan
  const [output, setOutput] = useState("");

  // State untuk data kalkulator
  const [calculatorData, setCalculatorData] = useState("");

  // Fungsi untuk membersihkan kalkulator
  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  // Fungsi untuk menghandle input angka
  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
      return; // Menghentikan eksekusi jika kalkulator kosong
    }

    if (value === 0 && (calculatorData === "0" || input === "0")) {
      return; // Menghentikan eksekusi jika angka nol sudah ada
    }

    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    const isLastCharOperator = lastChar === "*" || operators.includes(lastChar);

    setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
    setCalculatorData(`${calculatorData}${value}`);
  };

  // Fungsi untuk menghandle input desimal (titik)
  const handleDotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);

    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
      return; // Menghentikan eksekusi jika kalkulator kosong
    }

    if (lastChar === "*" || operators.includes(lastChar)) {
      setInput("0.");
      setCalculatorData(`${calculatorData} 0.`);
      return; // Menghentikan eksekusi jika operator terakhir atau karakter terakhir adalah titik
    }

    if (lastChar === "." || input.includes(".")) {
      return; // Menghentikan eksekusi jika titik sudah ada dalam input
    }

    setInput(`${input}.`);
    setCalculatorData(`${calculatorData}.`);
  };

  // Fungsi untuk menghandle input operator
  const handleOperators = (value) => {
    // Menghentikan eksekusi jika kalkulator kosong
    if (!calculatorData.length) return;

    // Mengambil karakter terakhir dan sebelum karakter terakhir
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);

    // Menentukan operator yang valid, mengganti "x" dengan "*"
    const validOp = value === "x" ? "*" : value;

    // Mengecek apakah karakter terakhir atau sebelum karakter terakhir adalah operator
    // dan value bukan "-"
    if (
      (operators.includes(lastChar) ||
        lastChar === "*" ||
        beforeLastChar === "*") &&
      value !== "-"
    ) {
      // Jika ya, menggabungkan karakter terakhir atau sebelum karakter terakhir dengan value
      const updatedValue =
        beforeLastChar === "*"
          ? `${calculatorData.substring(0, calculatorData.length - 2)}${value}`
          : `${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`;
      setCalculatorData(updatedValue);
    } else {
      // Jika tidak, menambahkan value ke data kalkulator
      setCalculatorData(`${calculatorData}${validOp}`);
    }

    // Mengatur nilai input ke value yang diberikan
    setInput(value);
  };

  // Fungsi untuk menghandle semua input tombol
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        handleDotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  // Fungsi untuk menghitung hasil perhitungan
  const handleSubmit = () => {
    try {
      // Mengganti "x" dengan "*"
      let expression = calculatorData.replace(/x/g, "*");

      // Mengganti "--" dengan "+"
      expression = expression.replace(/--/g, "+");

      // Menggunakan math.js untuk mengevaluasi ekspresi
      const total = math.evaluate(expression);
      setInput(total.toString());
      setOutput(`${calculatorData} = ${total}`);
      setCalculatorData(total.toString());
    } catch (error) {
      console.error("Error:", error);
      setInput("Error");
    }
  };

  // Fungsi untuk mengupdate tampilan output
  const handleOutput = () => {
    setOutput(calculatorData);
  };

  // useEffect untuk mengupdate tampilan output saat calculatorData berubah
  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <div className="output">
          <span className="result">{output}</span>
          <span id="display" className="input">
            {input}
          </span>
        </div>
        <div className="keys">
          {calcData.map((key) => (
            <button key={key.id} id={key.id} onClick={() => handleInput(key.value)}>
              {key.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Daftar tombol pada kalkulator
const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." }
];

export default App;
