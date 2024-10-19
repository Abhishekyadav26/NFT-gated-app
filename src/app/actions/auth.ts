"use server";

import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { thirdwebAuth } from "../utils/twAuth";
import { cookies } from "next/headers";

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(
    payload: VerifyLoginPayloadParams
){
    const VerifyLoginPayload = await thirdwebAuth.verifyPayload(payload);
    if(VerifyLoginPayload.valid){
        const jwt = await thirdwebAuth.generateJWT({
            payload: VerifyLoginPayload.payload,
        });
        cookies().set('jwt', jwt);
    }
}

export async function isLoggedIn(){
    const jwt = cookies().get('jwt');
    if(!jwt?.value){
        return false;
    }

    const authResult = await thirdwebAuth.verifyJWT({
        jwt: jwt.value,
    });

    if(!authResult){
        return false;
    }
    return true;
}

export async function logout(){
    cookies().delete('jwt');
}