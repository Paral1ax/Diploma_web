import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const SolanaWalletButton = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
    return (
    	<div>
            <WalletMultiButton />
        </div>
    )
}

export default SolanaWalletButton