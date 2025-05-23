/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig, ApiFeedResponse } from "./api.types"
import { DatAssetProps } from "@/models/crypto/Crypto.props";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getCrypto(): Promise<DatAssetProps[]> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get("crypto")
    // @ts-ignore
    return response.data || []
  }
  async getFiat(): Promise<DatAssetProps[]> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get("fiat")
    // @ts-ignore
    return response.data || []
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
