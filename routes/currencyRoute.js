const express = require('express')
const router = express.Router()

const currencyData = {
    "success": true,
    "base": "EUR",
    "rates": {
        "AUD": 1.566015,
        "CAD": 1.560132,
        "CHF": 1.154727,
        "CNY": 7.827874,
        "GBP": 0.882047,
        "JPY": 132.360679,
        "USD": 1.23396
    }
}

router.get('/all', (req, res) => {

    res.status(200).json(currencyData)
})

router.get('/:from/:to', (req, res) => {
    try{
        const fromCurrency = req.params.from
        const toCurrency = req.params.to
        let isBaseFrom = true ? fromCurrency == 'EUR' : false
        let isBaseTo = true ? toCurrency == 'EUR' : false
        let fromCurrencyRates, toCurrencyRates, resJson

        if ((currencyData.rates.hasOwnProperty(fromCurrency) && currencyData.rates.hasOwnProperty(toCurrency)) ||  ((currencyData.rates.hasOwnProperty(fromCurrency) && isBaseTo)) || (currencyData.rates.hasOwnProperty(toCurrency) && isBaseFrom)) {
            
            if(isBaseFrom){
                fromCurrencyRates = 1
                toCurrencyRates = currencyData.rates[toCurrency] 
            }
            else if(isBaseTo){
                toCurrencyRates = 1
                fromCurrencyRates = currencyData.rates[fromCurrency]

            }
            else{
                fromCurrencyRates = currencyData.rates[fromCurrency]
                toCurrencyRates = currencyData.rates[toCurrency]
            }

            const exchangeRates =  fromCurrencyRates/ toCurrencyRates

            resJson = {
                "success" : true,
                "rates" : exchangeRates
            }
        }

        else{
            resJson = {
                "success" : false,
                "error" : "No such currency available"
            }
        }

        return res.status(200).json(resJson)
    }
    catch(ex){
        res.sendStatus(400)
    }
})

module.exports = router