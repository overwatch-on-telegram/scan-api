const { pending, startsAt, debugInfo } = require('./cache');

const [
	cleanUp,
	downloadSourceCode,
	runSlither,
	chatGPT,
	extraAudit,
	generatePDF
] = [
	require('./steps/00cleanup'),
	require('./steps/01download-source-code'),
	require('./steps/02run-slither'),
	require('./steps/03chatgpt'),
	require('./steps/04extra-audit'),
	require('./steps/05generate-pdf')
];

module.exports.triggerAuditReport = async function (contractId) {

	const startAt = Date.now();

	pending[contractId] = 'Starting your job...';
	startsAt[contractId] = startAt;

	const handleErr = (err) => {
		console.log('ERR!');
		console.error(err);
		redisClient.del(contractId);
	};

	await cleanUp(contractId)
		.then(downloadSourceCode)
		.then(runSlither)
		.then(chatGPT)
		.then(extraAudit)
		.then(generatePDF)
		.then(() => {
			delete pending[contractId];
			delete startsAt[contractId];
			debugInfo(contractId, `Done in ${(Date.now() - startAt) / 1000} seconds`);
		})
		.catch(handleErr);

};
