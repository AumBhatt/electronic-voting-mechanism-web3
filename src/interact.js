if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
    console.log("Connected to chain");
}

async function createContractInstance() {
    const ElectionContract = await $.getJSON('/electionJSON');
    var accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    var contractAddress = ElectionContract.networks[networkId].address;
    // console.log(contractAddress)

    var contract = await new web3.eth.Contract(
        ElectionContract.abi, contractAddress
    );

    // console.log(contractInstance.methods);
    return {contract, accounts};
}

async function getCandidatesList() {
    const {contract, accounts} = await createContractInstance();
    const candidatesCount = await contract.methods.candidatesCount().call({from: accounts[0]})
    const candidatesList = [];
    for(let i=1; i<=candidatesCount; ++i){
        var c = 
        candidatesList.push(c);
    }
    return candidatesList;
}

async function getCandidate(i, contract, account) {
    return await contract.methods.candidates(i).call({from: account});
}

export {createContractInstance, getCandidatesList};