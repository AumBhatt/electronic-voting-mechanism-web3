import {createContractInstance, getCandidatesList} from "./interact.js";
if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

async function addCandidate() {
    const {contract, accounts} = await createContractInstance();
    const name = await contract.methods.getCommiteeMemberName().call({from: accounts[0]})
    const candidatesList = await getCandidatesList();
    $('#account').html(name);
    return name;
}

addCandidate()