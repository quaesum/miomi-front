//export const SERVICE_URL = 'http://miomi.by/api/'
//export const SERVICE_FILES_URL = "http://miomi.by:9000"
export const SERVICE_URL = 'http://localhost:8080/api/'
export const SERVICE_STORAGE_URL = 'http://localhost:9000'

//=========USER=================
const SERVICE_USER_URL = SERVICE_URL + 'user/v1/'
export const GET_USER_INFO_ENDPOINT = SERVICE_USER_URL + 'info'
export const UPDATE_USER_ENDPOINT = SERVICE_USER_URL + 'update/'
export const EMAIL_CONFIRM_ENDPOINT = SERVICE_USER_URL + "verify_email"

//==========ANIMALS==============
const SERVICE_ANIMAL_URL = SERVICE_URL + 'animal/v1/'
const SERVICE_ANIMAL_URL_V2 = SERVICE_URL + 'animal/v2/'
export const ADD_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'add'
export const UPDATE_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'update/'
export const REMOVE_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'remove'
export const GET_ANIMALS_ENDPOINT = SERVICE_ANIMAL_URL_V2

//==========NEWS==========
const SERVICE_NEWS_URL = SERVICE_URL + "news/v1/"
export const ADD_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'add'
export const UPDATE_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'update/'
export const REMOVE_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'remove'
export const GET_ALL_NEWS_ENDPOINT = SERVICE_NEWS_URL

//=========FILES============
const SERVICE_FILES_URL = SERVICE_URL + 'file/v1/'
export const ADD_ANIMAL_PHOTO_ENDPOINT = SERVICE_FILES_URL + 'add'
export const ADD_NEWS_PHOTO_ENDPOINT = SERVICE_FILES_URL + 'addNews'
export const ADD_SERVICE_PHOTO_ENDPOINT = SERVICE_FILES_URL + 'addService'
export const GET_FILE_NAMES_AND_IDS_ENDPOINT = SERVICE_FILES_URL + 'getUrl'

//=========PRODUCTS==========
const SERVICE_PRODUCTS_URL = SERVICE_URL + 'products/v1/'
export const ADD_PRODUCT_ENDPOINT = SERVICE_PRODUCTS_URL + 'add'
export const UPDATE_PRODUCT_ENDPOINT = SERVICE_PRODUCTS_URL + 'update/'
export const REMOVE_PRODUCT_URL = SERVICE_PRODUCTS_URL + 'remove'
export const GET_PRODUCT_BY_ID_ENDPOINT = SERVICE_PRODUCTS_URL
export const GET_ALL_PRODUCTS_ENDPOINT = SERVICE_PRODUCTS_URL

//=========SERVICES==========
const SERVICE_SERVICES_URL = SERVICE_URL + 'services/v1/'
export const ADD_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'add'
export const UPDATE_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'update/'
export const REMOVE_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'remove'
export const GET_SERVICE_BY_ID_ENDPOINT = SERVICE_SERVICES_URL
export const GET_ALL_SERVICE_ENDPOINT = SERVICE_SERVICES_URL

//==========AUTH=============
export const LOGIN_ENDPOINT = SERVICE_URL + "login"
export const SIGNUP_ENDPOINT = SERVICE_URL + "signup"
