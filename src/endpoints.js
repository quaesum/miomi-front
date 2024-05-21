//export const SERVICE_URL = 'http://miomi.by/api/'
//export const SERVICE_FILES_URL = "http://miomi.by:9000"
export const SERVICE_URL = 'http://localhost:8080/api/'
export const SERVICE_STORAGE_URL = 'http://localhost:9000'

//=========USER=================
const SERVICE_USER_URL = SERVICE_URL + 'user/v1/'
export const GET_USER_INFO_ENDPOINT = SERVICE_USER_URL + 'info'
export const UPDATE_USER_ENDPOINT = SERVICE_USER_URL + 'update/'
export const EMAIL_CONFIRM_ENDPOINT = SERVICE_USER_URL + "verify_email"
export const GET_ALL_USERS_INFO_HANDLER = SERVICE_USER_URL + "all/info"
export const GET_ALL_INVITATIONS = SERVICE_USER_URL + "invitation"
export const ACCEPT_INVITATION_ENDPOINT = SERVICE_USER_URL + "invitation/accept/"
export const REJECT_INVITATION_ENDPOINT = SERVICE_USER_URL + "invitation/reject/"

//==========ANIMALS==============
const SERVICE_ANIMAL_URL = SERVICE_URL + 'animal/v1/'
const SERVICE_ANIMAL_URL_V2 = SERVICE_URL + 'animal/v2/'
export const ADD_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'add'
export const UPDATE_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'update/'
export const REMOVE_ANIMAL_ENDPOINT = SERVICE_ANIMAL_URL + 'remove'
export const GET_ANIMALS_TYPES = SERVICE_ANIMAL_URL + "types"
export const GET_ANIMALS_ENDPOINT = SERVICE_ANIMAL_URL_V2

//==========NEWS==========
const SERVICE_NEWS_URL = SERVICE_URL + "news/v1/"
export const ADD_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'add'
export const UPDATE_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'update/'
export const REMOVE_NEWS_ENDPOINT = SERVICE_NEWS_URL + 'remove/'
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
export const REMOVE_PRODUCT_URL = SERVICE_PRODUCTS_URL + 'remove/'
export const GET_PRODUCT_BY_ID_ENDPOINT = SERVICE_PRODUCTS_URL
export const GET_ALL_PRODUCTS_ENDPOINT = SERVICE_PRODUCTS_URL

//=========SERVICES==========
const SERVICE_SERVICES_URL = SERVICE_URL + 'services/v1/'
export const ADD_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'add'
export const UPDATE_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'update/'
export const REMOVE_SERVICE_ENDPOINT = SERVICE_SERVICES_URL + 'remove/'
export const GET_SERVICE_BY_ID_ENDPOINT = SERVICE_SERVICES_URL
export const GET_ALL_SERVICE_ENDPOINT = SERVICE_SERVICES_URL

//=========SHELTERS==========
const SERVICE_SHELTERS_URL = SERVICE_URL + 'shelter/v1/'
export const GET_ALL_SHELTERS_INFO = SERVICE_SHELTERS_URL + "all-info"
export const CREATE_SHELTER_REQUEST_ENPOINT = SERVICE_SHELTERS_URL + "create_request"
export const EXIT_FROM_SHELTER = SERVICE_SHELTERS_URL + 'exit'
export const GET_USERS_ON_SHELTER_ENDPOINT = SERVICE_SHELTERS_URL + "user/"
export const UPDATE_SHELTER_ENDPPOINT = SERVICE_SHELTERS_URL + "update/"
export const INVITE_USER_TO_SHELTER = SERVICE_SHELTERS_URL + "invite/"
export const GET_SHELTER_BY_ID = SERVICE_SHELTERS_URL

//==========AUTH=============
export const LOGIN_ENDPOINT = SERVICE_URL + "login"
export const SIGNUP_ENDPOINT = SERVICE_URL + "signup"


//==========ADMIN=============
const SERVICE_ADMIN_URL = SERVICE_URL + 'admin/v1/'
export const GET_SHELTERS_REQUESTS_ENDPOINT = SERVICE_ADMIN_URL + "shelters/requests"
export const REJECT_SHELTER_REQUEST_ENDPOINT = SERVICE_ADMIN_URL + "shelters/reject/"
export const APPROVE_SHELTER_REQUEST_ENDPOINT = SERVICE_ADMIN_URL + "shelters/confirm/"


export const FAL_KEY="12070e21-e728-437d-bc7b-66d2e14e735e:afeb39f16c04905e98fc1f5c7cae5c1e"