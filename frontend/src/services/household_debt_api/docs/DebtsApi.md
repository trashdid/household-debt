# DebtsApi

All URIs are relative to *http://localhost:8000/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCountiesDebtDebtsCountiesGet**](#getcountiesdebtdebtscountiesget) | **GET** /debts/counties | Get all county debt|
|[**getCountyDebtDebtsCountiesFipsCodeGet**](#getcountydebtdebtscountiesfipscodeget) | **GET** /debts/counties/{fips_code} | Get county debt|
|[**getDebtsDebtsGet**](#getdebtsdebtsget) | **GET** /debts | Get all county debt|
|[**getStateDebtDebtsStatesStateCodeGet**](#getstatedebtdebtsstatesstatecodeget) | **GET** /debts/states/{state_code} | Get state debt|
|[**getStatesDebtDebtsStatesGet**](#getstatesdebtdebtsstatesget) | **GET** /debts/states | Get all states debt|

# **getCountiesDebtDebtsCountiesGet**
> Array<CountyDebt> getCountiesDebtDebtsCountiesGet()

Get all county debt details

### Example

```typescript
import {
    DebtsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtsApi(configuration);

let startDate: string; // (optional) (default to 1999-01-01T00:00:00)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getCountiesDebtDebtsCountiesGet(
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to 1999-01-01T00:00:00|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<CountyDebt>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No Debt data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCountyDebtDebtsCountiesFipsCodeGet**
> CountyDebt getCountyDebtDebtsCountiesFipsCodeGet()

Get county debt details

### Example

```typescript
import {
    DebtsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtsApi(configuration);

let fipsCode: string; // (default to undefined)
let startDate: string; // (optional) (default to 1999-01-01T00:00:00)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getCountyDebtDebtsCountiesFipsCodeGet(
    fipsCode,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fipsCode** | [**string**] |  | defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to 1999-01-01T00:00:00|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


### Return type

**CountyDebt**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No Debt data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDebtsDebtsGet**
> Array<DebtExtended> getDebtsDebtsGet()

Get all county debt details

### Example

```typescript
import {
    DebtsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtsApi(configuration);

let county: string; // (optional) (default to undefined)
let state: string; // (optional) (default to undefined)
let fipsCode: string; // (optional) (default to undefined)
let startDate: string; // (optional) (default to 1999-01-01T00:00:00)
let endDate: string; // (optional) (default to undefined)
let skip: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 150)

const { status, data } = await apiInstance.getDebtsDebtsGet(
    county,
    state,
    fipsCode,
    startDate,
    endDate,
    skip,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **county** | [**string**] |  | (optional) defaults to undefined|
| **state** | [**string**] |  | (optional) defaults to undefined|
| **fipsCode** | [**string**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to 1999-01-01T00:00:00|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **skip** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 150|


### Return type

**Array<DebtExtended>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No Debt data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStateDebtDebtsStatesStateCodeGet**
> StateDebt getStateDebtDebtsStatesStateCodeGet()

Get state debt details

### Example

```typescript
import {
    DebtsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtsApi(configuration);

let stateCode: string; // (default to undefined)
let startDate: string; // (optional) (default to 1999-01-01T00:00:00)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getStateDebtDebtsStatesStateCodeGet(
    stateCode,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stateCode** | [**string**] |  | defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to 1999-01-01T00:00:00|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StateDebt**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No Debt data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStatesDebtDebtsStatesGet**
> Array<StateDebt> getStatesDebtDebtsStatesGet()

Get all states debt details

### Example

```typescript
import {
    DebtsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtsApi(configuration);

let startDate: string; // (optional) (default to 1999-01-01T00:00:00)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getStatesDebtDebtsStatesGet(
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to 1999-01-01T00:00:00|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<StateDebt>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No Debt data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

