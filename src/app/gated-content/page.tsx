import { cookies } from "next/headers";
import { thirdwebAuth } from "../utils/twAuth";
import { hasAccess } from "../actions/condition";

export default async function GatedPage(){
    const jwt = cookies().get('jwt');

    if(!jwt?.value){
        return <MustLogin />
    }
    const authResult = await thirdwebAuth.verifyJWT({
        jwt: jwt.value,
    });

    if(!authResult.valid){
        return <MustLogin />
    }
    const address = authResult.parsedJWT.sub;

    if(!address){
        throw new Error("No address Found");
    }
    const _hasAccess = await hasAccess(address);
    
    if(!_hasAccess){
        return <NotAllowed />
    }

    return <GatedPage />
}

const MustLogin = ()=>{
    return (
        <div className="flex flex-col min-h-[100vh] items-center justify-center p-4 text-center">
            <p>You are not logged in</p>
            <link href="/">
                <button className="mt-4 bg-zinc-100 text-black px-4 py-2 rounded-md">GO to Login</button>
            </link>
        </div>
    )
}

const NotAllowed = ()=>{
    return(
        <div className="flex flex-col min-h-[100vh] items-center justify-center p-4 text-center">
            <p>you do not own the access NFT</p>
            <link href="/">
                <button className="mt-4 bg-zinc-100 text-black px-4 py-2 rounded-md">GO to login</button>
            </link>
            <link href="/claim-nft">
                <button className="mt-4 bg-zinc-100 text-black px-4 py-2 rounded-md">Claim NFT</button>
            </link>
        </div>
    )
}