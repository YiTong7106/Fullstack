/**
 * express module
 * @const
 */
const express = require('express');
/**
 * express router middleware
 * @const
 */

const router = express.Router();
const Driver = require('../models/driver');
const Package = require('../models/package');
const db = require('../app');
const incrementCounter = require('../helpers/incrementCounter');
const ensureAuthenticated = require('../middlewares/authMiddleware');
/**
 * @route POST /v1/drivers/add
 * @middleware ensureAuthenticated
 * @desc Adds a new driver to the database.
 * @param {Request} req - Express request object containing driver details in the body.
 * @param {Response} res - Express response object, returns the newly created driver's ID.
 * @async
 */
router.post('v1/drivers/add',ensureAuthenticated, async (req, res) => {
    let tDriver_id = 'D32-' + (Math.round(Math.random() * 89) + 10) + '-' + String.fromCharCode(
        Math.floor(Math.random() * 26) + 65,
        Math.floor(Math.random() * 26) + 65
    );

    let newDriver = new Driver({
        driver_id: tDriver_id,
        driver_name: req.body.driver_name,
        driver_department: req.body.driver_department,
        driver_licence: req.body.driver_licence,
        driver_isActive: req.body.driver_isActive
    });
    await incrementCounter('create');
    await newDriver.save();
    res.json({
        id: newDriver._id,
        driver_id: tDriver_id
    });
});
/**
 * @route GET /v1/drivers
 * @middleware ensureAuthenticated
 * @desc Retrieves all drivers and their assigned packages from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object, returns the list of drivers.
 * @async
 */
router.get('/v1/drivers',ensureAuthenticated, async (req, res) => {
    const drivers = await Driver.find().populate('assigned_packages');
    await incrementCounter('retrieve');
    res.json(drivers);
});

/**
 * @route DELETE /v1/drivers/:id
 * @middleware ensureAuthenticated
 * @desc Deletes a driver and its associated packages from the database.
 * @param {Request} req - Express request object, containing the driver ID in the URL.
 * @param {Response} res - Express response object, returns the deletion result.
 * @async
 */
router.delete('/v1/drivers/:id', ensureAuthenticated,async (req, res) => {
    const driver = await Driver.findById(req.params.id).populate('assigned_packages');
    await Package.deleteMany({ _id: { $in: driver.assigned_packages } });
    const deletedDriver = await Driver.deleteOne({ _id: req.params.id });
    await incrementCounter('delete');
    res.json({ acknowledged: true, deletedCount: deletedDriver.deletedCount });
});

/**
 * @route PUT /v1/drivers/:id
 * @middleware ensureAuthenticated
 * @desc Updates a driver's information in the database.
 * @param {Request} req - Express request object containing the driver's updated details in the body.
 * @param {Response} res - Express response object, returns the update status.
 * @async
 */
router.put('/v1/drivers/:id',ensureAuthenticated, async (req, res) => {

    const updatedDriver = await Driver.findByIdAndUpdate(
        req.body.id,
        { driver_licence: req.body.driver_licence, driver_department: req.body.driver_department },
        { new: true }
    );

    if (!updatedDriver) {
        return res.status(404).json({ status: 'ID not found' });
    }
    await incrementCounter('update');
    res.json({ status: 'Driver updated successfully' });
});


/**
 * @route POST /v1/packages/add
 * @middleware ensureAuthenticated
 * @desc Adds a new package to the database and assigns it to a driver.
 * @param {Request} req - Express request object containing package details in the body.
 * @param {Response} res - Express response object, returns the newly created package's ID.
 * @async
 */
router.post('/v1/packages/add', ensureAuthenticated,async (req, res) => {
    // Generate package_id
    let tPackage_id = 'P' + String.fromCharCode(
        Math.floor(Math.random() * 26) + 65,
        Math.floor(Math.random() * 26) + 65
    ) + '-YT-' + (Math.round(Math.random() * (999 - 100)) + 100);
    if (!await Driver.findById({ _id: req.body.driver_id })) {
        return res.status(404).json({ status: 'Driver not found' });
    };
    const newPackage = new Package({
        package_id: tPackage_id,
        package_title: req.body.package_title,
        package_weight: req.body.package_weight,
        package_destination: req.body.package_destination,
        isAllocated: req.body.isAllocated,
        driver_id: req.body.driver_id
    });

    await Driver.findByIdAndUpdate({ _id: newPackage.driver_id }, { $push: { assigned_packages: newPackage._id } }, { new: true });
   
    const savedPackage = await newPackage.save();
    await incrementCounter('create');
    res.json({ id: savedPackage._id, package_id: savedPackage.package_id });
});
/**
 * @route GET /v1/packages
 * @middleware ensureAuthenticated
 * @desc Retrieves all packages from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object, returns the list of packages.
 * @async
 */

router.get('/v1/packages', ensureAuthenticated,async (req, res) => {
    const packages = await Package.find().populate('driver_id');
    await incrementCounter('retrieve');
    res.json(packages);
});

/**
 * @route DELETE /v1/packages/:id
 * @middleware ensureAuthenticated
 * @desc Deletes a package from the database.
 * @param {Request} req - Express request object, containing the package ID in the URL.
 * @param {Response} res - Express response object, returns the deletion result.
 * @async
 */
router.delete('/v1/packages/:id', ensureAuthenticated,async (req, res) => {
    await Driver.updateMany(
        { assigned_packages: req.params.id },
        { $pull: { assigned_packages: req.params.id } }
    );
    const deletedPackage = await Package.deleteOne({ _id: req.params.id });
    await incrementCounter('delete');
    res.json({ acknowledged: true, deletedCount: deletedPackage.deletedCount });
});
/**
 * @route PUT /v1/packages/:id
 * @middleware ensureAuthenticated
 * @desc Updates package details in the database.
 * @param {Request} req - Express request object containing the updated package details in the body.
 * @param {Response} res - Express response object, returns the update status.
 * @async
 */
router.put('/v1/packages/:id', ensureAuthenticated,async (req, res) => {
    await Package.findByIdAndUpdate(
        req.params.id,
        { package_destination: req.body.package_destination },
        { new: true }
    );
    await incrementCounter('update');
    res.json({ status: 'updated successfully' });
});
/**
 * @route POST /v1/signup
 * @desc Registers a new user in the system.
 * @param {Request} req - Express request object containing username and password in the body.
 * @param {Response} res - Express response object, returns the registration status.
 * @async
 */
router.post('/v1/signup', async (req, res) => {
    const { username, password, confirm_password } = req.body;

    if (username.length < 6 || password.length < 5 || password.length > 10 || password !== confirm_password) {
        return res.json({ status: 'Invalid data' });
    }
        const userRef = db.collection('users').doc(username);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.json({ status: 'User already exists' });
        }

        await userRef.set({
            username: username,
            password: password
        });
        await incrementCounter('create');

        res.json({ status: 'Signup successfully' });
});
/**
 * @route POST /v1/login
 * @desc Authenticates a user and initiates a session.
 * @param {Request} req - Express request object containing username and password in the body.
 * @param {Response} res - Express response object, returns the login status.
 * @async
 */
router.post('/v1/login', async (req, res) => {
    const { username, password } = req.body;


        const userRef = db.collection('users').doc(username);
        const doc = await userRef.get();
        await incrementCounter('retrieve');
        if (!doc.exists) {
            return res.json({ status: 'User not found' });
        }

        const user = doc.data();
       
        if (password != user.password) {
            return res.json({ status: 'Incorrect password' });
        }
       
        req.session.user = user;

        res.status(200).json({ status: 'Login successfully' });
});

module.exports = router;
