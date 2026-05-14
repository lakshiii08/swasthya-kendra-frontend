"use client";

import { useState } from "react";

export default function WalletConnect() {

  const [wallet, setWallet] =
    useState("");

  const connectWallet =
    async () => {

      try {

        if (!window.ethereum) {

          alert("Install MetaMask");

          return;
        }

        const accounts =
          await window.ethereum.request({
            method: "eth_requestAccounts",
          });

        setWallet(accounts[0]);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div>

      <button
        onClick={connectWallet}
        className="
          px-6 py-3
          bg-black
          text-white
          rounded-xl
          font-bold
          hover:scale-105
          transition-all
          duration-300
        "
      >

        Connect Wallet

      </button>

      {wallet && (

        <p
          className="
            mt-4
            text-sm
            break-all
            text-slate-700
          "
        >

          {wallet}

        </p>

      )}

    </div>
  );
}