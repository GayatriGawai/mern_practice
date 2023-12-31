const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Posts');
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//@route     GET api/profile/me
//@desc      Get current user profile
//@access    Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//@route     POST api/profile
//@desc      Create or update a user profile
//@access    Private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills are required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills
                .split(',')
                .map((skill) => skill.trim());
        }

        //Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (website) profileFields.social.website = website;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    {
                        user: req.user.id,
                    },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//@route     GET api/profile
//@desc      Get all profiles
//@access    Public

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const config = { pageSize: 3 };
    try {
        const totalProfiles = await Profile.countDocuments();
        const totalPage = Math.ceil(totalProfiles / config.pageSize);

        if (page < 1 || page > totalPage) {
            return res.status(400).json({ msg: 'Invalid page number' });
        }
        const skip = (page - 1) * config.pageSize;
        const profiles = await Profile.find()
            .populate('user', ['name', 'avatar'])
            .skip(skip)
            .limit(config.pageSize);
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ msg: 'No profiles found' });
        }
        res.json({ profiles, totalPage, currentPage: page });
        console.log(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route     GET api/profile/user/user_id
//@desc      Get profile by User-ID
//@access    Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//@route     DELETE api/profile
//@desc      Delete profile user and post
//@access    Private

router.delete('/', auth, async (req, res) => {
    try {
        //remove user posts
        await Post.deleteMany({ user: req.user.id });
        //Will remove the profile
        await Profile.findOneAndDelete({ user: req.user.id });
        // findOneAndDelete(); is no longer supported in the newer version
        //Will remove the user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//@route     PUT api/profile/experience
//@desc      Add profile experience
//@access    Private

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const { title, company, location, from, to, current, description } =
            req.body;
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//@route     DELETE api/profile/experience/:exp_id
//@desc      Delete profile experience
//@access    Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get the remove index
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//@route     PUT api/profile/education
//@desc      Add profile education
//@access    Private

router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const { school, degree, fieldofstudy, from, to, current, description } =
            req.body;
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//@route     DELETE api/profile/experience/:edu_id
//@desc      Delete profile experience
//@access    Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get the remove index
        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//@route     GET api/profile/github/:username
//@desc      Get user repos from github
//@access    Public

router.get('/github/:username', async (req, res) => {
    try {
        // console.log('Request user:', req.user);
        // const profile = await Profile.findOne({ user: req.user.id });

        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };
        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github profile found' });
            }
            // if (req.params.username !== profile.githubusername) {
            //     return res.status(404).json({ msg: 'Unregistered user' });
            // }
            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//to export the route we created
module.exports = router;
