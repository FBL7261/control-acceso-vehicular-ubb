const regEntry = require('../models/regEntry.model');
const { handleErrors } = require('../utils/errorHandler');
const {respondSuccess, respondError} = require('../utils/responsesHandler');
const {regEntryBodySchema} = require('../schemas/regEntry.schema');