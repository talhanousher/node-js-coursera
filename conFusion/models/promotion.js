var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var promotionSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: 'New'
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    }

});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;