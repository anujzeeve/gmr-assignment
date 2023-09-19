const { check, validationResult, body } = require('express-validator');

var validation = {};
validation.check = function(req, res, next){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let msg = errors.array();
		return res.send({success:false, errors: errors.array() });
	} else {
		next();
	}
}
validation.userRegister = [
	check('name').not().isEmpty().withMessage('userName is required.'),
	check('userType').not().isEmpty().withMessage('userType is required.'),
   	check('email').isEmail().withMessage('Enter valid email address!'),
	check('password').isLength({ min: 6, max: 32}).withMessage('The password must be at least 6-32 digit.'),
];
validation.taskCreation = [
	check('title').not().isEmpty().withMessage('Title is required.'),
	check('description').not().isEmpty().withMessage('Description is required.'),
    check('owner').not().isEmpty().withMessage('owner is required.'),
    check('qaUserId').not().isEmpty().withMessage('qaUserId is required.'),
   	check('status').isIn(['in progress', 'completed', 'pending']).withMessage('Invalid status'),
	check('dueDate').isDate().withMessage('Invalid dueDate'),
];

module.exports = validation;