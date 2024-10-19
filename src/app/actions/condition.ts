import { defineChain, getContract } from "thirdweb";
import { client } from "../client";
import { balanceOf } from "thirdweb/extensions/erc1155";
import { add } from "thirdweb/extensions/thirdweb";

export async function hasAccess(
    address: string,
) : Promise<boolean> {
    const quantityRequired = 1n;

    const contract = getContract({
        client: client,
        chain: defineChain(1320),
        address: "0x9D99657d005E5fa30F39cDC88A83f282758adc81",
    });

    const ownedBalance = await balanceOf({
        contract: contract,
        owner: address,
        tokenId: 1n,
    });

    return ownedBalance >= quantityRequired;
}