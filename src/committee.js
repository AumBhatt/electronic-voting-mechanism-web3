import createContractInstance from "./interact.js";
if(typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const {contract, accounts} = await createContractInstance();
const memberName = await contract.methods.getCommitteeMemberName().call({from: accounts[0]});
$("#account").html(memberName)
console.log(memberName)
$.style.display = "none";

checkIfCommitteeMember().then(
    (isMember) => {
        console.log(isMember)
        if(!isMember) {
            alert("You are not authorized to visit his page.");
            window.location = "/";
        }
        else 
            $.style.display = "block";
            renderCandidates()
    }
);

async function checkIfCommitteeMember() {
    return await contract.methods.isCommitteeMember().call({from: accounts[0]})
}

document.getElementById("newCandidateForm").addEventListener("click", () => {
    var name = document.getElementById("newCandidateName").value;
    if(name !== undefined) {
        console.log("Requesting to add " + name);
        (async function(){
            return await contract.methods.addCandidate(name).send({from: accounts[0]});
        })().then((e) => {
            console.log(e)
            document.getElementById("newCandidateName").value = "";
            renderCandidates();
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