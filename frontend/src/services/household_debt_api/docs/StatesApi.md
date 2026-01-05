# StatesApi

All URIs are relative to *http://localhost:8000/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getStateAndCountiesStatesStateCodeCountiesGet**](#getstateandcountiesstatesstatecodecountiesget) | **GET** /states/{state_code}/counties | Get specific state and its counties|
|[**getStateByCodeStatesStateCodeGet**](#getstatebycodestatesstatecodeget) | **GET** /states/{state_code} | Get specific state information|
|[**getStatesStatesGet**](#getstatesstatesget) | **GET** /states | Get state information|

# **getStateAndCountiesStatesStateCodeCountiesGet**
> Array<County> getStateAndCountiesStatesStateCodeCountiesGet()

Get specific state and its counties information by state code

### Example

```typescript
import {
    StatesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatesApi(configuration);

let stateCode: string; // (default to undefined)

const { status, data } = await apiInstance.getStateAndCountiesStatesStateCodeCountiesGet(
    stateCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stateCode** | [**string**] |  | defaults to undefined|


### Return type

**Array<County>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No State data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStateByCodeStatesStateCodeGet**
> State getStateByCodeStatesStateCodeGet()

Get state information by state code

### Example

```typescript
import {
    StatesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatesApi(configuration);

let stateCode: string; // (default to undefined)

const { status, data } = await apiInstance.getStateByCodeStatesStateCodeGet(
    stateCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stateCode** | [**string**] |  | defaults to undefined|


### Return type

**State**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No State data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStatesStatesGet**
> Array<State> getStatesStatesGet()

Get all state information or specific state info by query params

### Example

```typescript
import {
    StatesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatesApi(configuration);

let name: string; // (optional) (default to undefined)
let code: string; // (optional) (default to undefined)
let fipsCode: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getStatesStatesGet(
    name,
    code,
    fipsCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **code** | [**string**] |  | (optional) defaults to undefined|
| **fipsCode** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<State>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | No State data found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

