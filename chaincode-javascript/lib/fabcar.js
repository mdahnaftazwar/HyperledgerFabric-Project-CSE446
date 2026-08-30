/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const identities = [
            {
                department: 'HR',
                role: 'Manager',
                employee_name: 'Alice Johnson',
                clearance_status: 'Active',
            },
            {
                department: 'IT',
                role: 'System Admin',
                employee_name: 'Bob Smith',
                clearance_status: 'Active',
            },
            {
                department: 'Finance',
                role: 'Analyst',
                employee_name: 'Charlie Davis',
                clearance_status: 'Suspended',
            },
            {
                department: 'IT',
                role: 'Developer',
                employee_name: 'Diana Prince',
                clearance_status: 'Active',
            }
        ];

        for (let i = 0; i < identities.length; i++) {
            identities[i].docType = 'identity';
            // Generating IDs in the requested format: EMP001, EMP002, etc.
            await ctx.stub.putState('EMP' + (i + 1).toString().padStart(3, '0'), Buffer.from(JSON.stringify(identities[i])));
            console.info('Added <--> ', identities[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryIdentity(ctx, id) {
        const identityAsBytes = await ctx.stub.getState(id); // get the identity from chaincode state
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(identityAsBytes.toString());
        return identityAsBytes.toString();
    }

    async createIdentity(ctx, id, department, role, employee_name, clearance_status) {
        console.info('============= START : Create Identity ===========');

        const identity = {
            department,
            role,
            employee_name,
            clearance_status,
            docType: 'identity', // Tracking document type as identity instead of car
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
        console.info('============= END : Create Identity ===========');
    }

    async queryAllIdentities(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async updateClearance(ctx, id, newClearanceStatus) {
        console.info('============= START : Update Clearance ===========');

        const identityAsBytes = await ctx.stub.getState(id); // get the identity from chaincode state
        if (!identityAsBytes || identityAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const identity = JSON.parse(identityAsBytes.toString());
        
        // Updating the clearance status parameter
        identity.clearance_status = newClearanceStatus;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
        console.info('============= END : Update Clearance ===========');
    }

}

module.exports = FabCar;