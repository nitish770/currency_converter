import axios from "axios";
import React, { useEffect, useState } from "react";

const Currency = () => {
  const [exchangerate, setExchangerate] = useState({});
  const [amount, setAmount] = useState(1);
  const [formCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const api = `https://api.exchangerate-api.com/v4/latest/${formCurrency}`;
    axios
      .get(api)
      .then((response) => {
        setExchangerate(response.data.rates);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  }, [formCurrency]);

  useEffect(() => {
    const conversionrate = exchangerate[toCurrency];
    console.log(conversionrate);
    if (conversionrate) {
      const converted = amount * conversionrate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, formCurrency, toCurrency, exchangerate]);

  const handelInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        setAmount(value);
        break;
      case "formCurrency":
        setFromCurrency(value);
        break;
      case "toCurrency":
        setToCurrency(value);
        break;
      default:
    //     break;
    }
    // console.log(name, value);
  };

  return (
    <>
      <div className="main">
        <div className="card">
          <img
            src="https://ps.w.org/currency-exchange-for-woocommerce/assets/icon-256x256.gif?rev=2776477"
            alt="lg"
          />
          <h1 className="text-6xl">Currency Converter</h1>
          {/* Wrapper */}
          <div className="currency_exchange">
            {/* input container 1*/}
            <div className="input_container">
              <label className="input_label">Amount:</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={handelInput}
                className="input_field"
              />
            </div>

            {/* input container with select 2*/}
            <div className="input_container">
              <label className="input_label">From Currency:</label>
              <select
                name="formCurrency"
                value={formCurrency}
                onChange={handelInput}
                className="input_field"
              >
                {Object.keys(exchangerate).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* input container with select 3*/}
            <div className="input_container">
              <label className="input_label">To Currency:</label>
              <select
                name="toCurrency"
                value={toCurrency}
                onChange={handelInput}
                className="input_field"
              >
                {Object.keys(exchangerate).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="output">
            <h2>
              Total Amount: <b>{convertedAmount}</b>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
