const router = require('express').Router();

const PaperService = require('../services/paper.service');

router.post("/upload/", async (req, res) => {
    var paperHash = await PaperService.createPaper(req.user.email, req.user.account, req.body.password, req.body.title, req.files.file);
    if (paperHash) {
        res.status(200).json({
            code: "success", 
            msg: paperHash
        });
    } else {
        res.status(500).json({
            code: "failure",
            msg: "File upload failed."
        });
    }
});

router.get("/", async (req, res) => {
    try {
        var papers = await PaperService.getAllPapers(req.user.email);
        if (papers && papers.length !== 0) {
            res.status(200).json(papers);
        } else {
            res.status(404).json({
                error: "Unable to retreive papers for given user."
            })
        }    
    } catch (err) {
        res.status(500).json({
            error: "Fatal error"
        });
        console.log(err);
    }
})

router.get("/details/:id", async (req, res) => {
    var paperLocation = 'http://' + process.env.IPFS_HOST + ':8080/ipfs/' + req.params.id; 
    var paperOwner = await PaperService.getPaperOwner(req.params.id);
    var paperAuthor = await PaperService.getPaperAuthor(req.params.id);
    var paperStatus = await PaperService.getPaperStatus(req.params.id);
    var paperRating = await PaperService.getPaperRating(req.params.id);
    var paperReviewers = await PaperService.getPaperReviewers(req.params.id);
    var paperTitle = await PaperService.getPaperTitle(req.params.id);
    if (paperStatus !== null) {
        res.status(200).json({
            code: "success", 
            paper: {
                location: paperLocation,
                title: paperTitle,
                owner: paperOwner,
                author: paperAuthor,
                status: paperStatus,
                rating: paperRating,
                reviewers: paperReviewers,
            }
        });
    } else {
        res.status(500).json({
            code: "failure",
            msg: "Failed to retrieve paper status."
        });
    }
});

module.exports = router;