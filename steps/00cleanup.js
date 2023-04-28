const { existsAsync, unlinkAsync } = require('../util');
const { join } = require('path');

module.exports = async function (contractId) {

	if (
		await existsAsync(process.env.TMP_ROOT_DIR)
        && await existsAsync(join(process.env.TMP_ROOT_DIR, contractId))
	) await unlinkAsync(join(process.env.TMP_ROOT_DIR, contractId));

	return contractId;

};