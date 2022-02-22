import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";

export interface ITokenCustomEntry {
  mint: string;
  updateAuthority: string;
  data: {
    creators: any[];
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
  };
  key: MetadataKey;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  masterEdition?: string | undefined;
  edition?: string | undefined;
  image?: string;
}

export interface IDarkTerminalClass {
  connection: Connection;
  hasToken: (walletPublicKey: PublicKey, mintId: PublicKey) => Promise<boolean>;
  getNFTs: (
    walletPublicKey: string,
    updateAuthority: string,
    symbol: string
  ) => Promise<ITokenCustomEntry[]>;
  transferNft: (
    mint: PublicKey,
    wallet: any,
    stakingAccount: PublicKey
  ) => Promise<string>;
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

  async getNFTs(
    walletPublicKey: string,
    _updateAuthority: string,
    symbol: string
  ) {
    const allTokens: ITokenCustomEntry[] = await getParsedNftAccountsByOwner({
      publicAddress: walletPublicKey,
      connection: this.connection,
    });

    for (let i = 0; i < allTokens.length; i++) {
      const token: ITokenCustomEntry = allTokens[i];
      const result = await fetch(token.data.uri);
      const metadata = await result.json();
      token.image = metadata.image;
      allTokens[i] = token;
    }

    return allTokens.filter((token: ITokenCustomEntry) => {
      if (
        // token.updateAuthority === updateAuthority &&
        token.data.symbol === symbol
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  async transferNft(mint: PublicKey, wallet: any, stakingAccount: PublicKey) {
    var myToken = new splToken.Token(
      this.connection,
      mint,
      splToken.TOKEN_PROGRAM_ID,
      wallet
    );

    // Create associated token accounts for my token if they don't exist yet
    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    );

    var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      stakingAccount
    );

    const transaction = new Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        wallet.publicKey,
        [],
        1
      )
    );

    transaction.recentBlockhash = (
      await this.connection.getRecentBlockhash()
    ).blockhash;
    transaction.feePayer = wallet.publicKey;

    await wallet.signTransaction(transaction);

    const transactionId = await wallet.sendTransaction(
      transaction,
      this.connection
    );

    return transactionId;
  }
}
