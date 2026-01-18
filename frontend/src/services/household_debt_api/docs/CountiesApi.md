# CountiesApi

All URIs are relative to _http://localhost:8000/api_

| Method                                                                                        | HTTP request                       | Description        |
| --------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------ |
| [**getCountiesCountiesGet**](#getcountiescountiesget)                                         | **GET** /counties                  | Get all counties   |
| [**getCountyByFipsCountiesFipsCodeGet**](#getcountybyfipscountiesfipscodeget)                 | **GET** /counties/{fips_code}      | Get county details |
| [**getDebtByCountyFipsCountiesFipsCodeDebtGet**](#getdebtbycountyfipscountiesfipscodedebtget) | **GET** /counties/{fips_code}/debt | Get county debt    |

# **getCountiesCountiesGet**

> Array<CountyExtended> getCountiesCountiesGet()

Get all counties information

### Example

```typescript
import { CountiesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new CountiesApi(configuration)

let name: string // (optional) (default to undefined)
let fipsCode: string // (optional) (default to undefined)

const { status, data } = await apiInstance.getCountiesCountiesGet(
	name,
	fipsCode
)
```

### Parameters

| Name         | Type         | Description | Notes                            |
| ------------ | ------------ | ----------- | -------------------------------- |
| **name**     | [**string**] |             | (optional) defaults to undefined |
| **fipsCode** | [**string**] |             | (optional) defaults to undefined |

### Return type

**Array<CountyExtended>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | Successful Response  | -                |
| **404**     | No County data found | -                |
| **422**     | Validation Error     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCountyByFipsCountiesFipsCodeGet**

> CountyExtended getCountyByFipsCountiesFipsCodeGet()

Get specific county details

### Example

```typescript
import { CountiesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new CountiesApi(configuration)

let fipsCode: string // (default to undefined)

const { status, data } =
	await apiInstance.getCountyByFipsCountiesFipsCodeGet(fipsCode)
```

### Parameters

| Name         | Type         | Description | Notes                 |
| ------------ | ------------ | ----------- | --------------------- |
| **fipsCode** | [**string**] |             | defaults to undefined |

### Return type

**CountyExtended**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | Successful Response  | -                |
| **404**     | No County data found | -                |
| **422**     | Validation Error     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDebtByCountyFipsCountiesFipsCodeDebtGet**

> Array<Debt> getDebtByCountyFipsCountiesFipsCodeDebtGet()

Get specific county debt details

### Example

```typescript
import { CountiesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new CountiesApi(configuration)

let fipsCode: string // (default to undefined)

const { status, data } =
	await apiInstance.getDebtByCountyFipsCountiesFipsCodeDebtGet(fipsCode)
```

### Parameters

| Name         | Type         | Description | Notes                 |
| ------------ | ------------ | ----------- | --------------------- |
| **fipsCode** | [**string**] |             | defaults to undefined |

### Return type

**Array<Debt>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | Successful Response  | -                |
| **404**     | No County data found | -                |
| **422**     | Validation Error     | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
