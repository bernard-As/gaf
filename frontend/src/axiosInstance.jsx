import axios from 'axios';

let token = localStorage.getItem('token')

export const PublicApi = axios.create({
  baseURL: 'https://server4.lcfordevelopment.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const PublicApi2 = axios.create({
  baseURL: 'https://backendeduproject.lcfordevelopment.com/api_base/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const PrivateApi = axios.create({
  baseURL: 'https://server4.lcfordevelopment.com/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: (`Token ${localStorage.getItem('token')}`),
  },
});

export const PrivateApi3 = axios.create({
  baseURL: 'https://backendeduproject.lcfordevelopment.com/calendar/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: (`Token ${localStorage.getItem('token')}`),
  },
});

export const PrivateApi2 = axios.create({
  baseURL: 'https://backendeduproject.lcfordevelopment.com/api_base/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: (`Token ${token}`) || '',
  },
});

export const handleErrors = (error: { response: { status: any } }) => {
  if (!error.response) {
    throw error;
  }

  switch (error.response.status) {
    case 401:
      window.location.replace('/login');
      break;
    case 403:
      console.error('Forbidden access:', error.response);
      break;
    case 404:
      console.error('Resource not found:', error.response);
      break;
    case 500:
      console.error('Server error:', error.response);
      break;
    default:
      console.error('Server error:', error.response);
      throw error;
  }

};

export const errorHandler: React.FC = (status: any) => {
  // const [error, setError] = useState<any>(null);
  // return(
  //   error && (
  //     error===404&&
  //       (<><Alert message="Sign up successfully" type="success" showIcon /> <br></br></>)


  //   )

  // )
  return <div></div>
}

PrivateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.replace('/login');
      return Promise.reject(new Error('Unauthorized'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);