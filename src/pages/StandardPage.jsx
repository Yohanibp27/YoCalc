import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";

const StandardPage = () => {
  const [display, setDisplay] = useState("0"); // display nilai saat ini, setDisplay fungsi untuk ubah nilai display dalam bentuk string
  const [activeTab, setActiveTab] = useState("history");
  const [firstOperand, setFirstOperand] = useState(null); // simpan nilai pertama dalam suatu operasi matematika
  const [operator, setOperator] = useState(null); // simpan operator matematika yg dipilih
  const [isNewEntry, setIsNewEntry] = useState(false); // tanda apakah harus mulai memasukkan angka baru
  const [calculation, setCalculation] = useState(""); // menyimpan teks operasi matematika yg ditampilkan diatas angka utama (setDisplay)
  const [currentValue, setCurrentValue] = useState(0); // menyimpan perubahan nilai pada angka (+/-)

  const handleNumber = (number) => {
    // cek apakah operator sudah dimasukkan, jika sudah maka masuk ke inputan angka baru
    if (isNewEntry) {
      setDisplay(number); // jika operator sudah masuk bernilai true, simpan angka saat ini dan masuk ke angka baru
      setIsNewEntry(false);
      return;
    }

    // cek inputan angka
    setDisplay((currentDisplay) => {
      if (currentDisplay === "0") {
        return number;
      }

      return currentDisplay + number;
    });
  };
  // cek inputan angka: paramater 'number' menerima angka yg diklik, misal pengguna menekan tombol 7 maka 'number' akan bernilai 7, ketika klik tombol 3 maka 'number' akan bernilai 73
  // cek kondisi operator
  // Setelah menekan	display	firstOperand	operator	isNewEntry
  // Awal	            "0"	        null	      null	      false
  // 1	                "1"	        null	      null	      false
  // 2	                "12"	    null	      null	      false
  // +	                "12"	    12	          "+"	      true
  // 3	                "3"	        12	          "+"	      false

  const handleDesimal = () => {
    // misal 12 -> + -> , -> 5 -> =
    // harusnya menjadi 12 + 0,5 = 12,5
    // jika angka yg dimasukkan adalah tanda koma setelah operator maka tampil "0,x" dan isNewEntry bernilai false
    if (isNewEntry) {
      setDisplay("0,");
      setIsNewEntry(false);
      return;
    }

    setDisplay((currentDisplay) => {
      // jika sudah ada koma jangan tambahkan koma lagi
      if (currentDisplay.includes(",")) {
        // cek apakah sudah ada tanda koma
        return currentDisplay;
      }
      //   if (currentDisplay === "0") {
      //     return "0,";
      //   }
      return currentDisplay + ",";
    });
  };
  // misal angka 12 belum ada koma, ketika klik tanda koma maka menampilkan "12," dan menambahkan angka lagi menjadi "12,5", ketika klik tanda koma lagi maka false karena satu angka hanya memiliki satu tanda koma desimal

  const handleClear = () => {
    setDisplay("0"); // kenapa langsung setDisplay("0"), karena hapus seluruh perhitungan saat ini dan mengembalikan ke 0 (mengembalikan angka utama pada display)

    setFirstOperand(null); // hapus angka pertama yg disimpan dalam perhitungan
    setOperator(null); // hapus operator yg dipilih
    setIsNewEntry(false); // atur kalkukator kembali ke kondisi angka input biasa
    setCalculation(null); // hapus operasi matematika kembali ke null/kosong yg ditampilkan
  };

  const handleClearEntry = () => {
    setDisplay("0"); // hapus angka saat ini yg sedang dimasukkan
    setIsNewEntry(true);
  };

  const handleBackSpace = () => {
    setDisplay((currentDisplay) => {
      if (currentDisplay.length <= 1) {
        // hitung jumlah karakter dalam string, misal "123" maka memiliki panjang 3, "3,12" maka memiliki panjang 4 (tanda koma dihitung sbg 1 karakter)
        return "0"; // jika tampilan saat ini memiliki 1 karakter maka return 0
      }
      return currentDisplay.slice(0, -1); // mengambil sebagian string dimana parameter 0 berarti mulai dr karakter pertama sedangkan -1 berhenti sebelum karakter terakhir, misal "123".sclice(0, -1) maka "12" atau "3,14".slice(0, -1) maka "3,1"
    });
  };
  // penggunaan slice(0, -1): "12345".slice(0, -1) hasilnya "1234". mengambil karakter terakhir dan return sisanya dimana index negatif dihitung dari belakang string (singkatnya karakter pada index akhir tidak ikut diambil/return)
  // String :  1   2   3   4   5
  // Indeks:   0   1   2   3   4
  //           └───────────────┘
  //              Diambil
  //                           ↑
  //                    Tidak diambil
  // Return: 1234

  // penggunaan slice(0, 1): "12345".slice(0, 1) hasilnya "1". mengambil index 0 yaitu "1" kemudian return hasilnya "1" (singkatnya karakter indext tersebut diambil/return)
  // String :  1   2   3   4   5
  // Indeks:   0   1   2   3   4
  //           ↑   ↑
  //         Mulai Berhenti
  // Return: 1

  const handleOperator = (selectOperator) => {
    // const currentOperand = display; // simpan angka yg ditampilkan

    // // paramater selectOperator untuk menerima operator yg dipilih
    // setFirstOperand(Number(display.replace(",", "."))); // simpan angka pertama dgn mengubah tipe string menjadi tipe number dan simpe kedalam state firstOperand, replace untuk melakukan operasi matematika ketika angka menggunakan koma sebagai tanda desimal
    // setOperator(selectOperator);

    const currentOperand = Number(display.replace(",", "."));
    let result = currentOperand;

    // jika masih ada operasi sebelumnya, hitung terlebih dahulu dan disimpan ke parameter firstOperasi pada tampilan operasi perhitungannya
    if (operator !== null && !isNewEntry) {
      // operator tidak kosong dan paramater kedua tidak kosong
      result = calculateResult(firstOperand, currentOperand, operator); // hasil result didapat dari perhitungan angka pertama, angka kedua, dan operator yg digunakan

      if (result === null) {
        // jika hasilnya adalah kosong
        setDisplay("Cannot divide by zero");
        return;
      }
      setDisplay(String(result).replace(".", ",")); // tampilkan angka desimal dari bentuk number ke bentuk string agar tampil
    }
    // simpan hasil sebagai angka pertama pada paramater pertama untuk operasi perhitungan berikutnya
    setFirstOperand(result);
    setOperator(selectOperator);

    const displayOperator = // ubah simbol operator yg ditampilkan
      selectOperator === "*"
        ? "x"
        : selectOperator === "÷"
          ? "/"
          : selectOperator;
    // setCalculation(`${currentOperand} ${displayOperator}`);
    // setCalculation(`${String(result).replace(".", ",")} ${displayOperator}`); // simpan teks operasi
    setCalculation((currentCalculation) => {
      // menampilkan operasi perhitungan secara berurutan
      if (operator !== null && !isNewEntry) {
        return `${currentCalculation} ${display} ${displayOperator}`;
      }
      return `${currentOperand.toString().replace(".", ",")} ${displayOperator}`;
    });
    setDisplay("0"); // ketika klik operator maka display reset ke nol
    setIsNewEntry(true);
  };

  //   const handleCalculate = () => {
  //     const secondOperand = Number(display.replace(",", "."));
  //     let result;

  //     switch (operator) {
  //       case "+":
  //         result = firstOperand + secondOperand;
  //         break;
  //       case "-":
  //         result = firstOperand - secondOperand;
  //         break;
  //       case "*":
  //         result = firstOperand * secondOperand;
  //         break;
  //       case "/":
  //         if (secondOperand === 0) {
  //           setDisplay("Cannot divide by zero");
  //           return;
  //         }
  //         result = firstOperand / secondOperand;
  //         break;
  //       default:
  //         return;
  //     }
  //     const displayOperator =
  //       operator === "*" ? "x" : operator === "/" ? "÷" : operator;
  //     setCalculation(`${firstOperand} ${displayOperator} ${display} =`); // menggunakan display karna secondOperan adalah angka tipe number yg dipakai pada perhitungan. display digunakan sebagai teks angka yg diinput
  //     setDisplay(String(result).replace(".", ",")); // mengembalikan hasil perhitungan tipe desimal ke bentuk string yg akan ditampilkan
  //     setIsNewEntry(true); // menandakan bahwa perhitungan selesai ketika klik = dan mengganti display dengan angka baru
  //   };

  const handleCalculate = () => {
    // menyesuaikan dengan fungsi calculateResult
    if (operator === null || firstOperand === null) {
      // jika operator atau angka pertama sama dengan kosong tampilkan hasilnya
      return;
    }

    const secondOperand = Number(display.replace(",", ".")); // angka kedua yg diinput dari dalam bentuk string ke decimal
    const result = calculateResult(firstOperand, secondOperand, operator); // melakukan perhitungan angka pertama dan angka kedua dari operator yang digunakan, hasilnya kemudian disimpan sebagai paramater pertama

    if (result === null) {
      // hasil tidak kosong
      setDisplay("Cannot divide by zero");
      return;
    }

    const displayOperator =
      operator === "*" ? "x" : operator === "/" ? "÷" : operator; // menampilkan operator yg dipilih
    setCalculation(`${firstOperand} ${displayOperator} ${display} =`); // menampilkan operasi perhitungannya dalam bentuk string

    setDisplay(String(result).replace(".", ",")); // return hasilnya dari bentuk decimal ke string
    setFirstOperand(null); // ketika klik = maka parameter pertama null
    setOperator(null); // ketika klik = operator kembali null
    setIsNewEntry(true); // mengembalikan nilai kedua menjadi kosong
  };

  const calculateResult = (first, second, selectedOperator) => {
    switch (selectedOperator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        if (second === 0) {
          return null;
        }
        return first / second;
      default:
        return null;
    }
  };

  const handleInvertSign = () => {
    if (display === "0" || display === "0,") {
      // jika angka nya adalah 0 atau 0,
      return;
    }

    const currentValue = Number(display.replace(",", "."));
    const result = -currentValue; // operasi unary yg membalikan nilai angka

    setDisplay(String(result).replace(".", ","));
    // nilai isNewEntry otomatis false karna untuk memberikan pengguna melakukan edit atau mulai input baru
  };

  const handlePrcent = () => {
    const currentValue = Number(display.replace(",", ".")); // ubah angka string pada display menggunakan koma sbg desimal
    const result = currentValue / 100;

    setCalculation(`${display} % =`);
    setDisplay(String(result).replace(".", ","));
    setIsNewEntry(true);
  };

  const handleSquare = () => {
    const currentValue = Number(display.replace(",", "."));
    const result = currentValue ** 2; // hitung perpangkat atau mengalikan angka dengan dirinya sendiri

    setCalculation(`${display}² =`);
    setDisplay(String(result).replace(".", ","));
    setIsNewEntry(true);
  };

  const handleSqueareRoot = () => {
    const currentValue = Number(display.replace(",", "."));

    if (currentValue < 0) {
      setDisplay("Invalid inut");
      return;
    }

    const result = Math.sqrt(currentValue);

    setCalculation(`√(${display}) =`);
    setDisplay(String(result).replace(".", ","));
    setIsNewEntry(true);
  };

  const buttons = [
    { label: "%", type: "operator" },
    { label: "CE", type: "function" }, // hapus angka yg sedang dimasukkan
    { label: "C", type: "function" }, // hapus seluruh perhitungan saat ini dan return ke 0
    { label: "⌫", type: "function", icon: <FiDelete /> }, // hapus satu karakter terakhir
    { label: "¹/ₓ", type: "operator" },
    { label: "x²", type: "operator" },
    { label: "²√x", type: "operator" },
    { label: "÷", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "x", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "+/-", type: "function" },
    { label: "0", type: "number" },
    { label: ",", type: "decimal" }, // bisa bedain tombol angka biasa dari desimal
    { label: "=", type: "equals" },
  ];

  return (
    <div className="standard-container">
      <div className="calc-main-section">
        <div className="calc-display">
          {/* <strong>{firstOperand !== null && operator !== null
              ? `${firstOperand} ${operator === "*" ? "x" : operator === "/" ? "÷" : operator}`
              : ""} </strong>*/}
          {calculation && <strong>{calculation}</strong>}
          <h1>{display}</h1>
        </div>

        <div className="memory-bar">
          <span className="mem-item">MC</span>
          <span className="mem-item">MR</span>
          <span className="mem-item">M+</span>
          <span className="mem-item">M-</span>
          <span className="mem-item">MS</span>
        </div>

        <div className="calc-keypad">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`calc-button ${button.type === "equals" ? "button-equals" : ""} ${
                button.type === "operator" ? "button-operator" : ""
              }`}
              onClick={
                button.type === "number"
                  ? () => handleNumber(button.label)
                  : button.type === "decimal"
                    ? handleDesimal
                    : button.label === "C"
                      ? handleClear
                      : button.label === "CE"
                        ? handleClearEntry
                        : button.label === "⌫"
                          ? handleBackSpace
                          : button.label === "+/-"
                            ? handleInvertSign
                            : ["+", "-", "x", "÷"].includes(button.label)
                              ? () =>
                                  handleOperator(
                                    button.label === "x"
                                      ? "*"
                                      : button.label === "÷"
                                        ? "/"
                                        : button.label,
                                  )
                              : button.type === "equals"
                                ? handleCalculate
                                : button.label === "%"
                                  ? handlePrcent
                                  : button.label === "x²"
                                    ? handleSquare
                                    : button.label === "²√x"
                                      ? handleSqueareRoot
                                      : undefined
              }
            >
              {button.icon || button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-sidebar-panel">
        <div className="panel-tabs">
          <button
            className={`panel-tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`panel-tab ${activeTab === "memory" ? "active" : ""}`}
            onClick={() => setActiveTab("memory")}
          >
            Memory
          </button>
        </div>
        <div className="panel-content">
          {activeTab === "history" ? (
            <p className="no-history">There's no history yet.</p>
          ) : (
            <p className="no-history">There's nothing saved in memory.</p>
          )}
        </div>
      </div>

      {/* <div className="calc-sidebar-panel">
        <div className="panel-content">
          <p className="no-history">There's no history yet.</p>
        </div>
      </div> */}
    </div>
  );
};

export default StandardPage;
