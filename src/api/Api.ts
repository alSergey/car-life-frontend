/* eslint-disable */
/* tslint:disable */
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
  body: string;
  brand: string;
  date: string;
  description: string;
  engine: string;
  horse_power: string;
  id: number;
  model: string;
  name: string;
  owner: ModelsUserCard;
}

export interface ModelsCarRequest {
  body?: string;
  brand?: string;
  date?: string;
  description?: string;
  engine?: string;
  horsePower?: string;
  model?: string;
  name?: string;
}

export interface ModelsChatLink {
  chat_link: string;
}

export interface ModelsClub {
  avatar: string;
  description: string;
  events_count: number;
  id: number;
  name: string;
  owner: ModelsUserCard;
  participants_count: number;
  subscribers_count: number;
  tags: string[];
  user_status: string;
}

export interface ModelsClubCard {
  avatar: string;
  id: number;
  name: string;
  participants_count: number;
  subscribers_count: number;
  tags: string[];
}

export interface ModelsComplaintReq {
  text?: string;
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

export interface ModelsCreateMiniEventRequest {
  description: string;
  ended_at: string;
  latitude: number;
  longitude: number;
  type_id: number;
}

export interface ModelsCreatePostRequest {
  text: string;
}

export interface ModelsEvent {
  avatar: string;
  club: ModelsClub;
  creator: ModelsUserCard;
  description: string;
  event_date: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  participants_count: number;
  spectators_count: number;
  user_status: string;
}

export interface ModelsEventCard {
  avatar: string;
  event_date: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  participants_count: number;
  spectators_count: number;
}

export interface ModelsEventPost {
  attachments: string[];
  created_at: string;
  event_id: number;
  id: number;
  text: string;
  user: ModelsUserCard;
}

export interface ModelsLoginRequest {
  vkid?: number;
}

export interface ModelsMiniEvent {
  created_at: string;
  description: string;
  ended_at: string;
  id: number;
  latitude: number;
  longitude: number;
  type: ModelsMiniEventType;
  user: ModelsUserCard;
}

export interface ModelsMiniEventType {
  id: number;
  public_description: string;
  public_name: string;
}

export interface ModelsSession {
  expires_at: string;
  user_id: number;
  value: string;
}

export interface ModelsSignUpRequest {
  avatarUrl?: string;
  description?: string;
  garage?: ModelsCarRequest[];
  name?: string;
  surname?: string;
  tags?: string[];
  vkid?: number;
}

export interface ModelsSignUpResponse {
  car_id: number;
  session: ModelsSession;
}

export interface ModelsTag {
  id: number;
  name: string;
}

export interface ModelsUpdateRequest {
  description?: string;
  tags?: string[];
}

export interface ModelsUser {
  avatar_url: string;
  description: string;
  name: string;
  surname: string;
  tags: string[];
  vkid: number;
}

export interface ModelsUserCard {
  avatar_url: string;
  name: string;
  surname: string;
  vkid: number;
}

export interface UtilsError {
  message?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

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

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: Iterable<any> = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
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
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
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
     * @description Handler for getting tags list
     *
     * @tags Clubs
     * @name ParticipateCreate
     * @summary request participate
     * @request POST:/clubs/{cid}/participate/{uid}/{type}
     */
    participateCreate: (cid: number, uid: number, type: "approve" | "reject", params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/clubs/${cid}/participate/${uid}/${type}`,
        method: "POST",
        type: ContentType.Json,
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
     * @description Handler for getting tags list
     *
     * @tags Clubs
     * @name CarsDetail
     * @summary get clubs cars list
     * @request GET:/clubs/{id}/cars
     */
    carsDetail: (id: number, query?: { IdGt?: number; IdLte?: number; Limit?: number }, params: RequestParams = {}) =>
      this.request<ModelsCarCard[], UtilsError>({
        path: `/clubs/${id}/cars`,
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
     * @name ChatLinkDetail
     * @summary get club chat link
     * @request GET:/clubs/{id}/chat_link
     */
    chatLinkDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsChatLink, UtilsError | void>({
        path: `/clubs/${id}/chat_link`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for complaining club
     *
     * @tags Clubs
     * @name ComplainCreate
     * @summary complain club
     * @request POST:/clubs/{id}/complain
     */
    complainCreate: (id: number, body: ModelsComplaintReq, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/clubs/${id}/complain`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for deleting club
     *
     * @tags Clubs
     * @name DeleteCreate
     * @summary delete club
     * @request POST:/clubs/{id}/delete
     */
    deleteCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/clubs/${id}/delete`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for getting tags list
     *
     * @tags Clubs
     * @name EventsDetail
     * @summary get clubs events list
     * @request GET:/clubs/{id}/events
     */
    eventsDetail: (id: number, query?: { IdGt?: number; IdLte?: number; Limit?: number }, params: RequestParams = {}) =>
      this.request<ModelsEventCard[], UtilsError>({
        path: `/clubs/${id}/events`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for leaving club
     *
     * @tags Clubs
     * @name LeaveCreate
     * @summary leave club
     * @request POST:/clubs/{id}/leave
     */
    leaveCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/clubs/${id}/leave`,
        method: "POST",
        type: ContentType.Json,
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
    uploadCreate: (id: number, data: { "file-upload": File }, params: RequestParams = {}) =>
      this.request<ModelsClub, UtilsError>({
        path: `/clubs/${id}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting tags list
     *
     * @tags Clubs
     * @name ClubsDetail2
     * @summary get clubs users list
     * @request GET:/clubs/{id}/{type}
     * @originalName clubsDetail
     * @duplicate
     */
    clubsDetail2: (
      id: number,
      type: "participant" | "participant_request" | "subscriber",
      query?: { IdGt?: number; IdLte?: number; Limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<ModelsUserCard[], UtilsError>({
        path: `/clubs/${id}/${type}`,
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
     * @name ClubsCreate
     * @summary set user role in club
     * @request POST:/clubs/{id}/{type}
     */
    clubsCreate: (id: number, type: "participate" | "subscribe", params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/clubs/${id}/${type}`,
        method: "POST",
        type: ContentType.Json,
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
  eventPosts = {
    /**
     * @description Handler for getting events posts list
     *
     * @tags EventsPosts
     * @name EventPostsDetail
     * @summary get events posts list
     * @request GET:/event_posts/{event_id}
     */
    eventPostsDetail: (
      eventId: number,
      query?: { IdGt?: number; IdLte?: number; Limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<ModelsEventPost[], UtilsError>({
        path: `/event_posts/${eventId}`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for creating an event post
     *
     * @tags EventsPosts
     * @name CreateCreate
     * @summary create an event post
     * @request POST:/event_posts/{event_id}/create
     */
    createCreate: (eventId: number, body: ModelsCreatePostRequest, params: RequestParams = {}) =>
      this.request<ModelsEventPost, UtilsError>({
        path: `/event_posts/${eventId}/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for complaining post
     *
     * @tags EventsPosts
     * @name ComplainCreate
     * @summary complain post
     * @request POST:/event_posts/{post_id}/complain
     */
    complainCreate: (postId: number, body: ModelsComplaintReq, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/event_posts/${postId}/complain`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for deleting post
     *
     * @tags EventsPosts
     * @name DeleteCreate
     * @summary delete post
     * @request POST:/event_posts/{post_id}/delete
     */
    deleteCreate: (postId: number, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/event_posts/${postId}/delete`,
        method: "POST",
        type: ContentType.Json,
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
      query?: {
        IdGt?: number;
        IdLte?: number;
        Limit?: number;
        Query?: string;
        UpperRightLatitude?: number;
        UpperRightLongitude?: number;
        DownLeftLatitude?: number;
        DownLeftLongitude?: number;
      },
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
     * @description Handler for getting tags list
     *
     * @tags Events
     * @name ParticipateCreate
     * @summary approve/reject participate in event
     * @request POST:/events/{eid}/participate/{uid}/{type}
     */
    participateCreate: (eid: number, uid: number, type: "approve" | "reject", params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/events/${eid}/participate/${uid}/${type}`,
        method: "POST",
        type: ContentType.Json,
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
     * @description Handler for getting tags list
     *
     * @tags Events
     * @name ChatLinkDetail
     * @summary get event chat link
     * @request GET:/events/{id}/chat_link
     */
    chatLinkDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsChatLink, UtilsError | void>({
        path: `/events/${id}/chat_link`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for complaining event
     *
     * @tags Events
     * @name ComplainCreate
     * @summary complain event
     * @request POST:/events/{id}/complain
     */
    complainCreate: (id: number, body: ModelsComplaintReq, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/events/${id}/complain`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for deleting event
     *
     * @tags Events
     * @name DeleteCreate
     * @summary delete event
     * @request POST:/events/{id}/delete
     */
    deleteCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/events/${id}/delete`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for leaving event
     *
     * @tags Events
     * @name LeaveCreate
     * @summary leave event
     * @request POST:/events/{id}/leave
     */
    leaveCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/events/${id}/leave`,
        method: "POST",
        type: ContentType.Json,
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
    uploadCreate: (id: number, data: { "file-upload": File }, params: RequestParams = {}) =>
      this.request<ModelsEvent, UtilsError>({
        path: `/events/${id}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting tags list
     *
     * @tags Events
     * @name EventsDetail2
     * @summary get events users list
     * @request GET:/events/{id}/{type}
     * @originalName eventsDetail
     * @duplicate
     */
    eventsDetail2: (
      id: number,
      type: "participant" | "participant_request" | "spectator",
      query?: { IdGt?: number; IdLte?: number; Limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<ModelsUserCard[], UtilsError>({
        path: `/events/${id}/${type}`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting tags list
     *
     * @tags Events
     * @name EventsCreate
     * @summary set user role in event
     * @request POST:/events/{id}/{type}
     */
    eventsCreate: (id: number, type: "participate" | "spectate", params: RequestParams = {}) =>
      this.request<void, UtilsError | void>({
        path: `/events/${id}/${type}`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),
  };
  eventsPosts = {
    /**
     * @description Handler for uploading an event post attachment
     *
     * @tags EventsPosts
     * @name UploadCreate
     * @summary upload attachments for event post
     * @request POST:/events_posts/{post_id}/upload
     */
    uploadCreate: (postId: number, data?: any, params: RequestParams = {}) =>
      this.request<ModelsEventPost, UtilsError>({
        path: `/events_posts/${postId}/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  garage = {
    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name GarageDetail
     * @summary get car
     * @request GET:/garage/{id}
     */
    garageDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsCarCard, UtilsError | void>({
        path: `/garage/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for complaining car
     *
     * @tags Users
     * @name ComplainCreate
     * @summary complain car
     * @request POST:/garage/{id}/complain
     */
    complainCreate: (id: number, body: ModelsComplaintReq, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/garage/${id}/complain`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for deleting car
     *
     * @tags Users
     * @name DeleteCreate
     * @summary delete car
     * @request POST:/garage/{id}/delete
     */
    deleteCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/garage/${id}/delete`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for creating an event
     *
     * @tags Users
     * @name UploadCreate
     * @summary upload avatar for car
     * @request POST:/garage/{id}/upload
     */
    uploadCreate: (id: number, data: { "file-upload": File }, params: RequestParams = {}) =>
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
      this.request<ModelsSession, UtilsError | void>({
        path: `/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
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

    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name UpdateUpdate
     * @summary get user by id
     * @request PUT:/me/update
     */
    updateUpdate: (body: ModelsUpdateRequest, params: RequestParams = {}) =>
      this.request<ModelsUser, UtilsError>({
        path: `/me/update`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  miniEvent = {
    /**
     * @description Handler for creating an event
     *
     * @tags MiniEvents
     * @name CreateCreate
     * @summary create a mini event
     * @request POST:/mini_event/create
     */
    createCreate: (body: ModelsCreateMiniEventRequest, params: RequestParams = {}) =>
      this.request<ModelsMiniEvent, UtilsError>({
        path: `/mini_event/create`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  miniEvents = {
    /**
     * @description Handler for getting events list
     *
     * @tags MiniEvents
     * @name MiniEventsList
     * @summary get mini events list
     * @request GET:/mini_events
     */
    miniEventsList: (query?: { IdGt?: number; IdLte?: number; Limit?: number }, params: RequestParams = {}) =>
      this.request<ModelsMiniEvent[], UtilsError>({
        path: `/mini_events`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for creating an event
     *
     * @tags MiniEvents
     * @name MiniEventsDetail
     * @summary get mini event by id
     * @request GET:/mini_events/{id}
     */
    miniEventsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsMiniEvent, UtilsError>({
        path: `/mini_events/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  newCar = {
    /**
     * @description Handler for signing up new user
     *
     * @tags Users
     * @name NewCarCreate
     * @summary add new car to user
     * @request POST:/new_car
     */
    newCarCreate: (body: ModelsCarRequest, params: RequestParams = {}) =>
      this.request<ModelsCarCard, UtilsError | void>({
        path: `/new_car`,
        method: "POST",
        body: body,
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
      this.request<ModelsSignUpResponse, UtilsError>({
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
     * @name OwnClubsList
     * @summary get clubs where user is owner
     * @request GET:/user/own_clubs
     */
    ownClubsList: (query?: { IdGt?: number; IdLte?: number; Limit?: number }, params: RequestParams = {}) =>
      this.request<ModelsClubCard[], UtilsError | void>({
        path: `/user/own_clubs`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

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

    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name ClubsDetail
     * @summary get clubs where user is in status
     * @request GET:/user/{id}/clubs/{type}
     */
    clubsDetail: (
      id: number,
      type: "admin" | "participant" | "subscriber",
      query?: { IdGt?: number; IdLte?: number; Limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<ModelsClubCard[], UtilsError | void>({
        path: `/user/${id}/clubs/${type}`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for complaining user
     *
     * @tags Users
     * @name ComplainCreate
     * @summary complain user
     * @request POST:/user/{id}/complain
     */
    complainCreate: (id: number, body: ModelsComplaintReq, params: RequestParams = {}) =>
      this.request<void, UtilsError>({
        path: `/user/${id}/complain`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name EventsDetail
     * @summary get events where user is in status
     * @request GET:/user/{id}/events/{type}
     */
    eventsDetail: (
      id: number,
      type: "admin" | "participant" | "spectator",
      query?: { IdGt?: number; IdLte?: number; Limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<ModelsEventCard[], UtilsError | void>({
        path: `/user/${id}/events/${type}`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Handler for getting a user by id
     *
     * @tags Users
     * @name GarageDetail
     * @summary get user garage
     * @request GET:/user/{id}/garage
     */
    garageDetail: (id: number, query?: { IdGt?: number; IdLte?: number; Limit?: number }, params: RequestParams = {}) =>
      this.request<ModelsCarCard[], UtilsError | void>({
        path: `/user/${id}/garage`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
