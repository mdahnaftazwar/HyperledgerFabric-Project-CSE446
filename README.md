# Decentralized Enterprise Identity & Access Registry - Lab Project

**Course:** CSE446: Blockchain and Cryptocurrencies  
**Semester:** Summer 2026  
**Institution:** BRAC University  

---

## Project Overview
This repository contains the official lab project implementation for the CSE446: Blockchain and Cryptocurrencies course. This project transforms the standard Hyperledger Fabric "FabCar" boilerplate into a fully functional **Decentralized Enterprise Identity & Access Registry**. 

The application utilizes a permissioned blockchain network to securely issue, track, and update employee identities, departments, roles, and security clearance statuses. It features a robust three-tier architecture including a JavaScript chaincode smart contract, an Express.js RESTful API backend, and a responsive frontend dashboard. Additionally, the network integrates CouchDB to enable advanced "rich queries," allowing administrators to dynamically filter ledger records by department or clearance status rather than just unique IDs.

## Group 04 Members

| Name | Student ID |
| :--- | :---: |
| **Md Ahnaf Tazwar** | `23201258` |
| **Mahin Khondoker** | `23201250` |
| **Md. Nurul Asif** | `23201489` |
| **Mohammad Mehedi Hasan** | `22101384` |

---

## Tech Stack

### Smart Contract / Blockchain Layer
* **Hyperledger Fabric** (v2.5.16)
* **Fabric Chaincode** (JavaScript / Node.js)
* **CouchDB** (State Database for Rich Queries)
* **Docker & Docker Compose** (Network Infrastructure)

### Backend API Layer
* **Node.js**
* **Express.js** (REST API Routing)
* **Fabric Network SDK** (`fabric-network` package)

### Frontend Layer
* **HTML5**
* **CSS3**
* **Vanilla JavaScript**
* **Fetch API** (Client-to-Server Communication)

Last updated: 01st September, 2026