const fetch = require('node-fetch');
const { writeFileAsync } = require('../util');
const { join } = require('path');

module.exports = async function (contractId) {

	const tokenAuditRes = await fetch(`https://dapp.herokuapp.com/token-audit?contract=${contractId}`);
	const tokenAuditData = await tokenAuditRes.json();

	await writeFileAsync(join(process.env.TMP_ROOT_DIR, contractId, 'token-audit.json'), JSON.stringify(tokenAuditData, null, 2), 'utf-8');

	return contractId;
};