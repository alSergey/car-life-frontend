/* eslint-disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsCarCard {
  avatar_url: string;
  brand: string;
  date: string;
  description: string;
  id: number;
  model: string;
  owner_id: number;
}

export interface ModelsCarRequest {
  brand?: string;
  date?: string;
  description?: string;
  model?: string;
}

export interface ModelsClub {
  avatar: string;
  club_events: ModelsEventCard[];
  club_garage: ModelsCarCard[];
  description: string;
  events_count: number;
  id: number;
  name: string;
  owner_id: number;
  participants_count: number;
  tags: string[];
}

export interface ModelsClubCard {
  avatar: string;
  id: number;
  name: string;
  participants_count: number;
  tags: string[];
}

export interface ModelsCreateClubRequest {
  avatar: string;
  description: string;
  name: string;
  tags: string[];
}

export interface ModelsCreateEventRequest {
  avatar: string;
  club_id: number;
  description: string;
  event_date: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface ModelsEvent {
  avatar: string;
  club: ModelsClub;
  description: string;
  event_date: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  participants_count: number;
}

export interface ModelsEventCard {
  avatar: string;
  event_date: string;
  id: number;
  name: string;
}

export interface ModelsLoginRequest {
  vkid?: number;
}

export interface ModelsSignUpRequest {
  avatarUrl?: string;
  garage?: ModelsCarRequest[];
  name?: string;
  surname?: string;
  tags?: string[];
  vkid?: number;
}

export interface ModelsTag {
  id: number;
  name: string;
}

export interface ModelsUser {
  avatar_url: string;
  garage: ModelsCarCard[];
  name: string;
  own_clubs: ModelsClubCard[];
  participant_clubs: ModelsClubCard[];
  participant_events: ModelsEventCard[];
  surname: string;
  tags: string[];
  vkid: number;
}

export interface UtilsError {
  message?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Swagger Example API
 * @version 1.0
 * @contact
 *
 * API for CarLife application
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  club = {
    /**
     * @description Handler for creating a club
     *
     * @tags Clubs
     * @name CreateCreate
     * @summary create a club
     * @request POST:/club/create
     */
    createCreate: (body: ModelsCreateClubRequest, params: RequestParams = {}) =>
      this.request<ModelsClub, UtilsError>({
        path: `/club/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  clubs = {
    /**
     * @description Handler for getting clubs list
     *
     * @tags Clubs
     * @name ClubsList
     * @summary get clubs list
     * @request GET:/clubs
     */
    clubsList: (
      query?: { IdGt?: number; IdLte?: number; Limit?: number; Query?: string },
      params: RequestParams = {},
    ) =>
      this.request<ModelsClubCard[], UtilsError>({
        path: `/clubs`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting tags list
     *
     * @tags Clubs
     * @name TagsList
     * @summary get tags list
     * @request GET:/clubs/tags
     */
    tagsList: (params: RequestParams = {}) =>
      this.request<ModelsTag[], UtilsError>({
        path: `/clubs/tags`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting a club by id
     *
     * @tags Clubs
     * @name ClubsDetail
     * @summary get club by id
     * @request GET:/clubs/{id}
     */
    clubsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsClub, UtilsError>({
        path: `/clubs/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for uploading a club's avatar
     *
     * @tags Clubs
     * @name UploadCreate
     * @summary upload avatar for club
     * @request POST:/clubs/{id}/upload
     */
    uploadCreate: (id: number, data?: any, params: RequestParams = {}) =>
      this.request<ModelsClub, UtilsError>({
        path: `/clubs/${id}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  event = {
    /**
     * @description Handler for creating an event
     *
     * @tags Events
     * @name CreateCreate
     * @summary create an event
     * @request POST:/event/create
     */
    createCreate: (body: ModelsCreateEventRequest, params: RequestParams = {}) =>
      this.request<ModelsEvent, UtilsError>({
        path: `/event/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  events = {
    /**
     * @description Handler for getting events list
     *
     * @tags Events
     * @name EventsList
     * @summary get events list
     * @request GET:/events
     */
    eventsList: (
      query?: { IdGt?: number; IdLte?: number; Limit?: number; Query?: string },
      params: RequestParams = {},
    ) =>
      this.request<ModelsEventCard[], UtilsError>({
        path: `/events`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for creating an event
     *
     * @tags Events
     * @name EventsDetail
     * @summary get event by id
     * @request GET:/events/{id}
     */
    eventsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsEvent, UtilsError>({
        path: `/events/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for creating an event
     *
     * @tags Events
     * @name UploadCreate
     * @summary upload avatar for event
     * @request POST:/events/{id}/upload
     */
    uploadCreate: (id: number, data?: any, params: RequestParams = {}) =>
      this.request<ModelsEvent, UtilsError>({
        path: `/events/${id}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  garage = {
    /**
     * @description Handler for creating an event
     *
     * @tags Users
     * @name UploadCreate
     * @summary upload avatar for car
     * @request POST:/garage/{id}/upload
     */
    uploadCreate: (id: number, data?: any, params: RequestParams = {}) =>
      this.request<ModelsUser, UtilsError>({
        path: `/garage/${id}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Handler for signing up new user
     *
     * @tags Users
     * @name LoginCreate
     * @summary login user
     * @request POST:/login
     */
    loginCreate: (body: ModelsLoginRequest, params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
  me = {
    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name GetMe
     * @summary get user by id
     * @request GET:/me
     */
    getMe: (params: RequestParams = {}) =>
      this.request<ModelsUser, UtilsError>({
        path: `/me`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  signup = {
    /**
     * @description Handler for signing up new user
     *
     * @tags Users
     * @name SignupCreate
     * @summary sign uo new user
     * @request POST:/signup
     */
    signupCreate: (body: ModelsSignUpRequest, params: RequestParams = {}) =>
      this.request<ModelsUser, UtilsError>({
        path: `/signup`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name UserDetail
     * @summary get user by id
     * @request GET:/user/{id}
     */
    userDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsUser, UtilsError>({
        path: `/user/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
