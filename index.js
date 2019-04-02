// southfork
require('rootpath')();
let path = require('path');
let md5 = require('md5');
let fs = require('fs');

let fileData = require(path.join('.', 'data.json'))
let fileResultPath = path.join('.', 'result.txt');

let queryOrderHeaders = require(path.join('.', 'orderHeaderInsert.js'));
let queryOrderTransactions_labels = require(path.join('.', 'orderTransactions_labels.js'));
let queryOrderTransactions_values = require(path.join('.', 'orderTransactions_values.js'));
let orderPayments = require(path.join('.', 'orderPayments.js'));
let queryOrderTransactions = '';


let amountDue = 205200;
let subtotal = 0;
let salestaxrate = 8;
let liquortaxrate = 0;
let gstrate = 0;

let salestaxamountused = getValueWithoutTax(amountDue, salestaxrate);
let liquortaxamount = getValueWithoutTax(amountDue, liquortaxrate);
let gstamountused = getValueWithoutTax(amountDue, gstrate);

queryOrderHeaders = queryOrderHeaders
    .replace('#{Subtotal}', subtotal)
    .replace( '#{Amountdue}', amountDue)
    .replace('#{Orderstatus}', 1)

    .replace('#{Salestaxrate}', salestaxrate)
    .replace('#{Liquortaxrate}', liquortaxrate)
    .replace('#{Gstrate}', gstrate)

    .replace('#{Salestaxamountused}', salestaxamountused)
    .replace('#{Liquortaxamount}', liquortaxamount)
    .replace('#{Gstamountused}', gstamountused)


let empleadoId = 1;
let estacionId = 1;
let usuarioId = 'null';

let rowguid = md5((new Date()).getTime());

queryOrderHeaders = queryOrderHeaders
    .replace('#{Employeeid}', empleadoId)
    .replace('#{Stationid}', estacionId)
    .replace('#{Customerid}', usuarioId)
    .replace('#{Rowguid}', rowguid);


queryOrderHeaders = queryOrderHeaders
    .replace('#{SpecificCustomerName}', fileData.SpecificCustomerName)
    .replace( '#{Orderdatetime}', fileData.OrderDatetime);

queryOrderTransactions += queryOrderHeaders;

for(let i in fileData.products){
    let product = fileData.products[i];

    queryOrderTransactions += `\n\n${queryOrderTransactions_labels.replace('#{values}', getValues(product))}`;
}

let RowGUID = md5((new Date()).getTime()+'1221');

let payer = orderPayments
    .replace( '#{PaymentDateTime}', fileData.OrderDatetime)
    .replace('#{RowGUID}', RowGUID);

queryOrderTransactions += `\n\n${payer}`;

fs.writeFile(fileResultPath, queryOrderTransactions, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("success");
    }
})

function getValues(product){

    let rowguidP = md5((new Date()).getTime()+product.RemoteOrigRowID);

    let values = queryOrderTransactions_values
        .replace('#{RemoteOrigRowID}', product.RemoteOrigRowID)
        .replace('#{MenuItemID}', product.MenuItemID)
        .replace('#{Quantity}', product.Quantity)
        .replace('#{ShortNote}', product.ShortNote)

        .replace('#{MenuItemUnitPrice}', 10000)
        .replace('#{ExtendedPrice}', (10000 * product.Quantity) )
        .replace('#{DiscountTaxable}', 3000)
        .replace('#{GSTTaxable}', 0)
        .replace('#{LiquorTaxApplied}', 0)
        .replace('#{RowGUID}', rowguidP)


    for(let i = 0; i <= 20; i++){
        let topping = product.toppings[i];
        values = values
            .replace( '#{Mod'+(i+1)+'ID}', (topping || 'null'))
            .replace('#{Mod'+(i+1)+'Cost}', (topping)? 0:'null');
    }

    return values;
}




function getValueWithoutTax(amount, imp){
    let result = 0;
    if(imp > 0){
        result = amount/((imp/100) + 1);
    }
    return result;
}

function getTaxRateValue(amount, imp){
    let result = 0;
    if(imp > 0){
        result = amount*(imp/100);
    }
    return result;
}
