pragma solidity ^0.5.0;

contract ReviewerContract {
    struct Review {
        bool hasReviewed;
        uint rating;
    }

    struct Reviewer {
        uint credibility;
        mapping(string => Review) reviews;
    }

    mapping(address => Reviewer) private reviewers;

    function getReview(address id, string memory s) public view returns (uint) {
        return reviewers[id].reviews[s].rating;
    }

    function addReview(address id, string memory s, uint r) public {
        require(!reviewers[id].reviews[s].hasReviewed, "Reviewer has already reviewed this paper.");
        reviewers[id].reviews[s].rating = r;
        reviewers[id].reviews[s].hasReviewed = true;
    }

    function hasReviewed(address id, string memory s) public view returns (bool) {
        return reviewers[id].reviews[s].hasReviewed;
    }

    function getCredibility(address id) public view returns (uint) {
        return reviewers[id].credibility;
    }

    function setCredibility(address id, uint credibility) public {
        reviewers[id].credibility = credibility;
    }
}