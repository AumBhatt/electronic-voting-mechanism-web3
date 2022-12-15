// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.6.0;

contract Election {

  //Structure of candidate standing in the election
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }
  struct Committee {
    string name;
    bool exists;
  }

  //Storing candidates in a map
  mapping(uint => Candidate) public candidates;

  //Storing address of those voters who already voted
  mapping(address => bool) public voters;


  mapping(address => Committee) private committee;


  //Number of candidates in standing in the election
  uint public candidatesCount;

  //Adding 2 candidates during the deployment of contract
  constructor () public {
    candidates[++candidatesCount] = Candidate(candidatesCount, "Candidate 1", 0);
    candidates[++candidatesCount] = Candidate(candidatesCount, "Candidate 2", 0);
    candidates[++candidatesCount] = Candidate(candidatesCount, "Candidate 3", 0);
    committee[0x75b7779C0e422a662E1fF5a68fC06C88B9FcB351] = Committee("Aum", true);
    committee[0xb478fe17Ba7Fc62B1D9878549B579bC41418CBDF] = Committee("Adeeb", true);
    committee[0xFCec79263448E5aC1938d19879719786fb4De6a8] = Committee("Tafveez", true);
  }

  //Private function to add a candidate
  function addCandidate (string memory _name) public returns (string memory){
      if(isCommitteeMember() == true) {
        candidates[++candidatesCount] = Candidate(candidatesCount, _name, 0);
        return candidates[candidatesCount].name;
      }
      return "Failed to add.";
  }

  function getCandidate (uint n) public view returns (uint, string memory, uint){
      return (candidates[n].id, candidates[n].name, candidates[n].voteCount);
  }

  function isCommitteeMember () public view returns(bool) {
      if(committee[msg.sender].exists) {
          return true;
      }
      else return false;
  }

  function getCommitteeMemberName () public view returns(string memory) {
    if(isCommitteeMember() == true) {
        return committee[msg.sender].name;
      }
      return "no name";
  }

  //Public vote function for voting a candidate
  function vote (uint _candidate) public {
    require(!voters[msg.sender], "Voter has already Voted!");
    require(_candidate <= candidatesCount && _candidate >= 1, "Invalid candidate to Vote!");
    voters[msg.sender] = true;
    candidates[_candidate].voteCount++;
  }
}