const DefaultNetwork = Number(4);//<---- this is the rinkeby network
const chainIdToHexString = (chain_id) => {
    return '0x' + chain_id.toString(16);
};
//This is Rinkeby network
const networkInfo = [
    {
        name: 'Rinkeby Test Network',
        label: 'Rinkeby Test Network',
        icon: '/img/coin/ethereum.png',
        chainId: 4, //'0x4',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrl: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        explorer: ['https://rinkeby.etherscan.io'],
    },
];

export const changeNetwork = async () => {
    const wa = window;
    const ethereum = wa.ethereum;
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
        });
    } catch (switchError) {
        const error = JSON.parse(JSON.stringify(switchError));
        console.log(error.code)
        if (
            error.code === 4902 ||
            (error.code === -32603 && error?.data?.originalError.code === 4902)
        ) {
            try {
                const item = networkInfo.filter(x => x.chainId === DefaultNetwork)[0];
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainIdToHexString(DefaultNetwork),
                            chainName: item.label,
                            rpcUrls: item.rpcUrl,
                            nativeCurrency: item.nativeCurrency,
                            blockExplorerUrls: item.explorer,
                        },
                    ],
                });
                console.log('done');
            } catch (addError) {
                console.log('addError', addError);
            }
        }
    }
};