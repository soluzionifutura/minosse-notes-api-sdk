/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/**
 * This file was automatically generated by sf-ts-sdk-gen.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source
 * openapi definition and regenerate this file.
 */

import type { AxiosStatic, AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from "axios"

import deepmerge from "deepmerge"

function _isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === "[object Object]"
}

export function isPlainObject(o: any): boolean {
  if (_isObject(o) === false) {
    return false
  }

  const ctor = o.constructor
  if (ctor === undefined) {
    return true
  }

  const prot = ctor.prototype
  if (_isObject(prot) === false) {
    return false
  }

  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false
  }

  return true
}

export const SDK_VERSION = "0.1.0"

export const API_VERSION = "1.0.0"

export let axios: AxiosStatic | AxiosInstance | undefined

export type Env = "local" | "staging" | "production" | string

export let env: Env | undefined

const _auth: { "apiKey": string | null,"roles": string | null } = { "apiKey": null, "roles": null }

export function setAuth(securitySchemaName: keyof typeof _auth, value: string | null): void {
  if (typeof _auth[securitySchemaName] === "undefined") {
    throw new Error(`Invalid security schema name: ${securitySchemaName}`)
  }
  _auth[securitySchemaName] = value
}

export type HandledResponses = { [status: string]: { code: string[] | null } }

