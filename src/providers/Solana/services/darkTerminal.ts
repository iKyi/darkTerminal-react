import { Connection, PublicKey } from "@solana/web3.js";

export interface IDarkTerminalClass {
  connection: Connection;
  hasToken: (walletPublicKey: PublicKey, mintId: PublicKey) => Promise<boolean>;
}

export default class darkTerminal implements IDarkTerminalClass {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async hasToken(walletPublicKey: PublicKey, mintId: PublicKey) {
    const tokenAccounts = await this.connection.getTokenAccountsByOwner(
      walletPublicKey,
      {
        mint: mintId,
      }
    );

    for (let i = 0; i < tokenAccounts.value.length; i++) {
      let tokenAccount = tokenAccounts.value[i];
      let accountInfo = await this.connection.getParsedAccountInfo(
        tokenAccount.pubkey
      );

      if (
        (accountInfo as any)?.value?.data?.parsed?.info.mint ===
        mintId.toBase58()
      ) {
        if (
          (accountInfo as any).value.data.parsed.info.tokenAmount.amount > 0
        ) {
          return true;
        }
      }
    }

    return false;
  }
}
