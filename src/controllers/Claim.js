"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claim = void 0;
const ethers_1 = require("ethers");
const User_1 = require("../models/User");
const Things_1 = require("../models/Things");
const rpc = process.env.RPC_URL;
const abi = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "unpause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_txFee", type: "uint256" },
            { name: "_burnFee", type: "uint256" },
            { name: "_wMaxHolding", type: "uint256" },
            { name: "_FeeAddress", type: "address" },
        ],
        name: "updateFee",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "account", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "_value", type: "uint256" }],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "paused",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_subtractedValue", type: "uint256" },
        ],
        name: "decreaseApproval",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "listAddress", type: "address" },
            { name: "isBlackListed", type: "bool" },
        ],
        name: "blackListAddress",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "FeeAddress",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "pause",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "listAddress", type: "address" },
            { name: "isWhiteListed", type: "bool" },
        ],
        name: "whiteListAddress",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "x", type: "uint256" },
            { name: "y", type: "uint256" },
            { name: "z", type: "uint256" },
        ],
        name: "mulDiv",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "txFee",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_spender", type: "address" },
            { name: "_addedValue", type: "uint256" },
        ],
        name: "increaseApproval",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "wMaxHolding",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "burnFee",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { name: "_name", type: "string" },
            { name: "_symbol", type: "string" },
            { name: "_decimals", type: "uint256" },
            { name: "_supply", type: "uint256" },
            { name: "_txFee", type: "uint256" },
            { name: "_burnFee", type: "uint256" },
            { name: "_wMaxHolding", type: "uint256" },
            { name: "_FeeAddress", type: "address" },
            { name: "tokenOwner", type: "address" },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Mint",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "burner", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Burn",
        type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "previousOwner", type: "address" },
            { indexed: true, name: "newOwner", type: "address" },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "blackListed", type: "address" },
            { indexed: false, name: "value", type: "bool" },
        ],
        name: "Blacklist",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "whiteListed", type: "address" },
            { indexed: false, name: "value", type: "bool" },
        ],
        name: "Whitelist",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
];
const claim = async (req, res) => {
    console.log(rpc);
    const { user, address } = req.body;
    console.log("claim", user, address);
    try {
        const userData = await User_1.User.findOne({ tg_id: user });
        if (!userData) {
            return res
                .status(404)
                .json({ status: "error", message: "User not found" });
        }
        //TODO: check user's Ocicat balance
        if (!rpc) {
            return res.status(500).json({ error: "RPC URL is not set" });
        }
        const provider = new ethers_1.ethers.WebSocketProvider(rpc);
        const balance = await provider.getBalance(address);
        const token_address = process.env.TOKEN_ADDRESS;
        if (!token_address) {
            return res.status(500).json({ error: "Token address is not set" });
        }
        // get the balance of the token of the user
        const tokenContract = new ethers_1.ethers.Contract(token_address, abi, provider);
        const tokenBalance = await tokenContract.balanceOf(address);
        // get the limit of the token
        const things = await Things_1.Things.findOne();
        if (!things) {
            // create a new limit of 100
            await Things_1.Things.create({ limit: 100 });
            return res.status(500).json({ error: "Limit is not set" });
        }
        if (tokenBalance < things.limit) {
            return res.status(500).json({ error: "Not enough token balance" });
        }
        // TODO: Send token to user's address
        // add to user odp
        userData.odp += 1;
        await userData.save();
        res.json({
            status: "success",
            message: "Claimed successfully",
            user: userData,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.claim = claim;
