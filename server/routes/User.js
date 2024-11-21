import express from "express";
import { UserRegister , UserLogin} from "../controllers/User.js";
 import { getAllFeedbacks, getUserFeedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    upvoteFeedback, } from "../controllers/Feedback.js"; 



const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);


router.get('/', getAllFeedbacks);
router.get('/my', getUserFeedbacks);

router.post('/', addFeedback);
router.put('/:id', updateFeedback);

router.delete('/:id', deleteFeedback);
router.put('/:id/vote', upvoteFeedback);


export default router;