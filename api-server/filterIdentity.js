/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function main( params ) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get('appUser');
        if (!identity) {
            throw new Error('An identity for the user "appUser" does not exist in the wallet. Run registerUser.js');
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcar');

        // Extracting the filter type and value from the frontend request
        const filterType = params.filterType;   // e.g., 'department' or 'clearance_status'
        const filterValue = params.filterValue; // e.g., 'IT' or 'Active'

        // Evaluate the new CouchDB rich query transaction
        const result = await contract.evaluateTransaction('queryIdentitiesByFilter', `${ filterType }`, `${ filterValue }`);
        
        await gateway.disconnect();
        return result.toString();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error;
    }
}

module.exports = { main }