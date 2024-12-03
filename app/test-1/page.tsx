'use client';
import React from 'react'
import keccak256 from 'keccak256';
import EthCrypto from 'eth-crypto';

const page = () => {
    const hash = keccak256((Buffer.from("atan")));
    const atan = keccak256("atan").toString("base64")
    

    const identity = EthCrypto.createIdentity();

    console.dir(identity);

    return (
        <div>
            <h1>Hello World</h1>
            <p>{keccak256("atan")}</p>
            <p>{hash}</p>
            <p>{atan}</p>
        </div>
    )
}

export default page