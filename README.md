# Salesforce-CLI

This is a simple command line interface for Salesforce.

This CLI connect to salesforce using Auth2.0. A connected app should be setup in the org. Please follow this link to setup connected app https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm&type=5
#### Connect salesforce
```
salesforce connect
```
```
  ____    _____        ____   _       ___ 
 / ___|  |  ___|      / ___| | |     |_ _|
 \___ \  | |_        | |     | |      | | 
  ___) | |  _|       | |___  | |___   | | 
 |____/  |_|          \____| |_____| |___|
                                          
? Enter client id XXXXXXXXXXXXXXXXXXXXXXXXXXXX
? Enter secret code XXXXXXXXXXXXXXXXXXXXXXXXXXXX
? sandbox (Y/N) N
```

#### Query
```
salesforce query --soql "select id,name from account" --file="result.csv"
```
```
Total records :17
Output: /Users/marben/Documents/lab/github/Salesforce-CLI/result.csv
```

#### Insert 
```
salesforce insert --object="Account" --file="input.csv"
```
```
Created record id : 0015e00000qef4VAAQ
Created record id : 0015e00000qef4WAAQ
```
#### Update
```
salesforce update --object="Account" --file="test_update.csv"
```
```
Updated Successfully : 0015e00000A81fxAAB
Updated Successfully : 0015e00000AVUokAAH
```
#### Upsert
```
salesforce upsert --object="Account" --file="test_upsert.csv" --extId="Account_External_Id__c"
```
```
Upserted Successfully
Upserted Successfully
```
#### Delete
```
salesforce delete --object="Account" --file="test_delete.csv"
```
```
Deleted Successfully : 0015e00000qef5TAAQ
Deleted Successfully : 0015e00000qef5UAAQ
```
#### Describle
```
salesforce desc --object="Account"
```
```
┌────────────────────────────┬────────────────────────┐
│ Label                     │ API Name                │
├───────────────────────────┼─────────────────────────┤
│ Account ID                │ Id                      │
├───────────────────────────┼─────────────────────────┤
│ Deleted                   │ IsDeleted               │
├───────────────────────────┼─────────────────────────┤
│ Master Record ID          │ MasterRecordId          │
├───────────────────────────┼─────────────────────────┤
│ Account Name              │ Name                    │
├───────────────────────────┼─────────────────────────┤
│ Account Type              │ Type                    │
├───────────────────────────┼─────────────────────────┤
│ Parent Account ID         │ ParentId                │
├───────────────────────────┼─────────────────────────┤
```