const _throwOnUnexpectedResponse = (handledResponses: HandledResponses, response: AxiosResponse): void => {
  const handledResponsesForStatus = handledResponses[response.status]
  if (handledResponsesForStatus) {
    const handledResponseCodes = handledResponsesForStatus.code
    if (Array.isArray(handledResponseCodes)) {
      if (!handledResponseCodes.includes(response.data.code)) {
        throw new ResponseError({
          message: `Unexpected response code: ${response.data.code}`,
          code: "UNEXPECTED_RESPONSE",
          response
        })
      }
    }
  } else {
    throw new ResponseError({
      message: `Unexpected response status code: ${response.status}`,
      code: "UNEXPECTED_RESPONSE",
      response
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getAuth(keys: Set<string>): { headers: { [key: string]: string }, params: URLSearchParams, withCredentials: boolean } {
  const headers: { [key: string]: string } = {}
  const params = new URLSearchParams()
  if (keys.has("apiKey") && _auth["apiKey"]) {
    headers["x-api-key"] = _auth["apiKey"]
  }
  if (keys.has("roles") && _auth["roles"]) {
      headers.Authorization = `Bearer ${_auth["roles"]}`
    }
  return { headers, params, withCredentials: true }
}

export class ResponseError<T> extends Error {
  code: string
  response: T

  constructor({ message, code, response }: { message: string, code: string, response: T }) {
    super(message)
    this.code = code
    this.response = response
  }
}

export const serverUrls: { [env in Env]: string } = {
  "local": "http://localhost:8000",
  "staging": "https://api.staging.notes.soluzionifutura.it",
  "production": "https://api.notes.soluzionifutura.it"
}

function _getFnUrl(endpoint: string, options?: { path?: { [key: string]: any }, params?: { [key: string]: any } }): string {
  const baseUrl = serverUrls[env!.toLowerCase()]
  if (!baseUrl) {
    throw new Error(`Invalid env: ${env}`)
  }

  if (options?.path) {
    Object.entries(options.path).forEach(([key, value]) => {
      endpoint = endpoint.replace(`{${key}}`, String(value))
    })
  }

  endpoint = endpoint.replace(/{.*?}/g, "")

  const url = new URL(baseUrl.replace(/\/$/, "") + "/" + endpoint.replace(/^\//, ""))
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, typeof value === "object" ? JSON.stringify(value) : value)
    })
  }

  return url.toString()
}

export function setup(params: {
  axios: AxiosStatic | AxiosInstance
  env: Env
  customServerUrls?: { [env: string]: string }
}): void {
  axios = params.axios
  env = params.env
  if (params.customServerUrls) {
    Object.assign(serverUrls, params.customServerUrls)
  }
  if (!serverUrls[env]) {
    throw new Error(`Missing server url for env: ${env}`)
  }
}

const _checkSetup = (): void => {
  if (!axios) {
    throw new Error("axios is not defined. Please run the sdk.setup() function or set axios instance to the sdk.")
  }
  if (!env) {
    throw new Error("env is not defined. Please run the sdk.setup() function or set env to the sdk.")
  }
}

/**
Creates a note
*/
export type AxiosCreateNoteSuccessResponse = (AxiosResponse<CreateNote200ResponseSchema> & { status: 200 })
export type AxiosCreateNoteErrorResponse = ((AxiosResponse<CreateNote400ResponseSchema> & { status: 400 }) | (AxiosResponse<CreateNote405ResponseSchema> & { status: 405 }) | (AxiosResponse<CreateNote415ResponseSchema> & { status: 415 }) | (AxiosResponse<CreateNote429ResponseSchema> & { status: 429 }) | (AxiosResponse<CreateNote500ResponseSchema> & { status: 500 })) & { path: "/v1/createNote" }
export type AxiosCreateNoteResponse = AxiosCreateNoteSuccessResponse | AxiosCreateNoteErrorResponse
export async function createNote(data: CreateNoteRequestSchema, config?: AxiosRequestConfig): Promise<AxiosCreateNoteResponse> {
  _checkSetup()
  const securityParams: AxiosRequestConfig = {}
  const handledResponses = {
    "200": {
      "code": null
    },
    "400": {
      "code": [
        "VALIDATION_ERROR"
      ]
    },
    "405": {
      "code": [
        "METHOD_NOT_ALLOWED"
      ]
    },
    "415": {
      "code": [
        "UNSUPPORTED_MEDIA_TYPE"
      ]
    },
    "429": {
      "code": [
        "THROTTLING"
      ]
    },
    "500": {
      "code": [
        "UNEXPECTED_ERROR"
      ]
    }
  }
  try {
    const res = await axios!.post(_getFnUrl("/v1/createNote"), data, config ? deepmerge(securityParams, config, { isMergeableObject: isPlainObject }) : securityParams)
    _throwOnUnexpectedResponse(handledResponses, res)
    return res as AxiosCreateNoteSuccessResponse
  } catch (e) {
    const { response: res } = e as AxiosError
    if (res) {
      _throwOnUnexpectedResponse(handledResponses, res)
      return res as AxiosCreateNoteErrorResponse
    } else {
      throw e
    }
  }
}

/**
delete note
*/
export type AxiosDeleteNoteSuccessResponse = (AxiosResponse<DeleteNote200ResponseSchema> & { status: 200 })
export type AxiosDeleteNoteErrorResponse = ((AxiosResponse<DeleteNote400ResponseSchema> & { status: 400 }) | (AxiosResponse<DeleteNote401ResponseSchema> & { status: 401 }) | (AxiosResponse<DeleteNote405ResponseSchema> & { status: 405 }) | (AxiosResponse<DeleteNote415ResponseSchema> & { status: 415 }) | (AxiosResponse<DeleteNote429ResponseSchema> & { status: 429 }) | (AxiosResponse<DeleteNote500ResponseSchema> & { status: 500 })) & { path: "/v1/deleteNote" }
export type AxiosDeleteNoteResponse = AxiosDeleteNoteSuccessResponse | AxiosDeleteNoteErrorResponse
export async function deleteNote(data: DeleteNoteRequestSchema, config?: AxiosRequestConfig): Promise<AxiosDeleteNoteResponse> {
  _checkSetup()
  const securityParams: AxiosRequestConfig = {}
  const handledResponses = {
    "200": {
      "code": null
    },
    "400": {
      "code": [
        "VALIDATION_ERROR"
      ]
    },
    "401": {
      "code": [
        "UNAUTHORIZED"
      ]
    },
    "405": {
      "code": [
        "METHOD_NOT_ALLOWED"
      ]
    },
    "415": {
      "code": [
        "UNSUPPORTED_MEDIA_TYPE"
      ]
    },
    "429": {
      "code": [
        "THROTTLING"
      ]
    },
    "500": {
      "code": [
        "UNEXPECTED_ERROR"
      ]
    }
  }
  try {
    const res = await axios!.post(_getFnUrl("/v1/deleteNote"), data, config ? deepmerge(securityParams, config, { isMergeableObject: isPlainObject }) : securityParams)
    _throwOnUnexpectedResponse(handledResponses, res)
    return res as AxiosDeleteNoteSuccessResponse
  } catch (e) {
    const { response: res } = e as AxiosError
    if (res) {
      _throwOnUnexpectedResponse(handledResponses, res)
      return res as AxiosDeleteNoteErrorResponse
    } else {
      throw e
    }
  }
}

/**
if control value matches, returns the note
*/
export type AxiosGetNoteSuccessResponse = (AxiosResponse<GetNote200ResponseSchema> & { status: 200 })
export type AxiosGetNoteErrorResponse = ((AxiosResponse<GetNote400ResponseSchema> & { status: 400 }) | (AxiosResponse<GetNote401ResponseSchema> & { status: 401 }) | (AxiosResponse<GetNote405ResponseSchema> & { status: 405 }) | (AxiosResponse<GetNote415ResponseSchema> & { status: 415 }) | (AxiosResponse<GetNote429ResponseSchema> & { status: 429 }) | (AxiosResponse<GetNote500ResponseSchema> & { status: 500 })) & { path: "/v1/getNote" }
export type AxiosGetNoteResponse = AxiosGetNoteSuccessResponse | AxiosGetNoteErrorResponse
export async function getNote(data: GetNoteRequestSchema, config?: AxiosRequestConfig): Promise<AxiosGetNoteResponse> {
  _checkSetup()
  const securityParams: AxiosRequestConfig = {}
  const handledResponses = {
    "200": {
      "code": null
    },
    "400": {
      "code": [
        "VALIDATION_ERROR"
      ]
    },
    "401": {
      "code": [
        "UNAUTHORIZED"
      ]
    },
    "405": {
      "code": [
        "METHOD_NOT_ALLOWED"
      ]
    },
    "415": {
      "code": [
        "UNSUPPORTED_MEDIA_TYPE"
      ]
    },
    "429": {
      "code": [
        "THROTTLING"
      ]
    },
    "500": {
      "code": [
        "UNEXPECTED_ERROR"
      ]
    }
  }
  try {
    const res = await axios!.post(_getFnUrl("/v1/getNote"), data, config ? deepmerge(securityParams, config, { isMergeableObject: isPlainObject }) : securityParams)
    _throwOnUnexpectedResponse(handledResponses, res)
    return res as AxiosGetNoteSuccessResponse
  } catch (e) {
    const { response: res } = e as AxiosError
    if (res) {
      _throwOnUnexpectedResponse(handledResponses, res)
      return res as AxiosGetNoteErrorResponse
    } else {
      throw e
    }
  }
}

/**
list notes
*/
export type AxiosListNotesSuccessResponse = (AxiosResponse<ListNotes200ResponseSchema> & { status: 200 })
export type AxiosListNotesErrorResponse = ((AxiosResponse<ListNotes400ResponseSchema> & { status: 400 }) | (AxiosResponse<ListNotes405ResponseSchema> & { status: 405 }) | (AxiosResponse<ListNotes415ResponseSchema> & { status: 415 }) | (AxiosResponse<ListNotes429ResponseSchema> & { status: 429 }) | (AxiosResponse<ListNotes500ResponseSchema> & { status: 500 })) & { path: "/v1/listNotes" }
export type AxiosListNotesResponse = AxiosListNotesSuccessResponse | AxiosListNotesErrorResponse
export async function listNotes(data: ListNotesRequestSchema, config?: AxiosRequestConfig): Promise<AxiosListNotesResponse> {
  _checkSetup()
  const securityParams: AxiosRequestConfig = {}
  const handledResponses = {
    "200": {
      "code": null
    },
    "400": {
      "code": [
        "VALIDATION_ERROR"
      ]
    },
    "405": {
      "code": [
        "METHOD_NOT_ALLOWED"
      ]
    },
    "415": {
      "code": [
        "UNSUPPORTED_MEDIA_TYPE"
      ]
    },
    "429": {
      "code": [
        "THROTTLING"
      ]
    },
    "500": {
      "code": [
        "UNEXPECTED_ERROR"
      ]
    }
  }
  try {
    const res = await axios!.post(_getFnUrl("/v1/listNotes"), data, config ? deepmerge(securityParams, config, { isMergeableObject: isPlainObject }) : securityParams)
    _throwOnUnexpectedResponse(handledResponses, res)
    return res as AxiosListNotesSuccessResponse
  } catch (e) {
    const { response: res } = e as AxiosError
    if (res) {
      _throwOnUnexpectedResponse(handledResponses, res)
      return res as AxiosListNotesErrorResponse
    } else {
      throw e
    }
  }
}

/**
update a note
*/
export type AxiosUpdateNoteSuccessResponse = (AxiosResponse<UpdateNote200ResponseSchema> & { status: 200 })
export type AxiosUpdateNoteErrorResponse = ((AxiosResponse<UpdateNote400ResponseSchema> & { status: 400 }) | (AxiosResponse<UpdateNote401ResponseSchema> & { status: 401 }) | (AxiosResponse<UpdateNote405ResponseSchema> & { status: 405 }) | (AxiosResponse<UpdateNote415ResponseSchema> & { status: 415 }) | (AxiosResponse<UpdateNote429ResponseSchema> & { status: 429 }) | (AxiosResponse<UpdateNote500ResponseSchema> & { status: 500 })) & { path: "/v1/updateNote" }
export type AxiosUpdateNoteResponse = AxiosUpdateNoteSuccessResponse | AxiosUpdateNoteErrorResponse
export async function updateNote(data: UpdateNoteRequestSchema, config?: AxiosRequestConfig): Promise<AxiosUpdateNoteResponse> {
  _checkSetup()
  const securityParams: AxiosRequestConfig = {}
  const handledResponses = {
    "200": {
      "code": null
    },
    "400": {
      "code": [
        "VALIDATION_ERROR"
      ]
    },
    "401": {
      "code": [
        "UNAUTHORIZED"
      ]
    },
    "405": {
      "code": [
        "METHOD_NOT_ALLOWED"
      ]
    },
    "415": {
      "code": [
        "UNSUPPORTED_MEDIA_TYPE"
      ]
    },
    "429": {
      "code": [
        "THROTTLING"
      ]
    },
    "500": {
      "code": [
        "UNEXPECTED_ERROR"
      ]
    }
  }
  try {
    const res = await axios!.post(_getFnUrl("/v1/updateNote"), data, config ? deepmerge(securityParams, config, { isMergeableObject: isPlainObject }) : securityParams)
    _throwOnUnexpectedResponse(handledResponses, res)
    return res as AxiosUpdateNoteSuccessResponse
  } catch (e) {
    const { response: res } = e as AxiosError
    if (res) {
      _throwOnUnexpectedResponse(handledResponses, res)
      return res as AxiosUpdateNoteErrorResponse
    } else {
      throw e
    }
  }
}

export type Any =
  | string
  | boolean
  | number
  | {
      [k: string]: unknown
    }
  | string[]
  | number[]
  | {
      [k: string]: unknown
    }[]
  | null

export type ValidationErrorResponseSchema = {
  message: string
  code: "VALIDATION_ERROR"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type MethodNotAllowedErrorResponseSchema = {
  message: string
  code: "METHOD_NOT_ALLOWED"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type UnsupportedMediaTypeErrorResponseSchema = {
  message: string
  code: "UNSUPPORTED_MEDIA_TYPE"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type ForbiddenErrorResponseSchema = {
  message: string
  code: "FORBIDDEN"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type UnauthorizedErrorResponseSchema = {
  message: string
  code: "UNAUTHORIZED"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type ThrottlingErrorResponseSchema = {
  message: string
  code: "THROTTLING"
  details?: Any
  stack?: string
  [k: string]: unknown
}

export type UnexpectedErrorResponseSchema = {
  message: string
  code: "UNEXPECTED_ERROR"
  details?: Any
  stack?: string
  [k: string]: unknown
}

/**
 * timestamp
 */
export type Timestamp = number

export type NullableTimestamp = number | null

export type Email = string

export type Week = number

export type Year = number

export type Month = number

export type OkSchema = {
  data: {
    status: string
  }
}

/**
 * UUID
 */
export type Id = string

export type NullableId = string | null

/**
 * Numeric note id
 */
export type NoteId = number

/**
 * Contains optional scope and id
 */
export type NoteHandler = {
  id: NoteId
  scope?: string
}

/**
 * Random string for hashing encryption key
 */
export type NoteSalt = string

/**
 * Detected programming language in note
 */
export type NoteLanguage = "txt" | "py" | "js"

export type BurnAfterReadNoteMetadata = {
  expireTimestamp: NullableTimestamp
  creationTimestamp: NullableTimestamp
  salt: NoteSalt
  encrypted: boolean
  burnAfterRead: true
  editable?: false
}

export type NotBurnAfterReadNoteMetadata = {
  expireTimestamp: NullableTimestamp
  creationTimestamp?: NullableTimestamp
  salt: NoteSalt
  encrypted: boolean
  burnAfterRead: false
  editable: boolean
}

/**
 * Additional informations about note
 */
export type NoteMetadata = BurnAfterReadNoteMetadata | NotBurnAfterReadNoteMetadata

export type NoteVersion = {
  encryptedText: string
  creationTimestamp?: NullableTimestamp
  language?: NoteLanguage
}

export type Note = {
  handler: NoteHandler
  metadata: NoteMetadata
  controlValue?: string | null
  versions: NoteVersion[]
}

export type NoteResponseSchema = {
  data: {
    note: Note
    status: string
  }
}

export type CreateNote200ResponseSchema = {
  data: {
    note: Note
    status: string
  }
}

export type CreateNote400ResponseSchema = ValidationErrorResponseSchema

export type CreateNote405ResponseSchema = MethodNotAllowedErrorResponseSchema

export type CreateNote415ResponseSchema = UnsupportedMediaTypeErrorResponseSchema

export type CreateNote429ResponseSchema = ThrottlingErrorResponseSchema

export type CreateNote500ResponseSchema = UnexpectedErrorResponseSchema

export type CreateNoteRequestSchema = {
  note: {
    scope?: string
    metadata: NoteMetadata
    controlValue?: string | null
    encryptedText: string
  }
}

export type DeleteNote200ResponseSchema = OkSchema

export type DeleteNote400ResponseSchema = ValidationErrorResponseSchema

export type DeleteNote401ResponseSchema = UnauthorizedErrorResponseSchema

export type DeleteNote405ResponseSchema = MethodNotAllowedErrorResponseSchema

export type DeleteNote415ResponseSchema = UnsupportedMediaTypeErrorResponseSchema

export type DeleteNote429ResponseSchema = ThrottlingErrorResponseSchema

export type DeleteNote500ResponseSchema = UnexpectedErrorResponseSchema

export type DeleteNoteRequestSchema = {
  handler: NoteHandler
  controlValue?: string
}

export type GetNote200ResponseSchema = {
  data: {
    note:
      | Note
      | {
          handler: NoteHandler
          metadata: NoteMetadata
        }
    status: string
  }
}

export type GetNote400ResponseSchema = ValidationErrorResponseSchema

export type GetNote401ResponseSchema = UnauthorizedErrorResponseSchema

export type GetNote405ResponseSchema = MethodNotAllowedErrorResponseSchema

export type GetNote415ResponseSchema = UnsupportedMediaTypeErrorResponseSchema

export type GetNote429ResponseSchema = ThrottlingErrorResponseSchema

export type GetNote500ResponseSchema = UnexpectedErrorResponseSchema

export type GetNoteRequestSchema = {
  handler: NoteHandler
  controlValue?: string
  confirmRead: boolean
}

export type ListNotes200ResponseSchema = {
  data: {
    notes: (
      | Note
      | {
          metadata: NoteMetadata
          handler: NoteHandler
        }
    )[]
    status: string
  }
}

export type ListNotes400ResponseSchema = ValidationErrorResponseSchema

export type ListNotes405ResponseSchema = MethodNotAllowedErrorResponseSchema

export type ListNotes415ResponseSchema = UnsupportedMediaTypeErrorResponseSchema

export type ListNotes429ResponseSchema = ThrottlingErrorResponseSchema

export type ListNotes500ResponseSchema = UnexpectedErrorResponseSchema

export type ListNotesRequestSchema = {
  scope: string
}

export type UpdateNote200ResponseSchema = {
  data: {
    note: Note
    status: string
  }
}

export type UpdateNote400ResponseSchema = ValidationErrorResponseSchema

export type UpdateNote401ResponseSchema = UnauthorizedErrorResponseSchema

export type UpdateNote405ResponseSchema = MethodNotAllowedErrorResponseSchema

export type UpdateNote415ResponseSchema = UnsupportedMediaTypeErrorResponseSchema

export type UpdateNote429ResponseSchema = ThrottlingErrorResponseSchema

export type UpdateNote500ResponseSchema = UnexpectedErrorResponseSchema

export type UpdateNoteRequestSchema =
  | {
      handler: NoteHandler
      controlValue?: string
      newVersion: NoteVersion
      burnAfterRead: true
      expireTimestamp?: NullableTimestamp
      editable?: false
    }
  | {
      handler: NoteHandler
      controlValue?: string
      newVersion: NoteVersion
      burnAfterRead?: false
      expireTimestamp?: NullableTimestamp
      editable?: boolean
    }
