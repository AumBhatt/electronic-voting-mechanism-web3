import {createContractInstance, getCandidatesList} from "./interact.js";
if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const {contract, accounts} = await createContractInstance();
const name = await contract.methods.getCommiteeMemberName().call({from: accounts[0]})
console.log(accounts)
$('#account').html(name);
$("#candidateResults").html("");

renderCandidates();

// function addCandidate(newCandidate) {
//     const status = contract.methods.addCandidate(newCandidate).call({from: accounts[0]});

//     return status;
// }

// addCandidate("Candidate 4").then(async (status) => {
//     console.log(status);
//     // const candidatesCount = await contract.methods.candidatesCount().call({from: accounts[0]})
    
//     renderCandidates();
// });

document.getElementById("newCandidateForm").addEventListener("click", () => {
    var name = document.getElementById("newCandidateName").value;
    if(name !== undefined) {
        console.log("Requesting to add " + name);
        (async function(){
            return await contract.methods.addCandidate(name).send({from: accounts[0]});
        })().then((e) => {
            console.log(e)
            setTimeout(() => {
                renderCandidates()
            }, 2000);
        });
    }
});

async function renderCandidates() {
    $("#candidateResults").html("");
    // var candidatesList = await getCandidatesList().then(val => {return val});
    const candidatesCount = await contract.methods.candidatesCount().call({from: accounts[0]})
    console.log(candidatesCount)
    for(let i=1; i<=candidatesCount; ++i){
        await (contract.methods.getCandidate(i).call({from: account[0]})).then((e) => {
            var candidateTemplate1 = "<tr>"+
            "<td>" + e[0] + "</td>" +
            "<td>" + e[1] + "</td>" +
            "<td>" + e[2] + "</td>" +
                    "</tr>";      
            $("#candidateResults").append(candidateTemplate1);
        });
        
    }
}