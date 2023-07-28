import { useState } from "react";
import Padlock from "./assets/Padlock.svg";
import vector from "./assets/Vector (1).svg";

const characters = {
  lowerCase: "abcdefghijklmnopqrstuvwsyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "1234567890",
  specialCharacters: "!@#$%^&*",
};

function App() {
  const [pwdLength, setPwdLength] = useState(8);
  const [constraints, setContraints] = useState({
    upperCase: true,
    lowerCase: false,
    numbers: true,
    specialCharacters: false,
  });
  const [password, setPassword] = useState("ADSRTUJ8");

  function getPwdString() {
    let str = "";
    let index = 0;

    const constraintsToUseArr = Object.entries(constraints)
      .filter((value) => value[1])
      .map((value) => value[0]);

    if (Array.isArray(constraintsToUseArr)) {
      for (let i = 0; i < pwdLength; i++) {
        if (index > constraintsToUseArr.length - 1) index = 0;
        const char = characters[constraintsToUseArr[index]];
        const start = Math.floor(Math.random() * char.length);
        str += char.slice(start, start + 1);
        index++;
      }
    }

    return str;
  }

  function generatePassword() {
    const pwd = randomize(getPwdString());
    return typeof pwd === "string" ? pwd : "";
  }

  function randomize(pwd) {
    const sortFn = () => (Math.round(Math.random()) > 0.5 ? 1 : -1);
    if (Array.isArray(pwd)) return pwd.sort(sortFn);
    return pwd.split("").sort(sortFn).join("");
  }

  function refreshPassword() {
    setPassword(generatePassword());
  }

  function handleConstraints(value) {
    setContraints((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }

  return (
    <div className=" w-[35rem] border-2 rounded-md p-8 my-20 bg-white text-[#333333] text-base font-[Montserrat] font-medium">
      <div className="text-center mb-4">
        <div className="mb-4 flex justify-center">
          <img src={Padlock} alt="" />
        </div>
        <h1 className="font-[Raleway] text-4xl ">Password Generator</h1>
        <p>Create strong and secure password to secure your account online</p>
      </div>
      <div className="flex justify-between mb-6">
        <div className="grow">
          <div className="flex justify-between border border-[#bdbdbd]  rounded-2xl p-2">
            <p className="grow font-bold">{password}</p>
            <button onClick={refreshPassword} type="button">
              <img className="w-6" src={vector} alt="copy" />
            </button>
          </div>
          <p>weak</p>
        </div>
        <div>
          <button className="bg-[#64cacc] font-bold mx-4 rounded-2xl py-2 px-4">
            copy
          </button>
        </div>
      </div>
      <p>Password Length: {pwdLength}</p>
      <input
        className="w-full text-[#64cacc]"
        type="range"
        min="0"
        max="20"
        value={pwdLength}
        onChange={(e) => setPwdLength(Number(e.target.value))}
        name="password length"
      />
      <div>
        <div className="flex justify-between">
          <p>Uppercase</p>
          <input
            checked={constraints.upperCase}
            onChange={() => handleConstraints("upperCase")}
            type="checkbox"
            name="uppercase"
          ></input>
        </div>
        <div className="flex justify-between">
          <p>Lowercase</p>
          <input
            checked={constraints.lowerCase}
            onChange={() => handleConstraints("lowerCase")}
            type="checkbox"
            name="lowercase"
          ></input>
        </div>
        <div className="flex justify-between">
          <p>Numbers</p>
          <input
            checked={constraints.numbers}
            onChange={() => handleConstraints("numbers")}
            type="checkbox"
            name="numbers"
          ></input>
        </div>
        <div className="flex justify-between">
          <p>Special characters</p>
          <input
            checked={constraints.specialCharacters}
            onChange={() => handleConstraints("specialCharacters")}
            type="checkbox"
            name="special characters"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
