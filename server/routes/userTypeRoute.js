import express from 'express';

import NGO from '../models/Ngomodels.js';
import User from '../models/Usermoder.js';

const router = express.Router();

router.post('/changeUserType', async (req, res) => {
    const { userMail } = req.body;

    if (!userMail) {
        return res.status(400).json({ message: 'Required field userMail is missing.' });
    }

    try {

        const updatedUser = await User.findOneAndUpdate(
            { userMail: userMail },
            { $set: { userType: 'ngo' } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log("User updated:", updatedUser);


        const deletedNGO = await NGO.findOneAndDelete({ userMail: userMail });

        if (!deletedNGO) {
            console.log('No corresponding NGO record found to delete.');
        } else {
            console.log("NGO record deleted:", deletedNGO);
        }

     
        res.status(200).json({
            message: 'User type changed to NGO and corresponding NGO record deleted successfully.',
            updatedUser,
            deletedNGO
        });

    } catch (error) {
        console.error('Error in /changeUserType route:', error);
        res.status(500).json({ message: 'An error occurred during the operation.' });
    }
});

export default router;
