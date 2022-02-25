import { degenIdArray, nyxIdArray } from "src/constants/familyArrays";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";

export type NFTNameTypes = "Nyx" | "D3gen" | "Codex" | "";

const extractNftId = (title: string) => {
  return Number(title.replace("Dark Terminal Hacker #", ""));
};

const bindNftName = (nft: ITokenCustomEntry) => {
  const { typeId } = nft;
  if (!typeId) {
    return "";
  }
  switch (true) {
    case nyxIdArray.includes(typeId):
      return "Nyx";

    case degenIdArray.includes(typeId):
      return "D3gen";

    default:
      return "Codex";
  }
};

const bindNftClaimValue = (nft: ITokenCustomEntry) => {
  const { name } = nft;
  switch (true) {
    case name === "Nyx":
      return 1.045;
    case name === "D3gen":
      return 0.082;
    default:
      return 0.070;
  }
};

const massExtractNftIds = (items: ITokenCustomEntry[]) => {
  return items.map((item) => {
    item.typeId = extractNftId(item.data.name);
    item.name = bindNftName(item);
    item.solRedeemValue = bindNftClaimValue(item);
    item.dtacRedeemValue = 3500.0;
    return item;
  });
};

export { massExtractNftIds };
