module.exports = `INSERT INTO orderHeaders (
    orderId,
    Orderdatetime,
    Employeeid,
    Stationid,
    Ordertype,
    Dineintableid,
    Customerid,
    Deliverycharge,
    Deliverycomp,
    Driveremployeeid,
    Driverdeparturetime,
    Driverarrivaltime,
    Onholduntiltime,
    Discountid,
    Discountamount,
    Discountbasis,
    Discounttaxable,
    Orderstatus,
    Amountdue,
    Kitchen1alreadyprinted,
    Kitchen2alreadyprinted,
    Kitchen3alreadyprinted,
    Kitchen4alreadyprinted,
    Kitchen5alreadyprinted,
    Kitchen6alreadyprinted,
    Baralreadyprinted,
    Packageralreadyprinted,
    Surchargeid,
    Surchargeamount,
    Surchargebasis,
    Cashdiscountamount,
    Cashdiscountapprovalempid,
    Subtotal,
    Gratuitypercent,
    Cashgratuity,
    Creditid,
    Creditamountused,
    Discountamountused,
    Surchargeamountused,
    Salestaxrate,
    Salestaxamountused,
    Liquortaxrate,
    Liquortaxamount,
    Drivethrucomplete,
    Gstrate,
    Gstamountused,
    Bartabname,
    Serverbankid,
    Tableready,
    Guestnumber,
    Specificcustomername,
    Guestcheckprinted,
    Serverbanktype,
    Serverbankamount,
    Edittimestamp,
    Remotesitenumber,
    Remoteorigrowid,
    Facturanumber,
    Globalid,
    Rowver,
    Synchver,
    Storenumber,
    Bartabpreauth,
    Parentorderid,
    Hqrowid,
    Lastrowhash,
    Rowowner,
    Rowguid
) VALUES (
    1,
    '#{Orderdatetime}',
    #{Employeeid},
    #{Stationid},
    '2',
    null,
    #{Customerid},
    0,
    0,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    FALSE,
    '#{Orderstatus}',
    #{Amountdue},
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    null,
    null,
    null,
    null,
    null,
    #{Subtotal},
    null,
    null,
    null,
    null,
    0,
    0,
    #{Salestaxrate},
    #{Salestaxamountused},
    #{Liquortaxrate},
    #{Liquortaxamount},
    #{Gstrate},
    #{Gstamountused},
    null,
    null,
    null,
    FALSE,
    null,
    '#{SpecificCustomerName}',
    FALSE,
    null,
    0,
    null,
    1,
    0,
    null,
    null,
    null,
    null,
    0,
    FALSE,
    null,
    null,
    null,
    null,
    '#{Rowguid}'
);`;