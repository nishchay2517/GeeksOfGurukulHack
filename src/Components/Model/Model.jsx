import React, { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import {contractAddress , contractABI} from "../../Context/constants"
import Style from './Model.module.css'; 

const StudentLoan = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [loanData, setLoanData] = useState({
        principalAmount: "",
        annualInterestRate: "",
        incomeSharePercentage: "",
        repaymentDurationMonths: "",
        gracePeriodMonths: "",
    });
    const [loanStatus, setLoanStatus] = useState('');

    useEffect(() => {
        const init = async () => {

            const provider = await new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await new ethers.Contract(contractAddress, contractABI, signer);
            setProvider(provider);
            setSigner(signer);
            setContract(contract);

            const accounts = await provider.listAccounts();
            setAccount(accounts[0]);
        };
        init();
    }, []);

    const requestLoan = async () => {
        const { principalAmount, annualInterestRate, incomeSharePercentage, repaymentDurationMonths, gracePeriodMonths } = loanData;
        try {
            await contract.requestLoan(
                principalAmount,
                annualInterestRate,
                incomeSharePercentage,
                repaymentDurationMonths,
                gracePeriodMonths
            );
        } catch (error) {
            console.error(error);
        }
    };

    const approveLoan = async () => {
        try {
            await contract.approveLoan();
        } catch (error) {
            console.error(error);
        }
    };

    const cancelLoanRequest = async () => {
        try {
            await contract.cancelLoanRequest();
        } catch (error) {
            console.error(error);
        }
    };

    const makePayment = async (amount) => {
        try {
            await contract.makePayment({
                amount
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={Style.container}>
            <h1 className="text-2xl font-bold mb-4">Student Loan Management</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Request Loan</h2>
                <input
                    type="number"
                    placeholder="Principal Amount"
                    value={loanData.principalAmount}
                    onChange={(e) => setLoanData({ ...loanData, principalAmount: e.target.value })}
                    className="border p-2 mb-2 w-half"
                />
                <input
                    type="number"
                    placeholder="Annual Interest Rate"
                    value={loanData.annualInterestRate}
                    onChange={(e) => setLoanData({ ...loanData, annualInterestRate: e.target.value })}
                    className="border p-2 mb-2 w-half"
                />
                <input
                    type="number"
                    placeholder="Income Share Percentage"
                    value={loanData.incomeSharePercentage}
                    onChange={(e) => setLoanData({ ...loanData, incomeSharePercentage: e.target.value })}
                    className="border p-2 mb-2 w-half"
                />
                <input
                    type="number"
                    placeholder="Repayment Duration (months)"
                    value={loanData.repaymentDurationMonths}
                    onChange={(e) => setLoanData({ ...loanData, repaymentDurationMonths: e.target.value })}
                    className="border p-2 mb-2 w-half"
                />
                <input
                    type="number"
                    placeholder="Grace Period (months)"
                    value={loanData.gracePeriodMonths}
                    onChange={(e) => setLoanData({ ...loanData, gracePeriodMonths: e.target.value })}
                    className="border p-2 mb-2 w-half"
                />
                <button
                    onClick={requestLoan}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Request Loan
                </button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Actions (approval can be done by owner only)</h2>
                <button
                    onClick={approveLoan}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                >
                    Approve Loan
                </button>
                <button
                    onClick={cancelLoanRequest}
                    className="bg-red-500 text-white p-2 rounded"
                >
                    Cancel Loan Request
                </button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Make Payment (only by Student)</h2>
                <input
                    type="number"
                    placeholder="Payment Amount"
                    className="border p-2 mb-2 w-half"
                />
                <button
                    onClick={(e) => makePayment(e.target.previousElementSibling.value)}
                    className="bg-yellow-500 text-white p-2 rounded"
                >
                    Make Payment
                </button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Loan Status</h2>
                <p>{loanStatus}</p>
            </div>
        </div>
    );
};

export default StudentLoan;

