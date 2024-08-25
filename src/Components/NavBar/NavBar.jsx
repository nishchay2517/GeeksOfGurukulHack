import React, { useState } from 'react';
import Style from "./NavBar.module.css";
import { ethers } from 'ethers';

const Navbar = () => {
    const [account, setAccount] = useState(null);

    const connectMetaMask = async () => {
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]); // Set the first account in the state
          } catch (error) {
            console.error('User rejected the request.');
          }
        } else {
          console.error('MetaMask is not installed!');
        }
      };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button className={Style.Connect_btn} onClick={connectMetaMask}>
                        <span>{account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}</span>
            </button>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
